/* Dark Motions · Photo trail (K03) · module
   Moving the cursor leaves a trail of small photos that pop in and fade away behind it.
   Use: photographer / studio homepages, lookbooks · Visitor: move cursor
   Markup: put the snippet in demo.html#photo-trail inside <div data-dm="photo-trail">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('photo-trail', function (r, k) {
    let lx = -999, ly = -999, n = 0;
    k.on(r, 'pointermove', e => {
      const b = r.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top;
      if (Math.hypot(x - lx, y - ly) < 70) return; lx = x; ly = y;
      const i = document.createElement('i'); i.className = 'pt ' + (n++ % 2 ? 'demo-ph' : 'demo-ph2');
      i.style.cssText += `left:${x}px;top:${y}px;--r:${k.rand(-10, 10)}deg`; r.append(i); i.onanimationend = () => i.remove();
    });
  });
