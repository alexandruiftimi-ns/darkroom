/* Dark Motions · Fold down (R12) · module
   Cards unfold from their top edge towards you like paper flaps as they scroll into view.
   Use: testimonials, FAQ, feature lists, menus · Visitor: scroll inside
   Markup: put the snippet in demo.html#fold-down inside <div data-dm="fold-down">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('fold-down', function (r, k) { const sc = r.querySelector('.sc'); k.observe([...r.querySelectorAll('.f')], e => e.isIntersecting && e.target.classList.add('in'), { root: sc, threshold: .3 }); });
