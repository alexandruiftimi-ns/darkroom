# Hollins Green Primary · a village primary school
<!-- Darkroom example 052 · fictional school · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `wordpress` | landing + editorial | `family` + `trust` | `calm` | none | — |

## Say this
> /darkroom a WordPress site for our village primary school. Parents need term dates, letters home, the lunch menu and how to report an absence, fast, on their phones. Prospective parents should see what the school feels like. Staff will update it themselves.

## Build spec

### Brief & signature
Hollins Green has 180 pupils in seven classes, a forest school and a breakfast club. Visitors are current parents (daily, on phones) and prospective parents (once, in depth). Feeling: warm, safe, organised. **Signature:** a "Today at school" strip under the header that staff update in one block: the date, lunch, after-school clubs, and a red notice if something changed ("Year 4 trip leaves at 8:30"), so a parent sees today in five seconds. **Supporting:** big tap targets for the four parent tasks, children's artwork as section dividers (with consent), calm states.

### Stack & files
Block theme; synced pattern `patterns/today.php` (date, lunch, clubs, notice) so office staff edit it from the dashboard; "Letters" post category; pages for term dates, policies (statutory), admissions; a short staff guide in `docs/editing.md` with click-by-click steps.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Andika | 700 | designed for early readers |
| Text | Atkinson Hyperlegible | 400, 700 | body 18 px |

### Tokens
```css
:root { --ground: #fffdf8; --ink: #1f2933; --ink-70: #1f2933b3; --green: #2e7d4f; --sun: #ffd166; --notice: #b42318; --line: #1f29331f;
  --display: "Andika", system-ui, sans-serif; --text: "Atkinson Hyperlegible", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| school photo | own, children not identifiable or with consent (NEEDS 1) | Cover block 2000 px | cover, 50 % 60 % | static | green field | the playground and forest edge in sunshine, children from behind or far away |
| artwork strips ×3 | scanned children's drawings, first names only with consent (NEEDS 2) | `<img>` 2400 × 240 | cover | static | none | crayon drawings of the school, trees, the bus |

### Nav
80 px: school crest (supplied SVG) + "Hollins Green Primary School"; Parents · About us · Admissions · Letters · Contact; search. Phone: Menu button 48 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Today strip | Tue 3 Nov · Lunch: fish pie or veggie lasagne · Clubs: football, choir · Year 4 trip leaves at 8:30 | Text 700, 16 px; notice in `--notice` | 1.4 | ink | full width under header on `--sun` at 30 % | none |
| H1 | A small school where everyone knows your name. | Display 700, clamp(34px, 4.6vw, 64px) | 1.12 / 0 | ink | left, columns 1–6 | none |
| Task buttons ×4 | Report an absence · Term dates · Lunch menu · Letters home | Text 700, 18 px; 64 px tall, green 2 px border, radius 14 px, icon left | — | ink | 2 × 2 grid under H1 | none |
| Photo | — | radius 24 px | — | — | columns 7–12 | none |

The strip's content is the office's; the spec shows an example.

### Sections
About us (headteacher's welcome, 80 words, signed), Our classes (seven class names), Forest school, Admissions (open mornings, how to apply), Statutory information (Ofsted report, policies, SEND, pupil premium: required pages linked), Contact (address, phone, office hours).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Buttons | hover / focus | 0 | 150 ms | `cubic-bezier(.4,0,.2,1)` | background green 10 % |
Calm: nothing else.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Today strip | stacked lines, notice first | one line | one line | one line |
| Tasks | 1 column, 64 px each | 2 × 2 | 2 × 2 | 2 × 2 |
| Photo | after the tasks | right | right | right |

### Acceptance
**First viewport:** at 1440 × 900 the crest and name, then a soft yellow strip with today's lunch, clubs and one red notice; a friendly headline and four big task buttons on the left; a sunny playground photo on the right. At 390 × 844 the notice first, then the four buttons stacked.
**Do not:** show identifiable children without consent; bury statutory information; let staff need a developer to change today's strip; use more than 4 task buttons.
