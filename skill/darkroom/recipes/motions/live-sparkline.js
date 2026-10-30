/* Dark Motions · Live sparkline (N06) · module
   A small live chart that slides left as new values arrive, with a pulsing "now" dot and the current value.
   Use: status pages, live metrics, trading / energy dashboards on a landing page
   Markup: put the snippet in demo.html#live-sparkline inside <div data-dm="live-sparkline">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('live-sparkline', function (r, k) {
    const ln = r.querySelector('.ln'), b = r.querySelector('b'), V = Array.from({ length: 28 }, () => 45); let shift = 0, cur = 45;
    k.loop((t, dt) => {
      shift += dt / .6; if (shift >= 1) { shift -= 1; V.shift(); cur = Math.max(10, Math.min(85, cur + k.rand(-14, 14))); V.push(cur); b.textContent = Math.round(cur) + '%'; }
      const step = 260 / (V.length - 2); ln.setAttribute('d', V.map((v, i) => (i ? 'L' : 'M') + ((i - shift) * step).toFixed(1) + ' ' + (90 - v).toFixed(1)).join(' '));
    });
  });
