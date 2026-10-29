// Magnetic hover: a button or icon leans toward the pointer when it comes close, and settles back when it leaves.
// Weighted, not bouncy: strength 0.3, lerp 0.18, at most 14 px. Uses the `translate` property, so it never fights a
// transform the element already has (a :active press, an entrance). Mouse and pen only ((hover:hover) and fine pointer).
//
//   <a class="btn" href="#book" data-magnetic data-magnetic-strength="0.3" data-magnetic-radius="80">Book a table</a>
//   import { magnetic } from './magnetic.js'; magnetic();
//
// One or two per page (the main CTA, a round "play" button). Reduced motion or touch: does nothing.

export function magnetic({ root = document } = {}) {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return { destroy() {} };
  const items = [...root.querySelectorAll('[data-magnetic]')].map((el) => ({ el, x: 0, y: 0, tx: 0, ty: 0, s: Number(el.dataset.magneticStrength) || 0.3, r: Number(el.dataset.magneticRadius) || 80, max: Number(el.dataset.magneticMax) || 14 }));
  let raf = 0; let px = -1e4; let py = -1e4;
  const loop = () => {
    raf = 0; let moving = false;
    for (const it of items) {
      const b = it.el.getBoundingClientRect();
      const cx = b.left + b.width / 2 - it.x; const cy = b.top + b.height / 2 - it.y; // centre without our own offset
      const dx = px - cx; const dy = py - cy;
      const near = Math.abs(dx) < b.width / 2 + it.r && Math.abs(dy) < b.height / 2 + it.r;
      it.tx = near ? Math.max(-it.max, Math.min(it.max, dx * it.s)) : 0; it.ty = near ? Math.max(-it.max, Math.min(it.max, dy * it.s)) : 0;
      it.x += (it.tx - it.x) * 0.18; it.y += (it.ty - it.y) * 0.18;
      if (Math.abs(it.tx - it.x) > 0.1 || Math.abs(it.ty - it.y) > 0.1) moving = true; else { it.x = it.tx; it.y = it.ty; }
      it.el.style.translate = it.x || it.y ? `${it.x.toFixed(2)}px ${it.y.toFixed(2)}px` : '';
      it.el.toggleAttribute('data-magnetic-active', near);
    }
    if (moving) raf = requestAnimationFrame(loop);
  };
  const onMove = (e) => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(loop); };
  const onLeave = () => { px = py = -1e4; if (!raf) raf = requestAnimationFrame(loop); };
  addEventListener('pointermove', onMove, { passive: true }); document.addEventListener('pointerleave', onLeave);
  return { destroy() { removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave); cancelAnimationFrame(raf); items.forEach((it) => { it.el.style.translate = ''; }); } };
}
