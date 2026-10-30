/* Dark Motions · Flicker grid (B11) · module
   A grid of tiny squares where random cells softly brighten and dim, like a living display.
   Use: tech / security / data hero, CTA band
   Markup: put the snippet in demo.html#flicker-grid inside <div data-dm="flicker-grid">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('flicker-grid', function (r, k) {
    const s = k.canvas(), a = k.token('--dm-a') || '#e8b04a', cell = 9, sz = 5;
    let cols = 0, rows = 0, A = [];
    const reset = () => { cols = Math.ceil(s.w / cell); rows = Math.ceil(s.h / cell); A = Array.from({ length: cols * rows }, () => Math.random() * .3); };
    reset();
    k.loop((t, dt) => {
      const { ctx, w, h } = s; if (Math.ceil(w / cell) !== cols) reset();
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = a;
      for (let i = 0; i < A.length; i++) {
        if (Math.random() < dt * 1.2) A[i] = Math.random() * .45;
        const x = (i % cols) * cell, y = Math.floor(i / cols) * cell;
        const fade = 1 - Math.min(1, Math.hypot(x - w / 2, y - h / 2) / (w * .55));
        ctx.globalAlpha = A[i] * fade; ctx.fillRect(x, y, sz, sz);
      }
      ctx.globalAlpha = 1;
    });
  });
