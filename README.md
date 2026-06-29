# meh-portfolio

Small Astro portfolio with three static pages:

- `/` landing page
- `/apps` app showcase
- `/about` profile and stack details

## Commands

All commands run from the project root:

| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies |
| `astro dev --background` | Start the local dev server in background mode |
| `astro dev status` | Check background dev server status |
| `astro dev logs` | View background dev server logs |
| `astro dev stop` | Stop the background dev server |
| `pnpm build` | Build the production site into `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint across `.astro`, `.ts`, and `.tsx` files |
| `pnpm lint:fix` | Apply auto-fixable ESLint changes |
| `pnpm astro -- --help` | Show Astro CLI help |

## Linting

This repo uses ESLint flat config for Astro components and TypeScript/TSX files.

- Run `pnpm lint` before shipping changes.
- Run `pnpm lint:fix` for safe auto-fixes.
