<div align="center">
  <img src="public/logo.svg" alt="AstroGuide logo" width="96" />
  <h1>AstroGuide</h1>
  <p><strong>Explore astronomical objects and scale through interactive 3D, 2D, and comparison views.</strong></p>

  <p>
    <a href="https://astroguide.lucas-homelab.fr"><strong>Website</strong></a> ·
    <a href="https://demo.astroguide.lucas-homelab.fr"><strong>Live demo</strong></a> ·
    <a href="https://docs.astroguide.lucas-homelab.fr"><strong>Documentation</strong></a>
  </p>

  <p>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-17b890" alt="MIT license" /></a>
    <img src="https://img.shields.io/badge/account-free-111827" alt="Account free" />
    <img src="https://img.shields.io/badge/data-local-111827" alt="Local data" />
  </p>

  <img src="docs/assets/screenshots/astroguide-demo-3d.png" alt="AstroGuide interactive 3D exploration view" width="1200" />
</div>

AstroGuide turns abstract astronomical objects and orders of magnitude into something people can explore. Its catalog of 39 celestial objects is available through three complementary views: a navigable 3D scene, an interactive 2D map, and a visual size comparison.

The application is static, French-first, account-free, and runs without a backend, analytics, cookies, or remote API calls.

## Explore three perspectives

| Interactive exploration | Visual comparison |
| --- | --- |
| Move through a Three.js scene, inspect objects, search the catalog, and control the camera. | Compare approximate diameters and extents while filtering the objects that matter. |
| <img src="docs/assets/screenshots/astroguide-demo-3d.png" alt="AstroGuide 3D exploration with the object catalog" width="640" /> | <img src="docs/assets/screenshots/astroguide-demo-comparison.png" alt="AstroGuide visual size comparison" width="640" /> |

The 2D tactical map adds a touch-friendly, zoomable overview for moving through the same catalog from another perspective.

> [!IMPORTANT]
> AstroGuide is an educational visualization, not a precision astronomical simulator. Rendered positions, visual distances, orbits, and 3D sizes are illustrative. Text values are rounded, some astrophysical quantities remain uncertain, and the comparison view applies a minimum visible size.

## Highlights

- Searchable catalog of stars, planets, galaxies, black holes, and larger systems.
- Interactive 3D view with textured bodies, animated orbits, camera controls, and fallback materials.
- Zoomable and pannable 2D map for mouse and touch input.
- Size-comparison view with filters and selectable objects.
- Responsive layouts for desktop, tablet, portrait mobile, and low-height landscape screens.
- WebGL rendering pauses when the 3D view is hidden to avoid unnecessary work.
- No account, backend, personal-data collection, or API key.

## Quick start

### Requirements

- Node.js 22.12 or newer within the Node.js 22 line.
- npm 10 or newer.

```bash
git clone https://github.com/lucas-lepajollec/AstroGuide.git
cd AstroGuide
npm ci --include=optional
npm run dev
```

Open `http://127.0.0.1:2499`. The development server is local-only by default; use `npm run dev:lan` only when you deliberately want to test from another device on a trusted network.

## Docker

```bash
docker compose up --build -d
```

AstroGuide is then available on `http://localhost:2502`. The production container runs without privileges, uses a read-only filesystem, exposes a health check, and serves security headers through Nginx.

Validated pushes to `main` and `v*` tags publish `ghcr.io/lucas-lepajollec/astroguide`. Architecture availability depends on the latest successful publishing workflow.

## Quality checks

```bash
npm run check
```

| Command | Purpose |
| --- | --- |
| `npm run lint` | Run ESLint with zero warnings allowed. |
| `npm run typecheck` | Validate TypeScript without emitting files. |
| `npm run test` | Run the Vitest suite. |
| `npm run build` | Type-check and create the production build. |
| `npm run build:demo` | Build the isolated public-demo variant. |
| `npm run dev:demo` | Run the demo locally with its welcome and reset flow. |

## Scientific scope

The current orders of magnitude draw primarily from institutional and scientific sources, including [NASA Solar System Exploration](https://science.nasa.gov/solar-system/), the [Event Horizon Telescope results for M87*](https://arxiv.org/abs/1906.11243), NASA material about [Betelgeuse](https://science.nasa.gov/universe/what-is-betelgeuse-inside-the-strange-volatile-star/), and [Hubble/Gaia work on the Milky Way–Andromeda future](https://science.nasa.gov/missions/hubble/apocalypse-when-hubble-casts-doubt-on-certainty-of-galactic-collision/).

Distant black-hole masses depend on models and estimates. Phoenix A is deliberately presented as a highly uncertain candidate. Contributions that change the catalog must cite a scientific or institutional source and preserve coherent units.

## Architecture

| Layer | Technology |
| --- | --- |
| Interface | React 19, TypeScript, Tailwind CSS 4, Motion |
| Visualization | Three.js, React Three Fiber, Drei |
| State | Zustand |
| Tooling | Vite 6, Vitest, ESLint |
| Deployment | Static build or unprivileged Nginx container |

```text
src/
├── components/       # 3D, 2D, comparison, and interface components
├── data/             # Celestial catalog and integrity tests
├── store/            # Zustand state and tests
├── App.tsx
├── index.css
└── main.tsx
```

## Public demo

The [public demo](https://demo.astroguide.lucas-homelab.fr) is the real static product with an explicit demo welcome, permanent labeling, reset control, and `noindex` directives. It introduces no backend, external account, or fictional scientific dataset. See [DEMO.md](DEMO.md) for its scope and validation process.

## Contributing and security

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before opening a pull request. Report suspected vulnerabilities according to [SECURITY.md](SECURITY.md).

AstroGuide is distributed under the [MIT License](LICENSE).
