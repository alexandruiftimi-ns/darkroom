/* Dark Motions · Card torch (C04) · module
   A soft pool of light follows the cursor across the card surface, like a torch on paper.
   Use: product card, case-study tile, testimonial · Visitor: move cursor over card
   Markup: put the snippet in demo.html#card-torch inside <div data-dm="card-torch">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('card-torch', function (r, k) {
    const c = r.querySelector('.cd');
    k.on(c, 'pointermove', e => { const b = c.getBoundingClientRect(); c.style.setProperty('--x', e.clientX - b.left + 'px'); c.style.setProperty('--y', e.clientY - b.top + 'px'); c.style.setProperty('--o', 1); });
    k.on(c, 'pointerleave', () => c.style.setProperty('--o', 0));
  });
