/* Dark Motions · Proximity rims (C03) · module
   A grid of cards whose borders light up only where the cursor is near, across all cards at once.
   Use: feature grid, bento section, pricing row · Visitor: move cursor
   Markup: put the snippet in demo.html#proximity-rims inside <div data-dm="proximity-rims">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('proximity-rims', function (r, k) {
    const ts = r.querySelectorAll('.t');
    k.on(r, 'pointermove', e => ts.forEach(t => { const b = t.getBoundingClientRect(); t.style.setProperty('--x', e.clientX - b.left + 'px'); t.style.setProperty('--y', e.clientY - b.top + 'px'); }));
  });
