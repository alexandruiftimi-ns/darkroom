# Shopify theme (`shopify`)

Checked on: 2026-10-26 against the docs below. Shopify's newest reference themes are **Horizon** (the default for new stores, built on theme blocks) and the minimal **Skeleton** theme (`shopify theme init`); Dawn is the older reference.

## Choose it when
A shop that must just work: payments, tax, shipping, inventory, apps, all handled by Shopify. The user pays Shopify monthly plus transaction fees. Darkroom builds the theme (the design), never the store setup.

## Official docs to check before building
- https://shopify.dev/docs/storefronts/themes/architecture
- https://shopify.dev/docs/storefronts/themes/architecture/layouts
- https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks
- https://shopify.dev/docs/storefronts/themes/tools/cli
- https://github.com/Shopify/skeleton-theme and the Horizon release notes (what the reference themes do now)

## Ask before building
- **New theme or restyle?** A Darkroom theme from scratch (full design control), or customise their current theme (often Horizon or Dawn) inside its own settings and blocks (cheaper, keeps their apps working). A restyle is built in their theme from the first comp (`shopify theme pull --store <store>`, then `shopify theme dev`), never as an HTML preview first (`commands/platform.md` §3).
- Do they have a store yet? To preview, Darkroom needs a store: a free development store from a Shopify Partner account, or theirs (with a staff/collaborator account).
- Products: how many, variants, collections, which ones to feature? Real product photos, or placeholders until they arrive?
- Apps they rely on (reviews, subscriptions, bundles): their blocks must keep working.
- Markets and languages: every visible string goes through `locales/`.

## What Darkroom delivers
An Online Store 2.0 theme: `layout/theme.liquid` (`{{ content_for_header }}` in `<head>`, `{{ content_for_layout }}` in `<body>`), JSON templates (`templates/index.json`, product, collection, cart, page, search, 404) that list sections the merchant can reorder, `sections/` (hero, main-product, main-collection, main-cart…, each with a `{% schema %}`), header and footer **section groups**, `blocks/` (theme blocks, accepted by sections with `"blocks": [{ "type": "@theme" }]` and `{% content_for 'blocks' %}`), `snippets/`, `config/settings_schema.json` (colours and fonts the merchant can change), `locales/en.default.json`. Only these folders upload. Start with `darkroom platform scaffold shopify`.

## Where the design goes
`config/settings_schema.json` defines colour and font settings with Darkroom's values as defaults; `layout/theme.liquid` writes them into CSS variables; `assets/base.css` uses only the variables. Recipes: `assets/`, loaded with `{{ 'reveal.js' | asset_url }}`.

## Preview and capture
Shopify CLI (free, through npx; ask first): `npx @shopify/cli@latest theme check` (lint, no store needed), then `shopify theme dev --store <store>` (needs the user to log in once) serves a live preview at `http://127.0.0.1:9292`: `darkroom capture` that URL. Without a store, say "Theme Check passed; not rendered" and capture nothing.

## Deploy and free hosting
`shopify theme push --unpublished` uploads it as a draft; the user publishes it from Online Store → Themes. Or zip the theme folders and upload. Hosting is Shopify's (paid plan).

## Gotchas
- No `{{ content_for_header }}` / `{{ content_for_layout }}` = the theme cannot be saved.
- Only the listed folders exist; anything else is ignored (use `.shopifyignore`).
- Images through `image_url` + `image_tag` with `widths` and `sizes`; never hard-code CDN URLs.
- Never fake scarcity, reviews or "sold out" states; use the real Liquid objects.
- Theme Store submission has extra requirements (performance, accessibility, presets): only if the user wants to sell the theme.
