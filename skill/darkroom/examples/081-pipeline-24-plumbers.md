# Pipeline 24 · emergency plumbers
<!-- Darkroom example 081 · fictional business · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `static` | landing | `trust` + `bold` (colour) | `calm` | none | — |

## Say this
> /darkroom a site for our emergency plumbing company. People find us when water is coming through the ceiling, on their phone, panicking. Phone number huge, what to do right now, prices up front, areas we cover. Must load instantly.

## Build spec

### Brief & signature
Pipeline 24 is six Gas Safe and plumbing engineers covering Nottingham 24 hours a day; call-out £ 95 (day) / £ 145 (night). Visitors are in a hurry, on phones, often with wet hands. Feeling: calm, fast, reliable. **Signature:** a "Do this now" card under the phone number: three numbered steps with drawn icons (1 Turn off the stopcock, usually under the kitchen sink · 2 Switch off electrics near the leak · 3 Call us), so the visitor acts in the first 10 seconds. **Supporting:** a huge tap-to-call number, prices visible without tapping, a postcode coverage list, no web fonts at all.

### Stack & files
`index.html` with inline critical CSS (< 14 KB so the first screen is in the first round trip), `styles.css` for the rest, no JS. Host on Cloudflare Pages; target first screen ≤ 1 s on a throttled 3G profile (measure).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| All | system-ui stack | 400, 700, 800 | no downloads: speed is the brand here |

### Tokens
```css
:root { --ground: #ffffff; --ink: #0d1b2a; --ink-70: #0d1b2ab3; --blue: #0057d9; --amber: #ffb000; --wash: #eef4ff; --line: #0d1b2a1f;
  --text: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| icons ×3 | drawn in code (inline SVG, 2 px stroke) | 40 px | — | static | numbers only | stopcock, plug, phone |
| van photo | own (NEEDS 1), below the fold | `<img>` 1200 px, lazy | cover | static | none | the van outside a terraced house, livery visible |

### Nav
A 56 px bar: "Pipeline 24" 800 18 px; "Gas Safe registered" badge text (with the real number, TEMP); no menu on phones beyond an anchor list at the bottom.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Leak or burst pipe? We can be there in 60 minutes. | Text 800, clamp(28px, 4.4vw, 56px) | 1.1 / −0.01em | ink | top | none |
| Phone | 0115 496 0247 | Text 800, clamp(40px, 9vw, 96px) tabular | 1 | blue | under H1, a full-width tap-to-call button on phones (72 px tall) | none |
| Prices | Call-out £ 95 day · £ 145 night (18:00–08:00) · then £ 25 per 15 minutes | Text 700, 17 px tabular | 1.4 | ink | under the phone | none |
| Do this now | 1 · 2 · 3 steps with icons | Text 700 18 px titles, 400 16 px lines | 1.4 | ink | `--wash` card radius 12 px, amber 4 px left rule | none |

Arrival time, prices and coverage TEMP until the owner confirms them.

### Sections
Areas we cover (postcode list NG1–NG16 + towns), What we fix (list), Reviews (only from the review platform, linked), Gas Safe and insurance details, footer with company number.

### Motion
None: `calm`; even hover is a colour change only (150 ms).

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Phone | full-width button + sticky bottom call bar after scrolling | inline link 72 px | inline 96 px | inline |
| Do this now | under prices | under prices | right column beside H1 and phone | right |

### Acceptance
**First viewport:** at 390 × 844 (the main case) a white page: the one-line promise, a huge blue tap-to-call number as a full-width button, the prices in one line, and a pale blue card with three numbered steps starting with the stopcock; it renders in under a second on a slow connection (measured). At 1440 × 900 the steps sit in a right column.
**Do not:** load web fonts, sliders or chat widgets; hide prices behind "call for a quote"; use stock photos of smiling plumbers; claim "fastest in Nottingham".
