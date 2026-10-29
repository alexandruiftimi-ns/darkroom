// Mobile menu without the usual bugs (pairs with nav.css).
// Below --nav-break the bar turns compact and the burger appears. The menu: locks page scroll (and restores the
// position), closes on a link click, on Esc, on a tap outside and when the window grows past the breakpoint,
// returns focus to the burger, keeps Tab inside while open, and sets aria-expanded. Without JS the links stay a
// normal visible list. Optional: data-nav-hide-on-scroll hides the bar on scroll down and shows it on scroll up.
//
//   import { nav } from './nav.js'; nav();

export function nav({ root = document } = {}) {
  const bar = root.querySelector('[data-nav]');
  if (!bar) return null;
  const toggle = bar.querySelector('[data-nav-toggle]');
  const panel = bar.querySelector('[data-nav-panel]');
  const breakPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-break')) || 860;
  const mq = matchMedia(`(max-width: ${breakPx - 0.02}px)`);
  const scrim = Object.assign(document.createElement('div'), { className: 'nav-scrim' });
  scrim.setAttribute('aria-hidden', 'true');
  bar.after(scrim);
  let open = false; let scrollY = 0;

  const setOpen = (v, { focus = true } = {}) => {
    if (v === open) return;
    open = v;
    bar.classList.toggle('is-open', v);
    scrim.classList.toggle('is-on', v);
    toggle?.setAttribute('aria-expanded', String(v));
    if (v) {
      scrollY = window.scrollY;
      document.documentElement.classList.add('nav-locked');
      panel.querySelector('a, button')?.focus({ preventScroll: true });
    } else {
      document.documentElement.classList.remove('nav-locked');
      window.scrollTo(0, scrollY);
      if (focus) toggle?.focus({ preventScroll: true });
    }
    bar.dispatchEvent(new CustomEvent('nav:toggle', { detail: { open: v } }));
  };
  const apply = () => {
    const compact = mq.matches;
    bar.classList.toggle('nav--compact', compact);
    if (toggle) toggle.hidden = !compact;
    if (!compact) setOpen(false, { focus: false });
  };
  toggle?.addEventListener('click', () => setOpen(!open));
  scrim.addEventListener('click', () => setOpen(false));
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false, { focus: false }); });
  const onKey = (e) => {
    if (!open) return;
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
    if (e.key !== 'Tab') return;
    const items = [toggle, ...panel.querySelectorAll('a, button')].filter(Boolean);
    const i = items.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); items.at(-1).focus(); }
    else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
  };
  document.addEventListener('keydown', onKey);
  mq.addEventListener('change', apply);
  apply();

  if (bar.hasAttribute('data-nav-hide-on-scroll') && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let last = window.scrollY;
    bar.style.transition = 'translate 320ms cubic-bezier(.32,.72,0,1)';
    addEventListener('scroll', () => {
      const y = window.scrollY;
      // '' rather than '0 0' when shown: any translate value makes the bar the containing block of the fixed panel.
      if (!open) bar.style.translate = y > last && y > 120 ? '0 calc(-100% - 24px)' : '';
      last = y;
    }, { passive: true });
  }
  return { open: () => setOpen(true), close: () => setOpen(false), get isOpen() { return open; } };
}
