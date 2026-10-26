# Image-model prompts (optional tool, not a required step)

Image models (ChatGPT image generation, Midjourney, Firefly, Flux…) are the user's way of producing what Claude cannot: photography-grade plates, product renders, atmosphere, short clips. They are **not** the default way to explore layout or type: a coded comp (`commands/style.md`) uses the real fonts, copy, grid and responsive behaviour, and a generated whole-page mockup has painted pseudo-text and cannot be resized.

## When a prompt is worth writing

| Use | When |
|---|---|
| `plates` | production imagery with no UI: clean plates, product masters, turntables, clips (`commands/plates.md`, `prompts/clean-plate.md`, `product-master.md`, `video-clip.md`) |
| `direction` | the look turns on imagery you cannot code (a mood, a grade, a material); one image per direction, same content (`prompts/direction-board.md`) |
| `anchor` | **optional**: a single "truth image" for a reference-led project or a product whose identity must stay consistent across many generated frames (`prompts/anchor-hero.md`) |
| `section` / `mobile` | only when a generated frame is needed for a scene's imagery, derived from the anchor with the continuity lock (`prompts/section-frame.md`, `mobile-frame.md`) |
| `component` | 3 variants of one hard-to-imagine element (`prompts/component-variants.md`) |
| A/B experiment | when unsure whether something looks good: 2–3 images isolating one variable, everything else identical |

If the user has no image tool, none of this is required: use the ladder in `commands/plates.md`.

## How to write the prompt

1. Fill the template from the bible: palette roles, a description of the letterforms (image models cannot load fonts: "light extended geometric sans, double-storey a"), the grid ("headline in the left 36 %"), the focal object, light, lens, grade, and what is forbidden.
2. Include the real (short) copy so composition reflects true text length.
3. State the frame: `1672×941 desktop` or `1170×2532 mobile`; for plates, the aspect ratio and the resolution you need.
4. For section/mobile frames prefix the **continuity lock**: "Same website as the attached anchor image: identical product, typeface, nav, grid, colour grade and lighting. Only the section content changes."
5. Tell the user to **attach the anchor** in the same conversation, and to start a fresh chat with the anchor every ~5 images (long sessions drift).

## Hand-off message (one batch, ranked)

```
Prompt 1/3 — hero-plate (blocking)  → save as assets/raw/hero-plate.png
<prompt in a code block>
Attach: anchor.png   ·   Accept if: …   ·   Reject if: …   ·   Fallback: …
```

Save the prompts in `.darkroom/prompts/<date>-<mode>.md`. Then continue building on placeholders; review returns with `commands/refs.md`.
