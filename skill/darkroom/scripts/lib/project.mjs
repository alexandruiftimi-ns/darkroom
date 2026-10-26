// Project state: init, settings resolution, and a small `.darkroom/project.json` that survives session restarts.
// It records what is approved against which build revision, which evidence is stale, and what is still open.
import fs from 'node:fs';
import path from 'node:path';
import { mkdirp } from './browser.mjs';
import { revisionOf } from './serve.mjs';

const STAGES = ['intake', 'direction', 'slice', 'build', 'verify', 'review', 'done'];
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
    writeJson(PROJECT, { schema: 1, name: path.basename(process.cwd()), surface: 'landing', autonomy: 'ask-at-checkpoints', design_doc: designDoc, config, root: '.', stage: 'intake', approvals: [], open: [], createdAt: new Date().toISOString() });
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
      const [k, ...v] = kv.split('='); const val = v.join('=');
      if (k === 'stage' && !STAGES.includes(val)) { console.error(`stage must be one of ${STAGES.join(', ')}`); process.exit(1); }
      p[k.trim()] = val; changed = true;
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
  const next = !fs.existsSync('.darkroom/BRIEF.md') || p.stage === 'intake' ? 'finish intake: brief, surface, asset tier; then set stage=direction'
    : blocking.length ? `blocking item: ${blocking[0].type} ${blocking[0].id}. Work around it with a marked placeholder or ask the user`
    : !latest ? 'no captures yet: run darkroom capture <page>'
    : stale.includes(latest.run) ? 'latest capture is stale (the build changed): re-capture before claiming anything'
    : p.stage === 'direction' ? 'show the direction comps and record approval of "direction"'
    : p.stage === 'slice' ? 'auto-QA the slice, then show it and record approval of "slice"'
    : p.stage === 'build' ? 'finish remaining sections, then run audit and capture --both'
    : p.stage === 'verify' ? 'run audit + capture --both + media check; fix highs; then stage=review'
    : p.stage === 'review' ? 'present evidence and open gaps; wait for the final approval' : 'nothing pending';
  const out = { name: p.name, surface: p.surface, autonomy: p.autonomy, stage: p.stage, design_doc: p.design_doc, config: p.config, root, currentRevision: revision,
    lastApproval: lastApproval ?? null, approvalIsStale: !!approvalStale, captures: runs.length, latestCapture: latest, staleCaptures: stale, open: p.open, next };
  console.log(JSON.stringify(out, null, 2));
}
