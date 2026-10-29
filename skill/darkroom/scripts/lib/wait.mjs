// Wait for something outside Claude's turn to be ready, then exit, so a background run of this command wakes Claude up
// the moment it is ready: the user's generated frames or renders landing in a folder, a long export finishing writing,
// a dev server starting. Exit 0 = ready, 2 = timed out (say so to the user), 1 = bad arguments.
import fs from 'node:fs';
import path from 'node:path';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const globRe = (g) => new RegExp('^' + g.split('*').map((s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*') + '$', 'i');

function listFiles(dir, re, recursive) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) { if (recursive) walk(f); } else if (re.test(e.name)) { try { const s = fs.statSync(f); out.push(`${f}|${s.size}|${s.mtimeMs}`); } catch { /* removed meanwhile */ } }
    }
  })(dir);
  return out;
}

export async function wait(opt) {
  const timeout = Number(opt.timeout ?? 7200) * 1000;
  const every = Number(opt.every ?? 2) * 1000;
  const t0 = Date.now();
  const elapsed = () => `${Math.round((Date.now() - t0) / 1000)} s`;
  let lastNote = t0;
  const note = (msg) => { if (Date.now() - lastNote >= 60000) { console.log(`  still waiting (${elapsed()}): ${msg}`); lastNote = Date.now(); } };

  if (opt.url && opt.url !== true) {
    console.log(`waiting for ${opt.url} to answer (timeout ${timeout / 1000} s)`);
    while (Date.now() - t0 < timeout) {
      try { const r = await fetch(opt.url, { signal: AbortSignal.timeout(5000) }); if (r.status < 500) { console.log(`ready: ${opt.url} answered ${r.status} after ${elapsed()}`); return 0; } } catch { /* not up yet */ }
      note('no answer yet'); await sleep(every);
    }
  } else if (opt.files && opt.files !== true) {
    const dir = path.resolve(String(opt.files));
    const re = globRe(opt.match && opt.match !== true ? String(opt.match) : '*');
    const count = Number(opt.count ?? 1), stable = Number(opt.stable ?? 5) * 1000, recursive = !!opt.recursive;
    console.log(`waiting for ${count} file(s) matching ${opt.match ?? '*'} in ${dir}, unchanged for ${stable / 1000} s (timeout ${timeout / 1000} s)`);
    let prev = '', since = Date.now();
    while (Date.now() - t0 < timeout) {
      const files = listFiles(dir, re, recursive);
      const sig = files.sort().join('\n');
      if (sig !== prev) { prev = sig; since = Date.now(); }
      if (files.length >= count && Date.now() - since >= stable) {
        const total = files.reduce((s, f) => s + Number(f.split('|')[1]), 0);
        console.log(`ready: ${files.length} file(s) in ${dir} (${(total / 1048576).toFixed(1)} MB), nothing changed for ${stable / 1000} s, after ${elapsed()}`);
        for (const f of files.slice(0, 5)) console.log(`  ${path.relative(dir, f.split('|')[0])}`);
        if (files.length > 5) console.log(`  … and ${files.length - 5} more`);
        return 0;
      }
      note(`${files.length} of ${count} file(s)${files.length >= count ? ', still being written' : ''}`);
      await sleep(every);
    }
  } else {
    console.error('darkroom wait --files <folder> [--match "*.webp"] [--count 1] [--stable 5] [--recursive] [--every 2] [--timeout 7200]\n             | --url http://127.0.0.1:4321/ [--timeout 7200]');
    return 1;
  }
  console.log(`timed out after ${elapsed()}: not ready. Tell the user what is still missing and ask; do not report it as done.`);
  return 2;
}
