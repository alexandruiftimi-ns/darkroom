# Orbit Optics · hand-built refracting telescopes
<!-- Darkroom example 009 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing | `cinematic` + `modern` | `hero-effect` | cursor-scrubbed video (heavy) | `scrub-video.js` (encode notes), `reveal.js` |

## Say this
> /darkroom a landing page for our telescopes. When you move the mouse left and right, the telescope in the hero turns with it, like you're walking around it. On phones it can just turn slowly. Dark, precise.

## Build spec

### Brief & signature
Orbit Optics builds 12 brass-and-carbon refractors a year in Jena, from € 9,400. Visitors are serious amateur astronomers. Feeling: instrument-grade, nocturnal, patient. **Signature:** a turntable clip of the telescope; the pointer's x position (lerp .12) seeks the video, so the visitor walks around the instrument. **Supporting:** spec numerals in tabular figures, one rim light, reveals below.

### Stack & files
Next.js App Router, `app/page.tsx`, client component `components/Turntable.tsx`. Clip encoded all-intra (`-g 1`) so seeking is instant (`recipes/README.md`, "Frames vs video"). `recipes/reveal.js` loaded as a client module.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Sora | 300, 500 | `next/font/local` with the woff2 files |
| Numerals | IBM Plex Mono | 400 | specs |

### Tokens
```css
:root { --ground: #07080b; --ink: 220 15% 93%; --brass: #d9a65b; --line: hsl(var(--ink) / .1);
  --display: "Sora", system-ui, sans-serif; --mono: "IBM Plex Mono", ui-monospace, monospace; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| turntable | rendered or filmed on a turntable (NEEDS 1) | `<video muted playsinline preload="auto" poster>` 1600 px, 6 s, 24 fps, all-intra | contain, x 62 % | seeked by pointer | poster still | one 360° turn, locked camera, telescope on its tripod centred at 62 % x; edges fall to `#07080b`; left 40 % empty; one brass rim light from the right |

### Nav
64 px, "Orbit Optics" Sora 500 16 px; Instruments · Workshop · Observe; CTA "Reserve a build slot" brass 1 px border, radius 4 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Label | No. 07 · 130 mm f/7 | Mono 400, 12 px +0.08em | 1 | brass | above H1 | fade |
| H1 | Walk around it. Then look through it. | Display 300, clamp(40px, 5.8vw, 92px) | 1.0 / −0.03em | ink-100 | left gutter, top 24 vh, max 11ch | lines rise 70 ms |
| Sub | Twelve refractors a year, figured and tested by hand in Jena. | Display 300, 18 px | 1.5 | ink-60 | under H1, max 380 px | delay 200 ms |
| CTA | Reserve a build slot | Display 500, 15 px, brass fill, ground text | — | — | under sub | delay 300 ms |
| Hint | Move the pointer to turn the telescope | Mono 11 px | — | ink-40 | bottom-left | hides after 1 s of movement |

### Interaction logic
`target = (clientX / innerWidth) * duration`; each frame `current += (target − current) × .12`; seek only when `!video.seeking` and `|current − video.currentTime| > 1/48`. Pointer devices only (`(hover: hover)`). Touch: drag horizontally to turn; if no input for 4 s, autoplay at 0.25 × speed in a loop. Pause rAF off-screen and in hidden tabs. No JS: poster image.

### Sections
1. **Specs:** a two-column table (aperture, focal length, glass, weight, lead time), mono numerals, hairlines.
2. **Workshop:** three photos of figuring, testing, assembly with 30 words each, mask reveals.
3. **Observe:** a night-sky photo by an owner (credited, TEMP) + quote.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Turntable | pointermove | — | per frame | lerp .12 | currentTime follows pointer |
| H1 lines | load | `0.2 + i × 0.07 s` | 800 ms | `--ease-out` | masked 100 % → 0 |
| Spec rows | in view | `i × 60 ms` | 500 ms | `--ease-out` | opacity 0 → 1 |
Reduced motion: poster at the three-quarter angle, no seeking, no autoplay.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Video | below the copy, 1:1 frame, slow auto-turn | right half | x 62 % | — |
| H1 | 38 px | 64 px | 92 px | 72 px |

### Acceptance
**First viewport:** at 1440 × 900 a black field, the telescope right of centre catching a brass edge light; moving the pointer turns it smoothly with no stutter; headline and button on the left. At 390 × 844 the telescope sits in a square below the headline and turns slowly by itself.
**Do not:** encode with long GOPs (seeking will stutter); seek on every mousemove without the lerp; show prices that were not supplied; add starfield particles.
