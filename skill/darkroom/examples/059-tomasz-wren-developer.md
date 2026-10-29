# Tomasz Wren · freelance front-end developer portfolio
<!-- Darkroom example 059 · fictional person · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `hugo` | landing + writing | `modern` + `editorial-news` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a personal site for me as a freelance front-end developer: short intro, five case studies with real numbers, a writing section, and "available from" status. Fast, minimal, but not boring. Dark and light mode.

## Build spec

### Brief & signature
Tomasz builds accessible front ends for publishers and NGOs from Gdańsk; available for 3-month contracts. Visitors are tech leads and agency producers. Feeling: precise, honest, a little playful. **Signature:** case studies as a "diff" list: each project shows a before → after pair of measured numbers in mono (`LCP 4.1 s → 1.3 s`, `Axe issues 212 → 0`) with green/red markers like a code diff. **Supporting:** a status line with a live dot, dark/light mode that follows the system with a toggle, reveals on rows.

### Stack & files
Hugo: `content/work/*.md` (front matter: client, year, role, metrics [{label, before, after, unit}]), `content/writing/`, `layouts/index.html`; `assets/js/theme.js` (toggle stored in localStorage with try/catch, default = system).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Inter Tight | 600 | headings (a chosen face here, with mono doing the identity) |
| Mono | JetBrains Mono | 400, 600 | diffs, labels, code |
| Text | Inter Tight | 400 | body |

### Tokens
```css
:root { --ground: #fafaf9; --ink: #121212; --ink-60: #12121299; --add: #1a7f37; --del: #cf222e; --line: #1212121a; color-scheme: light dark;
  --display: "Inter Tight", system-ui, sans-serif; --mono: "JetBrains Mono", ui-monospace, monospace; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --ground: #0e0f10; --ink: #ececec; --ink-60: #ececec99; --add: #3fb950; --del: #f85149; --line: #ececec1f; } }
:root[data-theme="dark"] { --ground: #0e0f10; --ink: #ececec; --ink-60: #ececec99; --add: #3fb950; --del: #f85149; --line: #ececec1f; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| project shots ×5 | his own screenshots (NEEDS 1) | `<img>` 16:10 with 1 px border | contain | reveal | none (the diff carries it) | real pages at 1440, no client data |

### Nav
56 px: "tomasz wren" Mono 600 14 px; work · writing · contact; theme toggle (sun/moon icon button with `aria-pressed`).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Status | ● Available from February · Gdańsk, CET | Mono 400, 13 px; dot `--add` | 1 | ink-60 | above H1 | none |
| H1 | I make heavy websites fast and closed websites usable. | Display 600, clamp(32px, 4.4vw, 64px) | 1.1 / −0.025em | ink | columns 1–8, top 20 vh | rise 16 px |
| Sub | Front-end contractor for publishers and NGOs. Performance, accessibility, design systems. | Text 400, 18 px | 1.55 | ink-60 | under H1 | delay 100 ms |
| CTA | Email me · Read the case studies | text links with → | — | ink | under sub | delay 200 ms |

Availability is TEMP and edited in `config.toml` params.

### Sections
Work: five rows, each: client + year (mono 13 px ink-60), project title (Display 600 28 px), then 2–3 diff lines in mono 15 px: `− LCP 4.1 s` in del, `+ LCP 1.3 s` in add, measured with the tool named (`Lighthouse mobile, median of 5`); a link to the full case. Writing: 6 posts (date tabular + title). Contact: email, GitHub, CV PDF.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Work rows | in view | `i × 80 ms` | 600 ms | `cubic-bezier(.22,1,.36,1)` | 16 px, 0 → 0, 1 |
| Theme switch | toggle | 0 | 200 ms | linear | background and ink |
Reduced motion: no travel; theme switch instant.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Work rows | diff lines stack under the title | same | title left, diffs right | same |
| H1 | 30 px | 48 px | 64 px | 52 px |

### Acceptance
**First viewport:** at 1440 × 900 an off-white (or near-black in dark mode) page; a green availability dot and line, a confident one-sentence headline, two text links. Below, case studies with red and green before/after numbers like a code diff. At 390 × 844 the same, with diffs stacked.
**Do not:** publish numbers he did not measure (each diff names its tool); use a terminal-typing gimmick; store the theme without try/catch; flash the wrong theme on load (set it in an inline head script).
