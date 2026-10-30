/* Dark Motions · Pixel dissolve (R04) · module
   A grid of dark squares covering the image winks out in random order until the picture is clear.
   Use: tech / gaming / digital art reveals, loading-to-image
   Markup: put the snippet in demo.html#pixel-dissolve inside <div data-dm="pixel-dissolve">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('pixel-dissolve', function (r, k) { const px = r.querySelector('.px'); for (let i = 0; i < 140; i++) { const c = document.createElement('i'); c.style.setProperty('--d', k.rand(.1, 1.5) * k.dur() + 's'); px.append(c); } });
