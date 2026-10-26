---
slug: milledollars
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: high
category: agency
packs: [cinematic, modern]
url: https://milledollars.fr/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Mille Dollars — good

**Thesis in one line:** a video-production bureau whose site is its reel — the films are the interface; type is reduced to a thin viewfinder frame.

**First frame:** intro stack of rounded 16:9 film cards on pale grey scrolls and zooms until one film fills the screen inside a hairline frame; then a viewfinder HUD: "MILLE." top-left, ".DOLLARS" top-right, one-line tagline top-centre, project index + client at left-middle, title + year at right-middle (~50 % y), tiny nav bottom-left. The eye stays on the film; text reads as a camera overlay.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — ABC Diatype (caps HUD labels, nav, titles) · Migra (condensed serif tagline); no display size at all |
| Type scale | 18 px titles · 16 px labels · 10–12 px nav/index · 4 sizes |
| Colour mode / shares | mono UI — white HUD on film, pale grey intro ground; colour comes entirely from the films (teal, amber, red) |
| Words (page / heaviest section) | 116 / 54 (intro) |
| Text zones, first viewport | desktop 1 (audit) — visually 3 HUD clusters · mobile 1 |
| Layout system | full-bleed film in a rounded inset frame with a hairline inner border; HUD pinned to the frame's edges; one project per screen |
| Signature motion | card stack → full-screen zoom into the active film; scroll swaps projects; mobile uses story-style segmented progress bars · libraries: lenis + WebGL canvas |
| Page weight | 2,949 KB (video streamed) |
| Mobile | re-composed — portrait film, wordmark top-left, nav top-right, index + title mid-left, story progress bars at the bottom |
| Source of values | observed |

## What works & why

- **Work fills the screen; text is a 16–18 px HUD on the frame edges** → principle: one focal point per viewport (reading-paths.md rule 7), corners for chrome (rule 5) → rule: when the product is film, shrink type to viewfinder labels and keep it off the centre.
- **Index · client — title · year on one horizontal line at mid-height** → principle: related items in one line (rule 4) → rule: put project metadata on a single line across the frame so it reads as a caption, not a block.
- **No UI colour; each film supplies its own palette** → principle: separate UI and media palettes (color.md) → rule: a reel site needs a colourless frame so every project can change the mood.
- **Story-style segmented progress on mobile** → principle: mobile re-composition (rule 8), cadence (attention.md) → rule: on phones, show position in a sequence with segments, not a scrollbar.
- **116 words on the whole page** → principle: word budgets (attention.md) → rule: a portfolio of moving images can be almost wordless if each item has client + title + year.

## What fails & why

- **White 10–16 px HUD over bright film frames** — measured 1.34:1 on light frames → principle: contrast ≥ 4.5:1 for small text (color.md) → rule: small overlay text needs a subtle shadow or a frame-edge scrim.
- **Intro stack shown dimmed (~60 % overlay) before the zoom** → principle: first frame must sell → rule: don't grey out the work during the intro.

## Transferable rules

- Do: work full-bleed, type as a viewfinder HUD pinned to the frame, metadata on one line.
- Don't: let tiny white labels float over unpredictable footage without a scrim.

## Never copy

Logo, films, cat doodle, exact layout, copy text. Learn the principle only.
