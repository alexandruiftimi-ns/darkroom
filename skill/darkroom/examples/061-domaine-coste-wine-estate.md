# Domaine Coste · organic wine estate with an online cellar
<!-- Darkroom example 061 · fictional estate · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `woocommerce` | landing + catalog | `luxury` + `nature` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a WooCommerce site for our family wine estate in the Languedoc: the wines with tasting notes and food pairings, visits and tastings to book, and an age check that is not annoying. Earthy, sunny, honest.

## Build spec

### Brief & signature
Domaine Coste farms 18 hectares organically near Pic Saint-Loup; nine wines, € 11–38; tastings on the terrace. Visitors are wine lovers in France, Belgium and Germany. Feeling: sun on stone, unpretentious, rooted. **Signature:** each wine's page leads with its parcel: a small drawn-in-code map of the estate (SVG outlines of the 12 parcels) with the wine's parcel filled in its own colour, plus soil, slope and harvest date in mono; the shop grid shows the same tiny map on each card. **Supporting:** a sun-faded palette, mask reveals on bottle photos, a one-line age notice instead of a gate.

### Stack & files
Block theme + WooCommerce; product attributes: colour, grape, parcel id, soil, harvest; `assets/parcels.svg` (12 paths with ids); `patterns/parcel-map.php` highlights `#parcel-{id}` via a CSS class; tastings sold as WooCommerce bookable products or a link to the booking tool (ask).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Fraunces | 500 (SOFT 100) | headings, wine names |
| Text | Karla | 400, 600 | UI |
| Data | DM Mono | 400 | soil, slope, dates |

### Tokens
```css
:root { --ground: #f5efe4; --ink: #2c241d; --ink-60: #2c241d99; --garrigue: #6f7a48; --grenache: #8c2f39; --line: #2c241d1f;
  --display: "Fraunces", Georgia, serif; --text: "Karla", system-ui, sans-serif; --mono: "DM Mono", ui-monospace, monospace; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| hero vines | own photo (NEEDS 1) | `<img>` 2400 px | cover, 50 % 70 % | static | garrigue field | old bush vines on white limestone at late afternoon, the Pic in the distance, sky top 35 % |
| bottles ×9 | own studio shots on `#f5efe4` | Woo images | 2:5 | mask reveal | label text only | bottle front-on, soft shadow |
| parcel map | drawn from the cadastral outline (NEEDS 2: the parcel plan) | inline SVG | contain | highlight | none | thin ink lines, parcels filled at 20 % |

### Nav
Header: "Domaine Coste" Display 500 24 px; Wines · Visit · The estate · FR/EN/DE; cart. A 32 px notice bar: "You must be of legal drinking age to buy wine. We check at delivery." (no gate).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Nine wines from eighteen hectares of stone. | Display 500, clamp(40px, 6vw, 96px) | 1.0 / −0.015em | `#fffaf2` | left gutter, bottom 14 vh, max 12ch | rise 20 px |
| Sub | Organic Grenache, Syrah and Carignan from the foot of Pic Saint-Loup, farmed by the Coste family since 1952. | Text 400, 18 px | 1.5 | `#fffaf2cc` | under H1, max 420 px | delay 120 ms |
| CTA | Shop the wines · Book a tasting | ground fill + outline | — | — | under sub | delay 220 ms |

Shadow on text `0 2px 18px rgba(0,0,0,.42)`; bottom scrim from `#2c241d99`.

### Sections
Wines grid (bottle, name, vintage, € incl. VAT, tiny parcel map), The estate (parcel map large with the 12 parcels named), Visit (tastings Thu–Sat, € 15, booking), Food pairings on each product page, legal: alcohol notices per market (France: "L'abus d'alcool est dangereux pour la santé" required).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Bottles | in view | `i × 80 ms` | 800 ms | `cubic-bezier(.22,1,.36,1)` | clip-path inset(100% 0 0 0) → 0 |
| Parcel highlight | load of product page | 300 ms | 600 ms | ease-out | fill-opacity .2 → 1 |
Reduced motion: final states.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Grid | 2 columns | 3 | 4 | — |
| Notice bar | wraps to two lines | one | one | one |

### Acceptance
**First viewport:** at 1440 × 900 old vines on white stone in late sun, the serif headline and two buttons bottom-left; a thin notice about drinking age at the top instead of a pop-up. At 390 × 844 the same, with the vines re-cropped around the Pic.
**Do not:** put an age gate in front of the content; omit the French health notice where required; show prices without VAT; invent medals.
