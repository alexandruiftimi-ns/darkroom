/* Dark Motions · Bokeh (B14) · module
   Out-of-focus circles of light float up slowly and fade, like city lights through a wide lens.
   Use: evening / hospitality / jewellery hero, holiday campaigns
   Markup: put the snippet in demo.html#bokeh inside <div data-dm="bokeh">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('bokeh', function (r, k) {
    const box = r.querySelector('.bk'), cols = ['var(--dm-a)', 'var(--dm-c)', '#fff3d6', 'var(--dm-b)'];
    for (let i = 0; i < 18; i++) {
      const o = document.createElement('i'); o.className = 'o'; const size = k.rand(20, 80);
      o.style.cssText = `width:${size}px;height:${size}px;left:${k.rand(-5, 95)}%;top:${k.rand(0, 85)}%;background:${cols[i % 4]};--bl:${k.rand(2, 10)}px;--op:${k.rand(.25, .6)};--d:${k.rand(6, 11) * k.dur()}s;--dl:${-k.rand(0, 10)}s`;
      box.append(o);
    }
  });
