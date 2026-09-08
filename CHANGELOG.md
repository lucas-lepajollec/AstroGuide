# Changelog

Notable user-visible changes to AstroGuide will be recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and published versions will follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.3] - 2026-09-08

### Changed

- Make the default Compose file directly reference the published GHCR image, without an unnecessary image-override expression.

## [0.1.2] - 2026-09-08

### Changed

- Use the established port `2502` both on the NAS and inside the container, and reduce the default Compose file to the settings required to run the image.

## [0.1.1] - 2026-09-08

### Changed

- Compose uses Docker's standard all-interface port mapping by default. Use `127.0.0.1:2502:8080` for localhost-only publication.
- No application configuration or data migration is required; operators recreating an existing container should review the new LAN-reachable port default.

## [0.1.0] - 2026-09-06

### Changed

- Replaced the generic rocket artwork with AstroGuide's emerald negative-space launch identity across the application and favicon.

### Added

- The first deliberately maintained AstroGuide release line.
- Interactive 3D exploration, a 2D astronomical map and visual size comparison across the maintained catalogue.
- A consistent repository, quality, security, and release foundation.
- English, French, Spanish and German interfaces with honest labels for illustrative positions, scales and rendering.
- Stateless multi-architecture container delivery with health checks, SBOM, provenance and immutable commit-SHA rollback tags.

### Security

- Updated both transitive `fflate` lines to patched releases before publishing the first maintained version.

Earlier development remains available in Git history; this changelog does not invent releases that were never deliberately published.

[Unreleased]: https://github.com/lucas-lepajollec/AstroGuide/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/lucas-lepajollec/AstroGuide/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/lucas-lepajollec/AstroGuide/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/lucas-lepajollec/AstroGuide/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/lucas-lepajollec/AstroGuide/releases/tag/v0.1.0
