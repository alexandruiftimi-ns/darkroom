# Motion toolkit: which library or tool, when, and when not

Pick the **lightest thing that does the job**, starting from what the project already uses. The `recipes/` need no library and cover calm, animated and most hero-effect pages. Installing anything (npm package, app, paid tool) needs the user's yes; name the cost class first. Licences below are as last checked when this file was written: confirm on the package page before shipping, especially for anything "free with its own licence".

## Libraries (in the page)

| Tool | Use for | Not for | Weight / cost | Licence |
|---|---|---|---|---|
| **`recipes/reveal.js`** | on-scroll reveals of headings, text, images, cards (mode `animated`) | timelines with many overlapping tweens | ~2 KB, no dependency | ships with Darkroom (MIT) |
| **`recipes/scene-progress.js`** | pinned CSS scenes driven by scroll (`--p` 0..1): masks, scale, opacity | photoreal motion | < 1 KB | MIT |
| **`recipes/scrub-frames.js` / `scrub-video.js`** | filmed turntables, dives, exploded views scrubbed by scroll | free rotation | < 4 KB + the media | MIT |
| **CSS scroll-driven animations** (`animation-timeline: view()` / `scroll()`) | simple reveals and progress bars with zero JS | anything that must work in every browser today: support is Chromium and recent Safari; check caniuse at build time and wrap in `@supports` as an enhancement | 0 KB | web standard |
| **GSAP + ScrollTrigger** (SplitText, Flip) | complex scroll timelines, many tweens per scene, precise pinning, SVG morphs | a page that only needs reveals (use `reveal.js`) | ~25–70 KB | free for commercial use under GSAP's own licence (not MIT); read its terms if the product is itself a site builder |
| **Motion** (motion.dev, formerly Framer Motion) | React/Vue projects that already use it; layout animations, gestures, `inView`/`scroll` helpers | adding React to a plain page just for motion | ~5–35 KB | MIT |
| **Lenis** (smooth scroll) | when the art direction truly needs inertial scroll and it is tested with keyboard, find-in-page, back/forward, screen readers | default use; anything with `position: sticky` you have not re-tested; trust/medical/finance pages | ~4 KB | MIT |
| **three.js / React Three Fiber** | a real 3D model the visitor turns, live reflections, configurators | effects a clip or CSS can fake; slow phones without a fallback | 150 KB+ plus the model | MIT |
| **Spline** (embed or export) | quick, simple 3D scenes made by a non-coder | performance-critical heroes (heavy runtime) | heavy runtime; editor freemium | check plan terms |
| **Lottie** (lottie-web / dotLottie) | vector illustrations and icon animations made in After Effects or LottieFiles | photographic motion | 60 KB+ player | player MIT; each animation file has its own licence |
| **Rive** | interactive vector animation with states (buttons, mascots) | photography | runtime MIT; editor freemium | |
| **Splitting.js** | splitting text into lines/chars for CSS effects | word reveals (`reveal.js` does it) | ~1.5 KB | MIT |
| **AOS (Animate On Scroll)** | legacy projects already using it | new work (`reveal.js` is smaller and safer: no hidden content without JS) | ~14 KB | MIT |
| **ScrollReveal** | avoid | closed client work unless a commercial licence is bought | | GPL-3.0 or paid |
| **Theatre.js** | authoring a complex 3D/scroll timeline visually | small pages; check project activity first | | core Apache-2.0, studio AGPL-3.0 (authoring only) |

Rules for any library: respect `prefers-reduced-motion` in the same pass; never hide content without JS; native scroll unless the user approved smooth scroll; one library per job, never two animation libraries on one page.

## By mode

| Mode | Default | Upgrade only when |
|---|---|---|
| calm | CSS transitions | never needed |
| animated | `reveal.js` | the project already ships GSAP or Motion |
| hero-effect | the matching recipe | the effect is real 3D (three.js) |
| story | `scene-progress.js` + scrub recipes | scenes need many overlapping tweens (GSAP ScrollTrigger); inertial scroll is part of the brief (Lenis, tested) |

## Making the assets (the user's side)

The user chooses and pays; Darkroom writes the prompts (`prompts/`), sets acceptance criteria and checks what comes back (`commands/refs.md`, `darkroom media inspect`). Products, prices and terms change monthly: name the **class and cost** first, give examples, and tell the user to check current pricing and licence terms. Examples as of 2026:

| Need | Free route | Paid / credit route (examples) | Watch out for |
|---|---|---|---|
| Hero and section stills | own photography; openly licensed archive (`darkroom assets search`) | image models: Midjourney, ChatGPT image generation, Flux, Ideogram, Adobe Firefly | baked text or logos; inconsistent product identity across images; licence of the output on that plan |
| Product clip (turn, open, assemble) | phone on a tripod, turntable, even light; Blender render if the user has a model | image-to-video models: Runway, Kling, Google Veo, Luma | camera drift (ask for a locked camera); warped geometry; the first and last frame must be clean |
| Camera move into a place | drone or gimbal footage | image-to-video with first/last frame control | flicker; inconsistent lighting between frames |
| Separated depth layers | background removal in a photo editor | image models with layer/cut-out tools | edge halos; missing background behind the cut-out |
| 3D model | Blender; manufacturer CAD export | 3D artist; photogrammetry / splat apps (Polycam, Luma, KIRI) | textures missing; file size; usage rights |
| Vector animation | LottieFiles free assets (check each licence) | an animator; Rive / After Effects | licence per file |
| Music / sound | user-owned or openly licensed with credit | licensed library | never autoplay; rights for web use |

Before any paid generation: test the **hardest shot first** with one attempt, look at it frame by frame, then order the rest.
