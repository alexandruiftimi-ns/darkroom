// A real 3D product (GLB/glTF) in the hero that the visitor can turn by dragging. Heavy: one per page, only when
// free rotation is the point (references/effects.md, "A real 3D model"). three.js is NOT shipped with Darkroom: the
// project provides it (npm, or a pinned, self-hosted copy) and passes the module URLs. Live rendering is not checked
// by Darkroom's suite (no three.js there); the fallback below is.
//
//   <div class="model" data-model-hero data-model="kettle.glb" data-three="/vendor/three.module.min.js" data-gltf-loader="/vendor/GLTFLoader.js">
//     <img class="model-poster" src="kettle-poster.webp" alt="The Fjell kettle in brushed steel">     ← stays until the model is on screen
//     <canvas aria-hidden="true"></canvas>
//   </div>
//   .model { position: relative; aspect-ratio: 4/3 } .model > * { position: absolute; inset: 0; width: 100%; height: 100% }
//   .model canvas { opacity: 0; transition: opacity .6s } .model[data-model-state="ready"] canvas { opacity: 1 }
//   import { modelHero } from './model-hero.js'; modelHero();
//
// Loads only when the element is near the screen, after first paint. Frames the model from its bounding box (camera
// distance = radius / sin(fov/2) × 1.15), DPR capped at 2, renders only while visible and only when something moved.
// Drag (mouse or touch) turns it around Y; a slow idle turn (6°/s) runs until the first drag, never under reduced motion.
// Any failure (missing three.js, missing model, no WebGL): the poster stays, data-model-state="error", no exception.

export function modelHero({ root = document } = {}) {
  const els = [...root.querySelectorAll('[data-model-hero]')];
  const io = new IntersectionObserver((entries) => { for (const e of entries) if (e.isIntersecting) { io.unobserve(e.target); load(e.target); } }, { rootMargin: '300px 0px' });
  els.forEach((el) => { el.dataset.modelState = 'waiting'; io.observe(el); });
  return { destroy() { io.disconnect(); } };
}

async function load(el) {
  el.dataset.modelState = 'loading';
  try {
    const THREE = await import(el.dataset.three);
    const { GLTFLoader } = await import(el.dataset.gltfLoader);
    const canvas = el.querySelector('canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x404040, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(3, 4, 5); scene.add(key);
    const gltf = await new GLTFLoader().loadAsync(el.dataset.model);
    const model = gltf.scene; const pivot = new THREE.Group(); pivot.add(model); scene.add(pivot);
    const box = new THREE.Box3().setFromObject(model); const centre = box.getCenter(new THREE.Vector3()); const sphere = box.getBoundingSphere(new THREE.Sphere());
    model.position.sub(centre);
    const camera = new THREE.PerspectiveCamera(30, 1, sphere.radius / 100, sphere.radius * 100);
    camera.position.set(0, sphere.radius * 0.25, (sphere.radius / Math.sin((camera.fov * Math.PI) / 360)) * 1.15);
    camera.lookAt(0, 0, 0);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let idle = !reduced; let drag = null; let dirty = true; let visible = true; let raf = 0; let lastT = performance.now();
    const resize = () => { const w = el.clientWidth; const h = el.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); dirty = true; kick(); };
    const frame = (now) => {
      raf = 0; const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
      if (idle) { pivot.rotation.y += (6 * Math.PI / 180) * dt; dirty = true; }
      if (dirty) { renderer.render(scene, camera); dirty = false; }
      if (visible && (idle || drag)) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf && visible) { lastT = performance.now(); raf = requestAnimationFrame(frame); } };
    el.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, r: pivot.rotation.y }; idle = false; el.setPointerCapture(e.pointerId); kick(); });
    el.addEventListener('pointermove', (e) => { if (!drag) return; pivot.rotation.y = drag.r + (e.clientX - drag.x) * 0.01; dirty = true; kick(); });
    el.addEventListener('pointerup', () => { drag = null; });
    el.style.touchAction = 'pan-y';
    new ResizeObserver(resize).observe(el);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(el);
    resize();
    renderer.render(scene, camera);
    el.dataset.modelState = 'ready';
  } catch (e) {
    el.dataset.modelState = 'error';
    el.dataset.modelError = String(e?.message ?? e).slice(0, 160);
  }
}
