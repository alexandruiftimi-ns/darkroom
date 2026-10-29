# The Salt Museum · a town museum in a former saltworks
<!-- Darkroom example 036 · fictional museum · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `wordpress` | landing + editorial | `editorial-news` + `art-gallery` | `animated` | none | `reveal.js`, `cursor-reveal.js` (optional) |

## Say this
> /darkroom a WordPress site for a small museum in an old saltworks. Very light background, the word SALT huge across the screen, and the museum's six rooms listed as chapters: hovering a chapter shows its photo. Opening hours and tickets.

## Build spec

### Brief & signature
The Salt Museum occupies the boiling house of a saltworks that closed in 1964; six rooms tell 800 years of salt in the town. Visitors are families, school groups and day-trippers. Feeling: mineral, bright, curious. **Signature:** SALT set at 21vw across the full width (leading 0.75, tracking −0.05em), with the six rooms listed beneath it as numbered chapters; hovering (or tapping) a chapter shows its photo in a fixed frame on the right, crossfading 300 ms. **Supporting:** mono labels for dates, a pale mineral ground, reveal on scroll.

### Stack & files
WordPress block theme; pattern `patterns/chapters.php` (a query loop over a "Room" page type or a group of pages chosen by the museum; ask), `assets/chapters.js` (hover/tap swap), `reveal.js`. Opening hours from a synced pattern the staff edit.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Mega | Inter Tight | 600 | the single word, also UI |
| Text | Literata | 400 | room descriptions |
| Labels | JetBrains Mono | 400 | dates |

### Tokens
```css
:root { --ground: #fcfcfa; --ink: #111111; --ink-60: #11111199; --brine: #6b8a99; --line: #1111111a;
  --sans: "Inter Tight", system-ui, sans-serif; --text: "Literata", Georgia, serif; --mono: "JetBrains Mono", ui-monospace, monospace; }
::selection { background: #111; color: #fff; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| room photos ×6 | the museum's photos (NEEDS 1–6) | `<img>` 4:5, 960 px | cover | swap on hover/tap | the room number large in a grey frame, TEMP | each room photographed from its doorway in daylight, no visitors |

### Nav
72 px: "The Salt Museum" Inter Tight 600 16 px; Rooms · Visit · Schools · Shop; CTA "Tickets" ink fill, ground text, radius 0.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Mega (h1 contains it) | SALT | Sans 600, 21vw | 0.75 / −0.05em | ink | full width, top 12 vh | letters rise 6 % in a mask, 60 ms stagger |
| H1 rest | The Salt Museum, in the old boiling house | Sans 600, 18 px (part of the same h1, on its own line under SALT) | 1.3 | ink-60 | left gutter | fade |
| Open line | Open today 10:00–17:00 · Adults € 9 · Children free | Mono 400, 13 px tabular | 1 | ink | right gutter, aligned with the h1 rest | none |

### Sections
**Rooms (chapters):** left 6 columns: six rows, each `01` (mono 13 px brine) + name (Sans 600 clamp(28px, 3.6vw, 52px)) + period (mono 13 px ink-60) + a 30-word Literata line that appears under the active row; right 5 columns: a sticky 4:5 frame showing the active room's photo. Rows: 01 The boiling pans · 1200–1964; 02 Brine wells; 03 Salt roads; 04 The salt tax; 05 Workers' houses; 06 The last boil, 1964 (all TEMP until the museum confirms). Then Visit (hours, prices incl. VAT, access), Schools, Shop link, footer.

### Interaction logic
Pointer: `mouseenter`/`focus` on a row sets it active; tap on touch toggles. The active row's name goes from ink-60 to ink (150 ms); its photo crossfades in 300 ms. Without JS the rows are a plain list with the photo inline in each row.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| SALT letters | load | `i × 60 ms` | 900 ms | `cubic-bezier(.22,1,.36,1)` | translateY(6%) in a mask → 0 |
| Photo swap | hover / focus / tap | 0 | 300 ms | `cubic-bezier(.4,0,.2,1)` | opacity 0 → 1 |
| Rows | in view | `i × 70 ms` | 600 ms | ease-out | 12 px, 0 → 0, 1 |
Reduced motion: letters in place, photo swaps without fade.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| SALT | 34vw | 26vw | 21vw | 18vw |
| Rooms | photo inline under the open row | sticky frame | sticky frame | sticky frame, 60 vh |

### Acceptance
**First viewport:** at 1440 × 900 an off-white page with SALT in black across nearly the whole width, a quiet line naming the museum beneath it on the left and today's hours and prices on the right. Below, six numbered rooms; pointing at one brings up its photo on the right. At 390 × 844 SALT fills the width and the rooms open one at a time.
**Do not:** put the hours in an image; let SALT overflow the viewport; hard-code room texts in the theme (they are pages); use more than one accent (brine is for numbers only).
