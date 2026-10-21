# Cinematic prototype

The landing experience lives in `src/components/landing/`. It uses Next.js App Router, React, strict TypeScript, Tailwind CSS, Framer Motion, Lucide icons, and locally bundled Inter and Space Grotesk fonts.

## What works

- Cinematic looping hero, cursor glow, scroll reveals, magnetic CTAs, and reduced-motion support.
- Interactive editor: select/toggle independent layers; edit opacity, blending, start/peak/end frames, and dissipation; play and scrub a 240-frame sample timeline.
- Before/after comparison slider, reference guidance selection, sample library, and simulated refinement.
- Browser-local video import with type/size validation and object-URL cleanup. Original files are never modified or uploaded.
- Fifteen searchable/filterable concept effects, seven element worlds, and scene showcases.
- Download actual JSON project settings or a transparent illustrative SVG sample.
- Responsive desktop/tablet/mobile layouts; keyboard-operated element tabs; modal focus trapping, Escape dismissal, and focus restoration.

## Boundaries

This is a front-end prototype. Concept artwork and precomposed sample plates illustrate the experience. AI generation, motion tracking, selective regeneration, authentication, durable storage, and production video export are not connected. The Exact guidance mode describes a creative target rather than a guarantee of pixel identity.

The sample timeline is 24 fps / 240 frames. Frame intervals are zero-based, start-inclusive/end-exclusive. The timing inputs preserve `0 <= start < peak <= end - dissipation < end <= 240`; effects are absent outside their active intervals. Imported clips use the same short visual-demo timeline rather than a complete media editing engine.

A refresh resets the editing session. JSON downloads preserve the chosen demo settings; importing those settings is not implemented. Opening an effect from the marketing library starts a fresh sample composition, as stated in its dialog.

## Source map

- `landing-page.tsx`: navigation, hero, transformation flow, artist stories, library, element worlds, toolkit, scene showcase, and finale.
- `studio.tsx`: editor state, timeline, local video import, comparison, and export dialogs.
- `effects.tsx`: typed mock asset catalog and shared sprite artwork.
- `ui.tsx`: reusable brand, button, reveal, eyebrow, and accessible modal components.
- `ambient.tsx`: bounded, pointer-only cursor particles, with reduced-motion handling.
- `src/app/globals.css`: design tokens, Tailwind integration, component styles, and responsive breakpoints.
- `public/media/`: optimized public concept artwork and the silent hero motion study. These are product demo assets, never user footage.

## Verification

`pnpm build:static` produces a standalone `out/` bundle for the private Sites preview. The normal `pnpm build` / `pnpm start` workflow remains available for Node hosting. The Sites manifest in `.openai/hosting.json` identifies the private preview and its static output directory.

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`. The browser review covers desktop and mobile layouts, effect filters, layer visibility, timing constraints, comparison, reference controls, download content, local video import, modal focus, and reduced motion.
