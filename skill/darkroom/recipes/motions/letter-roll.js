/* Dark Motions · Letter roll (U10) · module
   On hover each letter rolls upward to reveal a copy of itself, one after another.
   Use: nav links, minimal text buttons, menu items · Visitor: hover
   Markup: put the snippet in demo.html#letter-roll inside <div data-dm="letter-roll">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('letter-roll', function (r) {
    const lb = r.querySelector('.lb'), t = lb.textContent; lb.textContent = '';
    [...t].forEach((ch, i) => { const c = ch === ' ' ? ' ' : ch; lb.insertAdjacentHTML('beforeend', `<span class="r" aria-hidden="true" style="--i:${i}"><span><b>${c}</b><b>${c}</b></span></span>`); });
  });
