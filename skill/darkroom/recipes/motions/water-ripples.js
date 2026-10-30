/* Dark Motions · Water ripples (K09) · module
   Moving the cursor leaves expanding rings behind it, like trailing a finger through still water.
   Use: spa, wellness, water / drinks brands, calm heroes · Visitor: move cursor
   Markup: put the snippet in demo.html#water-ripples inside <div data-dm="water-ripples">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('water-ripples', function (r, k) {
    let last = 0;
    k.on(r, 'pointermove', e => { const now = performance.now(); if (now - last < 90) return; last = now; const b = r.getBoundingClientRect(), i = document.createElement('i'); i.className = 'rw'; i.style.left = e.clientX - b.left + 'px'; i.style.top = e.clientY - b.top + 'px'; r.append(i); i.onanimationend = () => i.remove(); });
  });
