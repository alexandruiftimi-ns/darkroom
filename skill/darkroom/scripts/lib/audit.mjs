// Darkroom audit: measurable checks. Every finding says how it was established (basis):
//   measured  - read from the rendered page (pixels, computed state, behaviour)
//   heuristic - a rule of thumb applied to measurements; a kept exception is legitimate
//   manual    - the script cannot decide; a person must look
import fs from 'node:fs';
import path from 'node:path';
import { VIEWPORTS, contextFor, launch, settle, mkdirp, toolVersions } from './browser.mjs';
import { dismissConsent } from './consent.mjs';
import { resolveTarget } from './serve.mjs';
import { grabAsync, seamScore, SEAM_THRESHOLD } from './mediakit.mjs';

// ---------- check registry (docs and tests read this; keep it the single source of severity) ----------
export const CHECKS = [
  { id: 'fonts', sev: 'high', basis: 'measured', what: 'font families rendered vs budget', limits: 'visible text only; fallback-stack glyphs are not traced' },
  { id: 'type-scale', sev: 'medium', basis: 'heuristic', what: '> 9 distinct rendered font sizes', limits: 'fluid clamp() sizes inflate the count' },
  { id: 'reading-zones', sev: 'high', basis: 'heuristic', what: 'text zones in the first viewport (> max+1 high, > max medium)', limits: 'first viewport only; zones are clustered by distance; tickers and marquees (a track over 1.4 viewports wide, or marked marquee/ticker) are not counted' },
  { id: 'eye-travel', sev: 'medium', basis: 'heuristic', what: 'reading path crosses the viewport > 2x', limits: 'document order is assumed to be reading order' },
  { id: 'corners', sev: 'medium', basis: 'heuristic', what: 'content in 3+ viewport corners', limits: '' },
  { id: 'overflow', sev: 'high', basis: 'measured', what: 'page wider than the viewport, naming up to 5 offending elements', limits: 'initial state only; offenders inside clipping ancestors are skipped' },
  { id: 'first-paint', sev: 'high', basis: 'measured', what: 'early frame at ~350 ms is >= 90 % one colour far (ΔE > 10) from the settled first screen (white flash / blank first frame), or the h1 is not visible 1.5 s after load', limits: 'desktop, default motion; colours compared at 64×40 px' },
  { id: 'video-playback', sev: 'high', basis: 'measured', what: 'autoplay <video> not playing after load: error, readyState < 2 or paused; codec gaps of the test browser reported as info', limits: 'videos with the autoplay attribute, or inside a [data-video-layer] (recipes/video-layer.js); other JS-started videos are not checked' },
  { id: 'loop-seam', sev: 'medium', basis: 'heuristic', what: 'a video that loops natively (loop attribute) whose first and last frames differ by more than 6 % (mean absolute difference): a visible jump on every loop', limits: 'needs ffmpeg; compares one frame at each end at 96×54; videos with data-video-loop (fade loop) are skipped' },
  { id: 'frame-blend', sev: 'high', basis: 'measured', what: 'while scrolling with default motion, a full-size image is drawn on a canvas at partial opacity (globalAlpha between 0.03 and 0.97): one frame shows through another (ghosting)', limits: '2D canvas drawImage only (not WebGL, OffscreenCanvas or stacked <img> layers); one scroll pass from top to bottom; canvases inside [data-frame-blend="allow"] are skipped; a canvas drawn onto a canvas (trails, feedback buffers) is not a film frame and is not counted' },
  { id: 'scrub-fling', sev: 'high', basis: 'measured', what: 'phone view, CPU slowed 4x: fast flings down a canvas frame scene, back up, down and up again; the painted film changes direction 6+ times while the scroll does 3 times: far-away frames flash on fast scrolls and when scrolling back up', limits: 'frames are identified by the number in their file URL (fetch + createImageBitmap or <img> drawn on a 2D canvas); the scene is the nearest ancestor of the canvas that painted the frames at least 1.5 viewports tall; Chromium only (CPU throttling)' },
  { id: 'scroll-glide', sev: 'high', basis: 'measured', what: 'in a canvas frame scene, the page moves its own scroll more than 30 px within 1.5 s after the user stops (snapping or gliding to a stop): it fights touch momentum and reads as a glitch', limits: 'one rest position at 37 % of the scene; CSS scroll-snap counts too' },
  { id: 'display-font', sev: 'high', basis: 'measured', what: "the h1's first font-family is declared (@font-face) but no face of it loaded: the headline shows in a fallback", limits: 'undeclared system fonts are reported as info' },
  { id: 'motion-rest', sev: 'high', basis: 'measured', what: 'text in the first viewport at opacity < .05 or visibility hidden 2 s after load, and again with JavaScript disabled (high if the h1 or 3+ items, else medium)', limits: 'first viewport only; closed menus layered over the hero can be reported; waiting slides (a hidden layer next to a visible sibling of the same kind, e.g. a carousel) are not counted' },
  { id: 'target-size', sev: 'medium', basis: 'measured', what: 'crowded interactive targets < 24x24 CSS px (WCAG 2.5.8 with spacing exception)', limits: 'inline-in-sentence links exempt' },
  { id: 'headline-length', sev: 'low', basis: 'heuristic', what: 'headline > 8 words', limits: '' },
  { id: 'word-budget', sev: 'high', basis: 'heuristic', what: 'visible copy words vs section budget (> 2x high, > 1x medium), and single text blocks (paragraph, list item, quote, caption) over 60 words (medium); skipped for surface "read"', limits: 'excludes [data-darkroom-ignore] and aria-hidden subtrees; section boundaries are guessed from markup' },
  { id: 'dead-scroll', sev: 'high', basis: 'measured', what: 'default motion, desktop: the page scrolled in half-screen steps; more than 2 screens of scroll in a row where the picture barely changes (< 1.5 % of pixels): nothing new to see or read (> 2 medium, > 4 high)', limits: 'compares 96×60 thumbnails 250 ms after each step; slow ambient motion counts as no change; pages that do not scroll the document are skipped' },
  { id: 'motion-budget', sev: 'high', basis: 'heuristic', what: 'default motion, desktop: the page scrolled a screen at a time; at each rest, the things that move by themselves in view (looping CSS or Web animations grouped per component, playing videos, canvases whose pixels change at rest): more than 3 in one screen medium, more than 5 high', limits: 'hover, cursor and scroll-linked effects are not counted (they move only when the visitor acts), nor entrances that finish; loops are grouped by [data-motion], the outermost svg, or the animation name; motion inside [data-motion-allow] (asked for by the user) is reported as info' },
  { id: 'glass-caption', sev: 'medium', basis: 'heuristic', what: 'the same frosted caption card (backdrop blur, 3+ words) repeated in 3 or more sections: an AI-film tell; one fixed card as a reading anchor is fine', limits: 'backdrop-filter blur only; cards inside one section (a grid) count once' },
  { id: 'phone-gate', sev: 'high', basis: 'heuristic', what: 'phone view (390 px) shows a gate instead of the page ("best viewed on desktop", "rotate your device", "not available on mobile")', limits: 'English, German, French and Spanish phrases; a gate drawn as an image is not detected' },
  { id: 'film-headline', sev: 'medium', basis: 'heuristic', what: 'first screen only: the h1 sits over full-bleed media (video, canvas or an image covering half the screen) and is smaller than 48 px desktop / 32 px phone', limits: 'later chapters may use subtitle-size text by design; media is found by size and overlap, not by looking at the picture' },
  { id: 'first-scroll-weight', sev: 'high', basis: 'measured', what: 'bytes on the wire before the visitor scrolls (desktop, default motion, ~2 s after load, empty cache): > 4 MB medium, > 8 MB high', limits: 'Chromium network counters; media still streaming after 2 s is counted only up to then; a page served locally has no compression from a CDN' },
  { id: 'chain-seam', sev: 'medium', basis: 'measured', what: 'chained clips (<video data-chain="name">, in page order): the last frame of one clip and the first frame of the next differ by more than 6 % (mean absolute difference): the film jumps at the join', limits: 'needs ffmpeg; one frame at each end compared at 96×54; frame sequences are checked when joined (darkroom media chain), not here' },
  { id: 'copy', sev: 'medium', basis: 'heuristic', what: 'genre words (unlock, seamless, ...)', limits: 'English only' },
  { id: 'urgency', sev: 'high', basis: 'heuristic', what: 'urgency / pressure copy', limits: 'English only; a real dated deadline is legitimate' },
  { id: 'page-length', sev: 'high', basis: 'heuristic', what: '> 1200 visible words; skipped for surface "read"', limits: '' },
  { id: 'colour', sev: 'medium', basis: 'heuristic', what: 'UI hue families / accent share vs colour mode', limits: 'imagery is hidden before measuring; computed colours only' },
  { id: 'contrast', sev: 'high', basis: 'measured', what: 'text contrast from rendered pixels with effective alpha; per viewport', limits: 'varying backgrounds (photo, video, gradient) are reported as medium with the worst-case ratio; check the lightest video frame by eye; decorative ghost type (64 px or more, not a heading, and aria-hidden or under 35 % opacity) is skipped' },
  { id: 'lang', sev: 'high', basis: 'measured', what: '<html lang> missing', limits: '' },
  { id: 'headings', sev: 'high', basis: 'measured', what: 'h1 count != 1 (high), level skips (low)', limits: '' },
  { id: 'alt', sev: 'high', basis: 'measured', what: 'img without alt attribute', limits: 'alt quality is not judged' },
  { id: 'labels', sev: 'high', basis: 'measured', what: 'form control without a resolvable label', limits: 'simplified accessible-name computation' },
  { id: 'names', sev: 'high', basis: 'measured', what: 'link/button without a resolvable accessible name (aria-labelledby ids must exist and have text)', limits: 'simplified accessible-name computation, not the full W3C algorithm' },
  { id: 'skip-link', sev: 'low', basis: 'measured', what: 'no skip link as first in-page link', limits: '' },
  { id: 'keyboard', sev: 'medium', basis: 'measured', what: 'Tab traversal: stops with no visible focus change (high when at least half, and 3 or more, have none)', limits: 'first 40 stops; custom widgets needing arrow keys are not exercised' },
  { id: 'reduced-motion', sev: 'high', basis: 'measured', what: 'under prefers-reduced-motion: infinite/long CSS or Web animations or playing video still running', limits: 'cannot observe scroll-linked canvas or GSAP scrubs: use capture --both' },
  { id: 'third-party', sev: 'high', basis: 'measured', what: 'tracker/CDN-font hosts requested before any consent action', limits: 'host list is a regex of known trackers' },
  { id: 'price', sev: 'info', basis: 'heuristic', what: 'price strings found (currency-bearing only)', limits: 'a price without a currency sign is not detected' },
  { id: 'disclosure', sev: 'high', basis: 'measured', what: 'required disclosure text missing', limits: 'exact text match after whitespace/case folding' },
  { id: 'console', sev: 'high', basis: 'measured', what: 'console errors / page errors / failed requests', limits: '' },
  { id: 'config', sev: 'medium', basis: 'measured', what: 'settings document missing, unreadable, or without a darkroom block', limits: '' },
];

