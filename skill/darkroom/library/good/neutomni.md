---
slug: neutomni
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: medium
category: agency
packs: [bold, modern]
url: https://neutomni.com/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Neutomni — good

**Thesis in one line:** a small Webflow studio made memorable by one red, one wordmark and physical metaphors (road, receipt, drag-me diamond).

**First frame:** red stencil-cut wordmark spans the full 1440 px across the top quarter; sub-label, nav and italic email in one line under it; 3-line claim at ~50 % x / 52 % y with the last line in italic serif; a dark grid of client sites rises from the bottom; local time bottom-left, OPEN FOR WORK bottom-right. Eye: wordmark → claim → work grid.

## Signals

| Signal | Value |
|---|---|
| Font families | 4 measured — Vazirmatn (sans text), an italic display serif (accent words), Fira Code (mono labels), Editorial New |
| Type scale | 118 px "Selected Work" · 52–64 px claims · 15–16 px body · 11 sizes measured |
| Colour mode / shares | expressive-disciplined — white ground 86 %, one crimson (hue 0°) as text and full fields; a sky-blue field for pricing only |
| Words (page / heaviest section) | 586 / 207 (pricing) |
| Text zones, first viewport | desktop 7 · mobile 4 · 4 corners used |
| Layout system | full-width wordmark band; claims start at the 50 % column; process = 4 equal columns; work = split list + sticky image |
| Signature motion | process columns rise like a road A→B with a polygon rolling over them; pricing receipts tilt; draggable diamond CTA · libraries: gsap + ScrollTrigger + lenis |
| Page weight | 5 KB measured (Webflow lazy assets not counted — treat as unknown) |
| Mobile | re-composed — wordmark still full width, claim left, receipts one per screen; process columns become a horizontal track cropped at the edges |
| Source of values | observed |

## What works & why

- **Wordmark as the hero image, and as the footer** — the mark fills the width at the top and returns white-on-red at the end → principle: one focal point per viewport (reading-paths.md rule 7); end on the brand mark at display scale (terreno-hotel) → rule: a strong wordmark can be the hero image if it owns the whole width; close the page with it.
- **One red, used as a field** — process columns and footer are solid crimson, text white; no second UI hue on most screens → principle: expressive mode, one dominant per viewport (color.md) → rule: give the brand colour whole surfaces instead of tinting every button.
- **Process as a rising road** — four columns step up from A to B with a dashed horizon and one rolling polygon → principle: a single motion that explains the claim (attention.md cadence) → rule: animate a process with one metaphor that literally shows progress, not numbered steps fading in.
- **Pricing as receipts** — "price starts at" with the number right-aligned and a barcode → principle: concrete fact over adjectives (attention.md "how to cut copy") → rule: show starting prices; a physical metaphor makes the table memorable without hiding numbers.

## What fails & why

- **Italic serif accent word in nearly every heading** ("as much as we do", "Iterations", "Work") → principle: tells.md serif italic accent word; one emphasis device (typography.md) → rule: use the accent once, on the hero, or not at all.
- **Seven zones, all four corners in the first frame** — clock, status dot, email, nav, sub-label, claim, work grid → principle: ≤ 3 zones, corners for chrome (reading-paths.md rules 2, 5) → rule: move time/status chips to the footer.
- **Sky-blue pricing field** — the only off-system hue, with white cards and red text → principle: one accent family in a disciplined system (color.md) → rule: if one section changes field colour, derive it from the brand hue.

## Transferable rules

- Do: let one brand colour own whole fields and the closing wordmark.
- Do: express process and pricing with one physical metaphor each, keeping real numbers visible.
- Don't: italicise one word in every heading; don't fill hero corners with status chips.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** 4 families and 11 sizes are well over budget yet the page reads as one voice because the colour is so disciplined — confidence medium.
