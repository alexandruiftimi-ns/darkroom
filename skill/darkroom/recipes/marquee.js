// Seamless infinite marquee (pairs with marquee.css).
//
//   <div class="marquee" data-marquee data-marquee-speed="48" aria-label="Clients">
//     <ul class="marquee-track"><li>…</li> …</ul>
//   </div>
//   import { marquee } from './marquee.js'; marquee();
//
// The track is duplicated once (the copy is aria-hidden and inert, so screen readers and Tab see each item once),
// then translated by exactly half its width, so the loop has no jump. Speed in px/s (default 48). Pauses while
// hovered or focused, while off-screen, and with its own pause button (WCAG 2.2.2). Reduced motion: static row.

export function marquee({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const items = [...root.querySelectorAll('[data-marquee]')];
  if (reducedMotion) return { destroy() {} };
  const cleanups = items.map(setup);
  return { destroy() { cleanups.forEach((c) => c()); } };
}

function setup(el) {
  const track = el.querySelector('.marquee-track');
  if (!track || el.dataset.marqueeReady) return () => {};
  el.dataset.marqueeReady = '1';
  const originals = [...track.children];
  for (const child of originals) {
    const copy = child.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true'); copy.inert = true; copy.dataset.marqueeCopy = '';
    copy.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
    track.append(copy);
  }
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'marquee-pause'; btn.setAttribute('aria-pressed', 'false'); btn.setAttribute('aria-label', 'Pause the moving strip');
  btn.textContent = '❚❚';
  el.after(btn);
  let userPaused = false; let hover = false; let offscreen = false;
  const sync = () => el.classList.toggle('is-paused', userPaused || hover || offscreen);
  btn.addEventListener('click', () => {
    userPaused = !userPaused; btn.setAttribute('aria-pressed', String(userPaused));
    btn.setAttribute('aria-label', userPaused ? 'Play the moving strip' : 'Pause the moving strip'); btn.textContent = userPaused ? '▶' : '❚❚'; sync();
  });
  el.addEventListener('pointerenter', () => { hover = true; sync(); });
  el.addEventListener('pointerleave', () => { hover = false; sync(); });
  el.addEventListener('focusin', () => { hover = true; sync(); });
  el.addEventListener('focusout', () => { hover = false; sync(); });
  const speed = Number(el.dataset.marqueeSpeed) || 48;
  const measure = () => { el.style.setProperty('--marquee-dur', `${(track.scrollWidth / 2 / speed).toFixed(2)}s`); };
  el.classList.add('is-running');
  measure();
  const ro = new ResizeObserver(measure); ro.observe(track);
  const io = new IntersectionObserver(([e]) => { offscreen = !e.isIntersecting; sync(); }); io.observe(el);
  return () => { ro.disconnect(); io.disconnect(); btn.remove(); };
}
