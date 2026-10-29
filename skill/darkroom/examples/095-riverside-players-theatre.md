# Riverside Players · community theatre season
<!-- Darkroom example 095 · fictional company · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `wordpress` | landing + editorial | `bold` + `editorial-news` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a WordPress site for our community theatre: the new season's four shows each with its own poster colour, dates and tickets, auditions, and how to volunteer backstage. Theatrical and bold, and our volunteers must be able to add shows.

## Build spec

### Brief & signature
Riverside Players stage four productions a year in a 180-seat hall in Reading, all volunteers. Visitors are audiences buying tickets and people wanting to get involved. Feeling: theatrical, warm, home-made with pride. **Signature:** the season as four full-width "poster" bands, each show's title in a huge condensed face over its own flat colour with a curtain-edge SVG (scalloped top) and the run dates in tabular figures; scrolling past each band raises its curtain edge by 24 px like a curtain lifting. **Supporting:** a ticket button per show to the box office system, an auditions notice, volunteer roles.

### Stack & files
Block theme; a "Show" pattern (`patterns/show-band.php`: colour, title, dates, venue, ticket link, image) that volunteers add on the season page; shows as posts in a "Shows" category for archive; auditions as a synced pattern.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Abril Fatface | 400 | show titles |
| Text | Libre Franklin | 400, 700 | body |

### Tokens
```css
:root { --ground: #fff8ef; --ink: #1d1418; --ink-60: #1d141899; --velvet: #8e1b2f; --line: #1d14181f;
  --display: "Abril Fatface", Georgia, serif; --text: "Libre Franklin", system-ui, sans-serif; }
```
Show colours (block setting, defaults): `#8e1b2f` velvet · `#1f4e79` midnight · `#e0a526` limelight · `#2f6b4f` forest; title ink checked per colour.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| show images ×4 | rehearsal photos with cast consent (NEEDS 1) | image block 4:5 | cover | reveal | the band without an image | one actor in character, stage light, dark background |
| curtain edge | drawn in SVG | 100 % × 32 px scallops | top of each band | rises on scroll | straight edge | — |

### Nav
Header: "Riverside Players" Display 26 px; What's on · Tickets · Auditions · Get involved · About; "Buy tickets" velvet fill.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | The 2027–28 season | Display 400, clamp(48px, 9vw, 150px) | 0.95 / 0 | ink | left, top 14 vh | rise 20 px |
| Sub | Four productions by volunteers, at the Riverside Hall in Caversham. | Text 400, 19 px | 1.5 | ink-60 | under H1 | delay 100 ms |
| Next show line | Next: The Importance of Being Earnest · 6–9 October · tickets £ 14 | Text 700, 17 px tabular | 1.4 | velvet | under sub | delay 200 ms |

### Sections
Four show bands (title Display clamp(56px, 10vw, 170px) in ink or ground per contrast, dates, venue, Buy tickets, image right), Auditions (next audition date, roles, "no experience needed"), Get involved (backstage roles: lighting, costume, front of house), About, Access (wheelchair spaces, captioned performance dates).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Curtain edge | band enters (30 %) | 0 | 900 ms | `cubic-bezier(.22,1,.36,1)` | translateY(0 → −24px) |
| Show titles | in view | 120 ms | 800 ms | same | translateY(30%) in mask → 0 |
Reduced motion: curtains up, titles in place.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Band | title, dates, button, then image | split | split | split |
| Titles | 14vw | 11vw | 10vw | 9vw |

### Acceptance
**First viewport:** at 1440 × 900 a cream page, "The 2027–28 season" in a big theatrical serif, the hall line and the next show with dates and price in velvet red. Scrolling reveals four full-width colour bands with scalloped curtain edges that lift slightly as each arrives. At 390 × 844 the same, with each band stacked.
**Do not:** let volunteers need code to add a show; hide access information; show cast photos without consent; sell tickets outside the box office system.
