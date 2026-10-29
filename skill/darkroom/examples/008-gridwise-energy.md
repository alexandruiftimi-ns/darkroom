# Gridwise · grid-balancing software for regional utilities
<!-- Darkroom example 008 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing (single viewport) | `modern` | `hero-effect` | none (canvas line, light) | — |

## Say this
> /darkroom a single-screen landing page for software that balances power grids. Black background, never flashes white, an animated line like an oscilloscope across the screen drawn in code, three key facts at the bottom. No video.

## Build spec

### Brief & signature
Gridwise forecasts solar and wind swings for regional utilities and shifts load before a frequency dip. Visitors are grid operators and procurement leads. Feeling: calm under pressure, exact. **Signature:** a single luminous line across the full width that behaves like a live frequency trace at 50 Hz: it wobbles, then visibly flattens every 6 s as "Gridwise" corrects it, drawn on a canvas at 1 px with a soft glow. **Supporting:** a strict grid of hairlines, mono labels, a fail-safe entrance.

### Stack & files
One `index.html` with inline critical CSS and `trace.js` (module). Fonts self-hosted next to it. No framework, no libraries.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Onest | 400, 600 | headline 400 |
| Mono | JetBrains Mono | 400 | labels and facts |

### Tokens
```css
html, body { background: #050607; color: #eef2f0; } /* first rule: the page can never paint white */
:root { --ground: #050607; --ink: 150 10% 94%; --trace: #9df2c8; --warn: #ffb35c; --line: hsl(var(--ink) / .08);
  --display: "Onest", system-ui, sans-serif; --mono: "JetBrains Mono", ui-monospace, monospace; --ease-out: cubic-bezier(.16,1,.3,1); }
```

### Verbatim utilities
```js
// trace.js: 50 Hz trace with a deviation that is corrected every 6 s; draws only while visible
const c = document.querySelector('canvas'), g = c.getContext('2d'), dpr = Math.min(devicePixelRatio, 2);
let t0 = performance.now(), on = true;
const size = () => { c.width = innerWidth * dpr; c.height = 220 * dpr; }; size(); addEventListener('resize', size);
new IntersectionObserver(([e]) => (on = e.isIntersecting)).observe(c);
function frame(now) {
  if (on && !document.hidden) {
    const phase = ((now - t0) / 6000) % 1, dev = phase < .55 ? Math.sin(phase / .55 * Math.PI) : 0; // swing, then flat
    g.clearRect(0, 0, c.width, c.height); g.lineWidth = 1.25 * dpr; g.strokeStyle = dev > .02 ? '#ffb35c' : '#9df2c8';
    g.shadowColor = g.strokeStyle; g.shadowBlur = 12 * dpr; g.beginPath();
    for (let x = 0; x <= c.width; x += 3 * dpr) { const k = x / c.width;
      const y = c.height / 2 + Math.sin(k * 38 + now / 400) * (4 + dev * 46) * dpr * Math.sin(k * Math.PI); x ? g.lineTo(x, y) : g.moveTo(x, y); }
    g.stroke();
  }
  requestAnimationFrame(frame);
}
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(frame);
else { /* draw one flat corrected trace */ }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| trace | drawn in code | `<canvas aria-hidden="true">` 100 % × 220 px | vertically centred at 58 % | rAF while visible | a static SVG flat line in `--trace` | — |

### Nav
Top row inside a 12-column grid, 72 px: "Gridwise" Onest 600 17 px; Product · Operators · Company in mono 12 px +0.06em ink-60; CTA "Request a pilot" Onest 600 14 px, `--trace` 1 px border, radius 4 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Label | [ 50.00 Hz ] Live trace, simulated | Mono 400, 12 px | 1 / +0.06em | ink-60 | above H1 | fade |
| H1 | Hold the line at 50 hertz. | Display 400, clamp(44px, 6.4vw, 104px) | 0.96 / −0.035em | ink-100 | left, top 20 vh, columns 1–8 | rise 16 px, 700 ms |
| Sub | Gridwise forecasts solar and wind swings 40 minutes ahead and shifts flexible load before the frequency moves. | Display 400, 18 px | 1.5 | ink-60 | columns 1–5 | delay 120 ms |
| CTA | Request a pilot | as nav, 16 px, filled `--trace`, ground text | — | — | under sub | delay 220 ms |
| Facts ×3 | 40 min forecast horizon · 3 utilities in pilot · 0 hardware to install | Mono 400, 13 px; numbers Display 400 40 px tabular | 1.2 | ink-100 / ink-60 | bottom row, 3 columns, hairline above | delay 320 ms |

Facts are TEMP until the company confirms every number.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Text group | load | `i × 100 ms` | 700 ms | `--ease-out` | 16 px, 0 → 0, 1 |
| Fail-safe | 2 frames after load | — | — | — | JS sets `.entered` on body; CSS without `.js` class shows final state |
| Trace | always while visible | — | 6 s cycle | sine | amplitude swing → flat |
Reduced motion: one flat green trace, text final.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| H1 | 40 px | 72 px | 104 px | 80 px |
| Trace | height 140 px at 64 % | 200 px | 220 px | 160 px |
| Facts | stacked, 2 + 1 | 3 columns | 3 columns | hidden below fold |

### Acceptance
**First viewport:** at 1440 × 900 a near-black screen with a thin grid; the headline left, a green trace across the whole width that swells amber and settles flat every six seconds; three mono facts on a hairline at the bottom. The early frame at 350 ms is already near-black. At 390 × 844 everything fits without scrolling except the third fact.
**Do not:** show a fake dashboard; claim real-time data (the label says simulated); glow anything but the trace; use more than the two colours `--trace` and `--warn`; let the canvas run in a hidden tab.
