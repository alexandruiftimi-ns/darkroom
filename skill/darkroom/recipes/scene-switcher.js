// Mood switcher: a few background clips (dawn / noon / night, sea / forest / city) that the visitor switches with real
// buttons. Clips crossfade over 1 s, only the shown clip plays, and the text tone follows each scene (data-tone="light"
// on a bright scene turns the copy dark). Hospitality and travel pages. Pairs with scene-switcher.css.
//
//   <section class="ss" data-scene-switcher data-tone="dark">
//     <div class="ss-media">
//       <div class="ss-scene" data-tone="dark"><video muted playsinline loop preload="none" data-src="dawn.mp4" poster="dawn.webp" aria-hidden="true"></video></div>
//       <div class="ss-scene" data-tone="light"><video muted playsinline loop preload="none" data-src="noon.mp4" poster="noon.webp" aria-hidden="true"></video></div>
//     </div>
//     <h1>…</h1>
//     <div class="ss-tabs" role="group" aria-label="Time of day"><button type="button" aria-pressed="true">Dawn</button><button type="button" aria-pressed="false">Noon</button></div>
//   </section>
//   import { sceneSwitcher } from './scene-switcher.js'; sceneSwitcher();
//
// Buttons map to clips in order. A clip loads only when chosen (or when its button is hovered or focused, to be
// ready). Optional data-scene-auto="8000" advances on its own and stops for good on the first click (and never runs
// under reduced motion). Pauses off screen and in hidden tabs. Reduced motion: posters only, switching still works.

export function sceneSwitcher({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const stops = [...root.querySelectorAll('[data-scene-switcher]')].map((el) => setup(el, reducedMotion));
  return { destroy() { stops.forEach((s) => s()); } };
}

function setup(el, reducedMotion) {
  const scenes = [...el.querySelectorAll('.ss-media > .ss-scene')]; const vids = scenes.map((s) => s.querySelector('video')); const btns = [...el.querySelectorAll('.ss-tabs button')];
  if (!scenes.length || vids.some((v) => !v)) return () => {};
  let active = Math.max(0, btns.findIndex((b) => b.getAttribute('aria-pressed') === 'true')); let visible = true; let auto = 0;
  const load = (v) => { if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.preload = 'auto'; } };
  const sync = () => {
    vids.forEach((v, i) => {
      const on = i === active;
      scenes[i].classList.toggle('is-on', on); // the wrapper fades, never the <video> itself
      if (on && !reducedMotion && visible && !document.hidden) { load(v); v.play().catch(() => {}); } else if (!v.paused) v.pause();
    });
    btns.forEach((b, i) => b.setAttribute('aria-pressed', String(i === active)));
    el.dataset.tone = scenes[active].dataset.tone || el.dataset.tone || 'dark';
    el.dataset.scene = String(active);
  };
  const choose = (i, user = false) => {
    if (user && auto) { clearInterval(auto); auto = 0; }
    if (i === active) return;
    const out = scenes[active]; out.classList.add('was-on'); setTimeout(() => out.classList.remove('was-on'), 1000); // stays under the incoming scene while it fades in
    active = i; sync();
  };
  btns.forEach((b, i) => { b.addEventListener('click', () => choose(i, true)); b.addEventListener('pointerenter', () => !reducedMotion && load(vids[i])); b.addEventListener('focus', () => !reducedMotion && load(vids[i])); });
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }); io.observe(el);
  const onVis = () => sync(); document.addEventListener('visibilitychange', onVis);
  const every = Number(el.dataset.sceneAuto);
  if (every && !reducedMotion) auto = setInterval(() => { if (visible && !document.hidden) choose((active + 1) % vids.length); }, Math.max(4000, every));
  sync();
  return () => { clearInterval(auto); io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
}
