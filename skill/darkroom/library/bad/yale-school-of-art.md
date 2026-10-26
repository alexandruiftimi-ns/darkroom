---
slug: yale-school-of-art
verdict: bad
verdict_source: colorlib
confidence: medium
category: corporate
packs: [art-gallery, artsy]
url: https://www.art.yale.edu/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Yale School of Art — bad

**Thesis in one line:** A well-set reading column for a prestigious school, crowded by a widget rail and floating chrome that sits on top of the text.

**First frame:** red "Menu" top-left; small tracked serif caps "YALE SCHOOL OF ART" centred at ~50 % / 20 %; a 9-line serif paragraph at ~30 % x / 48 % y with "Previous · 1 of 3 · Next" under it; on the right a red-headed calendar, a weather box, an academic notice and a blue "a look back" story with a photo. Five zones; the eye is pulled right by red and blue before it reads.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Yale New (serif: wordmark, body), Univers (menu, widgets) |
| Type scale | 24 px largest · 18 px body · 2 sizes |
| Colour mode / shares | monochrome intent — white ground 67 % · red (menu, calendar head, date badge) + blue links/widgets |
| Words (page / heaviest section) | 1,090 / 1,089 (single page body) |
| Text zones, first viewport | desktop 5 · mobile 7 · travel 1.52 (mobile zig-zag 2.21) |
| Layout system | centred 640 px text column + fixed right widget rail; sticky wordmark |
| Signature motion | marquee ticker (mobile), slideshow · libraries: WebGL canvas detected |
| Page weight | 514 KB |
| Mobile | squeezed — one column, but Menu, a "30" badge and a docked marquee cover body text |
| Source of values | observed |

## What works & why

- **Reading column** — serif at 18 px, ~70ch measure, generous leading → principle: typography.md (body 16–20 px, 45–75ch) → rule: an institution's prose deserves one calm column set like a book.

## What fails & why

- **Widget rail beside the lead** — calendar grid, weather, academic notice and a story card stacked right, in red and blue → principle: ≤ 3 zones; corners are for chrome (reading-paths.md rules 2, 5) → rule: utility widgets live behind navigation or below the lead, not as a second column of loud boxes.
- **Floating chrome over content** — the sticky wordmark rides over the photo (p075 desktop); on mobile, Menu, the "30" badge and a bottom marquee overlap paragraphs at every scroll point → principle: one focal point; text over the subject is a defect (reading-paths.md rule 7) → rule: sticky elements reserve their own band; content never scrolls under opaque chrome.
- **Ticker on mobile** — a horizontally scrolling marquee pinned bottom → principle: tells.md "meaningless infinite loops"; WCAG 2.2.2 pause/stop → rule: no auto-moving text without a pause control.
- **No headline, 2 sizes** — wordmark at small caps, then body; 0 h1, 16 images without alt → principle: attention.md (headline states the offer), WCAG 1.3.1/1.1.1 → rule: the page needs one h1 and a visible scale step between wordmark, heading and body.
- **Colorlib's reason** — "painful navigation" → principle: reading-paths.md rule 6 → rule: a school's top tasks (programs, apply, events) are visible links, not hidden behind a single "Menu".

## Transferable rules

- Do: keep the reading column; give sticky chrome its own band.
- Don't: run a widget rail or marquee beside reading text.
- **The one change that would fix most of it:** move calendar/weather into the menu and add an h1 + three program links above the paragraph.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** colorlib describes the older wiki-style site (backgrounds, odd formatting); the seen site is a later redesign that is calmer. Verdict recorded bad per user rule; confidence medium because the evidence differs from what colorlib judged, and the rail/marquee may be a deliberate art-school stance.