// ---------- in-page probe (must stay self-contained: it is serialised into the page) ----------
function probeDom({ maxZones, wordBudgets, disclosure, surface }) {
  const vis = (el) => {
    if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true, contentVisibilityAuto: true })) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false; // collapsed or sr-only clip
    if (r.right + scrollX <= 0 || r.bottom + scrollY <= 0) return false; // pushed off the page origin
    return true;
  };
  const ignored = (el) => !!el.closest('[data-darkroom-ignore],[aria-hidden="true"]');
  const skipTag = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);
  const generic = new Set(['serif', 'sans-serif', 'monospace', 'system-ui', 'cursive', 'fantasy', 'ui-sans-serif', 'ui-serif', '-apple-system', 'blinkmacsystemfont', 'segoe ui', 'emoji']);
  const textEls = [];
  const seen = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.nodeValue.trim() ? 1 : 2) });
  while (walker.nextNode()) {
    const el = walker.currentNode.parentElement;
    if (el && !skipTag.has(el.tagName) && !seen.has(el) && vis(el)) { seen.add(el); textEls.push(el); }
  }
  window.__drTexts = textEls; // shared with the pixel-contrast pass

  // fonts: rendered = visible text (decorative aria-hidden text still renders)
  const declared = new Map(); const sizes = new Set(); const weights = {};
  for (const el of textEls) {
    const s = getComputedStyle(el);
    const fam = s.fontFamily.split(',')[0].trim().replace(/["']/g, '');
    declared.set(fam, (declared.get(fam) ?? 0) + 1);
    (weights[fam] ??= []).includes(s.fontWeight) || weights[fam].push(s.fontWeight);
    sizes.add(Math.round(parseFloat(s.fontSize)));
  }
  const loaded = new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '').replace(/ Variable$/i, '')));
  const families = new Set([...declared.keys()].map((f) => f.replace(/ Variable$/i, '')).filter((f) => !generic.has(f.toLowerCase())));

  // copy counting: ONE policy for sections, fallback split and page total (visible, not ignored, not aria-hidden)
  const count = (t) => (t.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;
  const visCache = new Map();
  const visibleCopyEl = (el) => {
    if (visCache.has(el)) return visCache.get(el);
    const ok = !skipTag.has(el.tagName) && !ignored(el) && vis(el);
    visCache.set(el, ok); return ok;
  };
  const copyWords = (root, { skipSel = '' } = {}) => {
    let n = 0;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const p = w.currentNode.parentElement;
      if (p && w.currentNode.nodeValue.trim() && visibleCopyEl(p) && !(skipSel && p.closest(skipSel))) n += count(w.currentNode.nodeValue);
    }
    return n;
  };

  // zones in first viewport (header/nav and tickers excluded: a marquee track is one moving line, not a reading zone)
  const ticker = (el) => {
    if (el.closest('marquee,[data-marquee],[class*="marquee" i],[class*="ticker" i]')) return true;
    for (let a = el.parentElement, d = 0; a && a !== document.body && d < 6; a = a.parentElement, d++) if (Math.max(a.scrollWidth, a.getBoundingClientRect().width) > innerWidth * 1.4) return true;
    return false;
  };
  const boxes = [];
  textEls.forEach((el, i) => {
    if (el.closest('header, nav, [role=banner], [role=navigation]') || ticker(el)) return;
    const r = el.getBoundingClientRect();
    if (r.bottom <= 0 || r.top >= innerHeight || r.right <= 0 || r.left >= innerWidth) return;
    boxes.push({ i, x1: r.left, y1: r.top, x2: r.right, y2: r.bottom });
  });
  const parent = boxes.map((_, i) => i);
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const GAP = 48;
  for (let a = 0; a < boxes.length; a++) for (let b = a + 1; b < boxes.length; b++) {
    const A = boxes[a]; const B = boxes[b];
    const dx = Math.max(0, Math.max(A.x1, B.x1) - Math.min(A.x2, B.x2));
    const dy = Math.max(0, Math.max(A.y1, B.y1) - Math.min(A.y2, B.y2));
    const overlap = Math.min(A.y2, B.y2) - Math.max(A.y1, B.y1);
    const sameRow = overlap > 0.5 * Math.min(A.y2 - A.y1, B.y2 - B.y1) && dx < innerWidth * 0.12;
    if ((dx < GAP && dy < GAP) || sameRow) parent[find(a)] = find(b);
  }
  const groups = new Map();
  boxes.forEach((b, i) => {
    const k = find(i);
    const g = groups.get(k) ?? { order: b.i, x1: b.x1, y1: b.y1, x2: b.x2, y2: b.y2, text: '' };
    g.order = Math.min(g.order, b.i); g.x1 = Math.min(g.x1, b.x1); g.y1 = Math.min(g.y1, b.y1); g.x2 = Math.max(g.x2, b.x2); g.y2 = Math.max(g.y2, b.y2);
    if (g.text.length < 40) g.text += ' ' + (textEls[b.i].innerText || '').trim().slice(0, 30);
    groups.set(k, g);
  });
  const zones = [...groups.values()].sort((a, b) => a.order - b.order).map((g) => ({ cx: (g.x1 + g.x2) / 2, cy: (g.y1 + g.y2) / 2, w: g.x2 - g.x1, h: g.y2 - g.y1, text: g.text.trim() }));
  const diag = Math.hypot(innerWidth, innerHeight);
  let travel = 0;
  for (let i = 1; i < zones.length; i++) travel += Math.hypot(zones[i].cx - zones[i - 1].cx, zones[i].cy - zones[i - 1].cy);
  const corners = new Set(zones.map((z) => {
    const h = z.cx < innerWidth * 0.3 ? 'L' : z.cx > innerWidth * 0.7 ? 'R' : '';
    const v = z.cy < innerHeight * 0.3 ? 'T' : z.cy > innerHeight * 0.7 ? 'B' : '';
    return h && v ? v + h : null;
  }).filter(Boolean));

  // targets
  const smallTargets = [];
  const targets = [...document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=button], [tabindex]:not([tabindex="-1"])')].filter(vis);
  const rects = targets.map((el) => el.getBoundingClientRect());
  for (const [k, el] of targets.entries()) {
    const s = getComputedStyle(el);
    if (s.display === 'inline' && el.closest('p, li')) continue;
    const r = rects[k];
    if (r.width >= 24 && r.height >= 24) continue;
    const cx = r.left + r.width / 2; const cy = r.top + r.height / 2;
    const crowded = rects.some((o, j) => {
      if (j === k || targets[j].contains(el) || el.contains(targets[j])) return false;
      if (Math.hypot(Math.max(o.left - cx, 0, cx - o.right), Math.max(o.top - cy, 0, cy - o.bottom)) < 12) return true;
      const undersized = o.width < 24 || o.height < 24;
      return undersized && Math.hypot(o.left + o.width / 2 - cx, o.top + o.height / 2 - cy) < 24;
    });
    if (crowded) smallTargets.push({ el: el.tagName.toLowerCase() + (el.id ? '#' + el.id : ''), text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height) });
  }

  // structure / accessible names (aria-labelledby ids must exist and carry text; empty references fall through)
  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const nameOf = (el) => {
    const lb = el.getAttribute('aria-labelledby');
    if (lb) {
      const t = clean(lb.split(/\s+/).map((id) => document.getElementById(id)).filter(Boolean).map((e) => e.getAttribute('aria-label') || e.textContent).join(' '));
      if (t) return t;
    }
    const al = clean(el.getAttribute('aria-label'));
    if (al) return al;
    if (el.labels?.length) { const t = clean([...el.labels].map((l) => l.textContent).join(' ')); if (t) return t; }
    if (el.tagName === 'INPUT' && ['submit', 'button', 'reset'].includes(el.type) && clean(el.value)) return clean(el.value);
    const own = clean(el.innerText || el.textContent);
    if (own) return own;
    const img = el.querySelector('img[alt]:not([alt=""])'); if (img) return clean(img.alt);
    const svgTitle = el.querySelector('svg title'); if (svgTitle && clean(svgTitle.textContent)) return clean(svgTitle.textContent);
    return clean(el.getAttribute('title')) || '';
  };
  const h1s = document.querySelectorAll('h1').length;
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
  const skips = headings.filter((l, i) => i > 0 && l - headings[i - 1] > 1).length;
  const imgsNoAlt = [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).map((i) => i.getAttribute('src'));
  const unlabeled = [...document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]), select, textarea')].filter((el) => vis(el) && !nameOf(el) && !clean(el.getAttribute('title'))).length;
  const nameless = [...document.querySelectorAll('button, a[href], [role=button], [role=link], summary')].filter((el) => vis(el) && !nameOf(el)).length;
  const firstLink = document.querySelector('a[href^="#"]');
  const skipLink = !!firstLink && /skip/i.test(firstLink.textContent);
  let reducedMotionRule = false;
  for (const sheet of document.styleSheets) {
    try { for (const r of sheet.cssRules) if (r.media && /prefers-reduced-motion/.test(r.media.mediaText)) reducedMotionRule = true; } catch { /* cross-origin */ }
  }

  // UI hue families from computed colours (imagery excluded by construction)
  const parseRGB = (str) => { const m = str.match(/[\d.]+/g); return m ? m.map(Number) : [0, 0, 0, 0]; };
  const hueWeight = new Map();
  const addHue = (str, w) => {
    if (!/^rgba?\(/.test(str)) return; // modern colour syntax is resolved elsewhere (pixel pass)
    const [r, g, b, a = 1] = parseRGB(str).map((v, i) => (i < 3 ? v / 255 : v));
    if (a < 0.5 || w <= 0) return;
    const max = Math.max(r, g, b); const min = Math.min(r, g, b); const l = (max + min) / 2; const d = max - min;
    const sat = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    if (sat < 0.35 || l < 0.12 || l > 0.92) return;
    const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    const bucket = Math.round(((h * 60 + 360) % 360) / 30) % 12;
    hueWeight.set(bucket, (hueWeight.get(bucket) ?? 0) + w);
  };
  for (const el of document.querySelectorAll('body *')) {
    if (['IMG', 'VIDEO', 'CANVAS', 'PICTURE', 'SVG'].includes(el.tagName.toUpperCase()) || !vis(el)) continue;
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    addHue(s.backgroundColor, r.width * r.height);
    if (seen.has(el)) addHue(s.color, (el.textContent.trim().length || 1) * parseFloat(s.fontSize) ** 2 * 0.5);
    const bw = parseFloat(s.borderTopWidth) || 0;
    if (bw) addHue(s.borderTopColor, 2 * (r.width + r.height) * bw);
  }
  const totalHue = [...hueWeight.values()].reduce((a, b) => a + b, 0);
  const uiHues = [...hueWeight.entries()].filter(([, w]) => w / totalHue > 0.03).sort((a, b) => b[1] - a[1]).map(([h, w]) => ({ hue: h * 30, share: +(w / totalHue * 100).toFixed(1) }));

  // sections and words
  let secEls = [...document.querySelectorAll('main > section, main > article, body > section, [data-section]')];
  if (!secEls.length) secEls = [...(document.querySelector('main') ?? document.body).children];
  let sections = secEls.map((s, i) => {
    const heading = s.querySelector('h1,h2,h3');
    const head = heading && visibleCopyEl(heading) ? count(heading.innerText) : 0;
    const all = copyWords(s);
    const key = i === 0 ? 'hero' : (s.id && wordBudgets[s.id] ? s.id : 'feature');
    return { id: s.id || `#${i}`, headline: heading?.innerText.trim().slice(0, 60) ?? '', headlineWords: head, bodyWords: Math.max(0, all - head), budget: wordBudgets[key] ?? 45 };
  });
  if (sections.length < 3) { // pages built from one wrapper: split at h1/h2 in document order
    const split = [];
    let cur = { id: '#0', headline: '', headlineWords: 0, bodyWords: 0, budget: wordBudgets.hero ?? 30 };
    const tw = document.createTreeWalker(document.querySelector('main') ?? document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    while (tw.nextNode()) {
      const n = tw.currentNode;
      if (n.nodeType === 1 && /^H[12]$/.test(n.tagName) && vis(n)) {
        if (cur.bodyWords || cur.headline) split.push(cur);
        cur = { id: n.id || `#${split.length}`, headline: n.innerText.trim().slice(0, 60), headlineWords: count(n.innerText), bodyWords: 0, budget: split.length ? wordBudgets.feature ?? 45 : wordBudgets.hero ?? 30 };
      } else if (n.nodeType === 3 && n.nodeValue.trim() && n.parentElement && visibleCopyEl(n.parentElement) && !n.parentElement.closest('h1,h2,header,nav,footer')) {
        cur.bodyWords += count(n.nodeValue);
      }
    }
    split.push(cur);
    if (split.length > sections.length) sections = split;
  }
  // single text blocks over 60 words (a wall of text even inside a budget-respecting section)
  const longBlocks = [...document.querySelectorAll('p, li, blockquote, figcaption, dd')]
    .filter((el) => visibleCopyEl(el) && !el.querySelector('p, li, blockquote'))
    .map((el) => ({ words: copyWords(el), text: el.innerText.trim().slice(0, 50) })).filter((b) => b.words > 60);

  // frosted caption cards (backdrop blur) with copy, counted once per section
  const secOf = (el) => el.closest('main > section, main > article, body > section, [data-section]') ?? el.parentElement;
  const glassSecs = new Set(); let glassText = '';
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el);
    if (!/blur\(/.test(s.backdropFilter || s.webkitBackdropFilter || '') || s.position === 'fixed' || el.closest('header, nav, [role=banner], [role=navigation], dialog')) continue;
    if (!vis(el) || copyWords(el) < 3) continue;
    glassSecs.add(secOf(el)); glassText ||= el.innerText.trim().slice(0, 40);
  }

  // first screen: is the h1 set over full-bleed media?
  const filmHeadline = (() => {
    const h1 = document.querySelector('h1'); if (!h1 || !vis(h1)) return null;
    const hr = h1.getBoundingClientRect(); if (hr.top >= innerHeight || hr.bottom <= 0) return null;
    const area = (r) => Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
    const overlap = (r) => Math.max(0, Math.min(r.right, hr.right) - Math.max(r.left, hr.left)) * Math.max(0, Math.min(r.bottom, hr.bottom) - Math.max(r.top, hr.top));
    const media = [...document.querySelectorAll('video, canvas, img, picture, body *')].find((el) => {
      const isMedia = /^(VIDEO|CANVAS|IMG|PICTURE)$/.test(el.tagName) || getComputedStyle(el).backgroundImage.includes('url(');
      if (!isMedia) return false;
      const r = el.getBoundingClientRect();
      return area(r) >= 0.5 * innerWidth * innerHeight && overlap(r) >= 0.5 * hr.width * hr.height;
    });
    return media ? { size: Math.round(parseFloat(getComputedStyle(h1).fontSize)), over: media.tagName.toLowerCase(), text: h1.innerText.trim().slice(0, 40) } : null;
  })();

  const bodyText = document.body.innerText;
  const phoneGate = (bodyText.match(/(best (viewed|experienced|enjoyed) on (a )?(desktop|computer|laptop|larger screen)|(please )?(rotate|turn) your (device|phone|screen)|(only|not) available on (mobile|desktop)|desktop only|open (this|it) on (a )?(desktop|computer)|switch to (a )?desktop|auf dem desktop|sur (un )?ordinateur|en (un )?ordenador)/i) ?? [null])[0];
  const norm = (t) => t.replace(/\s+/g, ' ').trim().toLowerCase();
  const prices = bodyText.match(/(?:[€$£]\s?\d[\d.,]*|\d[\d.,]*\s?(?:€|EUR|USD|GBP|\$|£))/g) ?? [];
  const genre = [...new Set((bodyText.match(/\b(unlock|seamless(ly)?|supercharge|elevate|effortless(ly)?|cutting[- ]edge|next[- ]gen|synergy|revolutioni[sz]e|game[- ]chang(er|ing)|world[- ]class|all[- ]in[- ]one|lorem ipsum)\b/gi) ?? []).map((w) => w.toLowerCase()))];
  const urgency = bodyText.match(/(limited (time )?offer|ends (soon|today|tonight)|only \d+ left|hurry|last chance|act now|!!+)/gi) ?? [];
  return {
    lang: document.documentElement.lang, title: document.title,
    families: [...families], declared: Object.fromEntries(declared), weights, loaded: [...loaded], sizes: [...sizes].sort((a, b) => a - b),
    zones, travel: +(travel / diag).toFixed(2), corners: [...corners],
    smallTargets, targetCount: targets.length, h1s, skips, imgsNoAlt, unlabeled, nameless, skipLink, reducedMotionRule,
    sections, totalWords: copyWords(document.body), prices, genre, urgency, uiHues,
    longBlocks: longBlocks.slice(0, 6), glassCaptions: { sections: glassSecs.size, text: glassText }, filmHeadline, phoneGate,
    disclosureFound: disclosure ? norm(bodyText).includes(norm(disclosure)) : null,
    overflow: document.documentElement.scrollWidth - innerWidth,
    overflowCulprits: (() => {
      if (document.documentElement.scrollWidth - innerWidth <= 0) return [];
      const out = [];
      const clipped = (el) => { for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) if (/hidden|clip|auto|scroll/.test(getComputedStyle(e).overflowX)) return true; return false; };
      for (const el of document.body.querySelectorAll('*')) {
        if (getComputedStyle(el).position === 'fixed') continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.right <= innerWidth + 1) continue;
        const p = el.parentElement;
        if (p && p !== document.body && p.getBoundingClientRect().right > innerWidth + 1) continue; // report the outermost offender
        if (clipped(el)) continue;
        out.push(el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.classList.length ? '.' + [...el.classList].slice(0, 2).join('.') : '') + ` (right edge ${Math.round(r.right)}px)`);
        if (out.length >= 5) break;
      }
      return out;
    })(),
    maxZones, surface,
    libs: {
      gsap: !!window.gsap, scrollTrigger: !!window.ScrollTrigger, three: !!window.THREE,
      lenis: !!(window.lenis || document.documentElement.classList.contains('lenis')),
      locomotive: !!document.querySelector('[data-scroll-container]'),
      webglCanvas: [...document.querySelectorAll('canvas')].some((c) => { try { return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } }),
    },
    media: { video: document.querySelectorAll('video').length, canvas: document.querySelectorAll('canvas').length },
    resources: (() => { const e = performance.getEntriesByType('resource'); return { kb: Math.round(e.reduce((s, x) => s + (x.transferSize || 0), 0) / 1024), entries: e.length, unmeasured: e.filter((x) => !x.transferSize).length }; })(),
  };
}

