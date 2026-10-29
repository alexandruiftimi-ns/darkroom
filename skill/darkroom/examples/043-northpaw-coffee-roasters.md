# Northpaw · specialty coffee roaster and subscription shop
<!-- Darkroom example 043 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `shopify` | landing + catalog | `catalog` + `bold` (colour) | `animated` | none | `reveal.js` |

## Say this
> /darkroom a Shopify store for our coffee roastery: each coffee has its own bag colour, so the shop should feel colourful like the bags. Subscriptions are the main thing to sell. Tasting notes, roast level, grind options.

## Build spec

### Brief & signature
Northpaw roasts six single-origin coffees in Tromsø and ships whole bean or ground; 70 % of revenue is subscriptions. Visitors are home brewers. Feeling: crisp, colourful, nerdy-friendly. **Signature:** each coffee owns a colour (taken from its bag), and the product card, the product page ground and the subscription picker swap to that colour; the collection reads like a shelf of bags. **Supporting:** a roast-level scale drawn as five dots, tasting notes as plain words, quiet reveals.

### Stack & files
Shopify OS 2.0 theme: product metafields `custom.bag_colour` (color) and `custom.roast` (integer 1–5) and `custom.notes` (list); `sections/main-product.liquid` reads them into CSS variables; subscription via the store's subscription app block (Shopify Subscriptions or the app the owner uses; ask). Collection `templates/collection.json`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Darker Grotesque | 800 | product names |
| Text | Work Sans | 400, 500 | UI |

### Tokens
```css
:root { --ground: #f7f5f1; --ink: #151515; --ink-60: #15151599; --bag: #e8613c; --bag-ink: #151515; --line: #15151520;
  --display: "Darker Grotesque", system-ui, sans-serif; --text: "Work Sans", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
.product { --bag: {{ product.metafields.custom.bag_colour | default: '#e8613c' }}; }
```
Check ink contrast on every bag colour (≥ 4.5:1 for text, else switch `--bag-ink` to `#ffffff`).

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| bag shots ×6 | own photos on seamless matching each bag colour (NEEDS 1–6) | Shopify product media | 4:5 | reveal | product on ground | the bag front-on, slightly turned, a few beans in front; seamless paper in the bag's own colour |
| hero | the six bags lined up (NEEDS 7) | `<img>` 2400 px | cover, 50 % 60 % | static | the six colours as tall blocks | bags in a row on a shelf, flat light |

### Nav
Header: "NORTHPAW" Display 800 22 px; Coffee · Subscriptions · Brew guides · Wholesale; cart; announcement bar (one line, ink on ground): "Free shipping in Norway over 400 kr".

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Fresh coffee every second Tuesday. | Display 800, clamp(44px, 7vw, 112px) | 0.9 / −0.02em | ink | left gutter, top 18 vh, max 10ch | rise 20 px |
| Sub | Six single origins roasted in Tromsø and posted within 48 hours of roasting. Pause or skip any time. | Text 400, 18 px | 1.5 | ink-60 | under H1, max 420 px | delay 100 ms |
| CTA | Start a subscription | Text 500, 16 px, ink fill, ground text, radius 999 px | — | — | under sub | delay 200 ms |
| Hero image | — | — | — | — | right 55 % | none |

### Sections
1. **The shelf:** collection of six product cards, each on its own bag colour, name in Display 800 36 px, origin + process in Text 14 px, roast dots, "from 129 kr".
2. **Product page:** ground = `--bag` at 12 % tint; options as segmented controls (Whole bean · Filter · Espresso · Cafetière), size, one-off vs subscription (every 2 / 4 weeks) with the saving shown honestly.
3. **Brew guides:** three blog posts.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Cards | in view | `i × 80 ms` | 600 ms | `--ease-out` | 20 px, 0 → 0, 1 |
| Option change | click | 0 | 200 ms | `cubic-bezier(.4,0,.2,1)` | segment background slides |
Reduced motion: no travel.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Shelf | 2 columns | 3 | 6 in a row or 3 × 2 | — |
| Hero image | below copy, 4:3 | right | right | right |

### Acceptance
**First viewport:** at 1440 × 900 an off-white page, a bold condensed headline about Tuesday deliveries on the left, six colourful bags in a row on the right, a black subscribe pill. Scrolling shows a shelf of cards, each in its bag's colour. At 390 × 844 headline, button, then the bags.
**Do not:** give every card the same colour; invent a subscription discount; hard-code product data in sections; touch checkout.
