// Hide a visible loop seam: fade the clip down to the ground over its last half second, restart, fade back up.
// Works because the ground is the clip's edge colour (references/hero-media.md), so the dip reads as a breath, not a cut.
// Optional playlist: data-playlist="b.mp4, c.mp4" plays the clips in turn with the same dip between them.
// A clip whose ends simply don't match is often better as a pre-rendered boomerang (ping-pong) with plain `loop`:
//   darkroom media boomerang hero.mp4 --out hero-boomerang.mp4   (no script needed then)
//
//   <video muted playsinline preload="none" data-src="hero.mp4" data-video-loop data-loop-fade="0.5"></video>
//   (inside a video-layer.js layer; remove the `loop` attribute)
//   import { videoLoop } from './video-loop.js'; videoLoop();
//
// Opacity is written per frame by script (requestAnimationFrame), never by a CSS transition on <video>.
// The rAF runs only while the clip plays; pausing (off-screen, hidden tab) stops it. Reduced motion: does nothing.

export function videoLoop({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  if (reducedMotion) return { destroy() {} };
  const cleanups = [...root.querySelectorAll('video[data-video-loop]')].map(setup);
  return { destroy() { cleanups.forEach((c) => c()); } };
}

function setup(video) {
  const fade = Math.max(0.1, Number(video.dataset.loopFade) || 0.5);
  const first = video.dataset.src || video.getAttribute('src') || '';
  const list = [first, ...(video.dataset.playlist || '').split(',').map((s) => s.trim()).filter(Boolean)];
  const layer = video.closest('[data-video-layer]');
  let index = 0; let raf = 0; let fadingIn = 0;
  video.loop = false; video.removeAttribute('loop');
  video.dataset.loopIndex = '0';

  const tick = () => {
    raf = 0;
    if (video.paused) return;
    const d = video.duration; const t = video.currentTime;
    let o = 1;
    if (Number.isFinite(d) && d > fade * 3) {
      if (d - t < fade) o = Math.max(0, (d - t) / fade);
      if (fadingIn && t < fade) o = Math.min(o, t / fade);
    }
    video.style.opacity = o.toFixed(3);
    raf = requestAnimationFrame(tick);
  };
  const run = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  const mayPlay = () => !layer || layer.dataset.vlState === 'playing' || layer.dataset.vlState === undefined;

  const onEnded = () => {
    video.style.opacity = '0';
    fadingIn = 1;
    if (list.length > 1) {
      index = (index + 1) % list.length;
      video.dataset.loopIndex = String(index);
      video.src = list[index];
      video.addEventListener('loadeddata', () => { if (mayPlay()) video.play().catch(() => {}); }, { once: true });
    } else {
      video.currentTime = 0;
      if (mayPlay()) video.play().catch(() => {});
    }
  };
  video.addEventListener('play', run);
  video.addEventListener('pause', stop);
  video.addEventListener('ended', onEnded);
  if (!video.paused) run();
  return () => { stop(); video.removeEventListener('play', run); video.removeEventListener('pause', stop); video.removeEventListener('ended', onEnded); video.style.opacity = ''; };
}
