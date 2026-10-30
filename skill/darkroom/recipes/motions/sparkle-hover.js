/* Dark Motions · Sparkle hover (U14) · module
   While hovered, small four-point stars twinkle in and out around the button.
   Use: premium / magic / beauty CTAs, "upgrade" buttons · Visitor: hover
   Markup: put the snippet in demo.html#sparkle-hover inside <div data-dm="sparkle-hover">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('sparkle-hover', function (r, k) {
    const sw = r.querySelector('.sw'); let hover = false;
    k.on(sw, 'pointerenter', () => hover = true); k.on(sw, 'pointerleave', () => hover = false);
    k.every(150, () => {
      if (!hover) return;
      const s = document.createElement('span'); s.className = 'st'; const sz = k.rand(8, 18);
      s.style.cssText = `--s:${sz}px;left:${k.rand(0, 100)}%;top:${k.rand(0, 100)}%;margin:${-sz / 2}px`;
      s.innerHTML = '<svg viewBox="0 0 20 20" width="100%" height="100%"><path fill="currentColor" d="M10 0C11 7 13 9 20 10C13 11 11 13 10 20C9 13 7 11 0 10C7 9 9 7 10 0Z"/></svg>';
      sw.append(s); s.onanimationend = () => s.remove();
    });
  });
