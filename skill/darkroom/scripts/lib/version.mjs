// darkroom version [--check]: the installed version and, with --check, whether a newer release is out.
// One read-only request to the public GitHub releases API; offline or rate-limited is reported, never an error.
const RELEASES = process.env.DARKROOM_RELEASES_URL || 'https://api.github.com/repos/alexandruiftimi-ns/darkroom/releases/latest';

const parse = (v) => (String(v).match(/(\d+)\.(\d+)\.(\d+)/) ?? []).slice(1).map(Number);
export function newer(a, b) { // is a newer than b?
  const [x, y] = [parse(a), parse(b)];
  if (x.length < 3 || y.length < 3) return false;
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i];
  return false;
}

export async function version(installed, skillDir, opt = {}) {
  const install = /[\\/]plugins[\\/]/i.test(skillDir) ? 'plugin' : 'skill';
  console.log(`installed: ${installed} (${install} install)`);
  if (!opt.check) return;
  let latest;
  try {
    const res = await fetch(RELEASES, { headers: { 'User-Agent': 'darkroom-skill', Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    latest = await res.json();
  } catch (e) {
    console.log(`latest: not checked (${e.name === 'TimeoutError' ? 'no answer in 6 s' : e.message}); the installed version still works`);
    return;
  }
  const tag = String(latest.tag_name ?? '').replace(/^v/, '');
  if (!parse(tag).length) { console.log('latest: not checked (the release has no version number)'); return; }
  if (!newer(tag, installed)) { console.log(`latest: ${tag}: up to date`); return; }
  console.log(`latest: ${tag}: newer than ${installed}${latest.name ? ` ("${latest.name}")` : ''}${latest.html_url ? ` ${latest.html_url}` : ''}`);
  console.log(install === 'plugin'
    ? 'update: claude plugin update darkroom@darkroom (or /plugin in Claude Code), then restart Claude Code'
    : 'update: replace the darkroom skill folder with skill/darkroom from the new release, then restart Claude Code');
}
