# Moss & Milk · small-batch skincare shop
<!-- Darkroom example 056 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `shopify` | landing + catalog | `luxury` + `catalog` | `animated` | none | `reveal.js` |

## Say this
> /darkroom restyle our existing Shopify skincare store so it feels calmer and more expensive, without losing our products or reviews. Ingredients should be clear on product pages, and the routine builder (morning, evening) should be easy on phones.

## Build spec

### Brief & signature
Moss & Milk makes eight balms, oils and cleansers in small batches in the Lake District, € 18–46. The store exists (Dawn-based theme, 300 reviews in a review app). Visitors are skincare-careful buyers on phones. Feeling: soft, botanical, careful. **Signature:** a two-tab routine builder (Morning · Evening) where each step is a product shown as a small tub on a numbered line, with "add the routine" adding all steps to the cart in one action. **Supporting:** a calm sand palette, ingredient lists with plain explanations, product photos on matching sand seamless.

### Stack & files
Restyle the current theme (ask: duplicate it first in Shopify admin, click-by-click steps given): new `sections/routine-builder.liquid` (blocks: step, product, tab), `snippets/ingredient-list.liquid` reading metafield `custom.ingredients` (list of {name, what it does}), updated `assets/base.css` tokens. Reviews app block kept as is. `darkroom platform check` then Shopify Theme Check.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Gloock | 400 | headings |
| Text | Figtree | 400, 500 | UI |

### Tokens
```css
:root { --ground: #f3eee6; --card: #faf7f2; --ink: #2b2723; --ink-60: #2b272399; --moss: #4d5b3a; --line: #2b27231a;
  --display: "Gloock", Georgia, serif; --text: "Figtree", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```
Theme settings map: `colors_background_1` → ground, `colors_text` → ink, `colors_accent_1` → moss, so the owner keeps editing colours in the theme editor.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| product photos ×8 | reshoot on `#f3eee6` seamless (NEEDS 1, optional; current photos work meanwhile) | Shopify media | 4:5 | reveal | current photos | each pot at a 15° turn, one sprig of the key ingredient, soft window light |
| hero | the eight products in a row on sand (NEEDS 2) | `<img>` 2400 px | cover | static | the best current photo | low angle, long shadow to the right |

### Nav
Header section: "Moss & Milk" Display 400 24 px; Shop · Routines · Ingredients · Our story; search, account, cart.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Fewer things on your skin, made slowly. | Display 400, clamp(38px, 5.2vw, 80px) | 1.05 / −0.01em | ink | left, columns 1–5, top 22 vh | rise 16 px |
| Sub | Eight balms, oils and cleansers made in small batches in the Lake District. | Text 400, 18 px | 1.55 | ink-60 | under H1 | delay 100 ms |
| CTA | Build your routine | Text 500, 16 px, moss fill, card text, radius 999 px | — | — | under sub | delay 200 ms |
| Rating | ★ 4.8 from 312 reviews | Text 500, 14 px | — | ink | under CTA, from the review app's real data | none |

### Sections
1. **Routine builder:** tabs Morning / Evening (`role="tablist"`), 3–4 steps per tab: number, product thumbnail, name, one line, price; "Add the evening routine · € 84" button adds all variants via the Cart AJAX API; works as links without JS.
2. **Bestsellers:** product cards on `--card`, no borders, name + size + price.
3. **Ingredients:** each key ingredient with one plain sentence ("Oat oil: calms dry patches").
4. **Product page:** ingredient list with "what it does", how to use, reviews block, size options.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Tab switch | click / arrow keys | 0 | 250 ms | `cubic-bezier(.4,0,.2,1)` | panel crossfade |
| Cards | in view | `i × 80 ms` | 600 ms | `--ease-out` | 16 px, 0 → 0, 1 |
| Add routine | click | 0 | 300 ms | `--ease-out` | button shows "Added · 3 items" |
Reduced motion: no travel.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Routine steps | vertical list, sticky add button at the bottom | 2 columns | 4 in a row | 4 in a row |
| Hero image | under copy, 4:3 | right | right | right |

### Acceptance
**First viewport:** at 1440 × 900 a warm sand page; a soft serif headline about fewer things on your skin, a moss button and the real review rating on the left; eight pots in a row with long shadows on the right. At 390 × 844 headline, button and rating, then the image; the routine builder adds a whole routine in one tap.
**Do not:** lose existing products, reviews or URLs; invent a rating; claim skin results; change checkout; delete the old theme (keep the duplicate).
