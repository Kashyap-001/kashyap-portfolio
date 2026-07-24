# Kashyap Patel — Portfolio

Personal portfolio site. Plain HTML/CSS/JS, no build step, no framework.

Live at: https://kashyap.kashyap6334.workers.dev

## Run locally

Just open `index.html` in a browser, or serve it so relative paths behave exactly like production:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project structure

```
index.html               # all page content
styles.css                # all styling (colors, layout, responsive rules)
script.js                 # smooth scroll, scroll progress bar, scroll-scrubbed diagram
                           # assembly, cursor-follow ripple, word reveal, mobile nav toggle
favicon.svg                # "KP" monogram
og-image-template.html     # source template for assets/og-image.png (see below)
wrangler.jsonc              # Cloudflare Workers deploy config (name, assets directory)
.assetsignore                # files Cloudflare must NOT serve publicly (.git, .wrangler)
assets/
  og-image.png              # social share preview image (LinkedIn/Twitter/WhatsApp)
  projects/                 # per-project demo videos/screenshots or illustrative diagrams
  resume/                   # downloadable resume PDF
```

## Regenerating the OG share image

`assets/og-image.png` was generated once with a throwaway Playwright script (screenshotting
`og-image-template.html` at 1200x630). If you change the template and want a fresh image,
write a small one-off Node script using Playwright (`chromium.launch()` →
`page.setViewportSize({width:1200,height:630})` → `page.goto(fileURL)` →
`page.screenshot({path: 'assets/og-image.png'})`) and run it once — no need to keep the
script around afterward.

## Adding real project media

Some project folders under `assets/projects/` don't have real demo videos/screenshots yet
(they use an illustrative SVG diagram instead). Do NOT add a fabricated screenshot — either:
- copy the real demo asset from that project's own GitHub repo (as was done for
  `odoo-mcp-gateway/demo.mp4` + `chat-result.png`, pulled directly from the Odoo_MCP repo), or
- leave the illustrative diagram in `index.html` as-is until a real asset exists.

## Deploy (Cloudflare Workers — static assets)

This project is connected to Cloudflare's **Workers** product (not the older, separate "Pages"
product) using its static-assets deployment mode. The dashboard auto-detected this as a
"Static" framework and deploys via `npx wrangler deploy`, reading `wrangler.jsonc` for config.

**Critical: `.assetsignore` must always list `.git` and `.wrangler`.** Without it, Cloudflare's
asset uploader serves the *entire* repo directory publicly — including your git internals
(`.git/index`, `.git/objects/...`, commit history) — since it doesn't respect `.gitignore` for
this purpose. This bit us once already; don't remove `.assetsignore`.

### First-time setup (already done for this repo)

1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Connect to Git → select this repo.
3. It should auto-detect the static site and generate `wrangler.jsonc` on first deploy;
   this repo now commits that file explicitly instead of relying on auto-detection every time.

### Redeploying after changes

Push to `main`. **Automatic deployment-on-push has not been confirmed working for this
project** — the dashboard's Deployments tab showed nothing queued after a push during initial
setup. Until that's resolved, trigger a deployment manually from the Cloudflare dashboard
(Overview or Deployments tab) after each push, and check GitHub repo → Settings → Webhooks
to confirm a Cloudflare webhook is registered and firing on push events.

### Live URL

https://kashyap.kashyap6334.workers.dev — if this project ever gets renamed or moved to a
custom domain, update the `og:url`/`twitter:image` meta tags in `index.html` to match.
