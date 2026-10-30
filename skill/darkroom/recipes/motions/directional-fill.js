/* Dark Motions · Directional fill (U06) · module
   Colour fills the button from the side the cursor enters and drains out the side it leaves.
   Use: secondary CTA, outline buttons, menu items · Visitor: hover from different sides
   Markup: put the snippet in demo.html#directional-fill inside <div data-dm="directional-fill">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('directional-fill', function (r, k) {
    const b = r.querySelector('.bt');
    const side = e => { const bb = b.getBoundingClientRect(); return e.clientX - bb.left < bb.width / 2 ? 'left' : 'right'; };
    k.on(b, 'pointerenter', e => { b.style.setProperty('--o', side(e)); b.classList.add('on'); });
    k.on(b, 'pointerleave', e => { b.style.setProperty('--o', side(e)); b.classList.remove('on'); });
  });
