---
slug: real-ultimate-power
verdict: bad
verdict_source: colorlib
confidence: medium
category: experimental
packs: [artsy, bold]
url: https://realultimatepower.net/
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# Real Ultimate Power — bad

**Thesis in one line:** A parody fan site whose home page is a gate: one photo and a YES/no question before any content.

**First frame:** a 300 px portrait photo centred at the top (50 %, 25 %); below it a bold question at ~50 % / 51 %, an instruction line, and two underlined links YES / no. The rest of the 1440×900 viewport is black. The eye goes photo → question → links and stops.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — Arial Black (headline, instruction, links) |
| Type scale | 24 px largest · 16 px · 2 sizes |
| Colour mode / shares | mono by default — black ground 99 % · red, yellow and default link-blue underlines |
| Words (page / heaviest section) | 19 / 11 |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | single centred column, one viewport, no scroll |
| Signature motion | none · libraries: none |
| Page weight | ~0 KB reported (tiny HTML + one JPG) |
| Mobile | survives — same centred column; photo scales; headline wraps to 2 lines |
| Source of values | measured (study.json) |

## What works & why

- **One zone, one decision** — photo, question and two answers read top-down on one axis → principle: ≤ 3 zones, CTA on the path (reading-paths.md rules 2, 6) → rule: when a page must ask one thing, a single centred column with the answer directly under the question is enough.

## What fails & why

- **Splash gate** — the first click buys nothing but entry; 19 words, no description of what the site is → principle: attention.md headline budget (state the offer); first frame names the business → rule: never put a gate in front of content that has no legal reason for one.
- **Navigation as two text links** — "YES" red and "no" yellow, both underlined in a third colour (default blue) → principle: colorlib's "navigation that feels like an afterthought"; one CTA style (color.md expressive rule "CTA style consistent") → rule: primary and secondary actions share one button system and differ by weight, not by random hue.
- **Display font as body** — Arial Black for every line, including the instruction → principle: typography.md roles (display used large and sparingly) → rule: a heavy display face never sets the small explanatory line.
- **Missing basics** — no `lang`, 0 h1, image without alt, unnamed link → principle: WCAG 3.1.1, 1.3.1, 1.1.1 → rule: even a one-screen page ships lang, one h1 and alt text.

## Transferable rules

- Do: if one question really is the page, keep question and answers on one axis.
- Don't: gate content behind an entry click.
- Don't: let link colours vary per link; one action style.
- **The one change that would fix most of it:** drop the gate and show the content index under the photo, with an h1 naming the site.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** this is deliberate early-2000s parody humour; the gate is the joke and the audience gets it. Recorded bad (colorlib, no exceptions); audience-fit lowers confidence to medium.
