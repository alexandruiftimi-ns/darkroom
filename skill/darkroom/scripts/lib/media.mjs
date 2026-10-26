// Media helpers: inspect, derive (responsive stills), frames (video -> sequence + manifest), check (validate a sequence).
// Originals are never modified. Engines are detected, not assumed: ffmpeg (with the encoders it really has), sharp if the
// project has it, and headless Chromium (WebP/JPEG/PNG only) as the zero-install fallback. Missing capability is reported.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { launch, mkdirp } from './browser.mjs';
import { resolveTarget } from './serve.mjs';

const IMG = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif']);
const VID = new Set(['.mp4', '.webm', '.mov', '.m4v']);
const sha256 = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const sh = (bin, args) => execFileSync(bin, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 });
const kb = (n) => Math.round(n / 1024);

export function engines() {
  const out = { ffmpeg: null, ffprobe: null, sharp: false, chromium: true };
  const ff = process.env.DARKROOM_FFMPEG || 'ffmpeg';
  try {
    const v = sh(ff, ['-version']).split('\n')[0];
    const enc = sh(ff, ['-hide_banner', '-encoders']);
    const has = (n) => new RegExp(`\\s${n}\\s`).test(enc);
    out.ffmpeg = { bin: ff, version: v, encoders: { libwebp: has('libwebp'), 'libaom-av1': has('libaom-av1'), libsvtav1: has('libsvtav1'), libx264: has('libx264'), 'libvpx-vp9': has('libvpx-vp9'), mjpeg: has('mjpeg') } };
    try { sh(process.env.DARKROOM_FFPROBE || 'ffprobe', ['-version']); out.ffprobe = process.env.DARKROOM_FFPROBE || 'ffprobe'; } catch { /* no ffprobe */ }
  } catch { /* no ffmpeg */ }
  try { createRequire(path.join(process.cwd(), 'noop.js'))('sharp'); out.sharp = true; } catch { /* no sharp */ }
  return out;
}

// ---- Chromium helpers (served from the file's folder so same-origin fetch works) ----
async function withBrowserOnDir(dir, fn) {
  const served = await resolveTarget(dir);
  const browser = await launch();
  try {
    const page = await browser.newPage();
    await page.goto(served.url);
    return await fn(page, served);
  } finally { await browser.close(); await served.close(); }
}

async function probeInBrowser(files) {
  const dir = path.dirname(files[0]);
  return withBrowserOnDir(dir, async (page) => {
    const out = {};
    for (const f of files) {
      const name = encodeURIComponent(path.basename(f));
      const ext = path.extname(f).toLowerCase();
      out[f] = await page.evaluate(async ({ name, vid }) => {
        if (vid) {
          const v = document.createElement('video'); v.muted = true; v.preload = 'metadata'; v.src = '/' + name;
          await new Promise((r, j) => { v.onloadedmetadata = r; v.onerror = () => j(new Error('video not decodable by Chromium')); });
          return { width: v.videoWidth, height: v.videoHeight, duration: +v.duration.toFixed(3) };
        }
        const i = new Image(); i.src = '/' + name; await i.decode();
        return { width: i.naturalWidth, height: i.naturalHeight };
      }, { name, vid: VID.has(ext) }).catch((e) => ({ error: e.message }));
    }
    return out;
  });
}

