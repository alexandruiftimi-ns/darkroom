// Platforms: the registry, scaffolds (templates/platforms/<id>) and an offline structure check per platform.
// The check is measured where it reads files (missing file, bad JSON, unbalanced block markup) and heuristic where it
// pattern-matches code (unescaped PHP output). It never replaces the platform's own validator (Theme Check, gscan, php -l).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { mkdirp } from './browser.mjs';

// id → profile in platforms/<id>.md. `scaffold: 'files'` copies templates/platforms/<id>; 'generator' uses the official CLI.
export const PLATFORMS = {
  static: { name: 'Static HTML', scaffold: 'files', kinds: 'landing, portfolio, small business site', host: 'free: Cloudflare, GitHub Pages, Netlify' },
  php: { name: 'PHP site', scaffold: 'files', kinds: 'small site with a contact form on shared hosting', host: 'any PHP host; free hosts with limits' },
  astro: { name: 'Astro on Cloudflare', scaffold: 'generator', kinds: 'landing, portfolio, content site, docs', host: 'free: Cloudflare Workers static assets' },
  nextjs: { name: 'Next.js on Vercel', scaffold: 'generator', kinds: 'React sites, sites that will grow into apps', host: 'Vercel Hobby (free, non-commercial only); static export anywhere' },
  hugo: { name: 'Hugo', scaffold: 'files', kinds: 'blog, portfolio, docs, large content sites', host: 'free: Cloudflare, Netlify, GitHub Pages (Actions)' },
  jekyll: { name: 'Jekyll', scaffold: 'files', kinds: 'blog, portfolio on GitHub Pages', host: 'free: GitHub Pages builds it natively' },
  wordpress: { name: 'WordPress block theme', scaffold: 'files', kinds: 'business site, blog, portfolio the client edits', host: 'any WordPress host (custom themes need a plan that allows them)' },
  woocommerce: { name: 'WooCommerce store (block theme)', scaffold: 'files', base: 'wordpress', kinds: 'online shop on WordPress', host: 'WordPress host with WooCommerce' },
  shopify: { name: 'Shopify theme', scaffold: 'files', kinds: 'online shop, product launch, catalog', host: 'Shopify (paid plan; free development store to build)' },
  ghost: { name: 'Ghost theme', scaffold: 'files', kinds: 'publication, newsletter, membership blog', host: 'Ghost(Pro) or self-hosted Ghost' },
};

const GENERATORS = {
  astro: ['npm create astro@latest <name> -- --template minimal', 'npm install wrangler@latest --save-dev', 'add wrangler.jsonc with "assets": { "directory": "./dist" } (platforms/astro.md)'],
  nextjs: ['npx create-next-app@latest <name>', 'for a static site: output: "export" in next.config (platforms/nextjs.md)'],
};

const read = (f) => { try { return fs.readFileSync(f, 'utf8'); } catch { return null; } };
const exists = (dir, f) => fs.existsSync(path.join(dir, f));
const firstOf = (dir, list) => list.find((f) => exists(dir, f)) ?? null;
const SKIP = new Set(['node_modules', 'dist', 'public', '_site', 'resources', 'out']);
const walk = (dir, filter = () => true, base = dir, dots = false) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if ((e.name.startsWith('.') && !dots) || SKIP.has(e.name)) return [];
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full, filter, base, dots) : filter(full) ? [path.relative(base, full).split(path.sep).join('/')] : [];
  });
};

// JSON with // and /* */ comments (Shopify allows them in settings_schema.json and templates).
export function parseJsonc(text) {
  let out = ''; let str = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (str) { out += c; if (c === '\\') out += text[++i] ?? ''; else if (c === '"') str = false; continue; }
    if (c === '"') { str = true; out += c; continue; }
    if (c === '/' && text[i + 1] === '/') { while (i < text.length && text[i] !== '\n') i++; out += '\n'; continue; }
    if (c === '/' && text[i + 1] === '*') { i += 2; while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) i++; i++; continue; }
    out += c;
  }
  return JSON.parse(out);
}

