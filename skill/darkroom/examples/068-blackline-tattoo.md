# Blackline · fine-line tattoo studio
<!-- Darkroom example 068 · fictional studio · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing + portfolio | `art-gallery` + `cyberpunk` (ink only) | `animated` | none | `reveal.js`, `cursor-reveal.js` |

## Say this
> /darkroom a dark portfolio site for our fine-line tattoo studio: each artist's work in a grid, books open by month, a booking request form with placement and size, and aftercare info. Ink black, very fine details.

## Build spec

### Brief & signature
Blackline is three fine-line and single-needle artists in Lisbon; books open on the first of each month. Visitors are people planning a first or second tattoo, on phones. Feeling: precise, quiet, intimate. **Signature:** the portfolio grid on near-black where hovering a healed photo reveals the line drawing (stencil) underneath through a soft circle (`cursor-reveal.js`), showing how the drawing became the tattoo. **Supporting:** hairlines 0.5 px on retina, a "books open 1 March" status, a careful booking form.

### Stack & files
`index.html`, `artist-*.html` ×3, `book.html` (form to the studio's form service, file upload for references, placement, size in cm, budget), `styles.css`, `recipes/cursor-reveal.js`, `reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Cormorant | 300 | headings |
| Text | Inter Tight | 300, 500 | UI (a quiet text face under a chosen display) |

### Tokens
```css
:root { --ground: #0a0a0a; --ink: #ededea; --ink-60: #ededea99; --ink-30: #ededea4d; --skin: #d9b8a0; --line: #ededea1f;
  --display: "Cormorant", Georgia, serif; --text: "Inter Tight", system-ui, sans-serif; }
.hair { border-top: 0.5px solid var(--ink-30); } @media (max-resolution: 1dppx) { .hair { border-top-width: 1px; } }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| healed photos | each artist's portfolio, client consent (NEEDS 1) | `<img>` 4:5 | cover | base layer | — | healed (not fresh) work, daylight, skin neutral |
| stencils | the matching line drawings scanned and aligned (NEEDS 2) | `[data-reveal-top]` | aligned to the photo | cursor reveal | none (no reveal) | black line on transparent, placed over the skin at the same scale |

### Nav
60 px: "BLACKLINE" Text 500 13 px +0.3em; Artists · Healed work · Aftercare · Book; status chip "Books open 1 March" with a 6 px skin-colour dot (TEMP).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Lines that heal as fine as they were drawn. | Display 300, clamp(36px, 5.2vw, 84px) | 1.05 / −0.01em | ink | left gutter, top 26 vh, max 14ch | rise 16 px |
| Sub | Fine-line and single-needle tattoos by three artists in Príncipe Real, Lisbon. | Text 300, 17 px | 1.6 | ink-60 | under H1 | delay 100 ms |
| CTA | Request a booking | Text 500, 14 px +0.12em caps, 1 px ink border, radius 0 | — | — | under sub | delay 200 ms |
| Featured | one healed piece with its stencil reveal | — | — | — | columns 7–12, 4:5 | fade |

### Sections
Artists (three: portrait, style in one line, books open/closed), Healed work grid (3 columns, every tile with a stencil reveal where available; captions: placement, size, healed after N weeks), Aftercare (numbered steps), Book (form: name, email, artist, idea, placement, size cm, colour none, reference images, budget; consent text; age 18+ confirmation).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Reveal circle | pointer | — | lerp .1 | recipe | radius 0 → 14vw |
| Grid tiles | in view | `i × 60 ms` | 700 ms | `cubic-bezier(.22,1,.36,1)` | opacity 0 → 1 |
Reduced motion: tap toggles the stencil; no following.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Grid | 2 columns, tap reveal | 3 | 3 | 3 |
| Featured | under the CTA | right | right | right |

### Acceptance
**First viewport:** at 1440 × 900 near-black; a fine serif headline on the left with a thin-bordered booking button; on the right a healed tattoo photo where the pointer reveals the original line drawing through a soft circle. At 390 × 844 the headline, the button and the featured piece, tap to reveal.
**Do not:** show fresh, red tattoos as portfolio; show clients' faces; accept bookings without the age confirmation; use gothic blackletter type.
