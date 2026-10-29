# Odile Brun · interior designer portfolio
<!-- Darkroom example 093 · fictional designer · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing + projects | `luxury` + `art-gallery` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a portfolio for my interior design studio: each project with large photos and the materials palette (wood, stone, fabric swatches), a calm and warm feeling, an enquiry form asking about the project. Hosted on Cloudflare.

## Build spec

### Brief & signature
Odile Brun designs apartments and small hotels in Lyon and Geneva; 20 projects published. Visitors are private clients and hotel owners. Feeling: warm, tactile, composed. **Signature:** every project opens with its materials board: 5–7 circular swatches (oak, travertine, linen, brass, clay paint) photographed close up and arranged in an arc beside the main photo, each named in small caps with its supplier; the same swatches recur as tiny dots on the project card in the index. **Supporting:** a warm limestone ground, long horizontal photo sequences, slow mask reveals.

### Stack & files
Astro content collections: `projects/*.md` (title, city, year, type, photos, swatches[{name, supplier, image}]); `src/pages/index.astro`, `src/pages/projects/[slug].astro`; enquiry form to the studio's form service; Cloudflare Pages.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Cormorant Garamond | 400 | project titles |
| Labels | Josefin Sans | 400 | small caps labels |
| Text | Lora | 400 | body |

### Tokens
```css
:root { --ground: #efe9df; --card: #f7f3ec; --ink: #2b2620; --ink-60: #2b262099; --brass: #a8834d; --line: #2b262022;
  --display: "Cormorant Garamond", Georgia, serif; --label: "Josefin Sans", system-ui, sans-serif; --text: "Lora", Georgia, serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| project photos | the studio's photographer (NEEDS 1, credit) | `<img>` 3:2 and 4:5, 1800 px | cover | mask reveal | — | daylight, styled, no people |
| swatches ×5–7 per project | macro photos of the real samples (NEEDS 2) | `<img>` 1:1 240 px in a circle | cover | static | flat colour circles | flat, raking light, edges cropped circular |

### Nav
72 px: "Odile Brun" Display 400 26 px; Projects · Studio · Enquire (Label 400 12 px +0.2em caps).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Rooms that feel like they were always there. | Display 400, clamp(36px, 5vw, 80px) | 1.08 / 0 | ink | columns 1–6, top 22 vh | fade 1.2 s |
| Sub | Interior design for apartments and small hotels in Lyon and Geneva. | Text 400, 18 px | 1.6 | ink-60 | under H1 | delay 200 ms |
| Featured project | photo + swatch arc | photo 4:5 columns 7–11; 6 swatches 72 px on an arc at the left edge of the photo | — | — | — | photo mask opens, swatches fade 80 ms apart |
| Caption | Apartment, Croix-Rousse, 2026 · oak, travertine, linen, brass | Label 400, 12 px caps | 1.4 | ink-60 | under the photo | none |

### Sections
Projects index (2-column cards: photo, title, city, a row of 5 swatch dots 12 px), Studio (Odile's portrait, 80 words, press only with links), Enquire (form: project type, city, size m², timing, budget range, message; visible labels).
**Project page:** title, facts row, the materials board at full size, then photos in a horizontal scroll-snap rail on desktop and vertical on phones, credits.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Photos | in view | 0 | 1100 ms | `cubic-bezier(.22,1,.36,1)` | clip-path inset(0 0 100% 0) → 0 |
| Swatches | after photo | `i × 80 ms` | 500 ms | ease-out | scale .9, 0 → 1, 1 |
Reduced motion: final states.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Swatch arc | a straight row of 6 under the photo | row | arc | arc |
| Index | 1 column | 2 | 2 | 2 |

### Acceptance
**First viewport:** at 1440 × 900 a warm limestone page; a serif sentence and a sub on the left; on the right a tall photo of a finished room with six round material swatches arcing beside it and a small caps caption naming them. At 390 × 844 the sentence, the photo and a row of swatches below.
**Do not:** use swatches that are not the real materials; credit nothing; add a slideshow; put pricing on the site unless asked.
