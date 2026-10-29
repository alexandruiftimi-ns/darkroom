// Companion to stack-cards.css: sets --stack-p on each card (0 → 1 as the next card slides over it), so the cards
// behind shrink and dim. Reads the next card's position once per frame while scrolling; writes one custom property
// per card. Reduced motion: does nothing (the CSS turns the stack into a plain list).
//
//   import { stackCards } from './stack-cards.js'; stackCards();

export function stackCards({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const stacks = [...root.querySelectorAll('[data-stack-cards]')];
  if (reducedMotion || !stacks.length) return { destroy() {} };
  const groups = stacks.map((s) => [...s.querySelectorAll(':scope > .stack-card')]);
  groups.forEach((cards) => cards.forEach((c, i) => { if (!c.style.getPropertyValue('--n')) c.style.setProperty('--n', String(i)); }));
  let raf = 0;
  const update = () => {
    raf = 0;
    for (const cards of groups) {
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) { card.style.setProperty('--stack-p', '0'); return; }
        // p = how much of this card the next one covers: 0 when the next card's top is at this card's bottom, 1 when tops meet.
        // offsetHeight, not the rect height: the rect is already scaled by --stack-p (origin top, so its top is exact).
        const h = card.offsetHeight; const top = card.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, (top + h - next.getBoundingClientRect().top) / Math.max(1, h)));
        card.style.setProperty('--stack-p', p.toFixed(3));
      });
    }
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);
  update();
  return { destroy() { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); groups.flat().forEach((c) => c.style.removeProperty('--stack-p')); } };
}
