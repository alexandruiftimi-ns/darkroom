// darkroom shots lint [SHOTS.md|file] [--json out.json]
// Checks generation prompts before anyone spends credits on them (references/asset-craft.md, prompts/per-tool.md).
// It reads words, not pictures: a finding is a reason to rewrite a line, never proof that a prompt will fail.
// Prompts live in fenced blocks named after their tool: ```chatgpt, ```chatgpt edit, ```kling, ```veo, ```seedance, ```negative.
import fs from 'node:fs';

const IMAGE = new Set(['chatgpt', 'midjourney', 'gemini', 'flux', 'firefly', 'nano-banana', 'image']);
const VIDEO = new Set(['kling', 'veo', 'seedance', 'omni', 'hailuo', 'wan', 'runway', 'luma', 'video']);
const NO_NEGATIVE_FIELD = new Set(['veo', 'seedance', 'omni']); // constraints are written as positive statements

/** Words with no instruction in them: the model falls back to its average. */
export const BANNED = ['epic', 'stunning', 'breathtaking', 'gorgeous', 'beautiful', 'amazing', 'masterpiece', 'award-winning', 'trending',
  'ultra-realistic', 'ultra-photoreal', 'hyper-realistic', 'hyperrealistic', 'hyper-detailed', 'ultra-detailed', 'highly detailed', 'high detail', '8K', '16K', 'photorealistic', 'photoreal',
  'cinematic', 'dramatic lighting', 'octane render', 'unreal engine', 'flawless', 'perfect', 'insane detail', 'best quality',
  'moody', 'ethereal', 'dreamy', 'sleek', 'minimalist', 'vibrant', 'atmospheric', 'dynamic', 'luxury', 'luxurious', 'futuristic'];
export const BANNED_RE = new RegExp(`(?<![\\w-])(${BANNED.map((w) => w.replace('-', '[- ]?')).join('|')})(?![\\w-])`, 'gi');
const CAMERA_MOVES = { dolly: /\bdolly\b|\bpush[- ]in\b|\bpull[- ]out\b/i, truck: /\btruck(?:ing)?\b|\blateral track/i, orbit: /\borbit/i, crane: /\bcrane\b|\bpedestal\b/i, pan: /\bpan(?:s|ning)?\b/i, tilt: /\btilt(?:s|ing)?\b/i };
const CAMERA_WORDS = /\b(zoom|shake|handheld|whip pan|crash)\b/i;
const PIXELS = /\b\d{3,4}\s*[x×]\s*\d{3,4}\b/;
const SECONDS = /\b\d+(?:\.\d+)?[- ]?(?:s|sec|secs|seconds?)\b(?!\s*:)/i;

/** Fenced blocks with their line, tool and flags. */
export function parseShots(text) {
  const blocks = []; const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const open = /^```([\w-]+)?(?:\s+(.*))?$/.exec(lines[i]); if (!open) continue;
    const start = i; i++; const body = [];
    while (i < lines.length && !/^```\s*$/.test(lines[i])) body.push(lines[i++]);
    blocks.push({ tool: (open[1] ?? '').toLowerCase(), flags: (open[2] ?? '').toLowerCase().split(/\s+/).filter(Boolean), line: start + 1, text: body.join('\n').trim() });
  }
  return blocks;
}

const header = (text, label) => { const m = new RegExp(`^${label}:[ \\t]*(.*)$`, 'im').exec(text.replace(/```[\s\S]*?```/g, '')); const v = m?.[1].trim() ?? ''; return v && !v.includes('<') ? v : ''; };
const wordCount = (s) => s.split(/\s+/).filter(Boolean).length;

