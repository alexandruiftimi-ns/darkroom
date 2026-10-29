# Edgecase · a two-day conference on resilient software
<!-- Darkroom example 070 · fictional event · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing + schedule | `modern` + `bold` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a conference website for our two-day software conference: speakers with photos, the schedule by day and room, ticket tiers with early-bird dates, venue and travel, and the code of conduct. The first screen should be striking but the schedule must be easy to use.

## Build spec

### Brief & signature
Edgecase is 600 engineers in Rotterdam for two days in May: talks on outages, retries and recovery. Visitors are engineers and their managers approving budgets. Feeling: sharp, playful about failure, organised. **Signature:** the date and city set huge with a deliberate glitch that is designed, not random: the "E" of EDGECASE is offset by 6 px like a misprint, and on hover the whole wordmark "recovers" (offset 0) in 300 ms: the conference theme in one gesture. **Supporting:** a schedule grid by room with sticky time column, speaker cards, a clear ticket timeline.

### Stack & files
Next.js App Router; `content/schedule.json` (sessions: day, start, end, room, title, speakers, level); `app/schedule/page.tsx` with filters (day, room, level) in the URL query; `app/speakers/[slug]`; `reveal.js` client module. Calendar export: `.ics` per session generated at build.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Unbounded | 800 | wordmark, headings |
| Text | Atkinson Hyperlegible | 400, 700 | schedule, body |
| Mono | JetBrains Mono | 400 | times, rooms |

### Tokens
```css
:root { --ground: #f1f0ec; --ink: #121212; --ink-60: #12121299; --signal: #ff4d2e; --ok: #1f9d55; --line: #1212121f;
  --display: "Unbounded", system-ui, sans-serif; --text: "Atkinson Hyperlegible", system-ui, sans-serif; --mono: "JetBrains Mono", ui-monospace, monospace; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| speaker photos | speakers' own headshots with permission (NEEDS 1) | `<img>` 1:1 480 px, `filter: grayscale(1) contrast(1.1)` | 50 % 35 % | static; colour on hover | initials | — |
| venue photo | the venue's press photo with licence (NEEDS 2) | `<img>` 3:2 | — | static | TEMP | — |

### Nav
64 px: "EDGECASE" Display 800 18 px; Schedule · Speakers · Tickets · Venue · Code of conduct; CTA "Get tickets" signal fill.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Wordmark (h1) | EDGECASE | Display 800, 15vw; the first E `transform: translate(6px, -4px)` with a signal-colour copy 2 px behind it | 0.85 / −0.02em | ink | full width, top 14 vh | hover: E returns to 0 in 300 ms |
| Facts | 20–21 May 2027 · Rotterdam · 600 engineers · 34 talks | Mono 400, 16 px tabular | 1.3 | ink | under the wordmark, left | fade |
| Line | Two days about what happens when things break, and how good teams bring them back. | Text 400, 20 px | 1.5 | ink-60 | under facts, max 560 px | delay 100 ms |
| CTAs | Get tickets · See the schedule | signal fill / underlined | — | — | under line | delay 200 ms |
| Ticket note | Early bird € 390 until 15 Feb | Mono 400, 14 px | — | ok | beside CTAs | none |

Dates, prices and numbers TEMP until confirmed.

### Sections
Speakers (grid of 24, name, company, talk title), Schedule (day tabs, a grid: time column sticky on the left, rooms as columns; session cells with title, speaker, level dot; "Add to calendar"), Tickets (three tiers on a timeline with dates; what's included; invoice for companies), Venue and travel, Code of conduct (full text and a reporting contact).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Wordmark E | hover / focus of the hero | 0 | 300 ms | `cubic-bezier(.22,1,.36,1)` | offset (6, −4) → (0, 0) |
| Speaker cards | in view | `i × 40 ms` (cap 12) | 500 ms | ease-out | opacity |
| Schedule filter | change | 0 | 150 ms | linear | opacity |
Reduced motion: the E stays offset (it is a design, not motion); no reveals.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Wordmark | 17vw | 16vw | 15vw | 13vw |
| Schedule | list by time with room labels | 2 rooms visible, horizontal scroll | full grid | full grid |

### Acceptance
**First viewport:** at 1440 × 900 an off-white page with EDGECASE across the whole width, its first E knocked slightly out of register with a red shadow; dates, city and numbers in mono below; a red ticket button and an early-bird note in green. Hovering snaps the E back into place. At 390 × 844 the wordmark still spans the width, the facts wrap to two lines.
**Do not:** use random glitch animations; make the schedule a PDF; list speakers who have not confirmed; hide the code of conduct contact.
