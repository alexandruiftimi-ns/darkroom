# Ledger & Lamp · bookkeeping for freelancers in the creative trades
<!-- Darkroom example 019 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing | `trust` + `modern` | `hero-effect` | scroll-scrubbed video (heavy) | `scrub-video.js`, `reveal.js` |

## Say this
> /darkroom a white, friendly landing page for a bookkeeping service for freelance designers and photographers. The headline types itself out, and beside it a video of receipts being sorted moves forward and back as you scroll. Book a free call.

## Build spec

### Brief & signature
Ledger & Lamp is three bookkeepers in Utrecht who do monthly books and VAT returns for freelancers in design, photography and music, from € 85 a month. Visitors are freelancers dreading tax season. Feeling: calm, organised, human. **Signature:** a scroll-scrubbed overhead clip in which a messy pile of receipts sorts itself into three neat stacks as the visitor scrolls the first 120vh; scrolling up un-sorts it. **Supporting:** a typewriter headline with a zero-reflow caret, soft green check marks, calm reveals.

### Stack & files
Astro; `src/components/SortScene.astro` using `recipes/scrub-video.js` (clip encoded all-intra, 1280 px, 4 s, 30 fps); `src/scripts/type.ts` (typewriter, below); `reveal.js` for the rest.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Plus Jakarta Sans | 600 | headline |
| Text | Plus Jakarta Sans | 400, 500 | one family |
| Figures | IBM Plex Mono | 400 | prices, deadlines |

### Tokens
```css
:root { --ground: #fbfbf8; --ink: 160 10% 12%; --ink-60: hsl(var(--ink) / .6); --leaf: #2f7a52; --leaf-wash: #e6f1ea; --line: hsl(var(--ink) / .1);
  --display: "Plus Jakarta Sans", system-ui, sans-serif; --mono: "IBM Plex Mono", ui-monospace, monospace; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Verbatim utilities
```css
/* typewriter without reflow: the full text is laid out invisibly; a visible copy is clipped */
.type { position: relative; display: inline-block; }
.type .ghost { visibility: hidden; }
.type .live { position: absolute; inset: 0; white-space: pre-wrap; }
.type .caret { display: inline-block; width: .06em; height: .9em; background: currentColor; vertical-align: -.08em; animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .type .live { display: none; } .type .ghost { visibility: visible; } .caret { display: none; } }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| sort clip | filmed overhead with stop-motion or generated first/last frame (NEEDS 1) | `<video muted playsinline preload="auto" poster>` | contain, in a 4:5 card | scrubbed by `scrub-video.js` | end frame (sorted) | top-down on a pale oak desk; frame 1 scattered receipts, last frame three neat stacks with green clips; locked camera; edges fall to `#fbfbf8` |

### Nav
72 px: "Ledger & Lamp" Jakarta 600 18 px; Pricing · How it works · About; CTA "Book a free call" leaf fill, ground text, radius 10 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Your receipts, sorted by Friday. | Display 600, clamp(40px, 5.4vw, 84px) | 1.02 / −0.03em | ink | left, columns 1–6, top 22 vh | typed at 38 ms per character |
| Sub | Monthly books and VAT returns for freelance designers, photographers and musicians. From € 85 a month. | Text 400, 18 px | 1.55 | ink-60 | under H1, max 440 px | fade after typing |
| CTA | Book a free call | as nav, 16 px | — | — | under sub | fade |
| Checks | ✓ Fixed monthly price ✓ Your own bookkeeper ✓ Dutch and English | Text 500, 14 px | — | leaf | under CTA | fade |
| Clip card | — | 4:5, radius 20 px, `--leaf-wash` | — | — | columns 8–12, sticky top 14 vh during the 120vh scene | scrubbed |

### Sections
How it works (three steps, numbers in mono), Pricing (two plans in a 2-column table; prices incl. VAT; TEMP until confirmed), About (three photos, names), FAQ (`<details>`), footer with KvK number placeholder marked TEMP.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| H1 typing | load | 300 ms | 38 ms × 31 characters ≈ 1.2 s | steps | 0 → all characters |
| Sort clip | scroll 0–120vh | — | linear mapping | recipe's eased reading | frame 0 → last |
| Sections | in view | `i × 80 ms` | 600 ms | `--ease-out` | 16 px, 0 → 0, 1 |
Reduced motion: headline shown whole, the clip card shows the sorted end frame, no scrub.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Clip card | below the CTA, not sticky, plays once on enter | sticky | sticky | sticky |
| H1 | 36 px | 60 px | 84 px | 64 px |

### Acceptance
**First viewport:** at 1440 × 900 a warm white page; the headline types itself on the left in about a second without shifting the lines below; on the right a pile of receipts in a soft green card sorts into stacks as you scroll. At 390 × 844 headline, sub and button fill the screen, the card follows below.
**Do not:** let typing reflow the layout; scrub a long-GOP file; promise tax outcomes; show testimonials that were not supplied.