/** Findings for a shot list or any Markdown holding tool-named prompt blocks. */
export function lintShots(text, file = 'SHOTS.md') {
  const findings = []; const blocks = parseShots(text);
  const grade = header(text, 'Grade line'); const lock = header(text, 'Lock list');
  const add = (b, sev, check, msg) => findings.push({ file, line: b.line, tool: b.tool, sev, check, msg });
  const prompts = blocks.filter((b) => IMAGE.has(b.tool) || VIDEO.has(b.tool));
  for (const b of blocks) {
    if (b.tool === 'negative') { const n = b.text.split(',').filter((x) => x.trim()).length; if (n > 12) add(b, 'medium', 'negatives', `${n} negatives: keep to about ten that matter for this shot`); continue; }
    const isImage = IMAGE.has(b.tool); const isVideo = VIDEO.has(b.tool);
    if (!isImage && !isVideo) continue;
    const words = wordCount(b.text);
    const ph = b.text.match(/<[^>\n]{1,80}>/); if (ph) add(b, 'high', 'placeholder', `unfilled slot ${ph[0]}`);
    const hype = [...new Set([...b.text.matchAll(BANNED_RE)].map((m) => m[1].toLowerCase()))];
    if (hype.length) add(b, 'high', 'hype-words', `${hype.join(', ')}: say what a crew would do instead (the light source, the lens, the move, the grade)`);
    if (PIXELS.test(b.text)) add(b, 'medium', 'settings-in-prompt', 'pixel size in the prompt does nothing: set it in the tool');
    if (lock && !b.text.includes(lock)) add(b, 'medium', 'lock-list', 'the lock list is not repeated word for word');
    if (isVideo) {
      if (SECONDS.test(b.text)) add(b, 'medium', 'settings-in-prompt', 'duration in the prompt: set it in the tool, or the model starts timing beats');
      const cam = CAMERA_WORDS.exec(b.text);
      if (cam) add(b, 'high', 'camera-words', `naming "${cam[0]}" can invite it: ${NO_NEGATIVE_FIELD.has(b.tool) ? 'write "the camera stays still"' : 'put it in the negative field'}`);
      const moves = Object.keys(CAMERA_MOVES).filter((k) => CAMERA_MOVES[k].test(b.text));
      if (moves.length > 1) add(b, 'high', 'one-move', `${moves.join(' + ')}: one camera move per clip`);
      if (!/single continuous shot|one continuous|\bstatic\b|locked/i.test(b.text) && !moves.length) add(b, 'medium', 'no-shot', 'no shot line: open with the shot (static, or one slow move)');
      if (words > 120) add(b, 'medium', 'length', `${words} words: video prompts work best at 40 to 100`);
      if (b.tool === 'veo' && !/^audio:/im.test(b.text)) add(b, 'high', 'veo-audio', 'Veo always makes sound: add an "Audio:" line or it invents a reason for one');
    } else {
      if (!/\bno text\b|without (any )?text/i.test(b.text)) add(b, 'high', 'no-text', 'no "No text, letters, logos or watermarks" line');
      if (!b.flags.includes('edit')) {
        if (!/\b(light|sun|window|lamp|skylight|overcast|key)\b/i.test(b.text)) add(b, 'medium', 'no-light', 'no light with a source and a direction');
        if (!/\d+\s?mm\b/i.test(b.text)) add(b, 'medium', 'no-lens', 'no lens: name the focal length and the depth of field');
        if (!/\b(16:9|9:16|4:5|1:1|21:9|wide format)\b/i.test(b.text)) add(b, 'medium', 'no-ratio', 'no aspect ratio in words');
        if (grade && !b.text.includes(grade)) add(b, 'medium', 'grade-line', 'the grade line is not repeated word for word');
        if (words > 180) add(b, 'medium', 'length', `${words} words: stills work best at 60 to 150`);
      }
    }
  }
  return { file, prompts: prompts.length, findings };
}

export async function shots(pos, opt) {
  const [sub, target = 'SHOTS.md'] = pos;
  if (sub !== 'lint') throw new Error('usage: darkroom shots lint [SHOTS.md] [--json out.json]');
  if (!fs.existsSync(target)) throw new Error(`not found: ${target}`);
  const r = lintShots(fs.readFileSync(target, 'utf8'), target);
  if (opt.json && opt.json !== true) fs.writeFileSync(String(opt.json), JSON.stringify(r, null, 2) + '\n');
  const highs = r.findings.filter((f) => f.sev === 'high');
  for (const f of r.findings) console.log(`${f.sev.padEnd(6)} ${f.check.padEnd(18)} line ${f.line} (${f.tool}): ${f.msg}`);
  console.log(`${highs.length ? 'FIX' : 'OK'}  ${r.prompts} prompts, ${highs.length} high, ${r.findings.length - highs.length} medium`);
  if (highs.length) process.exitCode = 1;
  return r;
}
