---
slug: tengile-malamala
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: high
category: hospitality
packs: [nature, luxury]
url: https://tengilemalamala.com/
evidence: live study (study.json + 10 shots, mostly preloader) + 16 re-shots after load
added: 2026-10-25
updated: 2026-10-25
---

# Tengile MalaMala Collection — good

**Thesis in one line:** a safari collection sold through people and animals first, lodges second — high-contrast serif caps over warm ranger footage on an olive-and-bone palette.

**First frame:** after an olive preloader with monogram, full-bleed video of a ranger (desktop) / elephant (mobile); two-line thin serif caps headline staggered (line 1 at ~10 % x, line 2 indented to ~40 % x, 30–50 % y); 3-line serif deck + boxed "Explore Collection →" at ~50 % x, 66–76 % y; ENQUIRE / wordmark / MENU across the top. The eye goes face → headline → deck → button down a diagonal.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — PP Fragment (display serif: headlines, quotes, lodge names, decks) · Inter (labels, body, buttons) |
| Type scale | 120 px hero caps · 40–48 px statements · 32 px quote · body 16–18 px · 8 sizes |
| Colour mode / shares | disciplined — bone ground, olive green (#5c6e22-ish) as the single brand hue for preloader, footer and quote ink; photography carries the rest |
| Words (page / heaviest section) | 691 / 60 (Camps) |
| Text zones, first viewport | desktop 3 · mobile 3 · travel 0.95 |
| Layout system | 16 px gutters, 2-col split (labels at left edge, statements start at 50 %); 3-up lodge grid with serif names under; staggered animal photo pairs; scattered thumbnail constellation around a centred conservation title |
| Signature motion | headline letters rise out of a mask on load; constellation of photos drifting around the conservation heading · libraries: none detected |
| Page weight | 491 KB (measured at capture; video streamed) |
| Mobile | re-composed — hero swaps to an elephant crop, lodges stack one per screen with labels, constellation keeps the centred title |
| Source of values | measured (study.json) + re-shots |

## What works & why

- **Staggered serif caps headline with the deck + CTA directly below on the same diagonal** → principle: CTA on the path (reading-paths.md rule 6), ≤ 3 zones (rule 2) → rule: let the headline's second line indent toward where the deck starts, so the eye slides into the button.
- **Label at the left gutter, statement from 50 %** — repeated for Accommodation, Our Story, Plan a Trip → principle: one copy anchor (rule 1) → rule: a two-column "label / statement" split is a complete editorial system for hospitality.
- **Lodges in one 3-up row, same crop, serif name under each, one "8 Suites" chip** → principle: related items in one row with labels (rule 4) → rule: comparable properties share one grid and one label position; facts go in a small chip, not paragraphs.
- **Olive used only for preloader, quote ink and footer field** → principle: one accent family (color.md) → rule: take one hue from the landscape and use it as the brand field; keep the UI otherwise bone + ink.
- **Mobile hero recropped to a different subject (elephant)** → principle: mobile re-composition (reading-paths.md rule 8) → rule: choose a portrait-safe hero for phones rather than squeezing the desktop crop.

## What fails & why

- **Olive preloader blocks every first paint; first audit shots were blank** → principle: first frame must sell → rule: show the hero poster immediately; preloaders are a cost.
- **White statement over a bright sky/river photo (Plan a Trip)**, hero caps measured ~1:1 on light frames → principle: contrast ≥ 3:1 for large text (color.md) → rule: place copy on the image's shadow or add a local gradient.
- **Cookie panel pinned bottom-left across all views** → principle: chrome off content (rule 5) → rule: consent UI should be dismissable and small, never covering statements.

## Transferable rules

- Do: label-left / statement-at-50 % editorial split; one landscape hue as brand field.
- Do: staggered display headline that points into deck + CTA.
- Don't: hide a fast page behind a preloader.

## Never copy

Logo, monogram, photography, exact layout, copy text. Learn the principle only.
