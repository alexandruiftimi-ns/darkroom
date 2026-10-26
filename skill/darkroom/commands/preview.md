# Preview: let the user open the site on their phone

Offer it at the first checkpoint where something runs (direction comps or the slice), once. Ask with the requirements stated, recommended option first:

| Option | What it needs | Who can open it |
|---|---|---|
| **On your phone, same Wi-Fi** (recommended) | nothing: phone and computer on the same network | only devices on that network |
| **A link to send someone** | a free tool install (Cloudflare's quick tunnel, no account) or the platform's own share (see below) | anyone with the link, until it is stopped |
| **No, screenshots are fine** | nothing | nobody |

Never open a public link without a clear yes: anyone with the link sees an unfinished site.

## Same Wi-Fi

```
darkroom preview <folder>                         # a built site: serves it
darkroom preview http://127.0.0.1:<port>          # a dev server already running: relays it
darkroom preview … --port 8800 --host 0.0.0.0     # defaults
```

It prints `phone (same Wi-Fi): http://192.168.x.x:8800/`. Run it in the background and give the user that address. The relay rewrites the dev server's own address in pages (WordPress writes `http://127.0.0.1:9400/…` everywhere), so links and images work on the phone. It runs until stopped; stop it when the session moves on.

- On Windows the first run may show a firewall question for Node.js: tell the user to allow **private networks** only.
- Dev servers per platform: Astro `npx astro preview`, Next.js `npm run start`, Hugo `hugo server`, Jekyll `bundle exec jekyll serve`, WordPress / WooCommerce through Playground (port 9400), Shopify `shopify theme dev` (port 9292), Ghost local (2368). Then relay that port.
- Guest Wi-Fi, office networks and some routers block devices from seeing each other ("client isolation"). If the phone cannot open it, offer the link option.

## A link to send someone

- **Any platform that runs locally:** Cloudflare quick tunnel, no account: `cloudflared tunnel --url http://localhost:8800` prints a random `https://….trycloudflare.com` link. For testing only (no uptime guarantee, about 200 requests at a time). Installing `cloudflared` is an install: ask first.
- **Shopify:** `shopify theme share` uploads the theme as an unpublished theme in the user's store and returns a preview link (needs their store login).
- **Astro / plain HTML:** a free Cloudflare account and `npx wrangler deploy` give a `*.workers.dev` address (`platforms/astro.md`).

Record what was shared and when in `.darkroom/project.json` open items (`darkroom state --open preview:<what>`), and stop tunnels at the end of the session.
