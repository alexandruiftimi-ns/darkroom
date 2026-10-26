# Next.js on Vercel (`nextjs`)

Checked on: 2026-10-26 against the docs below.

## Choose it when
The user wants React, already has a Next.js codebase, or the site will grow into an app (accounts, dashboards, APIs). For a pure marketing site with no app ahead, `astro` or `static` is lighter: say so once.

## Official docs to check before building
- https://nextjs.org/docs/app/getting-started/installation
- https://nextjs.org/docs/app/guides/static-exports
- https://nextjs.org/blog (the latest major release notes)
- https://vercel.com/docs/plans/hobby

## Ask before building
- Is it commercial? **Vercel Hobby (free) is for personal, non-commercial use only**; a business needs Pro, or a static export hosted elsewhere (Cloudflare, Netlify).
- Static export (any host, no server features) or full Next.js on Vercel (server components per request, API routes, image optimisation)?
- Installing Node packages is required: get a yes before `create-next-app`.

## What Darkroom delivers
```
npx create-next-app@latest <name>
```
(accept TypeScript, App Router; Tailwind only if the user wants it: tokens stay in CSS either way). Then: `app/layout.tsx` (fonts via `next/font`, header, footer), `app/page.tsx` and one folder per route, `app/tokens.css` imported in the layout, `public/` for media and recipes. For a static site add `output: 'export'` to `next.config`.

## Where the design goes
`app/tokens.css` (`:root`). Recipes: load `public/recipes/reveal.js` with `next/script` (`strategy="afterInteractive"`) or port the recipe into a client component (`'use client'`, run it in `useEffect`).

## Preview and capture
`npm run build && npm run start` (or `npx serve out` for a static export), then `darkroom capture http://localhost:3000`.

## Deploy and free hosting
Vercel: import the Git repo; builds on every push. Static export: upload `out/` to Cloudflare, Netlify or any host.

## Gotchas
- Static export does not support: cookies, rewrites, redirects, headers, proxy, ISR, server actions, default image optimisation (use a custom loader or plain `<img>`), dynamic routes without `generateStaticParams`.
- Animation code must not touch `window` during server rendering: run it in `useEffect` in a client component.
- Each major version renames things (middleware became `proxy`): follow the live docs, not memory.
