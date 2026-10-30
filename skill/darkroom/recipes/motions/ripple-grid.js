/* Dark Motions · Ripple grid (R08) · module
   Tiles pop in from the centre outward with a springy overshoot, like a stone dropped in a pond.
   Use: logo walls, feature icons, gallery grids, team photos
   Markup: put the snippet in demo.html#ripple-grid inside <div data-dm="ripple-grid">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('ripple-grid', function (r) { const g = r.querySelector('.g'); for (let i = 0; i < 24; i++) { const c = document.createElement('i'), x = i % 6 - 2.5, y = Math.floor(i / 6) - 1.5; c.style.setProperty('--d', Math.hypot(x, y).toFixed(2)); g.append(c); } });
