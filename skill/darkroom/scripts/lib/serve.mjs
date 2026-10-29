// Local static server (127.0.0.1, ephemeral port) so built pages behave as hosted: root-relative assets, ES modules,
// fetch(), and Range requests for seekable video all fail or differ under file://.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.gif': 'image/gif', '.mp4': 'video/mp4', '.webm': 'video/webm', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.glb': 'model/gltf-binary', '.txt': 'text/plain', '.ico': 'image/x-icon', '.map': 'application/json',
};

// Live reload for the preview: watches `dir`, and every open page reloads (keeping its scroll position) when a file
// changes; a change to .css files only swaps the stylesheets in place. Pages get a small script injected before </body>
// that listens on /__darkroom/live (server-sent events). Never used by capture or audit.
const LIVE_PATH = '/__darkroom/live';
const LIVE_SNIPPET = `<script>(()=>{const k='darkroom-live-y:'+location.pathname;try{const y=sessionStorage.getItem(k);if(y!==null){sessionStorage.removeItem(k);addEventListener('load',()=>setTimeout(()=>scrollTo({top:+y,behavior:'instant'}),60));}}catch{}
const es=new EventSource('${LIVE_PATH}');es.onmessage=(e)=>{if(e.data==='css'){document.querySelectorAll('link[rel=stylesheet]').forEach((l)=>{const u=new URL(l.href);u.searchParams.set('darkroom',Date.now());l.href=u.href;});return;}
try{sessionStorage.setItem(k,String(scrollY));}catch{}location.reload();};})();</script>`;
const SKIP_WATCH = /(^|[\\/])(\.darkroom|\.git|node_modules|graphify-out)([\\/]|$)/;

export function liveReload(dir) {
  const clients = new Set();
  let timer = 0, pending = new Set(), watcher = null, poll = 0;
  const flush = () => {
    const files = [...pending]; pending = new Set();
    const msg = files.length && files.every((f) => /\.css$/i.test(f)) ? 'css' : 'reload';
    for (const res of clients) res.write(`data: ${msg}\n\n`);
  };
  const changed = (file) => { if (file && SKIP_WATCH.test(file)) return; pending.add(String(file ?? '')); clearTimeout(timer); timer = setTimeout(flush, 200); };
  try { watcher = fs.watch(dir, { recursive: true }, (_, file) => changed(file)); } catch {
    let rev = revisionOf(dir); // no recursive watch on this system: compare a fingerprint every second
    poll = setInterval(() => { const r = revisionOf(dir); if (r !== rev) { rev = r; changed('?'); } }, 1000);
  }
  const ping = setInterval(() => { for (const res of clients) res.write(': ping\n\n'); }, 25000);
  return {
    // true when it answered the request (the event stream)
    handle(req, res) {
      if (!req.url.startsWith(LIVE_PATH)) return false;
      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive' });
      res.write(': live\n\n'); clients.add(res); req.on('close', () => clients.delete(res));
      return true;
    },
    inject: (html) => (/<\/body>/i.test(html) ? html.replace(/<\/body>(?![\s\S]*<\/body>)/i, `${LIVE_SNIPPET}</body>`) : html + LIVE_SNIPPET),
    get clients() { return clients.size; },
    close() { watcher?.close(); clearInterval(poll); clearInterval(ping); clearTimeout(timer); for (const res of clients) res.end(); clients.clear(); },
  };
}

// target: http(s)/file URL (returned as is), a directory, or an html file. Returns { url, root, port, close }.
// host/port default to 127.0.0.1 and a free port; `darkroom preview` passes 0.0.0.0 to reach phones on the same Wi-Fi,
// and `live: true` to reload open pages when the folder changes.
export async function resolveTarget(target, { host = '127.0.0.1', port = 0, live = false } = {}) {
  if (/^(https?|file):/i.test(target)) return { url: target, root: null, close: async () => {} };
  const abs = path.resolve(target);
  if (!fs.existsSync(abs)) throw new Error(`not found: ${target}`);
  const isDir = fs.statSync(abs).isDirectory();
  const root = isDir ? abs : path.dirname(abs);
  const first = isDir ? '/' : '/' + encodeURIComponent(path.basename(abs));
  const lr = live ? liveReload(root) : null;
  const server = http.createServer((req, res) => {
    if (lr?.handle(req, res)) return;
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(root, p);
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) && !path.extname(file) && fs.existsSync(file + '.html')) file += '.html'; // /about → about.html, as static hosts do
    if (!fs.existsSync(file)) { res.writeHead(404).end('not found'); return; }
    const size = fs.statSync(file).size;
    const type = MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
    const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? '');
    if (lr && type.startsWith('text/html')) {
      const body = lr.inject(fs.readFileSync(file, 'utf8'));
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': Buffer.byteLength(body), 'Cache-Control': 'no-store' });
      res.end(body);
    } else if (range) {
      const start = range[1] ? Number(range[1]) : 0;
      const end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
      res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
      fs.createReadStream(file, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    }
  });
  await new Promise((r, j) => { server.once('error', j); server.listen(Number(port), host, r); });
  const bound = server.address().port;
  return { url: `http://127.0.0.1:${bound}${first}`, root, port: bound, live: !!lr, close: () => { lr?.close(); return new Promise((r) => server.close(r)); } };
}

// Fingerprint of the files a page is made of (path + size + mtime). Changes whenever the build changes, so QA evidence
// can be marked stale. Not a content hash on purpose: cheap on large asset folders.
export function revisionOf(root) {
  if (!root) return null;
  const skip = new Set(['node_modules', '.git', '.darkroom', 'graphify-out']);
  const h = crypto.createHash('sha1');
  let n = 0;
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (skip.has(e.name) || n > 20000) continue;
      const f = path.join(d, e.name);
      if (e.isDirectory()) walk(f);
      else { const s = fs.statSync(f); h.update(`${path.relative(root, f)}|${s.size}|${Math.round(s.mtimeMs)}\n`); n++; }
    }
  })(root);
  return h.digest('hex').slice(0, 12);
}
