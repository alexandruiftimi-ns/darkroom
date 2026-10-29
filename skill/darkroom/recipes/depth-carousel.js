// Depth carousel for 3–6 products: the active one large in front, its neighbours smaller and behind, the rest
// parked. Each move crossfades the stage colour to the active product's colour. Pairs with depth-carousel.css.
//
//   <section class="dc" data-depth-carousel aria-roledescription="carousel" aria-label="Our bikes">
//     <ul class="dc-track">
//       <li class="dc-item" data-colour="#c9d6c2" aria-label="1 of 4"><img src="a.webp" alt="Commuter, sage green"><h3>Commuter</h3></li> …
//     </ul>
//     <button class="dc-prev" type="button" aria-label="Previous">←</button><button class="dc-next" type="button" aria-label="Next">→</button>
//     <p class="dc-status" aria-live="polite"></p>
//   </section>
//   import { depthCarousel } from './depth-carousel.js'; depthCarousel();
//
// Roles are set as data-slot = active | prev | next | far-prev | far-next | parked; CSS places each slot. A move is
// locked for 700 ms (no half-finished states from fast clicks). Arrow keys when focus is inside, swipe on touch.
// Only the active item is reachable by Tab and read by screen readers; the status line announces "2 of 4: Commuter".
// Without JS: the list is a plain horizontal row (CSS). Reduced motion: slots change without travel.

export function depthCarousel({ root = document, lock = 700 } = {}) {
  const stops = [...root.querySelectorAll('[data-depth-carousel]')].map((el) => setup(el, lock));
  return { destroy() { stops.forEach((s) => s()); } };
}

function setup(el, lockMs) {
  const items = [...el.querySelectorAll('.dc-item')]; const n = items.length;
  if (n < 2) return () => {};
  const status = el.querySelector('.dc-status');
  let active = Math.max(0, items.findIndex((i) => i.hasAttribute('data-active'))); let locked = false;
  el.classList.add('dc-ready');
  const slotOf = (i) => { const d = ((i - active) % n + n) % n; return d === 0 ? 'active' : d === 1 ? 'next' : d === n - 1 ? 'prev' : d === 2 ? 'far-next' : d === n - 2 ? 'far-prev' : 'parked'; };
  const render = () => {
    items.forEach((it, i) => {
      const slot = slotOf(i); it.dataset.slot = slot;
      const on = slot === 'active';
      it.toggleAttribute('inert', !on); it.setAttribute('aria-hidden', String(!on));
    });
    const cur = items[active];
    if (cur.dataset.colour) el.style.setProperty('--dc-stage', cur.dataset.colour);
    el.dataset.active = String(active);
    if (status) status.textContent = `${active + 1} of ${n}: ${cur.querySelector('h3, h2, [data-name]')?.textContent.trim() ?? ''}`;
  };
  const go = (delta) => { if (locked) return; locked = true; active = ((active + delta) % n + n) % n; render(); setTimeout(() => { locked = false; }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : lockMs); };
  const prev = el.querySelector('.dc-prev'); const next = el.querySelector('.dc-next');
  const onPrev = () => go(-1); const onNext = () => go(1);
  prev?.addEventListener('click', onPrev); next?.addEventListener('click', onNext);
  const onKey = (e) => { if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } };
  el.addEventListener('keydown', onKey);
  let sx = null; let sy = 0;
  const down = (e) => { if (e.pointerType === 'touch') { sx = e.clientX; sy = e.clientY; } };
  const up = (e) => { if (sx === null) return; const dx = e.clientX - sx; const dy = e.clientY - sy; sx = null; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1); };
  el.addEventListener('pointerdown', down); el.addEventListener('pointerup', up);
  render();
  return () => { prev?.removeEventListener('click', onPrev); next?.removeEventListener('click', onNext); el.removeEventListener('keydown', onKey); el.removeEventListener('pointerdown', down); el.removeEventListener('pointerup', up); };
}
