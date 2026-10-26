# Generated-design tells (registry)

Patterns that make a page read as model-made **when used by default**. One tell proves little; **four or more together** read as "nobody chose this" (a scan of 1,590 Show HN landing pages found 22 % heavy slop with ≥ 4 tells, 32 % mild, 46 % clean). A style pack may switch one on with a reason; the bible's exceptions log records it. Slop pages aren't broken — they're undifferentiated; the cost is that nobody remembers them. Bad patterns confirmed by real sites live in `library/bad/` and `library/LESSONS.md`.

## Type
- Inter (or the framework's default sans) everywhere, especially a **centred Inter hero headline**. Inter as a quiet text face under a chosen display face is fine; Inter as the whole identity is the tell.
- Stock "designed" pairings reached for by default: Space Grotesk, Instrument Serif, Geist + Inter. Judge by use, not name: a face is a tell when nothing else on the page commits to it.
- One **serif italic accent word** inside an otherwise sans headline.
- All-caps headings and tracked-caps section labels scattered as "voice".
- Full-sentence headlines at display size running 3+ lines.

## Colour & surface
- Purple→blue / pink→violet gradients, gradient headline text, "vibe-code purple" (lavender) accents.
- Permanent dark mode with medium-grey body text that barely passes (or fails) contrast.
- Large coloured glows, coloured box-shadows, glowing buttons; soft grey shadow on every card.
- Glass cards everywhere; unmodified component-kit defaults (one 12–16 px radius, 24 px padding, same shadow) on everything.
- Cream + terracotta + serif as automatic "premium"; near-black + single neon + glow as automatic "tech".
- Colour named for looks (`gradient-start`) instead of job (`action-primary`, `feedback-success`).

## Structure
- Centred hero + subtitle + two buttons + product screenshot.
- **Pill badge above the H1** ("New ✦ …").
- Three identical feature cards with an icon/emoji on top, two-word title, a sentence that repeats the title.
- **Accent stripe on cards** (coloured top or left border) — the single most specific tell.
- Bento grid as the feature section; numbered 1-2-3 step rows; stat banner of big numbers; stock order hero → logos → features → testimonial → pricing → CTA.
- Every block the same card at the same padding, so nothing is more important than anything else.
- Emoji icons in nav/sidebar; fake dashboard of grey bars.

## Copy
- Headline that could describe any product ("Build the future of work", "Scale without limits").
- unlock / elevate / seamless / supercharge / effortless / cutting-edge / best-in-class; hedges ("may help you", "can potentially").
- "Not just X, it's Y"; tricolon headlines; em-dash storms; filler openers and restated conclusions.
- "Get started" / "Learn more" as every CTA.
- Leftover placeholders: lorem ipsum, `[Headline]`, "© 2024 Your Company Name" — the strongest sign nobody read the page.

## Proof
- Untraceable testimonials (first name + initial, company that doesn't exist), invented logo walls, star rows.
- Unsourced numbers: "10× faster", "Trusted by 10,000+ teams", "99.9 % uptime".
- Generated imagery that breaks up close: warped hands, garbled text, duplicated devices, a team sharing one face; plastic-smooth symmetrical illustrations.

## Function
- Dead links (`#`), social icons pointing at platform homepages, buttons with no handler.
- Forms that show "Thanks!" while the data goes nowhere (check the network tab, not the message).
- Clickable `div`s instead of buttons, images without `alt`, commented-out components.

## Motion
- Same fade-up on every block; a dozen staggered hero entrances; hover-lift on every card; bounce easing.
- Meaningless infinite loops; reveals that fail and leave blank bands.
- The overcorrection: parallax on every section, custom cursor, animated background — decoration, not intent.
- Missing intent: hovers that do nothing, buttons that snap.

## Confirmed by real sites (library, 2026-10-25)
These hit award winners as often as slop — they're failures, not style. Evidence in `library/LESSONS.md`.
- **Loader or gate instead of a first frame.** Preloader, "Enter" click or WebGL canvas with no poster and no live h1 behind it: slow phones and crawlers see nothing (14 award winners lost their first frame in capture). Ship the real composition at once; a gate may sit over it, never replace it.
- **Stacked overlays.** Consent + newsletter + voucher + chat + accessibility widget over the opening screen. One overlay at a time, never over the first frame; consent first layer ≤ 25 % of the phone viewport with equal-weight reject.
- **No who/what in the first frame.** No live h1 naming the offer — a paragraph, a slogan or a logo stack instead. One h1 of ≤ 8 words, before any other copy.
- **Text that needs the media to load.** White copy over a lazy photo or video, reveals that leave blank bands, hotlinked images. Copy gets its own ground or scrim; media boxes reserve `aspect-ratio` and a poster colour.

## What `audit` measures vs what needs eyes
`darkroom.mjs audit` catches font count, colour share, contrast, word budgets, zones, alt/labels, third-party requests. Gradient text, card stripes, badge-over-H1, emoji icons, placeholder strings and generic headlines need the critique pass (`/darkroom critique`) — read the hero aloud: if it fits a competitor, rewrite it.

## Why removal isn't enough
A page with the tells deleted and nothing put in their place is empty. Replace with substance: an idea from the subject, real pictures, committed type, one layout primitive repeated until it becomes the signature, full and specific content. Ship with an opinion — one bold choice (a colour, a typeface, an uncommon layout), committed to.

Sources: scanaislop.com, "AI slop website examples"; developersdigest.tech, "AI design slop and how to spot it" (citing Adrian Krebs' Show HN scan); 925studios.co, "AI slop web design guide" — all read 2026-10-25. This registry is self-contained; extend it with a dated entry when a new pattern is confirmed.
