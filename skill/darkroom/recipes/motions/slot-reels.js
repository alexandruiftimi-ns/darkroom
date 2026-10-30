/* Dark Motions · Slot reels (N01) · module
   Each digit spins like a slot-machine reel, blurred while moving, and the reels stop left to right.
   Use: big stats, prize / price reveals, "users today"
   Markup: put the snippet in demo.html#slot-reels inside <div data-dm="slot-reels">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('slot-reels', function (r, k) {
    const slot = r.querySelector('.slot'), N = 5, reels = [];
    for (let i = 0; i < N; i++) { const re = document.createElement('span'), st = document.createElement('span'); re.className = 'reel'; st.className = 'strip'; st.innerHTML = Array.from({ length: 30 }, (_, j) => `<span>${j % 10}</span>`).join(''); re.append(st); slot.append(re); reels.push(st); }
    const go = () => {
      const n = String(Math.floor(k.rand(10000, 99999)));
      reels.forEach((st, i) => { const d = +n[i]; st.style.transition = 'none'; st.style.transform = 'translateY(0)'; void st.offsetWidth; st.style.transition = ''; st.style.setProperty('--t', (1.1 + i * .25) * k.dur() + 's'); st.classList.add('spin'); st.style.transform = `translateY(${-(20 + d)}em)`; k.later((1.1 + i * .25) * 1000 * .8, () => st.classList.remove('spin')); });
    };
    k.later(200, go); k.every(4200, go);
  });
