/* Dark Motions · Word drop (T17) · module
   Words fall in from above with a little tilt, bounce once on the line and settle straight.
   Use: playful headline, food, toys, event posters
   Markup: put the snippet in demo.html#word-drop inside <div data-dm="word-drop">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('word-drop', function (r, k) { k.split(r.querySelector('.t'), 'words').forEach(w => w.style.setProperty('--r', k.rand(-14, 14) + 'deg')); });
