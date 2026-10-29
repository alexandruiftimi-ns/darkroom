# Fringe Benefits · neighbourhood hair salon
<!-- Darkroom example 080 · fictional salon · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `wordpress` | landing | `artsy` + `family` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a fun WordPress site for our hair salon: price list we can update, the stylists with their specialities, a gallery of cuts and colours, and Book online going to our booking app. Colourful and friendly, a bit retro.

## Build spec

### Brief & signature
Fringe Benefits is a five-chair salon in Bristol known for colour work and curly cuts. Visitors are locals on phones choosing a stylist. Feeling: cheerful, retro, skilled. **Signature:** the price list set like a 1970s salon board: services in a rounded retro face on colour stripes (orange, pink, mustard) with dotted leaders and prices, each stylist's tier shown as columns (Stylist · Senior · Director); staff edit it as a table block. **Supporting:** stylist cards with a "best at" tag, a before/after gallery with consent, wavy SVG section dividers.

### Stack & files
Block theme; `patterns/price-board.php` (a table block with a class for stripes), `patterns/stylists.php`, gallery as a core gallery block (owner uploads), header with "Book online" linking to the booking app.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Shrikhand | 400 | headings only |
| Retro text | Righteous | 400 | price board |
| Text | Nunito | 400, 700 | body |

Three families, each with a role (display, board, text).

### Tokens
```css
:root { --ground: #fff6ea; --ink: #2a1e1a; --ink-60: #2a1e1a99; --orange: #f2711c; --pink: #f59bb0; --mustard: #e6b325; --teal: #157a76; --line: #2a1e1a1f;
  --display: "Shrikhand", Georgia, serif; --board: "Righteous", system-ui, sans-serif; --text: "Nunito", system-ui, sans-serif; }
```
Colour mode `expressive`; ink on each stripe checked ≥ 4.5:1 (ink on orange: use `#1f1410`).

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| salon photo | own (NEEDS 1) | Cover block | cover | static | stripes | the five chairs and the arched mirrors, warm light |
| stylists ×5 | own (NEEDS 2) | 1:1 | 50 % 35 % | static | initials on a colour circle | each stylist at their chair, smiling, consent |
| cuts gallery | own with client consent (NEEDS 3) | gallery block 4:5 | — | reveal | none | back-of-head and profile shots, daylight |

### Nav
Header: "Fringe Benefits" Display 28 px; Prices · Stylists · Gallery · Find us; "Book online" teal fill, white, radius 999 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Good hair days on Gloucester Road. | Display 400, clamp(40px, 6vw, 96px) | 1.05 / 0 | ink | left, columns 1–6 | rise 16 px |
| Sub | Colour, curls and cuts by five stylists who love what they do. Walk-ins on Tuesdays. | Text 400, 18 px | 1.55 | ink-60 | under H1 | delay 100 ms |
| CTA | Book online | as nav, 54 px | — | — | under sub | delay 200 ms |
| Stripes | three 24 px stripes orange/pink/mustard | — | — | — | behind the photo, offset 16 px | none |
| Photo | salon | radius 999 px 999px 24px 24px (arch) | — | — | columns 7–12 | mask open |

### Sections
Price board (stripes per category: Cuts · Colour · Curls · Treatments; columns per stylist tier; prices TEMP), Stylists (5 cards with "best at: curly cuts" tag), Gallery, Find us (hours, address, parking), wavy dividers between sections (SVG, 40 px tall).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Board rows | in view | `i × 40 ms` | 500 ms | ease-out | opacity 0 → 1 |
| Stylist cards | hover | 0 | 300 ms | `cubic-bezier(.34,1.56,.64,1)` | rotate 0 → −2° |
| Gallery | in view | `i × 60 ms` | 600 ms | ease-out | scale .97 → 1 |
Reduced motion: no tilt or scale.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Price board | tier tabs above a single price column | 3 columns | 3 columns | 3 columns |
| Photo arch | under the CTA | right | right | right |

### Acceptance
**First viewport:** at 1440 × 900 a warm cream page; a chunky retro headline and a teal Book online button on the left; on the right an arch-shaped photo of the salon over three offset colour stripes. Below, a striped price board like a 70s salon sign. At 390 × 844 headline, button and arch photo, then the board with tier tabs.
**Do not:** show clients' faces without consent; put prices in an image; use more than one display face for headings; hide the booking button on phones.
