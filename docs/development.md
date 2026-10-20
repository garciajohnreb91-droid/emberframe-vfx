# Development and Replit

Canonical source: https://github.com/garciajohnreb91-droid/emberframe-vfx

Use Node 22 and pnpm 11.25.0 (packageManager in package.json). Enable Corepack where available, then activate pnpm with corepack prepare pnpm@11.25.0 --activate. If Corepack is unavailable, install the pinned pnpm version through your Node package manager.

Run pnpm install --frozen-lockfile, then pnpm dev. Open http://localhost:3000. Check changes with pnpm lint, pnpm typecheck, and pnpm build. Production uses pnpm build then pnpm start. Servers bind to 0.0.0.0:3000 for hosted previews.

## Replit import

Import the GitHub repository as a Node project. Install pinned pnpm, run pnpm install --frozen-lockfile, then use Run (corepack pnpm dev). The .replit file maps port 3000 to the web preview. If the runtime/import UI changes, keep the same standard Node/pnpm commands. No secrets are required now; future credentials belong in Replit Secrets or .env.local, never commits.

## GitHub workflow

Pull latest main, create a feature branch, make focused changes, run checks, commit/push, and open a PR. Replit edits follow this same workflow and return to GitHub. Do not overwrite remote history or maintain divergent canonical copies.

CI checks lint, types, and production build. Branch protection must be configured separately; the workflow alone does not enforce it. Public visibility does not grant an open-source license. Choose a license explicitly before granting reuse rights.
