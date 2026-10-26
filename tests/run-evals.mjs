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
  dir = path.join(work, 'modes'); fs.mkdirSync(dir, { recursive: true });
  await run(['init'], dir);
  const fails = [];
  r = await run(['state', '--set', 'mode=animated,look=like:cartier'], dir);
  try { const s = JSON.parse(r.out); if (s.mode !== 'animated' || s.look !== 'like:cartier') fails.push(`state shows mode=${s.mode} look=${s.look}`); } catch { fails.push(`state output not JSON: ${r.out.slice(0, 120)}`); }
  for (const bad of ['mode=scrolly', 'look=cartier', 'approvals=x']) { r = await run(['state', '--set', bad], dir); if (r.code === 0) fails.push(`--set ${bad} was accepted`); }
  r = await run(['state', '--approve', 'direction'], dir); if (r.code !== 0) fails.push(`approve failed after rejected sets: ${r.out.slice(0, 120)}`);
  results.push({ name: 'state records mode and look, and rejects unknown modes, malformed looks and direct writes to approvals', fails });
  const pf = [];
  r = await run(['state', '--set', 'platform=shopify,verify=quick,palette=60-30-10'], dir);
  try { const s = JSON.parse(r.out); if (s.platform !== 'shopify' || s.verify !== 'quick' || s.palette !== '60-30-10') pf.push(`state shows platform=${s.platform} verify=${s.verify} palette=${s.palette}`); } catch { pf.push(`state output not JSON: ${r.out.slice(0, 120)}`); }
  for (const bad of ['platform=wix', 'verify=some', 'palette=rainbow']) { r = await run(['state', '--set', bad], dir); if (r.code === 0) pf.push(`--set ${bad} was accepted`); }
  results.push({ name: 'state records platform, check depth and colour choice, and rejects unknown values', fails: pf });
  return results;
}

