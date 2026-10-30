/* Dark Motions · Watching eyes (K08) · module
   A pair of cartoon eyes follow the cursor around the screen and blink now and then.
   Use: friendly 404, mascots, kids / pet brands, login screens · Visitor: move cursor
   Markup: put the snippet in demo.html#watching-eyes inside <div data-dm="watching-eyes">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('watching-eyes', function (r, k) {
    const es = [...r.querySelectorAll('.e')];
    k.on(r, 'pointermove', ev => es.forEach(e => { const b = e.getBoundingClientRect(), dx = ev.clientX - (b.left + b.width / 2), dy = ev.clientY - (b.top + b.height / 2), a = Math.atan2(dy, dx), d = Math.min(18, Math.hypot(dx, dy) / 6); e.firstChild.style.setProperty('--px', Math.cos(a) * d + 'px'); e.firstChild.style.setProperty('--py', Math.sin(a) * d + 'px'); }));
  });
