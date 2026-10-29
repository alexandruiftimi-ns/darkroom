// Companion to entrance.css: numbers the entrance from document order and releases each element when its animation ends.
// The CSS works alone; this script only makes it tidier. Releasing matters: an animation with fill-mode `both` keeps
// owning `transform`, so a button's hover lift or :active press would do nothing until it is removed.
// A safety timer releases everything after the expected finish + 600 ms (background tabs, interrupted animations).
//
//   import { entrance } from './entrance.js'; entrance();

export function entrance({ root = document, selector = '[data-enter]' } = {}) {
  const els = [...root.querySelectorAll(selector)];
  if (!els.length) return { done: Promise.resolve() };
  els.forEach((el, i) => { if (!el.style.getPropertyValue('--i')) el.style.setProperty('--i', String(i)); });
  const css = getComputedStyle(document.documentElement);
  const ms = (v, d) => { const n = parseFloat(v); return Number.isFinite(n) ? (/ms/.test(v) ? n : n * 1000) : d; };
  const last = Math.max(...els.map((el) => Number(el.style.getPropertyValue('--i')) || 0));
  const total = ms(css.getPropertyValue('--enter-start'), 80) + last * ms(css.getPropertyValue('--enter-step'), 120) + ms(css.getPropertyValue('--enter-dur'), 700);
  let resolve; const done = new Promise((r) => { resolve = r; });
  const release = (el) => { el.classList.add('is-entered'); if (els.every((e) => e.classList.contains('is-entered'))) { document.documentElement.dataset.entrance = 'done'; resolve(); } };
  els.forEach((el) => el.addEventListener('animationend', () => release(el), { once: true }));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) els.forEach(release);
  setTimeout(() => els.forEach((el) => el.classList.contains('is-entered') || release(el)), total + 600);
  return { done };
}
