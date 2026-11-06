# Generated-design tells (registry)

Patterns that make a page read as model-made **when used by default**. One tell proves little; **four or more together** read as "nobody chose this" (a scan of 1,590 Show HN landing pages found 22 % heavy slop with ≥ 4 tells, 32 % mild, 46 % clean). A style pack may switch one on with a reason; the bible's exceptions log records it. Slop pages aren't broken — they're undifferentiated; the cost is that nobody remembers them. Bad patterns confirmed by real sites live in `library/bad/` and `library/LESSONS.md`.

## How these rules bind
Hallmark's rules are hard rules here. A tell is not a suggestion and Claude cannot excuse it.

- **Floor: never ships, nobody can lift it.** Invented proof (numbers, logos, quotes, reviews nobody gave; a real one carries its source in the markup), placeholders left live, `transition: all` and layout animation, a form that says "Thanks" while nothing is sent. Audit `proof`, `placeholder`, `css-motion`, `fake-send`.
- **Hard rule: high, blocks the handoff, lifted only by the user's own words.** Every other check below: labels and capitals, the accent word, gradients, card stripes, cards in cards, template punctuation, emoji, drawn windows, genre words, stock palettes and faces, the email close, spacing, alignment, skeletons. To lift one, the user must have asked for that thing; quote them in the bible's `keepTells` as `"eyebrow: user: <what they said>"`. Claude's own reason keeps nothing, a bare id keeps nothing, and "luxury + editorial" is not a request for labels. A style pack cannot switch a hard rule on.
- **Judged: a reviewer's call, not a script's.** See "Not hard rules" below.
- **Finish: craft detail.** Straight quotes, a widow, an untinted scrollbar. Mention once, never block a ship.

One allowance stays, because Hallmark's gates allow it too: a single stock label alone ("Get started", low; two are a hard rule). One coloured word in the hero headline is low; an italic word never passes.

## Not hard rules (Hallmark has them; Darkroom keeps them softer, on purpose)
| Hallmark rule | Here | Why |
|---|---|---|
| No `vh` heroes, no `100vw` | not checked | scroll films and pinned stories are built on full-height scenes; `svh`/`dvh` and overflow checks cover the real faults |
| About 80 words a screen | word budgets per pack and surface (`word-budget`) | a menu, a price list or a news front is meant to be dense; the page type sets the budget |
| 120 px between sections, never the same gap | judged | scroll stories run chapter into chapter with no gap at all |
| Photos under a third of the page; no drawn illustration past icon size | not adopted | Darkroom pages are led by photographs and film; Dark Motions has drawn 2D characters |
| No em or en dashes | judged | Romanian, French and other languages use them in normal typography, and a date range needs one |
| Every colour and font through a token | `commands/build.md`, not a check | a Shopify or WordPress theme inherits literals from the platform |
| Generated copy cadence, hero posture, composition rules, three equal tiles | judged by the fresh reviewer (`references/fresh-review.md`) | a script can't read taste; a false alarm here would fight good design |
| The stamp in the CSS, the 50 themes, static HTML only | not adopted | Hallmark's own machinery; Darkroom has style packs and ten platforms |
| Floor rules can never be waived by anyone | the user's words lift a hard rule | law 4: the user's explicit word wins. "All caps, it's a climbing gym" is a real brief |

