// Bounded pointer response for a layered or single product image ("2.5D"). Framework-free.
//
//   import { pointerTilt } from './pointer-tilt.js';
//   pointerTilt(document.querySelector('.product'), { maxX: 3, maxY: 5, highlight: '.product .glint' });
//
// This is honest 2.5D, not a 3D viewer: one image can lean a few degrees and a highlight can slide. For large yaw you
// need real multi-view images or a model (references/motion.md). Off for touch and reduced motion; recentres on leave;
// does nothing until `start()` if you pass { manual: true } (e.g. only after a hero reveal has finished).

export function pointerTilt(el, { maxX = 3, maxY = 5, ease = 0.12, highlight = null, manual = false, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reducedMotion || !fine) return { start() {}, destroy() {} };
  const glint = highlight ? document.querySelector(highlight) : null;
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, on = !manual;
  const apply = () => {
    raf = 0;
    cx += (tx - cx) * ease; cy += (ty - cy) * ease;
    el.style.transform = `perspective(900px) rotateX(${(-cy * maxX).toFixed(2)}deg) rotateY(${(cx * maxY).toFixed(2)}deg)`;
    if (glint) glint.style.transform = `translate(${(cx * 24).toFixed(1)}px, ${(cy * 16).toFixed(1)}px)`;
    if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(apply);
  };
  const move = (e) => {
    if (!on) return;
    const r = el.getBoundingClientRect();
    tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
    ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    if (!raf) raf = requestAnimationFrame(apply);
  };
  const leave = () => { tx = ty = 0; if (!raf) raf = requestAnimationFrame(apply); };
  el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
  return { start() { on = true; }, destroy() { cancelAnimationFrame(raf); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); el.style.transform = ''; } };
}