// Every file-based starter passes its own structure check; deliberately broken copies are caught.
async function platformCases() {
  const { PLATFORMS } = await import(pathToFileURL(path.join(skill, 'scripts', 'lib', 'platforms.mjs')).href);
  const results = [];
  const base = path.join(work, 'platforms');
  const scaffold = async (id) => { const d = path.join(base, id); await run(['platform', 'scaffold', id, '--out', d, '--name', 'Test Site'], work); return d; };
  const check = async (d, id) => { const j = path.join(d, '..', `${path.basename(d)}.json`); const r = await run(['platform', 'check', d, ...(id ? ['--platform', id] : []), '--json', j], work); return { code: r.code, res: fs.existsSync(j) ? JSON.parse(fs.readFileSync(j, 'utf8')) : null, out: r.out }; };
  const fileBased = Object.entries(PLATFORMS).filter(([, p]) => p.scaffold === 'files').map(([id]) => id);
  const fails = [];
  for (const id of fileBased) {
    const d = await scaffold(id);
    const { code, res, out } = await check(d);
    if (!res) { fails.push(`${id}: no check output: ${out.slice(0, 150)}`); continue; }
    if (res.platform !== id) fails.push(`${id}: detected as ${res.platform}`);
    const highs = res.findings.filter((f) => f.sev === 'high');
    if (code !== 0 || highs.length) fails.push(`${id}: ${highs.map((f) => f.msg).join(' | ') || `exit ${code}`}`);
    const files = fs.readdirSync(d, { recursive: true }).map((f) => path.join(d, f)).filter((f) => fs.statSync(f).isFile());
    if (files.some((f) => /\{\{(name|slug)\}\}/.test(fs.readFileSync(f, 'utf8')))) fails.push(`${id}: {{name}} or {{slug}} left unfilled`);
  }
  results.push({ name: `every file-based platform starter (${fileBased.join(', ')}) is detected correctly, fully filled in, and passes its structure check`, fails });

  const gen = await run(['platform', 'scaffold', 'astro', '--name', 'x'], work);
  results.push({ name: 'generator platforms (astro, nextjs) print the official generator instead of writing files', fails: /npm create astro@latest/.test(gen.out) ? [] : [`astro scaffold printed: ${gen.out.slice(0, 120)}`] });

  // break one thing per platform; each must produce a high finding of the named check
  const breaks = [
    ['shopify', 'layout', (d) => fs.writeFileSync(path.join(d, 'layout/theme.liquid'), fs.readFileSync(path.join(d, 'layout/theme.liquid'), 'utf8').replace('{{ content_for_header }}', ''))],
    ['shopify', 'templates', (d) => fs.writeFileSync(path.join(d, 'templates/index.json'), '{ "sections": { "x": { "type": "missing-section" } }, "order": ["x"] }')],
    ['shopify', 'schema', (d) => fs.writeFileSync(path.join(d, 'sections/hero.liquid'), fs.readFileSync(path.join(d, 'sections/hero.liquid'), 'utf8').replace('"name": "Hero",', '"name": "Hero",,'))],
    ['wordpress', 'blocks', (d) => fs.writeFileSync(path.join(d, 'templates/page.html'), fs.readFileSync(path.join(d, 'templates/page.html'), 'utf8').replace('<!-- /wp:group -->', ''))],
    ['wordpress', 'structure', (d) => fs.rmSync(path.join(d, 'templates/index.html'))],
    ['wordpress', 'blocks', (d) => fs.writeFileSync(path.join(d, 'templates/page.html'), fs.readFileSync(path.join(d, 'templates/page.html'), 'utf8').replace('"slug":"footer"', '"slug":"no-such-part"'))],
    ['woocommerce', 'blocks', (d) => fs.writeFileSync(path.join(d, 'templates/single-product.html'), fs.readFileSync(path.join(d, 'templates/single-product.html'), 'utf8').replace(/<!-- wp:woocommerce\/product-price -->[\s\S]*?<!-- \/wp:woocommerce\/product-price -->/, '<!-- wp:woocommerce/product-price /-->'))],
    ['ghost', 'helpers', (d) => fs.writeFileSync(path.join(d, 'default.hbs'), fs.readFileSync(path.join(d, 'default.hbs'), 'utf8').replace('{{ghost_foot}}', ''))],
    ['static', 'links', (d) => fs.writeFileSync(path.join(d, 'index.html'), fs.readFileSync(path.join(d, 'index.html'), 'utf8').replace('css/site.css', 'css/missing.css'))],
    ['php', 'escaping', (d) => fs.appendFileSync(path.join(d, 'index.php'), '<?php echo $_GET["q"]; ?>')],
    ['jekyll', 'layouts', (d) => fs.writeFileSync(path.join(d, 'about.md'), '---\nlayout: page\n---\nAbout')],
    ['static', 'secret', (d) => fs.writeFileSync(path.join(d, 'js/site.js'), 'const api_key = "sk_live_51Habcdefghijklmnop";')],
    ['hugo', 'local-path', (d) => fs.appendFileSync(path.join(d, 'layouts/home.html'), '<img src="C:\\Users\\someone\\photo.jpg">')],
  ];
  const caught = [];
  for (const [i, [id, checkId, breakIt]] of breaks.entries()) {
    const d = path.join(base, `broken-${i}-${id}`);
    await run(['platform', 'scaffold', id, '--out', d, '--name', 'Test Site'], work);
    breakIt(d);
    const { code, res } = await check(d, id);
    if (!res || code === 0 || !res.findings.some((f) => f.sev === 'high' && f.check === checkId)) caught.push(`${id}: break #${i} not caught as high:${checkId} (${res?.findings.filter((f) => f.sev === 'high').map((f) => f.check).join(', ') || 'no highs'})`);
  }
  results.push({ name: `the platform check catches ${breaks.length} deliberate breaks (missing content_for_header, unknown section, bad schema JSON, unbalanced or invalid blocks, missing template part, missing ghost_foot, broken link, unescaped PHP, missing layout, secrets, local paths)`, fails: caught });
  return results;
}

