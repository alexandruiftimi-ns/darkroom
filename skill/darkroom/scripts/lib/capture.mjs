// Capture: named states, real wheel input, scene progress, motion vs reduced motion, contact sheets, and a manifest that
// says exactly how each image was made (so nobody mistakes a fallback shot for the real experience).
import fs from 'node:fs';
import path from 'node:path';
import { VIEWPORTS, contextFor, launch, settle, mkdirp, toolVersions } from './browser.mjs';
import { dismissConsent } from './consent.mjs';
import { resolveTarget, revisionOf } from './serve.mjs';

const stamp = () => new Date().toISOString().replace(/[-:]/g, '').replace(/\..*/, '').replace('T', '-');
const pad = (n, w = 3) => String(n).padStart(w, '0');

// Wheel the page to a target scroll offset the way a visitor does, so Lenis / ScrollTrigger scrubs and smooth-scroll
// CSS run their real code paths. Falls back to an instant jump if the wheel did not get there.
async function scrollTo(page, y, vp) {
  const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const target = Math.max(0, Math.min(Math.round(y), max));
  await page.mouse.move(vp.width / 2, vp.height / 2);
  let cur = await page.evaluate(() => scrollY);
  let guard = 0;
  while (Math.abs(target - cur) > 2 && guard++ < 400) {
    const step = Math.sign(target - cur) * Math.min(300, Math.abs(target - cur));
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(24);
    const next = await page.evaluate(() => scrollY);
    if (Math.abs(next - cur) < 1 && guard > 3) break; // wheel is not moving the page
    cur = next;
  }
  let last = -1; let still = 0;
  for (let i = 0; i < 40 && still < 3; i++) { // let smooth scroll / scrub tweens come to rest
    const now = await page.evaluate(() => scrollY);
    still = Math.abs(now - last) < 0.5 ? still + 1 : 0; last = now;
    await page.waitForTimeout(50);
  }
  if (Math.abs(last - target) > 4) { await page.evaluate((t) => scrollTo({ top: t, behavior: 'instant' }), target); await page.waitForTimeout(150); }
  return { scrollY: await page.evaluate(() => scrollY), max };
}

async function runActions(page, actions = []) {
  for (const a of actions) {
    if (a.click) await page.locator(a.click).first().click({ timeout: 4000 });
    else if (a.hover) await page.locator(a.hover).first().hover({ timeout: 4000 });
    else if (a.focus) await page.locator(a.focus).first().focus({ timeout: 4000 });
    else if (a.press) await page.keyboard.press(a.press);
    else if (a.wait) await page.waitForTimeout(a.wait);
  }
}

// states: explicit file, or --scene + --steps, or --film, or --scroll fractions.
function planStates(opt) {
  if (opt.states) {
    const raw = JSON.parse(fs.readFileSync(String(opt.states), 'utf8'));
    return (raw.states ?? raw).map((s, i) => ({ id: s.id ?? `s${pad(i, 2)}`, ...s }));
  }
  if (opt.scene) {
    const n = Math.max(2, Number(opt.steps ?? 10));
    return Array.from({ length: n + 1 }, (_, i) => ({ id: `scene-${pad(Math.round((i / n) * 100))}`, scene: { selector: String(opt.scene), p: i / n } }));
  }
  if (opt.film) return { film: true };
  const pts = String(opt.scroll ?? '0,0.25,0.5,0.75,1').split(',').map(Number);
  return pts.map((p) => ({ id: `p${pad(Math.round(p * 100))}`, scroll: p }));
}

async function stateOffset(page, s, vp) {
  const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  if (s.scene) {
    const g = await page.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height }; }, s.scene.selector);
    if (!g) throw new Error(`scene not found: ${s.scene.selector}`);
    return g.top + s.scene.p * Math.max(0, g.h - vp.height);
  }
  if (s.selector) return await page.evaluate(({ sel, off }) => { const e = document.querySelector(sel); return e ? e.getBoundingClientRect().top + scrollY - off : 0; }, { sel: s.selector, off: s.offset ?? 0 });
  if (typeof s.scroll === 'number') return s.scroll * max;
  if (typeof s.y === 'number') return s.y;
  return null; // stay where the actions leave us
}

async function contactSheet(page, tiles, file, cols, tileW) {
  const cells = tiles.map((t) => `<figure><img src="data:image/jpeg;base64,${t.b64}" style="width:${tileW}px"><figcaption>${t.label}</figcaption></figure>`).join('');
  await page.setViewportSize({ width: cols * (tileW + 12) + 12, height: 100 });
  await page.setContent(`<style>body{margin:0;padding:12px;background:#1a1a1f;display:grid;grid-template-columns:repeat(${cols},${tileW}px);gap:12px}figure{margin:0}img{display:block;border:1px solid #444}figcaption{font:11px system-ui;color:#ddd;padding:3px 0}</style>${cells}`);
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));
  await page.screenshot({ path: file, fullPage: true, type: 'png' });
}

