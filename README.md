# Kashyap Patel — Portfolio

Personal portfolio site. Plain HTML/CSS/JS, no build step, no framework.

## Run locally

Just open `index.html` in a browser, or serve it so relative paths behave exactly like production:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project structure

```
index.html      # all page content
styles.css      # all styling (colors, layout, responsive rules)
script.js       # smooth scroll, active-nav-on-scroll, fade-in-on-scroll, mobile nav toggle
favicon.svg     # "KP" monogram
assets/
  projects/     # per-project demo GIFs/screenshots
  resume/       # optional resume PDF
```

## Adding real project media

Some project folders under `assets/projects/` don't have real demo GIFs/screenshots yet.
Do NOT add a fabricated screenshot — either:
- copy the real demo GIF from that project's own GitHub repo (e.g. Odoo_MCP's demo assets), or
- leave the terminal-card fallback in `index.html` as-is until a real asset exists.

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → select this repo.
3. Framework preset: `None`. Build command: (leave empty). Build output directory: `/`.
4. Deploy. Cloudflare auto-assigns a `.pages.dev` URL and redeploys on every push to `main`.

No `wrangler.toml` needed — this is a static Pages-via-Git deployment, not a Workers project.
