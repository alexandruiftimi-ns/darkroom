/* Dark Motions · Wave letters (T10) · module
   Letters bob up and down in a slow travelling wave, like a flag in light wind.
   Use: playful brand line, loading text, kids and food brands
   Markup: put the snippet in demo.html#wave-letters inside <div data-dm="wave-letters">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('wave-letters', function (r, k) { k.split(r.querySelector('.t')); });
