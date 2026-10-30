/* Dark Motions · Press ripple (U03) · module
   A circle of light spreads out from the exact point you press, then fades.
   Use: any button or tappable card; app-like interfaces · Visitor: click
   Markup: put the snippet in demo.html#press-ripple inside <div data-dm="press-ripple">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('press-ripple', function (r, k) {
    const b = r.querySelector('.bt');
    k.on(b, 'pointerdown', e => { const bb = b.getBoundingClientRect(), d = Math.hypot(bb.width, bb.height) * 2, s = document.createElement('span'); s.className = 'rp'; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - bb.left - d / 2}px;top:${e.clientY - bb.top - d / 2}px`; b.append(s); s.onanimationend = () => s.remove(); });
  });
