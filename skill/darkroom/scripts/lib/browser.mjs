// Shared browser plumbing: Playwright resolution, launch, settle, viewports, tiny helpers.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export const VIEWPORTS = {
  'desktop-1440': { width: 1440, height: 900 },
  'tablet-1024': { width: 1024, height: 768 },
  'mobile-390': { width: 390, height: 844 },
  'mobile-375': { width: 375, height: 812 },
  'desktop-1920': { width: 1920, height: 1080 },
};

// Phone widths render as a phone: the page's meta viewport, touch and no hover apply, as on a real device.
export const contextFor = (vp) => (vp.width < 600 ? { viewport: vp, isMobile: true, hasTouch: true } : { viewport: vp });

export const mkdirp = (d) => fs.mkdirSync(d, { recursive: true });

let pwCache = null;
export function loadPlaywright({ exit = true } = {}) {
  if (pwCache) return pwCache;
  const tries = [];
  // project first, then DARKROOM_RESOLVE_FROM (used by the eval runner), then the global install
  const roots = [process.cwd(), process.env.DARKROOM_RESOLVE_FROM].filter(Boolean);
  for (const r of roots) {
    const req = createRequire(path.join(r, 'noop.js'));
    for (const name of ['playwright', '@playwright/test', 'playwright-core']) {
      try { return (pwCache = req(name)); } catch { tries.push(name); }
    }
  }
  try {
    const root = execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    for (const p of ['playwright', '@playwright/test', '@playwright/cli/node_modules/playwright-core', '@playwright/cli/node_modules/playwright']) {
      const full = path.join(root, p);
      if (fs.existsSync(full)) return (pwCache = createRequire(path.join(root, 'noop.js'))(full));
    }
  } catch { /* npm missing */ }
  if (!exit) return null;
  console.error(`Playwright not found (tried ${tries.join(', ')} and the global npm root).\nAsk the user before installing: npm i -D playwright`);
  process.exit(2);
}

export async function launch() {
  const pw = loadPlaywright();
  const chromium = pw.chromium ?? pw.default?.chromium;
  try {
    return await chromium.launch();
  } catch (e) {
    for (const channel of ['chrome', 'msedge']) {
      try { return await chromium.launch({ channel }); } catch { /* next */ }
    }
    throw e;
  }
}

export function toolVersions(browser) {
  let playwright = null;
  try { playwright = createRequire(path.join(process.cwd(), 'noop.js'))('playwright/package.json').version; } catch { /* resolved elsewhere */ }
  return { node: process.version, playwright, browser: browser?.version?.() ?? null };
}

// Waits for fonts and above-the-fold images. Lazy images below the fold never fire load, so the wait is bounded.
export async function settle(page) {
  try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch { /* long-polling pages */ }
  await page.evaluate(async () => {
    const wait = Promise.all([document.fonts.ready, ...[...document.images].filter((i) => !i.complete && i.loading !== 'lazy')
      .map((i) => new Promise((r) => { i.addEventListener('load', r); i.addEventListener('error', r); }))]);
    await Promise.race([wait, new Promise((r) => setTimeout(r, 5000))]);
  });
  await page.waitForTimeout(300);
}

// Reads `--flag value` style args. Returns { cmd, pos, opt }.
export function parseArgs(argv) {
  const [cmd, ...rest] = argv;
  const pos = []; const opt = {};
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a.startsWith('--')) {
      const k = a.slice(2); const next = rest[i + 1];
      if (next === undefined || next.startsWith('--')) opt[k] = true; else { opt[k] = next; i++; }
    } else pos.push(a);
  }
  return { cmd, pos, opt };
}
