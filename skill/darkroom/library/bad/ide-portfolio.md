---
slug: ide-portfolio
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: portfolio
packs: [modern, bold]
techniques: [borrowed-ui]
url: https://arnofrxdd.github.io/ide-portfolio/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# IDE portfolio (Arnav) — bad

**Thesis in one line:** A full-stack developer's portfolio dressed as a code editor: file tree, tabs, a typed greeting and a contribution grid.
**Split:** design bad · build mixed · technique mixed — a costume that buries the work in five panels of chrome.

**First frame:** a dark editor window filling the screen; file explorer left (x 3–20 %), a "PORTFOLIO MANIFEST" panel with skill bars right (x 82–100 %); centre: a mono comment line, a large "Hello, I'm Arnav" with the name in blue, key–value lines in syntax colours, three project cards, a blue button and a contribution grid. The eye doesn't know which panel to read first.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — JetBrains Mono, plus the system sans for the h1 |
| Type scale | largest 60 px · body 13–14 px · 8 sizes |
| Colour mode / shares | dark — ground 55 % · four syntax hue families (blue, yellow, green, teal) |
| Words (page / heaviest section) | 242 / 90 |
| Text zones, first viewport | desktop 5 · mobile 5 |
| Layout system | a copy of an editor's panels; content in the centre "file" |
| Signature motion | typed cursor, blinking status dots · libraries: none detected · canvas 1 |
| Page weight | ≥ 153 KB (lower bound) |
| Mobile | re-composed — side panels collapse, the greeting and cards stack |
| Source of values | observed (first screen only) |

## What works & why

- **Very light and honest** (153 KB, real project names, a real contribution history) → principle: performance budget → rule: a developer portfolio can be fast and specific.

## What fails & why

- **Five text zones in the first frame** (high) — explorer, tabs, centre file, manifest and status bar all compete → reading-zones budget → rule: one reading column; borrowed chrome stays at the edges and stays quiet.
- **Costume instead of a design** (medium) — the editor look is the whole idea and says "developer" without saying what kind of work → tells.md "the device must come from the subject" → rule: borrow one detail from the tool (a mono label, a syntax colour), not the whole interface.
- **Small dim mono text** (medium) — 11–13 px grey labels on dark grey → contrast and typography.md → rule: body copy at 16 px in a text face, even on a dark theme.
- **Skill bars with percentages** (medium) → tells.md (unsourced numbers) → rule: list skills through projects, not self-scored bars.

## Transferable rules

- Do: keep the portfolio light and the projects concrete.
- Don't: dress the whole page as another app.

## Never copy

Name, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis called it mixed ("fun for developers"); the owner marked it bad. Agreed on the zone overload; only the first screen was reviewed.
