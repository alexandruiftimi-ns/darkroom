# Motion craft: should it move, and how

`references/motion.md` chooses the *technique* (still, layers, frames, video, 3D). This file decides *whether and how* a thing moves. Write the decision down for each motion in the storyboard (`motion` field) before coding it.

## 1. Should it animate at all?

| Question | If yes | If no |
|---|---|---|
| Does it explain the section's claim (a reveal, a transformation, a path) or answer the user's action? | animate | cut it |
| How often will the visitor trigger it? Once per visit (a hero reveal): rich is fine. Many times (a menu, a hover): keep it ≤ 200 ms or none | scale richness to frequency | |
| Is it decoration repeated on every block (fade-up everywhere, hover-lift on all cards)? | | remove it: sameness is a tell |
| Would a static composition say the same thing? | | keep it static |

One meaningful motion per scene by default; at most one thing glowing or moving for attention at a time.

## 2. Purpose, then property

Purposes: **orient** (where did this come from), **explain** (what changes into what), **respond** (this heard you), **delight** (once, at the threshold). Animate `transform`, `opacity`, `clip-path`, `filter` (blur sparingly: it is costly). Never layout properties; never `transition: all`. Large travel = scroll-linked; small feedback = CSS.

## 3. Easing and time

- **Entering or responding**: ease-out (fast start, soft landing), e.g. `cubic-bezier(.22,1,.36,1)`. **Leaving**: ease-in or a shorter ease-out. **Ambient loops**: sine in-out. **Scroll-linked**: linear mapping; scroll is the easing.
- Durations: press/hover feedback 100–180 ms · small UI 150–250 ms · reveals 400–800 ms · hero choreography ≤ 1.2 s and never blocking reading or the first interaction.
- No bounce or elastic unless the pack is playful. A spring is right for gesture-driven things that can be interrupted (a drag, a sheet); a tween is right for choreographed reveals.

## 4. Details that read as quality

- Things grow from where they came from: set `transform-origin` to the trigger (a popover from its button, a lens from its centre).
- Do not start from `scale(0)`; start from ~0.92–0.96 plus opacity.
- Press feedback: `:active { transform: scale(.97) }` on buttons, immediate.
- Stagger lists by 30–60 ms, cap at ~8 items; do not stagger the hero headline's words unless it is the idea.
- Hover effects only on `(hover: hover)`; touch gets press states.
- Prefer CSS transitions for interruptible UI (they retarget mid-flight); keyframes for one-way sequences.
- Blur/fade can mask a cross-fade between two states that are not aligned; do not use it to hide a bad cut.

## 5. Interruption and reversal

Every scroll-linked effect runs backwards. Every timeline can be interrupted by a faster wheel, a resize, a click, a hidden tab. Define the end state of an interrupted motion (snap, or settle) and test it: fast wheel, reverse, resize mid-scene, tab away and back, back/forward navigation (scroll restoration).

## 6. Reduced motion (built in the same pass, not after)

`prefers-reduced-motion: reduce` → same content and controls, no travel: scrubbed scenes show one finished composition (poster or end frame), reveals are instant, parallax and pointer effects off, auto-playing video paused on its poster, no looping ornament. Essential indicators (a spinner, a progress bar) may remain but are not decorative travel. Implement it where the motion is implemented (CSS media query, or `matchMedia` in JS) and check it by behaviour (`darkroom audit` + `capture --both`), not by finding a rule in the stylesheet.

Auto-moving content longer than 5 s next to other content needs a pause control (WCAG 2.2.2); nothing flashes more than 3 times a second (2.3.1).

## 7. Performance while moving

Composite-only properties; one rAF loop per scene, draw only when the value changed; pause off-screen and in hidden tabs; cap DPR (≤ 2); release decoded media outside a window (`recipes/`); a scroll handler never reads layout after writing it in the same frame. If it janks, measure (a trace) before changing anything.
