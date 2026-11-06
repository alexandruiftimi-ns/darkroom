# Audit: quick while building, in depth when asked

**A normal `/darkroom` build runs only the quick check.** The full audit runs when the user types `/darkroom audit`, never by itself.

```bash
node <skill>/scripts/darkroom.mjs audit <url | dir | file.html> --quick     # during every build: the hard rules
node <skill>/scripts/darkroom.mjs audit <url | dir | file.html> [--bible file] [--fonts 3] [--mode disciplined|expressive|monochrome] [--json .darkroom/qa/audit.json] [--dismiss]
node <skill>/scripts/darkroom.mjs checks          # the registry below, from the code
node <skill>/scripts/darkroom.mjs builds          # the last builds on this computer
```

## The quick check (`--quick`)
About 10 s a page. Anti-slop, labels and capitals, spacing, alignment, skeletons, the stock looks, sameness, overflow, headings, console errors. Writes `.darkroom/qa/quick.json`. Run it on the slice and after the build-out; fix every high. No contrast, keyboard, motion, weight or scroll passes: those belong to the full audit. It also records the build in `~/.darkroom/builds.json` for `sameness` and `darkroom builds`.

## When the user types `/darkroom audit`
Say in one line what will run and that it uses more of their usage, then, on the current build (or the page they name), in this order:
1. `darkroom audit <page>` for every page in the bible's page list (one-page site: one run): all checks at 1440, 390, 1280 and 1920, both motion modes, no JavaScript.
2. `darkroom capture <page> --both --viewports desktop-1440,tablet-1024,mobile-390 --film`, and look at the sheets.
3. The finish review in a fresh context (`references/fresh-review.md`).
4. `commands/critique.md`: the ten lenses. `commands/comply.md` when the page takes money or data, or has a market set.
5. `darkroom media check` when the page has video or frames.

Report in plain words, ranked by what each costs a visitor: what is wrong, where, the fix. Group as must fix (every high), should fix (medium), could fix (low). Say what was **not** checked. Fix nothing until the user says so, then fix and re-run only what changed.

Local directories and files are served over `http://127.0.0.1` first (never `file://`). Before measuring, the audit scrolls through the page once and back to the top, so text that fades in on scroll (`reveal.js`, ScrollTrigger, AOS) is revealed and measured; reveals that hide again when scrolled away are not seen. The page is loaded at desktop (1440) and mobile (390) widths under `prefers-reduced-motion: reduce`, plus one default-motion pass used only to compare animation. Every finding carries a severity and a **basis**:

- **measured**: read from the rendered page (pixels, computed state, behaviour).
- **heuristic**: a rule of thumb applied to measurements. A kept exception is legitimate; log it in the bible.
- **manual**: the script cannot decide. Someone has to look.

Settings (font budget, colour mode, word budgets, `surface`, disclosure, `keepTells`) come from the first of: `--bible`, the `config` path in `.darkroom/project.json`, `.darkroom/settings.json`, `DESIGN_BIBLE.md`, `PROJECT_BLUEPRINT.md`, `DESIGN.md`. When `.darkroom/project.json` has `look: pack:<name>`, that pack's defaults sit underneath (editorial-news and catalog allow 5 zones and longer sections, luxury, art-gallery and the cinema packs shorter heroes, restaurant and family 4 zones; the table is `PACK_AUDIT` in `scripts/lib/project.mjs`); anything the bible sets wins. The output names the file it used (and the pack), and a `config` finding appears when none was found. `surface: "read"` skips word budgets and the page-length limit (articles, documentation); the default is `landing`.

