---
slug: life-action-revival
verdict: bad
verdict_source: colorlib
confidence: medium
category: experimental
packs: [artsy]
url: http://lifeactionrevival.org/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Life Action Revival — bad

**Thesis in one line:** A collage of overlapping boxes, raw RTF code and stray ads; no visitor can tell whose page it is. Colorlib: it "shouldn't exist in this day and age".

**First frame:** a line of raw `\rtf1…` markup across the top (0–100 %, 2 %), a bevelled black box with a doodle (~10 %, 15 %), a flaming triangle (~60 %, 15 %), a clipped marquee title in a white box, a pale-yellow link list (left, 30–90 %), an "Advertising Section" column (right) and a browser context-menu screenshot in the middle. No focal point.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 CSS (Times New Roman, Arial) + Helvetica/Impact-style text baked into screenshots and ads |
| Type scale | 35 px largest · 14–16 px links · 4 sizes |
| Colour mode / shares | expressive by accident — grey ground 43 %; pale yellow (60°) link panel, browser-blue links, ad colours |
| Words (page / heaviest section) | 164 / 126 (budget 30) |
| Text zones, first viewport | measured 1 (one container) · by eye 8+ overlapping clusters |
| Layout system | absolutely positioned overlapping boxes; page does not scroll (p000–p100 identical) |
| Signature motion | scrolling marquee title in a box · libraries: none detected |
| Page weight | 775 KB |
| Mobile | broken — page 390 px wider than viewport; desktop collage cropped |
| Source of values | observed + images |

## What works & why

(nothing transferable)

## What fails & why

- **Raw RTF control code printed as text** — two bands of `\pard\tx720…` markup across the page → principle: tells.md (leftover placeholders = nobody read the page) → rule: render-check every pasted block; source formatting never reaches the screen.
- **No identity, no h1** — the biggest type is a marquee clipped to "AST" / "THUSIAST"; the visitor can't tell the organisation or purpose (colorlib's main charge) → principle: attention.md (first frame states who and what) → rule: name the organisation in live text, top-left, before anything else.
- **Overlapping boxes, screenshots and ads with no focal point** — doodle, triangle, pie chart "100 % Other", context-menu screenshot, broken-image icons and four unrelated ads all compete → principle: reading-paths.md rules 2 and 7 (≤ 3 zones, one focal point) → rule: one element leads each viewport; everything else waits in order.
- **Moving marquee title** — text scrolls continuously inside its box → principle: WCAG 2.2.2 Pause, Stop, Hide; motion with no purpose (tells.md Motion) → rule: headings never move on their own.
- **Mobile overflow and missing basics** — 390 px horizontal overflow; 21 images without alt, 2 unlabelled inputs, no `lang`, 11 console errors → principle: WCAG 1.4.10, 1.1.1, 1.3.1, 3.1.1 (compliance.md) → rule: a page that can't reflow or describe its images isn't publishable.

## Transferable rules

- Don't: layer positioned boxes over each other as a layout system.
- Don't: ship pasted content without looking at the rendered page.
- Do: one identity line, one focal point, one column on phones.
- **The one change that would fix most of it:** strip to the yellow link list as a single column under a live-text name.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** the URL now serves a personal/net-art collage ("Universal Research Group"), not the revival ministry colorlib reviewed; the collage may be deliberate art. Recorded bad per the colorlib rule; verify the domain before citing it as a ministry example.
