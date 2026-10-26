#!/usr/bin/env node
// Darkroom CLI. Node 18+ and Playwright (project dependency or the global install). Everything else is optional.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { VIEWPORTS, parseArgs, mkdirp } from './lib/browser.mjs';
import { init, resolveSettings, state } from './lib/project.mjs';
import { audit, CHECKS } from './lib/audit.mjs';
import { capture, compare } from './lib/capture.mjs';

const SKILL_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { cmd, pos, opt } = parseArgs(process.argv.slice(2));

const VERSION = fs.readFileSync(path.join(SKILL_DIR, 'VERSION'), 'utf8').trim();
const USAGE = `darkroom <command>   (Darkroom ${VERSION})
  version                      print the installed version (major.minor.patch; CHANGELOG.md in the repository)
  doctor                       what this computer has (Node, Playwright, a browser, ffmpeg) and the exact command for anything missing
  init                         create .darkroom/ (never overwrites); adopts PROJECT_BLUEPRINT.md / DESIGN.md as the design document
  state [--set stage=slice,mode=animated,look=like:apple,platform=shopify,verify=quick,scope=home,palette=60-30-10]
        [--approve id --note "…"] [--open type:id[:blocking]] [--close id] [--root dir]
                               where the project is, what is approved against which build revision, which evidence is stale
  capture <url|dir|file> [--out dir] [--label x] [--viewports desktop-1440,mobile-390] [--scroll 0,.25,.5,.75,1]
          [--scene "#id" --steps 10] [--film] [--states states.json] [--motion|--reduce|--both] [--dpr 2] [--crop css] [--wait ms] [--dismiss]
                               named states with real wheel input; default = both motion and reduced-motion; contact sheets + manifest.json
  shoot <url|dir|file> …       legacy alias of capture (reduced motion unless --motion)
  compare <reference.png> <shot.png> [--out sheet.png]
  audit <url|dir|file> [--bible file] [--fonts 3] [--mode disciplined|expressive|monochrome] [--json out.json] [--dismiss]
  study <url> [--out dir]      capture + audit of someone else's page (rejects cookies only inside a recognised consent dialog)
  checks [--md]                the audit's check registry: id, severity, basis, limits
  import <url|folder> [--list] [--pages /,/about] [--take text,images] [--max 40] [--ignore-robots] [--out .darkroom/import]
                               the user's existing site: texts in reading order, navigation, contacts, images with sizes,
                               suggestions; --list only lists the pages (ask which to bring over first)
  preview <folder|http://127.0.0.1:port> [--port 8800] [--host 0.0.0.0]
                               open the site on a phone on the same Wi-Fi (relays a dev server); runs until stopped
  platform list | scaffold <id> [--out dir] [--name "Site name"] | check [dir] [--platform id] [--json out.json]
                               the platforms Darkroom builds for, a starter per platform, and an offline structure check
  media inspect|derive|frames|check …   probe, derive, frame sequences (see: darkroom media)
  assets search|get|credits|intake …    openly licensed images with provenance; intake = check what the user dropped in
viewports: ${Object.keys(VIEWPORTS).join(', ')}
local dirs and html files are served over http://127.0.0.1 (file:// breaks modules, fetch and video seeking).`;

async function study(target) {
  const out = opt.out ?? `.darkroom/study/${String(target).replace(/^https?:\/\//, '').replace(/[^\w.-]/g, '_').slice(0, 60)}`;
  mkdirp(out);
  const manifest = await capture(target, { ...opt, out, scroll: opt.scroll ?? '0,0.25,0.5,0.75,1', viewports: opt.viewports ?? 'desktop-1440,mobile-390', dismiss: true, motion: true }, { quiet: true });
  const data = await audit(target, { ...opt, dismiss: true }, { resolveSettings, study: true });
  const summary = {
    url: data.url, capture: { manifest: path.join(out, 'manifest.json'), consent: manifest.consent, modes: manifest.modes },
    fonts: { families: data.desktop.families, sizes: data.desktop.sizes, declaredUse: data.desktop.declared, weights: data.desktop.weights },
    colour: data.colour, sections: data.desktop.sections,
    zonesFirstViewport: { desktop: data.desktop.zones.length, mobile: data.mobile.zones.length, travel: data.desktop.travel, corners: data.desktop.corners },
    words: data.desktop.totalWords,
    motionTechnique: { detected: data.desktop.libs, media: data.desktop.media, note: 'detection by globals and script URLs only; module-scoped libraries can be missed. Treat as a lead, not proof.' },
    weight: { kb: data.desktop.resources.kb, entries: data.desktop.resources.entries, unmeasured: data.desktop.resources.unmeasured, note: 'unmeasured = cached, cross-origin without Timing-Allow-Origin, or zero-size; the total is a lower bound' },
    findings: data.findings,
  };
  fs.writeFileSync(path.join(out, 'study.json'), JSON.stringify(summary, null, 2));
  console.log(path.join(out, 'study.json'));
}

try {
  if (cmd === 'version' || cmd === '--version') console.log(VERSION);
  else if (cmd === 'doctor') { const { doctor } = await import('./lib/doctor.mjs'); await doctor(); }
  else if (cmd === 'init') init(SKILL_DIR);
  else if (cmd === 'state') state(opt);
  else if (cmd === 'capture') { if (!pos[0]) { console.error(USAGE); process.exit(1); } await capture(pos[0], opt); }
  else if (cmd === 'shoot') { if (!pos[0]) { console.error(USAGE); process.exit(1); } await capture(pos[0], { ...opt, label: opt.label ?? 'shoot', out: opt.out ?? '.darkroom/qa/shots', 'no-sheet': true }, { defaultModes: opt.motion ? ['no-preference'] : ['reduce'] }); }
  else if (cmd === 'compare') { if (pos.length < 2) { console.error(USAGE); process.exit(1); } await compare(pos[0], pos[1], opt); }
  else if (cmd === 'audit') { if (!pos[0]) { console.error(USAGE); process.exit(1); } await audit(pos[0], opt, { resolveSettings }); }
  else if (cmd === 'study') { if (!pos[0]) { console.error(USAGE); process.exit(1); } await study(pos[0]); }
  else if (cmd === 'checks') {
    if (opt.md) { console.log('| Check | Severity | Basis | What | Limits |\n|---|---|---|---|---|'); CHECKS.forEach((c) => console.log(`| \`${c.id}\` | ${c.sev} | ${c.basis} | ${c.what} | ${c.limits || '—'} |`)); }
    else CHECKS.forEach((c) => console.log(`${c.id.padEnd(15)} ${c.sev.padEnd(7)} ${c.basis.padEnd(10)} ${c.what}`));
  } else if (cmd === 'assets') { const { assets } = await import('./lib/assets.mjs'); await assets(pos, opt); }
  else if (cmd === 'import') { const { importSite } = await import('./lib/importsite.mjs'); await importSite(pos[0], opt); }
  else if (cmd === 'preview') { const { preview } = await import('./lib/preview.mjs'); await preview(pos[0], opt); }
  else if (cmd === 'platform') { const { platform } = await import('./lib/platforms.mjs'); await platform(pos, opt, SKILL_DIR); }
  else if (cmd === 'media') { const { media } = await import('./lib/media.mjs'); await media(pos, opt); }
  else { console.log(USAGE); process.exitCode = cmd ? 1 : 0; }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
