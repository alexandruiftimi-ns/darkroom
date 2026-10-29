# Glass cinema

**Idea:** the polished AI-startup look seen everywhere in 2026: one slow film behind frosted glass controls and a large, quiet headline. Use it **only when the user asks for that look** ("like those cinematic AI startup sites", "glassy, dark, video behind"). It fits in with that crowd; it does not stand out from it. Say so once, in one line, and build it well.
**Use for:** AI and software launches, studios, events and apps whose owner wants to look current. **Not for:** shops with many products, restaurants, clinics, publications, anyone who wants to be remembered as different.

## Colour — disciplined
Ground = the footage's edge colour (`references/hero-media.md`), usually a near-black `#050505–#0c0c0c` or a deep tinted dark. Ink off-white `#f4f4f2` with opacity steps 100 / 80 / 60 / 40. No accent colour in the chrome; the one bright thing is the footage's highlight. Primary button = ink fill, ground text.

## Type
Display: a neutral grotesk at regular or light weight (Manrope, Hanken Grotesk, Figtree, Onest), `clamp(44px, 7.5vw, 120px)`, leading 0.95, tracking −0.03em. **Serif accent:** 1–3 words in an editorial serif (Newsreader, Fraunces, Literata) **muted to ink-60**, never brighter than the sans words. Text: the same grotesk at 16–18 px, ink-60. Never Inter as the whole identity.

## Layout
Centred stack or bottom-anchored over a full-bleed loop; floating pill nav 12–16 px from the top. One material class reused on the nav, the badge and secondary buttons, nowhere else.

## Imagery
One continuous slow shot per section: an object in a void, a surreal calm scene or abstract terrain with one rim glow. Edges fall off to the ground; an empty zone behind the copy. AI-generated or drawn in code; never a stock clip with a visible seam.

## Motion
Signature: the film itself. Supporting: a blur-rise entrance (nav → badge → H1 → sub → CTA, done by 1.5 s), video fade-in on `loadeddata` (500 ms) with a 1.06 → 1 settle (1.8 s), a manual loop with opacity fades near the end. Nothing else moves.

## Switches
eyebrow ON (badge with an inner chip, one only) · tracked-caps OFF · index-numerals OFF · hairlines SPARING · cards SPARING · glass ON (one material, reused) · gradients OFF (scrims only) · mono-labels OFF · centred-layout ON · marquee SPARING · custom-cursor OFF · full-bleed-imagery ON · script-lettering OFF

## Material (verbatim)
```css
.glass { background: hsl(0 0% 100% / .04); backdrop-filter: blur(14px) saturate(1.2); -webkit-backdrop-filter: blur(14px) saturate(1.2);
  border: 1px solid hsl(0 0% 100% / .10); box-shadow: inset 0 1px 0 hsl(0 0% 100% / .14); border-radius: 999px; }
@supports not (backdrop-filter: blur(1px)) { .glass { background: hsl(0 0% 8% / .82); } }
```
For larger panels (a card, a menu sheet) with an edge highlight, Chromium refraction and a reduced-transparency fallback, start from `recipes/liquid-glass.css`; keep the values above for pills. Hero video: `recipes/video-layer.js` + `video-loop.js` + `scrim.css`.

## Must-have
Footage with edge colour = ground and an empty zone; text protected by shadow (`references/craft.md`, "Text over media"), not boxes; one material class; poster = first frame; the loop seam masked; reduced motion shows the poster still and the final entrance state.

## Never
Purple or indigo gradients · glow orbs · invented avatars, logos or stats (proof stays `TEMP` until the user supplies real numbers) · Inter as the whole identity · glass on body text containers · more than one badge.

## Exceptions log (write it automatically)
`pack glass-cinema switches on badge, glass, serif accent and centred layout at the user's request` (these are tells in `references/tells.md` when used by default).

## Image prompt seed
"single continuous slow <orbit | drift | push-in> shot of <one object or calm surreal scene>, edges falling off to flat <ground hex>, empty dark negative space in the <centre-top | left 45 %>, one soft rim light, 2–3 hues, loopable, no text, no logos, no UI"
