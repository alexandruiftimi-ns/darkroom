// Project state: init, settings resolution, and a small `.darkroom/project.json` that survives session restarts.
// It records what is approved against which build revision, which evidence is stale, and what is still open.
import fs from 'node:fs';
import path from 'node:path';
import { mkdirp } from './browser.mjs';
import { revisionOf } from './serve.mjs';
import { PLATFORMS } from './platforms.mjs';

const STAGES = ['intake', 'direction', 'slice', 'build', 'verify', 'review', 'done'];
const MODES = ['calm', 'animated', 'hero-effect', 'story']; // motion level, references/modes.md
const LOOK = /^(pack|like):[\w.-]+$/; // pack:luxury or like:apple
const PLATFORM_IDS = Object.keys(PLATFORMS); // platforms/<id>.md
const VERIFY = ['quick', 'full']; // how much checking the user pays for (commands/platform.md)
const SCOPE = /^(home|all|page:\S+)$/; // how much to build before the user approves the look (commands/concierge.md)
const PALETTE = ['own', 'suggested', '60-30-10', 'creative', 'monochrome']; // references/color.md, "Asking about colour"
const PROTECTED =new Set(['approvals', 'open', 'schema', 'createdAt']); // changed only through --approve / --open / --close
const DEFAULT_SETTINGS = { fontBudget: 3, colorMode: 'disciplined', surface: 'landing', markets: ['EU'], disclosure: '', currency: 'EUR', wordBudgets: { hero: 30, feature: 45, proof: 60, closing: 30 }, maxZones: 3 };
const PROJECT = '.darkroom/project.json';

const readJson = (f, d = null) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const writeJson = (f, o) => { mkdirp(path.dirname(f)); fs.writeFileSync(f, JSON.stringify(o, null, 2) + '\n'); };

// Settings come from a ```darkroom JSON block (or a plain .json file). Order: --bible, project.json "config",
// .darkroom/settings.json, DESIGN_BIBLE.md, PROJECT_BLUEPRINT.md, DESIGN.md. Returns { settings, source, problem }.
export function resolveSettings(file) {
  const candidates = [];
  if (file && file !== true) candidates.push(String(file));
  const cfg = readJson(PROJECT)?.config;
  if (cfg) candidates.push(String(cfg).split('#')[0]);
  candidates.push('.darkroom/settings.json', 'DESIGN_BIBLE.md', 'PROJECT_BLUEPRINT.md', 'DESIGN.md');
  const seen = [];
  for (const f of candidates) {
    if (!f || seen.includes(f) || !fs.existsSync(f)) continue;
    seen.push(f);
    const text = fs.readFileSync(f, 'utf8');
    const raw = f.endsWith('.json') ? text : text.match(/```darkroom\s*([\s\S]*?)```/)?.[1];
    if (raw === undefined) continue;
    try { return { settings: JSON.parse(raw), source: f, problem: null }; }
    catch { return { settings: {}, source: f, problem: `the settings in ${f} are not valid JSON` }; }
  }
  return { settings: {}, source: null, problem: seen.length ? `no \`\`\`darkroom block in ${seen.join(', ')}; using defaults` : 'no design document found; using defaults' };
}

