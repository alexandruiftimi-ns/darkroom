# Myths and facts — the filter

Research for this skill (Oct 2026) read award criteria, accessibility law, usability research, open-source design guidelines (Vercel, Anthropic's frontend-design skill, Impeccable, taste-skill), agency blogs and practitioner write-ups. Much of the "premium web design" content online is agency marketing. This file is the sorted result: what holds up, what is half-true, what to ignore. Sources in `sources.md`.

## Verdict table

| Claim you will hear | Verdict | What is actually true |
|---|---|---|
| "Award sites win on creativity and wow effects" | **Mostly false** | Awwwards weights Design 40 %, Usability 30 %, Creativity 20 %, Content 10 %. Design + usability = 70 %. Slow, confusing sites get marked down regardless of spectacle. |
| "Expensive = full 3D / WebGL" | **False** | Most "3D-looking" premium sites fake depth with stills, parallax layers, frame sequences and masks. Real 3D only when free inspection, live lighting or shaders are the point. Complexity costs speed, which costs usability score. |
| "60-30-10 is the rule for colour" | **Half-true** | An interior-design proportion heuristic, not research. Good default for calm, disciplined UIs; wrong for expressive, colour-blocked or editorial work, and too coarse for product UI (needs neutral layers + accent scales). Use it as a *mode*, not a law. |
| "Never more than two fonts" | **Half-true** | Practitioner consensus is 2, at most 3, families; award sites in the library often run 3 (display + text + wordmark/utility). Darkroom's budget is 3 with named roles. A superfamily (sans+serif+mono of one design) counts as cohesive. The real failure is *mismatched tone* (playful face on a luxury brand), not the number. Handwritten "accent" lettering is a third font. |
| "Inter / Arial / Roboto look generic" | **True for display** | As the brand's display face they read as default. As a text face they are fine and legible. Pick display type with character from the subject. |
| "Users read everything if it's well written" | **False** | Measured average: ~20 % of words on a page (≈ 28 % max). +100 words ≈ +4.4 s of attention. Under ~110 words, users read about half. Write less. |
| "F-pattern is how people read, design for it" | **Half-true** | F-pattern is the *failure mode* on unstructured text. Layer-cake scanning (headings → relevant body) is the efficient pattern; design for it with real headings and short sections. |
| "Parallax and scroll animation = premium" | **Conditional** | Restrained, reversible scroll storytelling works. Scroll-jacking (taking over scroll speed/direction) is widely reported to break skimming, assistive tech and trust. Native scroll + scrubbed scenes only. |
| "Glassmorphism / gradients / glows look modern" | **Dated as defaults** | These are the first-wave tells of generated design. Allowed when a style pack chooses them for a reason, not as decoration. |
| "Eyebrows, 01/02/03 numbering, hairlines look designed" | **Context** | Common on award sites *and* the first things generators copy. Banned by some skills outright. Darkroom treats them as style switches: on in cinematic-tech/editorial packs when they carry information, off by default elsewhere. |
| "An award-winning site is a safe reference for accessibility" | **False** | Library evidence: Awwwards Sites of the Day routinely ship without an h1 or `lang`, with unnamed controls, no reduced-motion rule and trackers before consent (`library/LESSONS.md`). Copy their art direction, never their markup; always run `audit` and `comply`. |
| "Accessibility overlays make a site compliant" | **False** | Overlays don't fix source code; regulators and courts look at the actual page. Build accessible markup. |
| "Accessibility is only for government sites" | **False** | EU: the European Accessibility Act applies to e-commerce and many consumer services since 28 June 2025 (micro-enterprise exemption for services). US: ADA website suits target private businesses. |
| "A cookie banner with just Accept is fine if there's a settings link" | **False in the EU** | Most EU regulators expect Reject on the first layer, as easy as Accept; asymmetric styling has been found to invalidate consent. |
| "Countdown timers boost conversion" | **Legal risk** | Fake urgency (timers that reset, invented scarcity) was flagged in EU sweeps and acted on by the UK CMA. Only real deadlines. |
| "Hero carousels show more" | **Mostly false** | Rotating heroes split attention and hide content; one strong first frame beats five weak ones. |
| "Big numbers and logo walls build trust" | **Only if real** | Invented stats, testimonials and client logos are deceptive (and a generator tell). Real proof or none. |
| "Make it pixel-perfect to the mockup" | **False for AI mockups** | AI concept art has baked text, impossible geometry and drift. Match composition and intent; document differences. |
| "Mobile = shrink desktop" | **False** | Re-compose: re-crop, re-order, cut. A 16:9 hero squeezed into 9:19 crops the subject off. |

## Adjectives → decisions (never accept the adjective alone)

| Client says | Turn it into |
|---|---|
| Premium / expensive | One focal object, generous negative space, a type scale with large jumps, few words, one accent, themed details (focus, selection), real photography, fast load |
| Luxury | Restraint above all: one family or a serif+sans pair, slow motion, product as hero, almost no UI chrome, no urgency devices |
| Cinematic | A camera language: framing, light direction, depth (fore/mid/back), sequence of shots across sections, colour grade |
| Modern | Clear grid, neutral system type, motion that responds to the user, no ornament |
| Bold | Very large type or colour fields, high contrast, few elements, hard cuts |
| Futuristic / tech | Believable product and contextual UI, not random glowing HUDs |
| Friendly / family | Rounded forms, larger text, warm colour, plain words, generous targets |
| Interactive | A visible response to scroll/pointer with bounded range and a calm resting state |
| Wow | A moment of scale, reveal or transformation every viewport — not more effects, more *change* |