function ffprobe(bin, file) {
  const j = JSON.parse(sh(bin, ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', file]));
  const v = j.streams.find((s) => s.codec_type === 'video');
  if (!v) return { error: 'no video stream' };
  const [n, d] = (v.avg_frame_rate || '0/1').split('/').map(Number);
  const rot = Number(v.side_data_list?.find((x) => x.rotation !== undefined)?.rotation ?? v.tags?.rotate ?? 0);
  return { width: v.width, height: v.height, codec: v.codec_name, pixFmt: v.pix_fmt, alpha: /(yuva|rgba|bgra|argb|abgr|gbra|^yad)/.test(v.pix_fmt ?? ''), fps: d ? +(n / d).toFixed(2) : null, duration: j.format.duration ? +Number(j.format.duration).toFixed(3) : null, rotation: rot || 0, colorTransfer: v.color_transfer ?? null, hasAudio: j.streams.some((s) => s.codec_type === 'audio') };
}

function listMedia(target) {
  const abs = path.resolve(target);
  if (fs.statSync(abs).isDirectory()) return fs.readdirSync(abs).map((f) => path.join(abs, f)).filter((f) => IMG.has(path.extname(f).toLowerCase()) || VID.has(path.extname(f).toLowerCase()));
  return [abs];
}

export async function inspect(target, opt) {
  const files = listMedia(target);
  if (!files.length) { if (!opt?.quiet) console.log('no images or videos found'); return []; }
  const eng = engines();
  const browserInfo = await probeInBrowser(files).catch((e) => ({ _error: e.message }));
  const rows = files.map((f) => {
    const ext = path.extname(f).toLowerCase();
    const row = { file: path.relative('.', f).split(path.sep).join('/'), kind: VID.has(ext) ? 'video' : 'image', bytes: fs.statSync(f).size, sha256: sha256(f).slice(0, 16) };
    let info = {};
    if (eng.ffprobe) { try { info = ffprobe(eng.ffprobe, f); } catch (e) { info = { probeError: String(e.message).slice(0, 120) }; } }
    const b = browserInfo[f] ?? {};
    Object.assign(row, { width: info.width ?? b.width, height: info.height ?? b.height }, info, b.error ? { browserDecodeError: b.error } : {});
    if (row.width && row.height) {
      row.aspect = +(row.width / row.height).toFixed(3);
      row.decodedMiBPerFrame = +(row.width * row.height * 4 / 1048576).toFixed(1);
    }
    if (row.kind === 'video' && row.rotation) row.warning = `rotation ${row.rotation}: dimensions may need swapping`;
    if (row.kind === 'video' && row.hasAudio) row.note = 'has audio: strip it for muted background video';
    if (row.width && row.width < 1600 && row.kind === 'image') row.note = (row.note ? row.note + '; ' : '') + 'under 1600 px wide: will soften as a full-bleed hero on large screens';
    return row;
  });
  if (!opt?.quiet) console.log(JSON.stringify({ engines: { ffmpeg: eng.ffmpeg ? { version: eng.ffmpeg.version, encoders: Object.entries(eng.ffmpeg.encoders).filter(([, v]) => v).map(([k]) => k) } : 'not found', ffprobe: !!eng.ffprobe, sharp: eng.sharp, chromium: true }, files: rows }, null, 2));
  return rows;
}

// ---- derive: responsive stills ----
export async function derive(source, opt) {
  const src = path.resolve(source);
  const outDir = path.resolve(opt.out ?? path.join(path.dirname(src), 'derived'));
  mkdirp(outDir);
  const widths = String(opt.widths ?? '640,1280,1920').split(',').map(Number);
  const formats = String(opt.formats ?? 'webp,jpg').split(',');
  const quality = Number(opt.quality ?? 78);
  const base = path.basename(src, path.extname(src));
  const eng = engines();
  const made = []; const skipped = [];
  const srcHash = sha256(src);
  let meta = (await probeInBrowser([src]))[src];
  if (meta.error) throw new Error(`cannot decode ${src}: ${meta.error}`);
  const todo = [];
  for (const w of widths) for (const f of formats) todo.push({ w: Math.min(w, meta.width), f });
  const seenKey = new Set();
  const chromiumJobs = [];
  for (const { w, f } of todo) {
    const key = `${w}.${f}`; if (seenKey.has(key)) continue; seenKey.add(key);
    const file = path.join(outDir, `${base}-${w}.${f === 'jpeg' ? 'jpg' : f}`);
    const enc = f === 'avif' ? (eng.ffmpeg?.encoders['libaom-av1'] ? ['-c:v', 'libaom-av1', '-still-picture', '1', '-crf', String(Math.round((100 - quality) * 0.63)), '-cpu-used', '6'] : eng.ffmpeg?.encoders.libsvtav1 ? ['-c:v', 'libsvtav1', '-crf', String(Math.round((100 - quality) * 0.63))] : null)
      : f === 'webp' ? (eng.ffmpeg?.encoders.libwebp ? ['-c:v', 'libwebp', '-quality', String(quality)] : null)
      : (f === 'jpg' || f === 'jpeg') ? (eng.ffmpeg?.encoders.mjpeg ? ['-c:v', 'mjpeg', '-q:v', String(Math.max(2, Math.round((100 - quality) / 4)))] : null)
      : f === 'png' ? ['-c:v', 'png'] : null;
    if (eng.sharp && ['webp', 'avif', 'jpg', 'jpeg', 'png'].includes(f)) {
      const sharp = createRequire(path.join(process.cwd(), 'noop.js'))('sharp');
      const p = sharp(src).resize({ width: w, withoutEnlargement: true });
      await (f === 'avif' ? p.avif({ quality }) : f === 'webp' ? p.webp({ quality }) : f === 'png' ? p.png() : p.jpeg({ quality, mozjpeg: true })).toFile(file);
      made.push({ file, w, f, engine: 'sharp' }); continue;
    }
    if (enc && eng.ffmpeg) {
      try { sh(eng.ffmpeg.bin, ['-y', '-v', 'error', '-i', src, '-vf', `scale=${w}:-2:flags=lanczos`, '-frames:v', '1', ...enc, file]); made.push({ file, w, f, engine: 'ffmpeg' }); continue; }
      catch (e) { skipped.push({ w, f, why: `ffmpeg failed: ${String(e.message).split('\n').filter(Boolean).pop()}` }); continue; }
    }
    if (['webp', 'jpg', 'jpeg', 'png'].includes(f)) chromiumJobs.push({ file, w, f });
    else skipped.push({ w, f, why: `${f} needs ffmpeg with an AV1 encoder or sharp; neither is available` });
  }
  if (chromiumJobs.length) {
    await withBrowserOnDir(path.dirname(src), async (page) => {
      for (const j of chromiumJobs) {
        const b64 = await page.evaluate(async ({ name, w, mime, q }) => {
          const i = new Image(); i.src = '/' + name; await i.decode();
          const h = Math.round(i.naturalHeight * w / i.naturalWidth);
          const c = document.createElement('canvas'); c.width = w; c.height = h;
          const ctx = c.getContext('2d'); ctx.imageSmoothingQuality = 'high'; ctx.drawImage(i, 0, 0, w, h);
          const blob = await new Promise((r) => c.toBlob(r, mime, q));
          const buf = new Uint8Array(await blob.arrayBuffer()); let s = '';
          for (let k = 0; k < buf.length; k += 0x8000) s += String.fromCharCode(...buf.subarray(k, k + 0x8000));
          return btoa(s);
        }, { name: encodeURIComponent(path.basename(src)), w: j.w, mime: j.f === 'png' ? 'image/png' : j.f === 'webp' ? 'image/webp' : 'image/jpeg', q: quality / 100 });
        fs.writeFileSync(j.file, Buffer.from(b64, 'base64'));
        made.push({ ...j, engine: 'chromium' });
      }
    });
  }
  const outputs = made.map((m) => ({ file: path.relative(outDir, m.file).split(path.sep).join('/'), width: m.w, format: m.f, engine: m.engine, bytes: fs.statSync(m.file).size, sha256: sha256(m.file) }));
  const manifest = { schema: 'darkroom-derive-v1', source: path.relative(outDir, src).split(path.sep).join('/'), sourceSha256: srcHash, sourceWidth: meta.width, sourceHeight: meta.height, quality, outputs, skipped };
  fs.writeFileSync(path.join(outDir, `${base}.derive.json`), JSON.stringify(manifest, null, 2));
  outputs.forEach((o) => console.log(`${o.file}  ${o.width}px  ${kb(o.bytes)} KB  (${o.engine})`));
  skipped.forEach((s) => console.log(`skipped ${s.w}.${s.f}: ${s.why}`));
  const webp = outputs.filter((o) => o.format === 'webp'); const avif = outputs.filter((o) => o.format === 'avif'); const jpg = outputs.filter((o) => o.format === 'jpg' || o.format === 'jpeg');
  const set = (a) => a.map((o) => `${o.file} ${o.width}w`).join(', ');
  const fallback = jpg.at(-1) ?? webp.at(-1);
  if (fallback) console.log(`\n<picture>${avif.length ? `\n  <source type="image/avif" srcset="${set(avif)}">` : ''}${webp.length ? `\n  <source type="image/webp" srcset="${set(webp)}">` : ''}\n  <img src="${fallback.file}" width="${meta.width}" height="${meta.height}" alt="" sizes="100vw">\n</picture>`);
  return manifest;
}

// ---- frames: video -> numbered sequence + manifest ----
export async function frames(source, opt) {
  const src = path.resolve(source);
  const outDir = path.resolve(opt.out ?? path.join(path.dirname(src), `${path.basename(src, path.extname(src))}-frames`));
  mkdirp(outDir);
  const fps = Number(opt.fps ?? 24); const width = Number(opt.width ?? 1600); const quality = Number(opt.quality ?? 76);
  const format = String(opt.format ?? 'webp'); const ext = format === 'jpeg' ? 'jpg' : format;
  const eng = engines();
  const want = opt.engine ?? 'auto';
  const useFfmpeg = want !== 'chromium' && eng.ffmpeg && (format === 'webp' ? eng.ffmpeg.encoders.libwebp : format === 'jpg' || format === 'jpeg' ? eng.ffmpeg.encoders.mjpeg : format === 'png');
  const start = opt.start ? Number(opt.start) : 0;
  let engine; let width_ = width; let height_; let duration;
  if (useFfmpeg) {
    engine = 'ffmpeg';
    const enc = format === 'webp' ? ['-c:v', 'libwebp', '-quality', String(quality)] : format === 'png' ? ['-c:v', 'png'] : ['-c:v', 'mjpeg', '-q:v', String(Math.max(2, Math.round((100 - quality) / 4)))];
    const range = [...(start ? ['-ss', String(start)] : []), ...(opt.end ? ['-to', String(opt.end)] : [])];
    sh(eng.ffmpeg.bin, ['-y', '-v', 'error', ...range, '-i', src, '-an', '-vf', `fps=${fps},scale='min(${width},iw)':-2:flags=lanczos${opt.sharpen ? `,unsharp=5:5:${Number(opt.sharpen)}:5:5:0` : ''}`, ...enc, path.join(outDir, `seq_%04d.${ext}`)]);
  } else {
    if (!['webp', 'jpg', 'jpeg', 'png'].includes(format)) throw new Error(`format ${format} is not available without ffmpeg`);
    engine = 'chromium';
    await withBrowserOnDir(path.dirname(src), async (page) => {
      const info = await page.evaluate(async ({ name }) => {
        const v = document.createElement('video'); v.muted = true; v.preload = 'auto'; v.src = '/' + name; v.id = 'v'; document.body.append(v);
        await new Promise((r, j) => { v.onloadedmetadata = r; v.onerror = () => j(new Error('Chromium cannot decode this video (try H.264 MP4 or WebM)')); });
        return { w: v.videoWidth, h: v.videoHeight, d: v.duration };
      }, { name: encodeURIComponent(path.basename(src)) });
      duration = info.d;
      const end = opt.end ? Math.min(Number(opt.end), info.d) : info.d;
      const w = Math.min(width, info.w); const h = Math.round(info.h * w / info.w) & ~1;
      const n = Math.max(1, Math.floor((end - start) * fps));
      for (let i = 0; i < n; i++) {
        const b64 = await page.evaluate(async ({ t, w, h, mime, q }) => {
          const v = document.getElementById('v');
          await new Promise((r) => { v.onseeked = r; v.currentTime = t; });
          const c = document.createElement('canvas'); c.width = w; c.height = h;
          c.getContext('2d').drawImage(v, 0, 0, w, h);
          const blob = await new Promise((r) => c.toBlob(r, mime, q));
          const buf = new Uint8Array(await blob.arrayBuffer()); let s = '';
          for (let k = 0; k < buf.length; k += 0x8000) s += String.fromCharCode(...buf.subarray(k, k + 0x8000));
          return btoa(s);
        }, { t: Math.min(end - 0.001, start + i / fps), w, h, mime: format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg', q: quality / 100 });
        fs.writeFileSync(path.join(outDir, `seq_${String(i + 1).padStart(4, '0')}.${ext}`), Buffer.from(b64, 'base64'));
      }
    });
  }
  const files = fs.readdirSync(outDir).filter((f) => /^seq_\d{4}\./.test(f)).sort();
  if (!files.length) throw new Error('no frames were produced');
  const dims = (await probeInBrowser([path.join(outDir, files[0])]))[path.join(outDir, files[0])];
  width_ = dims.width; height_ = dims.height;
  if (!duration) { try { duration = (await probeInBrowser([src]))[src].duration; } catch { /* unknown */ } }
  const list = files.map((f) => ({ file: f, bytes: fs.statSync(path.join(outDir, f)).size, sha256: sha256(path.join(outDir, f)) }));
  fs.copyFileSync(path.join(outDir, files[0]), path.join(outDir, `poster.${ext}`));
  const total = list.reduce((s, x) => s + x.bytes, 0);
  const decodedMiB = +(width_ * height_ * 4 / 1048576).toFixed(1);
  const manifest = {
    schema: 'darkroom-frames-v1', source: path.relative(outDir, src).split(path.sep).join('/'), sourceSha256: sha256(src), engine, fps, duration, start,
    count: list.length, width: width_, height: height_, format: ext, pattern: `seq_%04d.${ext}`, poster: `poster.${ext}`, totalBytes: total,
    decodedMiBPerFrame: decodedMiB, decodedMiBAllFrames: +(decodedMiB * list.length).toFixed(0), suggestedWindow: 'keep about +/-12 frames decoded around the target; cancel stale decodes; close ImageBitmaps',
    frames: list,
  };
  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`${list.length} frames (${engine}) ${width_}x${height_} ${ext}, ${(total / 1048576).toFixed(1)} MB on the wire, ${decodedMiB} MiB decoded per frame (${manifest.decodedMiBAllFrames} MiB if all were held) → ${path.join(outDir, 'manifest.json')}`);
  return manifest;
}

// ---- check: validate a sequence directory ----
export async function check(dir) {
  const d = path.resolve(dir);
  const mf = path.join(d, 'manifest.json');
  const problems = [];
  if (!fs.existsSync(mf)) { console.log('FAIL no manifest.json'); process.exitCode = 1; return; }
  const m = JSON.parse(fs.readFileSync(mf, 'utf8'));
  if (m.schema !== 'darkroom-frames-v1') problems.push(`unknown schema ${m.schema}`);
  m.frames.forEach((f, i) => {
    const p = path.join(d, f.file);
    if (!fs.existsSync(p)) { problems.push(`missing ${f.file}`); return; }
    if (sha256(p) !== f.sha256) problems.push(`checksum mismatch ${f.file}`);
    if (f.file !== `seq_${String(i + 1).padStart(4, '0')}.${m.format}`) problems.push(`gap or misorder at index ${i}: ${f.file}`);
  });
  if (m.count !== m.frames.length) problems.push(`count ${m.count} != ${m.frames.length} listed`);
  if (!fs.existsSync(path.join(d, m.poster))) problems.push('poster missing');
  const sample = [...new Set([0, Math.floor(m.frames.length / 2), m.frames.length - 1, ...m.frames.map((_, i) => i).filter((i) => i % 10 === 0)])].filter((i) => m.frames[i]).map((i) => path.join(d, m.frames[i].file)).filter(fs.existsSync);
  if (sample.length) {
    const dims = await probeInBrowser(sample);
    for (const [f, v] of Object.entries(dims)) {
      if (v.error) problems.push(`undecodable ${path.basename(f)}: ${v.error}`);
      else if (v.width !== m.width || v.height !== m.height) problems.push(`size ${v.width}x${v.height} at ${path.basename(f)}, manifest says ${m.width}x${m.height}`);
    }
  }
  const mb = +(m.totalBytes / 1048576).toFixed(1);
  console.log(`${problems.length ? 'FAIL' : 'OK'}  ${m.count} frames ${m.width}x${m.height} ${m.format}, ${mb} MB on the wire, ${m.decodedMiBPerFrame} MiB decoded per frame (${m.decodedMiBAllFrames} MiB if all held)`);
  if (m.decodedMiBAllFrames > 300) console.log(`warn  holding every frame decoded would need ~${m.decodedMiBAllFrames} MiB: use a sliding window or fewer/smaller frames`);
  if (m.count > 120) console.log('warn  more than 120 frames: check that a smaller count still scrubs smoothly');
  problems.forEach((p) => console.log(`  - ${p}`));
  if (problems.length) process.exitCode = 1;
}

export async function media(pos, opt) {
  const [sub, target] = pos;
  if (sub === 'doctor') { console.log(JSON.stringify(engines(), null, 2)); return; }
  if (!sub || !target) {
    console.log(`darkroom media <command>
  doctor                              which engines exist (ffmpeg + real encoders, sharp, chromium)
  inspect <file|dir>                  dimensions, duration, codec, alpha, rotation, decoded memory per frame, checksums
  derive <image> [--out dir] [--widths 640,1280,1920] [--formats webp,jpg,avif] [--quality 78]
  frames <video> [--out dir] [--fps 24] [--width 1600] [--format webp|jpg|png] [--quality 76] [--start s --end s] [--sharpen 0.6] [--engine ffmpeg|chromium]
  check <frames dir>                  validate manifest, files, order, checksums, sizes; warn on memory`);
    return;
  }
  if (sub === 'inspect') await inspect(target, opt);
  else if (sub === 'derive') await derive(target, opt);
  else if (sub === 'frames') await frames(target, opt);
  else if (sub === 'check') await check(target);
  else throw new Error(`unknown media command ${sub}`);
}
