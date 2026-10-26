# Motion

## Grammar

- **One meaningful motion per section** (default). Each motion explains the section's claim (reveal, transform, travel) or responds to the user. Motion for its own sake is noise.
- Easing: entrances ease-out (e.g. `power2.out`, `cubic-bezier(.22,1,.36,1)`); ambient `sine.inOut`; scroll scrubs **linear** (scroll is the easing). No bounce/elastic unless the pack is playful.
- Durations: UI 150–300 ms; reveals 400–900 ms; nothing over ~1.2 s that blocks reading.
- Animate `transform`, `opacity`, `clip-path`, `filter` (carefully); never `transition: all`; avoid layout properties.
- Always reversible on scroll. Always cancelable. Pointer effects bounded (e.g. tilt ±3° X / ±5° Y), recentre on leave, off for touch and reduced motion.
- `prefers-reduced-motion: reduce` → static posters, instant reveals, no scrubbed travel; content and CTAs identical.
- Auto-moving content longer than 5 s next to other content needs pause/stop (WCAG 2.2.2). No flashing more than 3 times per second (2.3.1).
- **Sound is opt-in.** Never autoplay audio. A sound gate or toggle offers "enter without sound" with the same size, contrast and position weight as "with sound"; remember the choice and keep a visible toggle (library: good/overworld-audio, good/maria-vasilyeva, good/emotion-agency).
- Native scroll. No scroll-jacking; smooth-scroll libraries only if tested with keyboard, back/forward and assistive tech.

## Technique decision tree (least complex convincing illusion)

| Need | Use | Avoid |
|---|---|---|
| Atmosphere only | One still + light/particle layer | Video for a static mood |
| Depth | 2–5 alpha layers, 4–20 px parallax | Large overtravel that breaks photography |
| Photoreal fixed-path transform (turntable, dive) | Pre-rendered clip → WebP frames → Canvas, scrubbed | Pretending a still rotates |
| A few viewpoints | Multi-angle sprite set, clamped | Claiming 360° from one image |
| Free orbit, live reflections | Real 3D (GLB + Three.js/R3F) | Faking it with CSS 3D on a photo |
| Lens/mask transition | SVG/CSS mask + scale, or a short clip | Full WebGL for a 1-second effect |
| Exploded product | Separate part renders + transforms | One baked image "animated" |
| UI micro-motion | CSS / small GSAP | Video credits for a hover |

Tested building blocks live in `recipes/` (frames, seeked video, scene progress, pointer tilt); the *whether and how* is `references/motion-craft.md`. Frame sequences: start 48–72 frames, poster first, load nearby frames first, cap DPR, draw only on frame change, pause when hidden. ~8 MB decoded per 1080p frame — bound memory.

## Signature moments by pack (starting points)

cinematic: object rotation / lens dive · luxury: slow mask reveal of product · modern: UI that responds instantly · bold: hard cut + type scale jump · cyberpunk: light sweep, scanline only on media · editorial: none or sticky headline · restaurant: dish close-up reveal · catalog: image swap on hover, quick filter response · nature: slow parallax of landscape layers · art: artwork enlarges to full bleed · artsy: playful cursor / colour field shift · family: gentle bounce on press only · trust: none beyond state feedback.
