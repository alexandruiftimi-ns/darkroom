# Preview: the user always sees the site, live

Start it yourself, unasked, the first moment something runs (direction comps, the slice, a scaffold), keep it running for the session, and start it again in every new session (SKILL.md law 10). Give the user the addresses it prints: this computer, and their phone on the same Wi-Fi. Open pages **reload by themselves** when files change and keep their scroll position (a change to CSS only swaps the styles without a reload), so the user can watch the build while you work.

A link for people outside the network is different: ask first, recommended option first:

| Option | What it needs | Who can open it |
|---|---|---|
| **On your phone, same Wi-Fi** (always on, recommended) | nothing: phone and computer on the same network | only devices on that network |
| **A link to send someone** | a free tool install (Cloudflare's quick tunnel, no account) or the platform's own share (see below) | anyone with the link, until it is stopped |

Never open a public link without a clear yes: anyone with the link sees an unfinished site.

## Same Wi-Fi, live

```
darkroom preview <folder>                                  # a built site: serves it, live reload on
darkroom preview http://127.0.0.1:<port> --watch <folder>  # a dev server already running: relays it; reloads when <folder> changes
darkroom preview … --port 8800 --host 0.0.0.0              # defaults
darkroom preview … --no-live                               # no reload script injected (only if it breaks something)
```

Run it in the background (it runs until stopped) and give the user both addresses it prints. It also prints `live reload: on` or `live reload: off`: tell the user "it reloads by itself" **only** after `on`; with `off`, say "reload the page to see your changes". Never promise a refresh you have not seen happen. The relay rewrites the dev server's own address in pages (WordPress writes `http://127.0.0.1:9400/…` everywhere), so links and images work on the phone. When relaying, pass `--watch` with the folder you edit (the theme, `src/`) unless the dev server reloads by itself (Astro `npm run dev`, Next.js `next dev`, Hugo, Jekyll `--livereload` do). Port busy: the preview from the last session may still be running; reuse it or pass `--port`.

- On Windows the first run may show a firewall question for Node.js: tell the user to allow **private networks** only.
- Dev servers per platform: Astro `npx astro preview`, Next.js `npm run start`, Hugo `hugo server`, Jekyll `bundle exec jekyll serve`, WordPress / WooCommerce through Playground (port 9400), Shopify `shopify theme dev` (port 9292), Ghost local (2368). Then relay that port.
- Guest Wi-Fi, office networks and some routers block devices from seeing each other ("client isolation"). If the phone cannot open it, offer the link option.

## A link to send someone

- **Any platform that runs locally:** Cloudflare quick tunnel, no account: `cloudflared tunnel --url http://localhost:8800` prints a random `https://….trycloudflare.com` link. For testing only (no uptime guarantee, about 200 requests at a time). Installing `cloudflared` is an install: ask first.
- **Shopify:** `shopify theme share` uploads the theme as an unpublished theme in the user's store and returns a preview link (needs their store login).
- **Astro / plain HTML:** a free Cloudflare account and `npx wrangler deploy` give a `*.workers.dev` address (`platforms/astro.md`).

Record what was shared and when in `.darkroom/project.json` open items (`darkroom state --open preview:<what>`), and stop tunnels at the end of the session.
