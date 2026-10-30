/* Dark Motions · Grid pulses (B01) · module
   A faint blueprint grid where short sparks of light run along random lines and fade out.
   Use: SaaS / dev-tool hero, feature section backdrop
   Markup: put the snippet in demo.html#grid-pulses inside <div data-dm="grid-pulses">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('grid-pulses', function (r, k) {
    const g = r.querySelector('.grid');
    k.every(380, () => {
      const W = r.clientWidth, H = r.clientHeight, s = document.createElement('i'); s.className = 'spark';
      const horiz = Math.random() < .5, len = 70;
      if (horiz) { s.style.cssText = `top:${Math.floor(Math.random() * H / 40) * 40}px;left:${-len}px;width:${len}px;height:1px`; }
      else { s.style.cssText = `left:${Math.floor(Math.random() * W / 40) * 40}px;top:${-len}px;width:1px;height:${len}px;background:linear-gradient(180deg,transparent,var(--dm-a))`; }
      g.append(s);
      const a = s.animate([{ transform: 'translate(0,0)' }, { transform: horiz ? `translateX(${W + len * 2}px)` : `translateY(${H + len * 2}px)` }], { duration: k.rand(1800, 3200) * k.dur(), easing: 'linear' });
      a.onfinish = () => s.remove();
    });
  });
