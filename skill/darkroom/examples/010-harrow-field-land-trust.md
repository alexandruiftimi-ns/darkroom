# Harrow & Field · farmland conservation trust
<!-- Darkroom example 010 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `wordpress` | landing | `trust` + `nature` | `calm` (one background loop) | none | — |

## Say this
> /darkroom a WordPress home page for a land trust that buys farmland to protect it. Full-screen video of fields with no dark layer on top: the footage should be calm enough at the top for the headline. A floating navigation bar.

## Build spec

### Brief & signature
Harrow & Field buys at-risk farmland in the Weald and leases it to young farmers on 30-year terms; members fund each purchase. Visitors are prospective members and donors. Feeling: grounded, long-term, credible. **Signature:** a raw aerial loop of hedged fields at dawn with no overlay; the copy lives in the sky band and needs no box. **Supporting:** a floating nav bar on a solid paper tint, a membership counter in plain numerals, calm states only.

### Stack & files
WordPress block theme (`darkroom platform scaffold wordpress`): pattern `patterns/hero-fields.php` with a Cover block using a video background (owner can swap it in the editor), template part `header.html`. Content pages stay in WordPress (`platforms/wordpress-content.md`).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Young Serif | 400 | via `theme.json` fontFace, local files |
| Text | Public Sans | 400, 600 | body and UI |

### Tokens
```css
:root { --ground: #f3efe4; --ink: 90 15% 12%; --field: #3f5b2e; --line: hsl(var(--ink) / .14);
  --display: "Young Serif", Georgia, serif; --text: "Public Sans", system-ui, sans-serif; --ease-state: cubic-bezier(.4,0,.2,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| fields loop | drone footage the trust owns, or free stock after a yes (`references/free-media.md`) | Cover block video, muted loop | cover, 50 % 70 % | autoplay, paused under reduced motion | poster | slow forward drift 80 m above hedged fields at dawn; top 38 % pale even sky; no roads, no buildings, no people; 10 s, loopable |

### Nav
Floating bar 16 px from the top and sides: `background: #f3efe4f2; border-radius: 12px; padding: 10px 14px 10px 20px; box-shadow: 0 1px 0 hsl(var(--ink) / .08)`. "Harrow & Field" Young Serif 20 px; Our land · Farmers · Membership · News, Public Sans 15 px ink-60; CTA "Become a member" `--field` fill, paper text, radius 8 px.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Farmland, kept for farming. | Display 400, clamp(42px, 6vw, 96px) | 1.0 / −0.02em | `#1d2416` | top 18 vh, left gutter, max 12ch | none |
| Sub | Members fund each purchase. Young farmers lease the land for thirty years. | Text 400, 19 px | 1.5 | `#1d2416cc` | under H1, max 440 px | none |
| CTA | Become a member | as nav, 17 px | — | — | under sub | — |
| Counter | 1,284 members · 612 hectares kept | Text 600, 15 px, tabular | 1.3 | `#1d2416` | bottom-left 32 px | none |

The sky must stay light enough for `#1d2416` at ≥ 4.5:1 on its brightest and darkest frame; check the worst frame (`references/craft.md`). Counter numbers are TEMP until the trust supplies them.

### Sections
1. **How it works:** three steps as text with a numeral (Members fund · We buy · Farmers lease), 40 words each.
2. **Our land:** a list of farms (name, county, hectares, farmer) from a WordPress query loop of a "Farm" post type registered in the theme's companion plugin note (or plain pages if the owner prefers; ask).
3. **News:** latest three posts.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Buttons and links | hover / focus | 0 | 150 ms | `--ease-state` | colour shift only |
| Video | load | 0 | — | — | plays muted |
Reduced motion: the Cover block shows the poster; no autoplay.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Nav | bar with mark + menu button; menu as a sheet from the top | full | full | — |
| H1 | 40 px, top 14 vh | 64 px | 96 px | 72 px |
| Video focal | 40 % 70 % | 50 % | 50 % | — |

### Acceptance
**First viewport:** at 1440 × 900 an aerial dawn over hedged fields fills the screen, untouched by any overlay; the dark serif headline sits in the pale sky top-left with its sub and green button; the floating paper nav at the top; member numbers bottom-left. At 390 × 844 the same, the fields re-aimed so a hedge line crosses the lower third.
**Do not:** add any overlay or gradient on the video; use footage with a busy or dark sky; animate the counter; hard-code page content in the theme; hotlink the footage.
