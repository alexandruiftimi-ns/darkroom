// Scene progress as a CSS variable. The simplest scroll-linked effect: no library, no canvas.
//
//   import { sceneProgress } from './scene-progress.js';
//   sceneProgress(document.querySelector('#portal'));        // sets --p (0..1) on the element
//
// Then drive anything from CSS: transform, clip-path, opacity, a gradient stop, with calc() on var(--p).
// Layout: a tall wrapper (height: 300vh) holding a `position: sticky; top: 0; height: 100vh` stage; the variable is on the wrapper.
// Reduced motion: --p is set once to `restAt` and never updated, so the CSS shows its finished (or start) composition.
// Only transform, opacity, clip-path and filter should read --p; never layout properties.

export function sceneProgress(scene, { restAt = 1, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches, onProgress } = {}) {
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const read = () => { const r = scene.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - innerHeight)); };
  if (reducedMotion) { scene.style.setProperty('--p', String(restAt)); return { destroy() {} }; }
  let raf = 0, last = -1, active = true;
  const apply = () => { raf = 0; const p = read(); if (p !== last) { last = p; scene.style.setProperty('--p', p.toFixed(4)); onProgress?.(p); } };
  const kick = () => { if (!raf && active) raf = requestAnimationFrame(apply); };
  const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; kick(); }, { rootMargin: '25% 0px' });
  io.observe(scene);
  addEventListener('scroll', kick, { passive: true }); addEventListener('resize', kick);
  apply();
  return { destroy() { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('scroll', kick); removeEventListener('resize', kick); } };
}
