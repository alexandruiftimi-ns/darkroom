#!/usr/bin/env node
// Audit regression suite. Run from a folder where Playwright resolves:  node <skill>/evals/run-evals.mjs [--only text]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const skill = path.resolve(process.env.DARKROOM_SKILL || path.join(here, '..', 'skill', 'darkroom'));
const cli = path.join(skill, 'scripts', 'darkroom.mjs');
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
const spec = JSON.parse(fs.readFileSync(path.join(here, 'cases.json'), 'utf8'));
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'darkroom-evals-'));
const env = { ...process.env, DARKROOM_RESOLVE_FROM: process.env.DARKROOM_RESOLVE_FROM || process.cwd() };

const run = (args, cwd) => new Promise((resolve) => {
  const p = spawn(process.execPath, [cli, ...args], { cwd, env });
  let out = ''; p.stdout.on('data', (d) => (out += d)); p.stderr.on('data', (d) => (out += d));
  p.on('close', (code) => resolve({ code, out }));
});
const get = (o, p) => p.split('.').reduce((a, k) => a?.[k], o);
const keys = (res) => res.findings.map((f) => `${f.sev}:${f.check}`);

function check(expect, res, code) {
  const fails = [];
  const k = keys(res);
  if (expect.exit !== undefined && code !== expect.exit) fails.push(`exit ${code}, wanted ${expect.exit}; highs: ${res.findings.filter((f) => f.sev === 'high').map((f) => `${f.check}: ${f.msg}`).join(' | ') || 'none'}`);
  for (const h of expect.has ?? []) if (!k.includes(h)) fails.push(`missing finding ${h}`);
  for (const n of expect.not ?? []) if (k.includes(n)) fails.push(`unexpected finding ${n}: ${res.findings.find((f) => `${f.sev}:${f.check}` === n).msg}`);
  for (const [key, text] of Object.entries(expect.msg ?? {})) if (!res.findings.some((f) => `${f.sev}:${f.check}` === key && f.msg.includes(text))) fails.push(`no ${key} finding mentioning "${text}"`);
  for (const [key, text] of Object.entries(expect.msgAbsent ?? {})) if (res.findings.some((f) => `${f.sev}:${f.check}` === key && f.msg.includes(text))) fails.push(`${key} finding mentions "${text}"`);
  for (const j of expect.json ?? []) {
    const v = get(res, j.path);
    if (j.equals !== undefined && v !== j.equals) fails.push(`${j.path} = ${JSON.stringify(v)}, wanted ${JSON.stringify(j.equals)}`);
    if (j.excludes !== undefined && (v ?? []).includes(j.excludes)) fails.push(`${j.path} includes ${j.excludes}`);
    if (j.max !== undefined && !(v <= j.max)) fails.push(`${j.path} = ${v}, wanted <= ${j.max}`);
  }
  return fails;
}

async function fileCase(c, i) {
  const dir = path.join(work, `c${i}`); fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(path.join(here, 'fixtures', c.fixture), path.join(dir, c.fixture));
  const args = (c.args ?? []).map((a) => (a.endsWith('.json') ? (fs.copyFileSync(path.join(here, 'fixtures', a), path.join(dir, a)), path.join(dir, a)) : a));
  const out = path.join(dir, 'audit.json');
  const r = await run(['audit', path.join(dir, c.fixture), '--json', out, ...args], dir);
  if (!fs.existsSync(out)) return { name: c.name, fails: [`no audit output: ${r.out.slice(0, 300)}`] };
  return { name: c.name, fails: check(c.expect, JSON.parse(fs.readFileSync(out, 'utf8')), r.code) };
}

async function projectCases() {
  const results = [];
  let dir = path.join(work, 'adopt'); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'PROJECT_BLUEPRINT.md'), '# Blueprint\n\n```darkroom\n{"fontBudget":1,"maxZones":6}\n```\n');
  fs.copyFileSync(path.join(here, 'fixtures', 'two-hero-fonts.html'), path.join(dir, 'page.html'));
  await run(['init'], dir);
  let r = await run(['audit', 'page.html', '--json', 'a.json'], dir);
  let res = fs.existsSync(path.join(dir, 'a.json')) ? JSON.parse(fs.readFileSync(path.join(dir, 'a.json'), 'utf8')) : null;
  results.push({ name: 'adopted blueprint: init then audit uses the blueprint darkroom block (fontBudget 1)', fails: res ? [
    ...(res.config.source === 'PROJECT_BLUEPRINT.md' ? [] : [`config source ${res.config.source}`]),
    ...(res.findings.some((f) => f.check === 'fonts' && f.msg.includes('budget 1')) ? [] : ['font budget 1 not applied']),
    ...(fs.existsSync(path.join(dir, 'DESIGN_BIBLE.md')) ? ['DESIGN_BIBLE.md was created next to an adopted blueprint'] : []),
  ] : [`no output: ${r.out.slice(0, 200)}`] });
  dir = path.join(work, 'adopt2'); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'DESIGN.md'), '# Design\nNo settings block here.\n');
  fs.copyFileSync(path.join(here, 'fixtures', 'clean-landing.html'), path.join(dir, 'page.html'));
  await run(['init'], dir);
  r = await run(['audit', 'page.html', '--json', 'a.json'], dir);
  res = fs.existsSync(path.join(dir, 'a.json')) ? JSON.parse(fs.readFileSync(path.join(dir, 'a.json'), 'utf8')) : null;
  results.push({ name: 'blueprint without a darkroom block: init writes .darkroom/settings.json and audit reports it as the source', fails: res ? [
    ...(res.config.source === '.darkroom/settings.json' ? [] : [`config source ${res.config.source}`]),
    ...(fs.readFileSync(path.join(dir, 'DESIGN.md'), 'utf8').includes('darkroom') ? ['init modified the adopted document'] : []),
  ] : [`no output: ${r.out.slice(0, 200)}`] });
  return results;
}

