// Asset intake: when the user drops files into assets/raw, match them to NEEDS.md, measure them, and suggest what could
// be better. Nothing is ever rejected: every file is usable, the user decides whether a suggestion is worth acting on.
// Updates the Status column of NEEDS.md (arrived / waiting) and writes .darkroom/intake.json.
import fs from 'node:fs';
import path from 'node:path';
import { inspect } from './media.mjs';
import { analyse, heroSuggestions } from './mediakit.mjs';
import { mkdirp } from './browser.mjs';

const cells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

function readNeeds(file) {
  if (!fs.existsSync(file)) return null;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const h = lines.findIndex((l) => /^\s*\|.*I need.*\|/i.test(l));
  if (h < 0) return { lines, header: -1, rows: [] };
  const head = cells(lines[h]);
  const rows = [];
  for (let i = h + 2; i < lines.length && /^\s*\|/.test(lines[i]); i++) rows.push({ line: i, cells: cells(lines[i]) });
  return { lines, header: h, head, rows };
}

const use = (text) => (/logo/i.test(text) ? 'logo' : /phone|mobile|portrait|9:16|vertical/i.test(text) ? 'portrait' : /hero|full|background|banner|cover|wide/i.test(text) ? 'wide' : 'any');

export function suggestions(f, purpose) {
  const better = []; const info = [];
  if (f.kind === 'image') {
    if (purpose === 'logo' && !/\.svg$/i.test(f.file)) better.push('a logo as SVG stays sharp at every size; this one works meanwhile');
    else if (purpose === 'wide' && f.width < 2400) better.push(`${f.width} px wide: usable; ≥ 2400 px would be sharper as a full-width picture`);
    else if (f.width < 1200) better.push(`${f.width} px wide: fine for small spots, soft if shown large`);
    if (purpose === 'portrait' && f.aspect > 1) better.push('this is landscape; for phones a tall version (about 9:16) frames better. I can crop this one meanwhile');
    if (purpose === 'wide' && f.aspect && f.aspect < 1) better.push('this is portrait; a wide version fills a desktop screen better. I can crop this one meanwhile');
  } else {
    if (f.height && Math.min(f.width, f.height) < 1080) better.push(`${f.width}×${f.height}: usable; 1080p or more looks sharper on large screens`);
    if (f.fps && f.fps < 24) better.push(`${f.fps} fps may look jerky when scrubbed by scroll; 24–30 fps is smoother`);
    if (f.duration > 20) info.push(`${Math.round(f.duration)} s long: for a scroll effect I'll use the best few seconds (tell me which part, or I'll choose)`);
    if (f.hasAudio) info.push('the sound will be removed for a silent background video; the original keeps it');
    if (f.rotation) info.push(`recorded rotated ${f.rotation}°: I'll straighten the copies`);
  }
  if (f.bytes > 8 * 1048576) info.push(`${Math.round(f.bytes / 1048576)} MB: I'll make compressed copies; the original stays untouched`);
  return { better, info };
}

// Hero media (videos and wide pictures): edge colour → --ground, loop seam, calm zone for the words (references/hero-media.md).
function withHero(f, s, purpose) {
  if (purpose === 'logo' || purpose === 'portrait' || !(f.kind === 'video' || purpose === 'wide')) return s;
  let a; try { a = analyse(f.file); } catch { return s; }
  const h = heroSuggestions(a);
  return { better: [...s.better, ...h.better], info: [...s.info, ...h.info], hero: a.measured ? a : undefined };
}

export async function intake(dir, opt) {
  const raw = dir ?? 'assets/raw';
  const needsFile = opt.needs && opt.needs !== true ? String(opt.needs) : 'NEEDS.md';
  if (!fs.existsSync(raw)) { console.log(`no ${raw} folder yet: nothing has arrived. Files go where NEEDS.md says.`); return null; }
  const files = (await inspect(raw, { quiet: true })) ?? [];
  const needs = readNeeds(needsFile);
  const col = (name) => needs?.head?.findIndex((h) => new RegExp(name, 'i').test(h)) ?? -1;
  const cWhat = col('^I need'); const cPut = col('Put it in'); let cStatus = col('^Status');
  const matched = new Set(); const report = [];
  for (const r of needs?.rows ?? []) {
    const put = (r.cells[cPut] ?? '').replace(/`/g, '').trim();
    const what = r.cells[cWhat] ?? '';
    if (!put || /^<.*>$/.test(put)) continue;
    const f = files.find((x) => x.file.endsWith(put.replace(/^\.?\//, '')) || path.basename(x.file) === path.basename(put));
    if (!f) { report.push({ need: what, putIn: put, status: 'waiting', row: r }); continue; }
    matched.add(f.file);
    report.push({ need: what, putIn: put, file: f.file, status: 'arrived', ...withHero(f, suggestions(f, use(`${what} ${put}`)), use(`${what} ${put}`)), size: f.width ? `${f.width}×${f.height}` : null, row: r });
  }
  const extras = files.filter((f) => !matched.has(f.file)).map((f) => ({ file: f.file, status: 'arrived, not requested', size: f.width ? `${f.width}×${f.height}` : null, ...withHero(f, suggestions(f, use(f.file)), use(f.file)) }));

  if (needs && needs.header >= 0 && report.length) {
    const L = needs.lines;
    if (cStatus < 0) {
      L[needs.header] = L[needs.header].replace(/\|\s*$/, '| Status |');
      L[needs.header + 1] = L[needs.header + 1].replace(/\|\s*$/, '|---|');
      for (const r of needs.rows) L[r.line] = L[r.line].replace(/\|\s*$/, '| waiting |');
      cStatus = needs.head.length;
    }
    for (const r of report) {
      const c = cells(L[r.row.line]);
      c[cStatus] = r.status === 'waiting' ? 'waiting' : r.better.length ? `✅ arrived · could be better: ${r.better[0]}` : '✅ arrived';
      L[r.row.line] = `| ${c.join(' | ')} |`;
    }
    fs.writeFileSync(needsFile, L.join('\n'));
  }
  mkdirp('.darkroom');
  const result = { checkedAt: new Date().toISOString(), folder: raw, needs: report.map(({ row, ...r }) => r), extras };
  fs.writeFileSync('.darkroom/intake.json', JSON.stringify(result, null, 2));

  const arrived = report.filter((r) => r.status === 'arrived');
  console.log(`${arrived.length} requested file(s) arrived, ${report.length - arrived.length} still waiting, ${extras.length} extra file(s).`);
  for (const r of [...arrived, ...extras]) {
    console.log(`  ✅ ${r.file}${r.size ? `  ${r.size}` : ''}${r.need ? `  (${r.need})` : '  (not in NEEDS.md: ask where it goes)'}`);
    for (const b of r.better) console.log(`     could be better: ${b}`);
    for (const i of r.info) console.log(`     note: ${i}`);
  }
  for (const r of report.filter((x) => x.status === 'waiting')) console.log(`  … waiting: ${r.need} → ${r.putIn}`);
  console.log('Nothing is rejected. Look at each picture yourself (text or logos baked in? subject cut off?), then ask:');
  console.log('  "Everything works. Continue with these, or replace any of them first?" (recommended: continue; replacing later is easy)');
  return result;
}
