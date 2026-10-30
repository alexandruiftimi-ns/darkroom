/* Dark Motions · Click stamps (K10) · module
   Each click stamps a bold little shape that pops in with a spin, then drops and fades.
   Use: playful brands, kids, events, interactive empty states · Visitor: click anywhere
   Markup: put the snippet in demo.html#click-stamps inside <div data-dm="click-stamps">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('click-stamps', function (r, k) {
    const shapes = ['<circle cx="20" cy="20" r="17"/>', '<path d="M20 2l5 12 13 1-10 9 3 13-11-7-11 7 3-13L2 15l13-1z"/>', '<path d="M20 3 37 35H3z"/>', '<rect x="5" y="5" width="30" height="30" rx="7"/>'], cols = ['var(--dm-a)', 'var(--dm-b)', 'var(--dm-c)', '#38e1c6'];
    k.on(r, 'pointerdown', e => { const b = r.getBoundingClientRect(), n = Math.floor(Math.random() * 4); const s = document.createElement('i'); s.className = 'sh'; s.style.cssText = `left:${e.clientX - b.left}px;top:${e.clientY - b.top}px;--r:${k.rand(-30, 30)}deg;color:${cols[Math.floor(Math.random() * 4)]}`; s.innerHTML = `<svg viewBox="0 0 40 40" width="40" height="40" fill="currentColor">${shapes[n]}</svg>`; r.append(s); s.onanimationend = () => s.remove(); });
  });
