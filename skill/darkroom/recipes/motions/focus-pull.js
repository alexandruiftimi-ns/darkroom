/* Dark Motions · Focus pull (R11) · module
   Images arrive soft and slightly zoomed, then pull into sharp focus as they enter the view.
   Use: photography, galleries, product imagery on scroll · Visitor: scroll inside
   Markup: put the snippet in demo.html#focus-pull inside <div data-dm="focus-pull">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('focus-pull', function (r, k) { const sc = r.querySelector('.sc'); k.observe([...r.querySelectorAll('.ph')], e => e.target.classList.toggle('in', e.isIntersecting), { root: sc, threshold: .55 }); });
