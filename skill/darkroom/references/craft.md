# Craft floor: what separates a finished page from a sketch

A checklist to sweep before a checkpoint. Items are things a visitor feels without naming them. Fix them in the QA loop; do not ask the user about them.

## Type and text
- Display type set large and tight (leading 0.9–1.1) with optical care: check line breaks at 1440, 1024, 390; no single-word last lines in headlines; `text-wrap: balance` on headings, `pretty` on paragraphs.
- Measure 45–75ch for body; ≤ 6 distinct sizes; numerals tabular in tables and prices; real quotes and dashes; no widows in the hero.
- Fonts self-hosted, subset, `font-display: swap`, with a fallback whose metrics are matched (`size-adjust`, `ascent-override`) so the swap does not jump the layout.

## Colour and surface
- Tokens named by job (`--action`, `--ink-2`), never by look. Text on every surface passes contrast with the real colours (the audit measures pixels; over media, check the lightest frame).
- Selection colour, `accent-color`, caret colour, scrollbar and `color-scheme` set deliberately. One accent with one job (action).
- Shadows and glows only where a light source exists in the scene.

## Layout
- One copy anchor, constant across sections. Section rhythm varies (scale, density, background) so no two neighbours share a layout family.
- Safe areas on phones (`env(safe-area-inset-*)`); `100svh`/`dvh` rather than `100vh` for full-height heroes; no horizontal scroll at 375.
- Media boxes reserve space (`aspect-ratio`, width/height) and a poster colour: no layout shift, no blank bands when media fails.
- Focal point preserved on every crop (`object-position` per breakpoint, or art-directed `<picture>`).

## Spacing and alignment (hard rules)
- **One scale.** Define it as tokens first, in the bible: `--space-3xs: 2px; --space-2xs: 4px; --space-xs: 8px; --space-sm: 12px; --space-md: 16px; --space-lg: 24px; --space-xl: 40px; --space-2xl: 64px; --space-3xl: 96px; --space-4xl: 144px`, plus 32, 48, 80, 120 and 176 when the page needs them. Every padding, margin and gap uses a token. Audit `spacing-scale`: at most three optical nudges of 6 px or less, each with a comment.
- **One kind of gap, one size.** Write these once and reuse them: head to its line 16–24 px; head block to content 48–64 px; line to button 24 px; button beside button 12 or 16 px; card padding 32–40 px; grid items 48–64 px apart. 24 px here and 28 px there is a fault, 24 and 64 is a decision. Audit `spacing-drift`.
- **At least twice the space above a head as below it** (`crowded-head`). Text in a box keeps its padding (`cramped-box`).
- **Left edges line up from the nav to the footer.** Twelve columns, one container, one copy anchor. A near miss of 2–8 px is a fault; a clear offset is a decision. Items in a row start at one height. Audit `align-edge`.
- **Controls:** 44–52 px tall on a marketing page; a field and the button beside it share a height (`control-height`); a button label stays on one line (`label-wrap`). The outer section owns background and block padding; the inner container takes only inline padding.

## Loading (hard rule, audit `skeleton`)
- Every picture keeps its real box from the first paint (`width` and `height`, or `aspect-ratio`), with a tint or `recipes/skeleton.css` standing in. Nothing pops in, nothing jumps.
- The first-screen picture is never `loading="lazy"` and takes `fetchpriority="high"`. Every video has a `poster`.
- A film canvas shows its first frame or a skeleton until the frames arrive, never a blank band.
- Anything fetched (a menu, products, a feed) shows a skeleton in the shape of what is coming, in `aria-busy="true"`. A spinner alone is not enough; use one only for an action the visitor started (after 150–300 ms, shown at least 300 ms, beside the label).
- Skeletons take the page's colours and stop sweeping under reduced motion. Empty state: what is empty, why it matters, one action. Error state: what happened, what to do; no "Oops".

## Interaction states (every control, not just the primary button)
- Hover (pointer devices only: `@media (hover: hover)`), `:focus-visible` with a 3:1 ring and an offset, `:active`, disabled, loading. Press feedback is immediate (≤ 100 ms); tap targets ≥ 44 px on touch (24 px is the floor).
- Links look like links; nothing clickable is a bare `div`; anchors scroll with `scroll-margin-top` under a sticky header; skip link works.
- Forms: visible labels (not placeholders), correct `type`/`autocomplete`/`inputmode`, inline errors tied with `aria-describedby`, a success state that is true (a "Thanks!" must correspond to real handling or be marked as a demo).

## Content states
- Long names, long translations, missing images, empty lists, slow networks. Break the page on purpose with the worst copy (German compounds, 60-character names) at 375 px.
- Loading: the first frame is the real composition (poster + live h1); a loader may sit over it but never replace it. No spinner as a hero.

## Head and metadata
- `lang`, one `h1`, descriptive `<title>`, meta description, canonical, social preview image, favicon + apple-touch icon, `theme-color`, structured data only if true. Nothing placeholder (`Lorem`, `Your Company`) anywhere, including alt text and metadata.

## Performance by construction
- Hero image or poster ≲ 250 KB as a starting budget, preloaded when it is the LCP; responsive `srcset` and modern formats; heavy media after first interaction; `loading="lazy"` below the fold; no hotlinked assets; third-party scripts behind consent.
- Animate `transform`, `opacity`, `clip-path`, `filter` only; no `transition: all`; `will-change` only while moving.

## Composition (the first screen)
- **One idea per first screen:** mark + nav + one H1 + one sub + 1–2 CTAs + one media plane + at most one quiet strip (a credit line, three logos, a scroll cue). Anything else waits for the second viewport.
- **Four anchor patterns:** centred stack · bottom-anchored (H1 low-left over the media, the media owns the top) · left column (copy in 5 of 12 columns, subject right) · editorial four corners (mark, nav, H1 and a fact pinned to the corners). The pack picks one; **centred is the safe default, not the best**.
- **Text and subject never collide:** move the media first (`object-position`, oversize to 110–120 % and offset, a phone re-crop), shrink the text last.
- **Inset frame** variant: the hero media sits in a rounded frame with a 12–24 px margin of ground around it; good for light grounds and product photos that do not bleed.

## Spacing values (defaults)
- Content max-width 64–80rem; lede and sub 440–540 px wide; body measure 45–75ch.
- Gutters 16–24 px phone, 48–64 px desktop (`clamp(16px, 4vw, 64px)`), inside a container capped at 1360–1520 px and centred: at 1920 text sits at least 120 px from the screen edge; pictures may bleed.
- Section padding 128–176 px desktop, 80–112 px phone (`clamp(80px, 12vw, 176px)`).
- **Sheet transition** between sections: the next section rises over the last with `border-radius: 40–60px 40–60px 0 0; margin-top: -40…-56px` and its own ground.
- Single-frame heroes get height rules: `@media (max-height: 850px)` and `(max-height: 720px)` shrink the H1 one step and pull the CTA up, so a laptop never cuts the button off.

## Text over media
- Text shadow before boxes: body `0 2px 18px rgba(0,0,0,.42)`, display `0 16px 38px rgba(0,0,0,.32)` (dark media; for light media use the ground colour at .5).
- Edge-blend scrims instead of a flat wash: bottom fade from `--ground` to transparent over the bottom 30–40 %, or a directional side fade under the copy column. **Never a flat 50 % black wash** over the whole frame.
- Check legibility on the **brightest frame** of the clip, not the poster.

## Honest placeholders
Anything not yet real is marked (`TEMP`, a labelled flat field) and listed in `ASSETS.json`. A placeholder that looks real is a defect.
