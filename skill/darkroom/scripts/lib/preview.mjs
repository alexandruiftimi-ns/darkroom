// Preview on a phone: serve a built folder, or relay a local dev server, on this computer's network address so any
// device on the same Wi-Fi can open it. Nothing leaves the local network. Runs until stopped (Ctrl+C or the task is killed).
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { resolveTarget, liveReload } from './serve.mjs';

export function lanAddresses() {
  return Object.values(os.networkInterfaces()).flat()
    .filter((i) => i && i.family === 'IPv4' && !i.internal && !i.address.startsWith('169.254.'))
    .map((i) => i.address);
}

const TEXT = /^(text\/|application\/(json|javascript|xml|rss\+xml|atom\+xml|manifest\+json)|image\/svg\+xml)/;

// Relays http://host:port → target and rewrites the target's own origin in text responses, so absolute links that a
// dev server writes (WordPress writes http://127.0.0.1:9400/… everywhere) point back through the relay.
function relay(target, host, port, lr = null) {
  const up = new URL(target);
  const origins = [up.origin, up.origin.replace('127.0.0.1', 'localhost'), up.origin.replace('localhost', '127.0.0.1')];
  const escaped = origins.map((o) => o.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')}|${escaped.map((e) => e.replace(/\\\//g, '\\\\\\/')).join('|')})`, 'g');
  const server = http.createServer((req, res) => {
    if (lr?.handle(req, res)) return;
    const here = `http://${req.headers.host}`;
    const opts = { hostname: up.hostname, port: up.port || 80, path: req.url, method: req.method, headers: { ...req.headers, host: up.host, 'accept-encoding': 'identity' } };
    const p = http.request(opts, (r) => {
      const headers = { ...r.headers };
      if (headers.location) headers.location = headers.location.replace(pattern, here);
      if (headers['set-cookie']) headers['set-cookie'] = [].concat(headers['set-cookie']).map((c) => c.replace(/;\s*domain=[^;]+/i, ''));
      if (!TEXT.test(headers['content-type'] ?? '')) { res.writeHead(r.statusCode, headers); r.pipe(res); return; }
      const chunks = []; r.on('data', (c) => chunks.push(c));
      r.on('end', () => {
        let body = Buffer.concat(chunks).toString('utf8').replace(pattern, (m) => (m.includes('\\/') ? here.replace(/\//g, '\\/') : here));
        if (lr && /text\/html/.test(headers['content-type'] ?? '')) body = lr.inject(body);
        delete headers['content-length']; delete headers['content-encoding'];
        res.writeHead(r.statusCode, headers); res.end(body);
      });
    });
    p.on('error', (e) => { res.writeHead(502, { 'content-type': 'text/plain' }); res.end(`Darkroom preview: the site at ${target} is not answering (${e.code}). Is its server still running?`); });
    req.pipe(p);
  });
  return new Promise((r, j) => { server.once('error', j); server.listen(Number(port), host, () => r({ port: server.address().port, live: !!lr, close: () => { lr?.close(); return new Promise((c) => server.close(c)); } })); });
}

export async function preview(target, opt) {
  if (!target) throw new Error('darkroom preview <folder|http://127.0.0.1:port> [--port 8800] [--host 0.0.0.0] [--watch dir] [--no-live]');
  const relaying = /^https?:/i.test(target);
  const live = !opt['no-live'];
  const watch = opt.watch && opt.watch !== true ? path.resolve(String(opt.watch)) : null;
  const host = opt.host && opt.host !== true ? String(opt.host) : '0.0.0.0';
  const port = opt.port && opt.port !== true ? Number(opt.port) : 8800;
  let bound;
  try {
    bound = relaying ? await relay(target, host, port, live && watch ? liveReload(watch) : null) : await resolveTarget(target, { host, port, live });
  } catch (e) {
    if (e.code === 'EADDRINUSE') throw new Error(`port ${port} is busy: use --port <another>`);
    throw e;
  }
  const lan = host === '0.0.0.0' ? lanAddresses() : [];
  console.log(`preview ready: ${/^https?:/i.test(target) ? `relaying ${target}` : `serving ${target}`}`);
  console.log(`  this computer: http://127.0.0.1:${bound.port}/`);
  for (const ip of lan) console.log(`  phone (same Wi-Fi): http://${ip}:${bound.port}/`);
  if (host === '0.0.0.0' && !lan.length) console.log('  no network address found: is this computer on Wi-Fi or Ethernet?');
  if (host === '0.0.0.0' && process.platform === 'win32') console.log('  Windows may ask whether Node.js may use the network: allow it on private networks only.');
  if (bound.live) console.log(`  live reload: on (open pages reload, keeping their scroll position, when ${relaying ? watch : 'the folder'} changes)`);
  else console.log(`  live reload: off${relaying && live ? ' (relaying: the dev server reloads by itself, or pass --watch <folder>)' : ''}: reload the page by hand to see changes`);
  console.log('  only devices on the same network can open it; stop the preview to close it.');
  return bound;
}
