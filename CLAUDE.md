# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install deps
npm run dev           # Vite dev server (localhost:5173)
npm run dev -- --host # same, but reachable from other devices on the LAN (for real phone testing)
npm run build          # tsc -b && vite build — type-checks, then builds to dist/
npm run lint             # oxlint
npm run preview            # serve the dist/ build locally
npm run deploy               # npm run build && wrangler deploy
```

No test suite is configured (no Jest/Vitest). Verify changes with `npm run build` (catches type
errors) and `npm run lint`, then visually check in a browser — see "Testing animations" below.

## Architecture

React 19 + Vite + TypeScript + Tailwind CSS v4 + Framer Motion (`motion` package) + Lenis. A
single-page portfolio site (one route, anchor-link navigation between sections), migrated from
a plain-HTML/CSS/JS static site kept at `legacy/` purely for reference — that directory is not
part of the build and should not be edited to "fix" anything live.

**Entry point chain**: `index.html` → `src/main.tsx` (wraps `App` in `MotionConfig
reducedMotion="user"` and `ReactLenis root` — global motion-preference and smooth-scroll
providers, both gated by a `prefers-reduced-motion` check computed once at module load) →
`src/App.tsx` (flat list of top-level components in render order, no routing).

**Content-as-data**: page copy for repeatable sections lives in `src/data/` (`projects.tsx`,
`skills.ts`, `links.ts`), imported by the corresponding component (`Projects.tsx`, `Skills.tsx`,
etc.) rather than being inlined in JSX. When updating project descriptions, skills, or social
links, edit the data file, not the component.

**Skills content policy**: the Skills section must only list what's in the resume's actual
"Skills" block (Cloud/Languages/DevOps/Frameworks-Platforms/Data/Tools) — not the broader set of
technologies mentioned in individual project descriptions. Projects were built via AI-assisted
workflows and the site is explicit about that (see the About section's honesty paragraph); don't
promote a project's tech stack to a personal skill claim.

### Theming

Everything is defined once in `src/index.css`'s `@theme` block, which remaps shadcn's generic
semantic tokens onto this site's single-accent dark palette:

- `--primary` (`#22c55e`) is the brand accent — use `text-primary`/`bg-primary`/`border-primary`.
  Tailwind's own `accent` token (`bg-accent`, `text-accent`) is a **different**, unrelated shadcn
  slot that maps to a neutral gray here — using it where you meant the brand color is a common
  mistake.
- `--brand-glow` / `--brand-dim` are pre-mixed rgba variants of the accent, used for hover glows
  (`shadow-[0_0_20px_var(--brand-glow)]`) and pill/badge backgrounds.
- `--breakpoint-md` is overridden to `700px` (the site's only mobile/desktop split, chosen to
  match the original design). Always use plain `md:`-prefixed Tailwind utilities for
  responsiveness — never hardcode `768px` or introduce a second breakpoint.
- `index.html`'s `<html>` tag has `class="dark"`. This is required for *any* installed
  shadcn/animate-ui component's `dark:`-prefixed Tailwind classes to activate — without it they
  silently fall back to light-mode styling. Don't remove it; this site has no light/dark toggle,
  it's permanently dark.

### animate-ui components

`src/components/animate-ui/**` holds components installed via the shadcn CLI from
`https://animate-ui.com/r/components-<category>-<name>.json` — copy-paste-owned source, not an
npm dependency. Two things to know before touching or reinstalling one:

- `tsconfig.app.json` has `noUnusedLocals`/`noUnusedParameters` disabled specifically because
  these vendored files ship unused `import * as React` lines that would otherwise fail the
  build on every fresh install.
- `src/components/animate-ui/components/animate/tabs.tsx` has **hand-edited** theme colors (the
  sliding `TabsHighlight` background and active-tab text use `--primary`/`--brand-dim`/
  `--brand-glow` instead of the registry's default generic gray tokens). Re-running the shadcn
  install command for this component will overwrite those edits — reapply them if you do.
- The animate-ui `Cursor` component (`components/animate/cursor.tsx`) had a real bug on install
  (a `render`-prop pattern that didn't match the installed `@base-ui/react`/`motion` API) which
  was fixed once, then the whole approach was abandoned anyway in favor of `FluidCursor.tsx` — if
  you see references to a cursor "arrow" effect in history, it no longer exists.

### FluidCursor (not an animate-ui install)

`src/components/FluidCursor.tsx` is a hand-ported React/WebGL translation of inspira-ui's
**Fluid Cursor** (Vue original: `github.com/unovue/inspira-ui`,
`app/components/inspira/ui/fluid-cursor/FluidCursor.vue`) — a real-time WebGL fluid-dynamics
simulation that paints color trails following the mouse or a touch drag. The ~1350 lines of
shader/WebGL simulation logic are ported near-verbatim (framework-agnostic vanilla WebGL, no
Vue-specific API in the bulk of the file); only the outer component shell, the color hue
(constrained to a narrow green band instead of the original's full random hue range), and
mobile resolution tuning (`useMediaQuery('(min-width: 700px)')` gates `simResolution`/
`dyeResolution`) were changed. Touch support (`touchstart`/`touchmove`/`touchend`) was already
in the original and carried over unchanged. Gated off entirely under `prefers-reduced-motion`.

### Deployment

Deploys through Cloudflare's own dashboard Git integration only — every push to `main` triggers
it directly, no GitHub Actions (a workflow was added at one point, then removed once this path
was confirmed working, to avoid two pipelines deploying the same push). The dashboard's deploy
command is just `npx wrangler deploy`, which does not build the app — `package.json` has a
`postinstall` script (`npm run build`) that runs automatically right after `npm clean-install`,
which is what actually produces `dist/` before Wrangler looks for it. **Don't remove
`postinstall`** — without it every dashboard deploy fails with `assets.directory does not
exist` (this happened once already).

`wrangler.jsonc`'s `assets.directory` is `./dist` (the Vite build output), not the repo root.

### Scroll-linked reveal animations

`About.tsx`'s word-by-word highlight (`HonestyParagraph`) and similar scroll-tied effects use
Framer Motion's `useScroll({ target, offset })`. Two lessons learned the hard way here, worth
applying to any future scroll-linked effect:

- **Track the same edge for both bounds of the offset** (e.g. `['start 0.8', 'start 0.2']`, not
  `['start 0.8', 'end 0.3']`). Switching from the target's top to its bottom partway through
  makes the effective completion point depend on the target's rendered height — a tall/wrapped
  paragraph finished highlighting only after its top had already scrolled above the viewport.
- **Don't finish the effect near a viewport edge.** The first fix moved completion to `start
  0.2` (still visible, bug technically fixed) but it looked rushed — text finished lighting up
  right as it left the comfortable reading zone. Finishing around `start 0.5` (screen center)
  reads much better: the content is fully revealed while still centered and easy to read, not
  right before it scrolls away.

### Testing animations manually

No automated visual test exists for animation timing/playback. `npm run build` + a manual
`npm run dev` pass in a real, focused browser window (not a backgrounded/automated tab — several
of this project's effects are `requestAnimationFrame`-driven and Chrome suspends rAF for
backgrounded tabs, which has repeatedly produced false "broken" readings during automated
checks) is the actual verification step, especially for the WebGL cursor effect and any
Framer-Motion scroll-linked animation.
