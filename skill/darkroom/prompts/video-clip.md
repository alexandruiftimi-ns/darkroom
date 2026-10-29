# Prompt template — short clip for scroll scrubbing (Kling, Runway, Veo, etc.)

Use start/end keyframes from the product master or clean plates when the tool supports them. State whether it does; don't assume.

```
<3–5>-second ultra-photoreal shot. <Subject> in <environment>, lighting <…>, grade <…>.
Motion: <ONE motion: "the object rotates around its vertical axis from rear three-quarter to front" | "the camera moves slowly forward into the visor until the reflected city fills the frame">.
Camera: <locked | slow dolly forward>, no zoom, no cuts, no shake.
Keep geometry, materials and logo placement identical throughout. Constant speed, smooth.
No text, captions, UI, hands, extra objects, people, flashes, morphing.
Edges fall off to flat <ground hex> on all sides. Empty negative space in the <left 45 % | top 40 %> for the full clip.
Single continuous shot, nothing enters or leaves the frame. <For a background loop: the last frame matches the first.>
```

The edge, empty-zone and no-cuts lines are required for any hero or background clip (`references/hero-media.md`).

After: extract frames (`commands/plates.md` pipeline), inspect adjacent frames for drift, log the attempt (tool, cost, accepted/rejected + reason). Two failures → switch to a coded transition.
