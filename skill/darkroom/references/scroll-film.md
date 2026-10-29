# Scroll film: a chained AI film played by the scroll

The look of the "AI websites": generated clips, chained end to start, played forwards and backwards as the visitor scrolls. Darkroom builds it **only on an explicit request** (routing: `references/modes.md`, "Three kinds of moving pages"). It is never the default for a scroll story, and never the whole of one.

## When it fits, and what it costs

- Fits: a place, a journey, a product world where one continuous camera path *is* the idea (a flight through a landscape, a walk through a building, a dive into an object).
- Costs the user: paid credits in their video tool (a 5-chapter film is roughly 8 to 15 generations, more while experimenting), a few retries per clip, and their time downloading. Say so before the first prompt (`references/asset-tools.md`).
- Costs the visitor: weight and phone smoothness. Budget below.

## The chain, step by step

1. **One anchor still first.** Write the look in one approved still (`prompts/anchor-hero.md`); every other still is made from it, style-locked. Never start clips before the anchor is approved.
2. **One still per chapter**, edited from the anchor in the same image tool (same light, lens, grade).
3. **Plan the path as one forward take.** The camera never reverses direction between chapters (in, then back out, reads as a rewind). One model for the whole chain: switching models mid-chain makes the seam pop.
4. **Test the hardest clip once** on the cheapest setting the tool has; inspect it frame by frame (`darkroom media inspect`, `media frames`) before ordering the rest.
5. **Connectors from extracted frames.** Clip N+1 starts from the **last frame extracted from clip N's file**, not from the original still (a re-rendered still differs in colour and grain, and the seam pops). Never "clean" that frame in an image tool; at most a light upscale.
6. **Join and score:** `darkroom media chain ch1.mp4 ch2.mp4 ch3.mp4 --out film.mp4` scores every seam (last frame → next first frame) and joins the clips. A seam over the threshold is a visible jump: remake the clip from the extracted frame, or crossfade 6 to 8 frames across it.
7. **Frames or video:** `media frames film.mp4 --mobile-width 900` for `recipes/scrub-frames.js` (recommended: deterministic paint, smooth on phones), or chapter videos marked `data-chain` for `recipes/scrub-video.js` (the audit's `chain-seam` check scores those seams on the page).
8. **Posters** are extracted from the encoded clips (`media web` / `media frames` make them), never the source stills.

## Budget and phones

- **Before the first scroll: ~4 MB** (the first chapter's frames or clip, fonts, CSS, JS). Load later chapters as the visitor approaches them. The audit's `first-scroll-weight` check measures it.
- 16:9 on a phone shows only the centre: keep the subject centred, or make 9:16 versions of the key chapters.
- Phone tier by the screen's short side (≤ 600 CSS px), never by user agent. `saveData` or a refused video play (iOS Low Power Mode) → stills with crossfades.
- Ignore height-only resizes on touch (the URL bar), as `scrub-frames.js` does.
- No smooth-scroll library on touch screens (`references/motion-toolkit.md`).

## The words over the film

- The first-screen H1 keeps its full size floor (`film-headline` check); later chapters may use subtitle-size text.
- Copy cards: vary them by chapter or keep one fixed reading anchor; the same frosted card repeated in every chapter is an AI-film tell (`glass-caption` check, `references/tells.md`).
- Every stretch of scroll shows something new to see or read: no more than about two screens of scroll without a change (`dead-scroll` check).
- Text stays readable over the lightest frame (`contrast`, by eye on the lightest frame).

## What the visitor must never get

- A phone gate ("best viewed on desktop"): build the phone version (`phone-gate` check).
- A still picture where the film failed: if video can't play, show the frame sequence or stills, never a frozen first frame with dead scroll.
- Ghosting or flashing frames on fast scrolls (`frame-blend`, `scrub-fling`, `scroll-glide`).
