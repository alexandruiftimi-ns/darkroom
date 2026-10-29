// Hero-media tools: measure (edge colour, loop seam, empty zone), encode for the web (web, boomerang), look (sheet) and
// make abstract backdrops in code (make). Measurements are heuristics on a 96×54 thumbnail: they suggest, never reject.
// Video work needs ffmpeg with libx264; sheet and make render in Chromium. Missing engines are reported, not assumed.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile, execFileSync } from 'node:child_process';
import { engines } from './media.mjs';
import { launch, mkdirp } from './browser.mjs';
import { resolveTarget } from './serve.mjs';

const IMG = /\.(png|jpe?g|webp|avif|gif)$/i;
const VID = /\.(mp4|webm|mov|m4v)$/i;
const W = 96; const H = 54;
export const SEAM_THRESHOLD = 0.06; // mean absolute difference (0–1) between first and last frame above which a seam is likely
const run = (bin, args) => execFileSync(bin, args, { stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 256 * 1024 * 1024 });
const hex = (r, g, b) => `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
const mb = (n) => +(n / 1048576).toFixed(2);

function ffmpegOrThrow(need264 = false) {
  const eng = engines();
  if (!eng.ffmpeg) throw new Error('this needs ffmpeg (free: ffmpeg.org, or `winget install ffmpeg` / `brew install ffmpeg`); ask the user before installing');
  if (need264 && !eng.ffmpeg.encoders.libx264) throw new Error('this ffmpeg has no libx264 encoder (H.264); install a full build');
  return eng;
}

// ---- measuring ----
/** One frame as raw RGB at 96×54. at: 'first' | 'last'. Returns null without ffmpeg. */
export function grab(file, at = 'first') {
  const eng = engines(); if (!eng.ffmpeg) return null;
  const vf = ['-vf', `scale=${W}:${H}:flags=area`, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'];
  const buf = at === 'last'
    ? run(eng.ffmpeg.bin, ['-v', 'error', '-sseof', '-0.5', '-i', file, ...vf])
    : run(eng.ffmpeg.bin, ['-v', 'error', '-i', file, '-frames:v', '1', ...vf]);
  const size = W * H * 3;
  if (buf.length < size) return null;
  return buf.subarray(buf.length - size); // last decoded frame when several came out
}

/** Same as grab, but without blocking the event loop: required when the file is served by this same process (audit). */
export function grabAsync(file, at = 'first') {
  const eng = engines(); if (!eng.ffmpeg) return Promise.resolve(null);
  const vf = ['-vf', `scale=${W}:${H}:flags=area`, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'];
  const args = at === 'last' ? ['-v', 'error', '-sseof', '-0.5', '-i', file, ...vf] : ['-v', 'error', '-i', file, '-frames:v', '1', ...vf];
  return new Promise((resolve) => execFile(eng.ffmpeg.bin, args, { encoding: 'buffer', maxBuffer: 256 * 1024 * 1024, timeout: 30000 }, (err, buf) => {
    const size = W * H * 3;
    resolve(err || !buf || buf.length < size ? null : buf.subarray(buf.length - size));
  }));
}

/** Dominant colour of the outer 4 % border, and how uniform it is (share of border pixels within ~12 % of it). */
export function edgeColour(px) {
  const bx = Math.max(2, Math.round(W * 0.04)); const by = Math.max(2, Math.round(H * 0.04));
  const pts = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (x < bx || y < by || x >= W - bx || y >= H - by) { const i = (y * W + x) * 3; pts.push([px[i], px[i + 1], px[i + 2]]); }
  const m = [0, 1, 2].map((c) => pts.reduce((s, p) => s + p[c], 0) / pts.length);
  const near = pts.filter((p) => Math.hypot(p[0] - m[0], p[1] - m[1], p[2] - m[2]) < 30).length / pts.length;
  return { hex: hex(...m), uniform: +near.toFixed(2) };
}

/** Mean absolute difference between two frames, 0 (identical) to 1. */
export function seamScore(a, b) {
  let s = 0; for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]);
  return +(s / a.length / 255).toFixed(3);
}

/** The calmest of five zones (left, right, top, bottom, centre third) by mean luminance gradient. */
export function emptyZone(px) {
  const L = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) L[i] = 0.2126 * px[i * 3] + 0.7152 * px[i * 3 + 1] + 0.0722 * px[i * 3 + 2];
  const grad = (x0, x1, y0, y1) => { let s = 0; let n = 0; for (let y = y0; y < y1 - 1; y++) for (let x = x0; x < x1 - 1; x++) { const i = y * W + x; s += Math.abs(L[i + 1] - L[i]) + Math.abs(L[i + W] - L[i]); n++; } return s / Math.max(1, n); };
  const t = (n) => Math.round(n / 3);
  const zones = { left: grad(0, t(W), 0, H), right: grad(W - t(W), W, 0, H), top: grad(0, W, 0, t(H)), bottom: grad(0, W, H - t(H), H), centre: grad(t(W), W - t(W), t(H), H - t(H)) };
  const [zone, score] = Object.entries(zones).sort((a, b) => a[1] - b[1])[0];
  return { zone, detail: +score.toFixed(2), calm: score < 3, zones: Object.fromEntries(Object.entries(zones).map(([k, v]) => [k, +v.toFixed(2)])) };
}

/** Everything at once; null fields when ffmpeg is missing (say "not measured"). */
export function analyse(file) {
  const first = grab(file, 'first');
  if (!first) return { measured: false, note: 'not measured: needs ffmpeg' };
  const out = { measured: true, edge: edgeColour(first), empty: emptyZone(first) };
  if (VID.test(file)) { const last = grab(file, 'last'); if (last) { out.seam = seamScore(first, last); out.seamLikely = out.seam > SEAM_THRESHOLD; } }
  return out;
}

/** Intake wording: suggestions only. */
export function heroSuggestions(a) {
  const better = []; const info = [];
  if (!a?.measured) return { better, info };
  info.push(`edge colour ${a.edge.hex} (${Math.round(a.edge.uniform * 100)} % uniform): use it as the page ground (--ground) so the media melts into the page`);
  if (a.edge.uniform < 0.6) better.push('the edges are busy, so the media will show a hard border against the page; a version that falls off to one flat colour at the edges blends better (I can add a scrim meanwhile)');
  info.push(a.empty.calm ? `calmest area: ${a.empty.zone} (good place for the words)` : `no calm area for the words (calmest: ${a.empty.zone}); I'll add a scrim or text shadow there`);
  if (a.seamLikely) better.push(`first and last frame differ (seam ${a.seam}): the loop will jump; I'll hide it with a fade loop or a boomerang copy, or a clip that ends where it starts would loop cleanly`);
  return { better, info };
}

