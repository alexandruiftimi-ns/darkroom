// Depth from layers that move at different speeds: with the pointer (desktop) or with scroll (any device).
// Generalises pointer-tilt.js from one image to a stack. Uses `translate`, so layers keep their own transforms.
//
//   <div class="scene" data-parallax="pointer">          (or data-parallax="scroll", or "both")
//     <img data-depth="0.2" src="sky.webp" alt="">       far: moves little
//     <img data-depth="0.6" src="hills.webp" alt="">
//     <img data-depth="1"   src="figure.webp" alt="A walker on the ridge">   near: moves most
//   </div>
//   import { parallaxLayers } from './parallax-layers.js'; parallaxLayers();
//
// Pointer: up to data-parallax-max px (default 24) for depth 1, lerp .12. Scroll: up to data-parallax-scroll px
// (default 120) for depth 1 across the scene's pass through the screen. Layers need overlap margins (oversize them by
// at least the max travel) so edges never show. Reduced motion: nothing moves. Touch: scroll mode only.

export function parallaxLayers({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  if (reducedMotion) return { destroy() {} };
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const scenes = [...root.querySelectorAll('[data-parallax]')].map((el) => ({
    el, mode: el.dataset.parallax || 'pointer', max: Number(el.dataset.parallaxMax) || 24, scroll: Number(el.dataset.parallaxScroll) || 120,
    layers: [...el.querySelectorAll('[data-depth]')].map((l) => ({ l, d: Number(l.dataset.depth) || 0 })), px: 0, py: 0, tx: 0, ty: 0, sp: 0,
  }));
  let raf = 0;
  const frame = () => {
    raf = 0; let again = false;
    for (const s of scenes) {
      const b = s.el.getBoundingClientRect();
      if (b.bottom < 0 || b.top > innerHeight) continue;
      s.px += (s.tx - s.px) * 0.12; s.py += (s.ty - s.py) * 0.12;
      if (Math.abs(s.tx - s.px) > 0.001 || Math.abs(s.ty - s.py) > 0.001) again = true;
      s.sp = /scroll|both/.test(s.mode) ? Math.max(-1, Math.min(1, ((b.top + b.height / 2) - innerHeight / 2) / (innerHeight / 2 + b.height / 2))) : 0;
      for (const { l, d } of s.layers) {
        const x = s.px * s.max * d; const y = s.py * s.max * d + s.sp * s.scroll * d;
        l.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
      }
      s.el.dataset.parallaxP = s.sp.toFixed(3);
    }
    if (again) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const onMove = (e) => {
    for (const s of scenes) {
      if (!/pointer|both/.test(s.mode)) continue;
      const b = s.el.getBoundingClientRect();
      const inside = e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom;
      s.tx = inside ? ((e.clientX - b.left) / b.width - 0.5) * -2 : 0; s.ty = inside ? ((e.clientY - b.top) / b.height - 0.5) * -2 : 0;
    }
    kick();
  };
  if (fine) addEventListener('pointermove', onMove, { passive: true });
  addEventListener('scroll', kick, { passive: true }); addEventListener('resize', kick);
  kick();
  return { destroy() { removeEventListener('pointermove', onMove); removeEventListener('scroll', kick); removeEventListener('resize', kick); scenes.forEach((s) => s.layers.forEach(({ l }) => { l.style.translate = ''; })); } };
}
