# Assets: the user's own, or prompts for an image or video tool

Ask once, at intake, in the same question round (`commands/concierge.md`): **"Do you have your own pictures and video, or should I write prompts for you to generate them?"** Answers: *I have my own* · *Write me prompts* (then: which tools do you use?) · *A mix* · *Neither: build without* (then: drawn-in-code graphics, type-led layout, openly licensed images with credits, `commands/plates.md`).

Darkroom never generates paid media itself and never spends the user's credits. It writes the prompt, says which tool and mode it is for, what to attach, how to tell a good result from a bad one, where to save it, and what ships if it never arrives (`templates/NEEDS.md`).

## Modes (say which one each prompt is for)

| Mode | What goes in | Use it for |
|---|---|---|
| Text to image | a prompt | hero plates, atmosphere, textures, product scenes when no product photo exists |
| Image edit / image to image | a photo + an instruction | cleaning a real product photo, new background, extending the frame, matching a grade |
| Text to video | a prompt | a mood loop, a place, a background film with no fixed product |
| Image to video | a start image (+ prompt) | the product turning, a camera move into a still: the identity stays fixed |
| First and last frame | two images (+ prompt) | a transition that must start and end exactly (scroll scrubs, chapter changes) |
| Reference images | 1 to several images + prompt | keeping a product, a character or a style the same across many shots |

For anything that must look like the real product, start from the user's photo (image edit or image to video), never from text alone.

## Tools (examples as of 2026-10; names, versions, prices and licences change: tell the user to check)

| Tool | Good at | Prompt notes |
|---|---|---|
| **ChatGPT image generation** | following long instructions, editing an uploaded photo, text-free plates | write full sentences; attach the anchor or product photo; ask for "no text, no logos, no UI"; regenerate in a fresh chat every ~5 images to stop drift |
| **Midjourney** | mood, light, texture, art direction | short, visual phrases; aspect ratio and style references as parameters; weak at exact products and layouts |
| **Google Gemini / Imagen** | photo edits that keep identity, consistent subjects | describe the edit, not the whole scene again |
| **Flux, Ideogram, Adobe Firefly** | open weights (Flux), lettering (Ideogram, never for page text), commercially cleared training data (Firefly) | as ChatGPT: explicit subject, light, lens, forbidden list |
| **Kling** | image to video with strong camera control, first/last frame | one camera move per clip; name it ("slow dolly forward"); 5 to 10 s |
| **Seedance (ByteDance)** | reference-driven video: several images, clips or audio tagged in the prompt (e.g. "@Image1 as the first frame") | the prompt says what happens; the references say what it looks like |
| **Google Veo 3** | text or image to video with sound, prompt adherence, reference images, first/last frame | write it like a director's note: shot, subject, action, setting, light, sound; one beat per clip |
| **Runway, Luma, Hailuo, Sora** | general text/image to video | same structure; test the hardest shot first |

## Prompt structure (fill from the bible; templates in `prompts/`)

```
Mode: <image to video> · Tool: <Kling> · Attach: <assets/raw/product-front.jpg as the first frame>
Shot: <3–5 s>, <locked camera | slow dolly forward>, <lens, e.g. 50 mm>, aspect <16:9 for desktop, 9:16 for phone>
Subject: <exactly what is in frame, material, colour from the palette roles>
Action: <ONE motion, constant speed>
Light and grade: <time of day, key light direction, contrast, colour grade>
Never: text, captions, logos, UI, hands, extra objects, morphing, cuts, flashes
Accept if: <first and last frames clean; geometry stable frame to frame>
Save as: assets/raw/<name>.mp4
```

Video for scroll scrubbing needs a locked or perfectly smooth camera and clean start and end frames (`prompts/video-clip.md`). Before ordering a batch, the user generates **the hardest shot once**; Darkroom inspects it frame by frame (`darkroom media inspect`, `media frames`) before the rest are made.

## Rights

Record tool, plan and date in `.darkroom/ASSETS.json`. The output licence depends on the tool and the user's plan; some markets require labelling AI-generated imagery (`references/compliance.md`). Never generate a real person, a brand's product or logo the user does not own, or a competitor's look.
