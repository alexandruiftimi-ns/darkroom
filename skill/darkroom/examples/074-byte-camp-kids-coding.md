# Byte Camp · coding clubs for 8–13 year olds
<!-- Darkroom example 074 · fictional club · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `family` + `artsy` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a fun but trustworthy site for our after-school coding clubs for kids aged 8 to 13: parents need ages, times, prices, safety info and booking; kids should think it looks cool. Bright colours, playful, but not babyish.

## Build spec

### Brief & signature
Byte Camp runs weekly clubs and holiday camps in four Dublin schools: games in Scratch, then Python. Visitors are parents (decide, pay) and kids (want it). Feeling: playful, clever, safe. **Signature:** a little robot drawn in SVG in the hero that follows a short program written beside it in big blocks ("move 3 · turn right · jump"), executing each block in turn when the visitor presses "Run" (and once on load); the blocks are real buttons a kid can reorder by keyboard or drag. **Supporting:** chunky colour blocks for each age group, a parents' facts table, spring easing.

### Stack & files
`index.html`, `styles.css`, `robot.js` (a 6 × 4 grid, 3 commands, reorder with drag or ↑/↓ on a focused block, Run animates in 400 ms steps), `recipes/reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Baloo 2 | 700 | headings |
| Text | Lexend | 400, 600 | body (good for young readers) |
| Code | Fira Code | 500 | command blocks |

### Tokens
```css
:root { --ground: #fffaf0; --ink: #1d1b2f; --ink-70: #1d1b2fb3; --grape: #6c4bd8; --lime: #9be15d; --coral: #ff7a59; --sky: #4cc3f5; --line: #1d1b2f1f;
  --display: "Baloo 2", system-ui, sans-serif; --text: "Lexend", system-ui, sans-serif; --code: "Fira Code", ui-monospace, monospace; --spring: cubic-bezier(.34,1.56,.64,1); }
```
Grape is used as an action colour, not as a gradient (no purple gradient).

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| robot + grid | drawn in code | inline SVG 480 × 320 | right columns | runs the program | static robot at the goal | rounded robot, 2 px ink stroke, lime body, a coral star as the goal |
| club photos ×3 | own; children only with parental consent, or from behind (NEEDS 1) | `<img>` 3:2 | — | reveal | TEMP | kids at laptops laughing, tutor beside them |

### Nav
68 px: "Byte Camp" Display 700 24 px; Clubs · Holiday camps · For parents · Book; CTA "Book a free taster" grape fill, white, radius 14 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Make the game, don't just play it. | Display 700, clamp(38px, 5.6vw, 84px) | 1.0 / −0.01em | ink | columns 1–6, top 20 vh | rise 20 px with spring |
| Sub | Weekly coding clubs and holiday camps for 8–13 year olds in four Dublin schools. Scratch first, then Python. | Text 400, 18 px | 1.55 | ink-70 | under H1 | delay 100 ms |
| CTA | Book a free taster | as nav, 17 px, 54 px | — | — | under sub | delay 200 ms |
| Program | move 3 · turn right · jump | Code 500, 18 px in 44 px blocks (lime, sky, coral) | — | ink | beside the robot | reorderable |
| Run | ▶ Run | Text 600, 16 px, ink fill | — | white | under the blocks | `:active` scale .95 |

### Sections
Age groups (8–10 Scratch · 10–13 Python · Camps), each a colour block with what they make; For parents (table: ratio 1:8, Garda vetted tutors, price per term incl. VAT, sibling discount; TEMP); Book (school, day, child's age; to the booking system).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Robot steps | Run / load once | 600 ms on load | 400 ms per step | `--spring` | grid position changes |
| Blocks reorder | drag / ↑↓ | 0 | 200 ms | ease-out | translateY swap |
| Age blocks | in view | `i × 100 ms` | 600 ms | `--spring` | scale .96, 0 → 1, 1 |
Reduced motion: robot jumps to each cell without travel; blocks swap instantly.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Robot | under the CTA, 100 % width, 3 blocks in a row | under | right | right |
| H1 | 36 px | 60 px | 84 px | 64 px |

### Acceptance
**First viewport:** at 1440 × 900 a warm cream page; a bold friendly headline and a purple taster button; on the right a lime robot on a little grid that walks three steps, turns and jumps onto a star, with the three code blocks beside it and a Run button. At 390 × 844 headline and button, then the robot puzzle.
**Do not:** use a purple gradient; show children's faces without consent; hide safeguarding facts; make the puzzle needed to book.
