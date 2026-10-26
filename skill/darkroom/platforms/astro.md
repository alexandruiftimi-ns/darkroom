# Astro on Cloudflare (`astro`)

Checked on: 2026-10-26 against the docs below. The Astro docs listed an upgrade guide to **v7** on that date: check which major version `npm create astro` installs and read its upgrade notes.

## Choose it when
A fast site with several pages (landing + about + journal + contact), content in Markdown, components without shipping a framework to the browser, and free hosting on Cloudflare.

## Official docs to check before building
- https://docs.astro.build/en/install-and-setup/
- https://docs.astro.build/en/guides/deploy/cloudflare/
- https://docs.astro.build/en/guides/upgrade-to/ (the newest version's notes)
- https://developers.cloudflare.com/workers/static-assets/

## Ask before building
- Only pages (static), or anything per request (forms, logins, personalisation)? Static needs no adapter; per-request needs `@astrojs/cloudflare`.
- Will they edit content themselves? (Markdown files in the repo, or add a headless CMS later.)
- Installing Node packages is required: get a yes before `npm create astro`.

## What Darkroom delivers
Run the official generator, then add the design layer:
```
npm create astro@latest <name> -- --template minimal
npm install wrangler@latest --save-dev
```
`src/layouts/Base.astro` (head, header, footer), `src/pages/index.astro` and one file per page, `src/styles/tokens.css` imported once in the layout, `public/` for media and the recipes, `wrangler.jsonc`:
```jsonc
{ "name": "<name>", "compatibility_date": "<today>", "assets": { "directory": "./dist", "not_found_handling": "404-page" } }
```

## Where the design goes
`src/styles/tokens.css` (`:root`). Recipes: `public/recipes/` loaded with `<script src="/recipes/reveal.js" defer is:inline>`, or imported in a `<script>` (Astro bundles it).

## Preview and capture
`npx astro build && npx astro preview` (or `npx wrangler dev` for the Workers runtime), then `darkroom capture http://localhost:4321` (the port Astro prints).

## Deploy and free hosting
Cloudflare recommends **Workers** (static assets) for new projects, not Pages. Deploy with `npx astro build && npx wrangler deploy` (asks the user to log in once), or connect the Git repo in Workers & Pages with build command `npx astro build` and deploy command `npx wrangler deploy`. Free tier; `*.workers.dev` subdomain or a custom domain.

## Gotchas
- Cloudflare's Auto Minify can cause hydration mismatches: keep it off.
- Node built-ins fail on the Workers runtime in per-request mode ("Could not resolve"); static output has no such limit.
- Images: use `astro:assets` `<Image>` for responsive sizes, or `darkroom media derive` and plain `<img srcset>`.
