// Scroll-scrubbed image sequence on a <canvas>. Framework-free ES module.
//
//   import { createFrameScrubber, holdAt } from './scrub-frames.js';
//   const s = await createFrameScrubber({ canvas, scene, manifestUrl: '/frames/manifest.json' });
//
// scene  : the tall element (e.g. height 400vh) whose scroll progress drives the sequence; the canvas sits in a sticky child.
// The HTML must already work without this script: put a real <img> poster (and the h1/copy) in the markup under the canvas.
//
// Behaviour: poster first. Every frame's compressed bytes are fetched once and kept (a few MB), so decoding never waits on
// the network. Only frames near the shown one are decoded: `window * 2` ahead in the direction of travel, `window` behind;
// bitmaps outside that are closed. The shown frame chases the scroll at a capped speed (`maxSpeed` frames per 60 Hz
// frame), so a fling plays through the film instead of skipping around. If the wanted frame isn't decoded yet it holds
// the closest decoded frame ON THE WAY there, never one from the other side (the old "nearest decoded frame anywhere"
// fallback flashed far-away frames on fast scrolls and when scrolling back up). Never draws a blank. One whole frame at
// full opacity per draw: never blend neighbours or fade a still over the film (ghosting; the audit's `frame-blend` check
// fails it). Smoother = more frames. Progress uses the sticky stage's own height, not innerHeight: on phones innerHeight
// changes whenever the address bar shows or hides, which moved the frame every time the scroll direction flipped.
// Paused off-screen and in hidden tabs; DPR is capped; reduced motion shows one still frame and never scrubs.
// Phones and tablets (`mobileQuery`): picks a set from the manifest by the stage's real shape: a stage no wider than the `tall` crop
// takes it (only if it was cut for the same `focus`), anything else `mobile`. Rotating swaps the set at the same spot.
// Desktop keeps the full frames. Frames are never scaled down here: large ones (4K) shrink the decode window to fit `memoryMB`.
// The canvas is never larger than the frame can fill: extra canvas pixels add cost and no sharpness, CSS stretches it to the stage.
// `focus` (0 left, 1 right; pass what `media frames --focus` got) is where a cover crop sits; match it with the poster's object-position.
// A few `anchors` spread coarse-to-fine stay decoded once the window has room.
// Breaking points: pass `mapFrame: holdAt([...frames], 0.04)` to make the film rest on chosen frames for a stretch of
// scroll. Never snap or glide the page's scroll to a stop: it fights touch momentum and reads as a glitch.