// A small "old site" the user owns: three pages, a robots-blocked page, a cookie banner, images of different sizes.
function writeOldSite(dir) {
  fs.mkdirSync(path.join(dir, 'img'), { recursive: true });
  const svg = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#c96"/></svg>`;
  fs.writeFileSync(path.join(dir, 'img/hero.svg'), svg(900, 500));
  fs.writeFileSync(path.join(dir, 'img/oven.svg'), svg(2600, 1400));
  fs.writeFileSync(path.join(dir, 'index.html'), '<!doctype html><html lang="en"><head><title>Forno Bakery</title><meta name="description" content="Wood-fired bread since 1987."></head><body><header><nav><a href="/">Home</a> <a href="about.html">About</a> <a href="menu.html">Menu</a></nav></header><div id="cookie-banner" role="dialog"><p>We use cookies for tracking.</p><button>Reject all</button></div><main><h1>Bread baked in a wood oven</h1><p>Every loaf starts at 4 am.</p><img src="img/hero.svg" alt="" style="width:1200px"><div><span>Open Tuesday to Sunday</span></div></main><footer><a href="mailto:ola@forno.pt">ola@forno.pt</a> <a href="tel:+351210000000">Call</a> <a href="https://instagram.com/forno">Instagram</a></footer></body></html>');
  fs.writeFileSync(path.join(dir, 'about.html'), '<!doctype html><html><head><title>About</title></head><body><main><h1>Three generations</h1><img src="img/oven.svg" alt="The oven" style="width:800px"><a href="private.html">staff</a><a href="http://PLACEHOLDER/menu.html">menu</a></main></body></html>');
  fs.writeFileSync(path.join(dir, 'menu.html'), '<!doctype html><html><head><title>Menu</title></head><body><main><h1>Menu</h1><table><tr><td>Sourdough</td><td>4.50 €</td></tr></table><form><label>Name <input name="n"></label></form></main></body></html>');
  fs.writeFileSync(path.join(dir, 'private.html'), '<!doctype html><title>Private</title><main><h1>Staff only</h1></main>');
  fs.writeFileSync(path.join(dir, 'robots.txt'), 'User-agent: *\nDisallow: /private\n');
}

const pngOf = async (page, w, h, file) => {
  const b64 = await page.evaluate(({ w, h }) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.fillStyle = '#c96'; x.fillRect(0, 0, w, h); return c.toDataURL('image/png').split(',')[1]; }, { w, h });
  fs.writeFileSync(file, Buffer.from(b64, 'base64'));
};

