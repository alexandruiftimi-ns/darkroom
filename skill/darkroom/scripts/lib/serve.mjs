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

// target: http(s)/file URL (returned as is), a directory, or an html file. Returns { url, root, close }.
export async function resolveTarget(target) {
  if (/^(https?|file):/i.test(target)) return { url: target, root: null, close: async () => {} };
  const abs = path.resolve(target);
  if (!fs.existsSync(abs)) throw new Error(`not found: ${target}`);
  const isDir = fs.statSync(abs).isDirectory();
  const root = isDir ? abs : path.dirname(abs);
  const first = isDir ? '/' : '/' + encodeURIComponent(path.basename(abs));
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(root, p);
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404).end('not found'); return; }
    const size = fs.statSync(file).size;
    const type = MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
    const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? '');
    if (range) {
      const start = range[1] ? Number(range[1]) : 0;
      const end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
      res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
      fs.createReadStream(file, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  return { url: `http://127.0.0.1:${port}${first}`, root, close: () => new Promise((r) => server.close(r)) };
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
