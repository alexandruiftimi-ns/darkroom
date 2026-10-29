# Corner Cup · a café one-pager (the fast lane)
<!-- Darkroom example 098 · fictional café · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing (one file) | `restaurant` | `hero-effect` (light) | none | — |

## Say this
> /darkroom just a quick one-page site for my café, show me something today. Corner Cup, Ghent, open 7 to 4, good coffee and cardamom buns.

## Build spec

### Brief & signature
The fast lane (`commands/concierge.md`): no question rounds; defaults are static, one `index.html`, quick check, palette suggested from the subject, assets drawn in code and marked TEMP. Darkroom says back: "A one-file page, warm and morning-bright; the steam from a cup rises over the headline. I've marked the photo spot as temporary." Corner Cup is a 20-seat corner café in Ghent. **Signature:** a cup drawn in SVG on the right with three steam lines that drift up in a 4 s loop (stroke-dashoffset), the only motion on the page. **Supporting:** hours as the second-biggest text, a menu of six items, a map link.

### Stack & files
One `index.html` with inline CSS and a 10-line inline script for "open now"; fonts self-hosted next to it.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Young Serif | 400 | headline |
| Text | Figtree | 400, 600 | rest |

### Tokens
```css
:root { --ground: #fbf3e6; --ink: #2b1f17; --ink-60: #2b1f1799; --coffee: #6b3e26; --cardamom: #7c8c4a; --line: #2b1f171a;
  --display: "Young Serif", Georgia, serif; --text: "Figtree", system-ui, sans-serif; }
```
Palette suggested from the subject (oat, coffee, cardamom green); the user can swap it later.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| cup | drawn in code | inline SVG 360 × 360 | right | steam loop | static cup | a simple line cup on a saucer, 3 px coffee stroke |
| photo | TEMP (NEEDS 1: a photo of the counter) | `<img>` placeholder box 4:3 with "Your counter photo here" | — | — | the box | the counter with the bun tray, morning light |

### Nav
None: a one-pager; the café name sits in the hero.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Name | Corner Cup · Ghent | Text 600, 14 px +0.12em caps | 1 | coffee | top-left 32 px | none |
| H1 | Good coffee on the corner, from seven. | Display 400, clamp(40px, 6vw, 92px) | 1.02 / −0.01em | ink | left, columns 1–7, top 24 vh | none |
| Hours | Open today 7:00–16:00 | Text 600, 22 px tabular, green dot when open | 1.3 | ink | under H1 | none |
| CTA | Find us → | Text 600, 17 px underline | — | coffee | under hours | none |
| Cup | — | — | — | — | columns 8–12 | steam |

### Sections
Menu (six items with prices: espresso, flat white, filter, cardamom bun, cinnamon bun, sourdough toast; TEMP), Find us (address, a link to a map service, no embed), footer.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Steam lines ×3 | always while visible | `i × 0.6 s` | 4 s loop | ease-in-out | stroke-dashoffset 100 % → 0 → −100 %, opacity 0 → .8 → 0 |
Reduced motion: steam drawn still.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Cup | 200 px under the CTA | right | right | right |
| H1 | 38 px | 64 px | 92 px | 70 px |

### Acceptance
**First viewport:** at 1440 × 900 an oat-coloured page with the café name small at the top, a warm serif headline, today's hours with a green dot, and a line-drawn cup with steam slowly rising on the right. At 390 × 844 headline, hours, link, then the cup. Delivered with one offer: "Want this on WordPress or with a menu you can edit? I'll ask three questions."
**Do not:** ask questions before showing the page; leave the TEMP photo unmarked; add more motion; claim opening hours beyond what the user said.
