# AstroGuide agent guide

This file is public repository guidance for maintainers and AI agents. Inspect the current branch, working tree, code, data and documentation before changing anything. Preserve unrelated work.

## Product boundaries

AstroGuide makes astronomical objects and scales approachable through interactive 3D, 2D and comparison views. Do not imply scientific precision that the data does not support. Distinguish measured values, estimates and illustrative rendering, and cite scientific or institutional sources for catalogue changes.

## Development

- Use Node.js 22.12 or a newer 22.x release and install with `npm ci --include=optional`.
- Local development: `npm run dev`; trusted-LAN development: `npm run dev:lan`.
- Run the full normal gate with `npm run check`.
- Demo validation uses `npm run build:demo` when demo behavior changes.
- Check keyboard use and representative desktop, tablet, portrait-mobile and landscape-mobile layouts for interface changes.

## Repository expectations

- Update tests, sources, `README.md`, focused documentation and `CHANGELOG.md` when behavior or scientific content changes.
- Never commit `.env` values, generated builds or dependencies.
- Follow `CONTRIBUTING.md` for pull requests and `SECURITY.md` for vulnerabilities.
- GitHub is the public review surface; maintainers integrate the exact accepted result into authoritative Forgejo history.

Local machine notes belong in ignored `AGENTS.override.md` and `.project-local/`, never in this public file.
