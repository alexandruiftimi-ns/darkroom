# Folio · an e-reader, in an apple.com-like language
<!-- Darkroom example 100 · fictional product · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing (product) | `like:apple` → `modern` | `story` | scroll-scrubbed frames (heavy) | `scrub-frames.js`, `scene-progress.js`, `reveal.js` |

## Say this
> /darkroom a product page for our e-reader that looks like apple.com: huge product shots, big short headlines, the device turning as you scroll, then features one by one. But it has to be clearly our own brand, not a copy.

## Build spec

### Brief & signature
Folio is a 7-inch warm-light e-reader with a paper-feel screen, 6 weeks of battery, € 189, from a Utrecht startup. Look-alike rules (`commands/lookalike.md`): measure apple.com's design language live (scale, spacing, rhythm, restraint), take the language and never the identity: no Apple fonts, no Apple product or colour names, no copy patterns lifted, the client's own colours and an OFL type substitute. **Signature:** after a giant headline, the device rotates from front to edge-on as you scroll (72 frames), shows a 4.8 mm edge with the measurement drawn as a thin line, then turns back to reveal a page of a book with warm light coming up (screen frames). **Supporting:** one feature per viewport, huge numbers in tabular figures, near-white ground with one deep green accent.

### Stack & files
Next.js; `components/Turn.tsx` with `recipes/scrub-frames.js` (render of the client's CAD, locked camera; desktop 1600 px AVIF, phone 900 px); `components/WarmLight.tsx` (`scene-progress.js` drives a CSS warm overlay on the screen frame from 0 % to 60 %); `reveal.js` for features.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Inter Tight | 600 | the OFL substitute measured against the reference's proportions (record the comparison in the bible) |
| Text | Inter Tight | 400 | — |

### Tokens
```css
:root { --ground: #fbfbfa; --ink: #1d1d1f; --ink-60: #1d1d1f99; --folio: #1f5c4a; --line: #1d1d1f14;
  --display: "Inter Tight", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```
Measured from the reference (values to be confirmed by `darkroom study`): H1 ≈ 80–96 px desktop, section padding ≈ 160 px, one idea per viewport.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| turn frames | rendered from the client's CAD (NEEDS 1) | canvas over poster | contain, centred | frame = progress | poster (front) | white seamless `#fbfbfa`, soft top light, device turns front → edge → front; no reflections of a studio |
| warm-light screen | two renders of the screen (cool, warm) (NEEDS 2) | stacked `<img>` | aligned | opacity by progress | cool only | a page of an invented novel's text, crisp |

### Nav
44 px, sticky, ground at 80 % with blur 20 px: "Folio" Display 600 17 px left; Overview · Specs · Buy right (13 px); "Buy" pill folio fill.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Product name | Folio | Display 600, 21 px | 1 | folio | centred, top 12 vh | fade |
| H1 | Paper, finally portable. | Display 600, clamp(48px, 8vw, 96px) | 1.05 / −0.03em | ink | centred under the name | rise 20 px, 900 ms |
| Price line | From € 189 · ships in May | Text 400, 19 px | 1.4 | ink-60 | centred | delay 200 ms |
| CTAs | Buy · Learn more › | folio pill / text link | — | — | centred | delay 300 ms |
| Device | front poster | height 56 vh | — | — | centred below | scene starts at its top |

### Sections
Turn scene (240vh): edge-on at 50 % with "4.8 mm" and a 1 px measurement line; Warm light (160vh): the screen warms as you scroll, "From cool daylight to candle-warm, without blue light."; Battery: "6 weeks" at 20vw tabular; Feel: macro of the matte screen; Specs table; Buy (colours: Ink, Fern; storage 16/32 GB; € incl. VAT). Figures TEMP until supplied.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Turn frames | scroll 0–240vh | — | linear | recipe | 0 → 71 |
| Measurement line | progress .45–.55 | — | linear | — | scaleX 0 → 1 |
| Warm overlay | progress of its scene | — | linear | — | opacity 0 → .6 |
| Feature headings | in view | 0 | 900 ms | `--ease-out` | 24 px, 0 → 0, 1 |
Reduced motion: front still, an edge-on still with the measurement, the warm screen still; nothing pinned.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| H1 | 44 px | 72 px | 96 px | 76 px |
| Turn scene | 180vh, phone frames | 220vh | 240vh | 220vh |

### Acceptance
**First viewport:** at 1440 × 900 a near-white page with the small green product name, a huge three-word headline centred, price and two calls to action, and the device front-on below; scrolling turns it edge-on with "4.8 mm", then back to a page that warms like candlelight. At 390 × 844 the same centred stack. The distinctness test passes: no Apple logo, fonts, copy, product names or signature colour pairs.
**Do not:** use SF Pro or Apple product names; copy any headline; use a reference screenshot as an asset; exceed one idea per viewport.
