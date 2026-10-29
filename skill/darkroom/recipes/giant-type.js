// Fits each [data-giant] word to exactly the width of its container (edge to edge), and keeps it fitted on resize and
// after the web font loads. Measures once at a reference size, then scales: one layout read per resize, no loop.
//
//   import { giantType } from './giant-type.js'; giantType();
//
// data-giant-inset="24" leaves 24 px on each side. The word stays live text (select, translate, read aloud).

export function giantType({ root = document } = {}) {
  const els = [...root.querySelectorAll('[data-giant]')];
  const fit = (el) => {
    const box = el.parentElement; const inset = Number(el.dataset.giantInset) || 0;
    const target = box.clientWidth - inset * 2; if (target <= 0) return;
    el.style.fontSize = '100px';
    const w = el.scrollWidth; if (!w) return;
    el.style.fontSize = `${Math.floor((100 * target / w) * 100) / 100}px`;
    el.dataset.giantFitted = '';
  };
  const all = () => els.forEach(fit);
  const ro = new ResizeObserver(all); els.forEach((el) => ro.observe(el.parentElement));
  document.fonts?.ready.then(all);
  all();
  return { refit: all, destroy() { ro.disconnect(); } };
}
