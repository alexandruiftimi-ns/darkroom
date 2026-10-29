# The Margin · independent bookshop with events
<!-- Darkroom example 049 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `woocommerce` | landing + catalog + editorial | `editorial-news` + `artsy` (colour) | `calm` | none | — |

## Say this
> /darkroom a WooCommerce site for our independent bookshop: staff picks with a handwritten-note feel, an events calendar for author readings, and you can order books for collection or delivery. Lots of books, so it has to be easy to browse.

## Build spec

### Brief & signature
The Margin is a bookshop and café in Bristol with 9,000 titles and two author events a week. Visitors are local readers, gift buyers and event-goers. Feeling: bookish, opinionated, welcoming. **Signature:** staff picks shown as cover + a "shelf talker" card in the bookseller's own words, set in a typewriter face on a tinted card clipped to the cover with a 3° tilt, signed with the bookseller's first name. **Supporting:** an events list in a strict date column, dense catalog browsing, colourful covers carrying the colour.

### Stack & files
WordPress block theme + WooCommerce overlay; product attribute "Staff pick" + a custom field "shelf talker" (text) and "bookseller" (name); pattern `patterns/staff-picks.php` with a product collection block; events as a "Events" post category with date fields (or The Events Calendar plugin if the shop already uses it; ask).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Fraunces | 600 (opsz 72) | headings |
| Text | Literata | 400 | body |
| Talker | Courier Prime | 400 | shelf talkers only |
| UI | Atkinson Hyperlegible | 400, 700 | shop UI |

Four families: budget raised to 4 in the bible with the reason "shelf-talker voice is part of the brand" (exceptions log).

### Tokens
```css
:root { --ground: #fbf8f2; --ink: #1e1b18; --ink-60: #1e1b1899; --talker: #fff3b8; --pink: #f0b7c8; --link: #24508a; --line: #1e1b181a;
  --display: "Fraunces", Georgia, serif; --text: "Literata", Georgia, serif; --talk: "Courier Prime", monospace; --ui: "Atkinson Hyperlegible", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| covers | publisher cover images via the shop's book data feed (licensed for retail use; check) | WooCommerce product images | 2:3 | static | title on a coloured card | as supplied |
| shop photo | own (NEEDS 1) | `<img>` 3:2 | cover | static | TEMP | the front table and a reading in progress, consent from readers |

### Nav
Header: "The Margin" Display 600 26 px; Books · Staff picks · Events · Café · Visit; search field always visible (UI 16 px, 44 px tall); basket.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Books we'd press into your hands. | Display 600, clamp(36px, 4.8vw, 72px) | 1.05 / −0.01em | ink | left, columns 1–5 | none |
| Sub | 9,000 books, two readings a week and good coffee on Gloucester Road. Order for collection or delivery. | Text 400, 18 px | 1.55 | ink-60 | under H1 | none |
| Picks row | four covers with shelf talkers | covers 180 px wide; talker card 200 px, `--talker`, Talk 15 px/1.45, rotated −3°/2°/−2°/3°, signed "— Sam" | — | ink | columns 6–12 | none |

### Sections
1. **This week:** next four events: date column (Display 600 40 px day number + month caps), title, author, price or "free", "Book a seat" button.
2. **Browse:** WooCommerce product collection with filters (genre, new, signed copies), 5 columns of covers, title + author + price under each.
3. **Café and visit:** hours, address, step-free access.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Talker cards | hover (pointer) | 0 | 250 ms | `cubic-bezier(.4,0,.2,1)` | rotate → 0, translateY(−4px) |
| Links | hover / focus | 0 | 150 ms | same | underline thickness |
Calm: nothing moves on its own.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Picks | horizontal scroll-snap rail of four | 2 × 2 | row of 4 | row of 4 |
| Browse | 2 columns | 3 | 5 | — |

### Acceptance
**First viewport:** at 1440 × 900 a warm off-white page; the serif promise on the left with a visible search box above; on the right four book covers with tilted yellow shelf-talker notes in typewriter type, each signed by a bookseller. At 390 × 844 the promise and search, then the picks as a swipeable row.
**Do not:** invent staff reviews (talkers come from the shop); use stock bookshelf photos; hide the search; use covers without a retail licence.
