---
slug: drudge-report
verdict: bad
verdict_source: colorlib
confidence: high
category: editorial
packs: [editorial-news, bold]
url: https://drudgereport.com/
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# Drudge Report — bad

**Thesis in one line:** One siren headline a day, then 600+ words of underlined monospace links with no structure. Colorlib: "design seems to be from the year it launched".

**First frame:** a small portrait top-left (~10 %, 20 %) with two 11 px headlines, then a centred rocket photo (~50 %, 65 %) and a 48 px underlined all-caps headline at the bottom edge; the masthead only appears after scrolling.

## Signals

| Signal | Value |
|---|---|
| Font families | measured 1 (Arial); visible also a monospace link face + slanted logo image — 3 voices |
| Type scale | 48 px headline · 13 px links · 2 sizes |
| Colour mode / shares | monochrome — white ground 96 %; black ink, red for "hot" links; colour only in photos |
| Words (page / heaviest section) | 677 / 644 (budget 45) |
| Text zones, first viewport | desktop 2 · mobile 2 |
| Layout system | three equal columns split by 1 px rules; no headings; ~100-outlet link lists at the bottom |
| Signature motion | none · libraries: none detected |
| Page weight | 54 KB |
| Mobile | broken — desktop table kept, page 268 px wider than viewport, masthead clipped |
| Source of values | measured (study.json) + images |

## What works & why

- **One dominant headline + one photo, centred, at 48 px** — the day's single story is unmistakable → principle: reading-paths.md rule 7 (one focal point) → rule: a news front page needs one lead that outranks everything by size.
- **54 KB page** — loads instantly on any connection → principle: performance as utility for repeat daily visitors → rule: a link hub has no excuse to be heavy.

## What fails & why

- **Masthead below the fold** — the first frame opens on a stray top-left photo; the brand wordmark sits under the lead headline (~1,150 px down) → principle: attention.md (first frame names who is speaking) → rule: identity sits at the top of the first viewport, even on a one-story page.
- **Every link underlined, 13 px monospace, caps and ellipses** — headlines, outlets and tools look identical; red is the only emphasis → principle: typography.md (mono only for data/code; body 16–20 px; one emphasis device) → rule: headlines in a text face, at ≥ 16 px; underline on hover/focus only in dense lists.
- **Three headless columns, 644 words in one section, ~100 outlet links** — no section names, so scanning has no layer to grab → principle: attention.md layer-cake scanning; reading-paths.md rule 4 → rule: a heading every 5–8 links; move the outlet directory to its own page.
- **Search hidden low in the right column** — below ~20 wire-service links (colorlib cites the same) → principle: reading-paths.md rule 5 (corners/chrome hold tools in the header) → rule: search goes in the top bar.
- **Mobile keeps three columns** — 268 px horizontal overflow, logo cropped, third column off-screen; 153 targets under 24 px → principle: WCAG 1.4.10 reflow, 2.5.8 target size; reading-paths.md rule 8 → rule: one column under 600 px with 44 px rows.
- **No h1, no `lang`, 11 images without alt, ad trackers before consent** → principle: compliance.md (WCAG 1.1.1, 3.1.1; ePrivacy) → rule: basics are day-one.

## Transferable rules

- Do: keep one oversized lead story and a featherweight page.
- Do: put the masthead and search in the first 100 px.
- Don't: render every link in one underlined small monospace style.
- **The one change that would fix most of it:** headed columns in a 16 px text face that reflow to one column on phones.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.
