# Prompt template — short clip for scroll scrubbing (Kling, Runway, Veo, etc.)

Use start/end keyframes from the product master or clean plates when the tool supports them. State whether it does; don't assume.

```
<3–5>-second ultra-photoreal shot. <Subject> in <environment>, lighting <…>, grade <…>.
Motion: <ONE motion: "the object rotates around its vertical axis from rear three-quarter to front" | "the camera moves slowly forward into the visor until the reflected city fills the frame">.
Camera: <locked | slow dolly forward>, no zoom, no cuts, no shake.
Keep geometry, materials and logo placement identical throughout. Constant speed, smooth.
No text, captions, UI, hands, extra objects, people, flashes, morphing.
```

After: extract frames (`commands/plates.md` pipeline), inspect adjacent frames for drift, log the attempt (tool, cost, accepted/rejected + reason). Two failures → switch to a coded transition.
