// A second layer (image, colour or video) shows through a soft circle that follows the pointer. Framework-free.
//
//   import { cursorReveal } from './cursor-reveal.js';
//   cursorReveal(document.querySelector('.reveal'), { radius: 160 });
//
// Markup: a container with two stacked children; the one marked [data-reveal-top] is the layer that shows through.
//   <figure class="reveal"><img src="base.webp" alt="…"><img data-reveal-top src="alt.webp" alt="" aria-hidden="true"></figure>
// The CSS lives here (inline styles on the top layer): clip-path: circle(var(--r) at var(--x) var(--y)).
//
// Behaviour: the circle eases after the pointer and grows in on enter / shrinks on leave; only clip-path changes (no
// layout). Touch: a tap opens the circle where you tapped and a second tap closes it. Reduced motion: no following;
// a click or tap toggles the whole top layer instead. The base layer is the content: the top layer is decoration and
// must never carry text the page needs.

export function cursorReveal(el, { radius = 160, ease = 0.18, grow = 0.12, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const top = el.querySelector('[data-reveal-top]');
  if (!top) return { destroy() {} };
  if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
  Object.assign(top.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' });
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  let tx = 0, ty = 0, x = 0, y = 0, r = 0, tr = 0, raf = 0;
  const set = () => { top.style.clipPath = `circle(${r.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`; };
  set();

  if (reducedMotion) { // a plain toggle, no motion
    const toggle = () => { r = r ? 0 : Math.hypot(el.clientWidth, el.clientHeight); x = el.clientWidth / 2; y = el.clientHeight / 2; set(); };
    el.addEventListener('click', toggle);
    return { destroy() { el.removeEventListener('click', toggle); } };
  }

  const loop = () => {
    raf = 0;
    x += (tx - x) * ease; y += (ty - y) * ease; r += (tr - r) * grow;
    set();
    if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3 || Math.abs(tr - r) > 0.3) raf = requestAnimationFrame(loop);
    else { x = tx; y = ty; r = tr; set(); }
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
  const at = (e) => { const b = el.getBoundingClientRect(); tx = e.clientX - b.left; ty = e.clientY - b.top; };

  const enter = (e) => { at(e); if (r < 1) { x = tx; y = ty; } tr = radius; kick(); };
  const move = (e) => { at(e); kick(); };
  const leave = () => { tr = 0; kick(); };
  const tap = (e) => { at(e); if (tr) tr = 0; else { x = tx; y = ty; tr = radius; } kick(); };

  if (fine) { el.addEventListener('pointerenter', enter); el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave); }
  else el.addEventListener('click', tap);
  return {
    destroy() {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', enter); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); el.removeEventListener('click', tap);
    },
  };
}
