# Build: the slice, then the build-out (stages 2 and 4)

Build the **vertical slice first**, show it (checkpoint B), then build the rest in one pass. Do not stop for per-section approval.

## 0. Before code

- Direction approved (or fixed by the brief)? If not, go back to `commands/style.md`. The bible exists in concise form (`commands/bible.md`).
- Existing codebase: inspect the structure, stack, scripts; do not scaffold over it. Empty folder: the smallest fitting stack (plain HTML/CSS/JS; or Vite + a framework only if components or motion justify it). A scroll library only for scroll-driven scenes (the `recipes/` need none); Three.js only for true free 3D.
- Tokens first: CSS custom properties from the bible (colour roles, type scale, spacing). No hard-coded hex in components. Fonts self-hosted, `font-display: swap`, subset, never more families than the budget.
- Run the page through a local server (`darkroom capture <dir|file>` serves it; or the project's dev server).
- **Write `BUILD_SPEC.md` for the slice** (`templates/BUILD_SPEC.md`, rules in `references/spec-precision.md`). First open `examples/INDEX.md` and read the **two closest** examples in full (motion level, then pack, then surface); match their density, never their copy or layout. Values come from the bible, the pack and the Values tables (`references/typography.md`, `references/motion-craft.md`, `references/craft.md`, `references/color.md`); hero media follows `references/hero-media.md`. Run `darkroom spec BUILD_SPEC.md` and fix every high (missing section, signature, "Do not", placeholder, hotlink) and bare adjective. **Build exactly what the spec says; when reality differs, update the spec first** (as law 3 does for the bible). The spec is your working file, not an approval gate; it reaches the user only if they ask.

## 1. The slice (hero + its key interaction + the transition into the next section)

1. **Still first.** Real semantic HTML: landmarks, one `h1`, heading order, real buttons/links, alt text, skip link, `lang`. Compose to the approved comp/reference: copy anchor, focal point, crop, negative space. Mobile is a **re-composition** (re-order, re-crop, cut), not a squeeze. Local scrims only where contrast needs them. States: hover, `:focus-visible`, active, disabled; selection colour.
2. **Then the one motion**, chosen from the techniques that deliver the look the user asked for on their kind of site (`references/effects.md`), the cheapest of those, with the assets in hand or ordered through prompts, and the motion level (`references/modes.md`, `references/motion.md`, `recipes/`). Mode `animated`: copy `recipes/reveal.js` + `reveal.css` and mark groups with `data-reveal`; tune duration and travel to the pack. Reversible, cancelable, bounded, with the reduced-motion path built in the same pass (`references/motion-craft.md`).
3. **The transition into the next section.** Hard boundaries between sections are where cheap sites show; build it now.
4. Assets missing: use an honest placeholder marked `TEMP` in `ASSETS.json`; never fake motion with a still; send the asset ask now (`commands/plates.md`).

## 2. Auto-QA loop (yours; no user involvement)

```
capture (both motion modes, desktop + phone, scene progress for scrubbed parts)
→ look (sheet first, then 1:1 crops of the first frame, the text zone, the product edge)
→ write defect records (state / observed / impact / change / re-check)
→ patch a related batch of 2–4 → recapture and compare with the previous capture
→ audit once the visual state is stable
```

Judge the captures through the ten lenses (`references/critique-method.md`); the bar there is the finish line, and every fix lands in `BUILD_SPEC.md` before the code. Stop when the acceptance points are met, or when two passes in a row show no material improvement: present the best result and the trade-off as a concrete choice. Keep the last acceptable revision (a commit or a copy) before a risky visual change. After every fix check that the target improved and nothing accepted regressed (other viewports, reduced motion). Fix every **high** audit finding; keep a medium only with a one-line reason in the bible's exceptions log.

Acceptance for the slice: matches the approved composition (documented differences only) · no high audit findings · keyboard usable with visible focus · phone composed, not squeezed · reduced-motion path works · scrub, reverse, fast wheel and resize behave · frame sequences show one whole frame at a time at full opacity, never two blended (`recipes/README.md` rule 6b) · a fast fling down and back up on a phone plays through the film without flashing far-away frames, and the page never moves its own scroll (audit `scrub-fling`, `scroll-glide`; rules 2, 6, 6a; a hand-written scrubber is held to the same rules) · no console errors · assets logged · text readable over the *worst* frame of any media.

## 3. Checkpoint B

Show the user the live preview (already running, law 10), the sheets for desktop / phone / reduced motion, the decisions made, remaining asset constraints and known gaps. Ask approve / adjust (`AskUserQuestion`). Record with `darkroom state --approve slice`. Do not ask the user to run commands.

## 4. Build-out

First extend `BUILD_SPEC.md` with every remaining section in one pass (same density as the slice; `darkroom spec` again). Then use the approved system for the remaining sections in storyboard order (`commands/storyboard.md` is an internal plan). Establish the whole page's rhythm early: neighbouring sections must not share a layout family; carry the idea into every section including footer and closing. Run the QA loop per scene, then check the page as a whole (transitions; something changes each viewport) before verifying.

**Multi-page sites:** build every page in the bible's page list (from `.darkroom/import/url-map.json` when the site was imported), not only the home page. With `scope=home` or `page:…`, build that page, show it, and ask whether to build the rest (`commands/concierge.md`). Before the handoff, tick the page list: built, merged (into which page) or left out (why, and who decided). Then `commands/handoff.md`.

## Never

Build every section in one unlooked-at pass · code a value the spec does not hold (write it into the spec first) · end a multi-page job with pages silently missing · stop to ask whether a visible defect should be fixed · scaffold over existing work · ship a concept image as UI · wait for approval of the bible before there is anything to look at.