// ---------- pixel contrast ----------
// Text is made transparent, the page is photographed, and the ink colour (resolved by the browser, so oklch/color-mix/alpha
// all work) is composited over the real pixels behind each text rect. Gradients, translucent panels, photos and
// ancestor opacity are therefore part of the measurement instead of guessed from the background-color chain.
function collectTexts({ done, limit }) {
  const texts = window.__drTexts ?? [];
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const resolve = (str) => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = str; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const out = [];
  texts.forEach((el, id) => {
    if (done.includes(id) || out.length >= limit) return;
    const rects = [];
    for (const n of el.childNodes) {
      if (n.nodeType !== 3 || !n.nodeValue.trim()) continue;
      const range = document.createRange(); range.selectNodeContents(n);
      for (const r of range.getClientRects()) {
        const x1 = Math.max(0, r.left); const y1 = Math.max(0, r.top); const x2 = Math.min(innerWidth, r.right); const y2 = Math.min(innerHeight, r.bottom);
        if (x2 - x1 >= 2 && y2 - y1 >= 2) rects.push([Math.floor(x1), Math.floor(y1), Math.ceil(x2 - x1), Math.ceil(y2 - y1)]);
      }
    }
    if (!rects.length) return;
    const s = getComputedStyle(el);
    let opacity = 1;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) opacity *= Number(getComputedStyle(n).opacity);
    const fill = resolve(s.webkitTextFillColor && s.webkitTextFillColor !== 'currentcolor' ? s.webkitTextFillColor : s.color);
    const size = parseFloat(s.fontSize);
    // decorative ghost type: huge, faint or aria-hidden letters behind the content (a background, not something to read)
    const ghost = size >= 64 && !el.closest('h1,h2,h3,a,button') && (!!el.closest('[aria-hidden="true"]') || fill[3] * opacity < 0.35);
    out.push({ id, rects, rgba: fill, opacity, size, ghost, bold: Number(s.fontWeight) >= 700, gradientText: s.backgroundClip === 'text' || s.webkitBackgroundClip === 'text', label: (el.innerText || el.textContent).trim().slice(0, 40) });
  });
  return out;
}

// Layout can shift between collecting colours and photographing (late web fonts), so rects are re-read with the style on.
function refreshRects(ids) {
  const texts = window.__drTexts ?? [];
  return ids.map((id) => {
    const rects = [];
    for (const n of texts[id].childNodes) {
      if (n.nodeType !== 3 || !n.nodeValue.trim()) continue;
      const range = document.createRange(); range.selectNodeContents(n);
      for (const r of range.getClientRects()) {
        const x1 = Math.max(0, r.left); const y1 = Math.max(0, r.top); const x2 = Math.min(innerWidth, r.right); const y2 = Math.min(innerHeight, r.bottom);
        if (x2 - x1 >= 2 && y2 - y1 >= 2) rects.push([Math.floor(x1), Math.floor(y1), Math.ceil(x2 - x1), Math.ceil(y2 - y1)]);
      }
    }
    return rects;
  });
}

