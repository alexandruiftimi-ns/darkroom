---
slug: heron-ai
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: low
category: saas
packs: [modern]
url: https://heronaiapp.com/
evidence: live study (study.json + 10 shots; all 10 show the hero — scroll did not advance)
added: 2026-10-25
updated: 2026-10-25
---

# Heron AI — good

**Thesis in one line:** an AI agent for architects sold on an architect's drawing sheet — the hero is an elevation with the problems already marked.

**First frame:** warm off-white sheet framed by ruler ticks and crosshair corners; stippled concrete-house elevation centred (~50 % x / 45 % y) with two small orange squares on the facade; ruled title block across the bottom: heavy grotesk caps headline left, two-line explanation middle, DISCOVER MORE cell right. Eye: drawing → orange marks → headline.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — BT Grotesk (headline, body), Geist Mono (nav, labels, ticker) |
| Type scale | ~47 px headline · 13–16 px body · 10–12 px mono labels · 10 sizes measured |
| Colour mode / shares | disciplined — paper ground 77 %, near-black ink, one orange-red accent (~0.5 % of UI) on markers, contact and CTA |
| Words (page / heaviest section) | 695 / 587 (feature section, not captured) |
| Text zones, first viewport | desktop 5 · mobile 2 |
| Layout system | drawing-sheet frame with ruled cells; nav as five equal title-block cells top-right; headline cell bottom-left |
| Signature motion | not observed (scroll did not advance) · libraries: gsap + ScrollTrigger |
| Page weight | 1,237 KB |
| Mobile | re-composed — drawing shrinks to the top half, headline wraps to 3 lines full width, body under it, CTA cell below; Awwwards ribbon overlaps the drawing |
| Source of values | measured (study.json) for the page; visuals only for the hero |

## What works & why

- **The picture is the product claim** — two orange markers on the facade show "issues found" before any copy is read → principle: replace adjectives with one concrete image (attention.md "how to cut copy") → rule: show the product's outcome inside the hero image instead of describing it.
- **Audience's own format as the frame** — ruler ticks, crosshairs, title-block cells read as a drawing sheet → principle: tone must match the audience (typography.md tone rule, applied to layout) → rule: borrow a document format your audience works in every day as the page's grid.
- **Title block holds the reading path** — headline left, explanation middle, CTA right, all in one ruled row → principle: CTA on the path right after the claim (reading-paths.md rule 6); related items in one line (rule 4) → rule: put claim, explanation and action in one row of cells, left to right.
- **One accent, used for meaning** — orange marks errors and the one action; everything else ink on paper → principle: disciplined mode, one accent (color.md) → rule: if the accent marks a state in the image, give it to the CTA too and nowhere else.

## What fails & why

- **Cookie bar covers the CTA cell and ticker** on both breakpoints → principle: one focal point per viewport (reading-paths.md rule 7) → rule: consent banners must not sit on the hero's action row; dock them where they cover no control.
- **Scroll did not advance in an automated capture** (all ten shots identical) → principle: findability and WCAG 2.1.1 keyboard / native scroll expectations → rule: never replace native scroll with a mechanism wheel/keyboard emulation can't drive.
- **Basics** — 31 unnamed links/buttons, 5 images without alt, trackers before consent (audit) → principle: WCAG 1.1.1, 4.1.2; compliance → rule: icon and cell links need names.

## Transferable rules

- Do: put the product's result inside the hero image.
- Do: use one ruled row for claim → explanation → action.
- Don't: let consent UI or award ribbons cover the hero's controls.

## Never copy

Logo, illustration, exact layout, copy text. Learn the principle only.

**Open question:** only the hero was captured, and the page says it is an agency concept (Bearplus), not a shipping product — confidence low; recapture with a manual scroll to judge the feature chapters.
