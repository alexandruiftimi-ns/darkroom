/* Dark Motions · Comet tail (K01) · module
   A chain of dots follows the cursor, each one lagging the one before, shrinking into a tail.
   Use: playful portfolio, creative studio homepages · Visitor: move cursor
   Markup: put the snippet in demo.html#comet-tail inside <div data-dm="comet-tail">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('comet-tail', function (r, k) {
    const p = k.pointer(), N = 14, D = [];
    for (let i = 0; i < N; i++) { const d = document.createElement('i'); d.className = 'd'; const s = 14 - i * .8; d.style.cssText = `width:${s}px;height:${s}px;margin:${-s / 2}px;opacity:${1 - i / N}`; r.append(d); D.push({ el: d, x: 180, y: 130 }); }
    k.loop((t, dt) => { let tx = p.in ? p.x : r.clientWidth / 2 + Math.cos(t) * 80, ty = p.in ? p.y : r.clientHeight / 2 + Math.sin(t * 2) * 40; D.forEach(d => { d.x += (tx - d.x) * Math.min(1, dt * 22); d.y += (ty - d.y) * Math.min(1, dt * 22); d.el.style.transform = `translate(${d.x}px,${d.y}px)`; tx = d.x; ty = d.y; }); });
  });
