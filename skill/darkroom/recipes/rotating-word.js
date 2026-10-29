// One word in a sentence that changes in place, with zero reflow (the slot is as wide as the widest word).
//
//   <link rel="stylesheet" href="type-motion.css">
//   <h2>Coffee for <span data-rotate="slow mornings|long meetings|late trains" data-rotate-every="2400">slow mornings</span></h2>
//   import { rotatingWord } from './rotating-word.js'; rotatingWord();
//
// The first word is the real text. Screen readers get all words once via aria-label, not a change every 2 s.
// Pauses off screen, in hidden tabs and while hovered or focused. Reduced motion: the first word only.
// 3–5 words, 2–3 s each. Never the main claim's only noun: the sentence must make sense with the first word alone.

export function rotatingWord({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const stops = [...root.querySelectorAll('[data-rotate]')].map((el) => setup(el, reducedMotion));
  return { destroy() { stops.forEach((s) => s()); } };
}

function setup(el, reducedMotion) {
  const words = el.dataset.rotate.split('|').map((s) => s.trim()).filter(Boolean);
  if (words.length < 2 || reducedMotion) return () => {};
  const every = Math.max(1200, Number(el.dataset.rotateEvery) || 2400);
  el.setAttribute('aria-label', words.join(', '));
  el.classList.add('tm-slot', 'rw-slot');
  el.textContent = '';
  // the shown word stays readable; parked words are aria-hidden="true", which CSS also uses to park them below the slot
  const spans = words.map((w, i) => { const s = Object.assign(document.createElement('span'), { className: 'rw-word', textContent: w }); s.setAttribute('aria-hidden', i === 0 ? 'false' : 'true'); el.append(s); return s; });
  let i = 0; let timer = 0; let visible = false; let paused = false;
  const next = () => {
    const cur = spans[i]; i = (i + 1) % spans.length; const nx = spans[i];
    cur.classList.add('rw-out'); cur.setAttribute('aria-hidden', 'true');
    nx.classList.remove('rw-out'); nx.setAttribute('aria-hidden', 'false');
    setTimeout(() => cur.classList.remove('rw-out'), 650);
    el.dataset.rotateIndex = String(i);
  };
  const tick = () => { timer = 0; if (visible && !paused && !document.hidden) next(); schedule(); };
  const schedule = () => { if (!timer) timer = setTimeout(tick, every); };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(el);
  const hold = () => { paused = true; }; const go = () => { paused = false; };
  el.addEventListener('pointerenter', hold); el.addEventListener('pointerleave', go);
  el.closest('a, button')?.addEventListener('focus', hold); el.closest('a, button')?.addEventListener('blur', go);
  schedule();
  return () => { clearTimeout(timer); io.disconnect(); };
}
