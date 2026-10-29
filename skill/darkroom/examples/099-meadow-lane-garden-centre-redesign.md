# Meadow Lane · garden centre redesign from the current site
<!-- Darkroom example 099 · fictional business · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `wordpress` (stays where it is) | landing + pages | `nature` + `family` | `animated` | none | `reveal.js` |

## Say this
> /darkroom redesign our garden centre's website https://example.com — it's on WordPress and looks dated. Keep our texts and photos, and keep the pages people find on Google. Seasonal and friendly.

## Build spec

### Brief & signature
Site-led entry (`commands/import.md`): Darkroom lists the site first (`darkroom import <url> --list`), asks whether it is theirs and what to bring over, and keeps WordPress because the import says it is built with it (rankings, editors). The import found 14 pages (home, plants, café, events, Christmas, opening times, contact…), 120 photos (32 under 1,000 px, suggested for replacement but used), and old addresses kept in `url-map.json`. Meadow Lane is a family garden centre in Kent with a café and a Christmas shop. **Signature:** a "This month in the garden" card on the home page that changes with the month (a WordPress query of a "Seasonal" category: what to plant, what's in stock, one event), with the month's colour (March daffodil yellow, June rose, October rust, December pine). **Supporting:** the existing texts tightened to the word budgets, photos re-cropped, a clear opening-times block.

### Stack & files
Restyle the current WordPress install with a new block theme (the old theme stays installed as the fallback); content stays in WordPress pages and posts (`platforms/wordpress-content.md`); redirects only where page addresses change (none planned: same slugs); a "Seasonal" category with 12 month posts.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Fraunces | 600 (SOFT 50) | headings |
| Text | Nunito Sans | 400, 700 | body |

### Tokens
```css
:root { --ground: #f8f6ef; --ink: #22301f; --ink-60: #22301f99; --leaf: #3d6b35; --month: #e9b829; --line: #22301f1a;
  --display: "Fraunces", Georgia, serif; --text: "Nunito Sans", system-ui, sans-serif; }
```
`--month` set per month by a class on `body` from the date: Mar `#e9b829` · Jun `#d0607a` · Oct `#b4562b` · Dec `#2f5d46` (others interpolated in the bible).

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| imported photos | `.darkroom/import/images/` (the site's own) | image blocks via the media library | re-cropped per breakpoint | reveal | — | the 32 small ones used now, with a NEEDS row each ("a 2000 px version would be sharper") |
| hero | the best imported photo: the glasshouse in spring (by `images.json` size and a look) | Cover block | cover, 50 % 60 % | static | leaf field | — |

### Nav
Header part: "Meadow Lane" Display 600 24 px; Plants · Café · Events · Christmas · Visit; "Open today 9:00–17:30" (from a synced pattern) and "Find us".

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Grow something lovely this spring. (from the imported home text, shortened) | Display 600, clamp(38px, 5.6vw, 88px) | 1.02 / −0.01em | white with shadow | left gutter, bottom 14 vh, max 12ch | rise 16 px |
| Sub | Plants, a café and a Christmas shop, family-run in Kent since 1974. (imported, 14 words) | Text 400, 19 px | 1.5 | white 90 % | under H1 | delay 100 ms |
| Month card | This month: plant sweet peas · tulips in stock · Easter trail 12 April | Text 600, 16 px; month title Display 600 24 px | 1.4 | ink | white card bottom-right, 4 px `--month` top rule | fade, delay 200 ms |

### Sections
Rebuilt from the imported pages in reading order: Plants (categories from the old menu), Café (menu as an HTML page, the old PDF kept as a download), Events, Christmas, Visit (opening times table, parking, accessibility). Every page in `url-map.json` is ticked: built, merged (into which page) or left out (why, who decided).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Cards and photos | in view | `i × 80 ms` | 600 ms | `cubic-bezier(.22,1,.36,1)` | 16 px, 0 → 0, 1 |
Reduced motion: final states.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Month card | under the hero image, full width | over the image | over | over |
| H1 | 36 px | 64 px | 88 px | 68 px |

### Acceptance
**First viewport:** at 1440 × 900 the centre's own glasshouse photo in spring light, the shortened headline and sub bottom-left in white, a white "This month" card bottom-right with a yellow top rule for March. At 390 × 844 the photo with the headline, then the month card. Every old page address still opens a page.
**Do not:** move the site off WordPress without the user's reason; change slugs without redirects; drop any imported page silently; rewrite the owners' texts beyond shortening without asking.
