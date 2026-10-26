---
slug: the-big-ugly-website
verdict: bad
verdict_source: colorlib
confidence: medium
category: experimental
packs: [artsy]
url: http://thebiguglywebsite.com/
evidence: live study (study.json + 10 shots; page did not scroll, all five points identical)
added: 2026-10-25
updated: 2026-10-25
---

# The Big Ugly Website — bad

**Thesis in one line:** A joke link directory whose images have all died, leaving alt text, colour bars and five fonts on yellow.

**First frame:** a tiny "f" top-left; a 60 px system-sans title across the top; below it a broken-image frame whose alt text renders at display size ("ugly website emblem pic 1") at ~15 % x / 20 % y; to the right a stack of link labels in black, white, neon-green and purple bars. The eye bounces between alt text and labels.

## Signals

| Signal | Value |
|---|---|
| Font families | 5 — Arial, Verdana, Arial Black, Courier, Times New Roman |
| Type scale | 62 px largest · 12–20 px labels · 7 sizes |
| Colour mode / shares | expressive by accident — pale yellow ground 85 %; 4 saturated hue families (yellow, purple, green, red) |
| Words (page / heaviest section) | 525 / 308 (nav) |
| Text zones, first viewport | desktop 1 (measured) · visually ~3 (title, left list, right list) |
| Layout system | two fixed columns of link + caption pairs |
| Signature motion | none · libraries: none |
| Page weight | 1 KB HTML (images hotlinked from tinypic, all dead) |
| Mobile | broken — page 71 px wider than viewport; title and alt text overflow |
| Source of values | measured (study.json) |

## What works & why

- **Link + one-line caption pairs** — each entry is a label and a short description under it, same alignment → principle: related items in one column with labels attached (reading-paths.md rule 4) → rule: a directory works as label + one line, repeated on one axis.

## What fails & why

- **Dead hotlinked images** — every image is a broken frame showing alt text at heading size; 26 console errors → principle: tells.md "Function" (dead links, broken assets) → rule: self-host media; never hotlink from a third-party image host.
- **Five font families** → principle: 2-family budget (typography.md) → rule: one family for a utility page is enough; add a second only with a role.
- **Label bars in four colours** — black, neon green, purple, grey behind link labels; green bar holds green-grey text (~2.9:1) → principle: one accent, contrast pairs (color.md); WCAG 1.4.3 → rule: link labels share one style; colour encodes state, not mood.
- **No mobile layout** — two fixed columns overflow; colorlib: "the mobile view is nonexistent" → principle: WCAG 1.4.10, reading-paths.md rule 8 → rule: one column under 600 px.
- **Unclickable "f" icon** (colorlib) → principle: tells.md "social icons pointing nowhere" → rule: anything that looks like a control is a working control or is removed.

## Transferable rules

- Do: label + one-line description as the directory unit.
- Don't: hotlink images; don't let alt text become your visual.
- Don't: colour each link differently.
- **The one change that would fix most of it:** self-hosted images and one label style on the yellow ground.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** the site is ugly on purpose (it's the joke). Colorlib-bad is recorded as bad, no exceptions; audience-fit and a capture that never scrolled keep confidence at medium.
