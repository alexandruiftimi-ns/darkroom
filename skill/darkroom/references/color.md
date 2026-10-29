# Colour

## Asking about colour (intake, one question)

Ask in the first question round unless the brief already settles it: **"How should we pick the colours?"**

| Answer | `--set palette=` | What Darkroom does | Audit `colorMode` |
|---|---|---|---|
| **I have a palette / brand colours** | `own` | ask for the hex codes or the brand guide; assign each colour a role (ground, ink, accent…); check contrast and say which pairs fail and the nearest passing shade | as the palette suggests, usually `disciplined` |
| **Suggest some** (recommended when they have none) | `suggested` | propose **three palettes** drawn from the subject (product, place, materials, light), each as swatches with role names and one line on the feeling; render the hero in the favourite if they hesitate | per palette |
| **Classic and calm: 60-30-10** | `60-30-10` | about 60 % ground, 30 % structure, 10 % one accent for the main action; explain it in one line ("most of the page is calm, one colour points at the button") | `disciplined` |
| **Creative: anything goes** | `creative` | colour fields, colour-blocking, several saturated hues each owning a section; contrast and one consistent button style still apply | `expressive` |
| **Black and white, maybe one colour** | `monochrome` | ink, paper and at most one functional accent | `monochrome` |

Show palettes as rendered swatches with hex codes (a quick HTML swatch sheet captured with `darkroom capture`, or the coded hero), never as hex lists alone. Record the choice (`darkroom state --set palette=…`) and the final hex values with roles in the bible. On platforms with settings (Shopify, WordPress), the palette becomes the editable defaults (`platforms/README.md`).

## Three modes (set in BRIEF, enforced by audit)

| Mode | When | Rules |
|---|---|---|
| **disciplined** | Premium, luxury, tech, trust, most commerce | ~60 % ground (neutrals), ~30 % structure (text, secondary family), ~10 % accent. **One** accent hue in UI; CTAs share it. Saturated colour lives in imagery, not chrome. |
| **expressive** | The user asks for colour; art, artsy, kids, festival, food, fashion campaigns | Colour fields and colour-blocking allowed; several saturated hues may each own a section. Still: one dominant per viewport, text contrast passes, CTA style consistent, a neutral to rest the eye. 60-30-10 is **not** applied. |
| **monochrome** | Editorial, architecture, gallery, brutalist | Ink + paper + at most one functional accent (links/state). Imagery may carry colour. |

60-30-10 is a proportion heuristic from interior design — useful in disciplined mode, not a law (`myths-and-facts.md`).

## Colour from the media (library rule)

The strongest pattern across the example library (20+ award sites and mockups, `library/LESSONS.md`): when photography, footage or the work carries saturation, the UI is ground + one ink, plus at most **one** accent with **one job** (action, or the key figure) — ideally taken from the product itself (an LED, the packaging), never sampled for decoration. Holds in disciplined and monochrome modes; in expressive mode it applies per viewport.

## Building a palette

1. **Separate UI palette from media palette.** Don't sample six hex codes from a sunset photo and make them buttons.
2. Name roles, not colours: `ground`, `surface`, `ink`, `ink-2`, `accent`, `accent-ink`, `line`, `focus`, plus state colours if needed.
3. Contrast pairs: body ink on ground ≥ 4.5:1, large text ≥ 3:1, UI components and focus ring ≥ 3:1 against neighbours. Tint secondary text from the ground's hue instead of flat grey.
4. Dark themes: ground not pure #000 (use a hue-tinted near-black), `color-scheme: dark`, `theme-color` meta.
5. Choose light vs dark from the **use scene** (who, where, what light), not the category.

## Values (defaults)

- **Ground = the hero media's edge colour.** When the hero is a photo or a clip, sample its outer edge and make that `--ground` (`references/hero-media.md`): no seam, no overlay, no white flash. If the media must change, change the ground with it.
- **Opacity hierarchy** instead of more greys: ink at 100 / 80 / 60 / 40 % for headline / body / secondary / disabled; lines and borders at 10–20 % of ink.
- **HSL-triplet tokens** when opacity steps are needed: `--ink: 40 12% 94%` then `color: hsl(var(--ink) / .6)`. Hex tokens are fine when no step is needed.
- Starting points, not rules: near-blacks `#050505–#0c0c0c`, off-whites `#f0f0ee–#fcfcfc`. A pack that prefers hue-tinted grounds (cinematic: `#080B13`) keeps its own word.

## Defaults that read as generated (avoid unless chosen with a reason)

Violet/indigo gradients; near-black with one neon accent and glow; cream + terracotta/rust; gradient text; every button a different colour; rainbow charts.
