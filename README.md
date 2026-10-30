# Galaxy Portfolio

An explorable 3D galaxy portfolio. Scrolling flies the camera through five planets (About, Experience, Skills, Projects, Contact). Clicking a planet zooms in and opens a glass panel. Projects orbit the Projects planet as moons.

Stack: React 19, Vite 8, TypeScript (strict), Three.js via `@react-three/fiber`, Tailwind CSS 4, GSAP + Lenis, react-hook-form + zod, Formspree.

## Setup

Requires Node 22.23.4 (`.nvmrc`).

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

| Script                    | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `npm run dev`             | Dev server                                           |
| `npm run build`           | Typecheck + production build                         |
| `npm run preview`         | Serve the production build                           |
| `npm run lint`            | ESLint                                               |
| `npm run format`          | Prettier                                             |
| `npm run typecheck`       | `tsc --noEmit`                                       |
| `npm run analyze`         | Build and write a bundle report to `dist/stats.html` |
| `npm run optimize-images` | Convert PNG screenshots to WebP (see below)          |

## Environment variables

| Variable                  | Purpose                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `VITE_FORMSPREE_ENDPOINT` | Your Formspree endpoint (`https://formspree.io/f/xxxx`). Without it the form shows a "not configured" message. |
| `VITE_SITE_URL`           | Public URL, used by `src/data/site.ts`.                                                                        |

## Folder structure

```
src/
  app/          App shell, providers (device tier, Lenis), entry point
  assets/       Images (WebP)
  components/   ui/ primitives, layout/ shell pieces, motion/ animation wrappers
  features/     hero, about, experience, skills, projects, contact, audio, galaxy-nav
  three/        scenes/, objects/, shaders/ (GLSL), hooks/, lib/, state.ts
  hooks/        useMediaQuery, useReducedMotion, useDeviceTier, useLenis, useFocusTrap
  data/         ALL content (site, about, experience, skills, projects, socials, sections)
  lib/          cn(), constants (colors, presets, planets, camera), env, device tier
  styles/       tokens.css (design tokens) and globals.css (Tailwind)
  types/        Shared TypeScript types
```

Import with the `@/` alias (`@/components`, `@/features`, `@/three`, `@/data`).

## Editing content

Everything lives in `src/data/`. Look for `CUSTOMIZE` comments.

- `site.ts`: name, role, tagline, email, phone, location, resume path, SEO strings.
- `about.ts`, `experience.ts`, `skills.ts`, `socials.ts`: panel content.
- `projects.ts`: add an entry and screenshots (`src/assets/img/projects`). The first six projects become moons; all appear in the panel grid.
- `sections.ts`: the copy shown beside each planet.
- Replace `public/resume.pdf` with your resume and `public/og-image.png` (or edit and run `node scripts/generate-og.mjs`).
- `index.html` holds static copies of the title, description, JSON-LD, canonical URL and the `<noscript>` content. Keep them in sync with `site.ts`. Also update `public/robots.txt` and `public/sitemap.xml` with your real domain.

## Theme tokens

Colors, fonts, radii and shadows are CSS variables in `src/styles/tokens.css`, exposed to Tailwind in `globals.css` (`@theme inline`). The 3D scene reads the same palette from `COLORS` in `src/lib/constants.ts`; change both together.

Planet layout, colors, camera path and quality presets are in `src/lib/constants.ts` (`PLANETS`, `CAMERA`, `QUALITY_PRESETS`).

## Swapping 3D assets

The scene is procedural (shaders in `src/three/shaders`), so no models are required. To use a `.glb`:

1. Compress it with `npx gltf-transform optimize in.glb out.glb --compress draco` (or `meshopt`) and use KTX2/WebP textures.
2. Put it in `src/assets/models` and load it with `useGLTF` from `@react-three/drei` inside a component in `src/three/objects`.
3. Render it from `GalaxyScene.tsx`. Dispose of anything you create manually in a `useEffect` cleanup.

To add screenshots: put PNGs in `raw-images/<project>/` and run `npm run optimize-images -- raw-images src/assets/img/projects`.

## Performance model

- `useDeviceTier` scores cores, memory, screen size, touch, `saveData`, software renderers and reduced motion into **high / medium / low** (`?tier=low|medium|high` forces one for testing).
- **High**: starfield 16k, bloom, idle-loaded canvas. **Medium**: 6k stars, no bloom, canvas loads on first interaction (or after 6 s). **Low / no WebGL / canvas error**: static CSS sky and CSS planets, same content and navigation.
- The WebGL canvas is a lazy chunk, DPR is capped, and rendering stops (`frameloop="never"`) when the tab is hidden.
- Per-frame work mutates refs and uniforms (`src/three/state.ts`); React state is never set inside `useFrame`.
- `prefers-reduced-motion`: Lenis is disabled, particles are assembled instantly, camera and parallax are not animated.

Measured with Lighthouse on a production build in headless Chrome: mobile 96 / 100 / 100 / 100 (Performance / Accessibility / Best Practices / SEO), desktop 81 / 100 / 100 / 100 (the desktop Performance score is limited by Total Blocking Time while Three.js boots).

## Deployment

**Vercel**: import the repo, framework preset "Vite", add the env vars, deploy.
**Netlify**: build command `npm run build`, publish directory `dist`, add the env vars.

It is a single-page site, so no rewrites are needed.

## Architecture decisions

- **Feature-based layout** keeps each section self-contained; the `three/` folder never imports UI code and communicates through `GalaxyHandlers` events.
- **DOM mirrors the 3D scene**: every planet has a real section with a heading and button, so keyboard and screen-reader users get the full experience and SEO sees real content.
- **One animation loop**: Lenis runs from the GSAP ticker; wrappers use `useGSAP` for automatic cleanup.
- **Procedural audio** (WebAudio drone) avoids shipping audio files; it only starts from the toggle.
