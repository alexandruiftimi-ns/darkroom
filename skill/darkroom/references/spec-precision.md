# Spec precision: write every value down before the code

Values invented while typing code are where average pages come from. Before building a slice or a section, write `BUILD_SPEC.md` (`templates/BUILD_SPEC.md`), then build exactly that. Before writing it, open `examples/INDEX.md` and read the **two closest** examples in full (by motion level, then pack, then surface) and match their density. Borrow structure and precision, never their copy, brand or layout.

## Rules

1. **No adjective stands alone.** "Cinematic", "premium", "soft", "smooth", "glassy", "modern", "clean", "sleek", "bold" must be followed by the values that produce them: `cinematic = ground #0b0d10, one key light from top-left in the footage, H1 300 weight at clamp(56px,8vw,128px), 1.8 s media settle`.
2. **Every visible element gets a full style line:** font, size per breakpoint, weight, leading, tracking, colour + opacity, box, motion. Colours as tokens with opacity steps (100 / 80 / 60 / 40).
3. **Every motion gets** trigger, delay, duration, easing, from → to. Stagger formulas are written out (`delay = 0.3 + i × 0.12 s`). Reduced motion says what shows instead.
4. **Positions and grids are explicit:** `grid-template-columns: 5fr 7fr`, `bottom: clamp(32px,6vh,72px); left: var(--gutter)`.
5. **Verbatim blocks** for anything that must be exact (material, keyframes, scrim gradient, reduced-motion block).
6. **Real copy.** Every headline, label and CTA is written out. No `Lorem`, no `[Headline]`. Facts the user has not given are marked `TEMP` and asked for.
7. **Length:** 600–1,200 words for a hero slice, 1,200–2,500 for a page. Precision is never trimmed to save space; repetition is.
8. **Constraints last:** the spec ends with a "Do not" list.

## Consistency pass (before coding)

- Every asset exists or is a marked `TEMP` row with a fallback.
- No element carries two conflicting values (two sizes, two delays).
- Every "do not" agrees with the assets and the layout (no "no overlay" next to a scrim row).
- Every font named is loaded, in the weights used, and nothing else is loaded.
- The page ground equals the hero media's edge colour (`references/hero-media.md`).
- One signature; at most one heavy technique; never more than three motion hooks in one viewport.
- Values agree with the pack (`styles/<pack>.md`) and the bible; where they differ, the pack wins and the spec says why.

## The bare-adjective lint

`darkroom spec <BUILD_SPEC.md|folder>` flags `premium | cinematic | smooth | nice | modern | clean | sleek | elegant | stunning | beautiful` when no digit, `#`, `px`, `ms`, `em`, `%` or `vw` follows within 80 characters, and lists missing sections (heuristic: it reads words, not intent). Fix by adding the values, not by deleting the word.
