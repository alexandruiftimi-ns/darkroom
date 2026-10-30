/* Dark Motions · Confetti pop (U08) · module
   Clicking bursts a handful of paper confetti from the button that tumbles down with gravity.
   Use: sign-up success, "order placed", celebration moments · Visitor: click
   Markup: put the snippet in demo.html#confetti-pop inside <div data-dm="confetti-pop">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('confetti-pop', function (r, k) {
    const s = k.canvas(), b = r.querySelector('.bt'), cols = [k.token('--dm-a'), k.token('--dm-b'), k.token('--dm-c'), '#f2efe9', '#38e1c6'];
    let P = [];
    k.on(b, 'click', () => {
      const bb = b.getBoundingClientRect(), rb = r.getBoundingClientRect(), x = bb.left - rb.left + bb.width / 2, y = bb.top - rb.top + bb.height / 2;
      for (let i = 0; i < 90; i++) { const a = k.rand(-Math.PI * .95, -Math.PI * .05), v = k.rand(180, 480); P.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: k.rand(0, 6), vr: k.rand(-10, 10), w: k.rand(4, 8), h: k.rand(6, 12), c: cols[i % cols.length], life: 1 }); }
    });
    k.loop((t, dt) => {
      const { ctx, w, h } = s; ctx.clearRect(0, 0, w, h);
      P = P.filter(p => p.life > 0 && p.y < h + 20);
      for (const p of P) { p.vy += 600 * dt; p.vx *= .985; p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt; p.life -= dt * .35; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.scale(1, Math.cos(p.r * 2)); ctx.globalAlpha = Math.min(1, p.life * 2); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore(); }
    });
  });
