# Kashyap Patel — Portfolio

My personal portfolio. React + Vite + TypeScript + Tailwind v4 + Framer Motion + Lenis.

Started as a plain HTML/CSS/JS site (no build step, on purpose) — moved it to React so I could
actually use some of the animate-ui / inspira-ui style components without fighting a static
site. Old version is still sitting in `legacy/` if I ever want to look back at it.

Live: https://kashyap.kashyap6334.workers.dev

## Local dev

```bash
npm install
npm run dev
```

`http://localhost:5173`. If I want to test on my phone, `npm run dev -- --host` and open the
LAN address it prints on the phone (same WiFi).

## Structure

```
src/
  App.tsx           # everything gets mounted here, no router, it's one page
  main.tsx          # Lenis + Framer Motion providers wrap App here
  index.css          # theme tokens (@theme block), base styles
  components/         # animate-ui/ = shadcn-installed stuff, some of it hand-edited, be careful
  data/               # projects, skills, links — content lives here not in JSX
  hooks/
public/assets/       # resume, og-image, project media
legacy/                # old static version, not built/deployed anymore
```

## animate-ui bits

Some components under `src/components/animate-ui/` came from the shadcn CLI pointed at
animate-ui's registry (`npx shadcn add https://animate-ui.com/r/components-<x>-<y>.json`).
Not an npm package, it's copy-pasted into the repo.

Gotchas:
- `tsconfig.app.json` has `noUnusedLocals`/`noUnusedParameters` off because the vendored files
  always have an unused React import and I'm not fixing that every time.
- `animate-ui/components/animate/tabs.tsx` — I edited the colors by hand (the sliding highlight
  + active tab text were generic gray, changed to the green accent). If I ever re-run the
  install for this one it'll stomp those edits, redo them.
- `FluidCursor.tsx` is NOT from animate-ui, it's a straight port of inspira-ui's Fluid Cursor
  (Vue → React, from `unovue/inspira-ui`). Real WebGL fluid sim, ~1350 lines, mostly copy-pasted
  as-is — only changed the color (green instead of random rainbow) and dropped the resolution a
  bit on mobile.

## Theme

One accent color, `--primary` (`#22c55e`), everything else in `src/index.css`'s `@theme` block.
Don't use Tailwind's own `accent`/`bg-accent` classes for the brand color — that's a different
shadcn token that ended up mapped to gray, easy to mix up.

Breakpoint is `700px` not the Tailwind default 768, set via `--breakpoint-md`. Just use `md:` as
normal, it's already overridden.

`<html class="dark">` in index.html needs to stay — without it none of the shadcn/animate-ui
`dark:` classes apply (found this out the hard way, whole Hole Background thing looked wrong
because of it before I ripped that component out).

## Deploy

Cloudflare Workers, static assets mode. Two ways this can deploy and I need to remember which
one's actually on:

1. GitHub Actions (`.github/workflows/deploy.yml`) — builds then `wrangler deploy`. Needs
   `CLOUDFLARE_API_TOKEN` set as a repo secret or it just won't run.
2. Cloudflare's dashboard has its own git integration from back when this was a static site
   with no build step. If that's still wired up and its build command isn't `npm run build` /
   output `dist`, it'll deploy the wrong thing. Check the dashboard before assuming a push just
   works — either fix its build settings to match or turn it off and just use the Action.

`wrangler.jsonc` points `assets.directory` at `./dist` now, not the repo root like before.

If the domain ever changes, update `og:url` in `index.html` and the live link above.
