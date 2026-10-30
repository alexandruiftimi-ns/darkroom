/* Dark Motions · Filling ring (N02) · module
   A ring fills to its value with an easing that slows near the end; the number counts up in step.
   Use: satisfaction score, progress, skill / spec stats
   Markup: put the snippet in demo.html#filling-ring inside <div data-dm="filling-ring">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('filling-ring', function (r, k) {
    const fg = r.querySelector('.fg'), b = r.querySelector('b'), target = 87, D = 1.8; let t0 = null;
    k.loop(t => { if (t0 === null) t0 = t; const x = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - x, 4), v = target * e; fg.style.strokeDashoffset = 100 - v; b.textContent = Math.round(v) + '%'; if (t - t0 > D + 2.5) t0 = t; });
  });
