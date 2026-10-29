// Typewriter with zero reflow: the line never jumps, because the longest phrase holds the space invisibly.
//
//   <link rel="stylesheet" href="type-motion.css">
//   <h1>We build <span data-typewriter="websites|shops|booking pages" data-tw-speed="55" data-tw-hold="1800">websites</span></h1>
//   import { typewriter } from './typewriter.js'; typewriter();
//
// One phrase: types once when it comes into view. Several (separated by |): types, holds, deletes, types the next,
// and loops. The element's real text (the first phrase) is what no-JS visitors, crawlers and screen readers get;
// with JS, aria-label carries all phrases once ("websites, shops, booking pages") and the moving letters are hidden.
// Pauses off screen and in hidden tabs. Reduced motion: the first phrase, still, no caret blinking.
// Put it at the end of a line: mid-sentence, the space reserved for the longest phrase shows as a gap before the next word.

export function typewriter({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const els = [...root.querySelectorAll('[data-typewriter]')];
  const stops = els.map((el) => setup(el, reducedMotion));
  return { destroy() { stops.forEach((s) => s()); } };
}

function setup(el, reducedMotion) {
  const phrases = (el.dataset.typewriter || el.textContent).split('|').map((s) => s.trim()).filter(Boolean);
  if (!phrases.length || reducedMotion) return () => {};
  const speed = Number(el.dataset.twSpeed) || 55; const hold = Number(el.dataset.twHold) || 1800;
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a));
  el.setAttribute('aria-label', phrases.join(', '));
  el.classList.add('tm-slot');
  el.textContent = '';
  const ghost = Object.assign(document.createElement('span'), { className: 'tm-ghost', textContent: longest });
  const live = Object.assign(document.createElement('span'), { className: 'tm-live tw-caret' });
  ghost.setAttribute('aria-hidden', 'true'); live.setAttribute('aria-hidden', 'true');
  el.append(ghost, live);
  let i = 0; let n = 0; let deleting = false; let timer = 0; let running = false;
  const step = () => {
    timer = 0;
    if (!running) return;
    const p = phrases[i];
    live.classList.add('tw-typing');
    if (!deleting) {
      n++; live.textContent = p.slice(0, n);
      if (n >= p.length) {
        live.classList.remove('tw-typing'); el.dataset.twDone = String(i);
        if (phrases.length === 1) { running = false; return; }
        deleting = true; timer = setTimeout(step, hold); return;
      }
      timer = setTimeout(step, speed * (0.7 + Math.random() * 0.6));
    } else {
      n--; live.textContent = p.slice(0, n);
      if (n <= 0) { deleting = false; i = (i + 1) % phrases.length; timer = setTimeout(step, speed * 4); return; }
      timer = setTimeout(step, speed / 2);
    }
  };
  const start = () => { if (running || (phrases.length === 1 && el.dataset.twDone)) return; running = true; if (!timer) timer = setTimeout(step, speed); };
  const stop = () => { running = false; clearTimeout(timer); timer = 0; };
  const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()));
  io.observe(el);
  const onVis = () => (document.hidden ? stop() : el.getBoundingClientRect().bottom > 0 && start());
  document.addEventListener('visibilitychange', onVis);
  return () => { stop(); io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
}
