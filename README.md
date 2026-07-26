# Kashyap Patel — Portfolio

This is the source for my personal portfolio site: https://kashyap.kashyap6334.workers.dev

Built with React, Vite, TypeScript, Tailwind CSS v4, Framer Motion, and Lenis for smooth
scrolling. It started out as a plain HTML/CSS/JS site with zero dependencies — I rewrote it in
React so I could pull in some animated UI components (from animate-ui, plus a hand-ported WebGL
cursor effect from inspira-ui) without fighting a static site to do it. The old version is still
kept around in `legacy/` if you're curious what it looked like before.

## Running it locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`. If you want to check it on a phone or another device on the
same network, run `npm run dev -- --host` instead and open the LAN address it prints.

To build for production:

```bash
npm run build
```

Output goes to `dist/`. `npm run preview` will serve that build locally so you can sanity-check
it before deploying.

## How it's organized

```
src/
  App.tsx           # the whole page — no router, it's a single page with anchor navigation
  main.tsx          # sets up Lenis (smooth scroll) and Framer Motion's reduced-motion handling
  index.css          # theme colors, fonts, and breakpoints, all defined in one @theme block
  components/         # one file per component; components/animate-ui/ holds a few components
                       # pulled in from animate-ui's component registry
  data/               # the actual content — project write-ups, skills list, social links —
                       # lives here as plain data rather than being hardcoded in JSX
  hooks/
public/assets/       # resume PDF, social preview image, project screenshots/video
legacy/                # the original static HTML/CSS/JS version, kept for reference only
```

## A few notes on the animated bits

Some components under `src/components/animate-ui/` were installed from animate-ui's component
registry via the shadcn CLI — it's not an npm package, the actual component source gets copied
straight into the repo, which means it's fair game to edit by hand. I did that in a couple of
places (mainly recoloring things to match my green accent instead of the library's default
gray), so if you ever reinstall one of those components, check whether it needs the same
tweaks reapplied.

The cursor effect (`FluidCursor.tsx`) isn't from animate-ui at all — it's a WebGL fluid
simulation ported over from inspira-ui (a similar component library, but for Vue), recolored to
match the site and works on touchscreens the same way it does with a mouse.

## Design system

Everything runs off a single accent color (`#22c55e`, a green) defined once in `src/index.css`.
The layout has one responsive breakpoint at 700px rather than the usual Tailwind defaults. Dark
theme only — there's no light mode toggle, and the `dark` class is applied permanently in
`index.html` since a couple of the third-party components need it present to style correctly.

## Deployment

The site deploys to Cloudflare Workers (static assets mode) through Cloudflare's own dashboard
git integration — every push to `main` triggers a build and deploy there directly, no GitHub
Actions involved. Its configured deploy command is just `npx wrangler deploy`, which doesn't
build the app on its own, so `package.json` has a `postinstall` script that runs `npm run build`
right after dependencies install — that's what actually produces `dist/` before Wrangler looks
for it. Don't remove that script, the dashboard deploy will break without it (found this out
the hard way — see the git history for `assets.directory does not exist` if curious).
