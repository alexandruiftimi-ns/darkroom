# Roamwagon · campervan hire
<!-- Darkroom example 085 · fictional business · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `woocommerce` | landing + catalog | `nature` + `catalog` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a WooCommerce site to rent out our five campervans in Scotland: pick dates, see which vans are free and the price for those dates, what's inside each van, and the insurance and deposit rules clearly. Adventurous but trustworthy.

## Build spec

### Brief & signature
Roamwagon rents five converted vans from Inverness, 3-night minimum, £ 95–160 a night by season. Visitors are couples and families planning a Highlands trip. Feeling: open road, cosy, sorted. **Signature:** a date picker in the hero that, once dates are chosen, turns the van list into a row of five cards each showing "free" or "booked" for those dates and the total price including the season mix ("4 nights · £ 520 · £ 500 deposit"), computed from the booking plugin's availability. **Supporting:** each van's layout drawn as a top-down SVG plan, a plain insurance table, reveal on cards.

### Stack & files
Block theme + WooCommerce + a bookings/rental plugin the owner already uses or chooses (ask: WooCommerce Bookings or another; the spec assumes an availability endpoint); `patterns/hero-dates.php`, `assets/availability.js` (fetches availability for the chosen dates; without JS, the dates form posts to the shop page with dates as query args).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Familjen Grotesk | 700 | headings |
| Text | Public Sans | 400, 600 | UI, tables |

### Tokens
```css
:root { --ground: #f3f1eb; --card: #ffffff; --ink: #1b2522; --ink-60: #1b252299; --heather: #7a4f7f; --loch: #22556b; --gorse: #e3b23c; --line: #1b25221a;
  --display: "Familjen Grotesk", system-ui, sans-serif; --text: "Public Sans", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| hero | own photo (NEEDS 1) | `<img>` 2400 px | cover, 60 % 60 % | static | loch field | a van parked at a single-track road by a loch at golden hour, mountains behind, sky top 35 % |
| van photos ×5 × 4 | own | Woo gallery 3:2 | — | — | TEMP | outside, bed made, kitchen, view from the bed |
| van plans ×5 | drawn in SVG from measurements (NEEDS 2) | inline SVG | contain | static | text list | top-down, bed / kitchen / seats labelled |

### Nav
Header: "Roamwagon" Display 700 22 px; Vans · Prices · Routes · Insurance · FAQ; "Check dates" loch fill.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Five vans. The whole of the Highlands. | Display 700, clamp(40px, 6vw, 96px) | 0.98 / −0.02em | white with shadow | left gutter, top 18 vh, max 11ch | rise 16 px |
| Dates card | Pick-up · Drop-off · [Check availability] | Text 600, 16 px; inputs 52 px with visible labels | — | ink | white card radius 16 px, padding 24 px, bottom-left 10 vh | delay 200 ms |
| Note | 3-night minimum · pick-up in Inverness | Text 400, 14 px | — | white 85 % | under the card | none |

### Sections
Vans (5 cards: photo, name, sleeps, plan thumbnail, "from £ 95/night"; after dates: free/booked badge and total), Prices by season (table), Insurance and deposit (table in plain words: what's covered, excess, deposit refund in 7 days), Routes (three suggested itineraries), FAQ.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Van cards | dates checked | `i × 60 ms` | 400 ms | `cubic-bezier(.22,1,.36,1)` | badge and total fade in |
| Cards | in view | `i × 80 ms` | 600 ms | ease-out | 16 px, 0 → 0, 1 |
Reduced motion: no travel.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Dates card | under the photo, full width | over the photo | over the photo | over, compact |
| Van cards | horizontal snap rail | 2 columns | 5 in a row or 3 + 2 | — |

### Acceptance
**First viewport:** at 1440 × 900 a van by a loch at golden hour, the bold headline top-left and a white dates card bottom-left with two date fields and a blue button. Choosing dates turns the van cards into free/booked with exact totals. At 390 × 844 the photo, then the card full width.
**Do not:** show "free" without checking availability; hide the deposit or excess; invent reviews; take payment outside WooCommerce's checkout.
