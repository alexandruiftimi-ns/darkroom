# Oakwright · solid-wood furniture made to order
<!-- Darkroom example 066 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `woocommerce` | catalog | `catalog` + `nature` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a WooCommerce shop for our solid oak furniture. Every piece can be ordered in three woods and several sizes, so the product page needs a clear configurator with the price updating, and photos of each wood. Lead times are 6–8 weeks; say so clearly.

## Build spec

### Brief & signature
Oakwright makes 30 designs (tables, benches, beds, shelving) in oak, ash and walnut in a Herefordshire workshop. Visitors are homeowners comparing with big brands. Feeling: solid, natural, honest. **Signature:** a product-page configurator where choosing the wood swaps the main photo and a real wood swatch (a macro of the grain), and the price and lead time update in one line ("Oak · 180 × 90 cm · £ 1,840 · ready in 6–8 weeks"). **Supporting:** a catalog grid with dimensions under each piece, grain textures as the only decoration, reveals on scroll.

### Stack & files
Block theme + WooCommerce variable products (attributes: wood, size, finish); `assets/configurator.js` enhances the variation form: segmented controls instead of selects, swaps gallery images by variation, writes the summary line; works as the standard form without JS. Product collection blocks for the catalog.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Newsreader | 500 | product names, headings |
| Text | Public Sans | 400, 600 | UI, prices |

### Tokens
```css
:root { --ground: #f6f2eb; --card: #fdfbf7; --ink: #26211c; --ink-60: #26211c99; --oak: #b4874f; --walnut: #5a3e2b; --ash: #d8c8a8; --line: #26211c1a;
  --display: "Newsreader", Georgia, serif; --text: "Public Sans", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| product × wood photos | own (NEEDS 1: 3 photos per design, one per wood) | Woo variation images 4:3 | contain on `--card` | swap on wood choice | the oak photo with a "shown in oak" note | same room set, same light, same angle for all woods |
| grain macros ×3 | own (NEEDS 2) | `<img>` 1:1, 400 px | cover | swap | flat colour chip | raking light across the grain, oiled finish |

### Nav
Header: "Oakwright" Display 500 24 px; Tables · Seating · Beds · Storage · Workshop; search; basket. A 36 px bar: "Made to order · ready in 6–8 weeks · free delivery in mainland UK" (TEMP).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 (product page) | The Ledbury dining table | Display 500, clamp(32px, 3.6vw, 52px) | 1.1 | ink | right column top | none |
| Summary | Oak · 180 × 90 cm · £ 1,840 · ready in 6–8 weeks | Text 600, 18 px tabular | 1.4 | ink | under H1 | updates on change, 150 ms |
| Wood control | Oak · Ash · Walnut | segmented, 48 px, with the grain macro as a 32 px circle in each | — | — | under summary | — |
| Size control | 160 × 90 · 180 × 90 · 220 × 100 | segmented | — | — | under wood | — |
| Add | Add to basket | Text 600, 17 px, ink fill, card text, 56 px | — | — | under controls | — |
| Gallery | — | 4:3 main + 4 thumbs | — | — | left 7 columns | crossfade 300 ms on wood change |

Home page: H1 "Furniture you'll leave to someone." over a workshop photo; catalog below.

### Sections
Catalog (grid of products: photo, name, "from £", dimensions in Text 14 px ink-60), product page: dimensions drawing (SVG with measurements), care, delivery and lead time, "see it in the workshop" visit booking.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Gallery swap | wood change | 0 | 300 ms | `cubic-bezier(.4,0,.2,1)` | crossfade |
| Summary update | any change | 0 | 150 ms | linear | opacity flash .6 → 1 |
| Catalog cards | in view | `i × 60 ms` | 600 ms | ease-out | 16 px, 0 → 0, 1 |
Reduced motion: instant swaps.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Product page | gallery, then controls, sticky Add bar with the summary | stacked | 7/5 split | 7/5 split |
| Catalog | 2 columns | 3 | 4 | — |

### Acceptance
**First viewport (product page):** at 1440 × 900 a large photo of the table on the left; on the right the name, a one-line summary with wood, size, price and lead time, three wood choices each showing a grain circle, sizes, and a dark Add to basket button; choosing Walnut swaps the photo and the line. At 390 × 844 the photo, then the controls, with a sticky bar holding the summary and the button.
**Do not:** show a wood in photos it is not available in; hide the lead time; let the summary price differ from WooCommerce's; replace the variation form in a way that breaks without JS.
