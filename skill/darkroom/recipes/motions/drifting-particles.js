/* Dark Motions · Drifting particles (B04) · module
   Soft points of light drift slowly upward and sideways, a few brighter ones in the accent colour.
   Use: calm hero backdrop, wellness, ambient sections
   Markup: put the snippet in demo.html#drifting-particles inside <div data-dm="drifting-particles">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('drifting-particles', function (r, k) {
    const s = k.canvas(), a = k.token('--dm-a') || '#e8b04a';
    const P = Array.from({ length: 80 }, () => ({ x: Math.random(), y: Math.random(), r: k.rand(.5, 2.2), v: k.rand(.01, .04), p: Math.random() * 6, hot: Math.random() < .2 }));
    k.loop((t, dt) => {
      const { ctx, w, h } = s; ctx.clearRect(0, 0, w, h);
      for (const q of P) {
        q.y -= q.v * dt; if (q.y < -.02) { q.y = 1.02; q.x = Math.random(); }
        const x = (q.x + Math.sin(t * .4 + q.p) * .02) * w, y = q.y * h;
        ctx.globalAlpha = .35 + .35 * Math.sin(t + q.p);
        ctx.fillStyle = q.hot ? a : '#f2efe9';
        ctx.beginPath(); ctx.arc(x, y, q.r, 0, 7); ctx.fill();
      }
    });
  });
