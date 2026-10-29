# The Long Field · a weekly newsletter about small farms
<!-- Darkroom example 033 · fictional publication · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `ghost` | landing + editorial | `editorial-news` (monochrome) | `calm` | none | — |

## Say this
> /darkroom a Ghost theme for my farming newsletter. Black and white only, a big serif masthead, a short video of a tractor at dusk in the header, the sign-up box right there, then the latest issues as a clean list. Free and paid members.

## Build spec

### Brief & signature
The Long Field is a weekly letter by a former agronomist about the economics of farms under 50 hectares; 9,000 free and 700 paid members. Visitors arrive from shared links. Feeling: serious, rural, generous. **Signature:** a newspaper masthead: THE LONG FIELD set across the full width in a condensed serif, with the issue number, date and "Free every Thursday" in a rule-separated line beneath it, over a short black-and-white dusk loop inside the masthead's lower band. **Supporting:** Ghost's member sign-up inline, a strict list of issues, ink and paper only.

### Stack & files
Ghost theme (`darkroom platform scaffold ghost`): `default.hbs`, `index.hbs`, `post.hbs`, `partials/masthead.hbs`, `partials/signup.hbs` (Ghost Portal `data-members-form`), `assets/css/screen.css`. Theme settings in `package.json` `config.custom`: masthead video on/off. Checked with gscan.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Masthead | Playfair Display SC | 700 | masthead only |
| Headings | Newsreader | 500 | issue titles, `--gh-font-heading` |
| Text | Newsreader | 400, 400 italic | articles, `--gh-font-body` |
| UI | Public Sans | 500 | buttons, meta |

### Tokens
```css
:root { --ground: #f7f6f2; --ink: #111111; --ink-60: #11111199; --line: #1111111f; --gh-font-heading: "Newsreader", Georgia, serif; --gh-font-body: "Newsreader", Georgia, serif;
  --mast: "Playfair Display SC", Georgia, serif; --ui: "Public Sans", system-ui, sans-serif; }
```
Ghost's accent colour setting is respected for buttons only (`var(--ghost-accent-color)`), defaulting to `#111`.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| dusk loop | the writer's own phone clip, desaturated (NEEDS 1) | `<video muted loop playsinline autoplay poster>` 1600 × 400 band | cover, 50 % 60 % | loops; paused under reduced motion | poster | a small tractor crossing a field edge at dusk, left to right, far away; sky top half; black and white, raised contrast |

### Nav
A 40 px top bar: Archive · About · Sign in (Public Sans 500 13 px), right "Subscribe" button (ink fill, paper text, radius 0).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Masthead (h1 on home) | THE LONG FIELD | Masthead 700, 11.5vw | 0.86 / −0.01em | ink | full width, centred, 24 px below the bar | none |
| Rule line | No. 212 · Thursday 28 October 2027 · Free every Thursday | UI 500, 13 px, tabular | 1 | ink-60 | between two 1 px rules | none |
| Band | the dusk loop | — | — | — | 400 px tall under the rule | loop |
| Pitch | The money, soil and people of farms under fifty hectares. One letter a week. | Text 400 italic, 22 px | 1.45 | ink | left column under the band, max 520 px | none |
| Sign-up | email field + "Get the letter" | UI 500, 16 px; field 52 px tall with a visible label "Your email" | — | ink | right column beside the pitch | — |

Member counts appear only if the writer wants them (TEMP).

### Sections
1. **Latest issues:** Ghost `{{#foreach posts}}`: number, title (Newsreader 500 30 px), one-line excerpt (italic 18 px), reading time; 1 px rules; paid issues marked "Members" in UI 500 12 px.
2. **Topics:** tags as a single line of links.
3. **Post template:** 68ch measure, 21 px/1.6 Newsreader, drop cap on the first paragraph, pull quotes in italic 30 px, Ghost cards styled (image, gallery, bookmark, callout).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Links | hover / focus | 0 | 150 ms | `cubic-bezier(.4,0,.2,1)` | underline thickness 1 → 2 px |
| Band video | load | — | loop | — | plays muted |
Reduced motion: poster only.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Masthead | 13vw, two lines THE LONG / FIELD | 12vw | 11.5vw | 10vw |
| Band | 200 px | 300 px | 400 px | 260 px |
| Sign-up | under the pitch, full width | beside | beside | beside |

### Acceptance
**First viewport:** at 1440 × 900 a paper-white page; a full-width black serif masthead, a ruled date line, a grainy black-and-white band of a tractor at dusk, then the italic pitch and the email sign-up side by side. At 390 × 844 the masthead on two lines and the sign-up visible after one short scroll.
**Do not:** use colour beyond ink, paper and the Ghost accent; hide the sign-up behind a pop-up; break Ghost's required helpers (`{{ghost_head}}`, `{{ghost_foot}}`, `{{body_class}}`); show subscriber numbers without permission.
