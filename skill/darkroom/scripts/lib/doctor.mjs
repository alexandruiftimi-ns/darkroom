// darkroom doctor: what this machine has, what each missing piece blocks, and the exact command to add it.
// Installs nothing. Exit 1 when something required (Node, Playwright, a browser) is missing.
import { loadPlaywright } from './browser.mjs';
import { engines } from './media.mjs';

const OS = process.platform === 'win32' ? 'windows' : process.platform === 'darwin' ? 'mac' : 'linux';
const FFMPEG = { windows: 'winget install Gyan.FFmpeg', mac: 'brew install ffmpeg', linux: 'sudo apt install ffmpeg   (or your distribution\'s package manager)' };

async function findBrowser(pw) {
  const chromium = pw.chromium ?? pw.default?.chromium;
  for (const channel of [undefined, 'chrome', 'msedge']) {
    try {
      const b = await chromium.launch(channel ? { channel } : {});
      const version = b.version();
      await b.close();
      return channel ? `${channel === 'msedge' ? 'Edge' : 'Chrome'} ${version} (installed on this computer)` : `Chromium ${version} (from Playwright)`;
    } catch { /* next */ }
  }
  return null;
}

export async function doctor() {
  const rows = [];
  const add = (ok, required, name, detail, fix) => rows.push({ ok, required, name, detail, fix });

  const major = Number(process.versions.node.split('.')[0]);
  add(major >= 18, true, 'Node.js', `${process.version}${major >= 18 ? '' : ' (Darkroom needs 18 or newer)'}`, 'install the LTS version from https://nodejs.org');

  const pw = loadPlaywright({ exit: false });
  add(!!pw, true, 'Playwright', pw ? 'found' : 'not found (needed for screenshots, audit, import, preview of effects)',
    'npm i -D playwright   (in your project folder; or npm i -g playwright)');

  if (pw) {
    const browser = await findBrowser(pw);
    add(!!browser, true, 'Browser', browser ?? 'none could start', 'npx playwright install chromium');
  }

  const eng = engines();
  add(!!eng.ffmpeg, false, 'ffmpeg', eng.ffmpeg ? eng.ffmpeg.version : 'not found (only needed for video: frame sequences, posters, compressing clips)', FFMPEG[OS]);
  add(eng.sharp, false, 'sharp', eng.sharp ? 'found' : 'not found (optional; images are resized in the browser without it)', 'npm i -D sharp');

  for (const r of rows) {
    const mark = r.ok ? 'OK  ' : r.required ? 'MISS' : 'opt ';
    console.log(`${mark}  ${r.name.padEnd(11)} ${r.detail}`);
    if (!r.ok) console.log(`      ${''.padEnd(11)} → ${r.fix}`);
  }
  const missing = rows.filter((r) => !r.ok && r.required);
  console.log(missing.length ? `\n${missing.length} required piece(s) missing. Ask the user before running any install command.` : '\nReady: everything Darkroom needs is here.');
  if (missing.length) process.exitCode = 1;
}
