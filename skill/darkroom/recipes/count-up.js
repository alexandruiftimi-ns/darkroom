// Stats that count up when they come into view, without ever showing a blank or a wrong number.
// The final value is in the HTML, so no-JS visitors, crawlers, screenshots and screen readers get the real figure.
//
//   <strong class="stat" data-count-up>12,480</strong>           (prefix, suffix and separators are read from the text)
//   <strong data-count-up data-count-from="0" data-count-duration="1800" data-count-decimals="1">4.9</strong>
//   import { countUp } from './count-up.js'; countUp();
//
// Uses font-variant-numeric: tabular-nums while counting so the line doesn't jitter, and reserves the final width.
// The number animates once (ease-out, 1.5–2 s). aria-label carries the final value; the moving digits are aria-hidden.
// Reduced motion, or an element already past on load: shows the final value at once.

export function countUp({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const els = [...root.querySelectorAll('[data-count-up]')];
  if (reducedMotion || !('IntersectionObserver' in window)) return { destroy() {} };
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { io.unobserve(e.target); run(e.target); }
  }, { threshold: 0.6 });
  for (const el of els) {
    const parsed = parse(el.textContent);
    if (!parsed) continue;
    el.__count = parsed;
    if (el.getBoundingClientRect().bottom < 0) continue; // scrolled past already (e.g. a restored position)
    el.setAttribute('aria-label', el.textContent.trim());
    el.style.fontVariantNumeric = 'tabular-nums';
    el.style.display ||= 'inline-block';
    el.style.minWidth = `${el.getBoundingClientRect().width}px`;
    io.observe(el);
  }
  return { destroy() { io.disconnect(); els.forEach(finish); } };
}

function parse(text) {
  const m = /^(\D*?)(\d(?:[\d.,'  ]*\d)?)(\D*)$/.exec(text.trim());
  if (!m) return null;
  const raw = m[2];
  const d = /[.,](\d{1,2})$/.exec(raw); // one or two digits after the last separator = decimals; three = a thousands group
  const int = d ? raw.slice(0, -(d[1].length + 1)) : raw;
  return { prefix: m[1], suffix: m[3], value: Number(int.replace(/\D/g, '') + (d ? `.${d[1]}` : '')), decimals: d ? d[1].length : 0,
    group: (int.match(/\D/) || [''])[0], dec: d ? raw[raw.length - d[1].length - 1] : '.', text: text.trim() };
}

function format(n, { decimals, group, dec }) {
  const [i, f] = Math.abs(n).toFixed(decimals).split('.');
  const int = group ? i.replace(/\B(?=(\d{3})+(?!\d))/g, group) : i;
  return `${n < 0 ? '-' : ''}${int}${f ? dec + f : ''}`;
}

function run(el) {
  const p = el.__count;
  const from = Number(el.dataset.countFrom) || 0;
  const decimals = el.dataset.countDecimals !== undefined ? Number(el.dataset.countDecimals) : p.decimals;
  const dur = Number(el.dataset.countDuration) || 1800;
  const span = document.createElement('span'); span.setAttribute('aria-hidden', 'true');
  el.textContent = ''; el.append(span);
  const t0 = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    span.textContent = `${p.prefix}${format(from + (p.value - from) * eased, { ...p, decimals })}${p.suffix}`;
    if (t < 1) requestAnimationFrame(step); else finish(el);
  };
  requestAnimationFrame(step);
}

function finish(el) {
  if (!el.__count) return;
  el.textContent = el.__count.text;
  el.removeAttribute('aria-label');
  el.dataset.countDone = '';
}
