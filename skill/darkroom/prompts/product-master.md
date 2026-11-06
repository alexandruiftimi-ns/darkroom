# Prompt template — product master (silhouette lock)

Attach the real product photo or the anchor. Best: one multi-view sheet (front, three-quarter, side, top) on mid-grey, then crop the views; or make the front master and get each other view as an **edit of that master**. Separate generations drift. Only the view line changes.

```
Product photography of the exact <product> shown in the attached image — identical geometry, proportions, materials, colours, logo placement and details. Studio, seamless neutral mid-grey background, soft key light from upper left, subtle rim light, no reflections of other objects, no text, no props. Square 1:1 format.
View: <front | rear | left three-quarter | right three-quarter | top | detail close-up of <part>>.
Materials: <list from bible>. Details that must match: <silhouette lock list>.
```

Reject any view where a locked detail changes (count lights, straps, logos). These views become the inputs for turntable/video generation and the reference for every later product image. Write the details that must never change as the lock list in `SHOTS.md`, and repeat it word for word. Turns beyond about 45° show unseen sides: give them as a frame. If a label warps, generate it blank and add the real one afterwards.
