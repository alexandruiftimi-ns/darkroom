---
slug: tag-team-signs
verdict: bad
verdict_source: colorlib
confidence: high
category: corporate
packs: [bold, trust]
url: https://www.tagteamsigns.com/
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# Tag Team Signs — bad

**Thesis in one line:** A sign company that shows four words on red instead of a single sign it built.

**First frame:** red header bar with a two-tone wordmark (~33 % x, 7 % y) and nav top-right; a flat red field with "SIGNS / DESIGN / BUILD / INSTALL" stacked at ~150 px, left-aligned at ~20 % x; a chat bubble bottom-right. The eye reads the four words and finds nothing to look at.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 web (Raleway, Raleway SemiBold, Helvetica W01 Bold) + Georgia in form placeholders |
| Type scale | 149 px largest · 80 px section heads · body 16–17 px · 6 sizes |
| Colour mode / shares | expressive by default — saturated red ~84 % of UI pixels, slate grey, black, white |
| Words (page / heaviest section) | 281 / 90 (mission) |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | Wix fixed-width column at ~18 % x; alternating red / slate / photo bands; 3-up photo grid |
| Signature motion | none · libraries: none detected (Wix runtime) |
| Page weight | 1,380 KB |
| Mobile | broken — page 590 px wider than viewport; headings and body cut mid-word |
| Source of values | measured (study.json) |

## What works & why

- **Portfolio grid of real storefronts** — six full-bleed photos of installed signs → principle: real pictures over decoration (tells.md "Why removal isn't enough") → rule: a trade business's strongest proof is a grid of its own installed work.

## What fails & why

- **Type-only hero for a visual product** — four stacked verbs on flat red, no sign, no place → principle: one focal point per viewport; headline states the offer (reading-paths.md rule 7, attention.md) → rule: if you make physical things, the first frame shows one finished piece, with the claim beside it.
- **Mobile not responsive** — fixed desktop canvas overflows 590 px; every heading truncates → principle: WCAG 1.4.10 reflow; reading-paths.md rule 8 → rule: test at 390 px before anything else; no fixed-width canvases.
- **Red as ground, accent and text** — headings, bullets and body copy all sit on or are set in the same saturated red; audit lists 29 contrast failures → principle: expressive mode still needs a neutral to rest the eye and passing text contrast (color.md) → rule: one saturated field per viewport, text in ink or white only.
- **Decorative word-per-line headings** ("WHO / WE ARE", "OUR / WORK") with a bar above each, plus 0 h1 → principle: tells.md (all-caps headings as voice; same block repeated) → rule: headings are sentences or labels, not typographic stacks repeated in every section.
- **Colorlib's reason** — nothing shows "the slightest sign of professionalism" → principle: tone must match the brand (typography.md) → rule: trade sites earn trust with licence numbers, real jobs and a phone number up top, not with poster type.

## Transferable rules

- Do: lead with a photo of finished work; put licence/phone in the first frame.
- Do: keep one saturated field per viewport and a neutral between.
- Don't: ship a fixed-width page builder layout to phones.
- **The one change that would fix most of it:** replace the red word stack with the best storefront photo and a one-line claim + phone CTA.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.
