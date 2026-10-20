# Design requirements

Premium, dark, cinematic, precise, artist-focused. Near-black surfaces, restrained warm highlights, spacious typography, and clear controls. The marketing site should demonstrate the quality the product aims to deliver.

## Planned experience

- Hero: licensed background showreel, poster fallback, muted inline playback, pause control, legible copy.
- Scroll storytelling: progressive reveals, layered parallax, before/after shots, a funnel/vortex assembling different elements.
- Element chapters: fire with burning/ember accents; smoke with atmospheric transitions; magic with luminous particles; electricity with arcs. Show actions from multiple camera angles to demonstrate shot integration.
- Library: searchable/filterable sample effects, previews, categories, timing examples, and future apply-to-project flow.
- Tool showcase: reference modes, frame timing, dissipation, layering, and an honestly labeled editor mock until functional.
- Select buttons may use subtle flame reactions. Optional magic cursor accents preserve the ordinary pointer and never block clicks.
- Planned routes: /, /effects, /effects/[slug], /tools, /studio, /learn. Only / exists in the scaffold.

## Accessibility and performance

Motion must not obscure controls. Avoid rapid flashing. Respect prefers-reduced-motion: static scenes, no parallax or cursor particles, manual video playback. Provide pause controls, keyboard access, semantic headings, clear focus, sufficient contrast, and touch-friendly controls.

Keep navigation/text usable before media loads. Lazy-load below-fold video and heavy rendering, pause offscreen effects, and use lightweight mobile scenes. Store large footage/renders outside Git. Document asset licenses and provenance. Set performance budgets and measure on representative mobile hardware before launch.

## Current scope

The foundation provides a dark visual shell and subtle ambient glow. Showreels, cinematic scroll sequences, sample footage, generation, and editor controls are planned, not implemented.
