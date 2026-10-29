// Turn a product by moving the mouse across it: the pointer's x position picks the frame of a turntable clip.
// Desktop only ((hover:hover) and a fine pointer); on touch and under reduced motion the poster or first frame stays.
// Needs a clip that seeks well: all-intra or GOP <= 4 (see recipes/README.md "Frames vs video"); 2–4 s, locked camera.
//
//   <div class="turn" data-cursor-scrub><video muted playsinline preload="auto" src="turntable.mp4" poster="turn-poster.webp" aria-label="The kettle, turning"></video></div>
//   import { cursorScrubVideo } from './cursor-scrub-video.js'; cursorScrubVideo();
//
// Seeks only when the previous seek has finished (!video.seeking), toward a lerped target (.12), so it never queues
// a backlog of seeks. data-scrub-invert reverses the direction. On leave it eases back to the start frame.

export function cursorScrubVideo({ root = document } = {}) {
  const ok = matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stops = [...root.querySelectorAll('[data-cursor-scrub]')].map((el) => (ok ? setup(el) : () => {}));
  return { destroy() { stops.forEach((s) => s()); } };
}

function setup(el) {
  const v = el.querySelector('video'); if (!v) return () => {};
  v.pause(); v.removeAttribute('autoplay');
  const st = { t: 0, target: 0, raf: 0 };
  const invert = el.hasAttribute('data-scrub-invert');
  const frame = () => {
    st.raf = 0;
    if (!v.duration) { st.raf = requestAnimationFrame(frame); return; }
    st.t += (st.target - st.t) * 0.12;
    const want = Math.max(0, Math.min(v.duration - 0.05, st.t * v.duration));
    if (!v.seeking && Math.abs(v.currentTime - want) > 1 / 60) v.currentTime = want;
    el.dataset.scrub = st.t.toFixed(3);
    if (Math.abs(st.target - st.t) > 0.001 || v.seeking) st.raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!st.raf) st.raf = requestAnimationFrame(frame); };
  const move = (e) => { const b = el.getBoundingClientRect(); const x = Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)); st.target = invert ? 1 - x : x; kick(); };
  const leave = () => { st.target = 0; kick(); };
  el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
  return () => { cancelAnimationFrame(st.raf); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
}
