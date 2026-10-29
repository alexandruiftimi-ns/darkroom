# Copperhead · craft brewery and taproom
<!-- Darkroom example 073 · fictional brewery · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `wordpress` | landing + editorial | `bold` + `restaurant` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a WordPress site for our brewery and taproom: what's on tap right now (we change it weekly and need to edit it ourselves), taproom hours and events, and where to buy our cans. Loud colours like our can labels.

## Build spec

### Brief & signature
Copperhead brews in a former bus garage in Sheffield; 12 taps, cans in 40 local shops. Visitors are locals deciding where to drink tonight. Feeling: loud, friendly, beery. **Signature:** an "On tap now" board as the opening section: 12 rows, each the beer's name in huge condensed type in its can colour, style, ABV and price in tabular figures, edited by staff as a WordPress list of blocks (one "tap" pattern per row, with colour, name, style, ABV, price). **Supporting:** can-label colours per row, event cards, a stockist list by area.

### Stack & files
Block theme; `patterns/tap-row.php` (a group block with a colour setting), `patterns/on-tap.php` (heading + 12 tap rows), events as posts in "Events" with a date field or a block; stockists as a page table. Staff guide `docs/editing.md`: "change a tap in 30 seconds" with screenshots described in steps.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Anton | 400 | beer names |
| Text | Barlow Semi Condensed | 400, 600 | details |

### Tokens
```css
:root { --ground: #141210; --ink: #f7f1e6; --ink-60: #f7f1e699; --copper: #c86b34; --line: #f7f1e61f;
  --display: "Anton", Impact, sans-serif; --text: "Barlow Semi Condensed", system-ui, sans-serif; }
```
Tap colours come from the block setting; each row's name is checked for ≥ 3:1 against the ground (large text).

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| taproom photo | own (NEEDS 1) | Cover block | cover, 50 % 50 % | static | copper field | the long bar with the 12 tap handles, evening light, people from behind |
| can photos | own on black (NEEDS 2) | image blocks 1:1 | — | reveal | TEMP | each can front-on |

### Nav
Header part: "COPPERHEAD" Display 28 px; On tap · Taproom · Events · Stockists; "Open today 16:00–23:00" (from a synced pattern) in Text 600.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | On tap tonight | Display 400, clamp(40px, 6vw, 96px) | 0.9 / 0 | ink | left gutter, top 14 vh | none |
| Tap rows ×12 | e.g. "BUS DEPOT · Pale ale · 4.6 % · £ 5.20" | name Display 400 clamp(36px, 6vw, 92px) in its colour; details Text 600 18 px tabular ink-60 | 0.95 | per row | full width rows with a 1 px line | rows reveal |
| Open line | Taproom open today 16:00–23:00 · Quiz on Thursday | Text 600, 16 px | — | copper | top-right | none |

Beers and prices are the staff's; the spec's row is an example.

### Sections
Taproom (photo, hours, food trucks this week), Events (next four), Stockists (by area, table), Brewery tours, footer with the legal drinking-age line.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Tap rows | in view | `i × 50 ms` | 600 ms | `cubic-bezier(.22,1,.36,1)` | translateX(−24px), 0 → 0, 1 |
| Row hover | pointer | 0 | 200 ms | ease-out | details slide 8 px right |
Reduced motion: rows in place.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Tap name | 11vw, details on a second line | 7vw | 6vw | 5vw |

### Acceptance
**First viewport:** at 1440 × 900 a dark page; "On tap tonight" and today's hours; then beer names stacked in huge condensed letters, each in its own can colour, with style, ABV and price beside them. At 390 × 844 the names fill the width, details below each.
**Do not:** make staff edit code to change a tap; show a beer without ABV; use an age gate in front of the page; hard-code the hours.
