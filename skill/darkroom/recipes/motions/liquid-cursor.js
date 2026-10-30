/* Dark Motions · Liquid cursor (K06) · module
   A soft blob chases the cursor, stretching in the direction it moves and merging with a smaller one.
   Use: creative agencies, drinks, fluid / organic brands · Visitor: move cursor
   Markup: put the snippet in demo.html#liquid-cursor inside <div data-dm="liquid-cursor">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('liquid-cursor', function (r, k) {
    const p = k.pointer(), a = r.querySelector('.a'), b = r.querySelector('.b'); let ax = 180, ay = 130, bx = 180, by = 130;
    k.loop((t, dt) => {
      const tx = p.in ? p.x : r.clientWidth / 2, ty = p.in ? p.y : r.clientHeight * .3;
      const nx = ax + (tx - ax) * Math.min(1, dt * 7), ny = ay + (ty - ay) * Math.min(1, dt * 7), vx = nx - ax, vy = ny - ay; ax = nx; ay = ny;
      bx += (tx - bx) * Math.min(1, dt * 18); by += (ty - by) * Math.min(1, dt * 18);
      const sp = Math.min(.6, Math.hypot(vx, vy) / 25), ang = Math.atan2(vy, vx);
      a.style.transform = `translate(${ax}px,${ay}px) rotate(${ang}rad) scale(${1 + sp},${1 - sp * .5})`;
      b.style.transform = `translate(${bx}px,${by}px)`;
    });
  });
