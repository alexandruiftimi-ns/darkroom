// Headline entrances that split text without breaking it: masked line rise, word rise, character cascade, word blur-in.
//
//   <head><script>document.documentElement.classList.add('js')</script> <link rel="stylesheet" href="split-text.css"></head>
//   <h1 data-split="lines">Slow coffee for fast mornings</h1>      lines · words · chars · blur
//   data-split-delay="200" (ms) · data-split-step="70" (ms between pieces) · data-split-on="load|view" (default: load
//   when on the first screen, otherwise when scrolled into view)
//   import { splitText } from './split-text.js'; splitText();
//
// Accessibility: the element gets aria-label with its exact text and the pieces are aria-hidden, so screen readers
// read one sentence, not letters. When the animation ends the original markup is put back (no leftover spans, no
// stale line breaks on resize, links and <em> intact).
// Negative tracking: spaces are kept as their own span with normal letter-spacing, so words don't run together.
// Safety: text is hidden only under html.js; split-text.css shows it anyway after 2.5 s if this script never ran.
// Reduced motion: nothing is split or hidden.

export function splitText({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const els = [...root.querySelectorAll('[data-split]')];
  if (reducedMotion) { els.forEach((el) => el.classList.add('is-split', 'is-done')); return { destroy() {} }; }
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { io.unobserve(e.target); play(e.target); }
  }, { threshold: 0.2 }) : null;
  for (const el of els) {
    const r = el.getBoundingClientRect();
    const onLoad = el.dataset.splitOn === 'load' || (el.dataset.splitOn !== 'view' && r.top < innerHeight && r.bottom > 0);
    if (onLoad || !io) play(el); else { split(el); io.observe(el); }
  }
  return { destroy() { io?.disconnect(); els.forEach(restore); } };
}

function split(el) {
  if (el.__split) return el.__split;
  const original = el.innerHTML;
  const mode = el.dataset.split || 'words';
  el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
  const pieces = [];
  const walk = (node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === 1) { walk(child); continue; }
      if (child.nodeType !== 3) continue;
      const frag = document.createDocumentFragment();
      for (const part of child.nodeValue.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) { const s = document.createElement('span'); s.className = 'split-space'; s.textContent = ' '; s.setAttribute('aria-hidden', 'true'); frag.append(s); continue; }
        const w = document.createElement('span'); w.className = 'split-word'; w.setAttribute('aria-hidden', 'true');
        if (mode === 'chars') for (const ch of part) { const c = document.createElement('span'); c.className = 'split-char'; c.textContent = ch; w.append(c); pieces.push(c); }
        else { w.textContent = part; pieces.push(w); }
        frag.append(w);
      }
      child.replaceWith(frag);
    }
  };
  walk(el);
  if (mode === 'lines') {
    // Group words by their rendered line, then wrap each line in a mask.
    const words = [...el.querySelectorAll('.split-word')];
    const lines = [];
    for (const w of words) { const top = Math.round(w.offsetTop); const line = lines.at(-1); if (line && Math.abs(line.top - top) < 4) line.words.push(w); else lines.push({ top, words: [w] }); }
    pieces.length = 0;
    for (const line of lines) {
      const mask = document.createElement('span'); mask.className = 'split-line'; mask.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span'); inner.className = 'split-line-inner';
      line.words[0].before(mask); mask.append(inner);
      const last = line.words.at(-1);
      let n = mask.nextSibling;
      while (n) { const next = n.nextSibling; inner.append(n); if (n === last) break; n = next; }
      pieces.push(inner);
    }
  }
  const step = Number(el.dataset.splitStep) || ({ chars: 30, lines: 110, words: 70, blur: 70 })[mode] || 70;
  pieces.forEach((p, i) => p.style.setProperty('--split-delay', `${(Number(el.dataset.splitDelay) || 0) + i * step}ms`));
  el.classList.add('is-split');
  el.__split = { original, count: pieces.length, step };
  return el.__split;
}

function play(el) {
  const s = split(el);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.classList.add('is-playing');
    const dur = parseFloat(getComputedStyle(el).getPropertyValue('--split-dur')) || 800;
    setTimeout(() => restore(el), (Number(el.dataset.splitDelay) || 0) + s.count * s.step + dur + 100);
  }));
}

function restore(el) {
  if (!el.__split) return;
  el.innerHTML = el.__split.original;
  el.removeAttribute('aria-label');
  el.__split = null;
  el.classList.add('is-done');
}
