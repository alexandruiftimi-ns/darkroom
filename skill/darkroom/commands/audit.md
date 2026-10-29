# /darkroom audit — measurable checks

```bash
node <skill>/scripts/darkroom.mjs audit <url | dir | file.html> [--bible file] [--fonts 3] [--mode disciplined|expressive|monochrome] [--json .darkroom/qa/audit.json] [--dismiss]
node <skill>/scripts/darkroom.mjs checks          # the registry below, from the code
```

Local directories and files are served over `http://127.0.0.1` first (never `file://`). Before measuring, the audit scrolls through the page once and back to the top, so text that fades in on scroll (`reveal.js`, ScrollTrigger, AOS) is revealed and measured; reveals that hide again when scrolled away are not seen. The page is loaded at desktop (1440) and mobile (390) widths under `prefers-reduced-motion: reduce`, plus one default-motion pass used only to compare animation. Every finding carries a severity and a **basis**:

- **measured**: read from the rendered page (pixels, computed state, behaviour).
- **heuristic**: a rule of thumb applied to measurements. A kept exception is legitimate; log it in the bible.
- **manual**: the script cannot decide. Someone has to look.

Settings (font budget, colour mode, word budgets, `surface`, disclosure) come from the first of: `--bible`, the `config` path in `.darkroom/project.json`, `.darkroom/settings.json`, `DESIGN_BIBLE.md`, `PROJECT_BLUEPRINT.md`, `DESIGN.md`. The output names the file it used, and a `config` finding appears when none was found. `surface: "read"` skips word budgets and the page-length limit (articles, documentation); the default is `landing`.

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
| `video-playback` | high | measured | autoplay <video> not playing after load: error, readyState < 2 or paused; codec gaps of the test browser reported as info | videos with the autoplay attribute, or inside a `[data-video-layer]` (`recipes/video-layer.js`); other JS-started videos are not checked |
| `loop-seam` | medium | heuristic | a video that loops natively (`loop` attribute) whose first and last frames differ by more than 6 % (mean absolute difference): a visible jump on every loop. Fix: `recipes/video-loop.js`, `darkroom media boomerang`, or `media web --loop crossfade` | needs ffmpeg (else reported as not measured); one frame at each end at 96×54; videos with `data-video-loop` are skipped |
| `frame-blend` | high | measured | while scrolling with default motion, a full-size image is drawn on a canvas at partial opacity (`globalAlpha` between 0.03 and 0.97): one frame shows through another (ghosting). Fix: one whole frame per draw at full opacity; smoother motion = more frames (`recipes/README.md`, rule 6b) | 2D canvas `drawImage` only (not WebGL, OffscreenCanvas or stacked `<img>` layers); one scroll pass from top to bottom; canvases inside `[data-frame-blend="allow"]` are skipped; a canvas drawn onto a canvas (trails, feedback buffers) is not a film frame and is not counted |
| `scrub-fling` | high | measured | phone view with the CPU slowed 4×: fast flings down a canvas frame scene, back up, down and up again (the scroll changes direction 3 times); fails when the painted film changes direction 6+ times: far-away frames flash on fast scrolls and when scrolling back up. Fix: show the closest decoded frame between the one on screen and the wanted one, keep fetched frame bytes in memory, decode ahead in the direction of travel, cap the speed (`recipes/scrub-frames.js`; `recipes/README.md` rules 6, 6a) | frames are identified by the number at the end of their file name (fetch → createImageBitmap, or an `<img>` drawn on a 2D canvas); the scene is the nearest ancestor of that canvas at least 1.5 viewports tall; CPU throttling is Chromium-only |
| `scroll-glide` | high | measured | in a canvas frame scene, the page moves its own scroll by more than 30 px within 1.5 s after the scroll comes to rest (snapping or gliding to a "breaking point"): it fights touch momentum and reads as a glitch. Fix: free scroll; hold the film on chosen frames instead (`holdAt` in `recipes/scrub-frames.js`; `recipes/README.md` rule 2) | one rest position at 37 % of the scene; CSS scroll-snap counts too; only runs on pages where a canvas paints numbered frames |
| `display-font` | high | measured | the h1's first font-family is declared (@font-face) but no face of it loaded: the headline shows in a fallback | undeclared system fonts are reported as info |
| `motion-rest` | high | measured | text in the first viewport at opacity < .05 or visibility hidden 2 s after load, and again with JavaScript disabled (high if the h1 or 3+ items, else medium) | first viewport only; closed menus layered over the hero can be reported; waiting slides (a hidden layer next to a visible sibling of the same kind, e.g. a carousel) are not counted |
| `target-size` | medium | measured | crowded interactive targets < 24x24 CSS px (WCAG 2.5.8 with spacing exception) | inline-in-sentence links exempt |
| `headline-length` | low | heuristic | headline > 8 words | — |
| `word-budget` | high | heuristic | visible copy words vs section budget (> 2x high, > 1x medium), and single text blocks (paragraph, list item, quote, caption) over 60 words (medium); skipped for surface "read" | excludes [data-darkroom-ignore] and aria-hidden subtrees; section boundaries are guessed from markup |
| `dead-scroll` | high | measured | default motion, desktop: the document scrolled in half-screen steps; more than 2 screens of scroll in a row where the picture barely changes (< 1.5 % of pixels): nothing new to see or read (> 2 medium, > 4 high). Fix: shorten pinned stretches, give each screen something new (a frame, a line, a change) | compares 96×60 thumbnails 250 ms after each step; slow ambient motion counts as no change; pages that do not scroll the document are skipped |
| `glass-caption` | medium | heuristic | the same frosted caption card (backdrop blur, 3+ words) in 3 or more sections: an AI-film tell (`references/tells.md`). Fix: vary the text treatment by chapter, or one fixed card as a reading anchor | backdrop-filter blur only; cards inside one section (a grid) count once |
| `phone-gate` | high | heuristic | the phone view (390 px) shows a gate instead of the page ("best viewed on desktop", "rotate your device", "not available on mobile"). Fix: build the phone version | English, German, French and Spanish phrases; a gate drawn as an image is not detected |
| `film-headline` | medium | heuristic | first screen only: the h1 sits over full-screen media (video, canvas, or an image covering half the screen) and is under 48 px desktop / 32 px phone. Later chapters may use subtitle-size text | media is found by size and overlap, not by looking at the picture |
| `first-scroll-weight` | high | measured | bytes on the wire before the visitor scrolls (desktop, default motion, ~2 s after load, empty cache): > 4 MB medium, > 8 MB high. Fix: load the first chapter, fetch the rest as the visitor approaches (`references/scroll-film.md`) | Chromium network counters; media still streaming after 2 s is counted up to then; a locally served page has no CDN compression |
| `chain-seam` | medium | measured | chained clips (`<video data-chain="name">`, in page order): the last frame of one clip and the first frame of the next differ by more than 6 %: the film jumps at the join. Fix: make the next clip from the extracted last frame, one model per chain, or crossfade (`references/scroll-film.md`) | needs ffmpeg; one frame at each end at 96×54; frame sequences are checked when joined (`darkroom media chain`) |
| `copy` | medium | heuristic | genre words (unlock, seamless, ...) | English only |
| `urgency` | high | heuristic | urgency / pressure copy | English only; a real dated deadline is legitimate |
| `page-length` | high | heuristic | > 1200 visible words; skipped for surface "read" | — |
| `colour` | medium | heuristic | UI hue families / accent share vs colour mode | imagery is hidden before measuring; computed colours only |
| `contrast` | high | measured | text contrast from rendered pixels with effective alpha; per viewport | varying backgrounds (photo, video, gradient) are reported as medium with the worst-case ratio; check the lightest video frame by eye; decorative ghost type (64 px or more, not a heading or control, aria-hidden or under 35 % opacity) is skipped and listed for a look by eye |
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
- **Words** are counted once, one way: visible text outside `[data-darkroom-ignore]` and `aria-hidden="true"` subtrees. Use those markers only for genuinely decorative or duplicated content; never to make an audit pass.

