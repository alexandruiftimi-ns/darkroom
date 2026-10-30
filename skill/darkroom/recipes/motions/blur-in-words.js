/* Dark Motions · Blur-in words (T01) · module
   Words arrive one by one out of a soft blur, rising a quarter line as they sharpen.
   Use: hero headline, section titles
   Markup: put the snippet in demo.html#blur-in-words inside <div data-dm="blur-in-words">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('blur-in-words', function (r, k) { k.split(r.querySelector('.t'), 'words'); });
