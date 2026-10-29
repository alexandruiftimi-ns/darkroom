// Text that decodes from random glyphs, left to right, when it comes into view or on hover. Tech and editorial-tech
// packs only: on a warm, craft or trust page it reads as a gimmick. Width never changes (the final text holds the
// space invisibly underneath).
//
//   <link rel="stylesheet" href="type-motion.css">
//   <span data-scramble>SYSTEM ONLINE</span>   <a href="#" data-scramble="hover">Read the docs</a>
//   import { scramble } from './scramble.js'; scramble();
//
// Duration ~700 ms (data-scramble-ms). Glyphs: A–Z, 0–9 and a few symbols; spaces stay spaces. Screen readers read
// the real text (aria-label); the moving glyphs are aria-hidden. Reduced motion: never scrambles.

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>';

export function scramble({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  if (reducedMotion) return { destroy() {} };
  const els = [...root.querySelectorAll('[data-scramble]')];
  const io = new IntersectionObserver((entries) => { for (const e of entries) if (e.isIntersecting) { io.unobserve(e.target); play(e.target); } }, { threshold: 0.6 });
  for (const el of els) {
    prepare(el);
    if (el.dataset.scramble === 'hover') { el.addEventListener('pointerenter', () => play(el)); el.addEventListener('focus', () => play(el)); }
    else io.observe(el);
  }
  return { destroy() { io.disconnect(); } };
}

function prepare(el) {
  if (el.__scr) return;
  const text = el.textContent;
  el.setAttribute('aria-label', text.trim());
  el.classList.add('tm-slot');
  el.textContent = '';
  const ghost = Object.assign(document.createElement('span'), { className: 'tm-ghost', textContent: text });
  const live = Object.assign(document.createElement('span'), { className: 'tm-live', textContent: text });
  ghost.setAttribute('aria-hidden', 'true'); live.setAttribute('aria-hidden', 'true');
  el.append(ghost, live);
  el.__scr = { text, live, raf: 0 };
}

function play(el) {
  const s = el.__scr; if (!s || s.raf) return;
  const ms = Number(el.dataset.scrambleMs) || 700; const t0 = performance.now(); const n = s.text.length;
  el.dataset.scrambling = '';
  const frame = (now) => {
    const p = Math.min(1, (now - t0) / ms); const settled = Math.floor(p * n);
    let out = '';
    for (let i = 0; i < n; i++) { const c = s.text[i]; out += i < settled || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]; }
    s.live.textContent = out;
    if (p < 1) s.raf = requestAnimationFrame(frame);
    else { s.live.textContent = s.text; s.raf = 0; delete el.dataset.scrambling; el.dataset.scrambled = ''; }
  };
  s.raf = requestAnimationFrame(frame);
}
