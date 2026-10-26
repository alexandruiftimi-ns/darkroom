// Darkroom audit: measurable checks. Every finding says how it was established (basis):
//   measured  - read from the rendered page (pixels, computed state, behaviour)
//   heuristic - a rule of thumb applied to measurements; a kept exception is legitimate
//   manual    - the script cannot decide; a person must look
import fs from 'node:fs';
import path from 'node:path';
import { VIEWPORTS, contextFor, launch, settle, mkdirp, toolVersions } from './browser.mjs';
import { dismissConsent } from './consent.mjs';
import { resolveTarget } from './serve.mjs';

// ---------- check registry (docs and tests read this; keep it the single source of severity) ----------
export const CHECKS = [
  { id: 'fonts', sev: 'high', basis: 'measured', what: 'font families rendered vs budget', limits: 'visible text only; fallback-stack glyphs are not traced' },
  { id: 'type-scale', sev: 'medium', basis: 'heuristic', what: '> 9 distinct rendered font sizes', limits: 'fluid clamp() sizes inflate the count' },
  { id: 'reading-zones', sev: 'high', basis: 'heuristic', what: 'text zones in the first viewport (> max+1 high, > max medium)', limits: 'first viewport only; zones are clustered by distance' },
  { id: 'eye-travel', sev: 'medium', basis: 'heuristic', what: 'reading path crosses the viewport > 2x', limits: 'document order is assumed to be reading order' },
  { id: 'corners', sev: 'medium', basis: 'heuristic', what: 'content in 3+ viewport corners', limits: '' },
  { id: 'overflow', sev: 'high', basis: 'measured', what: 'page wider than the viewport', limits: 'initial state only' },
  { id: 'target-size', sev: 'medium', basis: 'measured', what: 'crowded interactive targets < 24x24 CSS px (WCAG 2.5.8 with spacing exception)', limits: 'inline-in-sentence links exempt' },
  { id: 'headline-length', sev: 'low', basis: 'heuristic', what: 'headline > 8 words', limits: '' },
  { id: 'word-budget', sev: 'high', basis: 'heuristic', what: 'visible copy words vs section budget (> 2x high, > 1x medium); skipped for surface "read"', limits: 'excludes [data-darkroom-ignore] and aria-hidden subtrees; section boundaries are guessed from markup' },
  { id: 'copy', sev: 'medium', basis: 'heuristic', what: 'genre words (unlock, seamless, ...)', limits: 'English only' },
  { id: 'urgency', sev: 'high', basis: 'heuristic', what: 'urgency / pressure copy', limits: 'English only; a real dated deadline is legitimate' },
  { id: 'page-length', sev: 'high', basis: 'heuristic', what: '> 1200 visible words; skipped for surface "read"', limits: '' },
  { id: 'colour', sev: 'medium', basis: 'heuristic', what: 'UI hue families / accent share vs colour mode', limits: 'imagery is hidden before measuring; computed colours only' },
  { id: 'contrast', sev: 'high', basis: 'measured', what: 'text contrast from rendered pixels with effective alpha; per viewport', limits: 'varying backgrounds (photo, video, gradient) are reported as medium with the worst-case ratio; check the lightest video frame by eye' },
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

  // zones in first viewport (header/nav excluded)
  const boxes = [];
  textEls.forEach((el, i) => {
    if (el.closest('header, nav, [role=banner], [role=navigation]')) return;
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
  const bodyText = document.body.innerText;
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
    disclosureFound: disclosure ? norm(bodyText).includes(norm(disclosure)) : null,
    overflow: document.documentElement.scrollWidth - innerWidth,
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
    out.push({ id, rects, rgba: fill, opacity, size, bold: Number(s.fontWeight) >= 700, gradientText: s.backgroundClip === 'text' || s.webkitBackgroundClip === 'text', label: (el.innerText || el.textContent).trim().slice(0, 40) });
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
    if (d.overflow > 0) add('high', 'overflow', `${label}: page ${d.overflow}px wider than the viewport`, null, { viewport: label });
    if (d.smallTargets.length) add('medium', 'target-size', `${label}: ${d.smallTargets.length} crowded targets < 24px, e.g. ${d.smallTargets.slice(0, 4).map((t) => `${t.el} "${t.text}" ${t.w}×${t.h}`).join('; ')}`, d.smallTargets, { viewport: label });
  }
  add('info', 'reading-zones', `desktop zones in order: ${desk.zones.map((z) => `[${z.text}]`).join(' → ')} · travel ${desk.travel}`);

  if (!read) {
    for (const sec of desk.sections) {
      if (sec.headlineWords > 8) add('low', 'headline-length', `${sec.id}: headline ${sec.headlineWords} words (≤ 8)`);
      if (sec.bodyWords > sec.budget * 2) add('high', 'word-budget', `${sec.id}: ${sec.bodyWords} words vs budget ${sec.budget}`);
      else if (sec.bodyWords > sec.budget) add('medium', 'word-budget', `${sec.id}: ${sec.bodyWords} words vs budget ${sec.budget}`);
    }
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
    await page.evaluate((k) => scrollTo({ top: k * innerHeight * 0.8, behavior: 'instant' }), i);
    await page.waitForTimeout(90);
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(steps ? 400 : 0);
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
  const run = async (vp, { motion = 'reduce', full = true } = {}) => {
    const ctx = await browser.newContext({ ...contextFor(vp), reducedMotion: motion });
    const page = await ctx.newPage();
    page.on('request', (r) => { try { hosts.add(new URL(r.url()).host); urls.push(r.url()); } catch { /* data: */ } });
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('requestfailed', (r) => errors.push(`request failed: ${r.url().slice(0, 100)}`));
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await settle(page);
    if (full && (study || opt.dismiss)) consent = await dismissConsent(page, { allowAccept: !!opt['accept-consent'] });
    if (full) await revealPass(page);
    await page.waitForTimeout(700);
    const motionNow = await page.evaluate(motionState);
    if (!full) { await ctx.close(); return { motion: motionNow }; }
    const dom = await page.evaluate(probeDom, probeArgs);
    const contrast = await pixelContrast(page, vp);
    const colour = vp.width >= 1024 ? await uiColourShare(page) : null;
    const keyboard = vp.width >= 1024 ? await keyboardProbe(page) : null;
    await ctx.close();
    return { dom, colour, contrast, keyboard, motion: motionNow };
  };
  let d; let m; let normal;
  try {
    d = await run(VIEWPORTS['desktop-1440']);
    m = await run(VIEWPORTS['mobile-390']);
    normal = await run(VIEWPORTS['desktop-1440'], { motion: 'no-preference', full: false });
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
    findings: findings({ desk: d.dom, mob: m.dom, colour: d.colour, motion: { reduce: d.motion, normal: normal.motion }, keyboard: d.keyboard, contrast: { desktop: d.contrast, mobile: m.contrast }, ctx: { settings, fonts: opt.fonts, mode: opt.mode, hosts, host, errors, problem } }),
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