export function init(skillDir) {
  const t = path.join(skillDir, 'templates');
  mkdirp('.darkroom/refs'); mkdirp('.darkroom/prompts'); mkdirp('.darkroom/qa');
  const adopted = ['PROJECT_BLUEPRINT.md', 'DESIGN.md'].find((f) => fs.existsSync(f));
  const copies = [['BRIEF.md', '.darkroom/BRIEF.md'], ['STORYBOARD.json', '.darkroom/STORYBOARD.json'], ['ASSETS.json', '.darkroom/ASSETS.json'], ['APPROVALS.md', '.darkroom/APPROVALS.md'], ['DESIGN_BIBLE.md', 'DESIGN_BIBLE.md'], ['NEEDS.md', 'NEEDS.md']];
  for (const [src, dst] of copies) {
    if (fs.existsSync(dst)) { console.log(`keep   ${dst}`); continue; }
    if (dst === 'DESIGN_BIBLE.md' && adopted) { console.log(`adopt  ${adopted} as the design document (no DESIGN_BIBLE.md created)`); continue; }
    fs.copyFileSync(path.join(t, src), dst);
    console.log(`create ${dst}`);
  }
  if (!fs.existsSync(PROJECT)) {
    const designDoc = fs.existsSync('DESIGN_BIBLE.md') ? 'DESIGN_BIBLE.md' : adopted ?? 'DESIGN_BIBLE.md';
    let config = designDoc;
    if (adopted && !/```darkroom/.test(fs.readFileSync(adopted, 'utf8'))) {
      writeJson('.darkroom/settings.json', DEFAULT_SETTINGS);
      config = '.darkroom/settings.json';
      console.log(`create .darkroom/settings.json (audit settings; ${adopted} has no darkroom block and is left untouched)`);
    }
    writeJson(PROJECT, { schema: 1, name: path.basename(process.cwd()), surface: 'landing', autonomy: 'ask-at-checkpoints', design_doc: designDoc, config, root: '.', stage: 'intake', look: null, mode: null, platform: null, verify: null, palette: null, approvals: [], open: [], createdAt: new Date().toISOString() });
    console.log(`create ${PROJECT}`);
  } else console.log(`keep   ${PROJECT}`);
}

function qaRuns() {
  const dir = '.darkroom/qa';
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => {
    const m = readJson(path.join(dir, e.name, 'manifest.json'));
    return m ? { run: `${dir}/${e.name}`, revision: m.revision, createdAt: m.createdAt, errors: (m.errors ?? []).length } : null;
  }).filter(Boolean).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function state(opt) {
  let p = readJson(PROJECT);
  if (!p) { console.log('no .darkroom/project.json. Run: darkroom init'); process.exitCode = 1; return; }
  const root = opt.root ? String(opt.root) : p.root ?? '.';
  const revision = fs.existsSync(root) ? revisionOf(path.resolve(root)) : null;
  let changed = false;
  if (opt.root) { p.root = String(opt.root); changed = true; }
  if (opt.set) {
    for (const kv of String(opt.set).split(',')) {
      const [raw, ...v] = kv.split('='); const k = raw.trim(); const val = v.join('=').trim();
      if (PROTECTED.has(k)) { console.error(`${k} cannot be set directly; use --approve, --open or --close`); process.exit(1); }
      if (k === 'stage' && !STAGES.includes(val)) { console.error(`stage must be one of ${STAGES.join(', ')}`); process.exit(1); }
      if (k === 'mode' && !MODES.includes(val)) { console.error(`mode must be one of ${MODES.join(', ')} (references/modes.md)`); process.exit(1); }
      if (k === 'look' && !LOOK.test(val)) { console.error('look must be pack:<style pack> or like:<brand>, e.g. pack:luxury, like:apple'); process.exit(1); }
      if (k === 'platform' && !PLATFORM_IDS.includes(val)) { console.error(`platform must be one of ${PLATFORM_IDS.join(', ')} (darkroom platform list)`); process.exit(1); }
      if (k === 'verify' && !VERIFY.includes(val)) { console.error(`verify must be quick or full`); process.exit(1); }
      if (k === 'scope' && !SCOPE.test(val)) { console.error('scope must be home, page:/<path> (e.g. page:/pricing) or all'); process.exit(1); }
      if (k === 'palette' && !PALETTE.includes(val)) { console.error(`palette must be one of ${PALETTE.join(', ')}`); process.exit(1); }
      // page:pricing → page:/pricing; Git Bash may turn "/pricing" into "C:/Program Files/Git/pricing": undo it
      p[k] = k === 'scope' && val.startsWith('page:') ? 'page:/' + val.slice(5).replace(/^[A-Za-z]:[\\/].*?[\\/]Git(?=[\\/]|$)/i, '').replace(/\\/g, '/').replace(/^\/+/, '') : val; changed = true;
    }
  }
  const runs = qaRuns();
  const latest = runs.at(-1) ?? null;
  if (opt.approve) {
    p.approvals.push({ id: String(opt.approve), date: new Date().toISOString().slice(0, 10), revision, evidence: latest?.run ?? null, note: opt.note && opt.note !== true ? String(opt.note) : '' });
    changed = true;
  }
  if (opt.open) { const [type, id, blocking] = String(opt.open).split(':'); p.open.push({ type, id, blocking: blocking === 'blocking' }); changed = true; }
  if (opt.close) { p.open = p.open.filter((o) => o.id !== String(opt.close)); changed = true; }
  if (changed) writeJson(PROJECT, { ...p });
  const stale = runs.filter((r) => revision && r.revision && r.revision !== revision).map((r) => r.run);
  const blocking = p.open.filter((o) => o.blocking);
  const lastApproval = p.approvals.at(-1);
  const approvalStale = lastApproval?.revision && revision && lastApproval.revision !== revision;
  const missing = [!(p.mode && p.look) && 'look + motion level (--set mode=…,look=…)', !p.platform && 'platform (--set platform=…)', !p.palette && 'colour choice (--set palette=…)', !p.verify && 'check depth (--set verify=quick|full)', !p.scope && 'build scope (--set scope=home|page:/<path>|all)'].filter(Boolean);
  const next = !fs.existsSync('.darkroom/BRIEF.md') || p.stage === 'intake' ? `finish intake: brief, surface, asset tier${missing.length ? ', ' + missing.join(', ') : ''}; then set stage=direction`
    : blocking.length ? `blocking item: ${blocking[0].type} ${blocking[0].id}. Work around it with a marked placeholder or ask the user`
    : !latest ? 'no captures yet: run darkroom capture <page>'
    : stale.includes(latest.run) ? 'latest capture is stale (the build changed): re-capture before claiming anything'
    : p.stage === 'direction' ? 'show the direction comps and record approval of "direction"'
    : p.stage === 'slice' ? 'auto-QA the slice, then show it and record approval of "slice"'
    : p.stage === 'build' ? (p.scope && p.scope !== 'all' ? `finish the ${p.scope === 'home' ? 'home page' : p.scope.slice(5)} only, then show it and ask whether to build the other pages (scope=all)` : 'build every page in the page list (bible; .darkroom/import/url-map.json when imported), then run audit and capture --both')
    : p.stage === 'verify' ? 'run audit + capture --both + media check; fix highs; then stage=review'
    : p.stage === 'review' ? (p.scope && p.scope !== 'all' ? `present the ${p.scope === 'home' ? 'home page' : p.scope.slice(5)}; ask whether to build the other pages in this look (--set scope=all,stage=build)` : 'present evidence, the list of pages built and any not built, and open gaps; wait for the final approval') : 'nothing pending';
  const out = { name: p.name, surface: p.surface, autonomy: p.autonomy, stage: p.stage, look: p.look ?? null, mode: p.mode ?? null, platform: p.platform ?? null, verify: p.verify ?? null, scope: p.scope ?? null, palette: p.palette ?? null, design_doc: p.design_doc, config: p.config, root, currentRevision: revision,
    lastApproval: lastApproval ?? null, approvalIsStale: !!approvalStale, captures: runs.length, latestCapture: latest, staleCaptures: stale, open: p.open, next };
  console.log(JSON.stringify(out, null, 2));
}
