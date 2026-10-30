/* Dark Motions · Warp field (B08) · module
   Stars stream outward from the centre in short streaks, the feeling of travelling forward fast.
   Use: launch, "go faster" product, transition between sections
   Markup: put the snippet in demo.html#warp-field inside <div data-dm="warp-field">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('warp-field', function (r, k) {
    const s = k.canvas();
    const S = Array.from({ length: 220 }, () => ({ x: k.rand(-1, 1), y: k.rand(-1, 1), z: Math.random() }));
    k.loop((t, dt) => {
      const { ctx, w, h } = s, cx = w / 2, cy = h / 2;
      ctx.fillStyle = 'rgba(11,11,13,.35)'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#f2efe9';
      for (const q of S) {
        const pz = q.z; q.z -= dt * .35;
        if (q.z <= .02) { q.x = k.rand(-1, 1); q.y = k.rand(-1, 1); q.z = 1; continue; }
        const sx = cx + q.x / q.z * w * .3, sy = cy + q.y / q.z * h * .3, px = cx + q.x / pz * w * .3, py = cy + q.y / pz * h * .3;
        ctx.globalAlpha = Math.min(1, (1 - q.z) * 1.4); ctx.lineWidth = (1 - q.z) * 2;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    });
  });
