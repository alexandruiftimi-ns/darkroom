# Hammer & Hue · traditional sign-painting studio
<!-- Darkroom example 022 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `hugo` | landing | `bold` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a loud, confident one-page site for a sign-painting studio: huge poster lettering for the name, a video of a brush painting gold letters on glass, a few numbers about us, and a big Get a quote button.

## Build spec

### Brief & signature
Hammer & Hue paints shopfronts, gold-leaf glass and murals by hand in Glasgow. Visitors are shop owners and breweries. Feeling: loud, crafted, proud. **Signature:** the studio name set as a shopfront fascia: HAMMER & HUE at 15vw in a condensed poster face, with the ampersand in gold and a slow brush-loop video showing through the letters (an SVG mask over a `<video>`, below). **Supporting:** red and cream poster blocks, numbers that count up once, chunky buttons.

### Stack & files
Hugo site (`darkroom platform scaffold hugo`): `layouts/index.html`, `assets/css/main.css` through Hugo Pipes, `static/media/brush.mp4`, `static/js/reveal.js`. Data for the numbers in `data/studio.yaml` so the owner edits them.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Bebas Neue | 400 | poster lettering |
| Text | Libre Franklin | 400, 700 | body |

### Tokens
```css
:root { --cream: #f3e9d2; --red: #b3261e; --ink: #1a1410; --gold: #c9a24a; --line: #1a141026;
  --display: "Bebas Neue", Impact, sans-serif; --text: "Libre Franklin", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Verbatim utilities
```css
/* video seen through the letters: the video sits under a cream layer with the name cut out by an SVG mask */
.fascia { position: relative; height: 15vw; }
.fascia video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.fascia svg { position: absolute; inset: 0; width: 100%; height: 100%; } /* <mask> with a white rect and the name in black text */
.fascia .h1 { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); } /* the real h1 text for readers */
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| brush loop | studio films a gilding session (NEEDS 1) | `<video muted loop playsinline autoplay poster>` inside `.fascia` | cover | loops | poster still of gold leaf | macro of a brush laying gold leaf on black glass, warm light, 10 s, slow |
| job photos ×6 | studio's photos | `<img>` 4:3 | — | mask reveal | TEMP tiles | finished shopfronts in daylight, the client's permission confirmed |

### Nav
On cream: "H&H" Display 32 px; Work · Process · Quote; CTA "Get a quote" red fill, cream text, 52 px tall, radius 0, 3 px ink border, `:active` translate(2px, 2px) with the shadow `4px 4px 0 var(--ink)` dropping to 2 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Fascia (h1) | HAMMER & HUE | Display 400, 15vw | 0.82 / −0.01em | brush video through the letters; `&` filled gold | full width, top 14 vh | mask opens left → right, 1.1 s |
| Strap | Hand-painted signs, gold leaf and murals. Glasgow, since 2009. | Text 700, 20 px | 1.35 | ink | under fascia, left gutter, max 520 px | rise 16 px |
| CTA | Get a quote | as nav, 18 px | — | — | right of strap | — |
| Numbers | 1,400 shopfronts · 23 carat leaf · 0 vinyl | Display 400, 64 px tabular; labels Text 400 14 px | 1 | red | bottom band on cream | count up once, 1.6 s |

Numbers come from `data/studio.yaml` and are TEMP until the owner confirms them; the final value is in the HTML.

### Sections
Work (6 tiles, 3 × 2, captions in Display 28 px), Process (four steps on red with cream text: Survey · Sketch · Paint · Fit), Quote (a form posting to the owner's form service, labels visible), footer.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Fascia mask | load | 0 | 1100 ms | `--ease-out` | clip-path inset(0 100% 0 0) → inset(0) |
| Numbers | in view, once | `i × 150 ms` | 1600 ms | ease-out | 0 → value (tabular) |
| Tiles | in view | `i × 100 ms` | 700 ms | `--ease-out` | mask open |
Reduced motion: fascia shows the poster through the letters, numbers final.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Fascia | two lines: HAMMER / & HUE at 28vw | 15vw | 15vw | 13vw |
| Numbers | stacked | row | row | row |

### Acceptance
**First viewport:** at 1440 × 900 a cream page with HAMMER & HUE across the full width in tall poster letters, gold leaf moving inside them, the gold ampersand, a bold strap and a red quote button; three red numbers along the bottom. At 390 × 844 the name on two lines, still filled with the brush film.
**Do not:** use vinyl-look fonts or script lettering for UI; show clients' signs without permission; animate numbers more than once; drop the hidden real h1.
