/* Dark Motions · Spring letters (T02) · module
   Each letter springs up from behind its own baseline with a small overshoot, left to right.
   Use: hero headline, brand name
   Markup: put the snippet in demo.html#spring-letters inside <div data-dm="spring-letters">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('spring-letters', function (r, k) { k.split(r.querySelector('.t')); });
