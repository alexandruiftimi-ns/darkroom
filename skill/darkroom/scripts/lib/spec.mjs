// darkroom spec <BUILD_SPEC.md|folder> [--json out.json]
// Heuristic lint for build specs (references/spec-precision.md): required sections, bare adjectives, placeholders, hotlinks.
// It reads words, not intent: a finding is a prompt to add values, not proof the design is vague.
import fs from 'node:fs';
import path from 'node:path';

export const SECTIONS = ['Brief & signature', 'Fonts', 'Tokens', 'Assets', 'Hero', 'Motion', 'Responsive', 'Acceptance'];
const ADJECTIVES = /\b(premium|cinematic|smooth|nice|modern|clean(?!-up)|sleek|elegant|stunning|beautiful)\b/gi;
const VALUE = /\d|#|px|ms|em\b|%|vw|vh/;
export const PLACEHOLDER =/lorem ipsum|\[headline\]|\[your [a-z ]+\]|your company name\b|TBD\b|xxx+/i;
// Hosts a spec may name: the platforms' own docs and fonts' homes. Media must be the user's own files, never a hotlink.
const ALLOWED_HOSTS = /^(?:[\w-]+\.)*(?:fontsource\.org|fonts\.google\.com|github\.com|developer\.mozilla\.org|w3\.org|schema\.org|shopify\.dev|wordpress\.org|developer\.wordpress\.org|woocommerce\.com|docs\.astro\.build|nextjs\.org|gohugo\.io|jekyllrb\.com|ghost\.org|php\.net|example\.com|example\.org)$/i;

/** Bare adjectives in prose: the ones with no value within 80 characters. */
export function bareAdjectives(text) {
  const bare = [];
  const prose = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '``').replace(/^>.*$/gm, ''); // pack names, code and the user's quoted words are not the spec's adjectives
  for (const m of prose.matchAll(ADJECTIVES)) {
    const after = prose.slice(m.index + m[0].length, m.index + m[0].length + 80);
    if (!VALUE.test(after)) bare.push(m[0].toLowerCase());
  }
  return bare;
}

function lintText(text, file) {
  const findings = [];
  const add = (sev, msg) => findings.push({ file, sev, msg });
  const headings = [...text.matchAll(/^#{2,3}\s+(?:\d+\.\s*)?(.+)$/gm)].map((m) => m[1].trim().toLowerCase());
  for (const s of SECTIONS) if (!headings.some((h) => h.startsWith(s.toLowerCase()))) add('high', `missing section "${s}"`);
  if (!/\*\*Signature:?\*\*/i.test(text) && !/^signature:/im.test(text)) add('high', 'no Signature line (the one thing the page is remembered for)');
  if (!/\*\*Do not:?\*\*|^#{2,3}\s+(?:\d+\.\s*)?Do not/im.test(text)) add('high', 'no "Do not" list');
  const ph = text.match(PLACEHOLDER);
  if (ph) add('high', `placeholder text "${ph[0]}"`);
  for (const m of text.matchAll(/https?:\/\/([^/\s)>"'`]+)/g)) if (!ALLOWED_HOSTS.test(m[1])) add('high', `URL to ${m[1]}: media and code must be local files, never hotlinked`);
  const bare = bareAdjectives(text);
  if (bare.length) add('medium', `bare adjective${bare.length > 1 ? 's' : ''} with no value within 80 characters: ${[...new Set(bare)].join(', ')} (${bare.length}×)`);
  return findings;
}

export function lintSpecs(target) {
  const st = fs.statSync(target);
  const files = st.isDirectory()
    ? fs.readdirSync(target).filter((f) => f.endsWith('.md') && !/^(INDEX|README)\.md$/i.test(f)).map((f) => path.join(target, f))
    : [target];
  return { files: files.length, findings: files.flatMap((f) => lintText(fs.readFileSync(f, 'utf8'), path.relative(process.cwd(), f) || f)) };
}

export async function spec(pos, opt) {
  const target = pos[0] ?? (fs.existsSync('BUILD_SPEC.md') ? 'BUILD_SPEC.md' : null);
  if (!target || !fs.existsSync(target)) throw new Error('usage: darkroom spec <BUILD_SPEC.md|folder> [--json out.json]');
  const res = lintSpecs(target);
  if (opt.json) fs.writeFileSync(opt.json, JSON.stringify(res, null, 2));
  for (const f of res.findings) console.log(`${f.sev.padEnd(6)} ${f.file}: ${f.msg}`);
  const highs = res.findings.filter((f) => f.sev === 'high').length;
  console.log(`${res.files} spec file${res.files === 1 ? '' : 's'} · ${highs} high · ${res.findings.length - highs} medium`);
  if (highs) process.exitCode = 1;
}
