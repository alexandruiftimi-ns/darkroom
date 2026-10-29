# Basalt · geothermal bath house
<!-- Darkroom example 011 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `luxury` + `nature` | `hero-effect` | none | `reveal.js` |

## Say this
> /darkroom a page for a geothermal bath house on a lava field. Steam rising from the pools at the bottom of the screen, cropped so only the lower part of the video shows, dark sky above with the headline. Book a soak.

## Build spec

### Brief & signature
Basalt is an outdoor geothermal bath carved into a lava field an hour from Reykjavík: four pools at 36–41 °C, open until midnight. Visitors are travellers booking a time slot. Feeling: dark, warm, elemental. **Signature:** the steam loop is pushed down by 18 % so the frame starts at the water line; steam rises into a near-black sky where the headline sits. **Supporting:** the manual fade loop (the steam must never jump), a temperature row in tabular numerals, one serif display face.

### Stack & files
`index.html`, `styles.css`, `recipes/video-loop.js` (fade loop: `data-loop-fade="0.5"`, 500 ms out at the end and 500 ms in after the restart), `recipes/reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Bodoni Moda | 400 (opsz 72) | headings |
| Text | Manrope | 400, 600 | body and UI |

### Tokens
```css
:root { --ground: #0a0c0d; --ink: 200 10% 94%; --mineral: #8fd3d0; --line: hsl(var(--ink) / .12);
  --display: "Bodoni Moda", Georgia, serif; --text: "Manrope", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| steam loop | filmed at the baths or generated (NEEDS 1) | `<video muted playsinline autoplay poster>` | cover, `transform: translateY(18%)`, 50 % 100 % | fade loop | poster | milky blue pool in black lava, steam rising slowly; top half of the frame near-black sky falling to `#0a0c0d`; locked camera at water level, 9 s |
| pools ×4 | photos | `<img>` 4:5 | — | reveal | TEMP | each pool at dusk, no faces |

### Nav
72 px, "Basalt" Bodoni 26 px; Pools · Hours · Getting here; CTA "Book a soak" mineral fill `--mineral`, ground text, radius 999 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Forty degrees under a black sky. | Display 400, clamp(44px, 7vw, 116px) | 0.95 / −0.02em | ink-100 | centred, top 15 vh, max 13ch | rise 24 px, 1 s |
| Sub | Four pools in the lava field, an hour from Reykjavík. Open until midnight. | Text 400, 18 px | 1.5 | ink-80 | centred, max 420 px | delay 200 ms |
| CTA | Book a soak | Text 600, 16 px | — | — | centred | delay 300 ms |
| Temperatures | 36° · 38° · 40° · 41° | Text 600, 14 px tabular | 1 | ink-60 | bottom-centre 28 px | fade, delay 500 ms |

### Sections
1. **The pools:** four columns, each a photo, name, temperature, depth, 20 words.
2. **Hours and prices:** a table (slot, price incl. VAT, includes towel); TEMP until supplied.
3. **Getting here:** 40 words, a "Plan your drive" link; no map embed before consent.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Video | loop start / `ended` | 0 / 100 ms | 500 ms | linear (rAF) | opacity 0 ↔ 1 |
| Hero text | load | `i × 0.1 s` | 1000 ms | `--ease-out` | 24 px, 0 → 0, 1 |
| Pool cards | in view | `i × 120 ms` | 800 ms | `--ease-out` | mask open |
Reduced motion: poster, text final.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Video shift | translateY(28%) | 22 % | 18 % | 24 % |
| H1 | 42 px, top 12 vh | 76 px | 116 px | 84 px |
| Pools | 2 × 2 | 4 | 4 | — |

### Acceptance
**First viewport:** at 1440 × 900 the lower half is a milky pool with steam drifting up into darkness; the serif headline centred in the dark upper half; four temperatures along the bottom. At 390 × 844 the pool takes the lower 40 %, steam reaching the button.
**Do not:** fade the `<video>` with a CSS transition; show bathers' faces; add a gradient over the sky; state prices not supplied.
