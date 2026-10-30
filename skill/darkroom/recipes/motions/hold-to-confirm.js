/* Dark Motions · Hold to confirm (U09) · module
   Press and hold: colour fills the button left to right; let go early and it drains back.
   Use: destructive or important actions: delete, pay, publish · Visitor: press and hold
   Markup: put the snippet in demo.html#hold-to-confirm inside <div data-dm="hold-to-confirm">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('hold-to-confirm', function (r, k) {
    const b = r.querySelector('.bt'); let tm;
    const reset = () => { b.classList.remove('hold'); clearTimeout(tm); };
    k.on(b, 'pointerdown', () => { if (b.classList.contains('done')) return; b.classList.add('hold'); tm = setTimeout(() => { b.classList.remove('hold'); b.classList.add('done'); b.textContent = 'Published ✓'; k.later(2200, () => { b.classList.remove('done'); b.textContent = 'Hold to publish'; }); }, 1200 * k.dur()); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => k.on(b, ev, reset));
    k.cleans.push(() => clearTimeout(tm));
  });
