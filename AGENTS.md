# AGENTS.md

## Project context

This is a standalone React and Vite grocery workspace. Keep changes focused, preserve existing project conventions, and avoid adding a backend or external service unless requested.

Read `README.md` for local development and GitHub Pages deployment instructions.

## Key files

- `src/pages/Home.jsx`: app navigation and page selection.
- `src/components/grocery/`: inventory, order, summary, and browser-storage logic.
- `vite.config.js`: Vite settings, relative asset paths, and source alias.
- `.github/workflows/deploy.yml`: GitHub Pages build and deployment.

## Working notes

- App records are stored in browser local storage and do not sync between devices.
- Keep the Pages build compatible with repository subpaths; retain Vite's relative base.
- Run the relevant checks from `package.json` before finishing code changes.
