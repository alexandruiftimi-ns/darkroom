/* Dark Motions · Send → done (U12) · module
   Click: the button shrinks to a circle with a spinner, then pops a check mark and returns.
   Use: forms: subscribe, send, save, add to cart · Visitor: click
   Markup: put the snippet in demo.html#send-done inside <div data-dm="send-done">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('send-done', function (r, k) {
    const b = r.querySelector('.bt');
    k.on(b, 'click', () => { if (b.className.includes('busy') || b.className.includes('ok')) return; b.classList.add('busy'); k.later(1300, () => { b.classList.replace('busy', 'ok'); k.later(1600, () => b.classList.remove('ok')); }); });
  });
