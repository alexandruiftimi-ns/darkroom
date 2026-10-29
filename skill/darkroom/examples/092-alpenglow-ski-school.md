# Alpenglow · ski and snowboard school
<!-- Darkroom example 092 · fictional school · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing + booking | `bold` + `nature` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a site for our ski school in the Alps: group and private lessons for kids and adults, prices by week, which level am I, and booking. Bright snow, blue sky, energetic. Families book on phones in the evening.

## Build spec

### Brief & signature
Alpenglow runs a ski and snowboard school in Les Arcs with 60 instructors; kids' groups from age 4, adults, privates. Visitors are parents planning a February week. Feeling: crisp, sunny, encouraging. **Signature:** a level finder as a slope: five levels drawn as a stylised piste profile from green to black with a skier icon; choosing "Can you stop on a blue slope?" style questions moves the skier along the profile and lands on the right course with its price. **Supporting:** snow-white ground with sky-blue and signal-red, big type, sunny photos.

### Stack & files
Astro; `src/data/courses.json` (age band, level, days, hours, price per week incl. taxes), `src/components/LevelFinder.astro` (three yes/no questions → level; JS moves the icon, without JS the questions are a link list to each level), booking via the school's booking system with level and age passed in the URL.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Archivo | 800 (wdth 112) | headings |
| Text | Figtree | 400, 600 | UI |

### Tokens
```css
:root { --ground: #fbfdff; --snow: #eef4fa; --ink: #0f1d2b; --ink-60: #0f1d2b99; --sky: #2a7de1; --piste-green: #2e9d5b; --piste-blue: #2a7de1; --piste-red: #d7263d; --piste-black: #111; --line: #0f1d2b1a;
  --display: "Archivo", system-ui, sans-serif; --text: "Figtree", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| hero | own photo (NEEDS 1, consent) | `<img>` 2400 px | cover, 60 % 55 % | static | sky field | a kids' group in red bibs following an instructor down a sunny green run, from behind and above; sky top 30 % |
| profile | drawn in SVG | inline 100 % × 160 px | — | skier moves | static with labels | green → blue → red → black segments |

### Nav
64 px: "Alpenglow" Display 800 20 px; Kids · Adults · Snowboard · Privates · Prices; language EN/FR/NL; CTA "Book lessons" red fill.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | From first turns to first black run. | Display 800, clamp(40px, 6.4vw, 104px) | 0.95 / −0.02em | white with shadow | left gutter, top 16 vh, max 11ch | rise 20 px |
| Sub | Ski and snowboard lessons in Les Arcs for ages 4 and up, in small groups of 8. | Text 400, 19 px | 1.5 | white 90 % | under H1 | delay 100 ms |
| CTAs | Find my level · Book lessons | white fill sky text / red fill | — | — | under sub | delay 200 ms |

### Sections
Level finder (profile + three questions), Courses (cards by age band with price per week and hours), Privates, Meeting points (map illustration), FAQ (lift passes, equipment, what if it snows too much), Book.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Skier icon | answer | 0 | 700 ms | `cubic-bezier(.22,1,.36,1)` | along the profile path to the level |
| Course cards | in view | `i × 80 ms` | 600 ms | ease-out | 20 px, 0 → 0, 1 |
Reduced motion: the icon jumps to the level.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Profile | 120 px, questions stacked below | 140 px | 160 px | 140 px |
| Hero | photo re-aimed on the group, H1 at the bottom over a scrim | top-left | top-left | top-left |

### Acceptance
**First viewport:** at 1440 × 900 a sunny run with a line of kids in red bibs, a bold white headline top-left with two buttons. Further down, a little skier slides along a green-to-black slope profile as the visitor answers three questions and lands on their course and price. At 390 × 844 the headline sits low on the photo over a soft scrim.
**Do not:** show children's faces without consent; hide prices; mix up piste colours (they are a real convention); require JS for the level finder.
