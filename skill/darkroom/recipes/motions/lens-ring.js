/* Dark Motions · Lens ring (K02) · module
   A dot sits on the cursor with a ring that trails behind; over a link the ring grows and wraps it.
   Use: portfolios, galleries, agency sites with few links · Visitor: move over the buttons
   Markup: put the snippet in demo.html#lens-ring inside <div data-dm="lens-ring">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('lens-ring', function (r, k) {
    const p = k.pointer(), dot = r.querySelector('.dot'), ring = r.querySelector('.ring'); let rx = 0, ry = 0;
    r.querySelectorAll('.tg').forEach(a => { k.on(a, 'pointerenter', () => ring.classList.add('big')); k.on(a, 'pointerleave', () => ring.classList.remove('big')); });
    k.loop((t, dt) => { if (!p.in) return; rx += (p.x - rx) * Math.min(1, dt * 9); ry += (p.y - ry) * Math.min(1, dt * 9); dot.style.transform = `translate(${p.x}px,${p.y}px)`; ring.style.setProperty('--x', rx + 'px'); ring.style.setProperty('--y', ry + 'px'); });
  });