async function analyseContrast({ b64bg, b64fg, items, debug }) {
  const load = async (b64) => { const img = new Image(); img.src = `data:image/png;base64,${b64}`; await img.decode(); const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0); return x; };
  const bg = await load(b64bg); const fg = await load(b64fg);
  const lum = (r, g, b) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  return items.map((it) => {
    const a = it.rgba[3] * it.opacity;
    if (it.gradientText) return { id: it.id, label: it.label, skipped: 'gradient text: check by eye' };
    if (it.ghost) return { id: it.id, label: it.label, skipped: 'decorative ghost type (large and faint): check by eye' };
    if (a < 0.02) return { id: it.id, label: it.label, skipped: 'invisible (alpha 0)' };
    const ratios = []; const bgl = [];
    for (const [x, y, w, h] of it.rects) {
      const W = Math.min(w, bg.canvas.width - x); const H = Math.min(h, bg.canvas.height - y);
      if (W < 1 || H < 1) continue;
      const B = bg.getImageData(x, y, W, H).data; const F = fg.getImageData(x, y, W, H).data;
      const step = Math.max(1, Math.floor(Math.sqrt((W * H) / 6000)));
      // Where was text actually painted? Pixels that differ between the page with and without text. The font's line box
      // is taller than its ink (display type), so sampling the whole box would pick up unrelated neighbours.
      const ink = []; const all = [];
      for (let py = 0; py < H; py += step) for (let px = 0; px < W; px += step) {
        const i = (py * W + px) * 4;
        all.push(i);
        if (Math.abs(F[i] - B[i]) + Math.abs(F[i + 1] - B[i + 1]) + Math.abs(F[i + 2] - B[i + 2]) > 24) ink.push(i);
      }
      const use = ink.length >= 6 ? ink : all;
      if (debug && it.id === debug) (window.__dbg ??= []).push(JSON.stringify({ rect: [x, y, w, h], W, H, ink: ink.length, all: all.length, B0: [B[0], B[1], B[2]], F0: [F[0], F[1], F[2]], whole: (() => { const a = fg.getImageData(0, 0, bg.canvas.width, bg.canvas.height).data; const b2 = bg.getImageData(0, 0, bg.canvas.width, bg.canvas.height).data; let n = 0; for (let q = 0; q < a.length; q += 4) if (Math.abs(a[q] - b2[q]) > 24) n++; return n; })(), canvas: [bg.canvas.width, bg.canvas.height], fgc: [fg.canvas.width, fg.canvas.height], i0: use[0], Bi: use[0] === undefined ? null : [B[use[0]], B[use[0] + 1], B[use[0] + 2]], Fi: use[0] === undefined ? null : [F[use[0]], F[use[0] + 1], F[use[0] + 2]] }));
      for (const i of use) {
        const col = [0, 1, 2].map((k) => a * it.rgba[k] + (1 - a) * B[i + k]);
        const L1 = lum(...col); const L2 = lum(B[i], B[i + 1], B[i + 2]);
        ratios.push((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)); bgl.push(L2);
      }
    }
    if (!ratios.length) return { id: it.id, label: it.label, skipped: 'no samples' };
    ratios.sort((p, q) => p - q); bgl.sort((p, q) => p - q);
    const at = (arr, p) => arr[Math.min(arr.length - 1, Math.floor(arr.length * p))];
    const large = it.size >= 24 || (it.bold && it.size >= 18.66);
    return { id: it.id, label: it.label, ratio: +at(ratios, 0.1).toFixed(2), need: large ? 3 : 4.5, variable: at(bgl, 0.95) - at(bgl, 0.05) > 0.15, alpha: +a.toFixed(2), ...(debug && it.id === debug ? { dbg: window.__dbg } : {}) };
  });
}

async function pixelContrast(page, vp) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const chunks = Math.min(14, Math.max(1, Math.ceil(total / (vp.height * 0.9))));
  const done = []; const issues = []; const skipped = []; let checked = 0;
  for (let k = 0; k < chunks; k++) {
    await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), Math.round(k * vp.height * 0.9));
    await page.waitForTimeout(120);
    // Collect colours and rects, photograph with text, hide text, re-read rects, photograph again. If the layout moved in
    // between (late fonts or images), the two photographs no longer line up: discard and retry rather than guess.
    let items = []; let buf = null; let bufFg = null; let stable = false;
    for (let attempt = 0; attempt < 4 && !stable; attempt++) {
      items = await page.evaluate(collectTexts, { done, limit: 250 });
      if (!items.length) break;
      bufFg = await page.screenshot();
      const style = await page.addStyleTag({ content: '*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;caret-color:transparent!important}svg text{fill:transparent!important}::placeholder{color:transparent!important}' });
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))); // let the style change reach the screen
      const fresh = await page.evaluate(refreshRects, items.map((i) => i.id));
      const moved = items.filter((it, q) => fresh[q].length && it.rects.some((r, j) => !fresh[q][j] || Math.abs(fresh[q][j][0] - r[0]) > 1 || Math.abs(fresh[q][j][1] - r[1]) > 1));
      if (moved.length === 0) { items.forEach((i, q) => { if (fresh[q].length) i.rects = fresh[q]; }); buf = await page.screenshot(); stable = true; }
      await style.evaluate((n) => n.remove());
      if (!stable) await page.waitForTimeout(300);
    }
    if (!items.length) continue;
    if (!stable) { items.forEach((i) => done.push(i.id)); skipped.push({ text: items[0].label, why: 'layout kept moving while measuring; re-run when the page is idle' }); continue; }
    items.forEach((i) => done.push(i.id));
    if (process.env.DR_DEBUG_SHOTS) { fs.writeFileSync(`${process.env.DR_DEBUG_SHOTS}/w${vp.width}-chunk${k}-fg.png`, bufFg); fs.writeFileSync(`${process.env.DR_DEBUG_SHOTS}/w${vp.width}-chunk${k}-bg.png`, buf); }
    const res = await page.evaluate(analyseContrast, { b64bg: buf.toString('base64'), b64fg: bufFg.toString('base64'), items, debug: Number(process.env.DR_DEBUG_ID ?? -1) });
    if (process.env.DR_DEBUG) console.error(JSON.stringify(res.map((r) => ({ ...r })), null, 0));
    for (const r of res) {
      if (r.skipped) { skipped.push({ text: r.label, why: r.skipped }); continue; }
      checked++;
      if (r.ratio < r.need) issues.push({ text: r.label, ratio: r.ratio, need: r.need, variable: r.variable, alpha: r.alpha });
    }
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  return { checked, issues, skipped: skipped.slice(0, 20) };
}

// ---------- behaviour probes ----------
function motionState() {
  const anims = document.getAnimations().filter((a) => a.playState === 'running' && a.constructor.name !== 'CSSTransition');
  const t = (a) => a.effect?.getComputedTiming?.() ?? {};
  return {
    running: anims.length,
    infinite: anims.filter((a) => t(a).iterations === Infinity).length,
    long: anims.filter((a) => t(a).iterations !== Infinity && (t(a).duration ?? 0) > 5000).length,
    videosPlaying: [...document.querySelectorAll('video')].filter((v) => !v.paused && !v.ended && v.getBoundingClientRect().width > 0).length,
    names: [...new Set(anims.map((a) => a.animationName || a.effect?.target?.tagName || 'anim'))].slice(0, 6),
  };
}

function focusStep(prevStyle) {
  const el = document.activeElement;
  const pick = (e) => { const s = getComputedStyle(e); return [s.outlineStyle, s.outlineWidth, s.outlineColor, s.boxShadow, s.borderTopColor, s.backgroundColor, s.color, s.textDecorationLine, s.transform].join('|'); };
  const prev = window.__drPrev && document.contains(window.__drPrev) ? pick(window.__drPrev) : null;
  if (!el || el === document.body || el === document.documentElement) return { end: true, prevNow: prev };
  const s = getComputedStyle(el); const r = el.getBoundingClientRect();
  const outline = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 && !/rgba\(\d+, \d+, \d+, 0\)/.test(s.outlineColor);
  const cur = pick(el);
  window.__drPrev = el;
  return { end: false, tag: el.tagName.toLowerCase() + (el.id ? '#' + el.id : ''), text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 24), outline, cur, prevNow: prev, hidden: r.width < 1 || r.height < 1 || s.visibility === 'hidden', inView: r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth };
}

async function keyboardProbe(page) {
  await page.evaluate(() => { window.__drPrev = null; document.activeElement?.blur?.(); scrollTo({ top: 0, behavior: 'instant' }); });
  const stops = []; const seen = new Set();
  let last = null;
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab');
    const st = await page.evaluate(focusStep);
    // style of the PREVIOUS stop after it lost focus tells us whether focusing it changed anything
    if (last && st.prevNow !== null) last.changed = last.cur !== st.prevNow;
    if (st.end) break;
    const key = st.tag + '|' + st.text;
    if (seen.has(key)) break;
    seen.add(key); stops.push(st); last = st;
  }
  const visibleFocus = (s) => s.outline || s.changed === true || s.changed === undefined; // last stop is not re-checked: benefit of the doubt
  return {
    stops: stops.length,
    noIndicatorCount: stops.filter((s) => !visibleFocus(s)).length,
    noIndicator: stops.filter((s) => !visibleFocus(s)).map((s) => `${s.tag} "${s.text}"`).slice(0, 6),
    hiddenFocus: stops.filter((s) => s.hidden).map((s) => `${s.tag} "${s.text}"`).slice(0, 6),
    withIndicator: stops.filter(visibleFocus).length,
  };
}

// ---------- UI colour share (imagery hidden) ----------
async function uiColourShare(page) {
  await page.evaluate(() => {
    const touched = [];
    for (const el of document.querySelectorAll('img, picture, video, canvas, svg image, iframe')) { touched.push([el, el.style.visibility]); el.style.visibility = 'hidden'; }
    for (const el of document.querySelectorAll('*')) { const bi = getComputedStyle(el).backgroundImage; if (bi.includes('url(')) { touched.push([el, el.style.backgroundImage, 'bg']); el.style.backgroundImage = 'none'; } }
    window.__darkroomRestore = touched;
  });
  const buf = await page.screenshot();
  await page.evaluate(() => { for (const [el, v, kind] of window.__darkroomRestore) kind === 'bg' ? (el.style.backgroundImage = v) : (el.style.visibility = v); });
  return page.evaluate(async ({ b64 }) => {
    const img = new Image(); img.src = `data:image/png;base64,${b64}`; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    const buckets = new Map(); const hues = new Map(); let total = 0; let saturated = 0;
    for (let i = 0; i < d.length; i += 16) {
      const r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
      const s = max === min ? 0 : (l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min));
      total++;
      const key = `${Math.round(r * 15)},${Math.round(g * 15)},${Math.round(b * 15)}`;
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
      if (s > 0.35 && l > 0.15 && l < 0.9) {
        saturated++;
        let h = 0; const dd = max - min;
        if (max === r) h = ((g - b) / dd) % 6; else if (max === g) h = (b - r) / dd + 2; else h = (r - g) / dd + 4;
        h = Math.round(((h * 60 + 360) % 360) / 30) % 12;
        hues.set(h, (hues.get(h) ?? 0) + 1);
      }
    }
    const top = Math.max(...buckets.values());
    const nonGround = total - top;
    return {
      groundShare: +(top / total * 100).toFixed(1),
      accentShareOfNonGround: nonGround ? +(saturated / nonGround * 100).toFixed(1) : 0,
      saturatedShare: +(saturated / total * 100).toFixed(2),
      hueFamilies: [...hues.entries()].filter(([, n]) => n / total > 0.005).map(([h, n]) => ({ hue: h * 30, share: +(n / total * 100).toFixed(2) })),
    };
  }, { b64: buf.toString('base64') });
}

const TRACKERS = /google-analytics|googletagmanager|doubleclick|facebook\.net|connect\.facebook|hotjar|clarity\.ms|segment\.|mixpanel|tiktok|linkedin|snap\.licdn|fonts\.googleapis|fonts\.gstatic|youtube|ytimg|vimeo|maps\.googleapis|typekit|use\.fontawesome/;
const stripWww = (h) => h.replace(/^www\./, '').replace(/:\d+$/, '');
const sameSite = (a, b) => { const x = stripWww(a); const y = stripWww(b); return x === y || x.endsWith('.' + y) || y.endsWith('.' + x); };

