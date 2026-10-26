// On-scroll reveals for ordinary landing pages: headings, text, images and cards appear as they enter the screen.
// Not a scroll story: nothing is pinned or scrubbed, scrolling is never captured, and each element plays once.
//
//   <link rel="stylesheet" href="reveal.css">
//   <h2 data-reveal="up">…</h2>   <img data-reveal="mask" …>   <ul data-reveal-stagger="80"><li data-reveal>…</li></ul>
//   import { reveal } from './reveal.js'; reveal();
//
// Effects (data-reveal value): fade · up (default) · scale · mask (clip from the bottom; images) · words (heading words rise in turn).
// Options per element: data-reveal-delay="ms". On a parent: data-reveal-stagger="ms" spaces its revealing children.
// Safety: content is hidden ONLY after this script runs (it adds `reveal-ready` to <html>), so no-JS visitors, crawlers and
// failed script loads see everything. Reduced motion: nothing is hidden or moved. Elements already on screen at load
// reveal at once. If IntersectionObserver is missing, everything is shown.

export function reveal({ root = document, threshold = 0.15, rootMargin = '0px 0px -8% 0px', reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const els = [...root.querySelectorAll('[data-reveal]')];
  if (reducedMotion || !('IntersectionObserver' in window) || !els.length) {
    els.forEach((el) => el.classList.add('is-revealed'));
    return { destroy() {} };
  }
  for (const parent of root.querySelectorAll('[data-reveal-stagger]')) {
    const step = Number(parent.dataset.revealStagger) || 80;
    [...parent.querySelectorAll('[data-reveal]')].forEach((el, i) => { if (!el.dataset.revealDelay) el.dataset.revealDelay = String(i * step); });
  }
  for (const el of els) {
    if (el.dataset.reveal !== 'words' || el.dataset.revealSplit) continue;
    // Wrap each word; the words stay real text in reading order, so copy, search and screen readers are unaffected.
    el.dataset.revealSplit = '1';
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) if (walker.currentNode.nodeValue.trim()) nodes.push(walker.currentNode);
    let k = 0;
    for (const n of nodes) {
      const frag = document.createDocumentFragment();
      for (const part of n.nodeValue.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) { frag.append(part); continue; }
        const w = document.createElement('span'); w.className = 'reveal-word'; w.style.setProperty('--i', String(k++)); w.textContent = part;
        frag.append(w);
      }
      n.replaceWith(frag);
    }
  }
  els.forEach((el) => { if (el.dataset.revealDelay) el.style.setProperty('--reveal-delay', `${Number(el.dataset.revealDelay)}ms`); });
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
  }, { threshold, rootMargin });
  document.documentElement.classList.add('reveal-ready');
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-revealed'); // first screen: no waiting, no flash
    else io.observe(el);
  }
  return { destroy() { io.disconnect(); els.forEach((el) => el.classList.add('is-revealed')); } };
}
