/* Dark Motions · Rising bars (N03) · module
   Bars grow up from the baseline one after another, each value label counting as its bar rises.
   Use: results, growth, comparison sections
   Markup: put the snippet in demo.html#rising-bars inside <div data-dm="rising-bars">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('rising-bars', function (r, k) {
    const ch = r.querySelector('.ch'), V = [32, 48, 41, 66, 58, 84, 97];
    V.forEach((v, i) => { const d = document.createElement('div'); d.className = 'bar'; d.innerHTML = `<b>0</b><i style="--h:${v * 1.3}px;--i:${i}"></i>`; ch.append(d); const b = d.querySelector('b'); const start = performance.now() + i * 110 * k.dur(); k.loop(() => { const x = Math.max(0, Math.min(1, (performance.now() - start) / (900 * k.dur()))); b.textContent = Math.round(v * (1 - Math.pow(1 - x, 3))); }); });
  });
