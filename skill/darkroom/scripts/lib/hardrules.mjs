// Darkroom hard rules: spacing, alignment, loading states, labels and the marks of a page nobody designed.
// Adapted from Hallmark's gates (github.com/nutlope/hallmark, MIT), rewritten and made stricter where the gate let
// real faults through (its off-scale gate only tests multiples of 4, so 28 px passes; here the scale is the named one
// and a rendered pass compares the gaps the page really has). references/tells.md says what binds and what does not.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { deltaE } from './audit.mjs';

// The default spacing scale (px). A page with its own --space-* tokens uses those instead.
export const SPACE_SCALE = [0, 1, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120, 144, 176];

// ---------- in-page probe (self-contained: it is serialised into the page) ----------
export async function probeHard({ scale, job }) {
  const W = innerWidth, H = innerHeight;
  const vis = (el) => {
    if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
    const r = el.getBoundingClientRect();
    return r.width >= 2 && r.height >= 2;
  };
  const ignored = (el) => !!el.closest('[data-darkroom-ignore],[aria-hidden="true"]');
  const moved = (el) => {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      const t = getComputedStyle(e).transform;
      if (t && t !== 'none' && !/^matrix\(1, 0, 0, 1, 0, 0\)$/.test(t)) return true;
    }
    return false;
  };
  const inFlow = (el) => { const p = getComputedStyle(el).position; return p !== 'absolute' && p !== 'fixed'; };
  const words = (t) => (t.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;
  const short = (el) => (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 34);
  const name = (el) => el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : '');
  const secOf = (el) => el.closest('main > section, main > article, body > section, [data-section]') ?? el.closest('header, footer, section') ?? document.body;
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const c2 = cv.getContext('2d', { willReadFrequently: true });
  const rgbOf = (c) => { c2.clearRect(0, 0, 1, 1); c2.fillStyle = '#000'; c2.fillStyle = c; c2.fillRect(0, 0, 1, 1); const d = c2.getImageData(0, 0, 1, 1).data; return d[3] < 40 ? null : [d[0], d[1], d[2]]; };
  const ctaLike = (el) => {
    if (!/^(A|BUTTON)$/.test(el.tagName) && el.getAttribute('role') !== 'button' && !(el.tagName === 'INPUT' && /submit|button/.test(el.type))) return false;
    if (el.tagName === 'A' && el.closest('p, li')) return false;
    const s = getComputedStyle(el);
    if (s.display === 'inline') return false;
    return !!rgbOf(s.backgroundColor) || parseFloat(s.borderTopWidth) > 0 || /\b(btn|button|cta)\b/i.test(el.className || '');
  };
  const out = { scale: {}, drift: [], edges: [], controls: [], wrap: [], crowded: [], cramped: [], sticky: [], nest: [], tracked: [], fit: null, wide: null, email: null, fakeSend: false, palette: null, display: null, loading: {}, fp: {} };

  // ---- spacing scale: every padding, margin and gap the stylesheets write (px and rem), against the page's scale
  const ok = new Set(scale); const tokens = new Set();
  const sheets = [...document.styleSheets].filter((sh) => { try { return !!sh.cssRules && !/wp-includes|wp-content\/plugins|cdn\.shopify|node_modules/.test(sh.href ?? ''); } catch { return false; } });
  const walk = (rules, fn) => { for (const r of rules) { if (r instanceof CSSKeyframesRule) continue; if (r.cssRules?.length && !(r instanceof CSSStyleRule)) walk(r.cssRules, fn); if (r instanceof CSSStyleRule) fn(r); } };
  const px = (v) => [...String(v).matchAll(/(-?[\d.]+)(px|rem)\b/g)].map((m) => Math.abs(parseFloat(m[1]) * (m[2] === 'rem' ? 16 : 1)));
  for (const sh of sheets) walk(sh.cssRules, (r) => { for (const p of r.style) if (/^--(space|spacing|gap|gutter|section-gap)/.test(p)) px(r.style.getPropertyValue(p)).forEach((v) => tokens.add(v)); });
  const off = []; const nudges = []; const raw = [];
  const seenDecl = new Set();
  for (const sh of sheets) walk(sh.cssRules, (r) => {
    for (const p of r.style) {
      if (!/^(padding|margin|gap|row-gap|column-gap|grid-gap)/.test(p)) continue;
      const v = r.style.getPropertyValue(p);
      if (!v || /var\(/.test(v)) continue;
      for (const n of px(v)) {
        if (n <= 2) continue;
        const key = `${r.selectorText}|${p.split('-').slice(0, 2).join('-')}|${n}`;
        if (seenDecl.has(key)) continue; seenDecl.add(key);
        const label = `${r.selectorText.slice(0, 36)} ${p} ${+n.toFixed(2)}px`;
        if (tokens.size ? tokens.has(n) : false) { raw.push(label); continue; }
        if (tokens.size ? false : ok.has(Math.round(n * 2) / 2)) continue;
        if (n <= 6) nudges.push(label); else off.push(label);
      }
    }
  });
  out.scale = { off, nudges, raw, tokens: [...tokens].sort((a, b) => a - b) };

  // ---- spacing drift: the same kind of gap should be the same gap (24 here, 28 there is a slip, 24 and 64 is a decision)
  const roleOf = (el) => (/^H[1-4]$/.test(el.tagName) ? el.tagName.toLowerCase() : el.tagName === 'P' ? 'p' : ctaLike(el) ? 'button' : /^(IMG|PICTURE|VIDEO|FIGURE)$/.test(el.tagName) ? 'picture' : null);
  const gaps = new Map();
  const note = (kind, v, el) => { const g = gaps.get(kind) ?? []; g.push({ v: Math.round(v), at: short(el) || name(el) }); gaps.set(kind, g); };
  const blocks = [...document.querySelectorAll('main *, body > section *, footer *')].filter((el) => roleOf(el) && vis(el) && !ignored(el) && inFlow(el) && !moved(el));
  for (const el of blocks) {
    const prev = el.previousElementSibling; if (!prev || !vis(prev) || !inFlow(prev) || !roleOf(prev)) continue;
    const a = prev.getBoundingClientRect(), b = el.getBoundingClientRect();
    const roleA = roleOf(prev), roleB = roleOf(el);
    if (b.top >= a.bottom - 1 && Math.min(a.right, b.right) > Math.max(a.left, b.left)) note(`${roleA} to ${roleB}`, b.top - a.bottom, el);
    else if (roleA === 'button' && roleB === 'button' && Math.abs(a.top - b.top) < 4) note('button beside button', b.left - a.right, el);
  }
  const secs = [...document.querySelectorAll('main > section, body > section, [data-section]')].filter(vis).slice(1);
  for (const sc of secs) { const v = parseFloat(getComputedStyle(sc).paddingTop); if (v > 0) note('section padding', v, sc.querySelector('h2,h3') ?? sc); }
  for (const [kind, list] of gaps) {
    const vals = [...new Set(list.map((g) => g.v))].sort((a, b) => a - b);
    for (let i = 1; i < vals.length; i++) {
      const d = vals[i] - vals[i - 1];
      if (d > 2 && d <= 6) { out.drift.push({ kind, a: vals[i - 1], b: vals[i], at: list.find((g) => g.v === vals[i])?.at, from: list.find((g) => g.v === vals[i - 1])?.at }); break; }
    }
  }
  // repeated items in one row or column: the gaps between them must match
  for (const p of document.querySelectorAll('main *, body > section *, header *, footer *')) {
    const kids = [...p.children].filter((k) => vis(k) && inFlow(k) && !moved(k));
    if (kids.length < 3 || kids.length > 40 || ignored(p) || new Set(kids.map((k) => k.tagName + (k.className || ''))).size > 1) continue;
    const r = kids.map((k) => k.getBoundingClientRect());
    const sameRow = r.every((x) => Math.abs(x.top - r[0].top) < 12), sameCol = r.every((x) => Math.abs(x.left - r[0].left) < 12);
    if (!sameRow && !sameCol) continue;
    const g = r.slice(1).map((x, i) => Math.round(sameRow ? x.left - r[i].right : x.top - r[i].bottom));
    const spread = Math.max(...g) - Math.min(...g);
    if (spread > 2 && spread <= 12 && /flex|grid/.test(getComputedStyle(p).display) === false) out.drift.push({ kind: `items in ${name(p)}`, a: Math.min(...g), b: Math.max(...g), at: short(kids[0]) });
  }
  // buttons: one height per size, not 44 and 48
  const ctas = [...document.querySelectorAll('a, button, input[type=submit], [role=button]')].filter((el) => ctaLike(el) && vis(el) && !ignored(el));
  const hs = [...new Set(ctas.map((c) => Math.round(c.getBoundingClientRect().height)))].sort((a, b) => a - b);
  for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1 && hs[i] - hs[i - 1] <= 6) { out.drift.push({ kind: 'button height', a: hs[i - 1], b: hs[i], at: short(ctas.find((c) => Math.round(c.getBoundingClientRect().height) === hs[i])) }); break; }

  // ---- alignment: a near miss is a fault, a clear offset is a decision
  const leftAligned = (el) => { const s = getComputedStyle(el); return /left|start/.test(s.textAlign) && inFlow(el) && !moved(el); };
  const flows = [...document.querySelectorAll('h1, h2, h3, main p, main img, main figure, body > section p, body > section img')].filter((el) => vis(el) && !ignored(el) && leftAligned(el) && !el.closest('li, td, th, nav, button, a'));
  const edgeLeft = (el) => { // the text's own edge when the box is wider than its text
    return el.getBoundingClientRect().left;
  };
  const bySec = new Map();
  for (const el of flows) { const k = secOf(el); (bySec.get(k) ?? bySec.set(k, []).get(k)).push(el); }
  for (const list of bySec.values()) {
    const lefts = [...new Set(list.map((el) => Math.round(edgeLeft(el))))].sort((a, b) => a - b);
    for (let i = 1; i < lefts.length; i++) {
      const d = lefts[i] - lefts[i - 1];
      if (d >= 2 && d <= 8) { const a = list.find((el) => Math.round(edgeLeft(el)) === lefts[i - 1]), b = list.find((el) => Math.round(edgeLeft(el)) === lefts[i]); out.edges.push({ where: 'one section', a: `${short(a) || name(a)} at ${lefts[i - 1]}`, b: `${short(b) || name(b)} at ${lefts[i]}` }); break; }
    }
  }
  // the copy anchor: section headings keep one left edge, and the nav and footer share it
  const anchors = [...document.querySelectorAll('main h2, body > section h2')].filter((el) => vis(el) && !ignored(el) && leftAligned(el));
  const mast = document.querySelector('header a, header img, nav a'); const foot = document.querySelector('footer a, footer p');
  const anchorEls = [...anchors, mast, foot].filter((el) => el && vis(el));
  const al = [...new Set(anchorEls.map((el) => Math.round(el.getBoundingClientRect().left)))].sort((a, b) => a - b);
  for (let i = 1; i < al.length; i++) {
    const d = al[i] - al[i - 1];
    if (d >= 2 && d <= 8) { const a = anchorEls.find((el) => Math.round(el.getBoundingClientRect().left) === al[i - 1]), b = anchorEls.find((el) => Math.round(el.getBoundingClientRect().left) === al[i]); out.edges.push({ where: 'across the page', a: `${short(a) || name(a)} at ${al[i - 1]}`, b: `${short(b) || name(b)} at ${al[i]}` }); break; }
  }
  // rows: repeated items in a row start at one height
  for (const p of document.querySelectorAll('main *, body > section *')) {
    const s = getComputedStyle(p); if (!/flex|grid/.test(s.display) || /center|end|baseline/.test(s.alignItems)) continue;
    const kids = [...p.children].filter((k) => vis(k) && inFlow(k) && !moved(k));
    if (kids.length < 2 || new Set(kids.map((k) => k.tagName + (k.className || ''))).size > 1) continue;
    const tops = kids.map((k) => Math.round(k.getBoundingClientRect().top)); const spread = Math.max(...tops) - Math.min(...tops);
    if (spread >= 2 && spread <= 8) out.edges.push({ where: `row ${name(p)}`, a: `${short(kids[0]) || name(kids[0])} top ${tops[0]}`, b: `top ${Math.max(...tops)}` });
  }

  // ---- controls: a field and its button share a height; a button label stays on one line
  for (const f of document.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=submit]), select')) {
    if (!vis(f)) continue;
    const fr = f.getBoundingClientRect();
    const b = [...(f.closest('form') ?? f.parentElement).querySelectorAll('button, input[type=submit]')].find((x) => vis(x) && Math.abs(x.getBoundingClientRect().top - fr.top) < fr.height);
    if (b && Math.abs(b.getBoundingClientRect().height - fr.height) > 1) out.controls.push(`field ${Math.round(fr.height)} px beside button ${Math.round(b.getBoundingClientRect().height)} px ("${short(b)}")`);
  }
  for (const el of [...ctas, ...document.querySelectorAll('header nav a, nav a')]) {
    if (!vis(el) || !words(el.innerText || '')) continue;
    const range = document.createRange(); range.selectNodeContents(el);
    const tops = new Set([...range.getClientRects()].filter((r) => r.width > 1).map((r) => Math.round(r.top / 4)));
    if (tops.size > 1 && !out.wrap.includes(short(el))) out.wrap.push(short(el));
  }

  // ---- space around heads and inside boxes (Hallmark's crowded head and cramped box)
  for (const h of document.querySelectorAll('main h2, main h3, main h4, body > section h2, body > section h3')) {
    if (!vis(h) || ignored(h) || !inFlow(h) || moved(h)) continue;
    const prev = h.previousElementSibling, next = h.nextElementSibling;
    if (!prev || !next || !vis(prev) || !vis(next) || !inFlow(prev) || !inFlow(next)) continue;
    if (h.parentElement.getBoundingClientRect().height < 200) continue;
    const r = h.getBoundingClientRect(); const above = r.top - prev.getBoundingClientRect().bottom, below = next.getBoundingClientRect().top - r.bottom;
    if (above >= 0 && below > 0 && above < 0.75 * below && below - above >= 12) out.crowded.push(`${short(h)}: ${Math.round(above)} above, ${Math.round(below)} below`);
  }
  for (const el of document.querySelectorAll('main *, body > section *, footer *')) {
    if (!vis(el) || ignored(el) || /^(A|BUTTON|INPUT|SELECT|TEXTAREA|SPAN|EM|STRONG|MARK|IMG|SVG|VIDEO|CANVAS|HR|CODE)$/.test(el.tagName)) continue;
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    if (r.width < 100 || r.height < 30 || r.width > W * 0.97) continue;
    const box = !!rgbOf(s.backgroundColor) || parseFloat(s.borderLeftWidth) >= 2;
    if (!box) continue;
    const textNode = [...el.childNodes].find((n) => n.nodeType === 3 && n.nodeValue.trim()); if (!textNode) continue;
    const range = document.createRange(); range.selectNodeContents(textNode); const t = range.getBoundingClientRect();
    const fs = parseFloat(s.fontSize);
    const needX = Math.max(8, Math.min(0.5 * fs, 24)), needY = Math.max(4, Math.min(0.3 * fs, 12));
    if (t.left - r.left < needX - 0.5 || r.right - t.right < needX - 0.5 && t.width > r.width * 0.9 || t.top - r.top < needY - 0.5) out.cramped.push(`${short(el)} (${Math.round(t.left - r.left)} px from the side, ${Math.round(t.top - r.top)} from the top)`);
  }
  const edgeRun = [...document.querySelectorAll('main p, body > section p')].find((p) => vis(p) && !ignored(p) && W < 600 && p.getBoundingClientRect().left < 8 && p.getBoundingClientRect().width > W * 0.5);
  if (edgeRun) out.cramped.push(`${short(edgeRun)} (${Math.round(edgeRun.getBoundingClientRect().left)} px from the phone edge)`);

  // ---- sticky bars that fight; a card in a card
  for (const el of document.querySelectorAll('body *')) { const s = getComputedStyle(el); if (s.position === 'sticky' && parseFloat(s.top) <= 0 && vis(el) && el.getBoundingClientRect().height < 200) out.sticky.push(name(el)); }
  const cardish = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return r.width >= 120 && r.height >= 60 && r.width < W * 0.97 && parseFloat(s.borderTopLeftRadius) >= 4 && (!!rgbOf(s.backgroundColor) || parseFloat(s.borderTopWidth) >= 1 || s.boxShadow !== 'none'); };
  for (const el of document.querySelectorAll('main *, body > section *')) {
    if (!vis(el) || ignored(el) || /^(A|BUTTON|INPUT|IMG|SVG|VIDEO|CANVAS|PICTURE)$/.test(el.tagName) || !cardish(el) || words(el.innerText || '') < 3) continue;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) if (cardish(a) && vis(a)) { if (!out.nest.includes(short(el))) out.nest.push(short(el)); break; }
  }

  // ---- tracked capitals anywhere (Hallmark 67: labels, captions, table heads, tags and nav links are the body face)
  const h1 = document.querySelector('h1');
  const displayCaps = h1 && getComputedStyle(h1).textTransform === 'uppercase';
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seenT = new Set();
  while (walker.nextNode()) {
    const el = walker.currentNode.parentElement; const t = walker.currentNode.nodeValue.trim();
    if (!el || !t || seenT.has(el) || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(el.tagName) || !vis(el) || el.closest('[data-darkroom-ignore]')) continue;
    seenT.add(el);
    if (el.closest('[class*="logo" i],[class*="brand" i],[class*="wordmark" i],[data-wordmark]') || el.closest('header a[href="/"], header a[href="#top"], header a[href="./"]')) continue;
    const s = getComputedStyle(el); const fs = parseFloat(s.fontSize); if (fs > 15.5) continue;
    if (displayCaps && ctaLike(el)) continue;
    const up = s.textTransform === 'uppercase' || s.fontVariantCaps.includes('small-caps');
    const tracked = parseFloat(s.letterSpacing) / fs > 0.03;
    const typed = /[A-Z]{2}/.test(t) && t === t.toUpperCase() && words(t) >= 2;
    if ((up || (typed && tracked)) && !/^[\d\s.,:/%€$£-]+$/.test(t)) out.tracked.push(t.slice(0, 28));
  }

  // ---- the first screen must hold the headline, one line and the action at 1280 × 800
  if (W >= 1200 && W < 1400 && h1 && vis(h1)) {
    const hero = secOf(h1); const inView = (el) => { const r = el.getBoundingClientRect(); return r.top + scrollY < H && r.bottom + scrollY <= H + 2; };
    const lede = [...hero.querySelectorAll('p')].find((p) => vis(p) && words(p.innerText) >= 4);
    const act = [...hero.querySelectorAll('a, button')].find((el) => ctaLike(el) && vis(el));
    const miss = [[h1, 'the headline'], [lede, 'its line'], [act, 'the action']].filter(([el]) => el && !inView(el)).map(([, n]) => n);
    out.fit = { miss };
  }

  // ---- 1920: text keeps a capped container and a readable line
  if (W >= 1800) {
    const text = [...document.querySelectorAll('main h1, main h2, main p, body > section h2, body > section p')].filter((el) => vis(el) && !ignored(el) && inFlow(el));
    const near = text.filter((el) => el.getBoundingClientRect().left < 120 && /left|start/.test(getComputedStyle(el).textAlign));
    const long = text.filter((el) => el.tagName === 'P' && words(el.innerText) >= 20 && el.getBoundingClientRect().width > parseFloat(getComputedStyle(el).fontSize) * 0.5 * 85);
    out.wide = { near: near.slice(0, 3).map((el) => `${short(el)} at ${Math.round(el.getBoundingClientRect().left)}`), long: long.slice(0, 3).map((el) => short(el)) };
  }

  // ---- an email sign-up closing a page whose job is not a mailing list
  const foot2 = document.querySelector('footer');
  const secList = [...document.querySelectorAll('main > section, body > section, [data-section]')].filter(vis);
  const close = [foot2, secList[secList.length - 1]].filter(Boolean);
  const nativeJob = ['subscribe', 'join', 'attend', 'listen', 'visit'].includes(String(job ?? '').toLowerCase());
  for (const c of close) {
    for (const f of c.querySelectorAll('input[type=email], input[name*="email" i], input[autocomplete=email]')) {
      if (!vis(f) && !f.closest('form')) continue;
      const form = f.closest('form') ?? f.parentElement;
      const fields = form.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=checkbox]), textarea, select').length;
      const label = short(form.querySelector('button, input[type=submit]') ?? form);
      if (fields >= 3 || form.querySelector('textarea') || /book|reserve|order|enquir|inquir|request|quote|start|send (a )?message|rezerv|comand|solicit|ofert/i.test(label)) continue;
      if (!nativeJob) out.email = { where: c === foot2 ? 'the footer' : 'the last section', label };
    }
  }

  // ---- a form that says it was sent when nothing was
  const forms = [...document.querySelectorAll('form')].filter((f) => !(f.getAttribute('action') ?? '').replace('#', '').trim());
  if (forms.length) {
    const src = [...document.scripts].map((sc) => sc.src);
    let js = [...document.scripts].filter((sc) => !sc.src).map((sc) => sc.textContent).join('\n');
    for (const u of src) { if (!u || new URL(u).origin !== location.origin) continue; try { js += '\n' + await (await fetch(u)).text(); } catch { /* unreadable */ } }
    const says = /(thanks|thank you|you'?re (on the list|in)|message sent|\bsent!|subscribed|welcome aboard|mul[tț]umim)/i.test(js) || forms.some((f) => /(thanks|thank you|you'?re on the list)/i.test(f.innerText));
    out.fakeSend = /preventDefault/.test(js) && says && !/\bfetch\s*\(|XMLHttpRequest|sendBeacon|axios\.|\$\.(post|ajax)/.test(js);
  }

  // ---- the stock looks: near-black + ivory + gold, cream + terracotta + serif; stock faces as the identity
  const lightOf = (c) => { if (!c) return null; const [r, g, b] = c.map((v) => v / 255); return (Math.max(r, g, b) + Math.min(r, g, b)) / 2; };
  const bs = getComputedStyle(document.body);
  // the ground most of the page is painted on: the biggest section fill, else the body
  const fills = new Map();
  for (const sc of [...document.querySelectorAll('main > section, body > section, [data-section]')].filter(vis)) {
    const k = rgbOf(getComputedStyle(sc).backgroundColor)?.join(); if (!k) continue;
    const r = sc.getBoundingClientRect(); fills.set(k, (fills.get(k) ?? 0) + r.width * r.height);
  }
  const big = [...fills.entries()].sort((a, b) => b[1] - a[1])[0];
  const bodyGround = rgbOf(bs.backgroundColor) ?? rgbOf(getComputedStyle(document.documentElement).backgroundColor) ?? [255, 255, 255];
  const docArea = document.documentElement.scrollHeight * W;
  let ground = big && big[1] > docArea * 0.4 ? big[0].split(',').map(Number) : bodyGround;
  const paras = [...document.querySelectorAll('main p, body > section p')].filter((p) => vis(p) && !ignored(p));
  const inkEl = paras[Math.floor(paras.length / 2)];
  const ink = rgbOf(inkEl ? getComputedStyle(inkEl).color : bs.color) ?? [0, 0, 0];
  const lightOf0 = (c) => { const [r, g, b] = c.map((v) => v / 255); return (Math.max(r, g, b) + Math.min(r, g, b)) / 2; };
  if (Math.abs(lightOf0(ground) - lightOf0(ink)) < 0.3) { // the text would be invisible on this: the real ground is painted elsewhere
    for (let el = inkEl?.parentElement; el; el = el.parentElement) { const c = rgbOf(getComputedStyle(el).backgroundColor); if (c && Math.abs(lightOf0(c) - lightOf0(ink)) >= 0.3) { ground = c; break; } }
    if (Math.abs(lightOf0(ground) - lightOf0(ink)) < 0.3) ground = lightOf0(ink) > 0.5 ? [10, 10, 10] : [245, 245, 245];
  }
  const h1s = h1 ? getComputedStyle(h1) : null;
  const display = h1s ? h1s.fontFamily.split(',')[0].trim().replace(/["']/g, '') : '';
  const textFace = bs.fontFamily.split(',')[0].trim().replace(/["']/g, '');
  const accent = ctas.map((c) => rgbOf(getComputedStyle(c).backgroundColor)).find((c) => c && Math.max(...c) - Math.min(...c) > 40) ?? [...document.querySelectorAll('h1 *, h2 *, a')].map((el) => rgbOf(getComputedStyle(el).color)).find((c) => c && Math.max(...c) - Math.min(...c) > 40) ?? null;
  const hueOf = (c) => { if (!c) return null; const [r, g, b] = c.map((v) => v / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (!d) return null; const h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return Math.round((h * 60 + 360) % 360); };
  const aHue = hueOf(accent);
  const serif = /cormorant|fraunces|playfair|instrument serif|garamond|lora|newsreader|libre (baskerville|caslon)|dm serif|crimson|bodoni|didot/i.test(display) || (/serif/.test(h1s?.fontFamily ?? '') && !/sans/.test(h1s?.fontFamily ?? ''));
  const warm = (c) => c[0] > c[2];
  if (lightOf(ground) < 0.1 && lightOf(ink) > 0.82 && warm(ink) && aHue !== null && aHue >= 30 && aHue <= 58) out.palette = 'near-black, ivory and gold';
  else if (lightOf(ground) > 0.86 && warm(ground) && ground[0] - ground[2] >= 8 && aHue !== null && (aHue <= 28 || aHue >= 350) && serif) out.palette = 'cream, terracotta and a serif';
  if (/^(inter|roboto|open sans|poppins|lato|arial|helvetica|helvetica neue|system-ui|-apple-system|segoe ui|sans-serif)$/i.test(display)) out.display = display;

  // ---- how the page waits: size held for pictures, a first frame for film
  out.loading.lazyFirst = [...document.images].filter((i) => vis(i) && i.loading === 'lazy' && i.getBoundingClientRect().top + scrollY < H).map((i) => (i.getAttribute('src') ?? '').split('/').pop().slice(0, 40)).slice(0, 3);
  out.loading.noSize = [...document.images].filter((i) => { if (!vis(i)) return false; const s = getComputedStyle(i); return !i.getAttribute('width') && !i.getAttribute('height') && s.aspectRatio === 'auto' && !/absolute|fixed/.test(s.position) && !/%|vh/.test(i.style.height || ''); }).map((i) => (i.getAttribute('src') ?? '').split('/').pop().slice(0, 40)).slice(0, 4);
  out.loading.noPoster = [...document.querySelectorAll('video')].filter((v) => vis(v) && !v.getAttribute('poster')).map((v) => (v.currentSrc || v.src || 'video').split('/').pop().slice(0, 40)).slice(0, 3);

  // ---- fingerprint: what this page looks like, to compare with the last builds
  const heroEl = h1 ? secOf(h1) : null;
  const hr = h1?.getBoundingClientRect();
  const cx = hr ? (hr.left + hr.right) / 2 : W / 2;
  const media = heroEl ? [...heroEl.querySelectorAll('img, video, canvas')].map((m) => m.getBoundingClientRect()).sort((a, b) => b.width * b.height - a.width * a.height)[0] : null;
  const hero = !media ? 'type only' : media.width * media.height > 0.6 * W * H ? 'full-bleed' : media.left + media.width / 2 > cx ? 'text left, picture right' : 'picture left, text right';
  const lastSec = secList[secList.length - 1];
  const ending = !lastSec ? 'none' : lastSec.querySelector('form') ? 'form' : lastSec.querySelector('a, button') ? 'action' : 'statement';
  out.fp = { ground, ink, accentHue: aHue, display, text: textFace, hero: h1 && cx < W * 0.4 ? `${hero}, left` : `${hero}, centre`, ending, sections: secList.length };
  return out;
}

// ---------- the waiting page: hold pictures and data, look at what stands in their place ----------
function layoutShiftProbe() {
  window.__drShift = 0;
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__drShift += e.value; }).observe({ type: 'layout-shift', buffered: true }); } catch { /* not Chromium */ }
}
function waitingState() {
  const H = innerHeight, W = innerWidth;
  const inReach = (el) => { const r = el.getBoundingClientRect(); return r.top < H * 2 && r.bottom > 0 && r.left < W; };
  const standIn = (el) => {
    if (el.closest('[data-skeleton],.skeleton,[aria-busy="true"]')) return true;
    const page = getComputedStyle(document.body).backgroundColor;
    for (let e = el, i = 0; e && e !== document.body && i < 4; e = e.parentElement, i++) {
      const s = getComputedStyle(e);
      if (s.backgroundImage !== 'none') return true;
      if (s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent' && s.backgroundColor !== page) return true;
    }
    return false;
  };
  const holes = []; const collapsed = [];
  for (const i of document.images) {
    if ((i.complete && i.naturalWidth) || i.loading === 'lazy' && i.getBoundingClientRect().top > H * 2) continue;
    if (getComputedStyle(i).display === 'none' || !inReach(i)) continue;
    const r = i.getBoundingClientRect(); const nameOf = (i.getAttribute('src') ?? '').split('/').pop().slice(0, 40);
    if (r.height < 8 || r.width < 8) collapsed.push(nameOf); else if (!standIn(i)) holes.push(nameOf);
  }
  const films = [...document.querySelectorAll('canvas')].filter((c) => { const r = c.getBoundingClientRect(); return r.width * r.height >= 0.3 * W * H && inReach(c); });
  const blankFilm = films.filter((c) => !standIn(c) && !c.parentElement?.querySelector('img,[data-poster]')).map((c) => (c.id ? `canvas#${c.id}` : 'canvas'));
  const skeletons = document.querySelectorAll('[data-skeleton],.skeleton,[aria-busy="true"]').length;
  const spinner = document.querySelectorAll('[class*="spinner" i],[class*="loader" i],[role="progressbar"]').length;
  return { holes: [...new Set(holes)], collapsed: [...new Set(collapsed)], blankFilm, skeletons, spinner, words: (document.body.innerText.match(/[\p{L}\p{N}]+/gu) ?? []).length };
}
export async function loadingPass(browser, url, contextOpts) {
  const ctx = await browser.newContext({ ...contextOpts, reducedMotion: 'reduce' });
  try {
    const page = await ctx.newPage();
    await page.addInitScript(layoutShiftProbe);
    let release; const gate = new Promise((r) => { release = r; });
    let heldData = 0; let heldMedia = 0;
    await page.route('**/*', async (route) => {
      const t = route.request().resourceType();
      if (t === 'fetch' || t === 'xhr') { heldData++; await gate; } else if (t === 'image' || t === 'media') { heldMedia++; await gate; }
      try { await route.continue(); } catch { /* page closed */ }
    });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(900);
    const held = await page.evaluate(waitingState);
    release();
    await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(900);
    const done = await page.evaluate(() => ({ shift: +(window.__drShift ?? 0).toFixed(3), words: (document.body.innerText.match(/[\p{L}\p{N}]+/gu) ?? []).length }));
    return { ...held, heldData, heldMedia, shift: done.shift, lateWords: Math.max(0, done.words - held.words) };
  } catch (e) { if (process.env.DARKROOM_DEBUG) console.error('loading pass:', e.message); return null; } finally { await ctx.close(); }
}

// ---------- the record of finished builds, so the next one can differ ----------
const home = () => process.env.DARKROOM_HOME ?? path.join(os.homedir(), '.darkroom');
const logFile = () => path.join(home(), 'builds.json');
export function readBuilds() { try { return JSON.parse(fs.readFileSync(logFile(), 'utf8')); } catch { return []; } }
export function logBuild(fp, { pack, job, device } = {}) {
  if (!fs.existsSync('.darkroom/project.json')) return; // only real projects, never a one-off page
  const dir = process.cwd();
  const rest = readBuilds().filter((b) => b.dir !== dir);
  const entry = { dir, name: path.basename(dir), date: new Date().toISOString().slice(0, 10), pack: pack ?? null, job: job ?? null, device: device ?? null, ...fp };
  try { fs.mkdirSync(home(), { recursive: true }); fs.writeFileSync(logFile(), JSON.stringify([entry, ...rest].slice(0, 30), null, 2)); } catch { /* the log is a help, never a blocker */ }
}
// Hallmark's six axes (palette, display face, text face, hero composition, ending, section count), plus pack and device.
export function sameAs(fp, { pack, device } = {}) {
  const dir = process.cwd();
  const hits = [];
  for (const b of readBuilds().filter((x) => x.dir !== dir).slice(0, 3)) {
    const close = b.ground && deltaE(fp.ground, b.ground) < 8 && deltaE(fp.ink, b.ink) < 8;
    const hue = fp.accentHue !== null && b.accentHue !== null && Math.min(Math.abs(fp.accentHue - b.accentHue), 360 - Math.abs(fp.accentHue - b.accentHue)) < 24;
    const axes = [close && hue && 'palette', fp.display === b.display && 'display face', fp.text === b.text && 'text face', fp.hero === b.hero && 'hero composition', fp.ending === b.ending && 'ending', fp.sections === b.sections && 'section count', pack && pack === b.pack && 'style pack', device && device === b.device && 'device'].filter(Boolean);
    if (axes.includes('palette') || axes.length >= 4) hits.push({ name: b.name, axes });
  }
  return hits;
}
export function builds() {
  const list = readBuilds().slice(0, 6);
  if (!list.length) { console.log('no finished builds on record yet'); return; }
  const hex = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
  for (const b of list) console.log(`${b.date}  ${b.name}\n  ground ${hex(b.ground)}, ink ${hex(b.ink)}, accent hue ${b.accentHue ?? 'none'}\n  ${b.display} / ${b.text}; pack ${b.pack ?? 'none'}; hero ${b.hero}; device ${b.device ?? 'none recorded'}; ends with ${b.ending}; ${b.sections} sections`);
}
