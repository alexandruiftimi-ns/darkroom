// Import an existing site the user owns: a live URL, or the root folder of a local site. Extracts the texts in reading
// order, navigation, contact details and the images (with their real sizes), so a redesign starts from the owner's own
// content. Writes .darkroom/import/: CONTENT.md (for people), content.json, images.json, url-map.json, images/.
// It never rewrites the texts and never rejects an image: it notes what could be better.
import fs from 'node:fs';
import path from 'node:path';
import { launch, mkdirp } from './browser.mjs';
import { resolveTarget } from './serve.mjs';
import { dismissConsent } from './consent.mjs';
import { detect } from './platforms.mjs';

const SKIP_EXT = /\.(pdf|zip|rar|7z|gz|jpe?g|png|gif|webp|avif|svg|ico|mp4|webm|mov|mp3|wav|ogg|docx?|xlsx?|pptx?|csv|xml|json|txt|css|js)$/i;
const THEMES = { wordpress: 'WordPress', woocommerce: 'WooCommerce', shopify: 'Shopify', ghost: 'Ghost' };
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'home';

// ---- in the page: everything a redesign needs, in reading order ----
function extractPage() {
  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const visible = (el) => { const s = getComputedStyle(el); return s.display !== 'none' && s.visibility !== 'hidden' && el.getClientRects().length > 0; };
  const meta = (n) => document.querySelector(`meta[name="${n}"],meta[property="${n}"]`)?.content ?? '';
  const chrome = 'nav,header,footer,[role=navigation],[role=banner],[role=contentinfo]';
  const skip = 'script,style,noscript,template,nav,[role=navigation],[aria-label*=breadcrumb i],[class*=breadcrumb i],[aria-hidden=true],[role=dialog],[aria-modal=true],[data-dr-consent],[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i]';
  const BLOCK = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,td,th,dt,dd,label,summary,address';
  const collect = (root, outside) => {
    const out = []; const seen = new Set();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement;
      if (!el || el.closest(skip) || el.closest('form') || (outside && el.closest(outside)) || !visible(el)) continue;
      const host = el.closest('tr') ?? el.closest(BLOCK) ?? el.closest('button,a') ?? el;
      if (seen.has(host)) continue;
      seen.add(host);
      const text = host.tagName === 'TR' ? [...host.cells].map((c) => clean(c.innerText)).filter(Boolean).join(' · ') : clean(host.innerText);
      if (!text || out.some((b) => b.text === text)) continue;
      out.push({ tag: host.tagName.toLowerCase(), text });
    }
    return out;
  };
  const main = document.querySelector('main,[role=main]');
  const blocks = collect(main ?? document.body, main ? null : chrome);
  const footerEl = document.querySelector('footer,[role=contentinfo]');
  const footer = footerEl ? collect(footerEl, null) : [];
  const nav = [...document.querySelectorAll('nav a, header a, [role=navigation] a')].filter(visible)
    .map((a) => ({ text: clean(a.innerText || a.getAttribute('aria-label')), href: a.href })).filter((x) => x.text);
  const inChrome = (el) => (el.closest('header,[role=banner]') ? 'header' : el.closest('footer,[role=contentinfo]') ? 'footer' : 'content');
  const images = [...document.images].map((i) => ({
    src: i.currentSrc || i.src, alt: i.getAttribute('alt'), width: i.naturalWidth, height: i.naturalHeight,
    shownWidth: Math.round(i.getBoundingClientRect().width), where: inChrome(i),
    logo: /logo/i.test(`${i.alt} ${i.src} ${i.className} ${i.id}`),
  })).filter((i) => i.src && !i.src.startsWith('data:'));
  const backgrounds = [...document.querySelectorAll('body *')].filter((el) => el.getBoundingClientRect().width >= 300)
    .map((el) => ({ m: /url\(["']?([^"')]+)["']?\)/.exec(getComputedStyle(el).backgroundImage), w: Math.round(el.getBoundingClientRect().width), where: inChrome(el) }))
    .filter((x) => x.m && !x.m[1].startsWith('data:')).map((x) => ({ src: new URL(x.m[1], location.href).href, shownWidth: x.w, where: x.where, background: true }));
  const videos = [...document.querySelectorAll('video')].map((v) => v.currentSrc || v.src || v.querySelector('source')?.src).filter(Boolean);
  const text = document.body.innerText;
  const emails = [...new Set([...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.href.slice(7).split('?')[0]).concat(text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/g) ?? []))];
  const phones = [...new Set([...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.href.slice(4)))];
  const social = [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => /(instagram|facebook|tiktok|youtube|linkedin|twitter|x\.com|pinterest|threads|behance|dribbble)\./i.test(h)))];
  const forms = [...document.querySelectorAll('form')].map((f) => ({ action: f.getAttribute('action') ?? '', fields: [...f.querySelectorAll('input,select,textarea')].filter((x) => x.type !== 'hidden').map((x) => clean(x.labels?.[0]?.innerText) || x.name || x.placeholder || x.type) }));
  const links = [...document.querySelectorAll('a[href]')].map((a) => a.href);
  // what the site is built with: platform, theme, page builder, translation plugin (signs in the HTML; a lead, not proof)
  // elements on the page and the files it loads, never stylesheet text (themes style other builders' class names)
  const gen = meta('generator');
  const files = [...document.querySelectorAll('script[src],link[href]')].map((e) => e.src || e.href).join(' ');
  const el = (sel) => !!document.querySelector(sel);
  const platform = /wordpress/i.test(gen) || /\/wp-content\//.test(files) ? (/\/plugins\/woocommerce\//.test(files) ? 'woocommerce' : 'wordpress')
    : /cdn\.shopify\.com/.test(files) || !!window.Shopify ? 'shopify' : /ghost/i.test(gen) ? 'ghost'
    : /wixstatic\.com|parastorage\.com/.test(files) ? 'wix' : /squarespace(-cdn)?\.com/.test(files) ? 'squarespace' : el('html[data-wf-site]') ? 'webflow' : /framerusercontent\.com/.test(files) ? 'framer' : null;
  const builders = [['.elementor-section,.elementor-element,[data-elementor-type]', 'Elementor'], ['.et_pb_section', 'Divi'], ['[class*="wp-block-kadence"],[class*="kb-row-layout"]', 'Kadence Blocks'], ['.fl-builder-content', 'Beaver Builder'], ['.vc_row,.wpb_row', 'WPBakery'], ['[class*="brxe-"]', 'Bricks'], ['[class*="ct-section"],.oxy-header', 'Oxygen'], ['[class*="wp-block-"]', 'block editor (Gutenberg)']].filter(([sel]) => el(sel)).map(([, n]) => n);
  const translation = [[/\/translatepress/, '[class*="trp-"]', 'TranslatePress'], [/\/sitepress-multilingual/, '.wpml-ls', 'WPML'], [/\/polylang/, '.lang-item', 'Polylang'], [/weglot/, '.weglot-container', 'Weglot']].filter(([re, sel]) => re.test(files) || el(sel)).map(([, , n]) => n);
  const stack = { platform, generator: gen, theme: /\/wp-content\/themes\/([\w-]+)/.exec(files)?.[1] ?? window.Shopify?.theme?.name ?? null, builders, translation };
  return {
    title: document.title, description: meta('description'), ogImage: meta('og:image'), lang: document.documentElement.lang,
    canonical: document.querySelector('link[rel=canonical]')?.href ?? '', blocks, footer, nav, images, backgrounds, videos,
    contacts: { emails, phones }, social, forms, links, stack, words: (main ?? document.body).innerText.split(/\s+/).filter(Boolean).length,
  };
}

