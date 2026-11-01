# SHAHRUL.OS — portfolio

A developer portfolio that boots like a terminal OS. First-time visitors see a short boot log, then a
glitch transition into a desktop: a 3D neon grid and horizon, desktop icons, and a working terminal.
Below the desktop, About, Experience, Skills, Projects and Contact are rendered as OS windows.
Projects are draggable windows on large screens.

Stack: React 19, Vite 8, TypeScript (strict), Tailwind CSS 4, Motion (Framer Motion), Three.js via
`@react-three/fiber`, react-hook-form + zod, Formspree.

## Setup

Requires Node 22.23.4 (`.nvmrc`).

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

| Script                    | Purpose                                                       |
| ------------------------- | ------------------------------------------------------------- |
| `npm run dev`             | Dev server                                                    |
| `npm run build`           | Typecheck + production build                                  |
| `npm run preview`         | Serve the production build (http://localhost:4173)            |
| `npm run lint`            | ESLint (TypeScript, React hooks, jsx-a11y)                    |
| `npm run format`          | Prettier                                                      |
| `npm run typecheck`       | `tsc --noEmit`                                                |
| `npm run analyze`         | Build and write a bundle report to `dist/stats.html`          |
| `npm run optimize-images` | Generate responsive AVIF/WebP screenshots + blur placeholders |

## Environment variables

| Variable                  | Purpose                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `VITE_FORMSPREE_ENDPOINT` | Formspree endpoint (`https://formspree.io/f/xxxx`). Without it the form is disabled and says so politely. |
| `VITE_SITE_URL`           | Public URL (no trailing slash), used by `src/data/site.ts`.                                               |

Both are public by design (they ship to the browser). Never put secrets in `VITE_*` variables.

## Using the site

- **Boot**: plays once per browser session, at most ~2.4 s. Any key, click or tap skips it, and it is
  skipped entirely when the user prefers reduced motion.
- **Terminal**: `help`, `about`, `experience`, `skills`, `projects [tag]`, `open <project-id>`,
  `contact`, `resume`, `socials`, `whoami`, `theme [matrix|synthwave|ice]`, `crt [on|off]`, `clear`.
  Up/Down browses history, Tab completes commands and arguments, typos get "did you mean"
  suggestions, and Ctrl+L clears the screen.
- **Dock**: once the hero terminal is scrolled away, press `` ` `` or use the terminal button in the
  status bar to open a floating terminal. On phones it opens as a bottom sheet. Escape closes it.
- **Project windows** (≥1024 px): drag a window by its title bar, or focus the title bar and use the
  arrow keys (hold Shift for bigger steps). "Tile windows" resets the layout. Smaller screens show a
  stacked list.
- **Status bar**: section links, a theme switcher, the CRT overlay toggle and the terminal toggle.
  Theme and CRT preferences are saved in `localStorage`.

## Folder structure

```
src/
  app/            App shell, entry point, providers (device tier, settings, AppProviders)
  assets/         Project screenshots (masters + generated variants + manifest.json)
  components/
    ui/           Primitives: Button, Badge, Card, Window, Modal, Input, Icon, GlitchText,
                  SectionHeading, ResponsiveImage, ErrorBoundary
    layout/       StatusBar, SettingsControls, Section, Container, Footer, SkipLink, CrtOverlay, Deferred
    motion/       MotionProvider, Reveal, Stagger
  features/
    boot/         Boot overlay + timing hook
    hero/         Desktop hero, icons, 3D backdrop switcher, CSS grid fallback
    terminal/     Provider, commands/, parser, suggestions, Terminal UI, dock
    navigation/   scrollToSection, active section, deep links
    about/ experience/ skills/ projects/ contact/
  three/          scenes/, objects/, shaders/ (GLSL), hooks/, lib/, state.ts (no UI imports)
  hooks/          useMediaQuery, useReducedMotion, useDeviceTier, useSettings, useLocalStorage,
                  useHotkey, useFocusTrap
  data/           ALL content: site, about, experience, skills, projects, socials, sections, boot, terminal
  lib/            cn(), constants, motion presets, device tier, env, sanitize, idle, download, format
  styles/         tokens.css (design tokens), fonts.css, effects.css, globals.css (Tailwind)
  types/          Shared TypeScript types
```

Imports use the `@/` alias (`@/components`, `@/features`, `@/three`, `@/data`, ...).

## Editing content

Everything lives in `src/data/`. Look for `CUSTOMIZE` comments.

- `site.ts`: name, role, tagline, email, phone, location, resume path/file name, SEO description.
- `about.ts`, `experience.ts`, `skills.ts`, `socials.ts`: section content.
- `projects.ts`: projects in display order. `accent` (`primary` / `secondary` / `accent`) picks the
  palette role that tints the window, so it follows the active theme.
- `sections.ts`: section titles, pseudo file names (`about.md`), status labels and blurbs.
- `boot.ts`: boot log lines. `terminal.ts`: prompt, banner and hint.
- Terminal commands: `src/features/terminal/commands/content.ts` and `system.ts`.

Also update these when your details change:

- `public/resume.pdf` (your resume).
- `index.html`, which holds static copies of the title, description, Open Graph tags, JSON-LD
  (Person), canonical URL, the first-paint hero text and the `<noscript>` summary. Keep them in sync
  with `site.ts`.
- `public/robots.txt` and `public/sitemap.xml` (use your real domain).
- `public/og-image.png`: edit and run `node scripts/generate-og.mjs`.

### Adding project screenshots

1. Drop a master image (PNG, JPG or WebP, ideally ~960 px wide) into `src/assets/img/projects/`, for
   example `myproject-1.png`.
2. Run `npm run optimize-images`. This writes `myproject-1-480/960.avif|webp` and updates
   `manifest.json` with dimensions and a blur placeholder.
3. Reference it in `projects.ts` with `projectImage('myproject-1')`. A missing image throws at
   startup, so mistakes surface immediately in dev.

## Theme tokens

All colours, fonts, the chamfer size, glow, durations and z-index layers are CSS variables in
`src/styles/tokens.css`. `globals.css` exposes them to Tailwind via `@theme inline`, which is how
Tailwind v4 is configured (there is no `tailwind.config`). Utilities include `bg-surface`,
`text-primary` and `border-line`.

- **Palettes**: `--primary`, `--secondary` and `--accent` are remapped per `[data-theme]`. To add a
  theme, add a `[data-theme='name']` block, add it to `THEMES` in `src/lib/constants.ts`, and add the
  name to the pre-paint script check in `index.html`.
- The **3D scene reads the same CSS variables** (`three/hooks/useThemeColors.ts`), so it changes with
  the theme automatically.
- Timing, layout and 3D constants (boot, terminal, window layout, camera, grid, terrain, particles,
  bloom, quality presets) live in `src/lib/constants.ts`.

## Swapping 3D assets

The hero scene is procedural (`three/objects/*` + `three/shaders/*.vert|frag`), so it ships no models.
To use a model instead:

1. Compress it: `npx gltf-transform optimize in.glb out.glb --compress draco` (or `meshopt`), with
   KTX2/WebP textures and a low polycount.
2. Put it in `src/assets/models/`, and load it inside a new component in `src/three/objects/` (for
   example with `GLTFLoader` from `three/examples/jsm`, plus `DRACOLoader` if needed).
3. Render it from `three/scenes/HeroScene.tsx`. Dispose of any geometry or material you create
   manually in a `useEffect` cleanup. Do per-frame work in `useFrame` with refs, never React state.

## Performance and quality tiers

`useDeviceTier` scores core count, device memory, screen width, touch input, `saveData`, software
WebGL renderers and reduced motion into **high**, **medium** or **low**. Add `?tier=low|medium|high`
to the URL to force a tier for testing.

| Tier   | Hero backdrop                                                                                         |
| ------ | ----------------------------------------------------------------------------------------------------- |
| high   | WebGL: 900 particles, 64-segment terrain, bloom (lazy chunk), DPR ≤ 1.5. Loaded when idle after boot. |
| medium | WebGL: 350 particles, 40 segments, no bloom, DPR ≤ 1.25. Loaded on first interaction or after 6 s.    |
| low    | CSS perspective grid only (also the fallback for no WebGL, a lost context or a render error).         |

- The canvas sits inside the hero. Rendering stops (`frameloop="never"`) when the hero is off-screen
  or the tab is hidden. Under reduced motion it renders one still frame (`frameloop="demand"`).
- Lazy chunks: Three.js, bloom, Motion drag features (desktop windows only), the contact form
  (react-hook-form + zod, mounted when the section approaches), and the project detail view.
- Fonts are self-hosted latin subsets with `font-display: swap`. Only the body font is preloaded.
- Screenshots use `<picture>` with AVIF/WebP `srcset`, explicit dimensions, lazy loading and blur-up
  placeholders.

Latest local Lighthouse run (production build, `vite preview`, headless Chrome, Lighthouse 13.5):

| Preset  | Performance | Accessibility | Best Practices | SEO |
| ------- | ----------- | ------------- | -------------- | --- |
| Mobile  | 97          | 100           | 100            | 100 |
| Desktop | 100         | 100           | 100            | 100 |

## Accessibility

- Skip link, semantic landmarks, one `h1`, an `h2` per section, and visible focus outlines everywhere.
- Navigation (icons, nav links, terminal commands) scrolls to a section, moves focus to its heading,
  updates the URL hash and briefly highlights the window.
- The terminal output is a polite live region, and the input has a label and a usage hint.
  Shift+Tab and Tab on an empty prompt never trap focus.
- Dialogs trap focus, close on Escape and restore focus. The dock restores focus too.
- Glitch copies and the CRT overlay are `aria-hidden`. `prefers-reduced-motion` disables the boot,
  glitches, scan beam, grid animation and camera motion.

## Deployment

**Vercel**: import the repo, choose the "Vite" framework preset, add the env vars and deploy.
**Netlify**: build command `npm run build`, publish directory `dist`, add the env vars.

It is a single page with hash anchors, so no rewrites are needed.

## Architecture decisions

- **Feature-based folders**: each feature owns its components, hooks and logic. `three/` never
  imports UI code, and `data/` holds content only.
- **Hybrid OS model**: the immersive desktop is the hero, while all content is real, crawlable
  DOM in scrollable windows. That keeps SEO, screen readers, mobile and recruiters who skim working.
- **Minimal global state**: Context is used only for device tier, settings (theme/CRT) and the
  terminal session. Project filter and dialog state is a tiny `useSyncExternalStore` store, so the
  terminal and the projects section can share it without another provider.
- **Structured terminal output**: commands return data (`text`, `link`, `table`) that React renders.
  There is no HTML injection, and adding a command means appending one object.
- **Motion instead of GSAP + Lenis**: one animation library, native scrolling, `LazyMotion` with
  the small `domAnimation` set up front and the drag features loaded on demand.
- **No per-frame React state**: drag positions are Motion values, and shader time and camera
  parallax use refs and uniforms.
