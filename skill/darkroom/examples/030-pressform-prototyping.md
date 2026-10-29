# Pressform · rapid injection-moulding prototypes
<!-- Darkroom example 030 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `modern` + `bold` (accent) | `hero-effect` | drawn-in-code backdrop (medium) | `reveal.js` |

## Say this
> /darkroom a light grey landing page for a plastic-parts prototyping studio. The hero background should be drawn in code: like looking through ribbed glass at bright orange shapes moving slowly, with film grain. A white pill navigation. No video needed.

## Build spec

### Brief & signature
Pressform makes 50–5,000 injection-moulded prototype parts in 10 working days from aluminium tools, in Eindhoven. Visitors are hardware engineers. Feeling: industrial, bright, exact. **Signature:** a drawn-in-code fluted-glass backdrop: three soft orange blobs drift on a light field behind vertical ribs that refract them (CSS: a blurred blob layer under a `repeating-linear-gradient` rib mask with offset copies), plus 5 % grain. **Supporting:** a white pill nav, a lead-time counter, part photos on white.

### Stack & files
`index.html`, `styles.css`, `backdrop.css` (below), `recipes/reveal.js`. No canvas, no WebGL: the backdrop is CSS only, so it costs little.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Schibsted Grotesk | 700 | headline |
| Text | Schibsted Grotesk | 400, 500 | UI |
| Figures | DM Mono | 400 | tolerances, prices |

### Tokens
```css
:root { --ground: #efefef; --ink: #141414; --ink-60: #14141499; --orange: #ff5f03; --white: #ffffff; --line: #1414141a;
  --display: "Schibsted Grotesk", system-ui, sans-serif; --mono: "DM Mono", ui-monospace, monospace; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Verbatim utilities
```css
.flute { position: absolute; inset: 0; overflow: hidden; background: var(--ground); }
.flute .blobs { position: absolute; inset: -20%; filter: blur(60px); }
.flute .blobs i { position: absolute; width: 38vw; aspect-ratio: 1; border-radius: 50%; background: var(--orange); opacity: .85; animation: drift 40s ease-in-out infinite alternate; }
.flute .blobs i:nth-child(2) { left: 48%; top: 30%; width: 26vw; animation-duration: 52s; opacity: .6; }
.flute .blobs i:nth-child(3) { left: 20%; top: 55%; width: 18vw; animation-duration: 34s; background: #ffd2b0; }
@keyframes drift { to { transform: translate(12vw, -8vh) scale(1.15); } }
.flute .ribs { position: absolute; inset: 0; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  -webkit-mask-image: repeating-linear-gradient(90deg, #000 0 22px, transparent 22px 44px); mask-image: repeating-linear-gradient(90deg, #000 0 22px, transparent 22px 44px); }
.flute .sheen { position: absolute; inset: 0; background: repeating-linear-gradient(90deg, #fff3 0 1px, transparent 1px 22px); }
.flute .grain { position: absolute; inset: 0; opacity: .05; pointer-events: none; background: url(grain.svg); } /* feTurbulence SVG, local file */
@media (prefers-reduced-motion: reduce) { .flute .blobs i { animation: none; } }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| backdrop | drawn in code | `.flute` | — | 34–52 s drifts | flat ground with one static blob | abstract only; it cannot show a part, so the parts appear in section 1 |
| part photos ×6 | the studio's own | `<img>` 1:1 on white | contain | reveal | TEMP | one part per photo on white seamless, raking light, scale ruler |

### Nav
White pill, padding 5 px, radius 999 px, inside a 1440 px container 12 px from the top: black circle mark 40 px; Process · Materials · Pricing · Files (14 px ink-60); CTA "Upload a CAD file" orange fill, white text, radius 999 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Real moulded parts in ten days. | Display 700, clamp(44px, 7vw, 116px) | 0.95 / −0.04em | ink | left gutter, bottom 16 vh, max 10ch | rise 20 px, 800 ms |
| Sub | Aluminium tools, production plastics, 50 to 5,000 parts. Made in Eindhoven. | Text 400, 18 px | 1.5 | ink-60 | right, aligned to H1 bottom, max 360 px | delay 150 ms |
| CTA | Upload a CAD file | as nav, 16 px | — | — | under sub | delay 250 ms |
| Spec chip | ±0.05 mm · 30+ resins · STEP, IGES, STL | Mono 13 px on white pill | — | ink | top-right under nav | fade |

### Sections
Parts (6 photos with resin and tolerance in mono), Process (4 steps with day counts, a horizontal timeline drawn in SVG), Pricing (tool + per-part example, TEMP), Upload (form with file input, visible label, accepted formats).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Blobs | always | — | 34 / 40 / 52 s alternate | ease-in-out | translate + scale |
| Hero text | load | `i × 120 ms` | 800 ms | `--ease-out` | 20 px, 0 → 0, 1 |
| Part tiles | in view | `i × 80 ms` | 600 ms | `--ease-out` | scale .96, 0 → 1, 1 |
Reduced motion: blobs still, text final.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Ribs | 14 px pitch | 18 px | 22 px | — |
| H1 | 42 px | 80 px | 116 px | 88 px |
| Nav | pill with mark + Menu + CTA icon | full | full | — |

### Acceptance
**First viewport:** at 1440 × 900 a light grey field seen through vertical ribbed glass, bright orange shapes drifting behind it with fine grain; a white pill nav; the bold headline bottom-left and an orange upload button. At 390 × 844 narrower ribs, headline and button over the lower half.
**Do not:** use WebGL for this; let a blob sit behind the headline at more than 60 % opacity; show parts the studio did not make; hotlink fonts.
