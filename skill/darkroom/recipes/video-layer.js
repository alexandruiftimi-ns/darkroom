// Background video done right: no white flash, no blank band, no battery drain.
// The layer's ground colour (= the clip's edge colour, references/hero-media.md) shows until the first frame is
// decoded, then the media wrapper fades in (500 ms) and settles from 1.06 to 1 (1.8 s). CSS never touches <video>.
//
//   <link rel="stylesheet" href="video-layer.css">
//   <div class="vl" data-video-layer style="--vl-ground:#0b0a09; --vl-focus:60% 40%">
//     <div class="vl-media">
//       <img class="vl-poster" src="hero-poster.jpg" alt="">          (optional; the ground colour shows otherwise)
//       <video muted playsinline loop preload="none" data-src="hero.mp4" data-src-phone="hero-720.mp4" data-hls="hero.m3u8"></video>
//     </div>
//     …your copy…
//   </div>
//   import { videoLayer } from './video-layer.js'; videoLayer();
//
// Source order: data-hls (native HLS, or window.Hls if the page loaded hls.js) → data-src-phone under 768 px → data-src.
// Nothing downloads until the layer is near the screen. Plays only while on screen and while the tab is visible.
// If autoplay is refused or the file fails, the poster or the ground stays (never a black box) and data-vl-state
// says why: idle · loading · playing · paused · still · blocked · error.
// Reduced motion: no playback. With a poster nothing loads; without one the first frame is shown and held.
// Pair with video-loop.js when the clip's last frame doesn't match its first (then drop the `loop` attribute).

export function videoLayer({ root = document, phoneQuery = '(max-width: 767px)', rootMargin = '200px 0px', reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const cleanups = [...root.querySelectorAll('[data-video-layer]')].map((layer) => setup(layer, { phoneQuery, rootMargin, reducedMotion }));
  return { destroy() { cleanups.forEach((c) => c()); } };
}

function setup(layer, { phoneQuery, rootMargin, reducedMotion }) {
  const video = layer.querySelector('video');
  if (!video) return () => {};
  const set = (s) => { layer.dataset.vlState = s; };
  const hasPoster = !!layer.querySelector('.vl-poster');
  video.muted = true; video.playsInline = true; // both required for autoplay on iOS and Chrome
  video.autoplay = false; video.removeAttribute('autoplay'); // this script decides when to play
  let near = false; let started = false; let hls = null;
  set('idle');

  if (reducedMotion && hasPoster) { set('still'); return () => {}; }

  const onReady = () => { layer.classList.add('is-ready'); if (reducedMotion) { video.pause(); set('still'); } else tryPlay(); };
  const onError = () => { layer.classList.remove('is-ready'); set('error'); };
  video.addEventListener('loadeddata', onReady, { once: true });
  video.addEventListener('error', onError);

  function start() {
    if (started) return; started = true;
    const src = pickSource(video, phoneQuery);
    if (!src.url) { set('error'); return; }
    set('loading');
    video.preload = 'auto';
    if (src.type === 'hls-js') { hls = new window.Hls(); hls.loadSource(src.url); hls.attachMedia(video); }
    else { video.src = src.url; video.load(); }
  }
  function tryPlay() {
    if (reducedMotion || !near || document.hidden || !layer.classList.contains('is-ready')) return;
    set('playing');
    const p = video.play();
    if (p && p.catch) p.catch(() => { if (!video.error) set('blocked'); });
  }
  function hold() { if (!video.paused) video.pause(); if (layer.dataset.vlState === 'playing') set('paused'); }

  const io = new IntersectionObserver(([e]) => { near = e.isIntersecting; if (near) { start(); tryPlay(); } else hold(); }, { rootMargin });
  io.observe(layer);
  const onVis = () => (document.hidden ? hold() : tryPlay());
  document.addEventListener('visibilitychange', onVis);
  return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); video.removeEventListener('error', onError); hls?.destroy?.(); };
}

function pickSource(video, phoneQuery) {
  const d = video.dataset;
  if (d.hls) {
    if (video.canPlayType('application/vnd.apple.mpegurl')) return { url: d.hls, type: 'native' };
    if (window.Hls?.isSupported?.()) return { url: d.hls, type: 'hls-js' };
  }
  if (d.srcPhone && matchMedia(phoneQuery).matches) return { url: d.srcPhone, type: 'file' };
  return { url: d.src || video.getAttribute('src') || '', type: 'file' };
}