// ---------- findings ----------
// ---------- first paint, video, display font, rest state ----------
function hiddenRestText() {
  const out = []; const h1 = document.querySelector('h1'); const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']); const seen = new Set();
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); // no filter callback: it cannot run with JavaScript disabled
  while (w.nextNode()) {
    const el = w.currentNode.parentElement;
    if (!w.currentNode.nodeValue.trim() || !el || skip.has(el.tagName) || seen.has(el) || el.closest('[aria-hidden="true"],[hidden],[inert],[data-darkroom-ignore],dialog:not([open])')) continue;
    seen.add(el);
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.bottom <= 0 || r.top >= innerHeight || r.right <= 0 || r.left >= innerWidth) continue;
    let op = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) op *= parseFloat(getComputedStyle(e).opacity);
    if ((op < 0.05 || getComputedStyle(el).visibility === 'hidden') && !waitingSlide(el)) out.push({ text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 40), h1: !!(h1 && (el === h1 || h1.contains(el))) });
  }
  return out;
  // A slide waiting its turn: the layer that hides it (own opacity < .05, or where visibility:hidden starts) has a
  // visible sibling of the same kind with text (a carousel, stacked chapters). Not a rest-state failure.
  function waitingSlide(el) {
    const shown = (e) => { const s = getComputedStyle(e); return parseFloat(s.opacity) >= 0.05 && s.visibility !== 'hidden' && (e.textContent || '').trim(); };
    for (let a = el, d = 0; a && a !== document.body && d < 10; a = a.parentElement, d++) {
      const s = getComputedStyle(a); const ps = a.parentElement && getComputedStyle(a.parentElement);
      const hidesHere = parseFloat(s.opacity) < 0.05 || (s.visibility === 'hidden' && ps && ps.visibility !== 'hidden');
      if (!hidesHere) continue;
      const kind = (e) => e.tagName + '.' + (e.classList[0] ?? '');
      return [...(a.parentElement?.children ?? [])].some((sib) => sib !== a && kind(sib) === kind(a) && shown(sib));
    }
    return false;
  }
}
function h1Visible() {
  const h = document.querySelector('h1'); if (!h) return null;
  const r = h.getBoundingClientRect(); let op = 1; for (let e = h; e && e.nodeType === 1; e = e.parentElement) op *= parseFloat(getComputedStyle(e).opacity);
  return { visible: op >= 0.05 && getComputedStyle(h).visibility !== 'hidden' && r.width > 1 && r.height > 1 && r.top < innerHeight, opacity: +op.toFixed(2) };
}
function videoState() {
  const h264 = document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"') !== '';
  // autoplay videos, and background videos started by script (recipes/video-layer.js removes the autoplay attribute)
  return { h264, videos: [...document.querySelectorAll('video')].filter((v) => v.autoplay || v.closest('[data-video-layer]')).map((v) => ({ src: (v.currentSrc || v.src || v.querySelector('source')?.src || '').slice(0, 160), url: v.currentSrc || v.src || '', readyState: v.readyState, paused: v.paused, error: v.error ? v.error.code : null, loop: v.loop, managedLoop: v.hasAttribute('data-video-loop') })) };
}
function displayFont() {
  const h1 = document.querySelector('h1'); if (!h1) return null;
  const fam = getComputedStyle(h1).fontFamily.split(',')[0].trim().replace(/["']/g, '');
  const faces = [...document.fonts].filter((f) => f.family.replace(/["']/g, '').toLowerCase() === fam.toLowerCase());
  return { family: fam, declared: faces.length, loaded: faces.filter((f) => f.status === 'loaded').length, failed: faces.filter((f) => f.status === 'error').length };
}
// Screenshots → dominant colour (the most common 16-level bucket and its share) at 64×40, decoded in a scratch page.
async function frameStats(browser, pngs) {
  const ctx = await browser.newContext(); const p = await ctx.newPage();
  try {
    return await p.evaluate(async (list) => Promise.all(list.map(async (b64) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
      const c = document.createElement('canvas'); c.width = 64; c.height = 40; const g = c.getContext('2d'); g.drawImage(img, 0, 0, 64, 40);
      const d = g.getImageData(0, 0, 64, 40).data; const buckets = new Map();
      for (let i = 0; i < d.length; i += 4) { const k = `${d[i] >> 4},${d[i + 1] >> 4},${d[i + 2] >> 4}`; const b = buckets.get(k) ?? { n: 0, r: 0, g: 0, b: 0 }; b.n++; b.r += d[i]; b.g += d[i + 1]; b.b += d[i + 2]; buckets.set(k, b); }
      const top = [...buckets.values()].sort((a, b) => b.n - a.n)[0];
      return { share: top.n / (d.length / 4), colour: [top.r / top.n, top.g / top.n, top.b / top.n].map(Math.round) };
    })), pngs.map((b) => b.toString('base64')));
  } finally { await ctx.close(); }
}
const toLab = ([r, g, b]) => {
  const lin = (v) => { v /= 255; return v > 0.04045 ? ((v + 0.055) / 1.055) ** 2.4 : v / 12.92; };
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const x = f((R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047), y = f(R * 0.2126 + G * 0.7152 + B * 0.0722), z = f((R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
};
export const deltaE = (a, b) => { const [p, q] = [toLab(a), toLab(b)]; return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };
const hex = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');

export function findings({ desk, mob, colour, motion, keyboard, contrast, ctx }) {
  const F = [];
  const add = (sev, check, msg, data, extra = {}) => F.push({ sev, check, basis: CHECKS.find((c) => c.id === check)?.basis ?? 'measured', msg, ...extra, ...(data ? { data } : {}) });
  const s = ctx.settings;
  const read = (s.surface ?? 'landing') === 'read';
  if (ctx.problem) add('medium', 'config', ctx.problem);
  const budget = Number(ctx.fonts ?? s.fontBudget ?? 3);
  const fams = desk.families.filter((f) => desk.loaded.some((l) => l.toLowerCase() === f.toLowerCase()) || desk.loaded.length === 0);
  if (fams.length > budget) add('high', 'fonts', `${fams.length} font families rendered (budget ${budget}): ${fams.join(', ')}`);
  else add('info', 'fonts', `${fams.length}/${budget} families: ${fams.join(', ')}`);
  if (desk.sizes.length > 9) add('medium', 'type-scale', `${desk.sizes.length} distinct font sizes — collapse to 5–6 steps`, desk.sizes);

  for (const [label, d] of [['desktop', desk], ['mobile', mob]]) {
    const maxZ = Number(s.maxZones ?? 3);
    if (d.zones.length > maxZ + 1) add('high', 'reading-zones', `${label}: ${d.zones.length} text zones in first viewport (max ${maxZ})`, d.zones.map((z) => z.text), { viewport: label });
    else if (d.zones.length > maxZ) add('medium', 'reading-zones', `${label}: ${d.zones.length} text zones (max ${maxZ})`, d.zones.map((z) => z.text), { viewport: label });
    if (d.travel > 2) add('medium', 'eye-travel', `${label}: reading path crosses the screen ${d.travel}× (zig-zag > 2)`, null, { viewport: label });
    if (d.corners.length >= 3) add('medium', 'corners', `${label}: content in ${d.corners.length} corners (${d.corners.join(', ')}) — the eye orbits`, null, { viewport: label });
    if (d.overflow > 0) add('high', 'overflow', `${label}: page ${d.overflow}px wider than the viewport${d.overflowCulprits?.length ? `; caused by ${d.overflowCulprits.join(', ')}` : ''}`, d.overflowCulprits ?? null, { viewport: label });
    if (d.smallTargets.length) add('medium', 'target-size', `${label}: ${d.smallTargets.length} crowded targets < 24px, e.g. ${d.smallTargets.slice(0, 4).map((t) => `${t.el} "${t.text}" ${t.w}×${t.h}`).join('; ')}`, d.smallTargets, { viewport: label });
  }
  add('info', 'reading-zones', `desktop zones in order: ${desk.zones.map((z) => `[${z.text}]`).join(' → ')} · travel ${desk.travel}`);

  if (!read) {
    for (const sec of desk.sections) {
      if (sec.headlineWords > 8) add('low', 'headline-length', `${sec.id}: headline ${sec.headlineWords} words (≤ 8)`);
      if (sec.bodyWords > sec.budget * 2) add('high', 'word-budget', `${sec.id}: ${sec.bodyWords} words vs budget ${sec.budget}`);
      else if (sec.bodyWords > sec.budget) add('medium', 'word-budget', `${sec.id}: ${sec.bodyWords} words vs budget ${sec.budget}`);
    }
    if (desk.longBlocks?.length) add('medium', 'word-budget', `${desk.longBlocks.length} single text block(s) over 60 words, e.g. "${desk.longBlocks[0].text}…" (${desk.longBlocks[0].words} words): split it, cut it, or move the detail lower`, desk.longBlocks);
    if (desk.totalWords > 1200) add('high', 'page-length', `${desk.totalWords} words on page — brochure territory (landing ≤ ~900)`);
    else add('info', 'page-length', `${desk.totalWords} words on page`);
  } else add('info', 'page-length', `${desk.totalWords} words (surface "read": word budgets not applied)`);
  if (desk.genre.length) add('medium', 'copy', `genre words: ${desk.genre.join(', ')} — replace with a concrete fact`);
  if (desk.urgency.length) add('high', 'urgency', `urgency/pressure copy: ${[...new Set(desk.urgency)].join(', ')} — only real, verifiable deadlines (UCPD, DSA Art. 25)`);

  const mode = ctx.mode ?? s.colorMode ?? 'disciplined';
  if (colour) {
    if (mode === 'disciplined') {
      if (desk.uiHues.length > 2) add('medium', 'colour', `UI uses ${desk.uiHues.length} saturated hue families (disciplined: secondary + one accent)`, desk.uiHues);
      if (colour.accentShareOfNonGround > 20) add('medium', 'colour', `saturated colour is ${colour.accentShareOfNonGround}% of non-ground UI pixels (> 20%)`);
    } else if (mode === 'monochrome' && desk.uiHues.length > 1) add('medium', 'colour', 'monochrome mode but several saturated hues in UI', desk.uiHues);
    add('info', 'colour', `UI-only (media hidden): ground ${colour.groundShare}%, saturated ${colour.saturatedShare}% · UI hues ${desk.uiHues.map((h) => `${h.hue}° ${h.share}%`).join(', ') || 'none'} · mode ${mode}`);
  }

  // contrast: every viewport keeps its own evidence
  const seenC = new Set();
  for (const [label, c] of Object.entries(contrast)) {
    for (const i of c.issues) {
      const key = `${label}|${i.text}`;
      if (seenC.has(key)) continue; seenC.add(key);
      const note = i.variable ? ' (background varies: worst-case sample — check the lightest frame by eye)' : '';
      add(i.variable ? 'medium' : 'high', 'contrast', `${label}: "${i.text}" ${i.ratio}:1 < ${i.need}:1${i.alpha < 1 ? ` (text alpha ${i.alpha})` : ''}${note}`, null, { viewport: label, basis: i.variable ? 'manual' : 'measured' });
    }
    add('info', 'contrast', `${label}: ${c.checked} text items measured from pixels, ${c.issues.length} below threshold${c.skipped.length ? `, ${c.skipped.length} skipped (${[...new Set(c.skipped.map((x) => x.why))].join('; ')})` : ''}`, null, { viewport: label });
  }

  if (!desk.lang) add('high', 'lang', '<html> has no lang');
  if (desk.h1s !== 1) add('high', 'headings', `${desk.h1s} h1 elements (want 1)`);
  if (desk.skips) add('low', 'headings', `${desk.skips} heading level skips`);
  for (const [label, d] of [['desktop', desk], ['mobile', mob]]) {
    if (d.imgsNoAlt.length) add('high', 'alt', `${label}: ${d.imgsNoAlt.length} img without alt`, d.imgsNoAlt, { viewport: label });
    if (d.unlabeled) add('high', 'labels', `${label}: ${d.unlabeled} form controls without a resolvable label`, null, { viewport: label });
    if (d.nameless) add('high', 'names', `${label}: ${d.nameless} links/buttons without a resolvable accessible name`, null, { viewport: label });
  }
  if (!desk.skipLink) add('low', 'skip-link', 'no skip link as first in-page link');
  if (keyboard) {
    if (keyboard.stops === 0 && desk.targetCount > 0) add('high', 'keyboard', 'Tab reached no focusable element although interactive elements exist');
    else if (keyboard.noIndicatorCount >= Math.max(3, Math.ceil(keyboard.stops * 0.5))) add('high', 'keyboard', `${keyboard.noIndicatorCount} of ${keyboard.stops} Tab stops show no visible focus change (outline removed?): ${keyboard.noIndicator.join('; ')}`, keyboard.noIndicator);
    else if (keyboard.noIndicator.length) add('medium', 'keyboard', `Tab stops with no visible focus change: ${keyboard.noIndicator.join('; ')}`, keyboard.noIndicator);
    if (keyboard.hiddenFocus.length) add('medium', 'keyboard', `focus lands on invisible elements: ${keyboard.hiddenFocus.join('; ')}`, keyboard.hiddenFocus);
    add('info', 'keyboard', `${keyboard.stops} Tab stops, ${keyboard.withIndicator} with a visible focus change`);
  }

  // reduced motion: behaviour under the preference, compared with the default
  if (motion) {
    const r = motion.reduce; const n = motion.normal;
    if (r.infinite > 0 || r.long > 0) add('high', 'reduced-motion', `under prefers-reduced-motion ${r.infinite} infinite and ${r.long} long (> 5 s) animations are still running (${r.names.join(', ')}) — verify they are essential`, r);
    if (r.videosPlaying > 0) add('high', 'reduced-motion', `${r.videosPlaying} video(s) still autoplaying under prefers-reduced-motion`, r);
    if (r.running > 0 && !(r.infinite > 0 || r.long > 0)) add('medium', 'reduced-motion', `${r.running} short animations still run under prefers-reduced-motion (${r.names.join(', ')})`, r);
    const scrollDriven = desk.libs.gsap || desk.libs.scrollTrigger || desk.libs.lenis || desk.libs.webglCanvas;
    if (scrollDriven) add('medium', 'reduced-motion', 'scroll-driven or WebGL motion cannot be observed here — verify the reduced-motion path with `capture --both`', null, { basis: 'manual' });
    add('info', 'reduced-motion', `animations running: ${n.running} by default → ${r.running} with reduced motion (videos ${n.videosPlaying} → ${r.videosPlaying}); static rule present: ${desk.reducedMotionRule}`);
  }

  const ex = ctx.extra;
  if (ex?.frames) {
    const [early, settled] = ex.frames; const dE = Math.round(deltaE(early.colour, settled.colour));
    if (early.share >= 0.9 && dE > 10) add('high', 'first-paint', `at ~350 ms the first screen is ${Math.round(early.share * 100)} % ${hex(early.colour)}, far from the settled screen (${hex(settled.colour)}, ΔE ${dE}): a white flash or blank first frame. Paint the ground on html/body and give media a poster colour`);
    else add('info', 'first-paint', `early frame ${Math.round(early.share * 100)} % ${hex(early.colour)} vs settled ${hex(settled.colour)} (ΔE ${dE})`);
  }
  if (ex?.h1At1500 && !ex.h1At1500.visible) add('high', 'first-paint', `the h1 is not visible 1.5 s after load (opacity ${ex.h1At1500.opacity}): an entrance or loader hides the first frame`);
  if (ex?.video) {
    for (const v of ex.video.videos) {
      const name = v.src.split('/').pop() || '(no source)';
      const failed = ctx.errors.some((e) => e.includes('request failed') && v.src && e.includes(name));
      if (v.error && failed) add('high', 'video-playback', `video ${name} failed to load (error ${v.error})`, v);
      else if (v.error === 4 && !ex.video.h264) add('info', 'video-playback', `video ${name}: codec not decodable in this test browser (no H.264 in bundled Chromium): not a page bug; check in Chrome`, v);
      else if (v.error) add('high', 'video-playback', `video ${name} has a media error (code ${v.error})`, v);
      else if (v.readyState < 2) add('high', 'video-playback', `video ${name} is not ready after load (readyState ${v.readyState}): no frame to show`, v);
      else if (v.paused) add('high', 'video-playback', `autoplay video ${name} is paused after load (add muted and playsinline)`, v);
    }
    for (const v of ex.video.videos.filter((x) => x.loop && !x.managedLoop)) {
      const name = (v.src.split('/').pop() || 'video').slice(0, 60);
      if (v.seam === null || v.seam === undefined) add('info', 'loop-seam', `looping video ${name}: seam not measured (needs ffmpeg)`);
      else if (v.seam > SEAM_THRESHOLD) add('medium', 'loop-seam', `looping video ${name}: first and last frame differ (seam ${v.seam}), so every loop jumps. Use recipes/video-loop.js (fade at the end), a boomerang copy (darkroom media boomerang) or --loop crossfade (darkroom media web)`, { seam: v.seam });
      else add('info', 'loop-seam', `looping video ${name}: seam ${v.seam} (clean)`);
    }
    if (ex.video.videos.length) add('info', 'video-playback', `${ex.video.videos.length} autoplay video(s) checked; H.264 in this browser: ${ex.video.h264}`);
  }
  if (ex?.blend?.partial) add('high', 'frame-blend', `${ex.blend.partial} of ${ex.blend.draws} full-size image draws on ${ex.blend.canvases.join(', ')} were see-through: one frame shows through another (ghosting). Draw one frame at a time at full opacity; for smoother motion extract more frames, never blend neighbours or fade a still over the film`, ex.blend);
  else if (ex?.blend?.draws) add('info', 'frame-blend', `${ex.blend.draws} full-size canvas image draws while scrolling, all at full opacity`);
  if (ex?.fling?.flips >= 6) add('high', 'scrub-fling', `fast fling on a phone (CPU x4): the film on ${ex.fling.canvas} changed direction ${ex.fling.flips} times while the scroll changed 3 times (${ex.fling.jumps} jumps of more than 12 frames): far-away frames flash. Show the closest decoded frame between the one on screen and the wanted one, keep fetched frames in memory, decode ahead in the direction of travel, cap the speed (recipes/scrub-frames.js, recipes/README.md rules 6 and 6a)`, ex.fling);
  else if (ex?.fling?.draws) add('info', 'scrub-fling', `fast fling on a phone (CPU x4): the film on ${ex.fling.canvas} followed the scroll (${ex.fling.flips} direction changes for the scroll's 3, ${ex.fling.draws} frame draws)`);
  if (ex?.fling?.glide > 30) add('high', 'scroll-glide', `the page moved its own scroll by ${ex.fling.glide} px after the scroll came to rest in the frame scene (snapping or gliding to a stop). Remove it; for breaking points hold the film on chosen frames instead (holdAt in recipes/scrub-frames.js, recipes/README.md rule 2)`, ex.fling);
  if (ex?.dead) {
    const d = ex.dead;
    if (d.screens > 4) add('high', 'dead-scroll', `${d.screens} screens of scroll in a row with almost no visible change (from y ${d.fromY}): the visitor scrolls and nothing new appears. Shorten the pinned stretch, or give each screen something to see or read`, d);
    else if (d.screens > 2) add('medium', 'dead-scroll', `${d.screens} screens of scroll with almost no visible change (from y ${d.fromY}): keep stretches without change under about two screens`, d);
    else add('info', 'dead-scroll', `longest stretch without visible change: ${d.screens} screens`);
  }
  if (ex?.budget) {
    const b = ex.budget; const list = b.hooks.slice(0, 6).join('; ');
    if (b.count > 5) add('high', 'motion-budget', `${b.count} things move by themselves in one screen (at y ${b.y}): ${list}. One signature and at most three moving things per screen: stop or remove the rest (references/modes.md, "One signature per page")`, b);
    else if (b.count > 3) add('medium', 'motion-budget', `${b.count} things move by themselves in one screen (at y ${b.y}): ${list}. Keep it to three: the signature and two quiet ones (references/modes.md)`, b);
    else add('info', 'motion-budget', `most things moving by themselves in one screen: ${b.count} (${b.distinct} different across the page)`);
    if (b.allowed.length) add('info', 'motion-budget', `motion the user asked for ([data-motion-allow]), not counted: ${b.allowed.join(', ')}`);
  }
  if (desk.glassCaptions?.sections >= 3) add('medium', 'glass-caption', `the same frosted caption card (e.g. "${desk.glassCaptions.text}") repeats in ${desk.glassCaptions.sections} sections: it reads as a template. Vary the text treatment by chapter, or keep one fixed card as a reading anchor`, desk.glassCaptions);
  if (mob.phoneGate) add('high', 'phone-gate', `the phone view shows a gate ("${mob.phoneGate}") instead of the page: build the phone version (stacked chapters, stills instead of heavy scenes)`);
  for (const [label, d, floor] of [['desktop', desk, 48], ['mobile', mob, 32]]) {
    if (d.filmHeadline && d.filmHeadline.size < floor) add('medium', 'film-headline', `${label}: the first-screen h1 "${d.filmHeadline.text}" is ${d.filmHeadline.size} px over full-screen ${d.filmHeadline.over}: below the ${floor} px floor it loses to the picture. Later chapters may use smaller text`, d.filmHeadline, { viewport: label });
  }
  if (ex?.weight) {
    const mbW = +(ex.weight.bytes / 1048576).toFixed(1);
    if (mbW > 8) add('high', 'first-scroll-weight', `${mbW} MB on the wire before the visitor scrolls (${ex.weight.requests} requests): load the first chapter only and fetch the rest as the visitor approaches it (~4 MB budget)`, ex.weight);
    else if (mbW > 4) add('medium', 'first-scroll-weight', `${mbW} MB before the first scroll (${ex.weight.requests} requests), over the ~4 MB budget: defer later chapters' frames, video and 3D`, ex.weight);
    else add('info', 'first-scroll-weight', `${mbW >= 1 ? `${mbW} MB` : `${Math.round(ex.weight.bytes / 1024)} KB`} before the first scroll (${ex.weight.requests} requests)`);
  }
  for (const c of ex?.chains ?? []) for (const s of c.seams) {
    if (s.seam === null) add('info', 'chain-seam', `chain "${c.name}" ${s.from} → ${s.to}: seam not measured (needs ffmpeg)`);
    else if (s.seam > SEAM_THRESHOLD) add('medium', 'chain-seam', `chain "${c.name}": ${s.from} → ${s.to} jumps (seam ${s.seam} > ${SEAM_THRESHOLD}). Make the next clip from the extracted last frame of the one before, keep one model for the chain, or crossfade 6–8 frames (references/scroll-film.md)`, s);
    else add('info', 'chain-seam', `chain "${c.name}": ${s.from} → ${s.to} seam ${s.seam} (clean)`);
  }
  if (ex?.font) {
    const f = ex.font;
    if (f.declared > 0 && f.loaded === 0) add('high', 'display-font', `the h1 font "${f.family}" did not load (${f.declared} face(s) declared, ${f.failed} failed): the headline shows in a fallback`, f);
    else if (f.declared === 0) add('info', 'display-font', `the h1 uses "${f.family}", not loaded by the page (a system or generic font)`);
  }
  for (const [when, list] of [['2 s after load', ex?.restJs], ['with JavaScript disabled', ex?.restNoJs]]) {
    if (!list?.length) continue;
    add(list.some((x) => x.h1) || list.length >= 3 ? 'high' : 'medium', 'motion-rest', `${when}: ${list.length} text item(s) in the first viewport are invisible: ${list.slice(0, 4).map((x) => `"${x.text}"`).join(', ')}. The rest state must show the content`, list);
  }

  const first = ctx.hosts.size ? [...ctx.hosts].filter((h) => !sameSite(h, ctx.host)) : [];
  const trackers = first.filter((h) => TRACKERS.test(h));
  if (trackers.length) add('high', 'third-party', `loaded before consent: ${trackers.join(', ')} (self-host fonts; consent-gate trackers/embeds)`);
  if (first.length) add('info', 'third-party', `third-party hosts: ${first.join(', ')}`);
  if (desk.prices.length) add('info', 'price', `prices found: ${[...new Set(desk.prices)].slice(0, 8).join(', ')} — EU: final price incl. VAT; discounts show the 30-day prior price`);
  if (desk.disclosureFound === false) add('high', 'disclosure', `required disclosure text not found: "${s.disclosure}"`);
  const fav = ctx.errors.filter((e) => /favicon/i.test(e)); const errs = ctx.errors.filter((e) => !/favicon/i.test(e));
  if (errs.length) add('high', 'console', `${errs.length} console/page errors or failed requests`, errs.slice(0, 10));
  if (fav.length || (ctx.errors.length && !errs.length)) add('medium', 'console', 'no favicon (the browser requested one and got an error): add <link rel="icon"> and an apple-touch-icon');
  const order = { high: 0, medium: 1, low: 2, info: 3 };
  return F.sort((a, b) => order[a.sev] - order[b.sev]);
}

// Scroll-triggered reveals (IntersectionObserver, ScrollTrigger) keep text at opacity 0 until it has been on screen.
// Scroll through the page once, as a visitor would, so the audit measures the revealed page and not a half-empty one.
// Reveals that hide again when scrolled away stay invisible to the audit (see commands/audit.md).
async function revealPass(page) {
  const steps = await page.evaluate(() => Math.min(40, Math.ceil((document.documentElement.scrollHeight - innerHeight) / (innerHeight * 0.8))));
  for (let i = 1; i <= steps; i++) {
    const before = await page.evaluate(() => scrollY);
    await page.evaluate((k) => scrollTo({ top: k * innerHeight * 0.8, behavior: 'instant' }), i);
    await page.waitForTimeout(90);
    // a page that drives its own scroll (smooth-scroll wrapper) may ignore scrollTo: use the wheel, as a visitor would
    if (await page.evaluate((b) => Math.abs(scrollY - b) < 1, before)) { const vp = page.viewportSize(); await page.mouse.move(vp.width / 2, vp.height / 2); await page.mouse.wheel(0, vp.height * 0.8); await page.waitForTimeout(250); }
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(steps ? 400 : 0);
}

// Motion budget: default motion, desktop. At each screen, list what moves by itself (not hover, cursor or scroll-linked motion).
// Self-contained: serialised into the page.
function motionHooks() {
  const W = innerWidth, H = innerHeight;
  const box = (el) => {
    if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return null;
    const r = el.getBoundingClientRect();
    return r.width < 8 || r.height < 8 || r.bottom <= 0 || r.top >= H || r.right <= 0 || r.left >= W ? null : r;
  };
  const label = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : '');
  const hooks = new Map(); const allowed = new Set();
  for (const a of document.getAnimations()) {
    const t = a.effect?.getComputedTiming?.(); const el = a.effect?.target;
    if (a.playState !== 'running' || !t || t.iterations !== Infinity || !el?.isConnected || !box(el)) continue;
    const ok = el.closest('[data-motion-allow]'); if (ok) { allowed.add(label(ok)); continue; }
    let svg = el.closest('svg'); while (svg?.parentElement?.closest('svg')) svg = svg.parentElement.closest('svg');
    const root = el.closest('[data-motion]') || svg; const name = a.animationName || a.id || 'animation';
    const key = root || 'name:' + name;
    if (!hooks.has(key)) hooks.set(key, root ? label(root) + ' loop' : '"' + name + '" loop on ' + label(el));
  }
  for (const v of document.querySelectorAll('video')) {
    if (v.paused || v.ended || !box(v)) continue;
    if (v.closest('[data-motion-allow]')) { allowed.add(label(v)); continue; }
    hooks.set(v, 'video ' + (v.currentSrc || '').split('/').pop().slice(0, 40));
  }
  const canvases = [];
  for (const c of document.querySelectorAll('canvas')) {
    const r = box(c); if (!r || r.width < 80 || r.height < 80) continue;
    const x = Math.max(0, r.left), y = Math.max(0, r.top);
    canvases.push({ label: label(c), allowed: !!c.closest('[data-motion-allow]'), clip: { x, y, width: Math.min(W, r.right) - x, height: Math.min(H, r.bottom) - y } });
  }
  return { hooks: [...hooks.values()], allowed: [...allowed], canvases };
}
async function motionBudgetPass(page) {
  const vpH = page.viewportSize().height;
  const total = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - innerHeight));
  const steps = Math.min(25, Math.ceil(total / vpH));
  let worst = { count: -1, y: 0, hooks: [] }; const allowed = new Set(); const all = new Set();
  for (let i = 0; i <= steps; i++) {
    await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), Math.min(total, i * vpH));
    await page.waitForTimeout(450);
    const s = await page.evaluate(motionHooks);
    for (const c of s.canvases.slice(0, 4)) { // a canvas counts only if its pixels change while nobody touches the page
      const a = await page.screenshot({ clip: c.clip, type: 'jpeg', quality: 50 }); await page.waitForTimeout(250);
      const b = await page.screenshot({ clip: c.clip, type: 'jpeg', quality: 50 });
      if (!a.equals(b)) (c.allowed ? s.allowed : s.hooks).push(c.allowed ? c.label : 'canvas ' + c.label);
    }
    s.allowed.forEach((x) => allowed.add(x)); s.hooks.forEach((h) => all.add(h));
    if (s.hooks.length > worst.count) worst = { count: s.hooks.length, y: await page.evaluate(() => Math.round(scrollY)), hooks: s.hooks };
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  return { ...worst, allowed: [...allowed], distinct: all.size };
}

// Dead scroll: default motion, desktop. Scroll the document in half-screen steps, photograph each rest, and find the
// longest stretch where the picture barely changed (< 1.5 % of 96×60 thumbnail pixels) although the page moved.
async function deadScrollPass(page, browser) {
  const vp = page.viewportSize();
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  if (total < vp.height) return null;
  const step = vp.height / 2; const n = Math.min(60, Math.ceil(total / step));
  const ys = []; const shots = [];
  for (let i = 0; i <= n; i++) {
    await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), Math.min(total, Math.round(i * step)));
    await page.waitForTimeout(250);
    ys.push(await page.evaluate(() => scrollY)); shots.push(await page.screenshot({ type: 'jpeg', quality: 60 }));
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  const ctx = await browser.newContext(); const p = await ctx.newPage();
  let changed;
  try {
    changed = await p.evaluate(async (list) => {
      const px = await Promise.all(list.map(async (b64) => { const img = new Image(); img.src = 'data:image/jpeg;base64,' + b64; await img.decode(); const c = document.createElement('canvas'); c.width = 96; c.height = 60; const g = c.getContext('2d'); g.drawImage(img, 0, 0, 96, 60); return g.getImageData(0, 0, 96, 60).data; }));
      return px.slice(1).map((d, i) => { const a = px[i]; let n = 0; for (let k = 0; k < d.length; k += 4) if (Math.abs(d[k] - a[k]) + Math.abs(d[k + 1] - a[k + 1]) + Math.abs(d[k + 2] - a[k + 2]) > 30) n++; return n / (d.length / 4); });
    }, shots.map((b) => b.toString('base64')));
  } finally { await ctx.close(); }
  let run = 0; let runFrom = 0; let worst = { px: 0, from: 0 };
  for (let i = 1; i < ys.length; i++) {
    const moved = ys[i] - ys[i - 1];
    if (moved < step * 0.4) { run = 0; continue; } // the page did not really move here (the end, or a scroll lock)
    if (changed[i - 1] < 0.015) { if (!run) runFrom = ys[i - 1]; run += moved; if (run > worst.px) worst = { px: run, from: runFrom }; } else run = 0;
  }
  return { screens: +(worst.px / vp.height).toFixed(1), fromY: Math.round(worst.from), steps: n };
}

// Chained clips: <video data-chain="name">, grouped by name in page order.
function chainState() {
  const groups = {};
  for (const v of document.querySelectorAll('video[data-chain]')) (groups[v.dataset.chain] ??= []).push(v.currentSrc || v.src || v.querySelector('source')?.src || '');
  return Object.entries(groups).filter(([, l]) => l.length > 1).map(([name, urls]) => ({ name, urls }));
}

// Init script: records full-size canvas image draws and the ones made at partial opacity (a frame over a frame = ghosting).
// Sizes are in canvas pixels after the context transform; a draw counts when it covers half the canvas or more.
function blendProbe() {
  const rec = window.__drBlend = { draws: 0, partial: 0, canvases: [] };
  const orig = CanvasRenderingContext2D.prototype.drawImage;
  CanvasRenderingContext2D.prototype.drawImage = function (img, ...a) {
    try {
      const c = this.canvas;
      // a canvas drawn onto a canvas is a trail or feedback buffer, not a film frame
      const buffer = img instanceof HTMLCanvasElement || (typeof OffscreenCanvas !== 'undefined' && img instanceof OffscreenCanvas);
      if (c instanceof HTMLCanvasElement && !buffer && c.clientWidth * c.clientHeight >= 0.15 * innerWidth * innerHeight) {
        const dw = a.length >= 4 ? a[a.length - 2] : (img.videoWidth || img.width), dh = a.length >= 4 ? a[a.length - 1] : (img.videoHeight || img.height);
        const m = this.getTransform();
        if (Math.abs(dw * dh * m.a * m.d) >= 0.5 * c.width * c.height) {
          rec.draws++;
          const al = this.globalAlpha;
          if (al > 0.03 && al < 0.97 && !c.closest('[data-frame-blend="allow"]')) {
            rec.partial++;
            const id = c.id ? `canvas#${c.id}` : c.classList.length ? `canvas.${[...c.classList].join('.')}` : 'canvas';
            if (!rec.canvases.includes(id)) rec.canvases.push(id);
          }
        }
      }
    } catch { /* never break the page */ }
    return orig.call(this, img, ...a);
  };
}

// Init script for the fling pass: which film frame the largest canvas paints. A frame is the number at the end of the
// file name it came from (seq_0042.webp → 42), followed through fetch → blob → createImageBitmap, or an <img>'s src.
function flingTagProbe() {
  const rec = window.__drFling = { last: null, draws: 0, canvas: null };
  const num = (u) => { try { const m = /(?:^|[^\d.])(\d+)\.\w+$/.exec(new URL(u, location.href).pathname); return m ? +m[1] : null; } catch { return null; } };
  const tag = new WeakMap();
  const blob = Response.prototype.blob;
  Response.prototype.blob = async function () { const b = await blob.call(this); const n = num(this.url); if (n !== null) tag.set(b, n); return b; };
  const cib = window.createImageBitmap;
  window.createImageBitmap = async function (src, ...a) {
    const bmp = await cib.call(this, src, ...a);
    try { const n = tag.get(src) ?? (src instanceof HTMLImageElement ? num(src.currentSrc || src.src) : null); if (n !== null && n !== undefined) tag.set(bmp, n); } catch { /* never break the page */ }
    return bmp;
  };
  const di = CanvasRenderingContext2D.prototype.drawImage;
  CanvasRenderingContext2D.prototype.drawImage = function (img, ...a) {
    try {
      const c = this.canvas;
      if (c instanceof HTMLCanvasElement && this.globalAlpha >= 0.5 && c.clientWidth * c.clientHeight >= 0.15 * innerWidth * innerHeight) {
        const n = tag.get(img) ?? (img instanceof HTMLImageElement ? num(img.currentSrc || img.src) : null);
        if (n !== null && n !== undefined) { rec.last = n; rec.draws++; rec.el = c; rec.canvas = c.id ? `canvas#${c.id}` : c.classList.length ? `canvas.${[...c.classList].join('.')}` : 'canvas'; }
      }
    } catch { /* never break the page */ }
    return di.call(this, img, ...a);
  };
}

// Phone view, CPU slowed 4x: fling down the frame scene, rest, fling back up, rest; sample the painted frame every
// animation frame and count how often the film changes direction (the scroll does once). Then rest mid-scene and see
// whether the page moves its own scroll (snapping / gliding to a stop).
async function flingPass(browser, url) {
  const ctx = await browser.newContext({ ...contextFor(VIEWPORTS['mobile-390']), reducedMotion: 'no-preference' });
  try {
    const page = await ctx.newPage();
    await page.addInitScript(flingTagProbe);
    await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    if (!await page.evaluate(() => !!document.querySelector('canvas'))) return null;
    await settle(page);
    await page.waitForTimeout(2500); // frame files arrive
    try { const cdp = await ctx.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 }); } catch { /* not Chromium: unthrottled */ }
    return await page.evaluate(async () => {
      const c = window.__drFling.el; // the canvas that painted film frames
      if (!c) return null;
      let scene = c.parentElement;
      while (scene && scene !== document.body && scene.offsetHeight < 1.5 * innerHeight) scene = scene.parentElement;
      if (!scene || scene === document.body) return null;
      const top = scene.getBoundingClientRect().top + scrollY, end = top + scene.offsetHeight - innerHeight;
      const raf = () => new Promise((r) => requestAnimationFrame(r));
      const to = (y) => scrollTo({ top: y, behavior: 'instant' });
      const seq = [];
      const fling = async (from, dest, frames) => {
        for (let i = 1; i <= frames; i++) { to(from + (dest - from) * (1 - (1 - i / frames) ** 3)); await raf(); seq.push(window.__drFling.last); }
        for (let i = 0; i < 90; i++) { await raf(); seq.push(window.__drFling.last); }
      };
      to(top); for (let i = 0; i < 30; i++) await raf();
      const before = window.__drFling.draws;
      const at = (k) => top + (end - top) * k;
      await fling(top, end, 45); // the whole scene in ~0.75 s, then back and forth: the scroll changes direction 3 times
      await fling(end, at(0.3), 30);
      await fling(at(0.3), at(0.8), 20);
      await fling(at(0.8), top, 25);
      let flips = 0, jumps = 0, prev = null, sign = 0;
      for (const f of seq) {
        if (typeof f !== 'number') continue;
        if (prev !== null && f !== prev) { const s = Math.sign(f - prev); if (sign && s !== sign) flips++; sign = s; if (Math.abs(f - prev) > 12) jumps++; }
        prev = f;
      }
      const rest = Math.round(top + (end - top) * 0.37);
      to(rest); await new Promise((r) => setTimeout(r, 1500));
      return { canvas: window.__drFling.canvas, draws: window.__drFling.draws - before, flips, jumps, glide: Math.round(Math.abs(scrollY - rest)) };
    });
  } catch (e) { if (process.env.DARKROOM_DEBUG) console.error('fling pass:', e.message); return null; } finally { await ctx.close(); }
}

// ---------- run ----------
export async function audit(target, opt, { resolveSettings, study = false } = {}) {
  const { settings, source, problem } = resolveSettings(opt.bible);
  const probeArgs = {
    maxZones: Number(settings.maxZones ?? 3),
    wordBudgets: { hero: 30, feature: 45, proof: 60, closing: 30, ...(settings.wordBudgets ?? {}) },
    disclosure: settings.disclosure || '', surface: settings.surface ?? 'landing',
  };
  const served = await resolveTarget(target);
  const url = served.url;
  const browser = await launch();
  const host = new URL(url).host;
  const hosts = new Set(); const errors = []; const urls = [];
  let consent = { action: 'none' };
  const run = async (vp, { motion = 'reduce', full = true, early = false, js = true } = {}) => {
    const ctx = await browser.newContext({ ...contextFor(vp), reducedMotion: motion, javaScriptEnabled: js });
    const page = await ctx.newPage();
    page.on('request', (r) => { try { hosts.add(new URL(r.url()).host); urls.push(r.url()); } catch { /* data: */ } });
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('requestfailed', (r) => errors.push(`request failed: ${r.url().slice(0, 100)}`));
    if (early) await page.addInitScript(blendProbe);
    // bytes on the wire per request (Chromium network counters), read once before the first scroll
    const net = new Map();
    if (early) {
      try {
        const cdp = await ctx.newCDPSession(page); await cdp.send('Network.enable');
        cdp.on('Network.dataReceived', (e) => net.set(e.requestId, (net.get(e.requestId) ?? 0) + (e.encodedDataLength || 0)));
        cdp.on('Network.loadingFinished', (e) => net.set(e.requestId, Math.max(net.get(e.requestId) ?? 0, e.encodedDataLength || 0)));
      } catch { /* not Chromium: weight not measured */ }
    }
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const t0 = Date.now(); const extra = {};
    if (!js) { await settle(page); extra.restNoJs = await page.evaluate(hiddenRestText); await ctx.close(); return extra; }
    if (early) {
      await page.waitForTimeout(Math.max(0, 350 - (Date.now() - t0)));
      extra.earlyShot = await page.screenshot({ type: 'png' });
      await page.waitForTimeout(Math.max(0, 1500 - (Date.now() - t0)));
      extra.h1At1500 = await page.evaluate(h1Visible);
    }
    await settle(page);
    if (early) {
      await page.waitForTimeout(Math.max(0, 2000 - (Date.now() - t0)));
      extra.settledShot = await page.screenshot({ type: 'png' });
      extra.weight = net.size ? { bytes: [...net.values()].reduce((s, n) => s + n, 0), requests: net.size } : null;
      extra.restJs = await page.evaluate(hiddenRestText);
      extra.video = await page.evaluate(videoState);
      for (const v of extra.video.videos) if (v.loop && !v.managedLoop && /^https?:/.test(v.url)) { try { const a = await grabAsync(v.url, 'first'); const b = a && await grabAsync(v.url, 'last'); v.seam = a && b ? seamScore(a, b) : null; } catch { v.seam = null; } }
      extra.chains = await page.evaluate(chainState);
      for (const c of extra.chains) {
        c.seams = [];
        for (let i = 0; i < c.urls.length - 1; i++) {
          let seam = null;
          try { const a = /^https?:/.test(c.urls[i]) && await grabAsync(c.urls[i], 'last'); const b = a && await grabAsync(c.urls[i + 1], 'first'); seam = a && b ? seamScore(a, b) : null; } catch { seam = null; }
          c.seams.push({ from: c.urls[i].split('/').pop(), to: c.urls[i + 1].split('/').pop(), seam });
        }
      }
    }
    if (full && (study || opt.dismiss)) consent = await dismissConsent(page, { allowAccept: !!opt['accept-consent'] });
    if (full) await revealPass(page);
    await page.waitForTimeout(700);
    const motionNow = await page.evaluate(motionState);
    if (early && await page.evaluate(() => !!document.querySelector('canvas'))) { await revealPass(page); extra.blend = await page.evaluate(() => window.__drBlend ?? null); }
    if (early) { try { extra.budget = await motionBudgetPass(page); } catch (e) { if (process.env.DARKROOM_DEBUG) console.error('motion-budget pass:', e.message); } }
    if (early) { try { extra.dead = await deadScrollPass(page, browser); } catch (e) { if (process.env.DARKROOM_DEBUG) console.error('dead-scroll pass:', e.message); } }
    if (!full) { await ctx.close(); return { motion: motionNow, extra }; }
    const dom = await page.evaluate(probeDom, probeArgs);
    const contrast = await pixelContrast(page, vp);
    const colour = vp.width >= 1024 ? await uiColourShare(page) : null;
    const keyboard = vp.width >= 1024 ? await keyboardProbe(page) : null;
    const font = vp.width >= 1024 ? await page.evaluate(displayFont) : null;
    await ctx.close();
    return { dom, colour, contrast, keyboard, font, motion: motionNow };
  };
  let d; let m; let normal; let noJs; let frames = null; let fling = null;
  try {
    d = await run(VIEWPORTS['desktop-1440']);
    m = await run(VIEWPORTS['mobile-390']);
    normal = await run(VIEWPORTS['desktop-1440'], { motion: 'no-preference', full: false, early: true });
    noJs = await run(VIEWPORTS['desktop-1440'], { js: false });
    fling = await flingPass(browser, url);
    if (normal.extra.earlyShot && normal.extra.settledShot) frames = await frameStats(browser, [normal.extra.earlyShot, normal.extra.settledShot]);
  } finally { await browser.close(); await served.close(); }
  const scriptLibs = {
    gsap: urls.some((u) => /gsap|scrolltrigger/i.test(u)), lenis: urls.some((u) => /lenis/i.test(u)),
    three: urls.some((u) => /three(\.module)?(\.min)?\.js|three@/i.test(u)), locomotive: urls.some((u) => /locomotive/i.test(u)),
  };
  for (const k of Object.keys(scriptLibs)) if (scriptLibs[k]) d.dom.libs[k] = true;
  const result = {
    url, date: new Date().toISOString(),
    capture: { mode: 'prefers-reduced-motion: reduce (plus one default-motion pass for the motion comparison)', viewports: ['desktop-1440', 'mobile-390'], consent, tools: toolVersions(null) },
    config: { source, problem }, settings,
    findings: findings({ desk: d.dom, mob: m.dom, colour: d.colour, motion: { reduce: d.motion, normal: normal.motion }, keyboard: d.keyboard, contrast: { desktop: d.contrast, mobile: m.contrast }, ctx: { settings, fonts: opt.fonts, mode: opt.mode, hosts, host, errors, problem, extra: { frames, h1At1500: normal.extra.h1At1500, video: normal.extra.video, restJs: normal.extra.restJs, restNoJs: noJs.restNoJs, font: d.font, blend: normal.extra.blend, fling, weight: normal.extra.weight, chains: normal.extra.chains, dead: normal.extra.dead, budget: normal.extra.budget } } }),
    desktop: d.dom, mobile: { zones: m.dom.zones, travel: m.dom.travel, smallTargets: m.dom.smallTargets, overflow: m.dom.overflow, nameless: m.dom.nameless, unlabeled: m.dom.unlabeled },
    colour: d.colour, contrast: { desktop: d.contrast, mobile: m.contrast }, keyboard: d.keyboard, motion: { reduce: d.motion, normal: normal.motion },
  };
  if (study) return result;
  const out = opt.json ?? '.darkroom/qa/audit.json';
  mkdirp(path.dirname(out));
  fs.writeFileSync(out, JSON.stringify(result, null, 2));
  const icon = { high: '✖', medium: '▲', low: '·', info: 'i' };
  console.log(`config: ${source ?? 'none'}${problem ? ` (${problem})` : ''}`);
  for (const f of result.findings) console.log(`${icon[f.sev]} ${f.sev.padEnd(6)} ${f.check.padEnd(15)} ${f.msg}`);
  const highs = result.findings.filter((f) => f.sev === 'high').length;
  console.log(`\n${highs} high · ${result.findings.filter((f) => f.sev === 'medium').length} medium → ${out}`);
  process.exitCode = highs ? 1 : 0;
  return result;
}