async function robotsRules(origin) {
  try {
    const r = await fetch(`${origin}/robots.txt`, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) return [];
    const rules = []; let applies = false;
    for (const line of (await r.text()).split(/\r?\n/)) {
      const [k, ...v] = line.split(':'); const key = k.trim().toLowerCase(); const val = v.join(':').trim();
      if (key === 'user-agent') applies = val === '*';
      else if (key === 'disallow' && applies && val) rules.push(val);
    }
    return rules;
  } catch { return []; }
}

async function crawl(startUrl, { max, only, respectRobots }) {
  const start = new URL(startUrl);
  const disallow = respectRobots ? await robotsRules(start.origin) : [];
  const allowed = (u) => !disallow.some((d) => u.pathname.startsWith(d));
  const norm = (u) => { const x = new URL(u); x.hash = ''; if (x.pathname.endsWith('/index.html')) x.pathname = x.pathname.slice(0, -10); return x.href; };
  const queue = only?.length ? only.map((p) => norm(new URL(p, start))) : [norm(start)];
  const seen = new Set(queue); const pages = []; const skipped = [];
  const browser = await launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  try {
    while (queue.length && pages.length < max) {
      const url = queue.shift(); const u = new URL(url);
      if (!allowed(u)) { skipped.push({ url, why: 'robots.txt disallows it' }); continue; }
      let res;
      try { res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); } catch (e) { skipped.push({ url, why: e.message.split('\n')[0] }); continue; }
      if (!res || !/text\/html/.test(res.headers()['content-type'] ?? 'text/html') || res.status() >= 400) { skipped.push({ url, why: `HTTP ${res?.status() ?? '?'}` }); continue; }
      await page.waitForLoadState('networkidle', { timeout: 6000 }).catch(() => {});
      const consent = await dismissConsent(page);
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(400);
      const finalUrl = norm(page.url());
      if (pages.some((p) => p.url === finalUrl)) continue; // two addresses that redirect to the same page
      seen.add(finalUrl);
      const data = await page.evaluate(extractPage);
      pages.push({ url: finalUrl, path: new URL(finalUrl).pathname, consent: consent.action, ...data });
      if (!only?.length) {
        for (const l of data.links) {
          let x; try { x = new URL(l); } catch { continue; }
          if (x.origin !== start.origin || SKIP_EXT.test(x.pathname) || /^(mailto|tel|javascript):/.test(l)) continue;
          const n = norm(x.href.split('?')[0]);
          if (!seen.has(n)) { seen.add(n); queue.push(n); }
        }
      }
    }
  } finally { await browser.close(); }
  return { pages, skipped, notCrawled: queue.length, disallow };
}

