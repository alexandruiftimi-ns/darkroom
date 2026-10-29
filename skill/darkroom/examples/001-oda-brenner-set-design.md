# Oda Brenner · stage and set designer portfolio
<!-- Darkroom example 001 · fictional person and brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing | `bold` + `art-gallery` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a portfolio for a theatre set designer. Her name should be huge across the top, with her photo cutting through it, then a moving strip of the productions she worked on, then six projects. Dark, confident, a bit theatrical.

## Build spec

### Brief & signature
A one-page portfolio for Oda Brenner, set designer for opera and drama in Bergen and Hamburg. Visitors are directors and producers deciding whether to book her. Feeling: theatrical, exact, warm under stage light. **Signature:** the surname BRENNER set edge to edge at 21vw, with her cut-out portrait standing in front of the letters as if on a stage apron. **Supporting:** a slow marquee of production titles, mask reveals on project images, one warm spotlight gradient behind the portrait.

### Stack & files
Astro 5, one page `src/pages/index.astro`, components `Hero.astro`, `Marquee.astro`, `Projects.astro`, `Contact.astro`. Fonts in `public/fonts/`. `recipes/reveal.js` copied to `src/scripts/`. No UI framework.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Big Shoulders Display | 800 | self-hosted variable woff2, subset Latin |
| Text | Hanken Grotesk | 300, 500 | body, nav, labels |

### Tokens
```css
:root { --ground: #0d0b0a; --surface: #17130f; --ink: 36 30% 92%; --accent: #e8a24a; --line: hsl(var(--ink) / .14);
  --display: "Big Shoulders Display", Impact, sans-serif; --text: "Hanken Grotesk", system-ui, sans-serif;
  --ease-out: cubic-bezier(.22,1,.36,1); --gutter: clamp(20px, 4vw, 64px); --section: clamp(96px, 12vw, 160px); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| portrait | user's photo, background removed (NEEDS row 1) | `<img>` WebP with alpha, 1400 px tall | bottom-anchored, centred at x 58 % | static | silhouette drawn in ground-2 `#1d1814`, marked TEMP | waist-up, three-quarter turn to the left, warm key light from top-right, no props |
| project stills ×6 | user's production photos | `<img>` 4:5, `srcset` 640/1280 | `object-position` per photo | mask reveal | flat `--surface` tiles with the title, TEMP | stage shots with the set lit, no audience heads |

### Nav
Fixed, height 64 px, padding `0 var(--gutter)`, transparent over the hero, `--ground` at 90 % with `backdrop-filter: blur(8px)` after 80 px of scroll (200 ms). Left: "Oda Brenner" Hanken 500 15 px. Right: Work · About · Contact, 14 px ink-60, hover ink-100 150 ms. CTA "Book a meeting" 14 px, 1 px line border, radius 999 px, padding 10 px 18 px. Phone: links collapse into a full-screen overlay (ground 98 %), links at 40 px Big Shoulders, open 360 ms `--ease-out`, Esc and link-click close, body scroll locked.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Surname | BRENNER | Display 800, 21vw (phone 24vw) | 0.8 / −0.05em | ink-100 | `bottom: 18vh`, full width, centred | rises 40 px → 0, 900 ms, delay 150 ms |
| Portrait | — | — | — | — | in front of the surname, height 78vh, bottom 0 | opacity 0 → 1, scale 1.04 → 1, 1.2 s, delay 300 ms |
| Spotlight | — | radial-gradient(40vw 40vw at 58 % 60 %, #e8a24a33, transparent 70 %) | — | — | behind portrait | none |
| Role line | Set and costume design for opera and drama | Text 300, 18 px | 1.4 / 0 | ink-80 | bottom-left, `left: var(--gutter); bottom: 40px`, max 260 px | fade, 600 ms, delay 700 ms |
| CTA | Book a meeting | Text 500, 15 px | 1 / 0 | ground on `--accent` | bottom-right | fade, delay 800 ms |

### Sections
1. **Marquee:** productions in Display 800 at 56 px, ink-40, separated by a 10 px accent dot: "Peer Gynt · Wozzeck · The Seagull · Rusalka · Hedda Gabler · Elektra". Loop 32 s, edge-fade mask 10 % each side, pause button (WCAG 2.2.2) at the right edge, paused under reduced motion.
2. **Projects:** a 12-column grid, rows alternate 7/5 and 5/7, each tile image 4:5 + title (Display 800 40 px) + venue and year (Text 300 15 px ink-60). Reveal: `data-reveal="mask"`, stagger 120 ms per row.
3. **About:** 60 words max beside a 3:4 sketchbook photo, Text 300 20 px/1.55, ink-80.
4. **Contact:** "Next season starts with a sketch." Display 800 clamp(48px, 9vw, 140px), email link, booking agent line. Footer closes on the wordmark at 18vw, ink-10.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Surname | load | 150 ms | 900 ms | `--ease-out` | translateY(40px), opacity 0 → 0, 1 |
| Portrait | load | 300 ms | 1200 ms | `--ease-out` | scale 1.04, opacity 0 → 1, 1 |
| Project tiles | in view 15 % | `i × 120 ms` | 800 ms | `--ease-out` | clip-path inset(100% 0 0 0) → inset(0) |
| Marquee | always | — | 32 s loop | linear | translateX(0 → −50 %) |
Reduced motion: everything in its final state, marquee static with the list wrapped over two lines.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Surname | 24vw, bottom 30vh | 22vw | 21vw | 18vw |
| Portrait | 60vh, x 50 % | 70vh | 78vh | 70vh |
| Projects | one column | 2 columns | 7/5 rhythm | — |

### Acceptance
**First viewport:** at 1440 × 900 the warm-lit portrait stands in front of BRENNER, the letters running off both edges by a few pixels; the role line sits bottom-left, the accent CTA bottom-right; nothing else. At 390 × 844 the surname fills the width above the portrait's shoulders, CTA full-width at the bottom.
**Do not:** use gradient text on the name; add a skills list or percentages; autoplay any sound; put more than one accent-coloured element per viewport; invent production credits (titles are TEMP until Oda confirms them).
