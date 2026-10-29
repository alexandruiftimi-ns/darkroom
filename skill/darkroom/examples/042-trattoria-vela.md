# Trattoria Vela · family restaurant with a real HTML menu
<!-- Darkroom example 042 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `wordpress` | landing + read (menu) | `restaurant` | `calm` | none | — |

## Say this
> /darkroom a WordPress site for our trattoria in Bologna. The menu must be a real page we can edit, not a PDF. Book a table button everywhere, opening hours, and photos of the dishes. Warm, family, a bit old-fashioned in a good way.

## Build spec

### Brief & signature
Trattoria Vela has served the same family's tortellini in Bologna since 1971; 60 covers, closed Mondays. Visitors are tourists on phones and locals booking for Sunday. Feeling: generous, family, unchanged. **Signature:** the menu page set like a printed trattoria menu: a two-column list with dotted leaders, the dish in Italian, an English line in italic under it, prices aligned, and the day's specials in a red-ink box editable as a WordPress block. **Supporting:** a sticky "Prenota · Book" button on phones, hours in plain text, calm states.

### Stack & files
Block theme (`darkroom platform scaffold wordpress`); `patterns/menu-section.php` (heading + list of "dish" rows built from core blocks: paragraph with a class for the leader), `patterns/specials.php`, `parts/header.html` with the booking button linking to the restaurant's booking service. The menu is a WordPress page (content, not theme), delivered via `darkroom platform content` (`platforms/wordpress-content.md`).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Libre Caslon Text | 400, 700 | headings, dish names |
| Text | Libre Caslon Text | 400 italic | English lines |
| UI | Karla | 500 | buttons, hours |

### Tokens
```css
:root { --ground: #fbf6ec; --ink: #2b2420; --ink-60: #2b242099; --rosso: #a5281b; --line: #2b24201f;
  --display: "Libre Caslon Text", Georgia, serif; --ui: "Karla", system-ui, sans-serif; }
```
`theme.json`: palette `ground`, `ink`, `rosso`; font sizes `small 15px`, `body 18px`, `dish 22px`, `h2 40px`, `h1 clamp(44px,6vw,88px)`.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| hero dish | the family's photo (NEEDS 1) | Cover block image | cover, 50 % 55 % | static | rosso field, TEMP | tortellini in brodo from above on a white plate with a thin red rim, linen, daylight; left third table linen only |
| dishes ×6 | own | image blocks 4:3 | — | static | TEMP | same table, same light |

### Nav
Header part: "Trattoria Vela" Display 700 24 px; Menu · Orari · Dove siamo · EN/IT; button "Prenota un tavolo" rosso fill, ground text, radius 4 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | The same tortellini since 1971. | Display 400, clamp(44px, 6vw, 88px) | 1.02 / −0.01em | ink | left panel 40 % of width on `--ground`, image right 60 % | none |
| Sub | Bolognese cooking by the Vela family, two streets from Piazza Maggiore. Closed Mondays. | Text 400, 19 px | 1.5 | ink-60 | under H1, max 380 px | none |
| CTAs | Book a table · See the menu | rosso fill / underlined link | — | — | under sub | none |

### Sections
1. **Specials:** the red-ink box (1.5 px rosso border, rosso headings) with 3 dishes, editable.
2. **Menu teaser:** first four dishes of each course, link to the full menu page.
3. **Hours and address:** a plain table (Tue–Sat 12:00–14:30, 19:00–22:30; Sun lunch only; TEMP until confirmed), phone link, static map image.
**Menu page (read surface):** two columns ≥ 1024 px; course headings Display 700 32 px; dish rows Display 400 22 px + dotted leader + price tabular; English line Text italic 16 px ink-60; allergens as small letters with a key at the bottom (EU allergen list).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Links, buttons | hover / focus | 0 | 150 ms | `cubic-bezier(.4,0,.2,1)` | colour |
Calm level: nothing else moves.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Hero | image first (4:3), then the text panel | split 50/50 | 40/60 | 40/60 |
| Booking | sticky bottom bar "Prenota · Book" 56 px | header | header | header |
| Menu | one column | one column | two columns | — |

### Acceptance
**First viewport:** at 1440 × 900 a cream panel on the left with the serif headline, address line and a red booking button; on the right a bowl of tortellini in broth from above. At 390 × 844 the dish photo, then the headline, with a sticky booking bar at the bottom.
**Do not:** ship the menu as a PDF or image; hard-code the menu in the theme; show prices without the € sign; leave out the allergen key.
