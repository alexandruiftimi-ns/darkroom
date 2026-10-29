# Maison Arden · a single perfume, made in Grasse
<!-- Darkroom example 040 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `shopify` | landing (product) | `luxury` | `hero-effect` | none | `reveal.js` |

## Say this
> /darkroom a Shopify landing page for our one perfume. Deep navy, the bottle in slow fog in a full-screen video, a centred serif headline, very few words, one Add to bag button. It should feel quiet and expensive, not like every other glass-and-gradient site.

## Build spec

### Brief & signature
Maison Arden makes one fragrance, "Nº 9 Fougère Nuit", 50 ml at € 165, in a Grasse workshop. Visitors arrive from print and social. Feeling: hushed, nocturnal, rare. **Signature:** the bottle stands still in a slow drift of fog; only the fog moves; the headline sits centred above it in a high-contrast serif with no other decoration, and the price line and Add to bag sit at the base of the bottle like a museum label. **Supporting:** the fade loop, a long notes list in small caps, a sheet transition into the story section. Luxury pack: centred layout is ON (pack rule), glass OFF.

### Stack & files
Shopify OS 2.0: `sections/arden-hero.liquid` (video setting, product picker, headline text setting), product form with the variant id, `assets/arden.css`, `assets/loop.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Bodoni Moda | 400 (opsz 96) | headline |
| Text | Jost | 400, 500 | label, UI |

### Tokens
```css
:root { --ground: #08142a; --ink: 40 30% 94%; --ink-60: hsl(var(--ink) / .6); --line: hsl(var(--ink) / .14);
  --display: "Bodoni Moda", Didot, serif; --text: "Jost", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| fog loop | filmed in a studio with the real bottle, or image-to-video from the brand's product photo (NEEDS 1) | `<video muted playsinline autoplay poster>` | cover, 50 % 62 % | fade loop | poster | the bottle centred at 62 % height, absolutely still; low fog drifting right to left across it; deep navy studio falling to `#08142a` at every edge; top 40 % empty; 10 s |

### Nav
Minimal, 72 px: "MAISON ARDEN" Jost 500 13 px +0.24em (tracked caps ON in luxury) centred; left "The scent", right "Bag (0)".

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Fern, at midnight. | Display 400, clamp(48px, 7.4vw, 124px) | 0.95 / −0.02em | ink | centred, top 18 vh | opacity 0 → 1, 1.4 s |
| Label line 1 | Nº 9 Fougère Nuit · Eau de parfum · 50 ml | Text 500, 12 px +0.2em caps | 1.4 | ink-60 | centred under the bottle, bottom 13 vh | fade, delay 600 ms |
| Label line 2 | € 165 | Text 400, 16 px tabular | 1 | ink | under line 1 | same |
| CTA | Add to bag | Text 500, 14 px +0.12em caps; 1 px ink border, transparent; hover: ink fill, ground text 250 ms | — | — | under the price, 20 px gap | same |

Price, size and name come from the Shopify product; the hero only references them.

### Sections
1. **Story:** rises over the hero as a sheet (`border-radius: 48px 48px 0 0; margin-top: -48px; background: #0d1b36`): 60 words in Bodoni 28 px/1.4 italic.
2. **Notes:** three columns in caps 12 px +0.2em: Top · bergamot, clary sage / Heart · fern, lavender / Base · oakmoss, tonka (TEMP until the perfumer confirms).
3. **The workshop:** one photo + 40 words.
4. **Product details:** ingredients list (required), shipping, returns.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| H1 | load | 200 ms | 1400 ms | `--ease-out` | opacity 0 → 1 |
| Label + CTA | load | 600 ms | 900 ms | `--ease-out` | opacity 0 → 1 |
| Fog loop | 0.8 s before the end | — | 800 ms | linear | opacity fade and restart |
| Story sheet | scroll | — | native | — | rises over the hero |
Reduced motion: poster, everything visible.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| H1 | 44 px, top 14 vh | 88 px | 124 px | 90 px |
| Bottle focal | 50 % 66 %, phone clip | 50 % 62 % | 50 % 62 % | — |
| Label | bottom 9 vh | 12 vh | 13 vh | 8 vh |

### Acceptance
**First viewport:** at 1440 × 900 deep navy, the bottle motionless at the centre while fog drifts across it; "Fern, at midnight." centred above in a fine serif; under the bottle a small caps label, the price and a thin-bordered Add to bag button. At 390 × 844 the same column, all of it above the fold.
**Do not:** add glass, gradients or a badge; move the bottle; use more than 40 words above the fold; generate a bottle that is not the real one; skip the ingredients list.
