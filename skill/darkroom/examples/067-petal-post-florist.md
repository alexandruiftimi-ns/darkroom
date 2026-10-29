# Petal Post · florist with same-day bicycle delivery
<!-- Darkroom example 067 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `shopify` | landing + catalog | `artsy` + `catalog` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a colourful Shopify store for my flower shop: same-day delivery by bike before 2pm, a few bouquets that change weekly, a subscription, and a countdown to today's cut-off that is real, not fake urgency.

## Build spec

### Brief & signature
Petal Post makes eight seasonal bouquets a week in Utrecht and delivers by cargo bike the same day for orders before 14:00. Visitors are gift buyers on phones. Feeling: fresh, bright, generous. **Signature:** a cut-off line in the header that tells the truth: "Order in the next 2 h 14 min for delivery today" computed from 14:00 Europe/Amsterdam, switching to "Order now for delivery tomorrow" after the cut-off and on Sundays (closed); no red, no flashing. **Supporting:** each bouquet on its own saturated paper colour, a weekly "this week's flowers" list, reveals.

### Stack & files
Shopify OS 2.0; `snippets/cutoff.liquid` + `assets/cutoff.js` (Intl time zone, closed days from a theme setting), product template with delivery-date picker from the delivery app the shop uses (ask); collection "This week".

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Gloock | 400 | bouquet names |
| Text | DM Sans | 400, 500 | UI |

### Tokens
```css
:root { --ground: #fff9f2; --ink: #22201e; --ink-60: #22201e99; --tulip: #ff6f61; --sky: #8fc7ff; --butter: #ffe08a; --fern: #2f6b4f; --line: #22201e1a;
  --display: "Gloock", Georgia, serif; --text: "DM Sans", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```
Colour mode `expressive`; each bouquet card takes a product metafield colour; text on each checked ≥ 4.5:1.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| bouquets ×8 weekly | the florist photographs each on coloured paper (NEEDS 1, weekly) | product media 4:5 | contain | reveal | flat colour with the name | the bouquet held by a hand from the left on a saturated paper backdrop |
| bike | own photo (NEEDS 2) | `<img>` 3:2 | — | static | TEMP | the cargo bike full of flowers on a canal bridge |

### Nav
Header: "Petal Post" Display 400 26 px; This week · Subscriptions · Weddings · About; cart. Cut-off line above: Text 500 14 px tabular on `--butter` at 50 %.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Flowers at their door by teatime. | Display 400, clamp(40px, 6vw, 96px) | 1.0 / −0.01em | ink | left, columns 1–6, top 18 vh | rise 16 px |
| Sub | Seasonal bouquets made in Utrecht and delivered by cargo bike, the same day if you order before 2pm. | Text 400, 18 px | 1.55 | ink-60 | under H1 | delay 100 ms |
| CTA | Choose a bouquet | Text 500, 16 px, fern fill, ground text, radius 999 px | — | — | under sub | delay 200 ms |
| Featured | this week's top bouquet on tulip paper | — | — | — | columns 7–12, tilt 2° | fade, delay 200 ms |

### Sections
This week (8 cards on their own colours: name, flowers in one line, € incl. VAT), Subscription (weekly / fortnightly, skip any week), Delivery area (postcode checker against a list; honest "outside our area" message), About.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Cut-off line | every 60 s | — | — | — | text updates |
| Cards | in view | `i × 70 ms` | 600 ms | `--ease-out` | 20 px, 0 → 0, 1 |
| Card hover | pointer | 0 | 250 ms | `--ease-out` | rotate 0 → −1.5° |
Reduced motion: no travel or tilt.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Featured | under the CTA, no tilt | right | right | right |
| Cards | 2 columns | 3 | 4 | — |

### Acceptance
**First viewport:** at 1440 × 900 a soft butter strip saying exactly how long is left for delivery today; a warm white page with a serif promise about teatime and a green button; this week's bouquet on coral paper, slightly tilted, on the right. At 390 × 844 the cut-off line, the promise, the button and the bouquet below.
**Do not:** show a countdown when the shop is closed; use red or flashing for urgency (`urgency` audit check); invent "only 2 left"; deliver promises outside the postcode list.
