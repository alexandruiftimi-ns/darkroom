/* Dark Motions · Extrude (T15) · module
   Flat text slowly pulls out of the page into a solid block shadow, then sinks back.
   Use: retro, poster, bold sale headline
   Markup: put the snippet in demo.html#extrude inside <div data-dm="extrude">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('extrude', function (r, k) {
    const ex = r.querySelector('.ex'), front = r.querySelector('.front'), a = k.token('--dm-a') || '#e8b04a';
    for (let i = 10; i >= 1; i--) {
      const l = front.cloneNode(true); l.classList.remove('front'); l.classList.add('ly'); l.setAttribute('aria-hidden', 'true');
      l.style.setProperty('--i', i); l.style.color = i === 10 ? '#0008' : `color-mix(in srgb,${a} ${100 - i * 5}%,#000)`;
      ex.insertBefore(l, front);
    }
  });
