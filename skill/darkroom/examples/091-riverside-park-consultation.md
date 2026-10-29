# Riverside Park plan · a council's public consultation page
<!-- Darkroom example 091 · fictional council project · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing + read | `trust` + `nature` | `animated` | none | `reveal.js` (a range input drives the comparison) |

## Say this
> /darkroom a consultation page for our town council's plan to redesign the riverside park: show the park now and the plan (a slider to compare), the three options, the timeline, and a short survey. It must meet public-sector accessibility rules.

## Build spec

### Brief & signature
A town council proposes three designs for a 6-hectare riverside park; consultation runs for 8 weeks. Visitors are residents of all ages, many on phones, some using screen readers. Feeling: open, fair, clear. **Signature:** a now-and-plan comparison of the park from the same aerial view: a range slider reveals the plan drawing over the current photo (keyboard operable, with a text description of every change below it). **Supporting:** the three options as equal cards (no "recommended" bias unless the council has one, stated plainly), a timeline, a survey that works without JS.

### Stack & files
`index.html`, `options/*.html`, `styles.css`, `compare.js` (range input → `clip-path`; the comparison is also described in a list), survey as a plain HTML form posting to the council's form service; WCAG 2.2 AA, accessibility statement page (required for public bodies).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| All | Atkinson Hyperlegible | 400, 700 | one family, body 19 px |

### Tokens
```css
:root { --ground: #ffffff; --ink: #0b0c0c; --ink-70: #0b0c0cb3; --green: #00703c; --blue: #1d70b8; --focus: #ffdd00; --line: #0b0c0c26;
  --text: "Atkinson Hyperlegible", system-ui, sans-serif; }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 0; box-shadow: 0 0 0 6px var(--ink); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| park now | council's aerial photo (NEEDS 1) | `<img>` 2000 px | cover | base | — | straight down, summer, the river across the lower third |
| plan | the landscape architect's plan drawn at the same scale and crop (NEEDS 2) | `<img>` aligned | cover | revealed by slider | plan as a separate image with text | colour plan, labelled areas, north arrow |

### Nav
Council header (logo supplied) + "Riverside Park plan" 700 20 px; Options · Timeline · Have your say · Accessibility.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Have your say on the new Riverside Park | Text 700, clamp(32px, 4.4vw, 56px) | 1.15 / 0 | ink | top | none |
| Sub | Three designs for the park by the river. Tell us what you think by 15 January 2028. It takes about 5 minutes. | Text 400, 21 px | 1.5 | ink-70 | under H1, max 640 px | none |
| CTA | Start the survey | Text 700, 19 px, green fill, white text, 52 px, radius 0, a 2 px darker bottom border | — | — | under sub | none |
| Compare | slider "Now / Plan" | range input labelled "Show more of the plan" | — | — | below, full width 16:9 | user-driven |

Dates TEMP until set.

### Sections
What changes (a list matching the comparison), The three options (equal cards: what it includes, cost estimate, trees kept, play area size), Timeline (consultation → decision → build), Have your say (the survey: questions with fieldsets and legends), Accessibility statement link, Contact (alternative formats, phone, a paper copy at the library).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Section groups | in view | 0 | 400 ms | ease-out | opacity 0 → 1 (no travel) |
| Compare | input | — | immediate | — | clip-path |
Reduced motion: no fades.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Compare | 4:3, slider 48 px thumb | 16:9 | 16:9 | 16:9 |
| Options | stacked | 3 columns | 3 | 3 |

### Acceptance
**First viewport:** at 1440 × 900 a plain white council page: a clear question as the headline, the closing date and how long it takes, a green Start the survey button, and an aerial photo of the park with a slider that reveals the plan. At 390 × 844 the same, all text at least 19 px, yellow focus rings when tabbing.
**Do not:** bias the options visually; make the slider the only way to learn the changes; require JS for the survey; ship without the accessibility statement.