// opt: out, label, viewports, scroll, scene, steps, film, states, motion|reduce|both, dismiss, wait, dpr, crop
export async function capture(target, opt, { defaultModes = ['no-preference', 'reduce'], quiet = false } = {}) {
  const served = await resolveTarget(target);
  const revision = revisionOf(served.root);
  const runDir = opt.out ?? path.join('.darkroom', 'qa', `${stamp()}${opt.label ? '-' + String(opt.label).replace(/[^\w.-]/g, '_') : ''}`);
  mkdirp(runDir);
  const vps = (opt.viewports ? String(opt.viewports).split(',') : ['desktop-1440', 'mobile-390']);
  const modes = opt.both ? ['no-preference', 'reduce'] : opt.motion ? ['no-preference'] : opt.reduce ? ['reduce'] : defaultModes;
  const plan = planStates(opt);
  const browser = await launch();
  const files = []; const errors = []; let consent = { action: 'none' };
  const sheets = [];
  try {
    for (const vpName of vps) {
      const vp = VIEWPORTS[vpName];
      if (!vp) { console.warn(`unknown viewport ${vpName}`); continue; }
      for (const motion of modes) {
        const ctx = await browser.newContext({ ...contextFor(vp), reducedMotion: motion, deviceScaleFactor: Number(opt.dpr ?? 1) });
        const page = await ctx.newPage();
        page.on('console', (m) => m.type() === 'error' && errors.push(`[${vpName}/${motion}] ${m.text()}`));
        page.on('pageerror', (e) => errors.push(`[${vpName}/${motion}] ${e.message}`));
        await page.goto(served.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await settle(page);
        if (opt.dismiss) consent = await dismissConsent(page, { allowAccept: !!opt['accept-consent'] });
        let states = plan;
        if (plan.film) {
          const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
          const stepPx = vp.height / 3; const n = Math.min(60, Math.ceil(total / stepPx));
          states = Array.from({ length: n + 1 }, (_, i) => ({ id: `film-${pad(i)}`, y: Math.min(total, i * stepPx) }));
        }
        const scrollable = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
        if (scrollable < 8) states = states.filter((s, i) => i === 0 || !(typeof s.scroll === 'number' || typeof s.y === 'number' || s.scene)); // nothing to scroll: one state, not five identical shots
        const tiles = [];
        for (const s of states) {
          const y = await stateOffset(page, s, vp);
          let pos = { scrollY: await page.evaluate(() => scrollY), max: 0 };
          if (y !== null) pos = await scrollTo(page, y, vp);
          await runActions(page, s.actions);
          await page.waitForTimeout(Number(opt.wait ?? (motion === 'no-preference' ? 500 : 150)));
          const base = `${vpName}__${motion === 'reduce' ? 'reduced' : 'motion'}__${s.id}`;
          const file = path.join(runDir, `${base}.png`);
          if (s.crop || opt.crop) await page.locator(String(s.crop ?? opt.crop)).first().screenshot({ path: file });
          else await page.screenshot({ path: file });
          files.push({ file: path.relative('.', file).split(path.sep).join('/'), viewport: vpName, motion, state: s.id, scrollY: Math.round(pos.scrollY), maxScroll: Math.round(pos.max), progress: pos.max ? +(pos.scrollY / pos.max).toFixed(3) : 0 });
          if (!opt['no-sheet']) tiles.push({ b64: (await page.screenshot({ type: 'jpeg', quality: 60 })).toString('base64'), label: `${s.id} · y${Math.round(pos.scrollY)}` });
        }
        await ctx.close();
        if (tiles.length > 1) {
          const sctx = await browser.newContext({ viewport: { width: 1200, height: 600 } });
          const sp = await sctx.newPage();
          const cols = vp.width < 600 ? 8 : 5; const tileW = vp.width < 600 ? 150 : 232;
          const sheet = path.join(runDir, `sheet__${vpName}__${motion === 'reduce' ? 'reduced' : 'motion'}.png`);
          await contactSheet(sp, tiles, sheet, Math.min(cols, tiles.length), tileW);
          sheets.push(sheet.split(path.sep).join('/'));
          await sctx.close();
        }
      }
    }
  } finally { await browser.close(); await served.close(); }
  const manifest = {
    schema: 'darkroom-capture-v1', url: served.url, source: target, createdAt: new Date().toISOString(), revision,
    modes: modes.map((m) => (m === 'reduce' ? 'reduced-motion' : 'default-motion')), viewports: vps, tools: toolVersions(null),
    consent, wheelInput: true, waitMs: opt.wait ?? 'motion 500 / reduced 150', files, sheets, errors: errors.slice(0, 30),
    note: 'Reduced-motion captures show the fallback, not the intended experience. Judge motion from the default-motion captures.',
  };
  fs.writeFileSync(path.join(runDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  mkdirp(path.join('.darkroom', 'qa'));
  fs.writeFileSync(path.join('.darkroom', 'qa', 'latest.json'), JSON.stringify({ run: runDir.split(path.sep).join('/'), revision, createdAt: manifest.createdAt }, null, 2));
  if (!quiet) { files.forEach((f) => console.log(f.file)); sheets.forEach((s) => console.log(s)); console.log(`manifest: ${path.join(runDir, 'manifest.json')}${errors.length ? ` · ${errors.length} console errors` : ''}`); }
  return manifest;
}

// Stacks reference over screenshot for composition review (no image library needed).
export async function compare(ref, shot, opt) {
  const out = opt.out ?? path.join(path.dirname(shot), `compare-${path.basename(shot)}`);
  const browser = await launch();
  const page = await browser.newPage();
  const toData = (f) => `data:image/${path.extname(f).slice(1).replace('jpg', 'jpeg')};base64,${fs.readFileSync(f).toString('base64')}`;
  const dims = await page.evaluate(async (src) => { const i = new Image(); i.src = src; await i.decode(); return { w: i.naturalWidth, h: i.naturalHeight }; }, toData(shot));
  await page.setViewportSize({ width: dims.w, height: 600 });
  await page.setContent(`<style>body{margin:0;background:#ff3366}img{display:block;width:${dims.w}px}p{margin:0;padding:4px 8px;font:12px system-ui;color:#fff;background:#111}</style>
    <p>REFERENCE — ${path.basename(ref)}</p><img src="${toData(ref)}"><p>BUILD — ${path.basename(shot)}</p><img src="${toData(shot)}">`);
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));
  await page.screenshot({ path: out, fullPage: true });
  await browser.close();
  console.log(out);
}
