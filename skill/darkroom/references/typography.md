# Typography

## Budget and roles

- Default budget **3 families**, each with a named role: a *display* face (character, used large and sparingly), a *text* face (legibility, UI, body) and optionally a *utility* face (wordmark, labels, mono for figures/data). Two is still the calm default for most pages; the third must earn its role in the bible. Evidence: award sites in the library commonly run 3 (`library/LESSONS.md`, good/terreno-hotel, good/forum-cases, good/almada-label). Four or more, or two faces competing for the same role, is a defect.
- **Tone must match the brand**: the most common real-world failure is a face whose personality contradicts the site (playful display on a luxury brand, a techno face on a family clinic). Check the pack's "never" list.
- Handwriting/script in imagery counts as a font if it appears as UI text. Keep it inside artwork or not at all.
- Self-host fonts (OFL via `@fontsource`, or licensed webfonts with a web licence). Remote Google Fonts embeds transmit visitor IPs to Google — a German court awarded damages for that (LG München I, 3 O 17493/20, 2022).

## Scale

- 5–6 sizes, far apart (ratio ≥ 1.25 at body, larger jumps at display). Nine similar sizes = noise.
- Fluid: `clamp(min, vw-based, max)` for display; body 16–20 px; never below 16 px for inputs on mobile (iOS zoom).
- Display: line-height 0.9–1.05, tracking slightly negative (−0.01 to −0.03em; never tighter than −0.04em). Body: 1.4–1.6 (serifs a little more), measure 45–75ch.
- Tracked uppercase only for short labels (≤ 4 words), tracking 0.08–0.4em, and only if the pack switches labels on.
- One emphasis device per page family: colour on one word, *or* italic, *or* weight. Never gradient text.

## Choosing the display face (procedure, not taste)

1. Describe the reference letterforms: width (condensed/normal/extended), contrast, terminals, `a`/`g` storeys, x-height, weight.
2. Shortlist 4–6 OFL faces from the pack.
3. Render the real headline in each beside the reference crop (Playwright screenshot), compare width/cap-height ratio and stroke weight. Pick by measurement + eye. (NorthShutter: Sora 5.94 vs ref 6.06; Space Grotesk 5.75 was too narrow.)
4. Record the choice and the losers in the bible.

## Pairing checks

Contrast in role, harmony in proportion: similar x-height, compatible widths. Serif + sans or display sans + neutral sans. Two expressive faces fight. Test at the real sizes on the real background.

## Details that read as "built, not assembled"

Curly quotes, real ellipsis, non-breaking spaces in names/units, `text-wrap: balance` on headings and `pretty` on body, tabular numerals for prices/data, themed `::selection`, no widows on headlines.
