// WordPress content: turns a folder of block-markup pages and posts into what the user loads into their own WordPress.
// paste/<slug>.html for the Code editor (replace a page, keep its address) and content.xml (WXR 1.2) for Tools → Import.
// The theme stays the look; this is the content (platforms/wordpress-content.md). Structure is measured here;
// a real import is not: run it in Playground or on a staging site.
import fs from 'node:fs';
import path from 'node:path';
import { mkdirp } from './browser.mjs';
import { blockBalance } from './platforms.mjs';

const cdata = (s) => `<![CDATA[${String(s ?? '').replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const slugify = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const stamp = (d) => { const t = d ? new Date(d) : new Date(); return Number.isNaN(t.getTime()) ? null : t.toISOString().slice(0, 19).replace('T', ' '); };

// content.json: { site, siteUrl, theme, status, pages: [{ file, title, slug, template, parent, front, order }],
//   posts: [{ file, title, slug, date, categories, excerpt, image }], images: [{ file, alt }] }
// Block files write image addresses as {{images}}/name.jpg; they resolve to <siteUrl>/wp-content/themes/<theme>/assets/images.
export function buildContent(dir, opt = {}) {
  const manifestPath = path.join(dir, 'content.json');
  if (!fs.existsSync(manifestPath)) throw new Error(`${manifestPath} is missing (see platforms/wordpress-content.md, "Building the content")`);
  const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const siteUrl = String(opt.site && opt.site !== true ? opt.site : m.siteUrl ?? '').replace(/\/$/, '');
  let theme = m.theme;
  if (opt.theme && opt.theme !== true) theme = path.basename(path.resolve(String(opt.theme)));
  const images = siteUrl && theme ? `${siteUrl}/wp-content/themes/${theme}/assets/images` : null;
  const status = ['draft', 'publish', 'pending', 'private'].includes(m.status) ? m.status : 'draft';
  const problems = []; const items = []; const seen = new Map(); let id = 100;

  const attachments = (m.images ?? []).map((img) => ({ ...img, id: ++id, url: images ? `${images}/${img.file}` : null }));
  const imageId = new Map(attachments.map((a) => [a.file, a.id]));
  if (attachments.length && !images) problems.push('images are listed but the address is unknown: pass --site https://their-site and --theme <theme folder> (or set siteUrl and theme in content.json)');

  for (const [type, list] of [['page', m.pages ?? []], ['post', m.posts ?? []]]) {
    for (const e of list) {
      const file = path.join(dir, e.file ?? '');
      if (!e.file || !fs.existsSync(file)) { problems.push(`${type} "${e.title ?? e.file}": file ${e.file} not found`); continue; }
      let body = fs.readFileSync(file, 'utf8').trim();
      for (const err of blockBalance(body)) problems.push(`${e.file}: ${err}`);
      if (/\{\{images\}\}/.test(body)) { if (images) body = body.replaceAll('{{images}}', images); else problems.push(`${e.file} uses {{images}} but the site address is unknown (--site)`); }
      const left = body.match(/\{\{\w+\}\}/); if (left) problems.push(`${e.file}: ${left[0]} is not filled in`);
      if (/\bplaceholder\b|lorem ipsum/i.test(body)) problems.push(`${e.file} still has placeholder text; real copy goes live`);
      const slug = e.slug ? slugify(e.slug) : slugify(e.title ?? path.basename(e.file, '.html'));
      const key = `${type}:${slug}`;
      if (seen.has(key)) problems.push(`two ${type}s use the address "${slug}"`);
      seen.set(key, ++id);
      const date = stamp(e.date);
      if (!date) problems.push(`${e.file}: date "${e.date}" is not a date`);
      if (e.image && !imageId.has(e.image)) problems.push(`${e.file}: featured image ${e.image} is not in "images"`);
      items.push({ ...e, type, slug, id, body, date: date ?? stamp() });
    }
  }
  const fronts = items.filter((i) => i.type === 'page' && i.front);
  if (fronts.length > 1) problems.push(`${fronts.length} pages are marked "front"; only one can be the home page`);
  for (const p of items.filter((i) => i.parent)) if (!seen.has(`page:${slugify(p.parent)}`)) problems.push(`${p.file}: parent page "${p.parent}" is not in this content`);
  if (opt.theme && opt.theme !== true) {
    const td = String(opt.theme);
    for (const i of items) if (i.template && !fs.existsSync(path.join(td, 'templates', `${i.template}.html`))) problems.push(`${i.file} asks for template "${i.template}", which the theme does not have`);
  }

  const cats = [...new Set(items.flatMap((i) => i.categories ?? []))];
  const now = stamp();
  const item = (i) => [
    '<item>',
    `<title>${cdata(i.title)}</title>`,
    `<link>${esc(`${siteUrl}/${i.slug}/`)}</link>`,
    `<pubDate>${new Date(i.date.replace(' ', 'T') + 'Z').toUTCString()}</pubDate>`,
    `<dc:creator>${cdata('darkroom')}</dc:creator>`,
    `<guid isPermaLink="false">${esc(`${siteUrl}/?p=${i.id}`)}</guid>`,
    '<description></description>',
    `<content:encoded>${cdata(i.body)}</content:encoded>`,
    `<excerpt:encoded>${cdata(i.excerpt)}</excerpt:encoded>`,
    `<wp:post_id>${i.id}</wp:post_id>`,
    `<wp:post_date>${cdata(i.date)}</wp:post_date>`,
    `<wp:post_date_gmt>${cdata(i.date)}</wp:post_date_gmt>`,
    '<wp:comment_status>closed</wp:comment_status>',
    '<wp:ping_status>closed</wp:ping_status>',
    `<wp:post_name>${cdata(i.slug)}</wp:post_name>`,
    `<wp:status>${cdata(i.type === 'attachment' ? 'inherit' : status)}</wp:status>`,
    `<wp:post_parent>${i.parent ? seen.get(`page:${slugify(i.parent)}`) ?? 0 : 0}</wp:post_parent>`,
    `<wp:menu_order>${Number(i.order) || 0}</wp:menu_order>`,
    `<wp:post_type>${cdata(i.type)}</wp:post_type>`,
    '<wp:post_password></wp:post_password>',
    '<wp:is_sticky>0</wp:is_sticky>',
    ...(i.type === 'attachment' ? [`<wp:attachment_url>${cdata(i.url)}</wp:attachment_url>`, `<wp:postmeta><wp:meta_key>_wp_attachment_image_alt</wp:meta_key><wp:meta_value>${cdata(i.alt)}</wp:meta_value></wp:postmeta>`] : []),
    ...(i.template ? [`<wp:postmeta><wp:meta_key>_wp_page_template</wp:meta_key><wp:meta_value>${cdata(i.template)}</wp:meta_value></wp:postmeta>`] : []),
    ...(i.image && imageId.has(i.image) ? [`<wp:postmeta><wp:meta_key>_thumbnail_id</wp:meta_key><wp:meta_value>${cdata(imageId.get(i.image))}</wp:meta_value></wp:postmeta>`] : []),
    ...(i.categories ?? []).map((c) => `<category domain="category" nicename="${esc(slugify(c))}">${cdata(c)}</category>`),
    '</item>',
  ].join('\n');

  // attachments first, so the importer knows their old addresses before it rewrites them inside pages and posts
  const all = [...attachments.filter((a) => a.url).map((a) => ({ ...a, type: 'attachment', title: a.alt || a.file, slug: slugify(path.basename(a.file, path.extname(a.file))), date: now, body: '' })), ...items];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8" ?>',
    '<!-- Made by Darkroom. Load it in WordPress: Tools → Import → WordPress. -->',
    '<rss version="2.0" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:wp="http://wordpress.org/export/1.2/">',
    '<channel>',
    `<title>${esc(m.site ?? '')}</title>`,
    `<link>${esc(siteUrl)}</link>`,
    '<description></description>',
    `<language>${esc(m.language ?? 'en')}</language>`,
    '<wp:wxr_version>1.2</wp:wxr_version>',
    `<wp:base_site_url>${esc(siteUrl)}</wp:base_site_url>`,
    `<wp:base_blog_url>${esc(siteUrl)}</wp:base_blog_url>`,
    `<wp:author><wp:author_id>1</wp:author_id><wp:author_login>${cdata('darkroom')}</wp:author_login><wp:author_email>${cdata('')}</wp:author_email><wp:author_display_name>${cdata('Darkroom')}</wp:author_display_name><wp:author_first_name>${cdata('')}</wp:author_first_name><wp:author_last_name>${cdata('')}</wp:author_last_name></wp:author>`,
    ...cats.map((c, n) => `<wp:category><wp:term_id>${n + 1}</wp:term_id><wp:category_nicename>${cdata(slugify(c))}</wp:category_nicename><wp:category_parent>${cdata('')}</wp:category_parent><wp:cat_name>${cdata(c)}</wp:cat_name></wp:category>`),
    ...all.map(item),
    '</channel>',
    '</rss>',
    '',
  ].join('\n');
  return { xml, items, attachments, fronts, problems, images };
}

export function wpContent(dir, opt) {
  const r = buildContent(dir, opt);
  const out = opt.out && opt.out !== true ? String(opt.out) : path.join(dir, 'out');
  mkdirp(path.join(out, 'paste'));
  fs.writeFileSync(path.join(out, 'content.xml'), r.xml);
  for (const i of r.items) fs.writeFileSync(path.join(out, 'paste', `${i.type === 'post' ? 'post-' : ''}${i.slug}.html`), i.body + '\n');
  console.log(`${path.join(out, 'content.xml')}  (${r.items.filter((i) => i.type === 'page').length} pages, ${r.items.filter((i) => i.type === 'post').length} posts, ${r.attachments.length} images)`);
  console.log(`${path.join(out, 'paste')}  one file per page and post, for the Code editor`);
  if (r.images) console.log(`images load from ${r.images}/ : upload the theme before importing, and tick "Download and import file attachments"`);
  if (r.fronts[0]) console.log(`after the import: Settings → Reading → A static page → ${r.fronts[0].title}`);
  for (const p of r.problems) console.log(`  problem  ${p}`);
  console.log('structure checked here; the import itself is not verified until it runs in Playground or on a staging site');
  if (r.problems.length) process.exitCode = 1;
}