## Checks (generated from `scripts/lib/audit.mjs`; do not edit by hand)
| Check | Severity | Basis | What | Limits |
|---|---|---|---|---|
| `fonts` | high | measured | font families rendered vs budget | visible text only; fallback-stack glyphs are not traced |
| `type-scale` | medium | heuristic | > 9 distinct rendered font sizes | fluid clamp() sizes inflate the count |
| `reading-zones` | high | heuristic | text zones in the first viewport (> max+1 high, > max medium) | first viewport only; zones are clustered by distance; tickers and marquees (a track over 1.4 viewports wide, or marked marquee/ticker) are not counted |
| `eye-travel` | medium | heuristic | reading path crosses the viewport > 2x | document order is assumed to be reading order |
| `corners` | medium | heuristic | content in 3+ viewport corners | — |
| `overflow` | high | measured | page wider than the viewport, naming up to 5 offending elements | initial state only; offenders inside clipping ancestors are skipped |
| `first-paint` | high | measured | early frame at ~350 ms is >= 90 % one colour far (ΔE > 10) from the settled first screen (white flash / blank first frame), or the h1 is not visible 1.5 s after load | desktop, default motion; colours compared at 64×40 px |
| `video-playback` | high | measured | autoplay <video> not playing after load: error, readyState < 2 or paused; codec gaps of the test browser reported as info | videos with the autoplay attribute, or inside a [data-video-layer] (recipes/video-layer.js); other JS-started videos are not checked |
| `loop-seam` | medium | heuristic | a video that loops natively (loop attribute) whose first and last frames differ by more than 6 % (mean absolute difference): a visible jump on every loop | needs ffmpeg; compares one frame at each end at 96×54; videos with data-video-loop (fade loop) are skipped |
| `frame-blend` | high | measured | while scrolling with default motion, a full-size image is drawn on a canvas at partial opacity (globalAlpha between 0.03 and 0.97): one frame shows through another (ghosting) | 2D canvas drawImage only (not WebGL, OffscreenCanvas or stacked <img> layers); one scroll pass from top to bottom; canvases inside [data-frame-blend="allow"] are skipped; a canvas drawn onto a canvas (trails, feedback buffers) is not a film frame and is not counted |
| `phone-frames` | high | measured | phone view: film frames drawn to a canvas are over 1.5 megapixels, or average over 300 KB each: phones then decode more than they can show and the scroll lags. Fix: the device sets from `media frames`, or `media phone <dir>` on frames made another way | frames are identified by the number at the end of the file name; a player that does not go through fetch and createImageBitmap reports no size; real phones are not measured |
| `scrub-fling` | high | measured | phone view, CPU slowed 4x: fast flings down a canvas frame scene, back up, down and up again; the painted film changes direction 6+ times while the scroll does 3 times: far-away frames flash on fast scrolls and when scrolling back up | frames are identified by the number in their file URL (fetch + createImageBitmap or <img> drawn on a 2D canvas); the scene is the nearest ancestor of the canvas that painted the frames at least 1.5 viewports tall; Chromium only (CPU throttling) |
| `scroll-glide` | high | measured | in a canvas frame scene, the page moves its own scroll more than 30 px within 1.5 s after the user stops (snapping or gliding to a stop): it fights touch momentum and reads as a glitch | one rest position at 37 % of the scene; CSS scroll-snap counts too |
| `display-font` | high | measured | the h1's first font-family is declared (@font-face) but no face of it loaded: the headline shows in a fallback | undeclared system fonts are reported as info |
| `motion-rest` | high | measured | text in the first viewport at opacity < .05 or visibility hidden 2 s after load, and again with JavaScript disabled (high if the h1 or 3+ items, else medium) | first viewport only; closed menus layered over the hero can be reported; waiting slides (a hidden layer next to a visible sibling of the same kind, e.g. a carousel) are not counted |
| `target-size` | medium | measured | crowded interactive targets < 24x24 CSS px (WCAG 2.5.8 with spacing exception) | inline-in-sentence links exempt |
| `headline-length` | low | heuristic | headline > 8 words | — |
| `word-budget` | high | heuristic | visible copy words vs section budget (> 2x high, > 1x medium), and single text blocks (paragraph, list item, quote, caption) over 60 words (medium); skipped for surface "read" | excludes [data-darkroom-ignore] and aria-hidden subtrees; section boundaries are guessed from markup |
| `dead-scroll` | high | measured | default motion, desktop: the page scrolled in half-screen steps; more than 2 screens of scroll in a row where the picture barely changes (< 1.5 % of pixels): nothing new to see or read (> 2 medium, > 4 high) | compares 96×60 thumbnails 250 ms after each step; slow ambient motion counts as no change; pages that do not scroll the document are skipped |
| `motion-budget` | high | heuristic | default motion, desktop: the page scrolled a screen at a time; at each rest, the things that move by themselves in view (looping CSS or Web animations grouped per component, playing videos, canvases whose pixels change at rest): more than 3 in one screen medium, more than 5 high | hover, cursor and scroll-linked effects are not counted (they move only when the visitor acts), nor entrances that finish; loops are grouped by [data-motion], the outermost svg, or the animation name; motion inside [data-motion-allow] (asked for by the user) is reported as info |
| `glass-caption` | medium | heuristic | the same frosted caption card (backdrop blur, 3+ words) repeated in 3 or more sections: an AI-film tell; one fixed card as a reading anchor is fine | backdrop-filter blur only; cards inside one section (a grid) count once |
| `phone-gate` | high | heuristic | phone view (390 px) shows a gate instead of the page ("best viewed on desktop", "rotate your device", "not available on mobile") | English, German, French and Spanish phrases; a gate drawn as an image is not detected |
| `gradient-text` | high | measured | text filled with a gradient (background-clip: text), from the first run | computed styles only; gradient text drawn in SVG or canvas is not seen |
| `ai-gradient` | high | heuristic | the purple-to-blue / pink-to-violet ramp on text or on a surface of 2 % of the viewport or more (two saturated stops between 190° and 345°, 35° apart, one of them purple); keepable only for a brand whose own colours these are | CSS gradients only; gradients inside images or video are not seen |
| `card-stripe` | high | heuristic | a card (fill, shadow or radius, 3+ words) with one thick (3 px+) saturated border side and hairline or no others, from the first card | blockquote, aside and list items are exempt; a stripe drawn with a pseudo-element or box-shadow is not seen |
| `eyebrow` | high | heuristic | small (≤ 15.5 px) 1–6 word label in capitals, tracked (over 0.03 em) or a pill, right above an h1–h3, from the first one | the label must be the previous sibling of the heading or of its wrapper; time, figcaption, label and links are exempt; a number passes only as a fact (a date, a year, a price, a time, a unit), never as a count such as 01 / 05 |
| `accent-word` | high | heuristic | one word or phrase in an h1/h2 set apart by italic, another face, another colour or gradient: high from the first italic word anywhere, and for any other treatment outside the hero; one coloured word in the hero h1 is low | span, em, i, strong, b and mark children covering under 60 % of the heading |
| `emoji-icon` | high | heuristic | emoji used as icons (a short leaf that is an emoji, or one opening a heading, list item, link or button), from the first one | emoji-presentation characters only; ©, ® and arrows are not counted |
| `fake-chrome` | high | heuristic | a drawn browser or OS window: three small round dots in a row, red then yellow then green | dots must be sibling elements with a background colour; an image of a window is not seen |
| `placeholder` | high | heuristic | placeholder copy left live (lorem ipsum, John/Jane Doe, Acme Corp, Your Company, Logo Ipsum, [Headline]); a © year older than last year is low | English placeholders only |
| `template-punct` | high | heuristic | meta strings joined by 2+ middle dots or bullets, and link or button labels with an arrow glued on (→ ↗ › »), from the first one | marquees and tickers are exempt; one dot in a byline is not counted |
| `stock-cta` | high | heuristic | link or button labels that name no action (Learn more, Get started, Read more, Discover more, Book a demo, Explore, Click here): one low, two or more high | English only; exact label match |
| `css-motion` | high | measured | same-origin CSS with a transition on "all" (with a duration) or @keyframes that animate width, height, top, left, right, bottom or margins; cannot be kept | cross-origin stylesheets and inline style attributes are not read; JS-driven layout animation is not seen |
| `proof` | high | manual | proof-shaped claims with no source in the markup ("10,000+ teams", "99.9 % uptime", "3× faster", "Trusted by", star rows, "— Sarah K." quotes): an invented one is removed, a real one from the brief gets data-source, a cite or a link; cannot be kept | English patterns; text inside [data-source], cite, or a blockquote/figure with a cite is treated as sourced |
| `tracked-caps` | high | heuristic | small text (≤ 15.5 px) in capitals or small caps anywhere: labels, captions, table heads, tags and nav links are the body face, sentence case, untracked | wordmarks (a class naming logo, brand or wordmark, data-wordmark, or the home link in the header) are exempt; a control on a page whose h1 is itself uppercase is exempt; acronyms typed in capitals are not counted |
| `card-nest` | high | heuristic | a card inside a card: two nested rounded boxes with a fill, border or shadow, the inner one holding 3+ words | boxes under 120×60 px, full-width bands, links and buttons are not counted |
| `fake-send` | high | heuristic | a form with no action whose script stops the submit and shows a success message with no request behind it; cannot be kept | reads inline and same-origin scripts; a page that calls fetch for something else passes |
| `email-close` | high | heuristic | an email sign-up in the footer or last section of a page whose job is not subscribe, join, attend, listen or visit | needs "job" in the bible; a form with 3+ fields, a message box, or a button that books, orders, enquires or starts is not a sign-up; a shop counts: footer email only when the user asked |
| `stock-palette` | high | heuristic | the default "premium" looks: near-black + ivory + gold, or cream + terracotta + a serif | reads the body colours, the first coloured button or link, and the h1 face; a page painted section by section may read as white |
| `stock-font` | high | heuristic | the h1 set in Inter, Roboto, Open Sans, Poppins, Lato, Arial, Helvetica or a system face | first family of the h1 only; such a face as quiet text under a chosen display face is fine |
| `sameness` | high | heuristic | the page matches one of your last 3 Darkroom projects on palette, or on 4 of 7 axes (palette, display face, text face, hero composition, ending, section count, style pack) | compares finished audits on this computer (~/.darkroom/builds.json), never the same project; projects never audited since 1.9 are unknown to it |
| `spacing-scale` | high | measured | padding, margin and gap in the stylesheets written off the scale (2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120, 144, 176 px, or the page's own --space-* tokens). Up to 3 small nudges of 6 px or less are low; a raw value where a token exists is medium | same-origin stylesheets, px and rem; values through var(), em, % and vw are not read; WordPress core and plugin styles are skipped |
| `spacing-drift` | high | measured | the same kind of gap rendered at nearly the same size (3 to 6 px apart): heading to line, line to button, button to button, section padding, repeated items, button heights | siblings in normal flow at rest; a difference over 6 px is taken as a decision; desktop and phone |
| `align-edge` | high | measured | a near miss: text and pictures in one section, section headings, nav and footer, or items in a row that start 2 to 8 px apart | left-aligned, untransformed blocks at rest; a larger offset is taken as a decision; optical alignment of letter shapes is not judged |
| `control-height` | high | measured | a field and the button beside it differ in height by more than 1 px | inputs and selects with a button at the same height in the form or parent |
| `label-wrap` | high | measured | a button label or nav link breaks onto two lines | desktop, the 1280 pass and phone |
| `crowded-head` | high | heuristic | a heading closer to what comes before it than to what it heads (space above under 0.75× the space below, and 12 px or more short) | h2 to h4 in flow, with siblings on both sides; heads in a box under 200 px tall are exempt |
| `cramped-box` | high | heuristic | text in a filled or side-bordered box closer than max(8 px, 0.5 em) to its side or max(4 px, 0.3 em) to its top, or running text within 8 px of the phone edge | boxes over 100×30 px whose own text node is measured; links and buttons are not counted |
| `sticky-clash` | high | measured | two sticky bars at the top of the page: they cover each other | sticky elements under 200 px tall at top 0 |
| `hero-fit` | high | measured | the headline, its line or the action falls below the fold at 1280 × 800 | the section holding the h1; a hero with no paragraph or button is judged on what it has |
| `wide-cap` | high | measured | at 1920 px, text within 120 px of the screen edge (no capped container) or a paragraph over about 85 characters a line | left-aligned h1, h2 and p in flow; pictures may bleed; about 0.5 em per character |
| `skeleton` | high | measured | while pictures, film frames and data are held back: a picture with no box or nothing standing in its place, a film canvas blank, data that arrives into a hole, or text that jumps (shift over 0.1). Also a video with no poster, a first-screen picture on lazy load, pictures with no width and height | one desktop load with every image, media and fetch request held about 1 s; a colour field, a picture or [data-skeleton] counts as standing in; a shift of 0.1 is this worst case, not a field vital |
| `slop-count` | high | heuristic | 3 or more different generated-design tells on one page (the tell checks above, plus glass-caption and copy); tells listed in the bible keepTells are not counted | counts kinds of tell, not how bad each is; fewer than 4 is reported as info |
| `film-headline` | medium | heuristic | first screen only: the h1 sits over full-bleed media (video, canvas or an image covering half the screen) and is smaller than 48 px desktop / 32 px phone | later chapters may use subtitle-size text by design; media is found by size and overlap, not by looking at the picture |
| `first-scroll-weight` | high | measured | bytes on the wire before the visitor scrolls (desktop, default motion, ~2 s after load, empty cache): > 4 MB medium, > 8 MB high | Chromium network counters; media still streaming after 2 s is counted only up to then; a page served locally has no compression from a CDN |
| `chain-seam` | medium | measured | chained clips (<video data-chain="name">, in page order): the last frame of one clip and the first frame of the next differ by more than 6 % (mean absolute difference): the film jumps at the join | needs ffmpeg; one frame at each end compared at 96×54; frame sequences are checked when joined (darkroom media chain), not here |
| `copy` | high | heuristic | genre words (unlock, seamless, robust, empower, ...) | English only |
| `urgency` | high | heuristic | urgency / pressure copy | English only; a real dated deadline is legitimate |
| `page-length` | high | heuristic | > 1200 visible words; skipped for surface "read" | — |
| `colour` | medium | heuristic | UI hue families / accent share vs colour mode | imagery is hidden before measuring; computed colours only |
| `contrast` | high | measured | text contrast from rendered pixels with effective alpha; per viewport | varying backgrounds (photo, video, gradient) are reported as medium with the worst-case ratio; check the lightest video frame by eye; decorative ghost type (64 px or more, not a heading, and aria-hidden or under 35 % opacity) is skipped |
| `lang` | high | measured | <html lang> missing | — |
| `headings` | high | measured | h1 count != 1 (high), level skips (low) | — |
| `alt` | high | measured | img without alt attribute | alt quality is not judged |
| `labels` | high | measured | form control without a resolvable label | simplified accessible-name computation |
| `names` | high | measured | link/button without a resolvable accessible name (aria-labelledby ids must exist and have text) | simplified accessible-name computation, not the full W3C algorithm |
| `skip-link` | low | measured | no skip link as first in-page link | — |
| `keyboard` | medium | measured | Tab traversal: stops with no visible focus change (high when at least half, and 3 or more, have none) | first 40 stops; custom widgets needing arrow keys are not exercised |
| `reduced-motion` | high | measured | under prefers-reduced-motion: infinite/long CSS or Web animations or playing video still running | cannot observe scroll-linked canvas or GSAP scrubs: use capture --both |
| `third-party` | high | measured | tracker/CDN-font hosts requested before any consent action | host list is a regex of known trackers |
| `price` | info | heuristic | price strings found (currency-bearing only) | a price without a currency sign is not detected |
| `disclosure` | high | measured | required disclosure text missing | exact text match after whitespace/case folding |
| `console` | high | measured | console errors / page errors / failed requests | — |
| `config` | medium | measured | settings document missing, unreadable, or without a darkroom block | — |

## How the harder checks work

- **Contrast** is measured on rendered pixels. Text is made transparent and the page photographed; the ink colour is resolved by the browser (so `oklch()`, `color-mix()` and alpha work) and composited over the real pixels behind each text line, with ancestor opacity applied. Gradients, translucent panels and photos are part of the measurement. If the background varies a lot under a text, the finding is **medium / manual** and shows the worst-case ratio: check it against the lightest frame of any video by eye.
- **Accessible names** resolve `aria-labelledby` ids (they must exist and contain text), `aria-label`, `<label>`, content, `alt`, SVG `<title>`, `title`. This is a simplified version of the W3C algorithm, not the whole of it.
- **Reduced motion** is judged by behaviour, not by whether a CSS rule exists: with the preference on, are infinite or long animations or videos still running? Scroll-linked canvas/GSAP motion is invisible to this check, so pages using it get a *manual* finding. Test them with `capture --both`.
- **Keyboard**: Tab through the first 40 stops; a stop whose computed outline/box-shadow/colours do not change on focus has no visible indicator.
- **Visible text** means rendered, on the page, not collapsed, not clipped to 1 px, not pushed off the page origin, not `opacity:0` (including ancestors).
- **Spacing** reads the stylesheets (`spacing-scale`) and the rendered page (`spacing-drift`): gaps are grouped by kind (heading to line, line to button…) and two sizes 3–6 px apart are a slip, so 24 against 28 fails even when both are written as tokens. Hallmark's own check only tests multiples of 4; this one uses the named scale.
- **Skeleton** loads the page once with every image, media and fetch request held about a second, and looks at what stands in their place.
- **Generated-design tells** (`gradient-text` to `slop-count`) read computed styles, same-origin stylesheets and visible text on the desktop pass. Unlike word counts they include `aria-hidden` decoration (a purple blob is seen even when screen readers skip it); only `[data-darkroom-ignore]` hides an element from them. Tiers: `placeholder`, `proof` and `css-motion` are floor (high, cannot be kept); `ai-gradient`, `emoji-icon` and `fake-chrome` are high but a design may keep them with a reason; the rest are medium from the first one, except one accent word in the hero (low) and a single stock label (low). Three different tells on one page are `slop-count` high. A tell in the bible's `keepTells` is info.
- **Words** are counted once, one way: visible text outside `[data-darkroom-ignore]` and `aria-hidden="true"` subtrees. Use those markers only for genuinely decorative or duplicated content; never to make an audit pass.

## First paint, video, display font and rest state

The default-motion pass loads the page once more and photographs it **~350 ms** after the document is ready, then again after it settles: a first screen that is almost one colour and far from the settled one (ΔE > 10) is a white flash or a lost first frame. At 1.5 s the h1 must be visible. At 2 s, and again in a load with JavaScript **disabled**, no text in the first viewport may sit at opacity < .05 or visibility hidden (the rest state shows the content; entrances only decorate it). Autoplay videos must have a frame (readyState ≥ 2), be playing and have no media error; when the test browser cannot decode H.264 the finding is info, not a page bug. The h1's font must have loaded when the page declares it. Overflow names up to five outermost elements past the right edge.

## Limits

- Heuristics are not verdicts. Word counts, zone clustering and colour share cannot judge taste. Follow with `/darkroom critique` and the eyes.
- Page weight in `study` is a lower bound: cached, cross-origin and zero-size entries are not measurable (`unmeasured` is reported).
- No LCP, CLS or INP field vitals are measured. The layout shift in `skeleton` is the worst case with every request held back, not a vital.
- Interaction states (menus, modals, hover) are not audited; capture them with `capture --states`.

## Then

Read the JSON, group by severity, fix highs, re-run. Only the user's words keep a hard rule (`keepTells`, `references/tells.md`). When the audit script itself changes, the maintainer's regression suite (kept outside the public repository, not shipped with the skill) must stay green.
