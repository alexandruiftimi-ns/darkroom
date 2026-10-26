# WooCommerce store (`woocommerce`)

Checked on: 2026-10-26 against the docs below and WooCommerce's own block templates (trunk, same date).

## Choose it when
A shop on WordPress: the client already runs WordPress, wants no monthly platform fee, or wants to own the shop and its data. Shopify is simpler to run; WooCommerce is more flexible and cheaper at small scale. Recommend from what they have.

## Official docs to check before building
- https://developer.woocommerce.com/docs/theming/block-theme-development/theming-woo-blocks/
- https://github.com/woocommerce/woocommerce/tree/trunk/plugins/woocommerce/templates/templates/blockified (Woo's current block templates: copy structure, not wording)
- https://woocommerce.com/document/woocommerce-blocks/ (Cart and Checkout blocks)
- everything in `platforms/wordpress.md`

## Ask before building (in addition to WordPress's questions)
- **Own block theme, the default theme, or their current one?** WooCommerce works with WordPress's default theme out of the box. Options: (A) Darkroom's own block theme with shop templates (recommended for a new shop or block-editor pages), (B) a child of the default theme, restyled through `theme.json`, Woo's templates untouched, (C) restyle their current theme (recommended when a page builder owns their pages: WordPress's "What are the pages built with?").
- What do they sell: how many products, variations (size, colour), physical or digital, subscriptions?
- Payments (WooPayments, Stripe, PayPal: each has its own fees and sign-up), shipping zones, taxes, currency, markets. Darkroom designs for them; the user signs up.
- Which shop pages get a custom design: product, shop/category, cart, checkout? Only override what is redesigned.

## What Darkroom delivers
The WordPress theme plus `templates/single-product.html` and `templates/archive-product.html` built from WooCommerce blocks (`woocommerce/product-image-gallery`, `product-price`, `add-to-cart-form`, `product-collection`, `product-template`, `breadcrumbs`, `store-notices`…). Other overridable templates: `taxonomy-product_cat.html`, `taxonomy-product_tag.html`, `product-search-results.html`, `page-cart.html`, `page-checkout.html`, `order-confirmation.html`, `page-coming-soon.html`; parts `mini-cart.html`, `checkout-header.html`. Start with `darkroom platform scaffold woocommerce`.

## Where the design goes
`theme.json` (Woo blocks read its palette, fonts and button styles), `assets/site.css` for product-grid details.

## Preview and capture
WordPress Playground with WooCommerce and sample products (blueprint):
```json
{ "steps": [
  { "step": "installPlugin", "pluginData": { "resource": "wordpress.org/plugins", "slug": "woocommerce" }, "options": { "activate": true } },
  { "step": "setSiteOptions", "options": { "woocommerce_coming_soon": "no" } },
  { "step": "activateTheme", "themeFolderName": "<theme>" },
  { "step": "runPHP", "code": "<?php require '/wordpress/wp-load.php'; $p = new WC_Product_Simple(); $p->set_name('Sample'); $p->set_regular_price('48'); $p->set_status('publish'); $p->save();" }
] }
```
Capture `/shop/`, a product, the cart and checkout (add to cart first with a `states.json` click).

## Deploy and free hosting
As WordPress. Free hosting is not realistic for a shop (payments need HTTPS, a reliable host and backups).

## Gotchas
- **New stores start in "Coming soon" mode**: visitors (and captures) see a placeholder page instead of the shop. Tell the user to switch WooCommerce → Settings → Site visibility to Live at launch; in Playground set the `woocommerce_coming_soon` option to `no`.
- Several Woo blocks save HTML even when they look self-closing (product price and product image save `<div class="is-loading"></div>`; product details saves a div). Hand-written markup that differs shows "unexpected or invalid content" in the Site Editor. Get the exact markup by serialising the block in the editor (`wp.blocks.serialize(wp.blocks.createBlock(name, attrs))`) or by building the template in the Site Editor and exporting it. Never put style attributes (`fontSize`) on Woo blocks by hand; style them in `theme.json` `styles.blocks`.
- Cart and Checkout are blocks by default; customise them through their inner blocks and `theme.json`, not PHP templates.
- Never invent prices, stock, reviews or "only 2 left". Sample products are marked as samples.
- Compliance matters more in a shop: prices with tax, delivery costs, withdrawal rights, terms (`commands/comply.md`).
