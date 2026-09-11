---
name: figma-design-to-code
description: "Use when implementing a Figma design in code, extracting design context, translating a Figma frame into a storefront or admin UI, generating a screen in Figma from code, or syncing components and design tokens with Figma. Requires a Figma URL or selected node when working from an existing design."
disable-model-invocation: false
---

# Figma Design Workflow

## Before implementation

1. Require a Figma file or selection URL when the task is design-to-code. Extract the file key and node ID from the URL.
2. Use the `figma` MCP server to inspect the selected frame, components, variables, typography, assets, responsive constraints, and interaction states.
3. Inspect the repository for its actual framework, component primitives, fonts, tokens, icon library, and asset conventions.
4. Reuse existing code components and tokens when they match the design. Do not invent a parallel design system.

## Design to code

- Preserve hierarchy, spacing, typography, color roles, component states, and responsive behavior.
- Use real assets from Figma or the project when available; do not replace them with generic placeholders.
- Map Figma components to the closest existing code components and document any unavoidable mismatch.
- Implement loading, empty, error, disabled, hover, focus, and mobile states when they are represented or implied by the design.
- Keep accessible names, keyboard behavior, semantic HTML, contrast, and focus visibility intact.
- For Medusa storefronts, keep commerce behavior separate from presentation and use the existing Store API/SDK conventions.

## Code to Figma

- Use Figma's write-to-canvas workflow only when the user explicitly asks to create or update Figma content.
- Discover existing libraries, variables, styles, and Code Connect mappings before creating new primitives.
- Build from published components and tokens instead of hardcoded colors, spacing, or typography.
- Make changes incrementally and inspect or screenshot the result after meaningful mutations.

## Verification

- Compare the rendered UI against the referenced Figma node at desktop and mobile widths.
- Verify assets load, text does not overflow, states are reachable, and there are no overlapping elements.
- Run the project's typecheck, lint, tests, and production build when available.
- Report any missing Figma assets, unavailable fonts, or design ambiguities rather than silently approximating them.

## Figma MCP skills

For direct Figma MCP operations, also load the official skills when available:

- `figma-use` before every `use_figma` call.
- `figma-design-to-code` before `get_design_context` for design-to-code work.
- `figma-generate-design` with `figma-use` when writing a composed screen from code to Figma.
- `figma-generate-library` with `figma-use` when creating components, variants, or design tokens.
- `figma-use-figjam` for FigJam boards and diagrams.

A Figma file URL or selected node and the appropriate edit permissions are required for write-to-canvas operations.
