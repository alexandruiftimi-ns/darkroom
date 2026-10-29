# Tern · an open-source command-line tool for data migrations
<!-- Darkroom example 065 · fictional project · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `hugo` | landing | `modern` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a landing page for our open-source CLI tool: install command you can copy, a terminal demo that types itself, three reasons to use it, and links to docs and GitHub. Hosted free. Not a generic dev-tool look please.

## Build spec

### Brief & signature
Tern runs database migrations as plain SQL files with automatic rollbacks; MIT licensed, 4,000 GitHub stars. Visitors are backend developers. Feeling: sharp, honest, a bit nerdy. **Signature:** a terminal panel where a real session replays (from a recorded `.cast`-style JSON of keystrokes and output): `tern up` runs three migrations, the third fails, and `tern` rolls back automatically, shown in red then green. It replays only when visible and has a pause button. **Supporting:** a copy-to-clipboard install line, flock-of-terns line drawing as the one illustration, warm paper instead of a dark gradient.

### Stack & files
Hugo: `layouts/index.html`, `static/session.json` (frames: `{t, text, class}`), `assets/js/term.js` (replays with real timings, respects reduced motion by showing the final transcript), `assets/js/copy.js`. Docs live on the project's docs site (link).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Familjen Grotesk | 600 | headings (chosen over the stock dev-tool grotesks) |
| Mono | JetBrains Mono | 400, 700 | terminal, install line |
| Text | Familjen Grotesk | 400 | body |

### Tokens
```css
:root { --ground: #f4f1ea; --ink: #16161a; --ink-60: #16161a99; --term: #16161a; --term-ink: #e9e6df; --ok: #5bd17f; --err: #ff6b5e; --tern: #e06c2f; --line: #16161a1a;
  --display: "Familjen Grotesk", system-ui, sans-serif; --mono: "JetBrains Mono", ui-monospace, monospace; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| session | recorded by a maintainer (NEEDS 1) | `<pre>` terminal panel, radius 12 px | — | replays in view | the final transcript | real commands and output, no secrets in paths |
| terns | drawn in code | inline SVG 1 px strokes | top-right | static | — | five terns in a loose V |

### Nav
60 px: "tern" Mono 700 18 px; Docs · Changelog · GitHub (with the live star count from the build step only, never runtime); "v2.4.0" mono 12 px chip.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Migrations that undo themselves. | Display 600, clamp(38px, 5vw, 76px) | 1.02 / −0.03em | ink | columns 1–6, top 22 vh | rise 16 px |
| Sub | Plain SQL files, applied in order, rolled back automatically when one fails. MIT licensed. | Text 400, 18 px | 1.55 | ink-60 | under H1 | delay 100 ms |
| Install | `brew install tern` · copy button | Mono 400, 15 px on `--term` with term-ink; copy button 36 px with "Copied" state | — | — | under sub, 52 px tall | delay 200 ms |
| Terminal | replay | Mono 400, 14 px/1.6 | — | term-ink, ok, err | columns 7–12 | starts in view |

### Sections
Three reasons (Plain SQL · Automatic rollback · Works in CI) with a 4-line code sample each, Install for other systems (tabs: macOS, Linux, Windows, Docker), Who uses it (only with permission, otherwise omit), footer with licence and contributors link.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Terminal replay | in view | 400 ms | recorded timings (≈ 9 s), ×1 | — | empty → transcript |
| Copy button | click | 0 | 1.5 s | — | label "Copy" → "Copied" → "Copy" |
| Reason blocks | in view | `i × 100 ms` | 600 ms | ease-out | 16 px, 0 → 0, 1 |
Reduced motion: transcript shown whole; no replay.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Terminal | under the install line, 13 px, horizontal scroll inside | under | right | right |
| Install tabs | select element | tabs | tabs | tabs |

### Acceptance
**First viewport:** at 1440 × 900 a warm paper page (not a dark gradient), a short confident headline, a copyable install line in a dark strip, and on the right a terminal that plays a real session where a migration fails and rolls back in green. At 390 × 844 headline, install line, then the terminal.
**Do not:** fake the terminal output; fetch the star count at runtime from an API; add a purple gradient or glow; list companies without permission.