async function siteCases() {
  const results = [];
  const read = (f) => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '');
  const base = path.join(work, 'import'); const site = path.join(base, 'site'); writeOldSite(site);

  // folder → served and crawled; texts in order, banner ignored, table row kept, images measured with suggestions
  let fails = [];
  let r = await run(['import', site, '--out', path.join(base, 'o1')], base);
  const content = read(path.join(base, 'o1', 'CONTENT.md'));
  for (const k of ['Bread baked in a wood oven', 'Every loaf starts at 4 am.', 'Open Tuesday to Sunday', 'Sourdough · 4.50 €', 'ola@forno.pt', '+351210000000', 'instagram.com/forno', 'Three generations']) if (!content.includes(k)) fails.push(`CONTENT.md lacks "${k}"`);
  if (content.includes('We use cookies')) fails.push('cookie banner text was imported');
  if (/^Name$/m.test(content)) fails.push('form label imported as page text');
  const imgs = fs.existsSync(path.join(base, 'o1', 'images.json')) ? JSON.parse(read(path.join(base, 'o1', 'images.json'))) : [];
  const hero = imgs.find((i) => /hero/.test(i.saved ?? ''));
  if (!hero || hero.width !== 900 || !hero.notes.some((n) => /2400/.test(n))) fails.push(`hero image not measured or not given the full-width suggestion: ${JSON.stringify(hero)?.slice(0, 160)}`);
  if (imgs.find((i) => /oven/.test(i.saved ?? ''))?.notes.length) fails.push('a sharp, described image got a suggestion');
  if (!fs.existsSync(path.join(base, 'o1', 'images', 'hero.svg'))) fails.push('images not saved');
  if (!read(path.join(base, 'o1', 'url-map.json')).includes('/about.html')) fails.push('url-map lacks /about.html');
  if (r.code !== 0) fails.push(`exit ${r.code}: ${r.out.slice(0, 160)}`);
  results.push({ name: 'import of a local site folder: texts in reading order, cookie banner and form labels left out, contacts found, images saved and measured with a suggestion (never a rejection), old addresses listed', fails });

  // live URL → robots.txt respected; --list saves nothing; --pages home,menu.html selects (Git Bash-safe)
  fails = [];
  const { resolveTarget } = await import(pathToFileURL(path.join(skill, 'scripts', 'lib', 'serve.mjs')).href);
  const served = await resolveTarget(site);
  try {
    const origin = new URL(served.url).origin;
    r = await run(['import', origin + '/', '--list', '--out', path.join(base, 'o2')], base);
    if (!/3 page\(s\) found/.test(r.out)) fails.push(`--list did not find 3 pages: ${r.out.slice(0, 200)}`);
    if (!/private\.html: robots\.txt disallows it/.test(r.out)) fails.push('robots.txt Disallow: /private was not respected');
    if (fs.existsSync(path.join(base, 'o2', 'CONTENT.md'))) fails.push('--list wrote CONTENT.md');
    r = await run(['import', origin + '/', '--pages', 'home,menu.html', '--take', 'text', '--out', path.join(base, 'o3')], base);
    const pages = fs.existsSync(path.join(base, 'o3', 'content.json')) ? JSON.parse(read(path.join(base, 'o3', 'content.json'))).pages.map((p) => p.path) : [];
    if (pages.join(',') !== '/,/menu.html') fails.push(`--pages home,menu.html imported ${pages.join(',') || 'nothing'}`);
    if (fs.existsSync(path.join(base, 'o3', 'images'))) fails.push('--take text saved images');
  } finally { await served.close(); }
  results.push({ name: 'import of a live URL: robots.txt respected, --list only lists, --pages home,menu.html picks exactly those pages, --take text saves no images', fails });

  // PHP source → read, not run; included parts are not pages; theme folders point to the live site
  fails = [];
  const php = path.join(base, 'php'); fs.mkdirSync(path.join(php, 'photos'), { recursive: true });
  fs.writeFileSync(path.join(php, 'index.php'), "<?php include 'header.php'; ?>\n<h1>Welcome to Casa Lu</h1><p>Rooms by the river.</p><?php echo date('Y'); ?><img src=\"photos/room.svg\" alt=\"A room\">");
  fs.writeFileSync(path.join(php, 'header.php'), "<nav><a href='/'>Home</a></nav>");
  fs.writeFileSync(path.join(php, 'photos/room.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700"><rect width="100%" height="100%"/></svg>');
  r = await run(['import', php, '--out', path.join(base, 'o4')], base);
  const phpContent = read(path.join(base, 'o4', 'CONTENT.md'));
  if (!phpContent.includes('Welcome to Casa Lu') || !phpContent.includes('Read from the files, not run')) fails.push(`PHP texts or the "not run" note missing: ${r.out.slice(0, 160)}`);
  if (phpContent.includes('header.php')) fails.push('header.php (an included part) was listed as a page');
  if (!/1000×700/.test(phpContent)) fails.push('local image not measured');
  const theme = path.join(base, 'wp'); await run(['platform', 'scaffold', 'wordpress', '--out', theme, '--name', 'T'], base);
  r = await run(['import', theme, '--out', path.join(base, 'o5')], base);
  if (r.code !== 2 || !/database/.test(r.out)) fails.push(`a WordPress theme folder was not redirected to the live site (exit ${r.code})`);
  results.push({ name: 'import of PHP sources reads without running, skips included parts, measures local images; a theme folder asks for the live URL instead', fails });

  // preview: serve a folder and relay a dev server, rewriting its address; a busy port gives a plain message
  fails = [];
  const start = (args) => new Promise((resolve) => {
    const p = spawn(process.execPath, [cli, 'preview', ...args, '--host', '127.0.0.1'], { cwd: base, env });
    let out = ''; const done = () => resolve({ p, out, port: Number(out.match(/this computer: http:\/\/127\.0\.0\.1:(\d+)/)?.[1]) });
    p.stdout.on('data', (d) => { out += d; if (/preview ready[\s\S]*this computer/.test(out)) done(); });
    p.stderr.on('data', (d) => { out += d; }); p.on('close', done); setTimeout(done, 8000);
  });
  const a = await start([site, '--port', '0']);
  try {
    if (!a.port) fails.push(`preview did not start: ${a.out.slice(0, 160)}`);
    else {
      fs.writeFileSync(path.join(site, 'abs.html'), `<a href="http://127.0.0.1:${a.port}/about.html">x</a><script>var u="http:\\/\\/127.0.0.1:${a.port}\\/menu.html"</script>`);
      if ((await fetch(`http://127.0.0.1:${a.port}/about`)).status !== 200) fails.push('/about did not resolve to about.html');
      const b = await start([`http://127.0.0.1:${a.port}`, '--port', '0']);
      try {
        const body = await (await fetch(`http://127.0.0.1:${b.port}/abs.html`)).text();
        if (!body.includes(`http://127.0.0.1:${b.port}/about.html`) || !body.includes(`http:\\/\\/127.0.0.1:${b.port}\\/menu.html`)) fails.push(`relay did not rewrite the dev server address: ${body.slice(0, 160)}`);
      } finally { b.p.kill(); }
      const busy = await start([site, '--port', String(a.port)]);
      if (!/busy/.test(busy.out)) fails.push(`a busy port gave: ${busy.out.slice(0, 120)}`);
      busy.p.kill();
    }
  } finally { a.p.kill(); }
  results.push({ name: 'preview serves a folder, relays a dev server with its address rewritten (plain and JSON-escaped), and explains a busy port', fails });

  // assets intake: matches NEEDS.md, suggests, never rejects, fills the Status column
  fails = [];
  const proj = path.join(base, 'proj'); fs.mkdirSync(path.join(proj, 'assets/raw'), { recursive: true });
  const { launch } = await import(pathToFileURL(path.join(skill, 'scripts', 'lib', 'browser.mjs')).href);
  const browser = await launch();
  try { const pg = await browser.newPage(); await pngOf(pg, 1400, 900, path.join(proj, 'assets/raw/hero.png')); await pngOf(pg, 600, 200, path.join(proj, 'assets/raw/logo.png')); await pngOf(pg, 3000, 1800, path.join(proj, 'assets/raw/big.png')); await pngOf(pg, 500, 500, path.join(proj, 'assets/raw/extra.png')); } finally { await browser.close(); }
  fs.writeFileSync(path.join(proj, 'NEEDS.md'), '# Needs\n\n| # | I need | Why | Blocks? | How | Put it in | If it never arrives |\n|---|---|---|---|---|---|---|\n| 1 | a wide hero photo | first screen | Improves | phone | `assets/raw/hero.png` | drawn |\n| 2 | your logo | header | Improves | designer | `assets/raw/logo.png` | wordmark |\n| 3 | a big wide banner | about | Improves | phone | `assets/raw/big.png` | none |\n| 4 | a phone photo | phone hero | Improves | phone | `assets/raw/phone.png` | crop |\n');
  r = await run(['assets', 'intake'], proj);
  const needs = read(path.join(proj, 'NEEDS.md'));
  const intake = fs.existsSync(path.join(proj, '.darkroom/intake.json')) ? JSON.parse(read(path.join(proj, '.darkroom/intake.json'))) : null;
  if (r.code !== 0) fails.push(`exit ${r.code}: ${r.out.slice(0, 160)}`);
  if (!/\| Status \|/.test(needs)) fails.push('NEEDS.md got no Status column');
  if (!/hero\.png` \| drawn \| ✅ arrived · could be better: 1400 px/.test(needs)) fails.push('hero row not marked arrived with its suggestion');
  if (!/logo\.png` \| wordmark \| ✅ arrived · could be better: a logo as SVG/.test(needs)) fails.push('logo row lacks the SVG suggestion');
  if (!/big\.png` \| none \| ✅ arrived \|/.test(needs)) fails.push('a large wide image got a suggestion or was not marked arrived');
  if (!/phone\.png` \| crop \| waiting \|/.test(needs)) fails.push('missing file not marked waiting');
  if (/reject/i.test(needs) || intake?.needs.some((n) => /reject/i.test(n.status))) fails.push('something was rejected');
  if (intake?.extras.length !== 1) fails.push(`extras: ${intake?.extras.length}`);
  if (!/Continue with these, or replace any of them first\?/.test(r.out)) fails.push('no "continue with these?" question');
  results.push({ name: 'assets intake matches NEEDS.md, suggests instead of rejecting, lists extras, fills the Status column and asks whether to continue', fails });
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
    const read = (f) => (fs.existsSync(path.join(skill, f)) ? fs.readFileSync(path.join(skill, f), 'utf8') : '');
    const modes = read('references/modes.md');
    results.push({ name: 'modes.md defines calm, animated, hero-effect and story, each with what the visitor sees, what the user provides, how it is built and checked', fails: !modes ? ['references/modes.md missing'] : ['calm', 'animated', 'hero-effect', 'story'].flatMap((m) => {
      const block = modes.split(/^### /m).find((b) => b.startsWith(m));
      return block ? ['Visitor sees:', 'You need from the user:', 'Build with:', 'Checks:'].filter((k) => !block.includes(k)).map((k) => `${m} lacks ${k}`) : [`no section for ${m}`];
    }) });
    const looks = read('references/looks.md');
    const profiles = looks.split(/^## like:/m).slice(1);
    results.push({ name: 'looks.md profiles (apple, rolex, cartier at least) each say what to take, what never to take, and font substitutes', fails: [
      ...['apple', 'rolex', 'cartier'].filter((b) => !profiles.some((p) => p.startsWith(b))).map((b) => `no like:${b} profile`),
      ...profiles.flatMap((p) => ['Take:', 'Do not take:', 'Type:', 'Motion:'].filter((k) => !p.includes(k)).map((k) => `like:${p.split(String.fromCharCode(10))[0]} lacks ${k}`)),
    ] });
    const kit = read('references/motion-toolkit.md');
    results.push({ name: 'motion-toolkit.md covers the recipes, GSAP, Motion, Lenis, three.js, Lottie, CSS scroll-driven animation and asset tools', fails: ['reveal.js', 'GSAP', 'Motion', 'Lenis', 'three.js', 'Lottie', 'animation-timeline', 'Making the assets'].filter((k) => !kit.includes(k)).map((k) => `missing ${k}`) });
    const front = skillMd.split('---')[1] ?? '';
    results.push({ name: 'Darkroom starts only from /darkroom (disable-model-invocation: true, user-invocable: true)', fails: [
      ...(/^disable-model-invocation:\s*true\s*$/m.test(front) ? [] : ['frontmatter lacks disable-model-invocation: true']),
      ...(/^user-invocable:\s*true\s*$/m.test(front) ? [] : ['frontmatter lacks user-invocable: true']),
      ...((front.match(/^description:\s*"(.*)"\s*$/m)?.[1].length ?? 9999) <= 1024 ? [] : ['description missing or over 1024 characters']),
    ] });
    const { PLATFORMS } = await import(pathToFileURL(path.join(skill, 'scripts', 'lib', 'platforms.mjs')).href);
    const heads = ['Checked on:', '## Choose it when', '## Official docs to check before building', '## Ask before building', '## What Darkroom delivers', '## Where the design goes', '## Preview and capture', '## Deploy and free hosting', '## Gotchas'];
    const index = read('platforms/README.md');
    results.push({ name: 'every platform has a dated profile with official docs, questions, delivery, preview, hosting and gotchas, listed in platforms/README.md', fails: Object.keys(PLATFORMS).flatMap((id) => {
      const md = read(`platforms/${id}.md`);
      if (!md) return [`platforms/${id}.md missing`];
      return [...heads.filter((h) => !md.includes(h)).map((h) => `${id}.md lacks "${h}"`), ...(/https:\/\//.test(md.split('## Official docs')[1] ?? '') ? [] : [`${id}.md lists no official docs URL`]), ...(index.includes('`' + id + '`') ? [] : [`README.md does not list ${id}`])];
    }) });
    const concierge = read('commands/concierge.md'); const assets = read('references/asset-tools.md'); const color = read('references/color.md');
    results.push({ name: 'intake asks about platform, colours (own, suggested, 60-30-10, creative), assets (own or prompts for ChatGPT, Kling, Seedance, Veo) and quick or full checks', fails: [
      ...['Where will it live?', 'Colours?', 'Pictures and video?', 'Quick check', 'Full check'].filter((k) => !concierge.includes(k)).map((k) => `concierge.md lacks "${k}"`),
      ...['I have a palette', 'Suggest some', '60-30-10', 'Creative'].filter((k) => !color.includes(k)).map((k) => `color.md lacks "${k}"`),
      ...['ChatGPT', 'Kling', 'Seedance', 'Veo', 'Image to video', 'Text to video', 'First and last frame'].filter((k) => !assets.includes(k)).map((k) => `asset-tools.md lacks "${k}"`),
    ] });
    // a skill file that git ignores exists locally but never reaches GitHub (HANDOFF.md once hid commands/handoff.md)
    let ignored = [];
    try {
      const { execFileSync } = await import('node:child_process');
      const files = fs.readdirSync(skill, { recursive: true }).map((f) => path.join(skill, f)).filter((f) => fs.statSync(f).isFile());
      ignored = execFileSync('git', ['check-ignore', '--stdin'], { cwd: skill, input: files.join('\n'), encoding: 'utf8' }).trim().split('\n').filter(Boolean);
    } catch (e) { if (e.status !== 1) ignored = []; } // exit 1 = nothing ignored; no git = skip
    results.push({ name: 'no file of the skill is git-ignored (so everything the playbooks mention is published)', fails: ignored.map((f) => `ignored: ${path.relative(skill, f.replace(/^"|"$/g, ''))}`) });
    const linked = [...new Set([...skillMd.matchAll(/`((?:commands|references|platforms|templates|recipes)\/[\w./-]+\.(?:md|js|json))`/g)].map((m) => m[1]))];
    results.push({ name: 'every file SKILL.md names exists', fails: linked.filter((l) => !fs.existsSync(path.join(skill, l))).map((l) => `missing ${l}`) });
    const flagDocs = [['commands/import.md', ['--list', '--pages', '--take', '--max', '--out']], ['commands/preview.md', ['--port', '--host']], ['references/asset-tools.md', ['assets intake', '--needs']]];
    results.push({ name: 'every flag of import, preview and assets intake is documented in its playbook', fails: flagDocs.flatMap(([f, flags]) => flags.filter((k) => !read(f).includes(k)).map((k) => `${f} lacks ${k}`)) });
    const wired = ['commands/import.md', 'commands/preview.md', 'commands/platform.md', 'platforms/README.md', 'platforms/builders.md', 'references/asset-tools.md', 'references/modes.md', 'commands/lookalike.md', 'references/looks.md', 'references/motion-toolkit.md', 'recipes/reveal.js'];
    results.push({ name: 'SKILL.md links the platform playbook and profiles, asset tools, modes, look-alike, looks, motion toolkit and reveal recipe', fails: wired.filter((l) => !fs.existsSync(path.join(skill, l)) || !skillMd.includes(l)).map((l) => `missing or unlinked: ${l}`) });
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
  out.push(await revealCheck());
  return out;
}

// reveal.js: below-the-fold items wait for scroll, then show; reduced motion and no-JS show everything at once.
async function revealCheck() {
  const name = 'recipe demo-reveal.html hides below-the-fold items until scrolled, and never under reduced motion or without JS';
  const { launch } = await import(pathToFileURL(path.join(skill, 'scripts', 'lib', 'browser.mjs')).href);
  const { resolveTarget } = await import(pathToFileURL(path.join(skill, 'scripts', 'lib', 'serve.mjs')).href);
  process.env.DARKROOM_RESOLVE_FROM = env.DARKROOM_RESOLVE_FROM;
  const served = await resolveTarget(path.join(skill, 'recipes', 'demo-reveal.html'));
  const browser = await launch();
  const fails = [];
  const opacity = (page, sel) => page.evaluate((s) => Number(getComputedStyle(document.querySelector(s)).opacity), sel);
  try {
    for (const [mode, js] of [['no-preference', true], ['reduce', true], ['no-preference', false]]) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: mode, javaScriptEnabled: js });
      const page = await ctx.newPage();
      const errors = []; page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(served.url); await page.waitForTimeout(900);
      const label = `${mode}${js ? '' : ', no JS'}`;
      const hero = await opacity(page, '#hero p'); const below = await opacity(page, '#closing h2');
      if (hero < 0.99) fails.push(`${label}: first-screen text not shown at load (opacity ${hero})`);
      if (mode === 'no-preference' && js && below > 0.01) fails.push(`${label}: below-the-fold heading visible before scrolling (opacity ${below})`);
      if ((mode === 'reduce' || !js) && below < 0.99) fails.push(`${label}: content hidden (opacity ${below})`);
      if (mode === 'no-preference' && js) {
        await page.evaluate(() => document.querySelector('#closing').scrollIntoView());
        await page.waitForTimeout(1400);
        const after = await opacity(page, '#closing h2');
        if (after < 0.99) fails.push(`${label}: heading not revealed after scrolling to it (opacity ${after})`);
        const words = await page.evaluate(() => document.querySelector('#hero h1').textContent);
        if (words !== 'Things appear as you arrive.') fails.push(`word split changed the heading text: "${words}"`);
      }
      if (errors.length) fails.push(`${label}: ${errors[0]}`);
      await ctx.close();
    }
  } finally { await browser.close(); await served.close(); }
  return { name, fails };
}

const cases =spec.cases.filter((c) => !only || c.name.includes(only) || c.fixture.includes(only));
const results = [];
let next = 0;
await Promise.all(Array.from({ length: 3 }, async () => { while (next < cases.length) { const i = next++; results[i] = await fileCase(cases[i], i); } }));
if (!only) { results.push(...await projectCases()); results.push(...await platformCases()); results.push(...await siteCases()); results.push(...await docChecks()); results.push(...await recipeChecks()); }
let bad = 0;
for (const r of results) { const ok = !r.fails.length; if (!ok) bad++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.name}${ok ? '' : '\n      - ' + r.fails.join('\n      - ')}`); }
console.log(`\n${results.length - bad}/${results.length} passed`);
fs.rmSync(work, { recursive: true, force: true });
process.exit(bad ? 1 : 0);
