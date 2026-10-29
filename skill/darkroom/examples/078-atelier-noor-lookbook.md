# Atelier Noor · womenswear label lookbook and shop
<!-- Darkroom example 078 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `shopify` | landing + catalog | `luxury` + `editorial-news` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a Shopify store for our womenswear label with an editorial lookbook: big fashion photos in a magazine layout, and you can shop each look straight from the photo. Minimal, black and white UI, the photos carry the colour.

## Build spec

### Brief & signature
Atelier Noor makes 24 pieces a season in Amman and Milan; € 140–680. Visitors are fashion buyers and customers browsing on phones. Feeling: editorial, assured, sensual. **Signature:** the lookbook as an asymmetric magazine spread: each look takes a full-height image on one side and a cropped detail on the other, offset by one column, with small "shop the look" hotspots (numbered dots) on the garments; tapping a dot opens a side sheet with that piece and its sizes. **Supporting:** a monochrome UI, page numbers like a magazine, mask reveals on images.

### Stack & files
Shopify OS 2.0; `sections/lookbook-spread.liquid` (blocks: image, detail image, hotspots with x/y % and product), `snippets/product-sheet.liquid` (drawer with variant picker, add to bag via Cart AJAX); collection and product templates restyled.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Bodoni Moda | 400, 400 italic | look titles |
| Text | Jost | 400, 500 | UI |

### Tokens
```css
:root { --ground: #ffffff; --ink: #0f0f0f; --ink-60: #0f0f0f99; --line: #0f0f0f1f;
  --display: "Bodoni Moda", Didot, serif; --text: "Jost", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); --ease-sheet: cubic-bezier(.32,.72,0,1); }
```
Colour mode `monochrome`; colour lives only in photos.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| looks ×12 | the season's campaign (NEEDS 1, model release for web) | `<img>` 3:4, 1800 px | cover | mask reveal | — | full-length, consistent location |
| details ×12 | the same shoot | `<img>` 1:1 | cover | reveal 120 ms later | — | fabric, stitching, a hand on a pocket |

### Nav
64 px: "ATELIER NOOR" Text 500 13 px +0.3em centred; left "Lookbook · Shop"; right "Search · Bag (0)".

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Season | Spring–Summer 2027 | Text 500, 12 px +0.24em caps | 1 | ink-60 | top-left under nav | none |
| H1 | The Salt Season | Display 400 italic, clamp(56px, 10vw, 180px) | 0.9 / −0.02em | ink | overlapping the first image's left edge by one column | fade 1.2 s |
| Look 1 | — | 3:4 full height | — | — | columns 5–12 | mask open 1.1 s |
| Page no. | 01 | Text 500, 12 px tabular | — | ink-60 | bottom-right of each spread | none |

### Sections
Spreads ×12 alternating (image left/detail right, then reversed); hotspot dots 28 px white circles with ink number, 44 px tap area; Product sheet from the right (phone: from the bottom) with image, name, price, sizes, Add to bag; Collection grid after the lookbook.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Images | in view | 0 / 120 ms | 1100 ms | `--ease-out` | clip-path inset(0 0 100% 0) → 0 |
| Sheet | dot tap | 0 | 420 ms open / 280 ms close | `--ease-sheet` | translateX(100%) → 0 |
| Dots | in view | 400 ms | 300 ms | ease-out | scale .6 → 1 |
Reduced motion: images in place; sheet opens without travel.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Spread | image full width, detail half width offset right | 2 columns | asymmetric 12-col | same |
| Sheet | bottom sheet, 80 svh | right 420 px | right 440 px | right |

### Acceptance
**First viewport:** at 1440 × 900 a white page with a tracked-caps logotype; a huge italic serif title overlaps the edge of a full-height fashion photograph that opens from the top; small white numbered dots on the garments. At 390 × 844 the title over the top of the photo; tapping a dot opens a bottom sheet to buy the piece.
**Do not:** put text on the models' faces; use coloured UI; let hotspots cover the garment detail; hotlink campaign images.
