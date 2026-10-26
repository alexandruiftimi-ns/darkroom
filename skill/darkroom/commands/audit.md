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
| `reading-zones` | high | heuristic | text zones in the first viewport (> max+1 high, > max medium) | first viewport only; zones are clustered by distance |
| `eye-travel` | medium | heuristic | reading path crosses the viewport > 2x | document order is assumed to be reading order |
| `corners` | medium | heuristic | content in 3+ viewport corners | — |
| `overflow` | high | measured | page wider than the viewport | initial state only |
| `target-size` | medium | measured | crowded interactive targets < 24x24 CSS px (WCAG 2.5.8 with spacing exception) | inline-in-sentence links exempt |
| `headline-length` | low | heuristic | headline > 8 words | — |
| `word-budget` | high | heuristic | visible copy words vs section budget (> 2x high, > 1x medium); skipped for surface "read" | excludes [data-darkroom-ignore] and aria-hidden subtrees; section boundaries are guessed from markup |
| `copy` | medium | heuristic | genre words (unlock, seamless, ...) | English only |
| `urgency` | high | heuristic | urgency / pressure copy | English only; a real dated deadline is legitimate |
| `page-length` | high | heuristic | > 1200 visible words; skipped for surface "read" | — |
| `colour` | medium | heuristic | UI hue families / accent share vs colour mode | imagery is hidden before measuring; computed colours only |
| `contrast` | high | measured | text contrast from rendered pixels with effective alpha; per viewport | varying backgrounds (photo, video, gradient) are reported as medium with the worst-case ratio; check the lightest video frame by eye |
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

## Limits

- Heuristics are not verdicts. Word counts, zone clustering and colour share cannot judge taste. Follow with `/darkroom critique` and the eyes.
- Page weight in `study` is a lower bound: cached, cross-origin and zero-size entries are not measurable (`unmeasured` is reported).
- No LCP/CLS/INP is measured here; do not claim vitals from this audit.
- Interaction states (menus, modals, hover) are not audited; capture them with `capture --states`.

## Then

Read the JSON, group by severity, fix highs, re-run. Medium/low need a reason in the bible's exceptions log if kept. The suite in `tests/` of the Darkroom repository (`node tests/run-evals.mjs` (in the Darkroom repository)) must stay green when the script changes.