export function detect(dir) {
  const has = (f) => exists(dir, f);
  if (has('layout/theme.liquid')) return 'shopify';
  const css = read(path.join(dir, 'style.css')) ?? '';
  if (/Theme Name:/i.test(css)) {
    const woo = ['templates/single-product.html', 'templates/archive-product.html'].some(has) || /woocommerce/i.test(read(path.join(dir, 'functions.php')) ?? '');
    return woo ? 'woocommerce' : 'wordpress';
  }
  if (has('post.hbs') || /"ghost"/.test(read(path.join(dir, 'package.json')) ?? '')) return 'ghost';
  if (firstOf(dir, ['next.config.js', 'next.config.mjs', 'next.config.ts'])) return 'nextjs';
  if (firstOf(dir, ['astro.config.mjs', 'astro.config.ts', 'astro.config.js'])) return 'astro';
  if (firstOf(dir, ['hugo.toml', 'hugo.yaml', 'hugo.json', 'config/_default/hugo.toml'])) return 'hugo';
  if (has('_config.yml')) return 'jekyll';
  if (has('index.php')) return 'php';
  if (has('index.html')) return 'static';
  return null;
}

// --- checks -------------------------------------------------------------------------------------------------------
const finding = (sev, check, msg, basis = 'measured') => ({ sev, check, msg, basis });

