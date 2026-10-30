/* Dark Motions · Weight wave (T14) · module
   A wave of boldness rolls through the word: letters swell from thin to heavy and back.
   Use: type-led brands, studio sites (needs a variable font: the site's own, here Inter)
   Markup: put the snippet in demo.html#weight-wave inside <div data-dm="weight-wave">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('weight-wave', function (r, k) { k.split(r.querySelector('.t')); });
