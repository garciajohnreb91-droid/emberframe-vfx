# Product vision

Emberframe VFX is a working product name for a premium AI VFX platform serving artists, directors, animators, filmmakers, advertisers, and video creators. Compete on effect quality, temporal consistency, integration with the shot, and artistic control.

## Core promises

1. Original footage is immutable. Generation, composites, and exports create separate assets.
2. FX are independently editable layers: enable, reorder, tune, version, and regenerate.
3. Reference guidance supports **exact** (closest intended structure, motion, and appearance), **close** (similar character adapted to the shot), and **original** (new interpretation). Exact is an artistic target, never a guarantee of pixel identity. References need appropriate usage rights.
4. Artists define start/end frames and dissipation. Never alter these silently.
5. Preview and refine before rendering. Preserve settings and provenance for repeatability.

## Workflow

Import footage → choose/describe effect → add references and mode → position and time a layer → control dissipation → preview/refine → composite layers → export a new asset.

## Roadmap

- Foundation (complete): app shell, documentation, domain contracts, developer workflow.
- Showcase (implemented): cinematic landing experience, themed element worlds, sample library, labeled interactive editor demo.
- Editor prototype (implemented): session-local project state, layer controls, timeline, sample comparisons, local video preview, and visibly simulated refinement. No provider adapter is connected.
- Production: authentication, private storage, async generation, provider evaluation, cost controls, export pipeline.

## Quality bar

Review temporal flicker, mattes/edges, lighting, shadows, perspective, occlusion, tracking, camera movement, dissipation, and reference fidelity on representative clips. Set measurable review criteria before selecting a provider. No AI provider is selected or connected yet.
