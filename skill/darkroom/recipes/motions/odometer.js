/* Dark Motions · Odometer (N05) · module
   A counter that ticks up steadily; only the digits that change roll, like a car mileage dial.
   Use: live counters: orders, downloads, trees planted
   Markup: put the snippet in demo.html#odometer inside <div data-dm="odometer">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('odometer', function (r, k) {
    const od = r.querySelector('.od'); let n = 18496; const ds = [];
    for (let i = 0; i < 6; i++) { const d = document.createElement('span'); d.className = 'dg'; d.innerHTML = `<span>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(x => `<b>${x}</b>`).join('')}</span>`; od.append(d); ds.push({ s: d.firstChild, v: 0 }); }
    const set = (anim) => String(n).padStart(6, '0').split('').forEach((c, i) => {
      const d = ds[i], v = +c; if (v === d.v && anim) return;
      if (anim && v === 0 && d.v === 9) { d.s.style.transform = 'translateY(-10em)'; k.later(520, () => { d.s.style.transition = 'none'; d.s.style.transform = 'translateY(0)'; void d.s.offsetWidth; d.s.style.transition = ''; }); }
      else d.s.style.transform = `translateY(${-v}em)`;
      d.v = v;
    });
    set(false); k.every(700, () => { n += Math.random() < .3 ? 2 : 1; set(true); });
  });
