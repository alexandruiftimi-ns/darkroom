---
slug: capitals-elen
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: app-marketing
packs: [cinematic, family]
techniques: [place-dive, pinned-chapters, chapter-colour]
url: https://capitals.elen.red/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Capitals Trainer — good

**Thesis in one line:** A geography quiz app sold as a flight around the globe: each scroll chapter dives onto one capital's landmarks.
**Split:** design good · build good · technique good — one clear idea, light page, chapters read without the motion.

**First frame:** the curve of the Earth under a violet sky with Paris built up as a model city in the centre; a dark glass card bottom-left (x 5–40 %, y 56–96 %) holds the h1, one sentence and the App Store badge. The eye lands on the Eiffel Tower, then drops to the card.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — system rounded sans (display and text) |
| Type scale | largest 51 px · body 18 px · 5 sizes |
| Colour mode / shares | disciplined UI — ground 47.9 % · saturated 16 % · one blue-violet family; the imagery carries the colour |
| Words (page / heaviest section) | 41 / 41 |
| Text zones, first viewport | desktop 4 · mobile 3 |
| Layout system | full-bleed scene per chapter, copy card always bottom-left, chapter dots on the right edge |
| Signature motion | crossfading dives from orbit to a landmark per chapter (Paris → Giza → Dubai → Washington → an invented spire) · libraries: none detected · video 0 · canvas 0 |
| Page weight | ≥ 389 KB (lower bound) |
| Mobile | re-composed — card drops to the lower half, each landmark re-cropped to stay visible above it |
| Source of values | observed |

## What works & why

- **One landmark city per chapter** — the subject (capitals) is literally the scenery, so every scroll step teaches what the app teaches → principle: the motion must come from the subject (SKILL laws) → rule: let the product's own content be the set, one example per chapter.
- **The copy card never moves** — same corner, same size, only its words change → principle: a fixed reading anchor under changing imagery (pinned-chapters) → rule: when the scene changes every chapter, keep the text in one place.
- **Header button changes colour with each continent** (blue, orange, teal, violet, green) → principle: chapter colour with a job (colour.md) → rule: tie an accent to a named thing in the content, not to decoration.
- **41 words, one font, under half a megabyte** → principle: a rendered world doesn't need a heavy page → rule: stills crossfaded by scroll can feel cinematic without video or WebGL.
- **A real quiz card sits inside one chapter** → principle: show the product working (product-in-scene) → rule: put one real UI moment inside the story.

## What fails & why

- **Four text zones in the first frame** (medium): logo, App Store button, language menu, feedback pill and the card all compete with the hero → reading-zones budget → rule: one floating widget at most over a scene; the feedback pill can wait until the end.
- **Glossy rendered-diorama look** (medium) reads as stock generated art; it works here because the idea is specific, but the same palette on a vaguer idea would read as slop → tells.md (generated imagery) → rule: generated scenery needs a subject-specific idea to carry it.

## Transferable rules

- Do: one place or object per chapter, drawn from the product's own content.
- Do: pin the copy card in one corner while the scene changes behind it.
- Don't: stack chat or feedback widgets over a cinematic first frame.

## Never copy

Logo, imagery, landmark renders, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis called it "mixed, pretty not designed" because of the stock-glossy look; the owner marked it good. Following the owner: the idea and the build outweigh the generic render style.
