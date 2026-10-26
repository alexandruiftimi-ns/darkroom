---
slug: santioni-spirits
verdict: good
verdict_source: Awwwards SOTD + Developer Award + Business & Services Honors
confidence: medium
category: food-drink
packs: [artsy, cinematic]
url: https://santionispirits.com/
evidence: images (12 re-shot after age gate; original 10 study shots blank, study.json empty)
added: 2026-10-25
updated: 2026-10-25
---

# Santioni Spirits — good

**Thesis in one line:** a spirits brand told as a hand-inked graphic novel — a hooded saint's pilgrimage instead of bottle beauty shots.

**First frame:** after a full-screen age gate (giant Art-Nouveau caps "ARE YOU OF / LEGAL AGE?", YES/NO boxes either side of a small saint emblem), a tilted, hand-drawn comic panel fills ~90 % of the viewport; a cropped "EXPERIENCE" title bleeds off its top; logo top-left, a boxed EXPERIENCE / COLLECTION toggle top-right. The eye goes panel → falling figure → first caption box.

## Signals

| Signal | Value |
|---|---|
| Font families | ~3 seen — Art-Nouveau display caps (gate, chapter titles) · heavy extended grotesk (nav/buttons) · condensed caps grotesk (captions); script logo is artwork |
| Type scale | ~120 px gate caps · ~16 px nav · ~13–14 px caption caps (estimated) |
| Colour mode / shares | disciplined — paper off-white + ink black dominant, ochre as the illustration's one fill, red only for 2–3 keywords per caption |
| Words (page / heaviest section) | unknown / ~25 per caption box (estimated) |
| Text zones, first viewport | desktop 2 (+ cookie box) · mobile 2 |
| Layout system | scroll-driven comic: tilted ink-bordered panels, inset close-up panels, rectangular caption boxes alternating left/right of the figure |
| Signature motion | scroll-scrubbed panels that zoom/pan and reveal captions; custom vertical scrollbar stroke · libraries: not measured |
| Page weight | not measured |
| Mobile | re-composed — panels go full-height, captions stack full width, same story |
| Source of values | estimated from images |

## What works & why

- **The story is the product shot** — a saint's pilgrimage in panels builds ritual and myth before any bottle → principle: thesis-first first frame (attention.md cadence: a new image every beat) → rule: for heritage goods, sell the origin myth in pictures; save the product for the payoff.
- **Ink + paper + one ochre fill, red only on keywords** → principle: one accent at ≤ 10 % (color.md) → rule: in an illustrated world, restrict colour to one fill plus one emphasis hue used on words, not shapes.
- **Caption boxes alternate left/right of the figure, never over the face** → principle: text and focal point don't compete (reading-paths.md rule 7) → rule: place captions in the negative space the drawing leaves, on a solid ground.
- **Age gate designed in the brand voice** → principle: compliance as part of the experience → rule: mandatory gates can be on-brand, full-screen and two-button simple.

## What fails & why

- **Scroll-jacked document (844 px tall) and a dark empty first paint for automated capture** → principle: real content and semantics (tells.md "Function"), first frame must sell → rule: keep native scroll height and server-render a poster panel so crawlers and slow devices see the story.
- **Cookie box overlaps the bottom-right panel on every frame; analytics load before consent (audit)** → principle: chrome must not cover content (reading-paths.md rule 5); consent-gate trackers → rule: small consent banner off the focal panel, trackers only after accept.
- **All-caps captions at ~13 px** → principle: body text legibility (typography.md) → rule: caps captions need ≥ 16 px and generous tracking, or sentence case.

## Transferable rules

- Do: tell a brand myth in panels and keep colour to ink, paper, one fill, one keyword hue.
- Do: put captions in boxes in the drawing's negative space.
- Don't: hijack scroll so the page has no real length.

## Never copy

Logo, illustrations, saint character, exact layout, copy text. Learn the principle only.

**Open question:** only the first third of the story was captured (scroll-jacked); collection/product pages unseen, so confidence medium.
