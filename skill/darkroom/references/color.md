# Colour

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

## Defaults that read as generated (avoid unless chosen with a reason)

Violet/indigo gradients; near-black with one neon accent and glow; cream + terracotta/rust; gradient text; every button a different colour; rainbow charts.
