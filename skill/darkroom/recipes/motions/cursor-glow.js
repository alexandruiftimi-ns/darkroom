/* Dark Motions · Cursor glow (U11) · module
   A warm glow inside the button follows the cursor as it moves across it.
   Use: large CTA, pricing "choose plan" buttons · Visitor: move over button
   Markup: put the snippet in demo.html#cursor-glow inside <div data-dm="cursor-glow">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('cursor-glow', function (r, k) {
    const b = r.querySelector('.bt');
    k.on(b, 'pointermove', e => { const bb = b.getBoundingClientRect(); b.style.setProperty('--x', e.clientX - bb.left + 'px'); b.style.setProperty('--y', e.clientY - bb.top + 'px'); b.style.setProperty('--o', 1); });
    k.on(b, 'pointerleave', () => b.style.setProperty('--o', 0));
  });
