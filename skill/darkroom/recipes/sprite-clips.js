// Short image-sequence clips for a character or object: "enter" plays when its section scrolls in, the same clip plays
// backwards when it leaves, and an optional "idle" loop runs in between with random pauses so it feels alive.
// Framework-free ES module.
//
//   import { createSpriteClips } from './sprite-clips.js';
//   createSpriteClips({ canvas, section, manifestUrl: '/frames/mascot/manifest.json',
//                       clips: { enter: [0, 23], idle: [16, 23] }, fps: 24 });
//
// manifestUrl: a `darkroom media frames` folder (one numbered set holds every clip; clips are inclusive frame ranges).
// The HTML must already work without this script: a real <img> poster sits under the canvas.
//
// Behaviour: time-based (it plays at `fps` once triggered), not scroll-scrubbed: use scrub-frames.js when scroll position
// must drive the frame. Frames of the clip about to play are decoded first; nothing loads until the section is near.
// Paused off-screen and in hidden tabs. Reduced motion: the first frame of `idle` (or `enter`) stays as one still.
// Phones: `phoneStep: 2` draws every second frame at half the rate (half the downloads, same clip length).

export async function createSpriteClips({
  canvas, section, manifestUrl, clips, fps = 24, idlePause = [2.5, 4], phoneStep = 2, phoneQuery = '(max-width: 767px)',
  rootMargin = '25% 0px', band = 0.3, dprCap = 2, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches, onState,
}) {
  const manifest = await (await fetch(manifestUrl)).json();
  const base = manifestUrl.slice(0, manifestUrl.lastIndexOf('/') + 1);
  const step = matchMedia(phoneQuery).matches ? Math.max(1, phoneStep) : 1;
  const ctx = canvas.getContext('2d');
  const frames = new Array(manifest.count).fill(null);
  const pending = new Map();
  let state = 'off', timer = 0, raf = 0, visible = false, destroyed = false, shown = -1;

  const range = (name) => { const [a, b] = clips[name]; const out = []; for (let i = a; i <= b; i += step) out.push(i); if (out.at(-1) !== b) out.push(b); return out; };
  const load = (i) => {
    if (frames[i] || pending.has(i)) return pending.get(i);
    const p = fetch(base + manifest.frames[i].file).then((r) => r.blob()).then(createImageBitmap)
      .then((bmp) => { if (destroyed) bmp.close(); else frames[i] = bmp; }).catch(() => {}).finally(() => pending.delete(i));
    pending.set(i, p); return p;
  };
  const preload = (name) => Promise.all(range(name).map(load));

  function draw(i) {
    const bmp = frames[i]; if (!bmp || i === shown) return;
    const dpr = Math.min(devicePixelRatio || 1, dprCap);
    const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    const s = Math.min(w / bmp.width, h / bmp.height); // contain: characters must not be cropped
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(bmp, (w - bmp.width * s) / 2, (h - bmp.height * s) / 2, bmp.width * s, bmp.height * s);
    shown = i; canvas.classList.add('on');
  }

  function play(name, { reverse = false, then } = {}) {
    cancelAnimationFrame(raf); clearTimeout(timer);
    state = reverse ? `${name}-reverse` : name; onState?.(state);
    const seq = reverse ? range(name).reverse() : range(name);
    const frameMs = (1000 / fps) * step;
    let k = 0, last = 0;
    const tick = (t) => {
      if (destroyed) return;
      if (!visible || document.hidden) { raf = 0; return; } // resumed by the observer
      if (t - last >= frameMs) { last = t; draw(seq[k]); k++; }
      if (k < seq.length) raf = requestAnimationFrame(tick); else { raf = 0; then?.(); }
    };
    resume = () => { if (!raf && k < seq.length) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
  }
  let resume = () => {};

  function idle() {
    if (!clips.idle) { state = 'rest'; return; }
    play('idle', { then: () => { const [a, b] = idlePause; timer = setTimeout(idle, (a + Math.random() * (b - a)) * 1000); } });
  }

  async function enter() {
    await preload('enter');
    if (clips.idle) preload('idle');
    play('enter', { then: idle });
  }
  function leave() {
    if (state === 'off') return;
    play('enter', { reverse: true, then: () => { state = 'off'; onState?.(state); } });
  }

  const still = clips.idle ? clips.idle[0] : clips.enter[0];
  await load(still); draw(still);
  if (reducedMotion) return { destroy() { destroyed = true; frames.forEach((b) => b?.close()); } };

  // near: prefetch the enter clip. seen: pause/reset when fully off-screen. band: the middle of the viewport (minus
  // `band` at top and bottom) — entering it plays "enter", leaving it (still partly on screen) plays it backwards.
  // Works for sections of any height, unlike an intersection ratio.
  const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) preload('enter'); }, { rootMargin });
  const seen = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (!visible) { cancelAnimationFrame(raf); raf = 0; clearTimeout(timer); state = 'off'; } else resume();
  });
  const pct = `${Math.round(band * 100)}%`;
  const inBand = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && (state === 'off' || state.endsWith('-reverse'))) enter();
    else if (!e.isIntersecting && state !== 'off' && !state.endsWith('-reverse')) leave();
  }, { rootMargin: `-${pct} 0px -${pct} 0px` });
  near.observe(section); seen.observe(section); inBand.observe(section);
  const onVis = () => resume();
  document.addEventListener('visibilitychange', onVis);

  return {
    get state() { return state; }, enter, leave,
    destroy() { destroyed = true; [near, seen, inBand].forEach((o) => o.disconnect()); document.removeEventListener('visibilitychange', onVis); cancelAnimationFrame(raf); clearTimeout(timer); frames.forEach((b) => b?.close()); },
  };
}
