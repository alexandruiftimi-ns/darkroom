/* Dark Motions · Constellation (B05) · module
   Slow-moving stars join with thin lines when they come close; the cursor pulls lines towards it.
   Use: AI / data / network product hero · Visitor: move cursor
   Markup: put the snippet in demo.html#constellation inside <div data-dm="constellation">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('constellation', function (r, k) {
    const s = k.canvas(), p = k.pointer(), a = k.token('--dm-a') || '#e8b04a';
    const P = Array.from({ length: 55 }, () => ({ x: Math.random() * 360, y: Math.random() * 260, vx: k.rand(-12, 12), vy: k.rand(-12, 12) }));
    k.loop((t, dt) => {
      const { ctx, w, h } = s; ctx.clearRect(0, 0, w, h);
      for (const q of P) { q.x += q.vx * dt; q.y += q.vy * dt; if (q.x < 0 || q.x > w) q.vx *= -1; if (q.y < 0 || q.y > h) q.vy *= -1; }
      ctx.lineWidth = 1;
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const d = Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y);
          if (d < 90) { ctx.strokeStyle = `rgba(242,239,233,${(1 - d / 90) * .35})`; ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y); ctx.stroke(); }
        }
        if (p.in) { const d = Math.hypot(P[i].x - p.x, P[i].y - p.y); if (d < 130) { ctx.strokeStyle = a; ctx.globalAlpha = 1 - d / 130; ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(p.x, p.y); ctx.stroke(); ctx.globalAlpha = 1; } }
        ctx.fillStyle = '#f2efe9'; ctx.beginPath(); ctx.arc(P[i].x, P[i].y, 1.6, 0, 7); ctx.fill();
      }
    });
  });
