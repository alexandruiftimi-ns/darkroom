# The effect menu (plain language)

For the person who knows what they want to *see* but not how it is built. When the user names an effect, find it here, say in two or three lines which routes exist, recommend one, and then produce the "what I need from you" card (`templates/NEEDS.md`). Never lecture. Every route below follows the same four lines so they can be compared at a glance.

Rules for using this file:
- Offer **at most three routes**, the recommended one first, each in one sentence plus its main trade-off.
- **Recommend what delivers what they asked to see, for their kind of site** (the table under "A scroll story that looks 3D" shows the pattern). The words they used ("3D", "realistic", "cinematic", "like Apple") and the subject decide the recommendation; what they own today decides only what they must provide. Never recommend a route that cannot produce the asked look because it is cheaper or needs no files: offer it last, as the no-cost option, and say what it loses ("flat and drawn, it will not look 3D").
- When they asked for prompts (`references/asset-tools.md`), the generated-media route is in reach: recommend it when it fits, write the prompts for their tools, and name the cost class (paid credits) once. Spending stays their call.
- Always state what the user must provide **before** they say yes, and what ships if they never provide it.
- Say plainly what a route cannot do (a video cannot be turned by the mouse; a photo cannot rotate).
- Costs of generating assets (credits, subscriptions) are the user's decision. Name the cost class, never assume a tool.
- Technical details live in `references/motion.md`, `references/motion-toolkit.md` and `recipes/`; do not repeat them to the user.
- First place the request in a mode (`references/modes.md`): "animations on scroll" is the reveal effect below, not a scroll story.

Terms to use with users: "scroll animation" (not "scrub"), "frames" = "a flip-book of pictures", "3D model" = "a digital copy of the object you can turn any way", "plate" = "a clean background picture".

---

## Effect: Object that turns, opens or flies as you scroll

What the visitor sees: they scroll and a product turns around, an object assembles, or the camera moves toward something. Scrolling back plays it backwards.

### Route A: A short video turned into frames (recommended when you have, or can make, a clip)
- You provide: one short video, camera locked, object on a plain or simple background (5 to 10 seconds is plenty), plus a still image of its first frame.
- Pros: photoreal look, exact and smooth control with scroll, works with any object, reverses perfectly.
- Cons: one fixed path only (the visitor cannot choose the angle); many image files to download; the clip must be clean on the first try or it must be remade.
- Effort for you: medium (you make or commission the clip; I do the rest).
- Choose when: you want a "wow" moment and a polished, filmed look.

### Route B: The same video, played directly by scrolling
- You provide: the same clip as Route A.
- Pros: a much smaller download than frames.
- Cons: can stutter on some phones and in some browsers; depends on how the video was exported (I will check it and tell you if it fails).
- Effort for you: medium.
- Choose when: file size matters more than perfect smoothness, and the clip tests well on a phone.

