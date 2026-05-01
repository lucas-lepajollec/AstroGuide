# Contributing to AstroGuide 🚀

First off, thank you for considering contributing to AstroGuide! It's people like you that make the open-source community such a great place to learn, inspire, and create.

## 🛠️ Local Development Setup

To get a local copy up and running for development, follow these simple steps:

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/lucas-lepajollec/AstroGuide.git
   cd AstroGuide
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The 3D scene should now be running at `http://localhost:2499`.

## 📦 Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. Keep your PRs small and focused on a single feature or bug fix.
4. Use Conventional Commits for your commit messages (e.g., `feat: add new planet`, `fix: resolve camera glitch`).

## 🎨 Code Style

We use ESLint and Prettier. Please run `npm run lint` before submitting your pull request to ensure your code matches the project's formatting standards.