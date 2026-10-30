/* Dark Motions · Meteor shower (B03) · module
   Thin meteors with fading tails streak diagonally across a dark sky at random moments.
   Use: night / space / launch hero, pricing backdrop
   Markup: put the snippet in demo.html#meteor-shower inside <div data-dm="meteor-shower">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('meteor-shower', function (r, k) {
    const sky = r.querySelector('.sky');
    for (let i = 0; i < 14; i++) {
      const m = document.createElement('span'); m.className = 'mt';
      m.style.left = k.rand(-10, 100) + '%';
      m.style.animationDuration = k.rand(2.2, 6) * k.dur() + 's';
      m.style.animationDelay = k.rand(0, 5) * k.dur() + 's';
      sky.append(m);
    }
  });
