// Builds dist/darkroom-skill.zip containing only skill/darkroom (what users install).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
const out = path.join(root, 'dist', 'darkroom-skill.zip');
fs.rmSync(out, { force: true });
if (process.platform === 'win32') {
  execFileSync('powershell', ['-NoProfile', '-Command', `Compress-Archive -Path '${path.join(root, 'skill', 'darkroom')}' -DestinationPath '${out}'`], { stdio: 'inherit' });
} else {
  execFileSync('zip', ['-qr', out, 'darkroom'], { cwd: path.join(root, 'skill'), stdio: 'inherit' });
}
console.log('Wrote', out);
