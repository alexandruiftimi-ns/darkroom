#!/usr/bin/env node
// Installs the Darkroom skill for Claude Code.
//   node install.mjs             -> ~/.claude/skills/darkroom   (all projects)
//   node install.mjs --project   -> ./.claude/skills/darkroom   (current project only)
//   node install.mjs --uninstall [--project]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const src = path.join(path.dirname(fileURLToPath(import.meta.url)), 'skill', 'darkroom');
const args = process.argv.slice(2);
const base = args.includes('--project') ? path.join(process.cwd(), '.claude', 'skills') : path.join(os.homedir(), '.claude', 'skills');
const dest = path.join(base, 'darkroom');

if (Number(process.versions.node.split('.')[0]) < 18) console.warn('Warning: Darkroom needs Node 18 or newer.');

if (args.includes('--uninstall')) {
  fs.rmSync(dest, { recursive: true, force: true });
  console.log(`Removed ${dest}`);
  process.exit(0);
}
if (fs.existsSync(dest)) {
  // backups go outside the skills folder, or Claude would load them as a second skill
  const backupDir = path.join(path.dirname(base), 'skills-backup');
  fs.mkdirSync(backupDir, { recursive: true });
  const backup = path.join(backupDir, `darkroom-${Date.now()}`);
  fs.renameSync(dest, backup);
  console.log(`Existing install moved to ${backup}`);
}
fs.mkdirSync(base, { recursive: true });
fs.cpSync(src, dest, { recursive: true });
console.log(`Installed Darkroom to ${dest}\nRestart Claude Code, then type /darkroom or describe the landing page you want.`);