### Route C: A real 3D model the visitor can turn any way
- You provide: a 3D model file (GLB or glTF; made by a 3D artist, exported from the product's design files, or scanned) with its textures, and the right to use it.
- Pros: any angle, real reflections and lighting, the visitor can drag it, one file replaces a whole video.
- Cons: needs a good model, which is the hard part; a heavy extra library on the page; weakest on slow phones; materials like glass and chrome rarely look as rich as a filmed render; much more testing.
- Effort for you: high if you do not already own a model.
- Choose when: free rotation is the point, or you will show many angles and configurations.

### Route D: Drawn in code (no files from you)
- You provide: nothing but the idea; I draw it (shapes, gradients, type).
- Pros: tiny, sharp at every size, works everywhere, the fastest to get a result.
- Cons: stylised, not photoreal; limited to objects that suit a simple drawing.
- Effort for you: none.
- Choose when: the story is more about an idea than a physical object and a stylised look suits it (a scroll-heated vessel drawn entirely in code is a typical example). Not when they asked for a real or 3D look: then recommend A or C and offer this last, as the no-cost option.

## Effect: Dive through something into the next scene (portal, lens, window)

What the visitor sees: they scroll and move into an object or opening and arrive in a new world.

### Route A: A short clip of the dive, scrolled (recommended for realism)
- You provide: one clip that ends exactly where the next scene begins (or two matching stills and a generated in-between clip), plus the next scene's image.
- Pros: most cinematic; exact control; reversible.
- Cons: the start and end frames must match your other images, which is the usual failure; may need several attempts.
- Effort for you: high (the match is hard to get right).
- Choose when: this is the hero moment of the whole site.

### Route B: A mask and zoom between two still images
- You provide: two clean images (no text on them): the thing being entered, and the new world.
- Pros: cheap, light, reliable on phones; no video needed.
- Cons: a clever illusion, not a true camera move; less depth.
- Effort for you: low to medium.
- Choose when: you have good stills but no motion footage.

## Effect: Depth and parallax (layers that move at different speeds)

### Route A: Separated picture layers (recommended)
- You provide: the scene cut into 2 to 5 pictures with transparent edges (background, middle, foreground), or I help you request them.
- Pros: a convincing sense of depth with small, light files.
- Cons: the layers must be cut cleanly; too much movement looks fake, so I keep it small.
- Effort for you: medium.
- Choose when: you have an illustration or a photo that separates naturally.

### Route B: One image, light movement
- You provide: one strong image.
- Pros: easiest; very light.
- Cons: only a slight drift or zoom; no true depth.
- Effort for you: low.
- Choose when: atmosphere is enough.

## Effect: Product that follows the mouse (tilt, shine)

### Route A: A small tilt on one image (recommended)
- You provide: one clean image of the product with a transparent or simple background.
- Pros: feels alive, very light; works with any product shot.
- Cons: a gentle tilt only, never a real rotation; off on phones, where there is no mouse.
- Effort for you: low.
- Choose when: you want polish, not a full viewer.

### Route B: A viewer you can drag all the way round
- You provide: either a 3D model (see "Route C" above) or 12 to 36 photos of the product from evenly spaced angles on a turntable.
- Pros: a true "inspect it" experience.
- Cons: the photo set must be shot consistently; a 3D model is a big job; both are heavier to load.
- Effort for you: high.
- Choose when: customers need to inspect the product before buying.

## Effect: Things appear as you scroll (headings, text, pictures, cards)

What the visitor sees: an ordinary page, but each heading rises into place, text fades in, pictures open, and cards arrive one after another as they come on screen. Nothing is pinned; the page scrolls normally. This is the "animated landing page", not a scroll story (`references/modes.md`).

### Route A: Built-in reveals (recommended)
- You provide: nothing extra.
- Pros: works with any page and any pictures; light; no library; content is never hidden for visitors without JavaScript or with reduced motion.
- Cons: subtle by nature; it adds polish, not a "wow" moment on its own.
- Effort for you: none.
- Choose when: you want a lively, finished feel without preparing special media.

### Route B: The same, using the animation library your site already has (GSAP, Motion)
- You provide: nothing extra (the site already uses the library).
- Pros: matches what the rest of your site does; fine control over timing.
- Cons: only worth it if the library is already there; adding one just for this is extra weight.
- Effort for you: none.
- Choose when: your site or developer already uses one of these libraries.

### Route C: Reveals plus one hero effect
- You provide: what the hero effect needs (see the effects above), usually one clip or one strong picture.
- Pros: a calm, animated page with one memorable moment.
- Cons: the hero effect needs assets and testing.
- Effort for you: medium.
- Choose when: you want "nice animations" and one thing people remember.

## Effect: A scroll story that looks 3D (depth, camera moves, objects in space)

What the visitor sees: they scroll and the camera moves through a scene, an object turns in space or comes apart, chapters change as if filmed. "Looks 3D" is the brief: a flat drawing does not answer it.

### Route A: Cinematic frames from generated video (recommended for photoreal: products, places, food, fashion, cars, architecture)
- You provide: the prompts I write, run in your tools: one still per chapter (ChatGPT image, or edits of your own photos), then a short clip between each pair of stills in a first-and-last-frame video tool (Kling, Veo, Seedance). I turn the clips into a flip-book that plays with the scroll, forwards and back.
- Pros: the richest, most "filmed" 3D look; any material (glass, metal, food, fabric); smooth on phones once cut into frames.
- Cons: paid credits in your tools; each clip may need a few tries; one fixed camera path.
- Effort for you: medium (copy prompts, download clips; I check every clip frame by frame before you make the rest).
- Choose when: the look must be real and premium, and the subject is a physical thing or place.

### Route B: Real 3D in the page (recommended for tech, abstract and geometric subjects: software, AI, finance, science, data)
- You provide: nothing for abstract shapes (I build them from code: glass, light, particles, geometry), or a 3D model (GLB) for a real product.
- Pros: true depth and lighting, any camera path, can react to the mouse; sharp at every size; no video files.
- Cons: a 3D library on the page (heavier); needs a lighter version for slow phones; real products need a good model, which is the hard part.
- Effort for you: none for abstract scenes; high for a real product without a model.
- Choose when: the subject is an idea, a system or a shape, or the visitor should move it.

### Route C: Layered depth (2.5D) from generated or cut-out pictures
- You provide: each scene as 2 to 5 layers (background, middle, foreground), from prompts I write or cut from your photos.
- Pros: a strong sense of depth with light files; works on every phone; cheap to make.
- Cons: depth is an illusion: no turning around objects, small camera moves only.
- Effort for you: low to medium.
- Choose when: a lighter page matters, or the story is about places and atmosphere more than objects.

Drawn in code (shapes and gradients only) does not look 3D: offer it only as the no-cost option, last, with that sentence.

Route A makes **moments** inside a story. A whole page that is one chained film is a different request (the "AI website" look): build it only when the user asks for it by name, from `references/scroll-film.md` (routing: `references/modes.md`, "Three kinds of moving pages").

Which route fits which site (recommend from this, then adjust to their assets):

| Site | Recommend | Why |
|---|---|---|
| Physical product launch, shop hero, cars, watches, cosmetics | A (frames), B with their CAD or GLB if they have one | materials and reflections must look real |
| Architecture, real estate, hotels, travel, restaurants | A (a camera flying through the place) | a place is sold by moving through it |
| SaaS, AI, fintech, developer tools, science | B (abstract 3D from code) | the product is an idea; real 3D reads as technical |
| Agency, portfolio, music, events | B or A, by their work's medium (renders → B, film/photo → A) | the site shows the craft |
| Craft, food, editorial, nature, heritage | C (layered depth), A for one hero moment | warmth and texture matter more than a full camera move |

## Effect: A story told in chapters as you scroll (text appears, scenes change)

### Route A: Chapters built from your words and simple visuals (recommended when no look was asked for)
- You provide: the story in a few sentences per chapter, and any images you have.
- Pros: needs no special media; fastest; the strongest base for any other effect.
- Cons: the look depends on your imagery and type; without images it is typographic and drawn.
- Effort for you: low.
- Choose when: you are starting, or the message matters more than spectacle. If they asked for 3D, cinematic or realistic chapters, use "A scroll story that looks 3D" instead.

### Route B: Chapters with one hero effect from the sections above
- You provide: what the chosen effect needs.
- Pros: one memorable moment inside a calm page.
- Cons: more to prepare; I keep it to one big effect per page.
- Effort for you: medium to high.
- Choose when: there is one moment the page is built around.

## Effect: Video background that loops

### Route A: A short muted loop, with a still image first (recommended)
- You provide: a clip of 5 to 15 seconds, ideally one that loops without a visible jump (if it jumps, I fade the loop or make a forward-and-back copy), and I make the still frame and the phone version from it.
- Pros: instant atmosphere; simple.
- Cons: heavy if long or high resolution; text over video needs care to stay readable; phones may skip it to save data, so the still image matters.
- Effort for you: medium.
- Choose when: mood matters and the footage is beautiful.

### Route B: A free clip I find for you
- You provide: a yes before I download anything.
- Pros: real footage at no cost; I check the licence and record it.
- Cons: stock looks like stock; it shows atmosphere, never your product, place or people; its edges rarely match your colours, so I plan the page colour or a soft shade from the clip.
- Effort for you: none.
- Choose when: mood matters more than showing the real thing.

### Route C: An abstract moving backdrop I make in your colours
- You provide: nothing.
- Pros: free and yours; loops with no jump; its edges are exactly your page colour, so there's no flash and no visible frame; I keep a calm area for the words.
- Cons: abstract only (moving colour fields, light): it can't show a product, a place or a person.
- Effort for you: none.
- Choose when: a tech, finance or studio page wants a living first screen without footage.

### Route D: A single still with a slow, subtle drift
- You provide: one strong image.
- Pros: light and robust; always readable.
- Cons: less dramatic.
- Effort for you: low.
- Choose when: you want atmosphere without weight.

## Effect: Sound

### Route A: Optional sound, off by default (recommended)
- You provide: the audio file and the right to use it.
- Pros: adds mood for people who want it; never ambushes anyone.
- Cons: most visitors will leave it off; needs a clear on/off control.
- Effort for you: low.
- Choose when: sound is part of the brand.

## When the user asks for something not on this menu

Say what the nearest menu item is, what is different, and what it would cost in assets and risk. If it needs a tool or an expense the user has not approved, ask first.

---

## For Claude: the recipe behind each common moment

Not for the user. When a route above or the build spec needs one of these moments, start from the recipe (`recipes/README.md` has the markup and the "not when"). Cost: light = CSS or a small script; medium = decoded media or a rAF loop; heavy = frames, seeked video or 3D (at most one per page, `references/modes.md`).

| Moment | Recipe | Cost |
|---|---|---|
| Video behind the hero | `video-layer.js` (+ `video-loop.js` for a seam, `scrim.css` for readability) | medium |
| Headline entrance | `split-text.js` · first-screen order `entrance.css` | light |
| Things appearing on scroll | `reveal.js` | light |
| Scroll-linked scene (mask, scale, colour) | `scene-progress.js` | light |
| Object that turns or flies with scroll | `scrub-frames.js` (frames) · `scrub-video.js` (video) | heavy |
| Character or product that comes alive per section | `sprite-clips.js` | medium |
| Image showing through a circle under the pointer | `cursor-reveal.js` | light |
| Slight tilt toward the pointer | `pointer-tilt.js` | light |
| Nav and phone menu · buttons · grain | `nav.js` · `buttons.css` · `grain.css` | light |
| Logo strip · stats · manifesto · process cards | `marquee.js` · `count-up.js` · `scroll-words.js` · `stack-cards.js` | light · light · light · medium |
| A changing word · typing · decoding text · full-width wordmark | `rotating-word.js` · `typewriter.js` · `scramble.js` · `giant-type.js` | light |
| Layers in depth · a leaning button · a spotlight onto a second picture | `parallax-layers.js` · `magnetic.js` · `spotlight-mask.js` | light |
| A few products in depth · cards that swipe on phones · a product window in code | `depth-carousel.js` · `snap-rail.css` · `ui-mockup.css` | medium · light · light |
| Turning a product with the mouse · switching mood clips | `cursor-scrub-video.js` · `scene-switcher.js` | medium |
| A living shader backdrop · a draggable 3D model | `shader-backdrop.js` · `model-hero.js` | heavy |
| Frosted glass (glass-cinema pack) | `liquid-glass.css` | medium |
