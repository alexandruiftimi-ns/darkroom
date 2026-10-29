# Rota · shift swaps for restaurant teams
<!-- Darkroom example 034 · fictional product · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing | `modern` + `restaurant` (warmth) | `animated` (CSS only) | none | — |

## Say this
> /darkroom a landing page for our shift-swapping app for restaurant staff. Video of a busy kitchen pass behind the hero, Log in and Sign up buttons, a play button for a 30-second demo, and a phone menu. All animation should be plain CSS, no libraries.

## Build spec

### Brief & signature
Rota lets kitchen and floor staff post a shift, swap it, and get the manager's OK in one tap; €3 per person a month. Visitors are restaurant managers and owners. Feeling: busy but in control, warm. **Signature:** over the kitchen loop, a stack of three swap "tickets" printed like order tickets (DOM, mono type, perforated top edge) slides in one by one and gets a red "OK'd" stamp, the way a pass rail fills up. **Supporting:** CSS transitions only, a demo video in a dialog, a phone menu.

### Stack & files
Astro, `src/pages/index.astro`, `src/styles/site.css`; the ticket stack is CSS keyframes triggered by a class on load; the demo dialog uses `<dialog>` with a native `<video controls>`; menu is a `<details>`-free button + `[data-open]` CSS.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Bricolage Grotesque | 700 | headline |
| Text | Inter Tight | 400, 500 | UI |
| Tickets | Courier Prime | 400, 700 | ticket text |

### Tokens
```css
:root { --ground: #120e0b; --ink: #fbf6ee; --ink-70: #fbf6eeb3; --ticket: #fffdf6; --tomato: #e0452b; --line: #fbf6ee22;
  --display: "Bricolage Grotesque", system-ui, sans-serif; --text: "Inter Tight", system-ui, sans-serif; --mono: "Courier Prime", ui-monospace, monospace;
  --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| kitchen loop | free stock after a yes, or filmed in a client's kitchen with consent (NEEDS 1) | `<video muted loop playsinline autoplay poster>` | cover, 40 % 50 % | loops | poster | a kitchen pass under warm heat lamps, hands placing plates, faces out of frame or blurred; right 45 % darker steel; 8 s |
| demo | the product team's 30 s screen recording with captions (NEEDS 2) | `<video controls preload="none">` in a dialog | contain | user-started | link to the demo page | captions burned off; a `<track>` file instead |

### Nav
68 px: "Rota" Display 700 22 px; Features · Pricing · For managers; right: "Log in" text link, "Sign up free" tomato fill. Phone: a Menu button opens a full-height panel (ground 98 %), links 32 px Display, transitions 320 ms; closes on Esc, link, resize ≥ 768 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Swap a shift before service starts. | Display 700, clamp(40px, 5.8vw, 92px) | 0.98 / −0.03em | ink | left gutter, top 24 vh, max 11ch | rise 20 px (CSS) |
| Sub | Staff post and swap shifts in one tap. You approve from your phone. €3 per person a month. | Text 400, 18 px | 1.5 | ink-70 | under H1, max 420 px | delay 100 ms |
| CTAs | Sign up free · ▶ Watch the 30-second demo | primary tomato; secondary text link with a 36 px play circle | — | — | under sub | delay 200 ms |
| Tickets ×3 | "SWAP · Sat 18:00 · Grill · Ana → Tomás", "SWAP · Sun 11:00 · Floor · Lee → Priya", "COVER · Mon 17:00 · Pass · open" | Mono 400/700, 14 px on `--ticket`, ink `#1d1915`, width 280 px, perforation via radial-gradient mask | 1.4 | — | right columns, stacked with −10 px overlap, rotated −2°/1°/−1° | slide in from top, 160 ms stagger; stamp scales 1.4 → 1 |

Prices are TEMP until confirmed; names on tickets are invented examples.

### Sections
How it works (Post · Swap · Approve, three columns), For managers (labour cost view, illustrated with real DOM numbers), Pricing (one plan), FAQ, footer.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Hero text | load class | `i × 100 ms` | 700 ms | `--ease-out` | 20 px, 0 → 0, 1 |
| Ticket i | load class | `0.4 + i × 0.16 s` | 600 ms | `--ease-out` | translateY(−40px) rotate(0), 0 → rest, 1 |
| Stamp | after ticket | `+ 0.3 s` | 260 ms | `cubic-bezier(.34,1.56,.64,1)` | scale 1.4, 0 → 1, 1 |
| Menu panel | open | 0 | 320 ms | `--ease-out` | translateY(−100%) → 0 |
No JS: the start states only apply under `html.js` (set by a one-line inline script), so without it everything shows in its final state. Reduced motion: tickets and stamps in place.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Tickets | two tickets under the CTAs, no rotation | right | right | 2 tickets |
| H1 | 38 px | 64 px | 92 px | 70 px |

### Acceptance
**First viewport:** at 1440 × 900 a warm kitchen pass under heat lamps; the headline left; on the right three paper swap tickets drop onto the rail and each gets a red OK'd stamp. At 390 × 844 the headline, two buttons and two tickets fit; the menu opens full height.
**Do not:** add an animation library; show staff faces without consent; autoplay the demo; use generic "trusted by" logos.