function common(dir) {
  const out = [];
  const text = walk(dir, (f) => /\.(html?|php|liquid|hbs|astro|jsx?|tsx?|mjs|css|json|toml|ya?ml|md)$/i.test(f));
  for (const f of text) {
    const t = read(path.join(dir, f)) ?? '';
    const local = t.match(/(?:\b[A-Z]:\\{1,2}Users\\{1,2}[^\s"'<>]+|(?<![\w.:/-])\/(?:Users|home)\/[a-z][^\s"'<>]+|file:\/\/\/[^\s"'<>]+)/);
    if (local) out.push(finding('high', 'local-path', `${f} points at a path on this computer (${local[0].slice(0, 60)}); it breaks once deployed`));
    const secret = t.match(/\b(?:api[_-]?key|secret|password|passwd|token)\b\s*[:=]\s*['"][A-Za-z0-9_\-]{12,}['"]/i);
    if (secret && !/example|placeholder|changeme|your[_-]/i.test(secret[0])) out.push(finding('high', 'secret', `${f} seems to contain a secret (${secret[0].slice(0, 24)}…); move it to an environment variable or the host's settings`, 'heuristic'));
  }
  const temp = text.filter((f) => /\bTEMP\b|placeholder/i.test(read(path.join(dir, f)) ?? '')).length;
  if (temp) out.push(finding('low', 'placeholders', `${temp} file(s) still mention TEMP or placeholder content; list them in the handoff`, 'heuristic'));
  return out;
}

function staticSite(dir) {
  const out = [];
  if (!exists(dir, 'index.html')) out.push(finding('high', 'structure', 'no index.html at the site root'));
  for (const f of walk(dir, (x) => /\.html?$/i.test(x))) {
    const t = read(path.join(dir, f));
    for (const m of t.matchAll(/\b(?:href|src)=["']([^"'#?]+)[^"']*["']/gi)) {
      const ref = m[1];
      if (/^(?:[a-z]+:|\/\/|\{|\$)/i.test(ref)) continue;
      const target = ref.startsWith('/') ? path.join(dir, ref) : path.join(dir, path.dirname(f), ref);
      const ok = fs.existsSync(target) && (!fs.statSync(target).isDirectory() || fs.existsSync(path.join(target, 'index.html')));
      if (!ok) out.push(finding('high', 'links', `${f} links to ${ref}, which does not exist`));
    }
  }
  return out;
}

function phpSite(dir) {
  const out = [];
  if (!exists(dir, 'index.php') && !exists(dir, 'public/index.php')) out.push(finding('high', 'structure', 'no index.php (or public/index.php)'));
  const files = walk(dir, (f) => /\.php$/i.test(f));
  for (const f of files) {
    const t = read(path.join(dir, f));
    if (/(?:echo|print|<\?=)\s*\$_(?:GET|POST|REQUEST|COOKIE|SERVER)\b/.test(t)) out.push(finding('high', 'escaping', `${f} prints request data without escaping; wrap it in htmlspecialchars()`, 'heuristic'));
    for (const m of t.matchAll(/\b(?:require|include)(?:_once)?\s*\(?\s*(?:__DIR__\s*\.\s*)?['"]([^'"]+\.php)['"]/g)) {
      const ref = m[1].replace(/^\//, '');
      if (!fs.existsSync(path.join(dir, path.dirname(f), ref)) && !fs.existsSync(path.join(dir, ref))) out.push(finding('high', 'includes', `${f} includes ${m[1]}, which does not exist`));
    }
    if (/<form[^>]+method=["']post["']/i.test(t) && !/csrf|token/i.test(t)) out.push(finding('medium', 'forms', `${f} has a POST form without a CSRF token`, 'heuristic'));
  }
  try {
    execFileSync('php', ['-v'], { stdio: 'ignore' });
    for (const f of files) {
      try { execFileSync('php', ['-l', path.join(dir, f)], { stdio: 'pipe' }); } catch (e) { out.push(finding('high', 'syntax', `php -l: ${String(e.stdout || e.message).trim().split('\n')[0]}`)); }
    }
  } catch { out.push(finding('low', 'syntax', 'php is not installed here, so PHP syntax was not checked (not measured)', 'manual')); }
  return out;
}

const SHOPIFY_DIRS = new Set(['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates']);
const liquidSchema = (t) => t.match(/\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/)?.[1];

function shopify(dir) {
  const out = [];
  const layout = read(path.join(dir, 'layout/theme.liquid'));
  if (!layout) out.push(finding('high', 'structure', 'layout/theme.liquid is missing; Shopify refuses the upload without it'));
  else {
    const head = layout.split(/<\/head>/i)[0];
    if (!/\{\{-?\s*content_for_header\s*-?\}\}/.test(head)) out.push(finding('high', 'layout', 'theme.liquid needs {{ content_for_header }} inside <head>'));
    const body = layout.split(/<body[^>]*>/i)[1] ?? '';
    if (!/\{\{-?\s*content_for_layout\s*-?\}\}/.test(body)) out.push(finding('high', 'layout', 'theme.liquid needs {{ content_for_layout }} inside <body>'));
  }
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory() && !e.name.startsWith('.') && !SHOPIFY_DIRS.has(e.name) && e.name !== 'node_modules') out.push(finding('medium', 'structure', `folder ${e.name}/ is not a Shopify theme folder and is not uploaded (list it in .shopifyignore)`));
  }
  const sections = new Set(walk(path.join(dir, 'sections'), (f) => f.endsWith('.liquid')).map((f) => f.replace(/\.liquid$/, '')));
  const blocks = new Set(walk(path.join(dir, 'blocks'), (f) => f.endsWith('.liquid')).map((f) => f.replace(/\.liquid$/, '')));
  for (const [folder, set] of [['sections', sections], ['blocks', blocks]]) {
    for (const s of set) {
      const raw = liquidSchema(read(path.join(dir, folder, s + '.liquid')));
      if (raw === undefined) { if (folder === 'sections') out.push(finding('medium', 'schema', `sections/${s}.liquid has no {% schema %}, so the theme editor cannot add or configure it`)); continue; }
      try { JSON.parse(raw); } catch (e) { out.push(finding('high', 'schema', `${folder}/${s}.liquid: {% schema %} is not valid JSON (${e.message})`)); }
    }
  }
  for (const f of ['config/settings_schema.json', 'config/settings_data.json']) {
    const t = read(path.join(dir, f));
    if (t === null) { out.push(finding(f.includes('schema') ? 'high' : 'medium', 'config', `${f} is missing`)); continue; }
    try { const j = parseJsonc(t); if (f.includes('schema') && !(Array.isArray(j) && j[0]?.name === 'theme_info')) out.push(finding('medium', 'config', 'settings_schema.json should start with the theme_info object')); }
    catch (e) { out.push(finding('high', 'config', `${f} is not valid JSON (${e.message})`)); }
  }
  const jsonFiles = [...walk(path.join(dir, 'templates'), (f) => f.endsWith('.json')).map((f) => 'templates/' + f), ...walk(path.join(dir, 'sections'), (f) => f.endsWith('.json')).map((f) => 'sections/' + f)];
  for (const f of jsonFiles) {
    let j; try { j = parseJsonc(read(path.join(dir, f))); } catch (e) { out.push(finding('high', 'templates', `${f} is not valid JSON (${e.message})`)); continue; }
    for (const [id, s] of Object.entries(j.sections ?? {})) {
      if (s?.type && !s.type.startsWith('_') && !sections.has(s.type)) out.push(finding('high', 'templates', `${f} uses section "${s.type}" (${id}) but sections/${s.type}.liquid does not exist`));
    }
    for (const id of j.order ?? []) if (!j.sections?.[id]) out.push(finding('high', 'templates', `${f} orders "${id}", which is not in its sections`));
  }
  if (!walk(path.join(dir, 'locales'), (f) => /\.default\.json$/.test(f)).length) out.push(finding('medium', 'locales', 'no locales/*.default.json: the theme has no default translation file'));
  if (!exists(dir, 'templates/index.json') && !exists(dir, 'templates/index.liquid')) out.push(finding('high', 'templates', 'no templates/index.json: the home page cannot render'));
  for (const t of ['product', 'collection', 'cart']) if (!firstOf(dir, [`templates/${t}.json`, `templates/${t}.liquid`])) out.push(finding('medium', 'templates', `no templates/${t}.json: a store needs a ${t} page`));
  out.push(finding('low', 'validator', 'run Shopify Theme Check (shopify theme check) before upload; this script only checks structure', 'manual'));
  return out;
}

// Block markup: every <!-- wp:name --> opener needs a matching <!-- /wp:name -->; self-closing ones end in /-->.
export function blockBalance(text) {
  const stack = []; const errors = [];
  for (const m of text.matchAll(/<!--\s*(\/)?wp:([a-z0-9\-/]+)(?:\s+(\{[\s\S]*?\}))?\s*(\/)?-->/g)) {
    const [, close, name, attrs, self] = m;
    if (attrs) { try { JSON.parse(attrs); } catch { errors.push(`attributes of wp:${name} are not valid JSON`); } }
    if (self) continue;
    if (!close) stack.push(name);
    else if (stack.at(-1) === name) stack.pop();
    else errors.push(`<!-- /wp:${name} --> closes ${stack.length ? `wp:${stack.at(-1)}` : 'nothing'}`);
  }
  for (const n of stack) errors.push(`wp:${n} is never closed`);
  return errors;
}

function wordpress(dir, woo = false) {
  const out = [];
  const css = read(path.join(dir, 'style.css'));
  if (!css) out.push(finding('high', 'structure', 'style.css is missing; WordPress cannot see the theme'));
  else if (!/Theme Name:/i.test(css)) out.push(finding('high', 'structure', 'style.css lacks the "Theme Name:" header'));
  const child = /^\s*\*?\s*Template:\s*\S+/im.test(css ?? '');
  if (!child && !exists(dir, 'templates/index.html')) out.push(finding('high', 'structure', 'templates/index.html is missing; WordPress needs it to treat this as a block theme'));
  const tj = read(path.join(dir, 'theme.json'));
  if (tj !== null) {
    try { const j = JSON.parse(tj); if ((j.version ?? 0) < 3) out.push(finding('medium', 'theme-json', `theme.json is version ${j.version ?? 'unset'}; the current schema is version 3 (check the live docs)`)); }
    catch (e) { out.push(finding('high', 'theme-json', `theme.json is not valid JSON (${e.message})`)); }
  } else if (!child) out.push(finding('medium', 'theme-json', 'no theme.json: palette, fonts and spacing cannot be set in the editor'));
  const parts = new Set(walk(path.join(dir, 'parts'), (f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, '')));
  const patternSlugs = new Set(walk(path.join(dir, 'patterns'), (f) => f.endsWith('.php')).map((f) => (read(path.join(dir, 'patterns', f)).match(/Slug:\s*(\S+)/) ?? [])[1]).filter(Boolean));
  for (const f of [...walk(path.join(dir, 'templates'), (x) => x.endsWith('.html')).map((x) => 'templates/' + x), ...[...parts].map((p) => `parts/${p}.html`), ...walk(path.join(dir, 'patterns'), (x) => x.endsWith('.php')).map((x) => 'patterns/' + x)]) {
    const t = read(path.join(dir, f));
    for (const e of blockBalance(t)) out.push(finding('high', 'blocks', `${f}: ${e}`));
    for (const m of t.matchAll(/wp:template-part\s+(\{[^}]*\})/g)) { try { const s = JSON.parse(m[1]).slug; if (s && !parts.has(s) && !child) out.push(finding('high', 'blocks', `${f} uses template part "${s}" but parts/${s}.html does not exist`)); } catch { /* reported above */ } }
    for (const m of t.matchAll(/wp:pattern\s+(\{[^}]*\})/g)) { try { const s = JSON.parse(m[1]).slug; if (s && !s.startsWith('woocommerce') && !s.startsWith('core/') && !patternSlugs.has(s) && !child) out.push(finding('medium', 'blocks', `${f} uses pattern "${s}", which is not in patterns/ (fine if a plugin registers it)`)); } catch { /* reported above */ } }
  }
  for (const f of walk(path.join(dir, 'patterns'), (x) => x.endsWith('.php'))) {
    const t = read(path.join(dir, 'patterns', f));
    if (!/Title:/.test(t) || !/Slug:/.test(t)) out.push(finding('high', 'patterns', `patterns/${f} needs Title: and Slug: in its header comment`));
  }
  // the theme is the look; page text lives in Pages (platforms/wordpress-content.md)
  const front = read(path.join(dir, 'templates/front-page.html'));
  if (front !== null && !/wp:post-content\b/.test(front) && !/wp:query\s+\{[^}]*"inherit":true/.test(front)) out.push(finding('high', 'content', 'templates/front-page.html shows fixed content: WordPress uses it instead of the Home page set in Settings → Reading, so editing that page changes nothing. Show the page (wp:post-content) or delete the file (platforms/wordpress-content.md)'));
  for (const f of walk(path.join(dir, 'templates'), (x) => x.endsWith('.html')).filter((x) => x !== '404.html')) {
    const t = read(path.join(dir, 'templates', f)).replace(/<!--\s*wp:([a-z/-]*no-results)\b[\s\S]*?<!--\s*\/wp:\1\s*-->/g, '');
    const words = [...t.matchAll(/<(h[1-6]|p)\b[^>]*>([^<]*[A-Za-z][^<]*)<\/\1>/g)].map((m) => m[2].trim());
    if (words.length) out.push(finding('medium', 'content', `templates/${f} has fixed text ("${words[0].slice(0, 40)}"): visitors see it on every page using this template and the client cannot edit it in Pages; put page text in the page or a pattern`, 'heuristic'));
  }
  try {
    for (const t of JSON.parse(tj ?? '{}').customTemplates ?? []) if (t.name && !exists(dir, `templates/${t.name}.html`) && !child) out.push(finding('high', 'templates', `theme.json lists custom template "${t.name}" but templates/${t.name}.html does not exist`));
  } catch { /* reported above */ }
  if (woo) {
    // these blocks save HTML; written self-closing they show "invalid content" in the Site Editor (seen in WordPress, 2026-10-26)
    for (const f of walk(path.join(dir, 'templates'), (x) => x.endsWith('.html'))) {
      for (const m of read(path.join(dir, 'templates', f)).matchAll(/<!--\s*wp:woocommerce\/(product-price|product-image|product-details)(?=[\s/])[^>]*\/-->/g)) out.push(finding('high', 'blocks', `templates/${f}: woocommerce/${m[1]} is self-closing, but the block saves HTML; the Site Editor will call it invalid (platforms/woocommerce.md)`));
    }
    const own =['single-product', 'archive-product', 'page-cart', 'page-checkout'].filter((t) => exists(dir, `templates/${t}.html`));
    if (!own.length) out.push(finding('low', 'woocommerce', 'no WooCommerce templates in the theme: the store uses WooCommerce\'s defaults, styled by theme.json', 'manual'));
  }
  out.push(finding('low', 'validator', 'open the theme in WordPress (Playground or wp-env) and check the Site Editor shows no "block contains unexpected content" warnings', 'manual'));
  return out;
}

function ghost(dir) {
  const out = [];
  const pkg = read(path.join(dir, 'package.json'));
  if (!pkg) out.push(finding('high', 'structure', 'package.json is missing; Ghost requires it'));
  else { try { const j = JSON.parse(pkg); for (const k of ['name', 'version']) if (!j[k]) out.push(finding('high', 'package', `package.json lacks "${k}"`)); if (!j.config?.posts_per_page) out.push(finding('low', 'package', 'package.json has no config.posts_per_page (Ghost defaults to 5)')); } catch (e) { out.push(finding('high', 'package', `package.json is not valid JSON (${e.message})`)); } }
  for (const f of ['index.hbs', 'post.hbs']) if (!exists(dir, f)) out.push(finding('high', 'structure', `${f} is missing; Ghost requires it`));
  const all = walk(dir, (f) => f.endsWith('.hbs')).map((f) => read(path.join(dir, f))).join('\n');
  for (const h of ['ghost_head', 'ghost_foot']) if (!new RegExp(`\\{\\{\\s*${h}\\s*\\}\\}`).test(all)) out.push(finding('high', 'helpers', `no {{${h}}} in any template; Ghost needs it for scripts, meta and members`));
  for (const h of ['body_class', 'post_class', 'asset']) if (!new RegExp(`\\{\\{[^}]*\\b${h}\\b`).test(all)) out.push(finding('medium', 'helpers', `no {{${h}}} helper found (the Ghost docs list it as required)`));
  out.push(finding('low', 'validator', 'run gscan (npx gscan <theme folder> or gscan.ghost.org) before upload; this script only checks structure', 'manual'));
  return out;
}

function jekyll(dir) {
  const out = [];
  if (!exists(dir, '_config.yml')) out.push(finding('high', 'structure', '_config.yml is missing'));
  if (!firstOf(dir, ['index.html', 'index.md'])) out.push(finding('high', 'structure', 'no index.html or index.md'));
  const layouts = new Set(walk(path.join(dir, '_layouts'), (f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, '')));
  for (const f of walk(dir, (x) => /\.(html|md)$/.test(x))) {
    const fm = (read(path.join(dir, f)) ?? '').match(/^---\s*\n([\s\S]*?)\n---/);
    const l = fm?.[1].match(/^layout:\s*["']?([\w-]+)/m)?.[1];
    if (l && !layouts.has(l)) out.push(finding('high', 'layouts', `${f} uses layout "${l}" but _layouts/${l}.html does not exist`));
  }
  return out;
}

function hugo(dir) {
  const out = [];
  if (!firstOf(dir, ['hugo.toml', 'hugo.yaml', 'hugo.json', 'config/_default/hugo.toml', 'config.toml'])) out.push(finding('high', 'structure', 'no hugo.toml (or hugo.yaml / hugo.json)'));
  if (exists(dir, 'config.toml') && !exists(dir, 'hugo.toml')) out.push(finding('low', 'structure', 'config.toml still works, but hugo.toml is the current name'));
  const theme = !!walk(path.join(dir, 'themes'), () => true).length;
  if (!theme && !firstOf(dir, ['layouts/home.html', 'layouts/index.html', 'layouts/_default/home.html', 'layouts/_default/index.html', 'layouts/list.html'])) out.push(finding('high', 'layouts', 'no home template (layouts/home.html) and no theme in themes/'));
  if (exists(dir, 'layouts/_default')) out.push(finding('low', 'layouts', 'layouts/_default/ is the pre-0.146 layout; current Hugo puts these files at the layouts/ root', 'heuristic'));
  return out;
}

function astro(dir) {
  const out = [];
  if (!firstOf(dir, ['astro.config.mjs', 'astro.config.ts', 'astro.config.js'])) out.push(finding('high', 'structure', 'no astro.config.mjs'));
  if (!walk(path.join(dir, 'src/pages'), (f) => /\.(astro|md|mdx|html)$/.test(f)).length) out.push(finding('high', 'structure', 'src/pages/ has no pages'));
  const w = firstOf(dir, ['wrangler.jsonc', 'wrangler.json', 'wrangler.toml']);
  if (!w) out.push(finding('medium', 'cloudflare', 'no wrangler.jsonc: needed to deploy to Cloudflare Workers (see platforms/astro.md)'));
  else if (!/assets/.test(read(path.join(dir, w)))) out.push(finding('medium', 'cloudflare', `${w} has no assets directory (set "assets": { "directory": "./dist" })`));
  return out;
}

function nextjs(dir) {
  const out = [];
  const pkg = read(path.join(dir, 'package.json')) ?? '';
  if (!/"next"\s*:/.test(pkg)) out.push(finding('high', 'structure', 'package.json does not depend on next'));
  if (!firstOf(dir, ['app/page.tsx', 'app/page.jsx', 'app/page.js', 'src/app/page.tsx', 'src/app/page.jsx', 'src/app/page.js', 'pages/index.tsx', 'pages/index.jsx', 'pages/index.js'])) out.push(finding('high', 'structure', 'no home page (app/page.tsx)'));
  return out;
}

const CHECKERS = { static: staticSite, php: phpSite, shopify, wordpress: (d) => wordpress(d), woocommerce: (d) => wordpress(d, true), ghost, jekyll, hugo, astro, nextjs };

export function checkPlatform(dir, id) {
  const platform = id ?? detect(dir);
  if (!platform) return { dir, platform: null, findings: [finding('high', 'structure', 'could not tell which platform this is; pass --platform <id>')] };
  if (!CHECKERS[platform]) throw new Error(`unknown platform ${platform}; one of ${Object.keys(PLATFORMS).join(', ')}`);
  return { dir, platform, findings: [...CHECKERS[platform](dir), ...common(dir)] };
}

// Copies templates/platforms/<id> into out, filling {{name}} and {{slug}}. Never overwrites a file that exists.
export function scaffold(skillDir, id, out, name) {
  const p = PLATFORMS[id];
  if (!p) throw new Error(`unknown platform ${id}; one of ${Object.keys(PLATFORMS).join(', ')}`);
  if (p.scaffold === 'generator') return { platform: id, generator: GENERATORS[id].map((s) => s.replace('<name>', name)), written: [], kept: [] };
  const slug = String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'site';
  const written = []; const kept = [];
  // the platform's own files first, then its base (woocommerce on wordpress); a file already written is never replaced
  for (const layer of [id, p.base].filter(Boolean)) {
    const src = path.join(skillDir, 'templates', 'platforms', layer);
    for (const rel of walk(src, () => true, src, true)) {
      const dst = path.join(out, rel);
      if (fs.existsSync(dst)) { if (!written.includes(rel)) kept.push(rel); continue; }
      mkdirp(path.dirname(dst));
      fs.writeFileSync(dst, fs.readFileSync(path.join(src, rel), 'utf8').replaceAll('{{name}}', name).replaceAll('{{slug}}', slug));
      written.push(rel);
    }
  }
  return { platform: id, written, kept };
}

export async function platform(pos, opt, skillDir) {
  const [sub, arg] = pos;
  if (sub === 'list' || !sub) {
    for (const [id, p] of Object.entries(PLATFORMS)) console.log(`${id.padEnd(12)} ${p.name.padEnd(32)} ${p.kinds}  ·  ${p.host}`);
    if (!sub) console.log('\nplatform list | scaffold <id> [--out dir] [--name "Site name"] | check [dir] [--platform id] [--json out.json] | content [dir] [--out dir] [--site url] [--theme dir]');
    return;
  }
  if (sub === 'content') { const { wpContent } = await import('./wpcontent.mjs'); return wpContent(arg ?? 'content', opt); }
  if (sub === 'scaffold') {
    if (!arg) throw new Error('platform scaffold <id> [--out dir] [--name "Site name"]');
    const out = opt.out && opt.out !== true ? String(opt.out) : '.';
    const r = scaffold(skillDir, arg, out, opt.name && opt.name !== true ? String(opt.name) : path.basename(path.resolve(out)));
    if (r.generator) { console.log(`${PLATFORMS[arg].name} starts from the official generator (ask the user before installing):`); r.generator.forEach((s) => console.log(`  ${s}`)); return; }
    r.written.forEach((f) => console.log(`create ${f}`)); r.kept.forEach((f) => console.log(`keep   ${f}`));
    return;
  }
  if (sub === 'check') {
    const dir = arg ?? '.';
    if (opt.platform !== undefined && (opt.platform === true || !PLATFORMS[opt.platform])) throw new Error(`--platform must be one of ${Object.keys(PLATFORMS).join(', ')}`);
    const r = checkPlatform(dir, opt.platform);
    if (opt.json && opt.json !== true) fs.writeFileSync(String(opt.json), JSON.stringify(r, null, 2));
    console.log(`${r.platform ?? 'unknown platform'}: ${dir}`);
    for (const f of r.findings) console.log(`  ${f.sev.padEnd(7)} ${f.check.padEnd(13)} ${f.msg}${f.basis === 'measured' ? '' : `  [${f.basis}]`}`);
    if (r.findings.some((f) => f.sev === 'high')) process.exitCode = 1;
    return;
  }
  throw new Error('platform list | scaffold <id> | check [dir] | content [dir]');
}
