# Hill End Farm · veg boxes and farm shop
<!-- Darkroom example 089 · fictional farm · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `woocommerce` | landing + catalog | `nature` + `family` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a WooCommerce site for our farm's weekly veg box subscription and farm shop. Show what's in this week's box, delivery days by postcode, and let people pause weeks easily. Muddy boots, honest, colourful veg.

## Build spec

### Brief & signature
Hill End is a 30-acre organic farm in Somerset delivering 400 boxes a week (small £ 16, family £ 24) on Tuesdays and Fridays. Visitors are families switching from supermarkets. Feeling: earthy, generous, seasonal. **Signature:** "This week's box" as a top-down photo of the actual box with numbered labels on each vegetable that match a list beside it ("1 · Purple sprouting broccoli · 300 g · picked Monday"), updated weekly by the farm from a WooCommerce product's custom fields. **Supporting:** a postcode checker for the delivery day, a pause-a-week explanation, seasonal colour from the veg.

### Stack & files
Block theme + WooCommerce + the subscription plugin the farm uses (WooCommerce Subscriptions or similar; ask); product "This week's box" with a repeater field (number, item, weight, x %, y % for the label); `patterns/this-week.php` renders the photo with absolutely positioned numbered dots; `assets/postcode.js` against a list of postcode prefixes (and a no-JS form fallback).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Recursive (Casual 1) | 800 | headings, friendly |
| Text | Recursive (Casual 0) | 400, 600 | body, one variable family |

### Tokens
```css
:root { --ground: #f7f2e7; --soil: #3b2d22; --ink: #2a221b; --ink-60: #2a221b99; --leaf: #3f7d3a; --beet: #9c2a4a; --carrot: #e8742c; --line: #2a221b1a;
  --display: "Recursive", system-ui, sans-serif; }
h1, h2 { font-variation-settings: "CASL" 1, "wght" 800; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| this week's box | the farm photographs the box every Monday from above (NEEDS 1, weekly) | `<img>` 1600 px 4:3 | contain | numbered dots | the list only | the real box on a wooden table, soil still on the roots, daylight |
| farm photos ×3 | own | `<img>` 3:2 | — | reveal | TEMP | fields, the packing shed, the delivery van |

### Nav
Header: "Hill End Farm" Display 24 px; Veg boxes · Farm shop · Delivery · The farm; basket; "Start a box" leaf fill.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Picked on Monday. On your table by Tuesday. | Display 800, clamp(38px, 5.6vw, 88px) | 1.0 / −0.01em | ink | columns 1–6, top 18 vh | rise 16 px |
| Sub | Organic veg boxes from our Somerset fields, delivered on Tuesdays and Fridays. Pause any week. | Text 400, 18 px | 1.55 | ink-60 | under H1 | delay 100 ms |
| Postcode | field labelled "Your postcode" + button "Check delivery" | input 52 px with visible label, leaf button | — | — | under sub | delay 200 ms |
| Result | Good news: we deliver to BA6 on Tuesdays. | Text 600, 16 px | — | leaf | under the input | after check |
| Box photo | this week's box with dots 1–9 | dots 28 px soil circles with white numbers | — | — | columns 7–12 | dots pop in, 60 ms stagger |

### Sections
This week's list (numbered to match the dots), Boxes (small / family, price, what's typical), How pausing works (three steps), Farm shop (eggs, bread, dairy add-ons), The farm (our growers), Delivery map list.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Box dots | in view | `i × 60 ms` | 400 ms | `cubic-bezier(.34,1.56,.64,1)` | scale 0.6 → 1 |
| Dot ↔ list | hover / focus either | 0 | 150 ms | linear | both highlight beet |
| Cards | in view | `i × 80 ms` | 600 ms | ease-out | 16 px, 0 → 0, 1 |
Reduced motion: dots in place; highlight still works.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Box photo | under the postcode, list below it | right | right | right |
| Dots | 24 px with 44 px tap area | 28 px | 28 px | 28 px |

### Acceptance
**First viewport:** at 1440 × 900 a warm cream page; a friendly bold headline about Monday and Tuesday, a postcode checker with a green button; on the right this week's real box from above with numbered dots on each vegetable. At 390 × 844 headline, postcode, then the box and its numbered list.
**Do not:** use a stock veg photo for "this week"; hide how to pause; show organic claims without the certification body (TEMP until supplied); deliver to postcodes not on the list.
