# Emberframe VFX

Premium AI visual effects for artists, directors, and video creators. Keep original footage intact; build FX as editable layers with reference guidance, frame timing, and dissipation control.

**Status:** cinematic front-end prototype. Includes a complete landing experience, interactive sample editor, searchable effect library, local video preview, and downloadable demo settings. AI generation, tracking, accounts, cloud storage, and production video rendering are future work.

See [the prototype guide](docs/prototype.md) for component structure, working interactions, and mock boundaries.

## Quick start

Requires Node 22 and pnpm 11.25.0. Enable Corepack and activate the pinned packageManager version, or install that pnpm version through your Node package manager.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. Run pnpm lint, pnpm typecheck, and pnpm build to verify. After building, pnpm start runs production.

## Project brief

- [Product vision](docs/product-vision.md)
- [Design requirements](docs/design-requirements.md)
- [Architecture and structure](docs/architecture.md)
- [Development and Replit import](docs/development.md)
- [Codex instructions](AGENTS.md)

Next.js App Router + TypeScript + Tailwind CSS + React. Commit pnpm-lock.yaml. No credentials required. Keep user footage, production renders, and secrets outside Git. The small public concept assets in `public/media/` are intentionally bundled with this prototype.

## Source of truth

[GitHub: emberframe-vfx](https://github.com/garciajohnreb91-droid/emberframe-vfx) is the canonical source. Replit is an optional workspace/preview; push changes back through commits and pull requests.

Emberframe is a working name, not a cleared trademark. Public visibility does not grant an open-source license; license selection is pending.