// ---- encoding ----
function probe(file) {
  const eng = engines();
  const bin = eng.ffprobe || 'ffprobe';
  const j = JSON.parse(run(bin, ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', file]).toString());
  const v = j.streams.find((s) => s.codec_type === 'video');
  return { width: v?.width, height: v?.height, duration: Number(j.format.duration) || 0 };
}

function x264(bin, input, out, { width, fps = 24, crf = 23, filter = null, loop = null, duration = 0 }) {
  const scale = `fps=${fps},scale='min(${width},iw)':-2:flags=lanczos,format=yuv420p`;
  let args;
  if (loop === 'crossfade') {
    const F = Math.min(1, duration / 4);
    if (duration < 1) throw new Error('clip too short for a crossfade loop (under 1 s)');
    const fc = `[0:v]${scale},split[a][b];[a]trim=start=${F},setpts=PTS-STARTPTS[main];[b]trim=0:${F},setpts=PTS-STARTPTS[head];[main][head]xfade=transition=fade:duration=${F}:offset=${(duration - 2 * F).toFixed(3)}[v]`;
    args = ['-filter_complex', fc, '-map', '[v]'];
  } else if (loop === 'boomerang') {
    args = ['-filter_complex', `[0:v]${scale},split[a][b];[b]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[a][r]concat=n=2:v=1:a=0[v]`, '-map', '[v]'];
  } else args = ['-vf', filter ? `${filter},${scale}` : scale];
  run(bin, ['-y', '-v', 'error', '-i', input, ...args, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
  return fs.statSync(out).size;
}

function poster(bin, input, outBase, eng) {
  const webp = eng.ffmpeg.encoders.libwebp;
  const out = `${outBase}.${webp ? 'webp' : 'jpg'}`;
  run(bin, ['-y', '-v', 'error', '-i', input, '-frames:v', '1', ...(webp ? ['-c:v', 'libwebp', '-quality', '80'] : ['-q:v', '3']), out]);
  return out;
}

/** --cutout: the first frame with its background removed, as WebP with alpha (<= 500 KB), only if a free remover is
 *  already installed (rembg). Never installs one: reports which free tool would do it, so Claude can ask the user. */
function cutout(bin, input, outBase, eng) {
  let tool = null;
  for (const t of [process.env.DARKROOM_REMBG, 'rembg'].filter(Boolean)) { try { run(t, ['--help']); tool = t; break; } catch { /* not installed */ } }
  if (!tool) return { made: false, note: 'no background-removal tool found. Free option: rembg (Python, `pip install rembg`, runs locally); ask the user before installing. Meanwhile use the poster or a scrim.' };
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'darkroom-cut-'));
  try {
    const still = path.join(tmp, 'still.png'); const cut = path.join(tmp, 'cut.png');
    run(bin, ['-y', '-v', 'error', '-i', input, '-frames:v', '1', still]);
    run(tool, ['i', still, cut]);
    const out = `${outBase}.webp`;
    let q = 82;
    do { run(bin, ['-y', '-v', 'error', '-i', cut, ...(eng.ffmpeg.encoders.libwebp ? ['-c:v', 'libwebp', '-quality', String(q), '-pix_fmt', 'yuva420p'] : []), eng.ffmpeg.encoders.libwebp ? out : `${outBase}.png`]); q -= 12; }
    while (eng.ffmpeg.encoders.libwebp && fs.statSync(out).size > 500 * 1024 && q > 30);
    const file = eng.ffmpeg.encoders.libwebp ? out : `${outBase}.png`;
    return { made: true, file, kb: Math.round(fs.statSync(file).size / 1024), tool };
  } catch (e) { return { made: false, note: `background removal failed: ${String(e.message).split('\n')[0]}` }; }
  finally { fs.rmSync(tmp, { recursive: true, force: true }); }
}

/** media web <clip>: H.264 desktop + phone copies with faststart, a poster, and the hero-media measurements. */
export async function web(source, opt = {}) {
  const eng = ffmpegOrThrow(true); const bin = eng.ffmpeg.bin;
  const src = path.resolve(source);
  const base = String(opt.name ?? path.basename(src, path.extname(src)));
  const outDir = path.resolve(opt.out ?? path.dirname(src)); mkdirp(outDir);
  const loop = opt.loop && opt.loop !== true ? String(opt.loop) : null;
  if (loop && !['crossfade', 'boomerang'].includes(loop)) throw new Error('--loop is crossfade or boomerang');
  const info = probe(src);
  const main = path.join(outDir, `${base}.mp4`); const mobile = path.join(outDir, `${base}-mobile.mp4`);
  if (path.resolve(main) === src) throw new Error('the output would overwrite the original; pass --out or --name');
  const width = Number(opt.width ?? 1920); const fps = Number(opt.fps ?? 24); const crf = Number(opt.crf ?? 23);
  const bytes = x264(bin, src, main, { width, fps, crf, loop, duration: info.duration });
  const mBytes = x264(bin, main, mobile, { width: Number(opt['mobile-width'] ?? 960), fps, crf: crf + 2 });
  const post = poster(bin, main, path.join(outDir, `${base}-poster`), eng);
  const a = analyse(main);
  const result = { source: src, loop: loop ?? 'none', files: { video: main, mobile, poster: post }, mb: { video: mb(bytes), mobile: mb(mBytes), poster: mb(fs.statSync(post).size) }, ...a };
  if (opt.cutout) result.cutout = cutout(bin, main, path.join(outDir, `${base}-cutout`), eng);
  console.log(JSON.stringify(result, null, 2));
  if (bytes > 8 * 1048576) console.log(`warn  ${mb(bytes)} MB is over the ~8 MB hero budget: try --crf ${crf + 3}, --width 1600 or a shorter clip`);
  if (a.seamLikely && !loop) console.log(`note  first and last frame differ (seam ${a.seam}): use --loop crossfade or --loop boomerang, or recipes/video-loop.js`);
  return result;
}

/** media boomerang <clip>: one ping-pong file that loops without a seam (plays forward, then backward). */
export async function boomerang(source, opt = {}) {
  const eng = ffmpegOrThrow(true);
  const src = path.resolve(source);
  const out = path.resolve(opt.out && opt.out !== true ? String(opt.out) : path.join(path.dirname(src), `${path.basename(src, path.extname(src))}-boomerang.mp4`));
  if (out === src) throw new Error('the output would overwrite the original');
  mkdirp(path.dirname(out));
  const bytes = x264(eng.ffmpeg.bin, src, out, { width: Number(opt.width ?? 1920), fps: Number(opt.fps ?? 24), crf: Number(opt.crf ?? 23), loop: 'boomerang' });
  const a = analyse(out);
  console.log(`${out}  ${mb(bytes)} MB, seam ${a.seam ?? 'not measured'} (play with the plain loop attribute)`);
  return { file: out, bytes, ...a };
}

/** media chain <clip> <clip> …: score every seam (last frame of a clip against the first frame of the next), then join
 *  the clips into one H.264 file for `media frames` / scrub-video. A clean seam drops the next clip's first frame (it
 *  repeats the last one: a connector made from the extracted frame). Seams are reported, never fixed silently. */
export async function chain(sources, opt = {}) {
  const eng = ffmpegOrThrow(true); const bin = eng.ffmpeg.bin;
  const clips = sources.map((s) => path.resolve(s));
  if (clips.length < 2) throw new Error('media chain needs two or more clips, in playing order');
  for (const c of clips) if (!fs.existsSync(c)) throw new Error(`not found: ${c}`);
  const seams = [];
  for (let i = 0; i < clips.length - 1; i++) {
    const a = grab(clips[i], 'last'); const b = grab(clips[i + 1], 'first');
    const score = a && b ? seamScore(a, b) : null;
    seams.push({ from: path.basename(clips[i]), to: path.basename(clips[i + 1]), seam: score, clean: score !== null && score <= SEAM_THRESHOLD });
  }
  const out = path.resolve(opt.out && opt.out !== true ? String(opt.out) : path.join(path.dirname(clips[0]), 'chain.mp4'));
  if (clips.includes(out)) throw new Error('the output would overwrite a source clip; pass --out');
  mkdirp(path.dirname(out));
  const width = Number(opt.width ?? 1920); const fps = Number(opt.fps ?? 24); const crf = Number(opt.crf ?? 20);
  const parts = clips.map((_, i) => `[${i}:v]fps=${fps},scale=${width}:-2:flags=lanczos,format=yuv420p,setsar=1${i > 0 && seams[i - 1].clean ? ',trim=start_frame=1' : ''},setpts=PTS-STARTPTS[v${i}]`);
  const fc = `${parts.join(';')};${clips.map((_, i) => `[v${i}]`).join('')}concat=n=${clips.length}:v=1:a=0[v]`;
  run(bin, ['-y', '-v', 'error', ...clips.flatMap((c) => ['-i', c]), '-filter_complex', fc, '-map', '[v]', '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
  const bytes = fs.statSync(out).size;
  const result = { file: out, mb: mb(bytes), clips: clips.length, seams, threshold: SEAM_THRESHOLD };
  console.log(JSON.stringify(result, null, 2));
  for (const s of seams) {
    if (s.seam === null) console.log(`note  ${s.from} → ${s.to}: seam not measured`);
    else if (!s.clean) console.log(`warn  ${s.from} → ${s.to}: seam ${s.seam} (> ${SEAM_THRESHOLD}): the picture jumps here. Make the next clip from the extracted last frame of ${s.from} (not the original still), keep one model for the whole chain, or crossfade 6–8 frames across the seam`);
  }
  return result;
}

// ---- looking ----
/** media sheet <folder>: a numbered contact sheet (JPG) of every image and video first frame, plus a JSON index. */
export async function sheet(dir, opt = {}) {
  const folder = path.resolve(dir);
  const files = fs.readdirSync(folder).filter((f) => IMG.test(f) || VID.test(f)).sort();
  if (!files.length) throw new Error(`no images or videos in ${folder}`);
  const cols = Number(opt.cols ?? 4); const tile = Number(opt.tile ?? 320);
  const out = path.resolve(opt.out && opt.out !== true ? String(opt.out) : path.join(folder, 'contact-sheet.jpg'));
  const served = await resolveTarget(folder);
  const browser = await launch();
  let index;
  try {
    const page = await browser.newPage({ viewport: { width: cols * (tile + 16) + 16, height: 600 } });
    await page.goto(served.url);
    index = await page.evaluate(async ({ files, cols, tile }) => {
      document.documentElement.innerHTML = `<head><style>body{margin:0;padding:16px;background:#151515;color:#eee;font:12px/1.3 system-ui;display:grid;grid-template-columns:repeat(${cols},${tile}px);gap:16px}
        figure{margin:0}.m{width:${tile}px;height:${Math.round(tile * 9 / 16)}px;background:#2a2a2a;position:relative;overflow:hidden}.m>*{width:100%;height:100%;object-fit:contain}
        b{position:absolute;left:6px;top:6px;background:#000c;color:#fff;padding:2px 7px;border-radius:9px;font-size:13px}figcaption{margin-top:6px;word-break:break-all;opacity:.85}</style></head><body></body>`;
      const rows = [];
      for (const [i, f] of files.entries()) {
        const fig = document.createElement('figure'); const box = document.createElement('div'); box.className = 'm';
        const vid = /\.(mp4|webm|mov|m4v)$/i.test(f);
        const el = document.createElement(vid ? 'video' : 'img');
        const url = '/' + encodeURIComponent(f);
        let meta = {};
        try {
          if (vid) { el.muted = true; el.preload = 'auto'; el.src = url + '#t=0.1'; await new Promise((r, j) => { el.onloadeddata = r; el.onerror = () => j(new Error('not decodable')); setTimeout(() => j(new Error('timeout')), 15000); }); meta = { width: el.videoWidth, height: el.videoHeight, duration: +el.duration.toFixed(2) }; }
          else { el.src = url; await el.decode(); meta = { width: el.naturalWidth, height: el.naturalHeight }; }
        } catch (e) { meta = { error: e.message }; }
        const n = document.createElement('b'); n.textContent = String(i + 1);
        box.append(el, n); fig.append(box);
        const cap = document.createElement('figcaption'); cap.textContent = `${f}  ${meta.width ? `${meta.width}×${meta.height}` : meta.error}${meta.duration ? `  ${meta.duration}s` : ''}`;
        fig.append(cap); document.body.append(fig);
        rows.push({ n: i + 1, file: f, kind: vid ? 'video' : 'image', ...meta });
      }
      return rows;
    }, { files, cols, tile });
    mkdirp(path.dirname(out));
    await page.screenshot({ path: out, fullPage: true, type: 'jpeg', quality: 82 });
  } finally { await browser.close(); await served.close(); }
  const json = out.replace(/\.jpe?g$/i, '') + '.json';
  fs.writeFileSync(json, JSON.stringify({ folder, sheet: out, tiles: index }, null, 2));
  console.log(`${index.length} tiles → ${out} (+ ${path.basename(json)}). Look at it, then pick by number.`);
  return { sheet: out, index: json, tiles: index };
}

// ---- making ----
export const PRESETS = {
  'gradient-mesh': 'slow drifting colour field (video)',
  'light-sweep': 'a soft beam crossing a dark field (video)',
  aurora: 'soft vertical curtains of light (video)',
  particles: 'slow dust or embers drifting on small orbits (video)',
  'topo-lines': 'wavy contour lines, like a map (video)',
  'noise-terrain': 'abstract ridges with one glowing rim (video)',
  'orbit-rings': 'tilted rings with dots in orbit, for a network or community (video)',
  'fluted-glass': 'colour seen through ribbed glass (video)',
  grain: 'film-grain tile (still PNG, for grain.css or a background)',
  halftone: 'halftone dot field fading from one corner (still PNG)',
  'dot-grid': 'quiet dot grid (still PNG)',
};
const STILLS = new Set(['grain', 'halftone', 'dot-grid']);

const DRAW = String.raw`
const TAU = Math.PI * 2;
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgba = (h, a) => { const [r, g, b] = rgb(h); return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'; };
function finish(ctx, w, h, o) {
  // edges fall off to exactly the ground in a soft ellipse (so the media melts into the page), then the empty zone is calmed
  ctx.save(); ctx.translate(w / 2, h / 2); ctx.scale(w / 2, h / 2);
  const v = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.SQRT2);
  v.addColorStop(0, rgba(o.ground, 0)); v.addColorStop(0.36, rgba(o.ground, 0)); v.addColorStop(0.66, rgba(o.ground, 1)); v.addColorStop(1, rgba(o.ground, 1));
  ctx.fillStyle = v; ctx.fillRect(-1, -1, 2, 2); ctx.restore();
  const z = { left: [0, 0, w * 0.5, 0, 0, 0, w * 0.5, h], right: [w, 0, w * 0.5, 0, w * 0.5, 0, w * 0.5, h], top: [0, 0, 0, h * 0.45, 0, 0, w, h * 0.45], bottom: [0, h, 0, h * 0.55, 0, h * 0.55, w, h * 0.45] }[o.empty];
  if (z) { const g = ctx.createLinearGradient(z[0], z[1], z[2], z[3]); g.addColorStop(0, rgba(o.ground, 0.92)); g.addColorStop(0.55, rgba(o.ground, 0.6)); g.addColorStop(1, rgba(o.ground, 0)); ctx.fillStyle = g; ctx.fillRect(z[4], z[5], z[6], z[7]); }
}
const presets = {
  'gradient-mesh'(ctx, w, h, t, o) {
    ctx.fillStyle = o.ground; ctx.fillRect(0, 0, w, h);
    const blobs = [[o.accent, 0.55, 0.42, 0.34, 0.0, 0.22, 0.42], [o.ink, 0.38, 0.6, 0.36, 0.33, 0.18, 0.16], [o.accent, 0.7, 0.62, 0.28, 0.66, 0.2, 0.34], [o.ink, 0.6, 0.3, 0.26, 0.5, 0.14, 0.1]];
    ctx.globalCompositeOperation = 'lighter';
    for (const [c, cx, cy, r, ph, amp, alpha] of blobs) {
      const x = (cx + Math.cos(TAU * (t + ph)) * amp * 0.5) * w; const y = (cy + Math.sin(TAU * (t + ph)) * amp * 0.35) * h;
      const R = r * Math.max(w, h) * (1 + 0.08 * Math.sin(TAU * (t * 2 + ph)));
      const g = ctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, rgba(c, alpha)); g.addColorStop(1, rgba(c, 0));
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = 'source-over';
    finish(ctx, w, h, o);
  },
  'light-sweep'(ctx, w, h, t, o) {
    ctx.fillStyle = o.ground; ctx.fillRect(0, 0, w, h);
    for (const [off, a, wd] of [[0, 0.5, 0.18], [0.5, 0.22, 0.32]]) {
      const p = ((t + off) % 1) * 1.8 - 0.4; // from off-left to off-right: identical (empty) at t = 0 and t = 1
      const x = p * w; const span = wd * w;
      ctx.save(); ctx.translate(x, h / 2); ctx.rotate(-0.35);
      const g = ctx.createLinearGradient(-span, 0, span, 0); g.addColorStop(0, rgba(o.accent, 0)); g.addColorStop(0.5, rgba(o.accent, a)); g.addColorStop(1, rgba(o.accent, 0));
      ctx.fillStyle = g; ctx.fillRect(-span, -h * 1.2, span * 2, h * 2.4); ctx.restore();
    }
    const v = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7); v.addColorStop(0, rgba(o.ink, 0.06)); v.addColorStop(1, rgba(o.ink, 0));
    ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);
    finish(ctx, w, h, o);
  },
  grain(ctx, w, h, t, o) {
    const img = ctx.createImageData(w, h); let s = 0x9e3779b9;
    for (let i = 0; i < img.data.length; i += 4) { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; const v = 64 + ((s >>> 0) % 128); img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
    ctx.putImageData(img, 0, 0);
  },
  // Every moving preset below is a function of sin/cos(TAU * t * k) with whole k, so t = 1 equals t = 0: the loop is seamless.
  aurora(ctx, w, h, t, o) {
    ctx.fillStyle = o.ground; ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter'; ctx.filter = 'blur(' + Math.max(2, w / 140) + 'px)'; // blur melts the strips into curtains
    const strips = 90; const sw = w / strips;
    for (let i = 0; i < strips; i++) {
      const x = i * sw; const u = i / strips;
      const top = h * (0.18 + 0.1 * Math.sin(TAU * (t + u * 1.3)) + 0.05 * Math.sin(TAU * (2 * t - u * 2.7)));
      const len = h * (0.38 + 0.12 * Math.sin(TAU * (t * 1 + u * 0.8 + 0.3)));
      const a = 0.16 + 0.12 * Math.sin(TAU * (t * 2 + u * 3.1));
      const g = ctx.createLinearGradient(0, top, 0, top + len);
      g.addColorStop(0, rgba(o.accent, 0)); g.addColorStop(0.35, rgba(o.accent, a)); g.addColorStop(0.7, rgba(o.ink, a * 0.35)); g.addColorStop(1, rgba(o.ink, 0));
      ctx.fillStyle = g; ctx.fillRect(x, top, sw * 1.6, len);
    }
    ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
    finish(ctx, w, h, o);
  },
  particles(ctx, w, h, t, o) {
    ctx.fillStyle = o.ground; ctx.fillRect(0, 0, w, h);
    let s = 7;
    const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    const n = 140; const m = Math.min(w, h);
    for (let i = 0; i < n; i++) {
      const cx = rnd() * w; const cy = rnd() * h; const R = (0.02 + rnd() * 0.06) * m; const k = rnd() < 0.5 ? 1 : -1; const ph = rnd();
      const x = cx + Math.cos(TAU * (k * t + ph)) * R; const y = cy + Math.sin(TAU * (k * t + ph)) * R * 0.6;
      const r = (0.6 + rnd() * 1.8) * m / 540; const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(TAU * (2 * t + ph)));
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4); g.addColorStop(0, rgba(rnd() < 0.3 ? o.accent : o.ink, a)); g.addColorStop(1, rgba(o.ink, 0));
      ctx.fillStyle = g; ctx.fillRect(x - r * 4, y - r * 4, r * 8, r * 8);
    }
    finish(ctx, w, h, o);
  },
  'topo-lines'(ctx, w, h, t, o) {
    ctx.fillStyle = o.ground; ctx.fillRect(0, 0, w, h);
    const lines = 26; ctx.lineWidth = Math.max(1, h / 540);
    for (let i = 0; i < lines; i++) {
      const base = h * (i + 0.5) / lines; const ph = i * 0.21;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const u = x / w;
        const y = base + h * 0.03 * Math.sin(TAU * (u * 1.5 + t + ph)) + h * 0.018 * Math.sin(TAU * (u * 3.2 - 2 * t + ph * 2)) + h * 0.05 * Math.exp(-((u - 0.62) ** 2) / 0.02) * Math.sin(TAU * (t + i * 0.04));
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = rgba(i % 5 === 0 ? o.accent : o.ink, i % 5 === 0 ? 0.55 : 0.18); ctx.stroke();
    }
    finish(ctx, w, h, o);
  },
  'noise-terrain'(ctx, w, h, t, o) {
    // ridge lines, back to front; each ridge is filled with the ground so it hides the ones behind; the front ridge glows
    ctx.fillStyle = o.ground; ctx.fillRect(0, 0, w, h);
    const rows = 22;
    for (let i = 0; i < rows; i++) {
      const base = h * (0.3 + 0.6 * i / rows); const amp = h * 0.12 * (0.4 + i / rows);
      ctx.beginPath(); ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 5) {
        const u = x / w; const peak = Math.exp(-((u - 0.5) ** 2) / 0.03);
        const y = base - amp * peak * (0.55 + 0.25 * Math.sin(TAU * (u * 4 + t + i * 0.13)) + 0.2 * Math.sin(TAU * (u * 9 - t + i * 0.37)));
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h); ctx.closePath();
      ctx.fillStyle = o.ground; ctx.fill();
      const front = i === rows - 1;
      ctx.strokeStyle = rgba(front ? o.accent : o.ink, front ? 0.9 : 0.12 + 0.3 * i / rows); ctx.lineWidth = Math.max(1, h / (front ? 360 : 700));
      if (front) { ctx.shadowColor = o.accent; ctx.shadowBlur = h / 40; }
      ctx.stroke(); ctx.shadowBlur = 0;
    }
    finish(ctx, w, h, o);
  },
  'orbit-rings'(ctx, w, h, t, o) {
    ctx.fillStyle = o.ground; ctx.fillRect(0, 0, w, h);
    const cx = w * 0.5; const cy = h * 0.5; const m = Math.min(w, h);
    for (let i = 0; i < 6; i++) {
      const rx = m * (0.12 + i * 0.075) * 1.6; const ry = rx * 0.34; const tilt = -0.22;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt);
      ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, TAU); ctx.strokeStyle = rgba(o.ink, 0.14); ctx.lineWidth = Math.max(1, m / 900); ctx.stroke();
      const dots = 1 + (i % 3);
      for (let d = 0; d < dots; d++) {
        const a = TAU * ((i % 2 ? 1 : -1) * t + d / dots + i * 0.11);
        const x = Math.cos(a) * rx; const y = Math.sin(a) * ry; const r = m / 160;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 5); g.addColorStop(0, rgba(d === 0 ? o.accent : o.ink, 0.95)); g.addColorStop(0.25, rgba(d === 0 ? o.accent : o.ink, 0.35)); g.addColorStop(1, rgba(o.ink, 0));
        ctx.fillStyle = g; ctx.fillRect(x - r * 5, y - r * 5, r * 10, r * 10);
      }
      ctx.restore();
    }
    finish(ctx, w, h, o);
  },
  'fluted-glass'(ctx, w, h, t, o) {
    // draw a moving colour field off screen, then copy it back through vertical flutes, each slightly magnified and shifted
    const off = document.createElement('canvas'); off.width = w; off.height = h; const c = off.getContext('2d');
    c.fillStyle = o.ground; c.fillRect(0, 0, w, h);
    for (const [col, ph, rr] of [[o.accent, 0, 0.42], [o.ink, 0.5, 0.28]]) {
      const x = w * (0.5 + 0.22 * Math.cos(TAU * (t + ph))); const y = h * (0.5 + 0.18 * Math.sin(TAU * (t + ph)));
      const g = c.createRadialGradient(x, y, 0, x, y, rr * Math.max(w, h)); g.addColorStop(0, rgba(col, 0.6)); g.addColorStop(1, rgba(col, 0));
      c.fillStyle = g; c.fillRect(0, 0, w, h);
    }
    const flutes = 28; const fw = w / flutes;
    for (let i = 0; i < flutes; i++) {
      const x = i * fw;
      ctx.drawImage(off, x - fw * 0.35, 0, fw * 1.7, h, x, 0, fw, h); // each flute shows a wider slice, squeezed: the refraction
      const g = ctx.createLinearGradient(x, 0, x + fw, 0); g.addColorStop(0, 'rgba(255,255,255,0.05)'); g.addColorStop(0.5, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,0.12)');
      ctx.fillStyle = g; ctx.fillRect(x, 0, fw, h);
    }
    finish(ctx, w, h, o);
  },
  halftone(ctx, w, h, t, o) {
    ctx.fillStyle = o.ground; ctx.fillRect(0, 0, w, h);
    const step = Math.max(8, Math.round(Math.min(w, h) / 48));
    ctx.fillStyle = o.ink;
    for (let y = step / 2; y < h; y += step) for (let x = step / 2; x < w; x += step) {
      const d = Math.hypot((x / w - 0.65) * 1.4, y / h - 0.4); const r = Math.max(0, (1 - d * 1.6)) * step * 0.48;
      if (r > 0.4) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
    }
    finish(ctx, w, h, o);
  },
  'dot-grid'(ctx, w, h, t, o) {
    ctx.fillStyle = o.ground; ctx.fillRect(0, 0, w, h);
    const step = Math.max(16, Math.round(Math.min(w, h) / 30)); const r = Math.max(1, step / 18);
    ctx.fillStyle = rgba(o.ink, 0.22);
    for (let y = step / 2; y < h; y += step) for (let x = step / 2; x < w; x += step) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
    finish(ctx, w, h, o);
  },
};
window.render = (name, w, h, t, o) => { const c = document.getElementById('c'); c.width = w; c.height = h; presets[name](c.getContext('2d'), w, h, t, o); return c.toDataURL('image/png'); };
`;

/** media make <preset>: an abstract backdrop drawn in code, in the project's colours. Loops seamlessly (periodic time),
 *  edges fall off to the ground colour, and --empty keeps a zone calm for the words. Royalty-free by construction. */
export async function make(preset, opt = {}) {
  if (!PRESETS[preset]) throw new Error(`unknown preset ${preset}; one of: ${Object.keys(PRESETS).join(', ')}`);
  const [ground = '#0b0b0d', ink = '#f2efe9', accent = '#5b6cff'] = String(opt.colours ?? opt.colors ?? '').split(',').map((s) => s.trim()).filter(Boolean).map((c) => (c.startsWith('#') ? c : `#${c}`));
  for (const c of [ground, ink, accent]) if (!/^#[0-9a-f]{6}$/i.test(c)) throw new Error(`colour ${c} must be #rrggbb`);
  const [w, h] = String(opt.size ?? (preset === 'grain' ? '512x512' : '1920x1080')).split('x').map(Number);
  const seconds = Number(opt.seconds ?? 8); const fps = Number(opt.fps ?? 24);
  const empty = ['left', 'right', 'top', 'bottom'].includes(opt.empty) ? opt.empty : 'none';
  const outDir = path.resolve(opt.out && opt.out !== true ? String(opt.out) : 'assets/generated'); mkdirp(outDir);
  const name = String(opt.name ?? preset);
  const o = { ground, ink, accent, empty };
  const browser = await launch();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'darkroom-make-'));
  let result;
  try {
    const page = await browser.newPage();
    await page.setContent(`<canvas id="c"></canvas><script>${DRAW}</script>`);
    const frame = async (t) => Buffer.from((await page.evaluate(({ preset, w, h, t, o }) => window.render(preset, w, h, t, o), { preset, w, h, t, o })).split(',')[1], 'base64');
    if (STILLS.has(preset)) {
      const file = path.join(outDir, `${name}.png`); fs.writeFileSync(file, await frame(0));
      result = { preset, files: { still: file } };
    } else {
      const n = Math.max(2, Math.round(seconds * fps));
      for (let i = 0; i < n; i++) fs.writeFileSync(path.join(tmp, `f_${String(i).padStart(4, '0')}.png`), await frame(i / n)); // t = i/n, so frame n would equal frame 0
      const eng = engines();
      if (!eng.ffmpeg?.encoders.libx264) {
        const keep = path.join(outDir, `${name}-frames`); mkdirp(keep);
        for (const f of fs.readdirSync(tmp)) fs.copyFileSync(path.join(tmp, f), path.join(keep, f));
        console.log(`no ffmpeg with libx264: kept ${n} PNG frames in ${keep}. With ffmpeg this also writes ${name}.mp4, ${name}-mobile.mp4 and a poster.`);
        result = { preset, files: { frames: keep } };
      } else {
        const bin = eng.ffmpeg.bin;
        const main = path.join(outDir, `${name}.mp4`); const mobile = path.join(outDir, `${name}-mobile.mp4`);
        run(bin, ['-y', '-v', 'error', '-framerate', String(fps), '-i', path.join(tmp, 'f_%04d.png'), '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', String(opt.crf ?? 20), '-tune', 'grain', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', main]);
        x264(bin, main, mobile, { width: Math.min(960, w), fps, crf: Number(opt.crf ?? 20) + 2 });
        const post = poster(bin, main, path.join(outDir, `${name}-poster`), eng);
        result = { preset, files: { video: main, mobile, poster: post }, mb: { video: mb(fs.statSync(main).size), mobile: mb(fs.statSync(mobile).size) }, ...analyse(main) };
      }
    }
  } finally { await browser.close(); fs.rmSync(tmp, { recursive: true, force: true }); }
  // provenance: drawn here, so the project owns it
  mkdirp('.darkroom');
  const regFile = '.darkroom/ASSETS.json';
  const reg = fs.existsSync(regFile) ? JSON.parse(fs.readFileSync(regFile, 'utf8')) : { schema: 'darkroom-assets-v1', assets: [], log: [] };
  for (const f of Object.values(result.files)) reg.assets.push({ file: path.relative(process.cwd(), f).split(path.sep).join('/'), section: '', role: 'runtime', bakedUI: false, source: `generated-in-code: darkroom media make ${preset}`, colours: { ground, ink, accent }, empty, rights: 'own', acquired: new Date().toISOString().slice(0, 10), status: 'candidate' });
  fs.writeFileSync(regFile, JSON.stringify(reg, null, 2));
  console.log(JSON.stringify(result, null, 2));
  return result;
}
