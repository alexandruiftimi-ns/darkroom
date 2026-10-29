// Scroll-linked word reveal for one manifesto or About paragraph: words brighten from dim to full as the paragraph
// passes through the screen, tied to scroll position (reversible), not to a timer.
//
//   <p class="manifesto" data-scroll-words data-scroll-words-dim="0.18">We make furniture for rooms people actually live in…</p>
//   import { scrollWords } from './scroll-words.js'; scrollWords();
//
// Readable without JS (plain paragraph at full opacity). With JS each word is a span in reading order; the paragraph
// keeps its text for screen readers and copy-paste. Progress: 0 when the paragraph's top is at 85 % of the viewport,
// 1 when its bottom is at 40 % (data-scroll-words-start / -end change these). Only opacity changes; one rAF per scroll.
// Reduced motion: nothing is dimmed. Use once per page, on 25–60 words: longer text becomes a chore to scroll.

export function scrollWords({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const els = [...root.querySelectorAll('[data-scroll-words]')];
  if (reducedMotion || !els.length) return { destroy() {} };
  const items = els.map((el) => {
    const words = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) if (walker.currentNode.nodeValue.trim()) nodes.push(walker.currentNode);
    for (const n of nodes) {
      const frag = document.createDocumentFragment();
      for (const part of n.nodeValue.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) { frag.append(part); continue; }
        const w = document.createElement('span'); w.className = 'sw-word'; w.textContent = part; words.push(w); frag.append(w);
      }
      n.replaceWith(frag);
    }
    const dim = Number(el.dataset.scrollWordsDim ?? 0.18);
    words.forEach((w) => { w.style.opacity = String(dim); w.style.transition = 'opacity 120ms linear'; });
    return { el, words, dim, start: Number(el.dataset.scrollWordsStart ?? 0.85), end: Number(el.dataset.scrollWordsEnd ?? 0.4), last: -1 };
  });
  let raf = 0;
  const update = () => {
    raf = 0;
    const vh = innerHeight;
    for (const it of items) {
      const r = it.el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * it.start - r.top) / Math.max(1, r.height + vh * (it.start - it.end))));
      const lit = Math.round(p * it.words.length);
      if (lit === it.last) continue;
      it.words.forEach((w, i) => { w.style.opacity = i < lit ? '1' : String(it.dim); });
      it.last = lit; it.el.dataset.scrollWordsLit = String(lit);
    }
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);
  update();
  return { destroy() { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); items.forEach((it) => it.words.forEach((w) => { w.style.opacity = ''; })); } };
}
