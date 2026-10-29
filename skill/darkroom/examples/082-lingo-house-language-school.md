# Lingo House · evening language courses for adults
<!-- Darkroom example 082 · fictional school · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `jekyll` | landing + course pages | `family` + `modern` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a site for our small language school on GitHub Pages: Spanish, Italian and Japanese evening courses for adults, a short level test, course dates and prices, and how to enrol. Friendly, clear, a little bit of each language's feeling.

## Build spec

### Brief & signature
Lingo House teaches small evening groups (max 8) in Leeds, three languages, levels A1–B2. Visitors are adults who "did French at school and forgot it". Feeling: welcoming, clear, curious. **Signature:** a greeting that cycles through the three languages in a fixed slot ("Hola · Ciao · こんにちは") with each language's course card tinted in its own colour; the slot never reflows the headline. **Supporting:** a 5-question level test that works without JS (a form that posts to a static result page by score), a dates table.

### Stack & files
Jekyll: `_courses/*.md` (language, level, day, start date, weeks, price, seats), `_layouts/course.html`, `test/index.html` (radio form; JS counts the score and jumps to `/test/a1/` … `/test/b2/`; without JS a "check my answers" page lists the key), `assets/js/greet.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Fraunces | 600 | headings |
| Text | Noto Sans | 400, 600 | body (covers Latin) |
| Japanese | Noto Sans JP | 500 | the greeting and Japanese labels, subset to the used characters |

### Tokens
```css
:root { --ground: #fbfaf7; --ink: #1d232b; --ink-60: #1d232b99; --es: #d9482b; --it: #2f7d4a; --jp: #b3264a; --line: #1d232b1f;
  --display: "Fraunces", Georgia, serif; --text: "Noto Sans", system-ui, sans-serif; --jp-font: "Noto Sans JP", sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| class photo | own with consent (NEEDS 1) | `<img>` 3:2 | — | static | TEMP | a group of eight adults around a table laughing, a teacher at the board |

### Nav
64 px: "Lingo House" Display 600 22 px; Spanish · Italian · Japanese · Level test · Dates; CTA "Enrol" ink fill.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Greeting slot | Hola / Ciao / こんにちは | Display 600 (JP in Noto Sans JP 500), clamp(48px, 8vw, 128px) | 1 | es / it / jp per word | top line of the H1, a grid slot as wide as the widest word | swaps every 2.4 s |
| H1 rest | Learn a language with eight people, one evening a week. | Display 600, clamp(32px, 4.2vw, 60px) | 1.1 / −0.01em | ink | under the slot | rise 16 px |
| Sub | Small evening groups in Leeds city centre. Not sure of your level? Take the 2-minute test. | Text 400, 18 px | 1.55 | ink-60 | under H1 | delay 100 ms |
| CTAs | Take the level test · See dates | ink fill / underlined | — | — | under sub | delay 200 ms |

Each greeting span carries `lang="es" | "it" | "ja"`; the slot is `aria-hidden` and the H1 includes "Hola" as plain text for readers.

### Sections
Three course cards (tinted 8 % in each language colour: levels, evening, price per 10 weeks incl. VAT; seats left), Dates (table from `_courses`), Teachers (three, native speakers, one line each), Enrol (link to the enrolment form service).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Greeting | interval 2400 ms | — | 600 ms | `cubic-bezier(.22,1,.36,1)` | in: translateY(100%) → 0; out: 0 → −100 % |
| Course cards | in view | `i × 100 ms` | 600 ms | ease-out | 16 px, 0 → 0, 1 |
Reduced motion: "Hola" only; no rotation.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Greeting | 44 px | 88 px | 128 px | 96 px |
| Cards | stacked | 3 columns | 3 | 3 |

### Acceptance
**First viewport:** at 1440 × 900 a warm white page where a large greeting changes from a red "Hola" to a green "Ciao" to a crimson "こんにちは" without moving the headline beneath it; two buttons for the level test and dates. At 390 × 844 the same stack.
**Do not:** use flags for languages; load the full Japanese font (subset); let the slot reflow; require JS for the level test.
