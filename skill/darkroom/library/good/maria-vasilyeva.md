---
slug: maria-vasilyeva
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: low
category: portfolio
packs: [artsy, art-gallery]
url: https://www.mariavasilyeva.com/
evidence: live study (study.json + 10 shots + 2 extra; only project 01 and the loader captured)
added: 2026-10-25
updated: 2026-10-25
---

# Maria Vasilyeva — good

**Thesis in one line:** an interactive designer's portfolio as an annotated sketchbook with a soundtrack — the work in a filmstrip, her voice in switchable margin notes.

**First frame:** two black rails frame a pale ruled sheet; left rail carries name and role vertically, right rail MENU, SOUND and ANNOTATIONS toggles; a stacked collage of project crops at ~15 % x / 50 % y feeds a thin filmstrip of frames running to the right edge; a hand-drawn "Scroll" oval top-centre and "More details" arrow bottom-right; footer row "01 · Phantom · View project". Eye: collage → filmstrip → handwritten notes.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 measured — a condensed serif caps (loader, rails), a typewriter mono (labels), a handwriting face (annotations) |
| Type scale | 29–37 px loader caps · 13–15 px labels (4 sizes) |
| Colour mode / shares | monochrome — off-white sheet 99 %, black rails; colour only in project media (lavender for project 01) |
| Words (page / heaviest section) | 98 / ~4 per project |
| Text zones, first viewport | desktop 16 measured (letters of rail text counted separately) · mobile 4 |
| Layout system | fixed frame: two vertical rails + 7 horizontal hairlines; collage left, filmstrip right, footer row per project |
| Signature motion | loader of five serif lines repeated as a "playlist" with letter trails; scroll swaps project collages; filmstrip of frames · libraries: WebGL canvas |
| Page weight | 3,136 KB |
| Mobile | re-composed — rails become a top bar (name, menu) and a bottom bar (toggles); collage shrinks into the ruled sheet |
| Source of values | measured (study.json); scroll behaviour inferred from near-identical shots |

## What works & why

- **Annotations as a toggle** — handwritten notes ("Scroll", "More details") can be switched off from the rail → principle: one bold choice, committed but optional (tells.md "why removal isn't enough"); typography.md (handwriting only inside artwork) → rule: if you add a personal hand-drawn layer, give it an on/off and keep the real labels typed.
- **Rails hold all chrome** — name/role left, menu and toggles right, nothing else in the margins → principle: corners and edges are for chrome (reading-paths.md rule 5) → rule: give navigation and settings a dedicated frame so the centre is only work.
- **Filmstrip as overview** — every frame of the current project in one thin row → principle: related items in one line (reading-paths.md rule 4) → rule: show the whole project at thumbnail scale in a single row beside the hero crop.
- **Loader carries the theme** — "loading the playlist" lines in serif caps match the sound toggle → principle: cadence and narrative from the first second (attention.md) → rule: if you must have a loader, make it say something on-brand and show real progress.

## What fails & why

- **98 words, no h1, project names only in a footer row** → principle: attention.md headline budget (the first frame must say who and what) → rule: even a visual portfolio needs one line naming the person, discipline and a way to contact.
- **16 unnamed controls, toggles drawn as hand-circled words** (audit) → principle: WCAG 4.1.2 name/role/value → rule: custom toggles need button semantics and an accessible state.
- **Content in all four corners** — rail texts, "Scroll" oval, "More details" arrow, toggles → principle: ≤ 3 zones (reading-paths.md rule 2) → rule: when annotations are on, cap them at one per viewport.

## Transferable rules

- Do: put all chrome in a frame (rails or bars) and keep the centre for work.
- Do: make a personal voice layer switchable.
- Don't: ship a portfolio without one sentence of who you are and an accessible name on every control.

## Never copy

Logo, artwork, photography, exact layout, copy text. Learn the principle only.

**Open question:** the capture shows only the loader and project 01 (scroll swaps projects in place), so cadence across projects is unverified — confidence low.
