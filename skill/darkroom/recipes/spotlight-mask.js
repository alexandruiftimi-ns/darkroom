// A soft spotlight that follows the pointer and shows a second, pixel-aligned layer inside it: x-ray, night/day,
// sketch/finished, before/after. Extends cursor-reveal.js with a feathered edge and a lerped (weighted) follow.
//
//   <div class="spot" data-spotlight data-spot-radius="180">
//     <img src="day.webp" alt="The harbour by day">
//     <img data-spot-top src="night.webp" alt="" aria-hidden="true">   same size and framing as the base (pixel-aligned)
//   </div>
//   .spot { position: relative } .spot > img { display: block; width: 100% } .spot > [data-spot-top] { position: absolute; inset: 0; height: 100% }
//   import { spotlightMask } from './spotlight-mask.js'; spotlightMask();
//
// Follow lerp .1. Mouse: opens on enter, follows, closes on leave. Touch: a tap opens the spotlight at that point and
// a second tap closes it (no hover on phones). Reduced motion: a click or tap toggles the whole top layer, no follow.
// Only mask-image is written, per frame, on one element. The base image carries the alt text; the top layer is decoration.

export function spotlightMask({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const stops = [...root.querySelectorAll('[data-spotlight]')].map((el) => setup(el, reducedMotion));
  return { destroy() { stops.forEach((s) => s()); } };
}

function setup(el, reducedMotion) {
  const top = el.querySelector('[data-spot-top]'); if (!top) return () => {};
  const R = Number(el.dataset.spotRadius) || 180;
  const st = { x: 0, y: 0, tx: 0, ty: 0, r: 0, tr: 0, raf: 0, full: false };
  const paint = () => {
    if (st.full) { top.style.maskImage = top.style.webkitMaskImage = 'none'; el.dataset.spot = 'full'; return; }
    const m = `radial-gradient(circle ${st.r.toFixed(1)}px at ${st.x.toFixed(1)}px ${st.y.toFixed(1)}px, #000 0%, #000 55%, transparent 100%)`;
    top.style.maskImage = m; top.style.webkitMaskImage = m;
    el.dataset.spot = st.r > 1 ? 'open' : 'closed';
    el.dataset.spotR = String(Math.round(st.r));
  };
  const frame = () => {
    st.raf = 0;
    st.x += (st.tx - st.x) * 0.1; st.y += (st.ty - st.y) * 0.1; st.r += (st.tr - st.r) * 0.12;
    paint();
    if (Math.abs(st.tx - st.x) > 0.3 || Math.abs(st.ty - st.y) > 0.3 || Math.abs(st.tr - st.r) > 0.3) st.raf = requestAnimationFrame(frame);
    else { st.x = st.tx; st.y = st.ty; st.r = st.tr; paint(); }
  };
  const kick = () => { if (!st.raf) st.raf = requestAnimationFrame(frame); };
  const local = (e) => { const b = el.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
  paint();
  if (reducedMotion) {
    const toggle = () => { st.full = !st.full; if (!st.full) st.r = 0; paint(); };
    el.addEventListener('click', toggle);
    return () => el.removeEventListener('click', toggle);
  }
  const enter = (e) => { if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return; const [x, y] = local(e); if (st.r < 1) { st.x = x; st.y = y; } st.tx = x; st.ty = y; st.tr = R; kick(); };
  const move = (e) => { if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return; [st.tx, st.ty] = local(e); st.tr = R; kick(); };
  const leave = (e) => { if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return; st.tr = 0; kick(); };
  const tap = (e) => { if (e.pointerType !== 'touch') return; const [x, y] = local(e); if (st.tr > 0) st.tr = 0; else { st.x = st.tx = x; st.y = st.ty = y; st.tr = R; } kick(); };
  el.addEventListener('pointerenter', enter); el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave); el.addEventListener('pointerup', tap);
  return () => { cancelAnimationFrame(st.raf); el.removeEventListener('pointerenter', enter); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); el.removeEventListener('pointerup', tap); };
}
