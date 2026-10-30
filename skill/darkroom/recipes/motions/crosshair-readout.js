/* Dark Motions · Crosshair readout (K07) · module
   Fine horizontal and vertical lines cross at the cursor with live coordinates, like a measuring tool.
   Use: architecture, engineering, design-tool and map products · Visitor: move cursor
   Markup: put the snippet in demo.html#crosshair-readout inside <div data-dm="crosshair-readout">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('crosshair-readout', function (r, k) {
    const l = r.querySelector('.lbl');
    k.on(r, 'pointermove', e => { const b = r.getBoundingClientRect(), x = Math.round(e.clientX - b.left), y = Math.round(e.clientY - b.top); r.style.setProperty('--x', x + 'px'); r.style.setProperty('--y', y + 'px'); r.style.setProperty('--o', 1); l.textContent = `x ${x} · y ${y}`; });
    k.on(r, 'pointerleave', () => r.style.setProperty('--o', 0));
  });
