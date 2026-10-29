# Hero media: what makes a background photo or clip work

A hero clip "needs no overlay and never flashes" when it was chosen or ordered for the page, not found and covered with a wash. These rules apply to the user's own files, to generated ones (`prompts/`) and to free ones (`references/free-media.md`). They are suggestions at intake (`darkroom assets intake` never rejects) and requirements in Darkroom's own prompts.

## The rules

1. **Edge colour = page ground.** The media's edges fall off to one flat colour, and that colour becomes `--ground` (`references/color.md`, Values). No seam where the media ends, no overlay, no flash while it loads (the poster and the ground match).
2. **An empty zone.** A calm area where copy sits for the **whole** loop: the left 40–45 %, the top 35–40 % or a bottom band. Nothing bright or busy crosses it. The spec's assets table records it (`templates/BUILD_SPEC.md` §6).
3. **One subject, one continuous shot, no cuts.** Slow motion only: an orbit, a drift, a float, a push-in. Nothing enters or leaves the frame.
4. **Loopable.** The last frame matches the first, or the loop is masked: a rAF opacity fade near the end, a boomerang (played forward then backward), or a crossfade between two clips.
5. **Restrained palette:** 2–3 hues plus one luminous highlight; one grade across all clips of the page.
6. **No text, logos, UI or watermarks** in the footage. Baked text is rebuilt as DOM (SKILL.md, Safety).
7. **Paired stills are pixel-aligned:** the two images of a cursor reveal, the layers of a parallax, the day and night of a switch come from one camera position.
8. **Length and weight:** 6–12 s, 24 fps, no audio track, H.264 MP4 ≲ 8 MB at 1080p, a phone version at 720–960 px, a poster that equals the first frame.

## Archetypes that work

| Archetype | Good for | Empty zone |
|---|---|---|
| One object in a seamless void (dark or white), slow orbit | hardware, perfume, watches, ceramics | left or right half |
| Stylised character or object on a flat saturated backdrop | studios, apps, campaigns | top third |
| Painterly landscape, low horizon, tiny figure | travel, outdoor, culture, wellness | sky |
| Surreal minimal scene (one impossible thing, calm) | agencies, AI, music | the side opposite the object |
| Studio product on white seamless | shops, catalogs, beauty | left column |
| Nature b-roll as switchable moods (forest, coast, snow) | hotels, travel, retreats | bottom band |
| Abstract terrain or fluid with one rim glow | tech, finance, infrastructure | top 40 % |
| Process close-up (hands, tools, dough, clay) with shallow focus | restaurants, makers, craft | the blurred side |

## Placement

- Focal control with `object-position` per breakpoint, or oversize the media to 110–120 % and offset it top-aligned.
- On phones, re-aim (`object-position: 70% 50%`), use the phone clip with the subject re-framed, or move the media **below** the copy in a 1:1 or 4:5 frame. Never shrink the H1 to dodge the subject.
- Reserve the box (`aspect-ratio` or `inset: 0`) and paint the poster colour on it so a slow network shows the ground, not white.

## Writing it into prompts

Every image or video prompt Darkroom writes for a hero carries these lines (filled from the bible):

```
Edges fall off to flat <ground hex> on all sides; no vignette colour other than <ground hex>.
Empty negative space in the <left 45 %> for the full clip: nothing bright or detailed there.
Single continuous shot, <locked | slow orbit | slow push-in> camera, no cuts, nothing enters or leaves the frame.
Loopable: the last frame matches the first.
Palette: <2–3 hues> plus one highlight of <accent>. No text, no logos, no UI, no watermark.
```

## When no hero media exists

Say what each fallback can and cannot do: a type-led first screen, a drawn-in-code backdrop (`darkroom media make <preset> --colours <ground>,<ink>,<accent> --empty <zone>`; presets: gradient-mesh, light-sweep, aurora, particles, topo-lines, noise-terrain, orbit-rings, fluted-glass, and stills grain, halftone, dot-grid. Pick by subject: orbit-rings for a network or community, topo-lines for maps, land and outdoors, noise-terrain for data and engineering, fluted-glass for beauty and interiors, aurora and gradient-mesh for calm brands; abstract only, it cannot show a product, place or person), free licence-clean footage (`references/free-media.md`, asks before downloading), or a generated clip from the prompts above. Mark whatever ships first as `TEMP`.

## Measuring and preparing what arrives

- `darkroom assets intake` now measures hero candidates (videos and wide pictures): the **edge colour** (suggested as `--ground`), the **calmest zone** for the words, and for videos the **loop seam** (first vs last frame). Heuristics on a small thumbnail: suggestions, never rejections. `darkroom media measure <file>` does the same for one file.
- `darkroom media sheet <folder>` makes a numbered contact sheet of every candidate (video first frames included). Look at it and pick by number instead of opening files one by one.
- `darkroom media web <clip> [--loop crossfade|boomerang] [--cutout]` makes the H.264 desktop copy, the phone copy and the poster in one go (no audio, faststart, ~8 MB budget) and reports edge colour, seam and calm zone. `darkroom media boomerang <clip>` makes a ping-pong copy that loops with no seam. `--cutout` also exports the first frame with its background removed (WebP with alpha, at most 500 KB) when a free remover (rembg) is already installed; otherwise it says which free tool would do it, and you ask before installing.
- Build the hero from `recipes/video-layer.js` (+ `video-loop.js` when the seam shows, `scrim.css` when there is no calm zone). The audit's `loop-seam` check catches a native loop that jumps.