// ---- source files (PHP, Markdown, templates): read, not run ----
function readSourcePages(root) {
  const files = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.') || ['node_modules', 'vendor', 'dist', 'public', '_site', 'out', 'resources', 'layouts', '_layouts', '_includes', 'partials', 'includes', 'themes'].includes(e.name)) continue;
      const f = path.join(d, e.name);
      if (e.isDirectory()) walk(f); else if (/\.(php|html?|md|mdx)$/i.test(e.name)) files.push(f);
    }
  })(root);
  // files other files include (header.php, footer.php) are parts, not pages
  const included = new Set(files.flatMap((f) => [...fs.readFileSync(f, 'utf8').matchAll(/\b(?:include|require)(?:_once)?\s*\(?\s*(?:__DIR__\s*\.\s*)?['"]\/?([^'"]+\.php)['"]/g)].map((m) => path.resolve(path.dirname(f), m[1]))));
  const pagesOnly = files.filter((f) => !included.has(path.resolve(f)));
  const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;|&rsquo;/g, "'");
  const strip = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  return pagesOnly.map((f) => {
    let raw = fs.readFileSync(f, 'utf8');
    const rel = path.relative(root, f).split(path.sep).join('/');
    const fm = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
    const title = fm?.[1].match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] ?? strip(raw.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '') ?? '';
    if (fm) raw = raw.slice(fm[0].length);
    raw = raw.replace(/<\?(?:php|=)?[\s\S]*?(?:\?>|$)/g, ' ').replace(/<(script|style|noscript|template)[\s\S]*?<\/\1>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ');
    const blocks = []; const images = [];
    if (/\.mdx?$/i.test(f)) {
      for (const line of raw.split(/\r?\n/)) {
        const t = line.trim(); if (!t) continue;
        for (const m of t.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)) images.push({ src: m[2], alt: m[1] });
        const h = t.match(/^(#{1,6})\s+(.*)/);
        const text = strip(t.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/^[-*+]\s+|^\d+\.\s+|^>\s*/, '').replace(/[*_`]/g, ''));
        if (text) blocks.push({ tag: h ? `h${h[1].length}` : /^[-*+]\s|^\d+\.\s/.test(t) ? 'li' : 'p', text: h ? strip(h[2]) : text });
      }
    } else {
      for (const m of raw.matchAll(/<(h[1-6]|p|li|blockquote|figcaption|td|th|dt|dd|label|button|address)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
        const text = strip(m[2]); if (text && !blocks.some((b) => b.text === text)) blocks.push({ tag: m[1].toLowerCase(), text });
      }
      for (const m of raw.matchAll(/<img\b[^>]*>/gi)) images.push({ src: m[0].match(/src=["']([^"']+)/i)?.[1], alt: m[0].match(/alt=["']([^"']*)/i)?.[1] ?? null });
    }
    const p = '/' + rel.replace(/(^|\/)index\.(php|html?|mdx?)$/i, '$1').replace(/\.(mdx?)$/i, '/');
    const resolved = images.filter((i) => i.src && !/^(https?:|data:|\{|<)/.test(i.src)).map((i) => ({ ...i, file: path.join(i.src.startsWith('/') ? root : path.dirname(f), i.src.replace(/^\//, '')) }));
    return { url: rel, path: p, file: rel, title: strip(title) || blocks.find((b) => b.tag === 'h1')?.text || '', description: '', blocks, footer: [], nav: [], images: resolved.map((i) => ({ src: i.src, alt: i.alt, file: i.file, where: 'content' })), backgrounds: [], videos: [], contacts: { emails: [...new Set(raw.match(/[\w.+-]+@[\w-]+\.[\w.-]+/g) ?? [])], phones: [] }, social: [], forms: [], words: blocks.reduce((s, b) => s + b.text.split(/\s+/).length, 0) };
  });
}

async function sizeLocalImages(root, list) {
  const files = list.filter((i) => i.file && fs.existsSync(i.file));
  if (!files.length) return;
  const served = await resolveTarget(root);
  const browser = await launch();
  try {
    const page = await browser.newPage(); await page.goto(served.url);
    for (const i of files) {
      const rel = path.relative(root, i.file).split(path.sep).map(encodeURIComponent).join('/');
      Object.assign(i, await page.evaluate(async (u) => { const im = new Image(); im.src = u; try { await im.decode(); return { width: im.naturalWidth, height: im.naturalHeight }; } catch { return { width: 0, height: 0 }; } }, '/' + rel));
    }
  } finally { await browser.close(); await served.close(); }
}

// Suggestions, never verdicts: the owner decides whether "could be better" matters.
export function imageNotes(i) {
  const notes = [];
  if (i.width && i.shownWidth >= 1000 && i.width < 2400) notes.push(`${i.width} px wide: fine where it was, but soft as a full-width picture on large screens (≥ 2400 px would be sharp)`);
  else if (i.width && i.shownWidth >= 400 && i.width < i.shownWidth * 1.5) notes.push(`${i.width} px for a ${i.shownWidth} px spot: a version ≥ ${i.shownWidth * 2} px wide would look crisper on sharp screens`);
  else if (i.width && !i.shownWidth && i.width < 1200) notes.push(`${i.width} px wide: fine for small spots, soft as a large picture`);
  if (i.logo && /\.(png|jpe?g|webp|gif)(\?|$)/i.test(i.src ?? '')) notes.push('logo is a pixel image: an SVG version stays sharp at every size');
  if (i.alt === null || i.alt === undefined) notes.push('no description (alt text): Darkroom will write one');
  return notes;
}

async function saveImages(all, dir) {
  mkdirp(dir);
  const done = new Map(); const used = new Set();
  for (const i of all) {
    const key = i.file ?? i.src;
    if (done.has(key)) { i.saved = done.get(key); continue; }
    let base = slug(path.basename(decodeURIComponent((i.file ?? new URL(i.src).pathname)).replace(/\.[^.]+$/, ''))) || 'image';
    const ext = (path.extname(i.file ?? new URL(i.src).pathname).toLowerCase().match(/^\.(jpe?g|png|webp|avif|gif|svg)$/) ?? ['.jpg'])[0];
    let name = base + ext; for (let n = 2; used.has(name); n++) name = `${base}-${n}${ext}`;
    try {
      if (i.file) fs.copyFileSync(i.file, path.join(dir, name));
      else {
        const r = await fetch(i.src, { signal: AbortSignal.timeout(30000) });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const buf = Buffer.from(await r.arrayBuffer());
        if (buf.length > 25 * 1048576) throw new Error('over 25 MB, skipped');
        fs.writeFileSync(path.join(dir, name), buf);
      }
      used.add(name); i.saved = `images/${name}`; i.bytes = fs.statSync(path.join(dir, name)).size;
    } catch (e) { i.saved = null; i.error = e.message; }
    done.set(key, i.saved);
  }
}

// the signs from every page together; a sentence for people
function stackOf(pages) {
  const all = pages.map((p) => p.stack).filter(Boolean);
  if (!all.length) return null;
  const uniq = (k) => [...new Set(all.flatMap((x) => x[k] ?? []))];
  return { platform: all.find((x) => x.platform)?.platform ?? null, generator: all.find((x) => x.generator)?.generator || null, theme: all.find((x) => x.theme)?.theme ?? null, builders: uniq('builders'), translation: uniq('translation') };
}
const stackLine = (st) => !st ? '' : [st.platform ? `platform: ${st.platform}${st.generator ? ` (${st.generator})` : ''}` : 'platform: not recognised', st.theme && `theme: ${st.theme}`, `page builder: ${st.builders.length ? st.builders.join(', ') : 'none seen'}`, st.translation.length && `translation: ${st.translation.join(', ')}`].filter(Boolean).join(' · ');

function writeOutputs(out, src, pages, opts, extra) {
  mkdirp(out);
  const images = []; const byKey = new Map();
  for (const p of pages) for (const i of [...p.images, ...p.backgrounds]) {
    const key = i.file ?? i.src;
    if (!byKey.has(key)) { const rec = { ...i, pages: [p.path], notes: [] }; byKey.set(key, rec); images.push(rec); }
    else { const r = byKey.get(key); r.pages.push(p.path); r.shownWidth = Math.max(r.shownWidth ?? 0, i.shownWidth ?? 0); }
  }
  for (const i of images) i.notes = imageNotes(i);
  const navAll = pages[0]?.nav ?? [];
  const contacts = { emails: [...new Set(pages.flatMap((p) => p.contacts.emails))], phones: [...new Set(pages.flatMap((p) => p.contacts.phones))], social: [...new Set(pages.flatMap((p) => p.social))] };
  const urlMap = pages.map((p) => ({ old: p.path, new: p.path, title: p.title }));
  fs.writeFileSync(path.join(out, 'content.json'), JSON.stringify({ schema: 'darkroom-import-v1', source: src, importedAt: new Date().toISOString(), mode: extra.mode, take: opts.take, stack: stackOf(pages), pages: pages.map(({ links, stack, ...p }) => p), contacts, skipped: extra.skipped, notCrawled: extra.notCrawled }, null, 2));
  fs.writeFileSync(path.join(out, 'images.json'), JSON.stringify(images, null, 2));
  fs.writeFileSync(path.join(out, 'url-map.json'), JSON.stringify({ note: 'Keep these addresses on the new site, or redirect each old one to its new address, so search rankings and shared links survive (commands/import.md).', pages: urlMap }, null, 2));
  const L = [];
  L.push(`# Content imported from ${src}`, '', `Imported ${new Date().toISOString().slice(0, 10)} · ${pages.length} page(s) · texts: ${opts.take.includes('text') ? 'yes' : 'no'} · images: ${opts.take.includes('images') ? `yes (${images.filter((i) => i.saved).length} saved in images/)` : 'listed, not saved'}`);
  if (extra.mode === 'source') L.push('', '> Read from the files, not run: anything the server or a database adds (prices, posts, opening hours from a plugin) is missing.');
  L.push('', 'These are the owner\'s words. Keep them; propose edits, never replace them silently.', '');
  if (stackOf(pages)) L.push('## Built with', '', stackLine(stackOf(pages)) + ' (signs in the HTML: confirm with the user; commands/import.md)', '');
  if (navAll.length) { L.push('## Navigation', ''); for (const n of navAll) L.push(`- ${n.text} → ${n.href.replace(/^https?:\/\/[^/]+/, '')}`); L.push(''); }
  if (contacts.emails.length || contacts.phones.length || contacts.social.length) { L.push('## Contact details found', ''); for (const e of contacts.emails) L.push(`- email: ${e}`); for (const p of contacts.phones) L.push(`- phone: ${p}`); for (const s of contacts.social) L.push(`- ${s}`); L.push(''); }
  for (const p of pages) {
    L.push(`## ${p.title || '(no title)'}  ·  \`${p.path}\``, '');
    if (p.description) L.push(`*Description:* ${p.description}`, '');
    if (opts.take.includes('text')) {
      for (const b of p.blocks) L.push(/^h[1-6]$/.test(b.tag) ? `${'#'.repeat(Math.min(6, Number(b.tag[1]) + 2))} ${b.text}` : b.tag === 'li' ? `- ${b.text}` : b.text, ...(b.tag === 'li' ? [] : ['']));
      if (p.footer.length) L.push('', `*Footer:* ${p.footer.map((b) => b.text).join(' · ')}`, '');
    } else L.push(`(${p.words} words; texts not imported)`, '');
    if (p.forms.length) L.push(`*Forms:* ${p.forms.map((f) => f.fields.join(', ')).join(' | ')}`, '');
    L.push('');
  }
  if (images.length) {
    L.push('## Images', '', '| Image | Size | Used on | Could be better |', '|---|---|---|---|');
    for (const i of images) L.push(`| ${i.saved ?? i.src} | ${i.width ? `${i.width}×${i.height}` : '?'} | ${[...new Set(i.pages)].join(', ')} | ${i.notes.join('; ') || 'fine'} |`);
    L.push('');
  }
  if (extra.skipped?.length) { L.push('## Not imported', ''); for (const s of extra.skipped) L.push(`- ${s.url}: ${s.why}`); L.push(''); }
  fs.writeFileSync(path.join(out, 'CONTENT.md'), L.join('\n'));
  return { images, contacts };
}

// Never let an empty import turn into a one-page build: say why and what to do.
function nothingFound(skipped) {
  if (skipped.some((s) => /robots\.txt/.test(s.why))) return "nothing imported: the site's robots.txt blocks crawlers like this one (often everyone except Google and Bing). If it is the user's own site, ask, then re-run with --ignore-robots. Do not build from the home page alone.";
  return 'nothing imported: no page could be read (see "skipped" above). Tell the user why and ask for another way in (a folder, an export, the page texts). Do not build from the home page alone.';
}

export async function importSite(src, opt) {
  if (!src) throw new Error('darkroom import <url|folder> [--list] [--pages /,/about] [--take text,images] [--max 40] [--ignore-robots] [--out .darkroom/import]');
  const out = opt.out && opt.out !== true ? String(opt.out) : '.darkroom/import';
  const max = Number(opt.max ?? 40);
  const take = String(opt.take && opt.take !== true ? opt.take : 'text,images').split(',').map((s) => s.trim());
  // page paths: "/about", "about.html" or "home". Git Bash on Windows turns a leading "/" into "C:/Program Files/Git/": undo it.
  const only = opt.pages && opt.pages !== true ? String(opt.pages).split(',').map((s) => s.trim()).filter(Boolean)
    .map((s) => s.replace(/^[A-Za-z]:[\\/].*?[\\/]Git(?=[\\/]|$)/i, '').replace(/\\/g, '/'))
    .map((s) => (/^(home|index)$/i.test(s) || s === '' ? '/' : s.startsWith('/') ? s : '/' + s)) : null;
  let pages; let extra = { skipped: [], notCrawled: 0, mode: 'crawl' }; let label = src; let platform = null;

  if (/^https?:\/\//i.test(src)) {
    // --ignore-robots: only for the user's own site, after they said so (commands/import.md)
    const r = await crawl(src, { max, only, respectRobots: !opt['ignore-robots'] });
    pages = r.pages; extra = { ...extra, skipped: r.skipped, notCrawled: r.notCrawled };
  } else {
    const root = path.resolve(src);
    if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) throw new Error(`not a folder: ${src}`);
    platform = detect(root);
    if (THEMES[platform]) {
      console.log(`This folder is a ${THEMES[platform]} theme. Its texts, images${platform === 'shopify' || platform === 'woocommerce' ? ' and products' : ''} live in the ${THEMES[platform]} database, not in these files.\nImport from the live site instead: darkroom import https://your-site.example`);
      process.exitCode = 2; return null;
    }
    const built = ['public', '_site', 'dist', 'out', 'build'].map((d) => path.join(root, d)).find((d) => fs.existsSync(path.join(d, 'index.html')));
    const crawlRoot = platform === 'static' ? root : built;
    if (crawlRoot) {
      const served = await resolveTarget(crawlRoot);
      try {
        const r = await crawl(served.url, { max, only, respectRobots: false });
        const prefix = new URL(served.url).origin;
        pages = r.pages.map((p) => ({ ...p, url: p.url.replace(prefix, ''), nav: p.nav.map((n) => ({ ...n, href: n.href.replace(prefix, '') })), images: p.images.map((i) => ({ ...i, file: i.src.startsWith(prefix) ? path.join(crawlRoot, decodeURIComponent(new URL(i.src).pathname)) : undefined })), backgrounds: p.backgrounds.map((i) => ({ ...i, file: i.src.startsWith(prefix) ? path.join(crawlRoot, decodeURIComponent(new URL(i.src).pathname)) : undefined })) }));
        extra = { ...extra, skipped: r.skipped.map((s) => ({ ...s, url: s.url.replace(prefix, '') })), notCrawled: r.notCrawled };
      } finally { await served.close(); }
      label = crawlRoot;
    } else {
      pages = readSourcePages(root).filter((p) => !only || only.includes(p.path)).slice(0, max);
      await sizeLocalImages(root, pages.flatMap((p) => p.images));
      extra.mode = 'source';
    }
  }

  if (opt.list) {
    mkdirp(out);
    const list = pages.map((p) => ({ path: p.path, title: p.title, words: p.words, images: p.images.length + p.backgrounds.length }));
    fs.writeFileSync(path.join(out, 'pages.json'), JSON.stringify({ source: src, mode: extra.mode, platform, stack: stackOf(pages), pages: list, notCrawled: extra.notCrawled, skipped: extra.skipped }, null, 2));
    console.log(`${list.length} page(s) found in ${label}${platform ? ` (${platform})` : ''}${extra.notCrawled ? `; ${extra.notCrawled} more not visited (raise --max)` : ''}:`);
    for (const p of list) console.log(`  ${p.path.padEnd(32)} ${String(p.words).padStart(5)} words  ${String(p.images).padStart(3)} images  ${p.title}`);
    for (const s of extra.skipped) console.log(`  skipped ${s.url}: ${s.why}`);
    if (stackOf(pages)) console.log(`built with: ${stackLine(stackOf(pages))}`);
    if (!list.length) console.log(nothingFound(extra.skipped));
    return list;
  }
  if (!pages.length) throw new Error(nothingFound(extra.skipped));

  if (take.includes('images')) {
    const all = pages.flatMap((p) => [...p.images, ...p.backgrounds]);
    await saveImages(all, path.join(out, 'images'));
  }
  const { images, contacts } = writeOutputs(out, src, pages, { take }, extra);
  console.log(`imported ${pages.length} page(s) from ${label}${extra.mode === 'source' ? ' (read from the files, not run)' : ''} → ${path.join(out, 'CONTENT.md')}`);
  console.log(`  texts: ${take.includes('text') ? pages.reduce((s, p) => s + p.blocks.length, 0) + ' blocks' : 'not imported'} · images: ${images.length} (${images.filter((i) => i.saved).length} saved) · ${images.filter((i) => i.notes.length).length} with suggestions`);
  if (stackOf(pages)) console.log(`  built with: ${stackLine(stackOf(pages))}`);
  console.log(`  contact details: ${contacts.emails.length} email, ${contacts.phones.length} phone, ${contacts.social.length} social link(s)`);
  if (extra.notCrawled) console.log(`  ${extra.notCrawled} more page(s) not visited: raise --max or pass --pages`);
  return { pages, images };
}
