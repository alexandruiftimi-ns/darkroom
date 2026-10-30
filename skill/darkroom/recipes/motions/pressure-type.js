/* Dark Motions · Pressure type (K05) · module
   Letters near the cursor swell heavier and taller, as if the cursor presses into the word.
   Use: type-led hero, studio name, interactive headline (needs a variable font: the site's own, here Inter) · Visitor: move over the word
   Markup: put the snippet in demo.html#pressure-type inside <div data-dm="pressure-type">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('pressure-type', function (r, k) {
    const cs = k.split(r.querySelector('.t')), p = k.pointer(), v = cs.map(() => 0); let cx = [], px = null;
    const measure = () => { const rb = r.getBoundingClientRect(); cx = cs.map(c => { const b = c.getBoundingClientRect(); return b.left - rb.left + b.width / 2; }); };
    document.fonts.ready.then(measure); measure();
    const ro = new ResizeObserver(measure); ro.observe(r); k.cleans.push(() => ro.disconnect());
    k.loop((t, dt) => {
      if (p.in) px = px === null ? p.x : px + (p.x - px) * Math.min(1, dt * 16);
      cs.forEach((c, i) => {
        const target = p.in && px !== null ? Math.max(0, 1 - Math.abs(cx[i] - px) / 130) : 0;
        const nv = v[i] + (target - v[i]) * Math.min(1, dt * 12); if (Math.abs(nv - v[i]) < .0005) return; v[i] = nv;
        const e = nv * nv * (3 - 2 * nv);
        c.style.fontWeight = (200 + e * 700).toFixed(0); c.style.transform = `scaleY(${(1 + e * .22).toFixed(3)})`;
      });
    });
  });