export async function createFrameScrubber({
  canvas, scene, manifestUrl, window: windowSize = 12, dprCap = 2, ease = 0.3, maxSpeed = 4, concurrency = 4, anchors: anchorCount = 9, memoryMB,
  mobileQuery = '(max-width: 1023px), (pointer: coarse) and (max-width: 1400px)', focus = 0.5, mapFrame,
  restFrame = 'last', reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches, onFrame,
}) {
  const rootUrl = new URL(manifestUrl, location.href).href;
  const root = await (await fetch(rootUrl)).json();
  const sets = root.sets ?? (root.mobile ? [{ name: 'mobile', path: root.mobile }] : []);
  const setFor = () => { // null = the full frames
    if (!matchMedia(mobileQuery).matches) return null;
    const shape = (canvas.clientWidth || innerWidth) / (canvas.clientHeight || innerHeight);
    const tall = sets.find((s) => s.name === 'tall' && Math.abs((s.focus ?? 0.5) - focus) < 0.02);
    return (tall && shape < (tall.width / tall.height) * 1.2 && tall) || sets.find((s) => s.name === 'mobile') || null;
  };
  const readSet = async (set) => {
    if (!set) return { m: root, url: rootUrl };
    const url = new URL(set.path, rootUrl).href;
    return { m: await (await fetch(url)).json(), url };
  };
  let set = setFor(), manifest, base, R;
  // big frames (4K is ~32 MB decoded each) keep fewer decoded at once instead of being shrunk: full sharpness, bounded memory.
  // The window holds 3R + 1 frames plus the anchors; `memoryMB` caps them (1080p keeps R = 12, 4K drops to R = 3).
  const applySet = ({ m, url }) => {
    manifest = m; base = url.slice(0, url.lastIndexOf('/') + 1);
    const perFrameMB = (m.width * m.height * 4) / 1048576 || 8;
    R = Math.max(3, Math.min(windowSize, Math.floor(((memoryMB ?? (matchMedia(mobileQuery).matches ? 240 : 600)) / perFrameMB - anchorCount - 1) / 3)));
  };
  applySet(await readSet(set));
  const n = manifest.count;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const toPos = mapFrame ? (p) => clamp(mapFrame(p, n), 0, n - 1) : (p) => p * (n - 1);
  const anchors = coarseToFine(n).slice(0, Math.min(anchorCount, n));
  const anchorSet = new Set(anchors);
  const ctx = canvas.getContext('2d', { alpha: false });
  const blobs = new Array(n).fill(null);
  const bitmaps = new Array(n).fill(null);
  const decoding = new Set();
  let fetchAc = new AbortController(), generation = 0, lastWidth = 0;
  let cur = 0, target = 0, dir = 1, shown = -1, raf = 0, last = 0, running = false, destroyed = false, active = true, wantW = 0, wantH = 0;

  const progress = () => {
    const r = scene.getBoundingClientRect();
    return clamp(-r.top / Math.max(1, r.height - (canvas.clientHeight || innerHeight)), 0, 1);
  };

  function sizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, dprCap);
    const over = Math.max(1, canvas.clientWidth * dpr / manifest.width, canvas.clientHeight * dpr / manifest.height);
    const w = Math.round(canvas.clientWidth * dpr / over), h = Math.round(canvas.clientHeight * dpr / over);
    if (w !== wantW || h !== wantH) { canvas.width = wantW = w; canvas.height = wantH = h; shown = -1; } // resizing clears the canvas
  }

  function draw(i) {
    const bmp = bitmaps[i];
    if (!bmp) return false;
    sizeCanvas();
    const s = Math.max(canvas.width / bmp.width, canvas.height / bmp.height); // cover
    const w = bmp.width * s, h = bmp.height * s;
    ctx.drawImage(bmp, (canvas.width - w) * focus, (canvas.height - h) / 2, w, h);
    shown = i; onFrame?.(i, n);
    return true;
  }

  function nearestLoaded(i) {
    for (let d = 0; d < n; d++) { if (bitmaps[i - d]) return i - d; if (bitmaps[i + d]) return i + d; }
    return -1;
  }
  // frame i if decoded; else the decoded frame closest to i between the one on screen and i; nothing on screen: nearest
  function usable(i) {
    if (bitmaps[i]) return i;
    if (shown >= 0 && bitmaps[shown]) {
      let best = shown;
      for (let k = shown, s = Math.sign(i - shown); k !== i; k += s) if (bitmaps[k]) best = k;
      return best;
    }
    return nearestLoaded(i);
  }

  async function fetchOne(i) {
    if (blobs[i]) return;
    try { blobs[i] = await (await fetch(base + manifest.frames[i].file, { signal: fetchAc.signal })).blob(); } catch { /* aborted or failed: neighbours cover it */ }
  }
  // every frame's bytes, once: anchors first (any spot has something close), then outward from where the page opened
  async function fetchAll(start) {
    const byDistance = Array.from({ length: n }, (_, i) => i).sort((x, y) => Math.abs(x - start) - Math.abs(y - start));
    const order = [...new Set([...anchors, ...byDistance])];
    let k = 0; const g = generation;
    const worker = async () => { while (k < order.length && !destroyed && g === generation) { await fetchOne(order[k++]); kick(); } };
    await Promise.all(Array.from({ length: 6 }, worker));
  }
  const decodeNow = async (i) => {
    const g = generation;
    await fetchOne(i);
    if (!blobs[i] || bitmaps[i]) return;
    const bmp = await createImageBitmap(blobs[i]);
    if (destroyed || g !== generation) bmp.close(); else bitmaps[i] = bmp;
  };

  function decode(i) {
    if (i < 0 || i >= n || bitmaps[i] || decoding.has(i) || !blobs[i]) return;
    decoding.add(i);
    const g = generation;
    createImageBitmap(blobs[i]).then((bmp) => { if (destroyed || g !== generation) bmp.close(); else bitmaps[i] = bmp; }, () => {})
      .finally(() => { decoding.delete(i); kick(); });
  }

  // decode `R * 2` ahead in the direction of travel and `R` behind; release the rest, except anchors, the frame on
  // screen and the frames between it and the wanted one
  function manageWindow(centre) {
    const ahead = R * 2;
    const lo = dir > 0 ? centre - R : centre - ahead, hi = dir > 0 ? centre + ahead : centre + R;
    const pLo = Math.min(shown, centre), pHi = Math.max(shown, centre);
    for (let i = 0; i < n; i++) {
      if (bitmaps[i] && (i < lo - 4 || i > hi + 4) && !(i >= pLo && i <= pHi) && !anchorSet.has(i)) { bitmaps[i].close(); bitmaps[i] = null; }
    }
    const order = [];
    for (let d = 0; d <= ahead; d++) { order.push(centre + dir * d); if (d && d <= R) order.push(centre - dir * d); }
    order.push(...anchors); // window first, then any anchor still missing
    for (const i of order) { if (decoding.size >= concurrency) break; decode(i); }
  }

  function tick(now) {
    raf = 0;
    if (destroyed || !active || document.hidden) { running = false; return; }
    const dt = Math.min(64, now - (last || now - 16.667)); last = now;
    target = toPos(progress());
    // glide toward the scroll position, never faster than `maxSpeed` frames per 60 Hz frame
    const cap = maxSpeed * dt / 16.667;
    const step = clamp((target - cur) * (1 - (1 - ease) ** (dt / 16.667)), -cap, cap);
    if (step) dir = Math.sign(step);
    cur += step; if (Math.abs(target - cur) < 0.01) cur = target;
    const want = Math.round(cur);
    manageWindow(want);
    const use = usable(want);
    if (use >= 0 && use !== shown) draw(use);
    if (cur !== target || decoding.size) raf = requestAnimationFrame(tick); else running = false;
  }
  function kick() { if (!running && !destroyed && !reducedMotion) { running = true; last = 0; raf = requestAnimationFrame(tick); } }
  // a rotation can change which set fits. Same frame count, so the film stays at the same spot; the old frame stays on screen meanwhile.
  async function swapSet(next) {
    const g = ++generation;
    const read = await readSet(next).catch(() => null);
    if (!read || read.m.count !== n || destroyed || g !== generation) return;
    fetchAc.abort(); fetchAc = new AbortController();
    bitmaps.forEach((b, i) => { b?.close(); bitmaps[i] = null; }); blobs.fill(null);
    set = next; applySet(read); wantW = wantH = 0;
    const at = Math.round(cur);
    await decodeNow(at);
    if (g !== generation) return;
    draw(at); fetchAll(at); kick();
  }
  const onResize = () => {
    shown = -1;
    if (canvas.clientWidth !== lastWidth) { // a width change, not the address bar
      lastWidth = canvas.clientWidth;
      const next = setFor();
      if (next !== set && !reducedMotion) { swapSet(next); return; }
    }
    kick();
  };

  const scrubber = {
    io: null, get manifest() { return manifest; }, get set() { return set?.name ?? 'full'; }, get frame() { return shown; },
    destroy() {
      destroyed = true; cancelAnimationFrame(raf); scrubber.io?.disconnect(); fetchAc.abort();
      removeEventListener('scroll', kick); removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', kick);
      bitmaps.forEach((b) => b?.close());
    },
  };

  if (reducedMotion) { // one calm frame, no scrubbing
    const rest = restFrame === 'last' ? n - 1 : restFrame === 'first' ? 0 : Math.round((n - 1) / 2);
    await decodeNow(rest); draw(bitmaps[rest] ? rest : 0);
  } else {
    lastWidth = canvas.clientWidth;
    cur = target = toPos(progress());
    const first = Math.round(cur);
    await decodeNow(first); // the frame for where the page opened, immediately
    draw(first);
    fetchAll(first);
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', kick);
    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; if (active) kick(); }, { rootMargin: '25% 0px' });
    io.observe(scene);
    scrubber.io = io;
    kick();
  }

  return scrubber;
}

// Breaking points without touching the scroll: the film rests on each of `frames` (0-based) for `hold` of the scroll
// (0.04 = 4 % each) and moves evenly between them. Use as `mapFrame: holdAt([0, 40, 95], 0.05)`.
export function holdAt(frames, hold = 0.04) {
  const stops = [...frames].sort((a, b) => a - b);
  return (p, n) => {
    const k = stops.length;
    if (!k) return p * (n - 1);
    const moving = Math.max(0, 1 - hold * k);
    const segs = []; let prev = 0;
    for (const f of stops) { segs.push({ from: prev, to: f }); prev = f; }
    segs.push({ from: prev, to: n - 1 });
    const total = segs.reduce((s, g) => s + Math.abs(g.to - g.from), 0) || 1;
    let at = 0;
    for (let i = 0; i < segs.length; i++) {
      const len = moving * Math.abs(segs[i].to - segs[i].from) / total;
      if (p <= at + len) return segs[i].from + (segs[i].to - segs[i].from) * (len ? (p - at) / len : 1);
      at += len;
      if (i < k) { if (p <= at + hold) return stops[i]; at += hold; }
    }
    return n - 1;
  };
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
