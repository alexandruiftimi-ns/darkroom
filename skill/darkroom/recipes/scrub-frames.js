// Scroll-scrubbed image sequence on a <canvas>. Framework-free ES module.
//
//   import { createFrameScrubber } from './scrub-frames.js';
//   const s = await createFrameScrubber({ canvas, scene, manifestUrl: '/frames/manifest.json' });
//
// scene  : the tall element (e.g. height 400vh) whose scroll progress drives the sequence; the canvas sits in a sticky child.
// The HTML must already work without this script: put a real <img> poster (and the h1/copy) in the markup under the canvas.
//
// Behaviour: poster first; only frames near the target are decoded (sliding window of +/- `window`); stale loads are
// aborted; bitmaps outside the window are closed; drawing happens only when the shown frame changes; paused off-screen
// and in hidden tabs; DPR is capped; reduced motion shows one still frame and never scrubs. Never draws a blank: if the
// wanted frame is not decoded yet it keeps the nearest one that is.
// Phones: when the manifest names a `mobile` set (`darkroom media frames --mobile-width`) and `mobileQuery` matches, that
// set is used instead. Fast jumps: a few `anchors` spread coarse-to-fine (first, last, middle, quarters…) stay decoded,
// so a fast scroll always lands near a real frame while the window catches up.

export async function createFrameScrubber({
  canvas, scene, manifestUrl, window: R = 12, dprCap = 2, ease = 0.14, concurrency = 4, anchors: anchorCount = 9,
  mobileQuery = '(max-width: 1023px)',
  restFrame = 'last', reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches, onFrame,
}) {
  let manifest = await (await fetch(manifestUrl)).json();
  if (manifest.mobile && matchMedia(mobileQuery).matches) {
    manifestUrl = new URL(manifest.mobile, new URL(manifestUrl, location.href)).href;
    manifest = await (await fetch(manifestUrl)).json();
  }
  const base = manifestUrl.slice(0, manifestUrl.lastIndexOf('/') + 1);
  const n = manifest.count;
  const anchors = coarseToFine(n).slice(0, Math.min(anchorCount, n));
  const anchorSet = new Set(anchors);
  const ctx = canvas.getContext('2d', { alpha: false });
  const bitmaps = new Array(n).fill(null);
  const loading = new Map(); // index -> AbortController
  let cur = 0, target = 0, shown = -1, raf = 0, running = false, destroyed = false, active = true, wantW = 0, wantH = 0;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const progress = () => {
    const r = scene.getBoundingClientRect();
    return clamp(-r.top / Math.max(1, r.height - innerHeight), 0, 1);
  };

  function sizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, dprCap);
    const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (w !== wantW || h !== wantH) { canvas.width = wantW = w; canvas.height = wantH = h; shown = -1; } // resizing clears the canvas
  }

  function draw(i) {
    const bmp = bitmaps[i];
    if (!bmp) return false;
    sizeCanvas();
    const s = Math.max(canvas.width / bmp.width, canvas.height / bmp.height); // cover
    const w = bmp.width * s, h = bmp.height * s;
    ctx.drawImage(bmp, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    shown = i; onFrame?.(i, n);
    return true;
  }

  function nearestLoaded(i) {
    for (let d = 0; d < n; d++) { if (bitmaps[i - d]) return i - d; if (bitmaps[i + d]) return i + d; }
    return -1;
  }

  async function load(i) {
    if (bitmaps[i] || loading.has(i) || i < 0 || i >= n) return;
    const ac = new AbortController(); loading.set(i, ac);
    try {
      const res = await fetch(base + manifest.frames[i].file, { signal: ac.signal });
      const bmp = await createImageBitmap(await res.blob());
      if (destroyed || ac.signal.aborted) { bmp.close(); return; }
      bitmaps[i] = bmp;
    } catch { /* aborted or failed: the nearest decoded frame stays on screen */ }
    finally { loading.delete(i); }
  }

  function manageWindow(centre) {
    const lo = centre - R, hi = centre + R;
    for (const [i, ac] of loading) if ((i < lo - 2 || i > hi + 2) && !anchorSet.has(i)) ac.abort(); // stale decodes
    for (let i = 0; i < n; i++) if (bitmaps[i] && (i < lo - R || i > hi + R) && !anchorSet.has(i)) { bitmaps[i].close(); bitmaps[i] = null; }
    const order = []; for (let d = 0; d <= R; d++) { order.push(centre + d); if (d) order.push(centre - d); }
    order.push(...anchors); // window first, then any anchor still missing
    let started = 0;
    for (const i of order) { if (loading.size >= concurrency) break; if (i >= 0 && i < n && !bitmaps[i] && !loading.has(i)) { load(i); started++; } }
    return started;
  }

  function tick() {
    raf = 0;
    if (destroyed || !active || document.hidden) { running = false; return; }
    target = progress();
    cur += (target - cur) * ease; if (Math.abs(target - cur) < 0.0005) cur = target;
    const want = Math.round(cur * (n - 1));
    manageWindow(want);
    const use = bitmaps[want] ? want : nearestLoaded(want);
    if (use >= 0 && use !== shown) draw(use);
    if (Math.abs(target - cur) > 0.0005 || loading.size) raf = requestAnimationFrame(tick); else running = false;
  }
  const kick = () => { if (!running && !destroyed && !reducedMotion) { running = true; raf = requestAnimationFrame(tick); } };

  const scrubber = {
    io: null, manifest, get frame() { return shown; },
    destroy() {
      destroyed = true; cancelAnimationFrame(raf); scrubber.io?.disconnect();
      removeEventListener('scroll', kick); document.removeEventListener('visibilitychange', kick);
      for (const ac of loading.values()) ac.abort();
      bitmaps.forEach((b) => b?.close());
    },
  };

  await load(0); // first frame immediately
  if (reducedMotion) { // one calm frame, no scrubbing
    const rest = restFrame === 'last' ? n - 1 : restFrame === 'first' ? 0 : Math.round((n - 1) / 2);
    await load(rest); draw(bitmaps[rest] ? rest : 0);
  } else {
    draw(0);
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', () => { shown = -1; kick(); });
    document.addEventListener('visibilitychange', kick);
    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; if (active) kick(); }, { rootMargin: '25% 0px' });
    io.observe(scene);
    scrubber.io = io;
    kick();
  }

  return scrubber;
}

// 0, last, middle, then the middles of each half, and so on: any prefix covers the whole range evenly.
function coarseToFine(n) {
  if (n <= 0) return [];
  const out = [0], seen = new Set([0]);
  if (n > 1) { out.push(n - 1); seen.add(n - 1); }
  let spans = [[0, n - 1]];
  while (spans.length) {
    const next = [];
    for (const [a, b] of spans) {
      if (b - a <= 1) continue;
      const m = Math.floor((a + b) / 2);
      if (!seen.has(m)) { out.push(m); seen.add(m); }
      next.push([a, m], [m, b]);
    }
    spans = next;
  }
  return out;
}
