/* Dark Motions · Falling beams (B12) · module
   Thin vertical lines with bright beads sliding down them at different speeds, like data rain.
   Use: dev-tool / AI hero, behind a terminal or code block
   Markup: put the snippet in demo.html#falling-beams inside <div data-dm="falling-beams">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('falling-beams', function (r, k) {
    const box = r.querySelector('.beams');
    for (let i = 0; i < 12; i++) { const b = document.createElement('i'); b.className = 'beam'; b.style.setProperty('--d', k.rand(2.4, 5.5) * k.dur() + 's'); b.style.setProperty('--dl', -k.rand(0, 5) + 's'); box.append(b); }
  });
