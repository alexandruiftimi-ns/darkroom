/* Dark Motions kit (~2 KB). Mounts a motion once on every [data-dm="name"] element when it first nears the screen,
   pauses it while it is off screen (loops, timers and CSS animations), and cleans up nothing it does not own.
   Reduced motion: loops draw a single frame; timers still run (content changes), CSS jumps to the end state (see each .css). */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('dm-js'); // hidden start states are scoped to .dm-js, so the page reads without JS

function makeKit(root) {
  const cleans = [];
  const k = {
    root, cleans, reduced, visible: true,
    dur() { return parseFloat(getComputedStyle(root).getPropertyValue('--dm-dur')) || 1; },
    token(n) { return getComputedStyle(root).getPropertyValue(n).trim(); },
    rand(a, b) { return a + Math.random() * (b - a); },
    split(el, mode = 'chars') {
      const text = el.textContent.trim(); el.textContent = ''; el.setAttribute('aria-label', text);
      let i = 0; const out = [];
      text.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { el.append(' '); return; }
        const w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
        if (mode === 'words') { w.textContent = part; w.style.setProperty('--i', i++); out.push(w); }
        else for (const ch of part) { const c = document.createElement('span'); c.className = 'c'; c.textContent = ch; c.style.setProperty('--i', i++); w.append(c); out.push(c); }
        el.append(w);
      });
      el.style.setProperty('--n', i); return out;
    },
    loop(fn) {
      if (reduced) { requestAnimationFrame(() => fn(0, 0)); return; }
      let id, last = performance.now(), t = 0;
      const f = (now) => { const d = k.dur(); const dt = Math.min(64, now - last) / 1000; last = now; if (k.visible) { t += dt / d; fn(t, dt / d); } id = requestAnimationFrame(f); };
      id = requestAnimationFrame(f); cleans.push(() => cancelAnimationFrame(id));
    },
    on(t, e, f, o) { t.addEventListener(e, f, o); cleans.push(() => t.removeEventListener(e, f, o)); },
    every(ms, f) { const id = setInterval(() => k.visible && f(), ms * k.dur()); cleans.push(() => clearInterval(id)); return id; },
    later(ms, f) { const id = setTimeout(f, ms * k.dur()); cleans.push(() => clearTimeout(id)); return id; },
    observe(els, cb, opts) { const io = new IntersectionObserver((es) => es.forEach(cb), opts); [].concat(els).forEach((e) => io.observe(e)); cleans.push(() => io.disconnect()); return io; },
    pointer(el = root) {
      const p = { x: -9999, y: -9999, in: false };
      if (!matchMedia('(pointer: fine)').matches) return p; // cursor effects: mouse and trackpad only
      k.on(el, 'pointermove', (e) => { const r = el.getBoundingClientRect(); p.x = e.clientX - r.left; p.y = e.clientY - r.top; p.in = true; });
      k.on(el, 'pointerleave', () => { p.in = false; }); return p;
    },
    canvas() {
      const c = document.createElement('canvas'); c.setAttribute('aria-hidden', 'true'); c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none'; root.prepend(c);
      const ctx = c.getContext('2d'); const s = { c, ctx, w: 0, h: 0 };
      const fit = () => { const r = root.getBoundingClientRect(); const dpr = Math.min(2, devicePixelRatio || 1); s.w = r.width; s.h = r.height; c.width = r.width * dpr; c.height = r.height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
      fit(); const ro = new ResizeObserver(fit); ro.observe(root); cleans.push(() => { ro.disconnect(); c.remove(); }); return s;
    },
  };
  return k;
}

export function motion(name, init) {
  const start = () => document.querySelectorAll(`[data-dm="${name}"]`).forEach((el) => {
    if (el.__dm) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !el.__dm) { el.__dm = makeKit(el); try { init(el, el.__dm); } catch (err) { console.error(`dark motion ${name}:`, err); } }
      if (el.__dm) { el.__dm.visible = e.isIntersecting; el.classList.toggle('dm-off', !e.isIntersecting); }
    }, { rootMargin: '200px' });
    io.observe(el);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
}
