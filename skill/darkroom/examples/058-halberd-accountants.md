# Halberd · accountants for small limited companies
<!-- Darkroom example 058 · fictional firm · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `hugo` | landing + editorial | `trust` | `calm` | none | — |

## Say this
> /darkroom a fast, simple Hugo site for our accounting firm: clear monthly prices, what's included, a deadline calendar for company owners, and a call booking link. We write tax guides too, so it needs a blog.

## Build spec

### Brief & signature
Halberd is five chartered accountants in Leicester serving 400 limited companies with fixed monthly fees. Visitors are directors of companies under £ 1 m turnover. Feeling: plain, exact, dependable. **Signature:** a "Your next deadlines" panel: the visitor picks their company's year-end month from a select, and a list of the next four statutory deadlines with dates appears (computed from rules in a JSON file), with "We file this for you" ticks per plan. **Supporting:** a price table with no asterisks, a long-read guide template, no motion.

### Stack & files
Hugo (`darkroom platform scaffold hugo`): `layouts/index.html`, `layouts/guides/single.html`, `data/plans.yaml`, `data/deadlines.json` (rules relative to year-end), `assets/js/deadlines.js` (progressive: without JS a static table of deadlines per year-end month shows).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | IBM Plex Serif | 500 | headings |
| Text | IBM Plex Sans | 400, 600 | body, tables |

### Tokens
```css
:root { --ground: #ffffff; --tint: #f3f6f4; --ink: #17201c; --ink-70: #17201cb3; --green: #1e5e45; --line: #17201c1f;
  --display: "IBM Plex Serif", Georgia, serif; --text: "IBM Plex Sans", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| none in the hero | — | — | — | — | — | type-led by choice; team portraits on the About page (NEEDS 1) |

### Nav
64 px: "Halberd" Display 500 22 px + "Chartered accountants"; Prices · What's included · Deadlines · Guides · About; CTA "Book a 20-minute call" green fill, white text, radius 6 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Your company's accounts, for one fixed monthly fee. | Display 500, clamp(32px, 4.2vw, 60px) | 1.12 / −0.01em | ink | columns 1–7, top 18 vh | none |
| Sub | Year-end accounts, corporation tax, payroll and VAT for limited companies, from £ 95 a month. | Text 400, 19 px | 1.55 | ink-70 | under H1 | none |
| Deadlines panel | Year-end month: [March ▾] → 4 rows: "31 Dec · Accounts to Companies House", "1 Jan · Corporation tax payment", … | Text 400/600, 16 px; dates tabular | 1.5 | ink | columns 8–12, `--tint` card radius 10 px, padding 28 px | none |

Deadline rules and prices are TEMP until the firm checks them.

### Sections
Prices (three plans as a 3-column table: what's included as ticked rows, price per month excl. VAT clearly labelled), What's included, Guides (latest 6 posts), About (team with ICAEW membership numbers), Contact.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Deadline rows | select change | 0 | 150 ms | linear | opacity |
| Links | hover / focus | 0 | 150 ms | linear | underline |
Calm.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Panel | under the sub | under | right | right |
| Price table | one plan per card with its own ticks | table | table | table |

### Acceptance
**First viewport:** at 1440 × 900 a white page; a plain serif promise about one fixed fee on the left with the price line and a green call button; on the right a pale green panel where choosing a year-end month lists the next four deadlines. At 390 × 844 promise, button, then the panel.
**Do not:** show "from" prices without what they include; give tax advice in the hero; use stock handshake photos; require JS to see deadlines.
