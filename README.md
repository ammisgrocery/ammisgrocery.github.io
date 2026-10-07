# Ammi's Grocery

A browser-only grocery inventory and order workspace built with React and Vite. Products, orders, and cash-flow entries are saved in the current browser's local storage; there is no login, server, or cloud sync.

## Run locally

Install Node.js 22 or later, then from the project folder run:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To test the production build locally:

```sh
npm run build
npm run preview
```

## Publish on GitHub Pages

1. Push this project to a GitHub repository with the default branch named `main`.
2. In the repository, open **Settings → Pages** and set the source to **GitHub Actions**.
3. Push to `main` (or run **Deploy to GitHub Pages** from the Actions tab). The workflow in `.github/workflows/deploy.yml` builds the static site and deploys the `dist` folder.
4. Once both workflow jobs succeed, open the URL shown in the deployment or in **Settings → Pages**.

The Vite build uses relative asset paths, so it works at a GitHub Pages repository URL without editing configuration. The app's navigation stays within the page, so it does not require server-side route rewrites.

## Data and privacy

Records are stored only in the current browser profile and website origin. They do not sync between devices or move between localhost and the published site. Clearing browser storage or using private browsing can erase them; export CSV files regularly. The published site is public and provides no access control, so do not enter sensitive or confidential information.

## Project notes

- Inventory, order, and cash-flow logic: `src/components/grocery/store.js`
- App pages and navigation: `src/pages/Home.jsx`
- Store sign artwork: `src/components/grocery/store-sign.svg`
- GitHub Pages deployment: `.github/workflows/deploy.yml`
