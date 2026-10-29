# Tidewatch · a coastal charity's annual report
<!-- Darkroom example 079 · fictional charity · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | read (long-form) | `editorial-news` + `nature` | `animated` | none | `reveal.js`, `scene-progress.js` |

## Say this
> /darkroom turn our annual report into a scrolling web page instead of a PDF: big numbers, charts that build as you scroll, stories from volunteers, and the finances in plain words. It's for donors and the public. Accessible.

## Build spec

### Brief & signature
Tidewatch cleans and monitors 140 km of the Cornish coast with 2,300 volunteers. The 2027 report has 8 chapters. Visitors are donors, journalists and the public. Feeling: honest, hopeful, evidence-led. **Signature:** a tide-line chart that builds with scroll: plastic collected per month as an area shaped like a tide (SVG area), revealed left to right as the section scrolls through (`--p`), with the months that broke records labelled; every chart has a data table next to it for screen readers and the downloadable CSV. **Supporting:** big numbers per chapter, volunteer quotes, a plain-words finance chapter.

### Stack & files
`index.html` (one long page with `<article>` and chapter `<section>`s, a sticky table of contents), `styles.css`, `charts.js` (draws SVG from `data/*.csv`; `scene-progress.js` sets `--p`), `reveal.js`. Charts follow the data-viz rule: one colour per series, direct labels, no legends where avoidable.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Newsreader | 500 | chapter titles, numbers |
| Text | Source Sans 3 | 400, 600 | body 19 px |

### Tokens
```css
:root { --ground: #fbfaf6; --ink: #13232b; --ink-60: #13232b99; --sea: #1e6f8f; --sand: #e8d7b5; --kelp: #4f7a3a; --line: #13232b1f;
  --display: "Newsreader", Georgia, serif; --text: "Source Sans 3", system-ui, sans-serif; }
```
Surface `read`: word budgets off; headings every 2–4 paragraphs; measure 66ch.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| chapter photos ×8 | volunteers' photos with consent (NEEDS 1) | `<img>` 3:2 | — | reveal | none | wide coast shots and hands at work |
| data | the report's spreadsheets exported to CSV (NEEDS 2) | charts | — | build | tables | — |

### Nav
A sticky slim bar: "Tidewatch Annual Report 2027" + progress bar (sea, 3 px) + "Contents" toggle + "Download PDF (accessible)".

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | A year on the tide line. | Display 500, clamp(44px, 7vw, 112px) | 1.0 / −0.015em | ink | left, top 22 vh | fade |
| Big number | 61.4 tonnes | Display 500, clamp(72px, 13vw, 220px) tabular | 0.9 | sea | under H1 | counts once |
| Caption | of litter removed from 140 km of Cornish coast by 2,300 volunteers in 2027. | Text 400, 21 px | 1.5 | ink-60 | under the number, max 520 px | fade |

All figures TEMP until the audited report is supplied.

### Sections
Eight chapters (Clean-ups · Monitoring · Schools · Policy · Volunteers · Partners · Finances · Next year). Each: title, 150–300 words, one big number, one chart (tide-area, bar or a simple table), one quote with the volunteer's first name and town (consent). Finances: income and spend as a single 100 % stacked bar with direct labels and a plain-words paragraph, reserves policy, a link to the filed accounts.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Tide chart | `--p` of its section | — | linear | — | clip-path inset(0 100% 0 0) → inset(0) |
| Big numbers | in view, once | 0 | 1600 ms | ease-out | 0 → value |
| Paragraph groups | in view | 0 | 600 ms | ease-out | opacity 0 → 1 |
Reduced motion: charts fully drawn, numbers final.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Charts | full width, labels below bars | full width | 8 columns + table in 4 | same |
| Contents | a toggle sheet | toggle | sticky left column ≥ 1280 | — |

### Acceptance
**First viewport:** at 1440 × 900 a quiet off-white page with "A year on the tide line." and a huge sea-blue "61.4 tonnes" counting up once, its caption beneath; a slim sticky bar with progress and contents. Further down, a tide-shaped chart fills from left to right as you scroll, with record months labelled and a data table beside it. At 390 × 844 chapters read in a single column with charts full width.
**Do not:** show a chart without its table and source; use a legend when direct labels fit; invent numbers; ship only a PDF; hide the finance chapter.
