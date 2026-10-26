// Find openly licensed pictures of the subject's world, download them with provenance, and keep the credits.
// Sources (no API keys): Wikimedia Commons, The Met Open Access, Openverse (best effort). Default licence filter: CC0,
// public domain, CC BY, CC BY-SA. A free download is NOT blanket permission: this records source, creator, licence and
// date so the use can be checked. Look at each image before using it, and never present a found picture as the client's own.
import fs from 'node:fs';
import path from 'node:path';
import { mkdirp } from './browser.mjs';

const UA = 'darkroom-skill/1.0 (landing-page production; contact via the project owner)';
const SAFE = /^(cc0|public domain|pd\b|pdm|cc by(?![- ]nc)|cc by-sa|attribution(?! noncommercial)|no restrictions)/i;
const BAD = /(nc|nd|non-?commercial|no ?deriv|all rights reserved|fair use|gfdl only)/i;
const strip = (h) => String(h ?? '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const get = async (url) => { const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' }, signal: AbortSignal.timeout(20000) }); if (!r.ok) throw new Error(`${new URL(url).host} ${r.status}`); return r.json(); };
const okLicence = (lic, mode) => mode === 'all' || (!BAD.test(lic) && SAFE.test(lic));

async function commons(q, o) {
  const f = o.video ? 'filetype:video' : 'filetype:bitmap';
  const u = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(`${f} ${q}`)}&gsrnamespace=6&gsrlimit=${o.limit * 3}&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=640&format=json&origin=*`;
  const j = await get(u);
  return Object.values(j.query?.pages ?? {}).map((p) => {
    const ii = p.imageinfo?.[0]; if (!ii) return null;
    const m = ii.extmetadata ?? {};
    const lic = strip(m.LicenseShortName?.value) || strip(m.UsageTerms?.value);
    return { ref: `commons:${p.title}`, title: p.title.replace(/^File:/, ''), source: 'Wikimedia Commons', width: ii.width, height: ii.height, bytes: ii.size, mime: ii.mime, thumb: ii.thumburl, page: ii.descriptionurl, creator: strip(m.Artist?.value), licence: lic, licenceUrl: strip(m.LicenseUrl?.value), credit: strip(m.Credit?.value), attributionRequired: strip(m.AttributionRequired?.value) !== 'false' };
  }).filter(Boolean);
}

async function met(q, o) {
  if (o.video) return [];
  const s = await get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isPublicDomain=true&q=${encodeURIComponent(q)}`);
  const ids = (s.objectIDs ?? []).slice(0, o.limit * 2);
  const out = [];
  for (const id of ids) {
    try {
      const d = await get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
      if (!d.primaryImage || !d.isPublicDomain) continue;
      out.push({ ref: `met:${id}`, title: d.title, source: 'The Met Open Access', width: null, height: null, thumb: d.primaryImageSmall, full: d.primaryImage, page: d.objectURL, creator: d.artistDisplayName || d.culture || 'unknown', licence: 'Public domain (CC0)', licenceUrl: 'https://www.metmuseum.org/about-the-met/policies-and-documents/open-access', credit: `${d.title}${d.objectDate ? `, ${d.objectDate}` : ''}. The Metropolitan Museum of Art`, attributionRequired: false });
    } catch { /* skip object */ }
  }
  return out;
}

