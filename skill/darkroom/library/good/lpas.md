---
slug: lpas
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: high
category: architecture
packs: [modern, trust]
url: https://lpas.com/
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# LPAS Architecture + Design — good

**Thesis in one line:** a regional practice that sells its sectors calmly — real buildings, one sentence each, one muted colour per sector.

**First frame:** darkened interior video full-bleed; two small labels at ~50 % y; a 3-line sentence bottom-left (x 3 %, y 70–92 %); a "scroll to explore" circle mid-right; the next panel (building + dark field) peeks in at the right 14 %. Eye: sentence → peeking panel → scroll cue.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — Aeonik (all roles); mobile shots look like a fallback sans (estimated) |
| Type scale | 75 px hero/sector names · 28–38 px section heads · 14–16 px body (7 sizes) |
| Colour mode / shares | disciplined — white/near-black grounds 99.8 %; sector panels carry muted fields (rust, sage, peach, slate) with UI hue 30° only |
| Words (page / heaviest section) | 651 / 399 (news list) |
| Text zones, first viewport | desktop 1 measured (3 visible) · mobile 2 |
| Layout system | left gutter 50 px constant; horizontal sector track (photo over colour field); 3-column project grid with captions; ruled news rows |
| Signature motion | horizontal sector accordion driven by vertical scroll, next panel always peeking · libraries: lenis |
| Page weight | 5,416 KB (hero video + photography) |
| Mobile | re-composed — sectors stack as half-width panels with a thumbnail, projects one per row, news and footer one column |
| Source of values | measured (study.json) |

## What works & why

- **One plain sentence on the video** — what they are, in 10 words, bottom-left where the image is calm → principle: headline budget and one focal point (attention.md; reading-paths.md rule 7) → rule: a service firm's hero states what it is in one sentence and sits in the image's quiet corner.
- **Sector = photo + colour field + name + counter** — rust Interiors, sage Architecture, peach Commercial; "2/5" under each name → principle: colour-field change as cadence (attention.md) with one dominant per viewport (color.md expressive rules applied inside a disciplined page) → rule: give each service line its own muted field and a position counter so the series reads as a set.
- **Next panel peeks from the right** → principle: cadence hook (attention.md) and continuity → rule: in a horizontal track, always show a slice of the next item so the gesture is self-explaining.
- **Captions under every project** — name + city, same alignment, 3-column grid with one large feature → principle: related items with labels in fixed positions (reading-paths.md rule 4) → rule: every portfolio image gets a caption under it in the same place.
- **One family, one gutter** — Aeonik everywhere, copy always at the 50 px gutter → principle: copy anchor (reading-paths.md rule 1); 2-family budget (typography.md) → rule: a single well-chosen grotesk is enough when photography carries the character.

## What fails & why

- **Menu chip floats over everything** — dark pill top-right sits on photos, headings and news rows without a ground → principle: corners are for chrome but chrome needs its own surface (reading-paths.md rule 5) → rule: a fixed control needs a backing that holds contrast on any content beneath.
- **Vimeo loads before consent** (audit) → principle: consent-gate third-party embeds (compliance) → rule: self-host the hero video or gate the player.

## Transferable rules

- Do: one sentence, bottom-left, on the calmest part of the hero image.
- Do: one muted colour field per service line, with a counter.
- Don't: float fixed controls without their own ground.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.
