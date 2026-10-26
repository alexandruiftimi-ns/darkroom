// Scroll-scrubbed <video> (seek by scroll progress). Framework-free ES module.
//
//   import { createVideoScrubber } from './scrub-video.js';
//   createVideoScrubber({ video, scene });
//
// Works only if the file is encoded so every frame can be seeked cheaply, otherwise scrubbing stutters:
//   ffmpeg -i in.mp4 -an -c:v libx264 -g 1 -crf 26 -pix_fmt yuv420p -movflags +faststart scrub.mp4   (all intra, larger file)
//   or a short GOP: -g 4. Serve with HTTP Range support. Keep it short (< ~6 s) and <= 1080p on desktop, 720p on phones.
// Compare against scrub-frames.js on the real clip and device before choosing (see references/motion.md).
//
// The poster attribute is the first frame; the <video> must be muted + playsinline + preload="auto". Seeks are coalesced
// to one per animation frame, and a new seek waits for the previous one to finish. Reduced motion: no scrubbing, the
// poster (or the frame at `restAt`, 0..1) stays.

export function createVideoScrubber({ video, scene, ease = 0.18, restAt = 1, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches }) {
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  let cur = 0, target = 0, raf = 0, seeking = false, active = true, ready = video.readyState >= 1;
  const progress = () => { const r = scene.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - innerHeight), 0, 1); };

  const seek = (t) => {
    if (seeking) return;
    seeking = true;
    video.addEventListener('seeked', () => { seeking = false; }, { once: true });
    video.currentTime = t;
  };

  function tick() {
    raf = 0;
    if (!active || document.hidden || !ready) return;
    target = progress();
    cur += (target - cur) * ease; if (Math.abs(target - cur) < 0.0005) cur = target;
    const t = clamp(cur * video.duration, 0, Math.max(0, video.duration - 0.04));
    if (Math.abs(video.currentTime - t) > 1 / 60) seek(t);
    if (Math.abs(target - cur) > 0.0005 || seeking) raf = requestAnimationFrame(tick);
  }
  const kick = () => { if (!raf && !reducedMotion) raf = requestAnimationFrame(tick); };

  video.pause(); video.muted = true; video.playsInline = true;
  const onMeta = () => {
    ready = true;
    if (reducedMotion) { video.currentTime = clamp(restAt * video.duration, 0, Math.max(0, video.duration - 0.04)); return; }
    kick();
  };
  if (ready) onMeta(); else video.addEventListener('loadedmetadata', onMeta, { once: true });

  const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; if (active) kick(); }, { rootMargin: '25% 0px' });
  io.observe(scene);
  addEventListener('scroll', kick, { passive: true });
  document.addEventListener('visibilitychange', kick);
  return { destroy() { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('scroll', kick); document.removeEventListener('visibilitychange', kick); } };
}
