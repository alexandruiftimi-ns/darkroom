/* Dark Motions · Drawn path (R09) · module
   A winding line draws itself down the page exactly as far as you have scrolled, linking the steps.
   Use: process / timeline sections, journeys, roadmaps · Visitor: scroll inside
   Markup: put the snippet in demo.html#drawn-path inside <div data-dm="drawn-path">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('drawn-path', function (r, k) {
    const sc = r.querySelector('.sc'), fg = r.querySelector('.fg'), TOP = 50, H = 900; // must match the svg CSS
    // y (in path units) → fraction of path length; the path only goes downward, so a lookup table is exact enough
    const L = fg.getTotalLength(), N = 300, Y = []; for (let i = 0; i <= N; i++) Y.push(fg.getPointAtLength(L * i / N).y);
    const fracAt = y => { if (y <= Y[0]) return 0; for (let i = 1; i <= N; i++) if (Y[i] >= y) return (i - 1 + (y - Y[i - 1]) / (Y[i] - Y[i - 1] || 1)) / N; return 1; };
    const up = () => {
      const end = TOP + H, max = sc.scrollHeight - sc.clientHeight;
      const at = max > 0 ? Math.min(1, Math.max(0, (end - max) / sc.clientHeight)) : 1; // where the tip sits in the view, chosen so it lands on the end at the bottom
      const y = sc.scrollTop + sc.clientHeight * at - TOP;
      fg.style.setProperty('--p', fracAt(y).toFixed(4));
    };
    up(); k.on(sc, 'scroll', up, { passive: true });
  });
