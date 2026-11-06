// darkroom deal: three different starting points for a design, so a build can't fall back on the model's favourite.
// A script deals and Claude chooses: the same prompt may get different options on another run, on purpose.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readBuilds } from './hardrules.mjs';

const FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'library', 'devices.json');
export const loadDevices = () => JSON.parse(fs.readFileSync(FILE, 'utf8'));

const hash = (s) => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const rng = (seed) => () => { seed = (seed + 0x6d2b79f5) | 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const list = (v) => (v && v !== true ? String(v).split(',').map((x) => x.trim().toLowerCase()).filter(Boolean) : []);

export function deal({ meanings = [], job = '', assets = [], ground = '', glass = false, recent = [], seed }) {
  const data = loadDevices();
  const bad = meanings.filter((m) => !data.meanings[m]);
  if (bad.length) throw new Error(`unknown meaning: ${bad.join(', ')}. Use: ${Object.keys(data.meanings).join(', ')}`);
  const r = rng(seed === undefined ? (Date.now() ^ (Math.random() * 2 ** 32)) >>> 0 : hash(seed));
  const have = new Set([...assets, 'none', 'code']);
  const fits = data.devices.filter((d) => d.needs.some((n) => have.has(n)) && (!d.job || !job || d.job.includes(job)) && !recent.includes(d.id) && (!d.glass || glass || meanings.includes('calm')));
  const score = (d) => d.meanings.filter((m) => meanings.includes(m)).length * 2 + r() * 3 + (d.job?.includes(job) ? 1 : 0);
  const ranked = fits.map((d) => ({ d, s: score(d) })).sort((a, b) => b.s - a.s);
  const picks = [];
  for (const { d } of ranked) { if (picks.length < 2 && !picks.some((p) => p.family === d.family)) picks.push(d); }
  // the third is the less obvious one: it fits the assets, from another family, and shares at most one meaning
  const stretch = ranked.map((x) => x.d).filter((d) => !picks.some((p) => p.family === d.family || p.id === d.id));
  const third = stretch.filter((d) => d.meanings.filter((m) => meanings.includes(m)).length <= 1);
  const pool = third.length ? third : stretch.length ? stretch : ranked.map((x) => x.d).filter((d) => !picks.includes(d));
  if (pool.length) picks.push(pool[Math.floor(r() * Math.min(5, pool.length))]);
  // grounds differ across the three unless the brief fixes one; colour sources differ too
  const order = ['light', 'dark', 'colour'].sort(() => r() - 0.5);
  const used = []; const sources = Object.keys(data.sources).filter((s) => s !== 'brand').sort(() => r() - 0.5);
  return picks.map((d, i) => {
    const g = ground || order.find((o) => d.grounds.includes(o) && !used.includes(o)) || d.grounds[0];
    used.push(g);
    return { id: d.id, name: d.name, does: d.does, verb: d.verb, ground: g, colourFrom: data.sources[sources[i % sources.length]], cost: d.cost, watch: d.watch, stretch: i === 2 };
  });
}

export function dealCli(opt) {
  const data = loadDevices();
  if (opt.list) { for (const d of data.devices) console.log(`${d.id.padEnd(22)} ${d.name}: ${d.does}`); return; }
  const meanings = list(opt.meaning); const assets = list(opt.assets);
  if (!meanings.length) { console.error(`darkroom deal --meaning status,craft [--job book] [--assets photo,film,render,illustration] [--ground light|dark|colour] [--glass] [--seed text] [--list]\nmeanings: ${Object.keys(data.meanings).join(', ')}`); process.exit(1); }
  const dir = process.cwd();
  const recent = readBuilds().filter((b) => b.dir !== dir).slice(0, 3).map((b) => b.device).filter(Boolean);
  const cards = deal({ meanings, job: typeof opt.job === 'string' ? opt.job.toLowerCase() : '', assets, ground: typeof opt.ground === 'string' ? opt.ground : '', glass: !!opt.glass, recent, seed: opt.seed });
  cards.forEach((c, i) => console.log(`${'ABC'[i]}. ${c.name}${c.stretch ? ' (the less obvious one)' : ''} [${c.id}]\n   ${c.does}\n   Ground ${c.ground}. Colour from ${c.colourFrom}. Motion word: ${c.verb}. Cost: ${c.cost}.\n   Watch: ${c.watch}`));
  if (recent.length) console.log(`Left out, used in your last builds: ${recent.join(', ')}`);
  if (fs.existsSync('.darkroom')) fs.writeFileSync('.darkroom/deal.json', JSON.stringify({ meanings, assets, cards, date: new Date().toISOString() }, null, 2));
}