function docChecks() {
  const results = [];
  const audit = fs.readFileSync(path.join(skill, 'commands', 'audit.md'), 'utf8');
  return import(pathToFileURL(path.join(skill, 'scripts', 'lib', 'audit.mjs')).href).then(async ({ CHECKS }) => {
    const { VIEWPORTS } = await import(pathToFileURL(path.join(skill, 'scripts', 'lib', 'browser.mjs')).href);
    results.push({ name: 'every check id in the registry is described in commands/audit.md', fails: CHECKS.filter((c) => !audit.includes('`' + c.id + '`')).map((c) => `audit.md lacks \`${c.id}\``) });
    const named = new Set();
    for (const f of fs.readdirSync(path.join(skill, 'commands'))) for (const m of fs.readFileSync(path.join(skill, 'commands', f), 'utf8').matchAll(/\b(?:desktop|mobile|tablet)-\d{3,4}\b/g)) named.add(m[0]);
    results.push({ name: 'every viewport named in commands/*.md exists in the script', fails: [...named].filter((v) => !VIEWPORTS[v]).map((v) => `unknown viewport ${v}`) });
    const eff = fs.readFileSync(path.join(skill, 'references', 'effects.md'), 'utf8');
    const routes = eff.split(/^### /m).slice(1);
    results.push({ name: 'every route in references/effects.md states what the user provides, pros, cons, effort and when to choose it', fails: routes.flatMap((r) => ['You provide:', 'Pros:', 'Cons:', 'Effort for you:', 'Choose when:'].filter((k) => !r.includes(k)).map((k) => `route "${r.split(String.fromCharCode(10))[0]}" lacks ${k}`)) });
    const skillMd = fs.readFileSync(path.join(skill, 'SKILL.md'), 'utf8');
    const links = ['commands/concierge.md', 'references/effects.md', 'templates/NEEDS.md'];
    results.push({ name: 'the plain-language front door exists and SKILL.md points to it', fails: links.filter((l) => !fs.existsSync(path.join(skill, l)) || !skillMd.includes(l)).map((l) => `missing or unlinked: ${l}`) });
    const needsMention = /3D model|GLB/.test(eff) && /frames/.test(eff) && /Drawn in code/.test(eff);
    results.push({ name: 'effects.md covers the frames, 3D model and drawn-in-code routes', fails: needsMention ? [] : ['one of frames / 3D model / drawn-in-code is missing'] });
    return results;
  });
}

async function recipeChecks() {
  const out = [];
  const demos = [['demo-scrub-frames.html', '#story'], ['demo-scrub-video.html', '#story'], ['demo-portal.html', '#portal']];
  for (const [file, scene] of demos) {
    const dir = path.join(work, 'r-' + file.replace(/W/g, ''));
    const r = await run(['capture', path.join(skill, 'recipes', file), '--scene', scene, '--steps', '4', '--viewports', 'desktop-1440', '--both', '--no-sheet', '--out', dir], work);
    const mf = path.join(dir, 'manifest.json');
    if (!fs.existsSync(mf)) { out.push({ name: `recipe ${file} scrubs with scroll`, fails: [`capture failed: ${r.out.slice(0, 200)}`] }); continue; }
    const m = JSON.parse(fs.readFileSync(mf, 'utf8'));
    const hash = (f) => crypto.createHash('sha1').update(fs.readFileSync(f.startsWith('.') || path.isAbsolute(f) ? f : path.resolve(f))).digest('hex');
    const by = (mode) => m.files.filter((x) => x.motion === mode).map((x) => hash(path.isAbsolute(x.file) ? x.file : path.join(dir, path.basename(x.file))));
    const motion = by('no-preference'); const reduced = by('reduce');
    const fails = [];
    if (new Set(motion).size !== motion.length) fails.push('default-motion captures are not all different across scene progress');
    if (new Set(reduced).size !== 1 && !file.includes('portal')) fails.push('reduced-motion captures differ across scene progress (should be one calm composition)');
    if (m.errors.length) fails.push(`console errors: ${m.errors[0]}`);
    out.push({ name: `recipe ${file} scrubs with scroll and holds still under reduced motion`, fails });
  }
  return out;
}

const cases = spec.cases.filter((c) => !only || c.name.includes(only) || c.fixture.includes(only));
const results = [];
let next = 0;
await Promise.all(Array.from({ length: 3 }, async () => { while (next < cases.length) { const i = next++; results[i] = await fileCase(cases[i], i); } }));
if (!only) { results.push(...await projectCases()); results.push(...await docChecks()); results.push(...await recipeChecks()); }
let bad = 0;
for (const r of results) { const ok = !r.fails.length; if (!ok) bad++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.name}${ok ? '' : '\n      - ' + r.fails.join('\n      - ')}`); }
console.log(`\n${results.length - bad}/${results.length} passed`);
fs.rmSync(work, { recursive: true, force: true });
process.exit(bad ? 1 : 0);