## First paint, video, display font and rest state

The default-motion pass loads the page once more and photographs it **~350 ms** after the document is ready, then again after it settles: a first screen that is almost one colour and far from the settled one (ΔE > 10) is a white flash or a lost first frame. At 1.5 s the h1 must be visible. At 2 s, and again in a load with JavaScript **disabled**, no text in the first viewport may sit at opacity < .05 or visibility hidden (the rest state shows the content; entrances only decorate it). Autoplay videos must have a frame (readyState ≥ 2), be playing and have no media error; when the test browser cannot decode H.264 the finding is info, not a page bug. The h1's font must have loaded when the page declares it. Overflow names up to five outermost elements past the right edge.

## Limits

- Heuristics are not verdicts. Word counts, zone clustering and colour share cannot judge taste. Follow with `/darkroom critique` and the eyes.
- Page weight in `study` is a lower bound: cached, cross-origin and zero-size entries are not measurable (`unmeasured` is reported).
- No LCP/CLS/INP is measured here; do not claim vitals from this audit.
- Interaction states (menus, modals, hover) are not audited; capture them with `capture --states`.

## Then

Read the JSON, group by severity, fix highs, re-run. Medium/low need a reason in the bible's exceptions log if kept. The suite in `tests/` of the Darkroom repository (`node tests/run-evals.mjs` (in the Darkroom repository)) must stay green when the script changes.
