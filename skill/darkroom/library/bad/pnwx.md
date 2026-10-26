---
slug: pnwx
verdict: bad
verdict_source: colorlib
confidence: high
category: e-commerce
packs: [catalog, trust]
url: http://www2.pnwx.com/
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# Pacific Northwest X-Ray — bad

**Thesis in one line:** A useful B2B catalogue buried under 1997 decoration, never saying who it is.

**First frame:** bevelled green wordmark top-centre (~50 %, 5 %); eye then hits a grey 3D arrow pointing at a search box (~70 %, 15 %), then a 2×8 list of underlined links on a tiled water texture.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 CSS (Arial) + 2 more baked into images (bevel wordmark, red script slogan) |
| Type scale | 32 px largest · 18 px links · 10 px legal · 5 sizes |
| Colour mode / shares | expressive by accident — tiled blue/teal texture as ground; green, red, yellow, black text |
| Words (page / heaviest section) | 105 / 105 |
| Text zones, first viewport | desktop 4 · mobile 2 |
| Layout system | centred table, two link columns, single viewport page |
| Signature motion | animated GIF logo · libraries: none |
| Page weight | 44 KB |
| Mobile | broken — search input 172 px off-canvas; 2 columns squeezed, labels wrap under icons |
| Source of values | measured (study.json) |

## What works & why

- **Whole task in one viewport** — search, 15 category links and three phone numbers in 105 words / 44 KB → principle: content-first utility; repeat B2B buyers need paths, not persuasion (attention.md: Do surfaces) → rule: when the audience already knows you, put search + categories + contact in the first frame and keep the page light.

## What fails & why

- **Tiled water-texture background behind all text** — links and footer lines cross light/dark bands; audit measured footer at ~1:1 over media → principle: WCAG 1.4.3 contrast; color.md "separate UI palette from media palette" → rule: never set text on a repeating pattern; text sits on a flat ground.
- **One skull thumbnail repeated 15×** beside every category → the image distinguishes nothing, so the list must be read word by word → principle: tells.md "identical icon" filler; reading-paths.md one focal point → rule: a category image must show that category, or there's no image.
- **Bevelled green wordmark + red script slogan + Arial** — three unrelated voices, two baked into GIFs without alt → principle: typography.md tone + 2-family budget; WCAG 1.1.1 / 1.4.5 images of text → rule: brand type is live text in ≤ 2 families; slogans are never script images.
- **No line says who they are or whom they serve** — first text is a search prompt; 0 h1 → principle: attention.md headline budget (≤ 8 words that state the offer); headings audit → rule: the first frame names the business and its audience in one h1 before asking for a search.
- **Mobile squeezes the desktop table** — input overflows 172 px, two link columns at 390 px, floated icons push labels into ragged wraps → principle: reading-paths.md rule 8 (mobile is one column); WCAG 1.4.10 reflow → rule: lists become one column on phones; no fixed-width form fields.
- **Missing basics** — no `lang`, unlabelled search field, 16 images without alt → principle: WCAG 3.1.1, 1.3.1, 1.1.1 (compliance.md) → rule: lang, labels and alt are day-one, not polish.

## Transferable rules

- Do: keep the utility (search, categories, phone) in the first frame — just on a flat ground.
- Do: one h1 sentence naming what you sell and to whom.
- Don't: decorate with textures, bevels or repeated clip-art; decoration that carries no information costs legibility.
- Don't: ship a two-column desktop list unchanged to a 390 px screen.
- **The one change that would fix most of it:** replace the textured ground with a flat neutral and give each of the 15 links its own product photo — legibility and scannability both recover.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.
