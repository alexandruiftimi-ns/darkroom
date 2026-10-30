/* Dark Motions · Repel dots (B17) · module
   An even dot grid that parts around the cursor like a magnet pushing iron filings, then springs back.
   Use: interactive hero backdrop, studio / portfolio sites · Visitor: move cursor
   Markup: put the snippet in demo.html#repel-dots inside <div data-dm="repel-dots">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('repel-dots', function (r, k) {
    const s = k.canvas(), p = k.pointer(), a = k.token('--dm-a') || '#e8b04a', gap = 20; let D = [], cw = 0;
    const build = () => { D = []; cw = s.w; for (let y = gap / 2; y < s.h; y += gap) for (let x = gap / 2; x < s.w; x += gap) D.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 }); };
    build();
    k.loop((t, dt) => {
      const { ctx, w, h } = s; if (w !== cw) build(); ctx.clearRect(0, 0, w, h);
      for (const d of D) {
        let fx = (d.ox - d.x) * 60, fy = (d.oy - d.y) * 60; let near = 0;
        if (p.in) { const dx = d.x - p.x, dy = d.y - p.y, dist = Math.hypot(dx, dy) || 1; if (dist < 90) { near = 1 - dist / 90; fx += dx / dist * near * 2600; fy += dy / dist * near * 2600; } }
        d.vx = (d.vx + fx * dt) * .86; d.vy = (d.vy + fy * dt) * .86; d.x += d.vx * dt; d.y += d.vy * dt;
        ctx.fillStyle = near > .05 ? a : '#ffffff40'; ctx.beginPath(); ctx.arc(d.x, d.y, 1.4 + near * 1.6, 0, 7); ctx.fill();
      }
    });
  });
