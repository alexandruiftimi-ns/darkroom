/* Dark Motions · Reading ring (R07) · module
   A small ring in the corner fills as you read down the page, with the percentage inside.
   Use: articles, case studies, long product stories · Visitor: scroll inside
   Markup: put the snippet in demo.html#reading-ring inside <div data-dm="reading-ring">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('reading-ring', function (r, k) {
    const sc = r.querySelector('.sc'), ring = r.querySelector('.ring'), b = r.querySelector('b');
    k.on(sc, 'scroll', () => { const p = sc.scrollTop / (sc.scrollHeight - sc.clientHeight); ring.style.setProperty('--p', p.toFixed(3)); b.textContent = Math.round(p * 100); }, { passive: true });
  });
