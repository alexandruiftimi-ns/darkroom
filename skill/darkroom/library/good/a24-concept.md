---
slug: a24-concept
verdict: good
verdict_source: Awwwards Site of the Day + Developer Award, Oct 2026 (unofficial concept)
confidence: medium
category: events-culture
packs: [editorial-news, cinematic]
techniques: [webgl-scene, document-format]
url: https://a24.raviklaassens.com/
evidence: design review
added: 2026-10-27
updated: 2026-10-27
---

# A24 (concept by Ravi Klaassens) — good

**Thesis in one line:** A film studio library dressed in the industry's own paperwork: a credits table, press quotes with stars and the studio mark.

**First frame:** warm grain paper; top-left a film title in a light serif with a ruled credits table (Directed by, Year, Starring); bottom-centre the A24 mark overlapping two five-star press quotes.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Ppneuemontreal · Ppeiko · Ppmuseum |
| Type scale | 4 sizes · largest 30 px |
| Colour mode / shares | ground 68.2 % · saturated UI 8.9 % · hues 60°, 30° |
| Words (page / heaviest section) | 28 / 25 |
| Text zones, first viewport | desktop 2 · mobile 2 |
| Signature motion | libraries: gsap, scrollTrigger, three, lenis, webglCanvas · video 0 · canvas 1 |
| Page weight | ≥ 746 KB (lower bound) |
| Source of values | observed |

## What works & why

- **The layout is a credits block and a press-quote strip** → borrow the subject's document format (INDEX.md, By technique) → rule: for culture brands, use the industry's own document (credits, programme, ticket, spec sheet) as the UI.
- **Three fonts, each with one job: serif titles, grotesk data, spaced caps labels** → typography.md three-family budget → rule: give each family a role you can name.
- **Grain paper ground instead of white** → material (looks.md) → rule: a subtle paper texture moves a page from "app" to "print object".

## What fails & why

_Only issues that cost visitors something (severity in brackets). Minor polish is left out on purpose._

- **Keyboard can't reach the menu** (medium) → keyboard check → rule: every control in the HTML must be focusable even if the scene is WebGL.

## Transferable rules

- Do: use the industry's own paperwork as the layout.
- Don't: hide navigation from the keyboard.

## Never copy

Logo, imagery, characters, footage, exact layout and copy text. Learn the principle only.
