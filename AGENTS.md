# AGENTS.md

Project-specific notes for coding agents. General engineering rules live in `CLAUDE.md`.

## Commands

- Install: `npm install` (Node 22.23.4, see `.nvmrc`)
- Dev: `npm run dev`
- Verify before finishing: `npm run typecheck && npm run lint && npm run build`
- Bundle report: `npm run analyze` (writes `dist/stats.html`)
- Preview the production build: `npm run preview` (http://localhost:4173)
- Lighthouse (Chrome installed locally): run against `npm run preview` with
  `npx lighthouse http://localhost:4173/` (mobile) and `--preset=desktop`. The current baseline is
  mobile 97/100/100/100 and desktop 100/100/100/100.
- Regenerate screenshots: `npm run optimize-images`. Regenerate the OG image: `node scripts/generate-og.mjs`

## Conventions

- Tailwind v4: tokens live in `src/styles/tokens.css` and are mapped in `globals.css` `@theme inline`.
  There is no `tailwind.config`. Use `z-(--z-…)` for layers.
- Content lives only in `src/data/`. Constants (timings, layout, 3D) live in `src/lib/constants.ts`.
- Motion: use `m.*` components only (`LazyMotion strict`). Drag requires the lazy `domMax` boundary
  in `ProjectDesktop`.
- Never render `position: fixed` UI (modals, dock) inside `Reveal`/`Section`: transformed ancestors
  break fixed positioning. Mount it in `App.tsx`.
- Use `?tier=low|medium|high` to test the device-tier fallbacks.
