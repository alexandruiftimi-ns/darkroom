# The effect menu (plain language)

For the person who knows what they want to *see* but not how it is built. When the user names an effect, find it here, say in two or three lines which routes exist, recommend one, and then produce the "what I need from you" card (`templates/NEEDS.md`). Never lecture. Every route below follows the same four lines so they can be compared at a glance.

Rules for using this file:
- Offer **at most three routes**, the recommended one first, each in one sentence plus its main trade-off.
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
- Choose when: you have no media yet, or the story is more about an idea than a physical object. (A scroll-heated vessel drawn entirely in code is a typical example.)

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

## Effect: A story told in chapters as you scroll (text appears, scenes change)

### Route A: Chapters built from your words and simple visuals (recommended)
- You provide: the story in a few sentences per chapter, and any images you have.
- Pros: needs no special media; fastest; the strongest base for any other effect.
- Cons: the look depends on your imagery and type; without images it is typographic and drawn.
- Effort for you: low.
- Choose when: you are starting, or the message matters more than spectacle.

### Route B: Chapters with one hero effect from the sections above
- You provide: what the chosen effect needs.
- Pros: one memorable moment inside a calm page.
- Cons: more to prepare; I keep it to one big effect per page.
- Effort for you: medium to high.
- Choose when: there is one moment the page is built around.

## Effect: Video background that loops

### Route A: A short muted loop, with a still image first (recommended)
- You provide: a clip of 5 to 15 seconds that loops without a visible jump, and a still frame.
- Pros: instant atmosphere; simple.
- Cons: heavy if long or high resolution; text over video needs care to stay readable; phones may skip it to save data, so the still image matters.
- Effort for you: medium.
- Choose when: mood matters and the footage is beautiful.

### Route B: A single still with a slow, subtle drift
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