## Type
- Inter (or the framework's default sans) everywhere, especially a **centred Inter hero headline**. Inter as a quiet text face under a chosen display face is fine; Inter as the whole identity is the tell.
- Stock "designed" pairings reached for by default: Space Grotesk, Instrument Serif, Geist + Inter. Judge by use, not name: a face is a tell when nothing else on the page commits to it.
- One **serif italic accent word** inside an otherwise sans headline.
- All-caps headings and tracked-caps section labels scattered as "voice".
- **The eyebrow:** a small capitals or pill label above a heading ("FEATURES", "HOW IT WORKS", "TRUSTED BY", "01 / 05"). It names what comes next instead of adding a fact. Hard rule from the first one; a number passes only as a fact (a year, a price, a time, a unit). Audit `eyebrow`. **Tracked capitals anywhere** on small text: audit `tracked-caps`.
- **Mono as costume:** monospace on labels, captions and meta rows when the page is not about code or measurements.
- Full-sentence headlines at display size running 3+ lines.

## Colour & surface
- Purple→blue / pink→violet gradients, gradient headline text, "vibe-code purple" (lavender) accents.
- Permanent dark mode with medium-grey body text that barely passes (or fails) contrast.
- Large coloured glows, coloured box-shadows, glowing buttons; soft grey shadow on every card.
- Glass cards everywhere; unmodified component-kit defaults (one 12–16 px radius, 24 px padding, same shadow) on everything.
- **The stock premium:** near-black + ivory + gold, or cream + terracotta + serif, as automatic "premium"; near-black + single neon + glow as automatic "tech". Audit `stock-palette`.
- Colour named for looks (`gradient-start`) instead of job (`action-primary`, `feedback-success`).
- A framework's stock swatch as the brand (Tailwind indigo-500, violet-600, slate-900) when nobody picked it.
- Pure `#000` / `#fff` everywhere where a tinted ink and paper would carry the palette.

## Structure
- Centred hero + subtitle + two buttons + product screenshot.
- **Pill badge above the H1** ("New ✦ …").
- Three identical feature cards with an icon/emoji on top, two-word title, a sentence that repeats the title.
- **Accent stripe on cards** (coloured top or left border) — the single most specific tell.
- Bento grid as the feature section; numbered 1-2-3 step rows; stat banner of big numbers; stock order hero → logos → features → testimonial → pricing → CTA.
- Every block the same card at the same padding, so nothing is more important than anything else.
- Emoji icons in nav/sidebar; fake dashboard of grey bars.
- **A drawn browser or OS window** (red, yellow, green dots, a fake URL pill) around a screenshot or, worse, around styled divs. Audit `fake-chrome`.
- **A card inside a card**; two filled buttons side by side as equals.
- **The fake product:** a mock interface of styled divs when the real product exists and could be captured. Capture it (`commands/shoot.md`); build a sample only for a product that does not run yet, and say so in the handoff.
- **The stock close:** an email sign-up in the last section or the footer of a page whose job is not a mailing list (`job` in the bible). End on what the visitor came to do (`references/anatomy.md`). Audit `email-close`.
- **Spacing by feel:** 24 px here, 28 px there. Every gap comes from the scale, and one kind of gap has one size. Audit `spacing-scale`, `spacing-drift`; alignment near misses `align-edge`; `references/craft.md`, Spacing.
- **Holes while loading:** a picture that pops in, a blank film, data landing in nothing. Audit `skeleton`; `recipes/skeleton.css`.
- **The same design twice:** two clients, one look. Audit `sameness`; `commands/style.md`.
- **The wireframe page:** rows of empty frames (six blank portraits, four grey bottles). Set the set in type; keep one or two slots, each holding a real or library picture.
- **Drawn stand-ins:** an SVG illustration of the product, a plant or a person where a photograph belongs; a coloured box where the picture should be; a row of identical marks counting what one number could say.
- **Decoration text:** rotated vertical labels, scroll cues, a version pill in the hero, a city-and-weather strip, `01 / 04` counters on tiles. A fact stays; a decoration goes.
- **The echo:** one fact (a price, a date) printed in four sections; a section's last line restating its heading.

## Copy
- Headline that could describe any product ("Build the future of work", "Scale without limits").
- unlock / elevate / seamless / supercharge / effortless / cutting-edge / best-in-class; hedges ("may help you", "can potentially").
- "Not just X, it's Y"; tricolon headlines; em-dash storms; filler openers and restated conclusions.
- "Get started" / "Learn more" as every CTA. Audit `stock-cta`.
- **Template punctuation:** meta joined with middle dots (`Fast · Simple · Secure`), an arrow glued to every link (`Learn more →`), a decorative dot before labels. One dot in a byline is fine. Audit `template-punct`.
- Leftover placeholders: lorem ipsum, `[Headline]`, "© 2024 Your Company Name" — the strongest sign nobody read the page.

## Proof
- Untraceable testimonials (first name + initial, company that doesn't exist), invented logo walls, star rows. Floor: audit `proof` lists every proof-shaped claim; each is confirmed against the brief or removed.
- Unsourced numbers: "10× faster", "Trusted by 10,000+ teams", "99.9 % uptime".
- Generated imagery that breaks up close: warped hands, garbled text, duplicated devices, a team sharing one face; plastic-smooth symmetrical illustrations.

## Function
- Dead links (`#`), social icons pointing at platform homepages, buttons with no handler.
- Forms that show "Thanks!" while the data goes nowhere (check the network tab, not the message).
- Clickable `div`s instead of buttons, images without `alt`, commented-out components.

## Motion
- Same fade-up on every block; a dozen staggered hero entrances; hover-lift on every card; bounce easing.
- `transition: all`, and animating width, height, top or left instead of transform and opacity (janky, and a sign nobody chose the property). Audit `css-motion`.
- Meaningless infinite loops; reveals that fail and leave blank bands.
- The overcorrection: parallax on every section, custom cursor, animated background — decoration, not intent.
- Missing intent: hovers that do nothing, buttons that snap.

## Confirmed by real sites (library, 2026-10-25)
These hit award winners as often as slop — they're failures, not style. Evidence in `library/LESSONS.md`.
- **Loader or gate instead of a first frame.** Preloader, "Enter" click or WebGL canvas with no poster and no live h1 behind it: slow phones and crawlers see nothing (14 award winners lost their first frame in capture). Ship the real composition at once; a gate may sit over it, never replace it.
- **Stacked overlays.** Consent + newsletter + voucher + chat + accessibility widget over the opening screen. One overlay at a time, never over the first frame; consent first layer ≤ 25 % of the phone viewport with equal-weight reject.
- **No who/what in the first frame.** No live h1 naming the offer — a paragraph, a slogan or a logo stack instead. One h1 of ≤ 8 words, before any other copy.
- **A gate in front of the content (2026-10-27).** "Enter the experience", a START button or a mini-game the visitor must finish before anything scrolls (bad/avatr-vision, bad/dont-board-me, bad/minh-pham, bad/real-ultimate-power). The page scrolls and sells with no click; intros, games and sound choices sit over or beside the content and scrolling skips them. A sound on/off choice that still lets you scroll is not a gate. Severity: high.
- **Text that needs the media to load.** White copy over a lazy photo or video, reveals that leave blank bands, hotlinked images. Copy gets its own ground or scrim; media boxes reserve `aspect-ratio` and a poster colour.

## AI-era motion sites (library, 2026-10-29)
From the maintainer's review of 102 AI-made and AI-motion pages (evidence in `library/`; lessons in `library/LESSONS.md`). The verdicts show these tells sink a page only together, or when nothing owned replaces them: good/uicraft, good/storywizard and good/native-foreign keep a pill badge or an italic accent word and are still good, because the product or the work carries them.
- **The "cosmic" default:** violet-black space, a lavender italic serif second line, spaced-caps chapter labels (bad/astronomia-semplice). Also the chrome AI head in neon rain (bad/exit-simulation) and neon-green-on-black terminal cosplay with glitch text (bad/integrity-index, bad/portkiller).
- **The AI-startup hero:** centred claim, lavender pill button, a stock doodle crowd, blue-pink glass gradient cards (bad/yaven); badge hero + stat counters + pill tags + identical icon cards (bad/spine-fellowship); falling pastel blocks with no owner (bad/mahadeva-framer); near-black + one neon + centred claim over a screenshot (bad/splitleaf).
- **The same frosted caption card in every chapter** of a film page. One fixed card as a reading anchor is fine (audit `glass-caption`).
- **A film you scroll through where nothing changes** for screens at a time, or that weighs tens of MB before the first scroll (bad/abstrakt-fable, bad/hex, good/royal-pop as a heavy-but-good warning; audit `dead-scroll`, `first-scroll-weight`).
- **"Best viewed on desktop"** instead of a phone page (bad/shelby-kho; audit `phone-gate`).
- **Placeholders left live:** "Logo Ipsum", lorem ipsum, a placeholder logo wall (bad/unicorn-framer, bad/kudanil, bad/prompture).
- **A headline that waits for its entrance or a loader** (bad/prompture, bad/curllmooha; audit `motion-rest`, `first-paint`). A designed loader that already shows the product is tolerated (good/coffee-aecync).
- **Retro, toy or hand-made dress on a serious offer** reads as a costume (bad/anotequest, bad/sienna-chen, bad/irfan-xp, bad/window-swap); fine when the site is a toy (good/stuff-my-dog-loves) or the retro object is shot like a product (good/jordan-gibbs). Outside Darkroom's home ground (`commands/concierge.md`).

## What `audit` measures vs what needs eyes
`darkroom.mjs audit` catches font count, colour share, contrast, word budgets, zones, alt/labels, third-party requests, dead scroll, repeated glass captions, phone gates, the first-screen headline over film, weight before the first scroll, seams between chained clips, and the visible reflexes above: gradient text, the purple-blue ramp, card stripes, eyebrows and pill badges over headings, accent words, emoji icons, drawn browser windows, placeholders, template punctuation, stock CTAs, `transition: all`, unsourced proof, and how many different tells sit on one page (`slop-count`, high at three). Still judged by eye at the critique pass: generic headlines (read the hero aloud: if it fits a competitor, rewrite it), the fake product, the stock close and stock anatomy, the wireframe page, drawn stand-ins, decoration text, the echo, the fake send, and whether this page could sit under another business's name (the mirror test, `commands/critique.md`).

## Instead of the eyebrow
Ask what the reader does not know yet. If nothing, open with nothing. Otherwise pick one way in per section, and vary them down the page:
1. Nothing: air above, the heading flush.
2. A heading that names its subject in its first two words (usually the best move).
3. A lead-in in a heavier weight inside the first paragraph.
4. One drop cap on the page.
5. A rule that does more than rule: hairline, double rule, a change of paper; vary it seam to seam.
6. A real number set large, when the number is the point (a year, an issue, a price that is the offer).
7. A real ordered list when the sequence is real.
8. A caption below the content instead of a label above it.
9. A note in the margin beside the body.
10. A running head that stays at the page edge (it persists, it does not announce).
11. A heading that stays pinned while its content scrolls under it.

A label survives when it carries a fact, a destination or an identifier: a date, a place, a price, a live status, a caption, a table head, a byline.

## Why removal isn't enough
A page with the tells deleted and nothing put in their place is empty. Replace with substance: an idea from the subject, real pictures, committed type, one layout primitive repeated until it becomes the signature, full and specific content. Ship with an opinion — one bold choice (a colour, a typeface, an uncommon layout), committed to.

Tiers, waivers on the record, the eyebrow alternatives and several tells above were adapted from Hallmark (github.com/nutlope/hallmark, MIT, read 2026-10-31). Sources: scanaislop.com, "AI slop website examples"; developersdigest.tech, "AI design slop and how to spot it" (citing Adrian Krebs' Show HN scan); 925studios.co, "AI slop web design guide" — all read 2026-10-25. This registry is self-contained; extend it with a dated entry when a new pattern is confirmed.
