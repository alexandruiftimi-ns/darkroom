import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures'); // writes the page fixtures used by cases.json
fs.mkdirSync(dir, { recursive: true });

const page = ({ css = '', body = '', head = '', script = '', bodyStyle = '' }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fixture</title>
<link rel="icon" href="data:,">
<style>
  body { margin: 0; background: #fff; color: #111; font: 18px/1.5 Arial, sans-serif; ${bodyStyle} }
  main > section { padding: 48px 24px; max-width: 760px; }
  h1 { font-size: 44px; line-height: 1.1; margin: 0 0 12px; }
  h2 { font-size: 28px; margin: 0 0 8px; }
  a.btn, button { display: inline-block; min-width: 44px; min-height: 44px; padding: 10px 18px; background: #1d3fbb; color: #fff; border: 0; font: inherit; text-decoration: none; }
  .skip { position: absolute; left: -999px; } .skip:focus { left: 8px; top: 8px; background: #fff; color: #000; padding: 8px; }
  ${css}
</style>
${head}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<main id="main">
${body}
</main>
${script}
</body>
</html>
`;

const base = `<section id="hero"><h1>Brick ovens, lit at five</h1><p class="lead">Neighbourhood bakery in Lisbon.</p><a class="btn" href="#visit">Visit us</a></section>
<section id="visit"><h2>Find the oven</h2><p>Rua das Flores 14, open from six.</p></section>`;
const words = (n, w = 'decorative') => Array(n).fill(w).join(' ');
const out = {};

out['clean-landing'] = page({
  css: ':root{--ink:oklch(0.22 0.02 260);--ground:oklch(0.985 0.005 90);--accent:oklch(0.42 0.17 262)} body{background:var(--ground);color:var(--ink)} .btn{background:var(--accent);color:oklch(0.99 0 0)} a.btn:focus-visible{outline:3px solid var(--ink);outline-offset:3px} .lead{color:oklch(0.38 0.02 260)} @keyframes rise{from{opacity:.4;transform:translateY(8px)}to{opacity:1;transform:none}} h1{animation:rise .6s ease-out both} @media (prefers-reduced-motion:reduce){h1{animation:none}}',
  body: base,
});
out['alpha-text'] = page({ body: base.replace('Neighbourhood bakery in Lisbon.', '<span style="color:rgba(0,0,0,0.05)">Almost invisible words</span>') });
out['oklch-pale'] = page({ body: base.replace('Neighbourhood bakery in Lisbon.', '<span style="color:oklch(0.97 0 0)">Pale oklch words</span>') });
out['gradient-invisible'] = page({ bodyStyle: 'background:#000;color:#fff;', css: '.panel{background:linear-gradient(#fff,#fafafa);padding:12px}', body: base.replace('Neighbourhood bakery in Lisbon.', '<span class="panel" style="color:#fff">White on a white gradient</span>') });
out['translucent-bg'] = page({ bodyStyle: 'background:#000;color:#fff;', css: '.card{background:rgba(255,255,255,.5);padding:12px;display:inline-block}', body: base.replace('Neighbourhood bakery in Lisbon.', '<span class="card" style="color:#fff">White on half-white over black</span>') });
out['mobile-contrast'] = page({ css: '@media(max-width:600px){.lead{color:#eeeeee}}', body: base });
out['offscreen-text'] = page({ css: '.ghost{position:absolute;left:-9999px;font-family:GhostFace}', body: base + `<span class="ghost">${words(100, 'hidden')}</span>` });
out['broken-labelledby'] = page({ body: base.replace('<a class="btn" href="#visit">Visit us</a>', '<a class="btn" href="#visit">Visit us</a><button aria-labelledby="missing-id"></button>') });
out['valid-labelledby'] = page({ body: base.replace('<a class="btn" href="#visit">Visit us</a>', '<a class="btn" href="#visit">Visit us</a><button aria-labelledby="lbl"></button><span id="lbl" hidden>Open menu</span>') });
out['motion-ineffective'] = page({ css: '@keyframes drift{to{transform:translateX(120px)}} h1{animation:drift 2s infinite alternate} @media(prefers-reduced-motion:reduce){body{background:#fff}}', body: base });
out['motion-css-good'] = page({ css: '@keyframes drift{to{transform:translateX(120px)}} h1{animation:drift 2s infinite alternate} @media(prefers-reduced-motion:reduce){h1{animation:none}}', body: base });
out['motion-js-good'] = page({ css: '@keyframes drift{to{transform:translateX(120px)}} .moving{animation:drift 2s infinite alternate}', body: base, script: '<script>if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.querySelector("h1").classList.add("moving")</script>' });
out['ignore-marker'] = page({ body: base.replace('Neighbourhood bakery in Lisbon.', `Neighbourhood bakery in Lisbon. <span data-darkroom-ignore>${words(100)}</span>`) });
out['aria-hidden-copy'] = page({ body: base.replace('Neighbourhood bakery in Lisbon.', `Neighbourhood bakery in Lisbon. <span aria-hidden="true">${words(100)}</span>`) });
out['long-article'] = page({ body: `<section id="hero"><h1>A long read about ovens</h1>${Array(30).fill(`<p>${words(50, 'sentence')}.</p>`).join('')}</section><section><h2>More</h2><p>${words(40, 'closing')}.</p></section>` });
out['no-focus-indicator'] = page({ css: '*:focus{outline:none!important} a.btn:focus,button:focus{box-shadow:none}', body: base.replace('Visit us</a>', 'Visit us</a> <a class="btn" href="#a">Menu</a> <a class="btn" href="#b">Contact</a>') });
out['consent-dialog'] = page({ body: base.replace('<a class="btn" href="#visit">Visit us</a>', `<button id="content-ok" onclick="document.title='CLICKED-CONTENT-OK'">OK</button>`) + `<div role="dialog" aria-label="Cookie consent" style="position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #999;padding:12px"><p>We use cookies for analytics.</p><button onclick="document.title='CLICKED-ACCEPT'">Accept all</button> <button onclick="document.title='CLICKED-REJECT'">Reject all</button></div>` });
out['consent-none'] = page({ body: base.replace('<a class="btn" href="#visit">Visit us</a>', `<button onclick="document.title='CLICKED-CONTENT-OK'">OK</button> <a href="#" onclick="document.title='CLICKED-AGREE';return false">Agree</a>`) });
out['two-hero-fonts'] = page({ css: 'h1{font-family:Georgia,serif} .lead{font-family:Impact,fantasy} h2{font-family:"Courier New",monospace}', body: base });

out['display-type-box'] = page({ bodyStyle: 'background:#15110e;color:#f1e6d4;', css: '.panel{background:#efe4cf;height:120px} .big{font:300 40vw/.7 Georgia,serif;color:#ff6b2c;margin:0}', body: '<div class="panel"></div><p class="big" aria-label="Cinco">Cinco</p>' });

for (const [name, html] of Object.entries(out)) fs.writeFileSync(path.join(dir, `${name}.html`), html);
fs.writeFileSync(path.join(dir, 'read-settings.json'), JSON.stringify({ surface: 'read', fontBudget: 3 }, null, 2));
console.log(Object.keys(out).length, 'fixtures');
