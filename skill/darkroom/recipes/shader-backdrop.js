// A living backdrop drawn by a small WebGL fragment shader, in the page's colours. Heavy: artsy and experimental
// packs only, one per page, and only when a still or a drawn-in-code video (darkroom media make) is not enough.
//
//   <div class="hero" data-shader="flow" data-shader-colours="#0b0b0d,#3b2f7a,#e2a35b" style="background:#0b0b0d">
//     <canvas data-shader-canvas aria-hidden="true"></canvas> …copy…
//   </div>
//   [data-shader] { position: relative } [data-shader-canvas] { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1 }
//   import { shaderBackdrop } from './shader-backdrop.js'; shaderBackdrop();
//
// Presets: flow (slow domain-warped colour field), aurora (soft vertical curtains). Edges fall to the first colour
// (the ground), so the canvas blends into the page. DPR capped at 1.5, 30 fps cap, paused off screen and in hidden
// tabs. No WebGL, or a context loss: the element's own background (the ground) shows. Reduced motion: one still frame.

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const COMMON = `precision mediump float;uniform vec2 r;uniform float t;uniform vec3 c0,c1,c2;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}
float edge(vec2 uv){vec2 d=uv-.5;return smoothstep(.62,.36,length(d*vec2(1.,.9)));}`;
const PRESETS = {
  flow: `${COMMON}void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*2.2;
    vec2 q=vec2(fbm(p+t*.03),fbm(p+vec2(5.2,1.3)-t*.025));float f=fbm(p+2.*q);
    vec3 col=mix(c0,c1,smoothstep(.25,.75,f));col=mix(col,c2,smoothstep(.62,.95,f)*.8);
    gl_FragColor=vec4(mix(c0,col,edge(uv)),1.);}`,
  aurora: `${COMMON}void main(){vec2 uv=gl_FragCoord.xy/r;float x=uv.x*3.;
    float w=fbm(vec2(x*.8+t*.02,t*.05));float band=smoothstep(.0,.35,uv.y-.25-w*.35)*smoothstep(.95,.45,uv.y-w*.2);
    float s=fbm(vec2(x*4.,uv.y*.6-t*.04));vec3 col=mix(c1,c2,s);
    gl_FragColor=vec4(mix(c0,mix(c0,col,band*.85),edge(uv)),1.);}`,
};

export function shaderBackdrop({ root = document, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
  const stops = [...root.querySelectorAll('[data-shader]')].map((el) => setup(el, reducedMotion));
  return { destroy() { stops.forEach((s) => s()); } };
}

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

function setup(el, reducedMotion) {
  const canvas = el.querySelector('[data-shader-canvas]'); const src = PRESETS[el.dataset.shader] || PRESETS.flow;
  if (!canvas) return () => {};
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) { el.dataset.shaderState = 'no-webgl'; canvas.hidden = true; return () => {}; }
  const sh = (type, code) => { const s = gl.createShader(type); gl.shaderSource(s, code); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
  const prog = gl.createProgram();
  try { gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, src)); gl.linkProgram(prog); }
  catch (e) { el.dataset.shaderState = 'error'; canvas.hidden = true; console.warn('shader-backdrop:', e.message); return () => {}; }
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (k) => gl.getUniformLocation(prog, k);
  const cols = (el.dataset.shaderColours || '#0b0b0d,#33307a,#e2a35b').split(',').map((s) => s.trim());
  ['c0', 'c1', 'c2'].forEach((k, i) => gl.uniform3fv(u(k), rgb(cols[i] || cols[0])));
  const uR = u('r'); const uT = u('t');
  let raf = 0; let visible = false; let last = 0; const t0 = performance.now(); let frames = 0;
  const size = () => { const dpr = Math.min(1.5, devicePixelRatio || 1); const w = Math.round(canvas.clientWidth * dpr); const h = Math.round(canvas.clientHeight * dpr); if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); } gl.uniform2f(uR, w, h); };
  const draw = (now) => { size(); gl.uniform1f(uT, reducedMotion ? 12 : (now - t0) / 1000); gl.drawArrays(gl.TRIANGLES, 0, 3); frames++; el.dataset.shaderFrames = String(frames); };
  const loop = (now) => { raf = 0; if (!visible || document.hidden) return; if (now - last >= 1000 / 30) { last = now; draw(now); } raf = requestAnimationFrame(loop); };
  const start = () => { if (reducedMotion) { draw(performance.now()); return; } if (!raf) raf = requestAnimationFrame(loop); };
  el.dataset.shaderState = reducedMotion ? 'still' : 'running';
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }); io.observe(el);
  const onVis = () => { if (!document.hidden && visible) start(); }; document.addEventListener('visibilitychange', onVis);
  const ro = new ResizeObserver(() => reducedMotion && draw(performance.now())); ro.observe(canvas);
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); cancelAnimationFrame(raf); raf = 0; canvas.hidden = true; el.dataset.shaderState = 'lost'; });
  return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); document.removeEventListener('visibilitychange', onVis); };
}
