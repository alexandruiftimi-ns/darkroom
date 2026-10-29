# Kōyō · ikebana classes and installations
<!-- Darkroom example 029 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `jekyll` | landing | `art-gallery` (monochrome) | `calm` | none | — |

## Say this
> /darkroom a strictly black-and-white site for an ikebana teacher in Lyon: no colour at all in the design, only her flower photos carry colour. One big photo in the hero, very spacious, classes and booking below. Hosted free on GitHub Pages.

## Build spec

### Brief & signature
Hana Mori teaches ikebana in a studio in Lyon (beginner courses of six evenings) and makes installations for hotels. Visitors are students and hotel buyers. Feeling: still, deliberate, spacious. **Signature:** a monochrome interface where the only colour on the first screen is a single branch arrangement photographed against white, placed off-centre at the golden section (x 62 %), with 40 % of the screen left empty. **Supporting:** one hairline that draws the eye from headline to photo, grey steps only (100 / 60 / 40), no motion except focus and hover.

### Stack & files
Jekyll (`darkroom platform scaffold jekyll`): `_layouts/default.html`, `index.md` (front matter holds the copy), `_data/classes.yml` (dates, seats, price), `assets/css/site.css`. GitHub Pages compatible plugins only.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Shippori Mincho | 400 | Latin + the two kanji in the name |
| Text | Zen Kaku Gothic New | 400, 500 | body |

### Tokens
```css
:root { --ground: #ffffff; --ink: 0 0% 7%; --ink-60: hsl(var(--ink) / .6); --ink-40: hsl(var(--ink) / .4); --line: hsl(var(--ink) / .12);
  --display: "Shippori Mincho", Georgia, serif; --text: "Zen Kaku Gothic New", system-ui, sans-serif; }
::selection { background: #111; color: #fff; }
```
Colour mode `monochrome` in the bible's darkroom block.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| arrangement | Hana's own photo (NEEDS 1) | `<img>` AVIF/WebP/JPG, 1600 px, `fetchpriority="high"` | contain, 3:4 box | static | an empty 3:4 box with a 1 px line, TEMP | one camellia branch in a black suiban, shot straight on against pure white, soft daylight; edges pure `#ffffff` |
| class photos ×3 | own | `<img>` 1:1, greyscale filter OFF | — | static | TEMP | hands, scissors, kenzan |

### Nav
80 px, white: "Kōyō 紅葉" Display 400 20 px; Classes · Installations · About · 日本語 (14 px ink-60, underline on hover 150 ms); CTA "Book a class" text link with a 1 px underline offset 6 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Photo | — | — | — | — | grid column 7–11 of 12, top 14 vh, height 70 vh | none |
| H1 | Cut less. Look longer. | Display 400, clamp(36px, 4.4vw, 68px) | 1.15 / 0 | ink | column 2–5, top 34 vh | none |
| Sub | Ikebana courses of six evenings in Lyon, and installations for hotels and restaurants. | Text 400, 17 px | 1.8 | ink-60 | under H1, max 340 px | none |
| Hairline | — | 1 px ink-12, from the end of the sub to the photo's left edge | — | — | — | none |
| CTA | Book a class → | Text 500, 16 px | — | ink | under sub, 40 px gap | underline grows on hover |

### Sections
1. **Classes:** a table from `_data/classes.yml`: course, six dates, seats left, price incl. VAT; booking by email link (no form, by her choice; ask).
2. **Installations:** three hotel works, image + venue + month.
3. **About:** 80 words, her training lineage (TEMP until she confirms the school name).
Section padding 176 px desktop; nothing closer than 64 px to the photo.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Links | hover / focus | 0 | 150 ms | `cubic-bezier(.4,0,.2,1)` | underline width 0 → 100 % |
| Focus ring | focus-visible | 0 | 0 | — | 2 px ink outline, offset 4 px |
Nothing else moves; reduced motion changes nothing.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Photo | full width after the copy, 3:4 | columns 6–12 | 7–11 | height 64 vh |
| H1 | 34 px | 52 px | 68 px | 56 px |
| Section padding | 96 px | 128 px | 176 px | — |

### Acceptance
**First viewport:** at 1440 × 900 an almost empty white page; a single red-leaved branch in a black dish stands right of centre; the four-word headline sits low on the left with a thin line leading to the photo. At 390 × 844 headline and sub first, the photo below at full width.
**Do not:** add any UI colour; centre the photo; use a carousel; translate the name's kanji differently without asking; use plugins GitHub Pages does not support.
