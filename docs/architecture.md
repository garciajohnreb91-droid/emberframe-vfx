# Architecture and structure

Next.js App Router, strict TypeScript, React, Tailwind CSS, ESLint, pnpm. Standard Node hosting with no Replit-specific application APIs.

- src/app/: routes, layouts, global styles
- src/components/: shared UI, future marketing/editor components
- src/lib/: utilities and future server adapters
- src/types/: domain contracts
- public/: small static public assets only
- docs/: product, design, architecture, developer workflow
- .github/workflows/: CI

## Media model

Source records hold immutable storage keys, content hashes, rational FPS, and frame count. Storage/server policies must enforce immutability: TypeScript readonly is not a security boundary. User media belongs in private object storage, never public/ or Git.

Projects reference sources and ordered FX layers. Each generation will record input/settings versions, provider/model, seed when supported, and output IDs. Regeneration creates a new version; exports create derived assets. Masks, tracking data, and transforms should remain separately editable.

Frames are zero-based, start-inclusive/end-exclusive. Require integers: 0 <= start < end <= frameCount; 0 <= dissipationFrames <= end-start. Dissipation occupies the final frames of the interval. Exact/close require reference assets; original may use optional inspiration. Validate ownership, opacity [0,1], and timing server-side.

Authentication, database, storage, queue, providers, and render workers are unimplemented. Long-running jobs must execute outside request handlers with status, cancellation, retries, and cost controls. Never present mocks as real AI output.
