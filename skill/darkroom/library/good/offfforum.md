---
slug: offfforum
verdict: good
verdict_source: Awwwards SOTD 2026-10-16
confidence: high
category: events-culture
packs: [bold, cinematic]
url: https://www.offforum.com/
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# OFFF Forum — good

**Thesis in one line:** a design festival announced with one video, one sentence, one ticket.

**First frame:** full-bleed stage video (speaker, raised hand); wordmark top-left spanning ~half the width; ruled date table under it; centred caps headline at x 50 %, y 82 % with the ticket pill beneath. Eye: logo → hand → headline → pill.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Forvm (flared serif: headline, nav, links), Baikal (grotesk: date table, newsletter) |
| Type scale | ~45 px display (wordmark larger, as art) · 14 px body · 6 sizes |
| Colour mode / shares | mono — white on video, black on white footer; UI ground 38.6 % (video dominates), no UI hue |
| Words (page / heaviest section) | 111 / ~17 (hero sentence) |
| Text zones, first viewport | desktop 2 (+ cookie banner) · mobile 2 |
| Layout system | one 100 vh video section + white footer; copy centred low; data table top-left |
| Signature motion | background video loop · libraries: lenis |
| Page weight | 994 KB (video streamed via Mux, not counted) |
| Mobile | re-composed — same stack, headline rewraps to 5 lines; cookie banner covers ~35 % |
| Source of values | measured (study.json) |

## What works & why

- **One-screen announcement** — video, sentence, button, footer; 111 words → principle: pages ≤ ~110 words get read (attention.md) → rule: for a date-and-ticket page, say what/when/where once and stop.
- **Fonts from the logo** — the mark's flared serif half drives headline + links, its grotesk half drives data → principle: tone must match the brand (typography.md) → rule: when a mark has two voices, assign each one a role and add nothing.
- **Ruled date table** — event · date · venue in a hairline 2×3 grid top-left → principle: related items in one block (reading-paths.md rule 4) → rule: put logistics in a small table, not in prose.
- **Single filled CTA under the claim** — the white ticket pill is the only solid control → principle: CTA on the path (reading-paths.md rule 6) → rule: one filled button per viewport, directly below its sentence.
- **Wordmark footer** — black logo cropped by the viewport on white → principle: cadence via colour-field change (attention.md) → rule: end on a hard ground switch and the mark at poster scale.

## What fails & why

- **Caps sentence as headline** — 17 words, 4 centred lines, tagline + dates + venue joined by interpuncts → principle: full-sentence display over 3+ lines (tells.md), headline ≤ 8 words (attention.md) → rule: split claim (display) from logistics (table).
- **Type over the subject** — headline overlays the speaker's body/hand → principle: one focal point; text off the subject (reading-paths.md rule 7) → rule: frame or crop video so copy sits in its dead space.
- **Consent + a11y** — banner covers ~35 % of mobile, GTM/GA before consent, 3 images without alt → rule: compact banner, consent-gate analytics.

## Transferable rules

- Do: let a two-part logo dictate the two type roles.
- Do: hold logistics in a ruled table next to the mark.
- Don't: set the full announcement sentence at display size in caps.
- Don't: lay headlines over a video's moving subject.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.
