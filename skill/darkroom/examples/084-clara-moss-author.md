# Clara Moss · novelist's website and book launch
<!-- Darkroom example 084 · fictional author · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `ghost` | landing + editorial | `editorial-news` + `luxury` | `animated` | none | `reveal.js` |

## Say this
> /darkroom an author website on Ghost for my new novel: the book cover big with where to buy it, the first chapter readable online, events, and a newsletter I already run on Ghost. Literary, warm, a bit mysterious.

## Build spec

### Brief & signature
Clara Moss writes literary fiction; her third novel, "The Salt Road", is out in May (hardback £ 18.99). Visitors are readers, booksellers and festival programmers. Feeling: literary, quiet, salt-weathered. **Signature:** the first chapter as a beautifully set reading page reachable from the hero: 64ch, a drop cap, the chapter's opening line repeated large on the home page in italic as the hook, with a progress line and "Keep reading in the book" at the end linking to retailers. **Supporting:** the cover with a soft paper shadow, a where-to-buy row including independent shops, Ghost newsletter sign-up.

### Stack & files
Ghost theme: `home.hbs` (book hero), `page-chapter-one.hbs` (custom template for the chapter page), `partials/buy.hbs` (retailer links from theme custom settings), `partials/signup.hbs` (Portal form).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Cormorant Garamond | 500, 500 italic | headings, the hook line |
| Text | EB Garamond | 400, 400 italic | chapter text, `--gh-font-body` |
| UI | Karla | 500 | buttons, meta |

### Tokens
```css
:root { --ground: #f4efe7; --ink: #23201c; --ink-60: #23201c99; --brine: #3d5a63; --line: #23201c1f;
  --gh-font-heading: "Cormorant Garamond", Georgia, serif; --gh-font-body: "EB Garamond", Georgia, serif; --ui: "Karla", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| cover | the publisher's cover file (NEEDS 1, permission for web) | `<img>` 2:3, 900 px | contain | slight 3° tilt on pointer, ±2° | title set in type | front cover, `box-shadow: 0 30px 60px -30px #23201c66` |
| author photo | publisher's author photo with credit (NEEDS 2) | `<img>` 4:5 | — | static | none | — |

### Nav
64 px: "Clara Moss" Display 500 24 px; The Salt Road · Books · Events · About · Newsletter.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Hook | "The sea gave back everything except my sister." | Display 500 italic, clamp(32px, 4.4vw, 64px) | 1.15 / 0 | ink | columns 1–6, top 22 vh | fade 1.2 s |
| Book line (h1) | The Salt Road · a novel by Clara Moss · out 14 May | UI 500, 14 px +0.08em caps | 1.4 | ink-60 | under the hook | delay 300 ms |
| CTAs | Read the first chapter · Buy the book | brine fill / underlined | — | — | under the line | delay 400 ms |
| Cover | — | — | — | — | columns 8–11 | fade + rise 20 px |

The hook line is TEMP until the author chooses the line; it must be from the book.

### Sections
Where to buy (independent bookshops first, then chains, then ebook and audiobook, all links), Praise (only quotes with names and publications), Events (Ghost posts tagged `event`), About (author photo with credit), Newsletter (Portal sign-up, one field).
**Chapter page:** 21 px/1.65 EB Garamond, 64ch, drop cap 4 lines, scene breaks as a 40 px centred line; a 2 px brine progress line at the top; end: "Keep reading in the book" + buy links.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Hook | load | 0 | 1200 ms | ease-out | opacity 0 → 1 |
| Cover tilt | pointer | — | lerp .1 | — | ±2° |
| Praise quotes | in view | `i × 120 ms` | 700 ms | ease-out | 12 px, 0 → 0, 1 |
Reduced motion: no tilt; hook visible.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Cover | above the hook, 56 % width | right | right | right |
| Chapter | 19 px, 20 px gutters | 20 px | 21 px | 21 px |

### Acceptance
**First viewport:** at 1440 × 900 a warm paper page; one haunting italic line from the novel large on the left, the title, author and date in small caps, two buttons; the cover on the right with a soft shadow. At 390 × 844 the cover first, then the line and buttons.
**Do not:** quote praise without attribution; list only one retailer; put the chapter in a PDF; use a sea-spray stock photo.