async function openverse(q, o) {
  if (o.video) return [];
  const j = await get(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license_type=commercial&page_size=${o.limit * 2}`);
  return (j.results ?? []).map((r) => ({ ref: `openverse:${r.id}`, title: r.title, source: `Openverse (${r.source})`, width: r.width, height: r.height, thumb: r.thumbnail, full: r.url, page: r.foreign_landing_url, creator: r.creator ?? '', licence: `${r.license?.toUpperCase()} ${r.license_version ?? ''}`.trim(), licenceUrl: r.license_url, credit: `"${r.title}" by ${r.creator ?? 'unknown'}, ${r.license?.toUpperCase()} ${r.license_version ?? ''}`, attributionRequired: !/cc0|pdm/i.test(r.license ?? '') }));
}

export async function search(query, opt) {
  const o = { limit: Number(opt.limit ?? 8), video: !!opt.video };
  const mode = opt.licence ?? opt.license ?? 'safe';
  const sources = String(opt.source ?? 'commons,met,openverse').split(',');
  const fns = { commons, met, openverse };
  const all = []; const notes = [];
  for (const s of sources) {
    try { all.push(...await fns[s](query, o)); } catch (e) { notes.push(`${s}: ${e.message} (skipped)`); }
  }
  const minW = Number(opt['min-width'] ?? 1200);
  let res = all.filter((r) => okLicence(r.licence, mode) && (!r.width || r.width >= minW || opt['min-width'] === '0'));
  if (opt.orientation) res = res.filter((r) => !r.width || (opt.orientation === 'portrait' ? r.height > r.width : r.width >= r.height));
  res = res.slice(0, o.limit);
  console.log(JSON.stringify({ query, licenceFilter: mode, results: res.map(({ ref, title, source, width, height, licence, creator, thumb, page }) => ({ ref, title, source, size: width ? `${width}x${height}` : 'full-size on download', licence, creator, thumb, page })), skipped: all.length - res.length, notes }, null, 2));
  console.log('\nLook at each candidate (open the thumb or page) before choosing. Then: darkroom assets get <ref> [--to assets/found]');
  return res;
}

export async function download(refs, opt) {
  const to = opt.to ?? 'assets/found';
  mkdirp(to);
  const width = Number(opt.width ?? 1920);
  const reg = fs.existsSync('.darkroom/ASSETS.json') ? JSON.parse(fs.readFileSync('.darkroom/ASSETS.json', 'utf8')) : { schema: 'darkroom-assets-v1', assets: [], log: [] };
  for (const ref of refs) {
    const [src, ...rest] = ref.split(':'); const id = rest.join(':');
    let rec;
    if (src === 'commons') {
      const j = await get(`https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(id)}&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=${width}&format=json&origin=*`);
      const p = Object.values(j.query.pages)[0]; const ii = p.imageinfo[0]; const m = ii.extmetadata ?? {};
      rec = { url: ii.thumburl ?? ii.url, ext: path.extname(id).toLowerCase() || '.jpg', title: id.replace(/^File:/, ''), page: ii.descriptionurl, creator: strip(m.Artist?.value), licence: strip(m.LicenseShortName?.value), licenceUrl: strip(m.LicenseUrl?.value), source: 'Wikimedia Commons', attribution: strip(m.AttributionRequired?.value) !== 'false' };
    } else if (src === 'met') {
      const d = await get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
      rec = { url: d.primaryImage, ext: '.jpg', title: d.title, page: d.objectURL, creator: d.artistDisplayName || d.culture || 'unknown', licence: 'Public domain (CC0)', licenceUrl: 'https://www.metmuseum.org/about-the-met/policies-and-documents/open-access', source: 'The Met Open Access', attribution: false };
    } else if (src === 'openverse') {
      const d = await get(`https://api.openverse.org/v1/images/${id}/`);
      rec = { url: d.url, ext: path.extname(new URL(d.url).pathname).toLowerCase() || '.jpg', title: d.title, page: d.foreign_landing_url, creator: d.creator ?? '', licence: `${d.license?.toUpperCase()} ${d.license_version ?? ''}`.trim(), licenceUrl: d.license_url, source: `Openverse (${d.source})`, attribution: !/cc0|pdm/i.test(d.license ?? '') };
    } else throw new Error(`unknown ref ${ref}`);
    const name = (opt.name && refs.length === 1 ? String(opt.name) : rec.title.replace(/[^\w.-]+/g, '_').slice(0, 60)).replace(/\.\w+$/, '') + rec.ext;
    const file = path.join(to, name);
    const r = await fetch(rec.url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(60000) });
    if (!r.ok) throw new Error(`download failed ${r.status}: ${rec.url}`);
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    const credit = `${rec.title}${rec.creator ? ` by ${rec.creator}` : ''}, ${rec.licence}${rec.licenceUrl ? ` (${rec.licenceUrl})` : ''}, via ${rec.source}: ${rec.page}`;
    reg.assets.push({ file: file.split(path.sep).join('/'), section: '', role: 'TEMP', bakedUI: false, source: `found: ${rec.source}`, sourceUrl: rec.page, creator: rec.creator, licence: rec.licence, licenceUrl: rec.licenceUrl, creditRequired: rec.attribution, credit, acquired: new Date().toISOString().slice(0, 10), intendedUse: 'verify before shipping', rights: 'free licence is not blanket permission: confirm the intended use, the credit and any share-alike duty', status: 'candidate' });
    console.log(`${file}  (${rec.licence})`);
  }
  mkdirp('.darkroom');
  fs.writeFileSync('.darkroom/ASSETS.json', JSON.stringify(reg, null, 2));
  writeCredits(reg, to);
}

function writeCredits(reg, to) {
  const lines = reg.assets.filter((a) => a.credit && a.sourceUrl).map((a) => `- ${a.credit}`);
  fs.writeFileSync(path.join(to, 'CREDITS.md'), `# Credits\n\n${lines.join('\n')}\n`);
}

export function credits() {
  const reg = fs.existsSync('.darkroom/ASSETS.json') ? JSON.parse(fs.readFileSync('.darkroom/ASSETS.json', 'utf8')) : { assets: [] };
  reg.assets.filter((a) => a.credit && a.creditRequired !== false).forEach((a) => console.log(a.credit));
}

export async function assets(pos, opt) {
  const [sub, ...rest] = pos;
  if (sub === 'search') return search(rest.join(' '), opt);
  if (sub === 'get') return download(rest.flatMap((r) => r.split(',')), opt);
  if (sub === 'credits') return credits();
  if (sub === 'intake') { const { intake } = await import('./intake.mjs'); return intake(rest[0], opt); }
  console.log(`darkroom assets <command>   (search and get use the network; no API keys)
  intake [assets/raw] [--needs NEEDS.md]                                   match arrived files to NEEDS.md, measure them, suggest (never reject); updates its Status column
  search "<query>" [--source commons,met,openverse] [--min-width 1200] [--orientation landscape|portrait] [--limit 8] [--video] [--licence safe|all]
  get <ref>[,<ref>] [--to assets/found] [--width 1920] [--name file]     downloads and records provenance in .darkroom/ASSETS.json
  credits                                                                  credit lines for assets whose licence requires them`);
}
