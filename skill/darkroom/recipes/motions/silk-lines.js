/* Dark Motions · Silk lines (B13) · module
   A bundle of fine curved lines flows like silk in a breeze, each one slightly out of phase.
   Use: fintech / audio / premium hero, section divider band
   Markup: put the snippet in demo.html#silk-lines inside <div data-dm="silk-lines">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('silk-lines', function (r, k) {
    const svg = r.querySelector('svg'), N = 14, paths = [];
    for (let i = 0; i < N; i++) { const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('stroke', i % 4 === 0 ? 'var(--dm-a)' : '#f2efe9'); p.setAttribute('stroke-opacity', i % 4 === 0 ? .8 : .22); svg.append(p); paths.push(p); }
    k.loop(t => {
      const w = r.clientWidth, h = r.clientHeight; svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      paths.forEach((p, i) => {
        let d = ''; const off = i * 7;
        for (let x = 0; x <= w; x += 12) { const y = h / 2 + off - N * 3.5 + Math.sin(x / 90 + t * .9 + i * .25) * 34 + Math.sin(x / 37 - t * .6) * 8; d += (x ? 'L' : 'M') + x + ' ' + y.toFixed(1); }
        p.setAttribute('d', d);
      });
    });
  });
