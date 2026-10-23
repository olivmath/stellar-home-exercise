# Blockchain Video Framework — Agent Instructions

This repository is a reusable framework for producing narrated, programmatic blockchain explainer videos. It is not tied to a single blockchain, protocol, or production.

Read `README.md` and `AGENT_MANUAL.md` before making changes. This file contains the rules that apply to every module and every video.

## Project boundaries

- Shared framework code belongs in `src/framework/`, `src/template/`, `src/components/`, `src/animations/`, or shared design files.
- Chain-specific facts, terminology, scripts, narration, assets, and scenes belong in `src/modules/<name>/`.
- Register renderable compositions in `src/Root.tsx`.
- Add discoverable compositions to `src/compositions/FloripaWeb3Index.tsx` when appropriate.
- Never move chain-specific assumptions into shared components or framework contracts.
- Use `public/` for media consumed by Remotion; reference it with `staticFile()` paths, never machine-specific absolute paths.

## Before editing

1. Read `README.md`, `AGENT_MANUAL.md`, this file, and the relevant plan or issue.
2. Run `git status --short` and preserve unrelated user changes.
3. Inspect existing components, modules, compositions, and assets before creating new files.
4. Keep changes scoped to the requested module or framework layer.
5. Use existing timing, audio, safe-area, camera, and design-system primitives.

## Design system

All visual components must use presets from `src/styles/designSystem.ts` and colors/fonts from `src/styles/theme.ts`.

- Use `text.*` for typography.
- Use `space.*` for spacing; do not introduce magic pixel values.
- Use `glass.*` or `<GlassPanel>` for glass surfaces.
- Use `shadows.*` for elevation and glows.
- Use `variants` for semantic color variants.
- Use `layout.*`, `SafeArea`, `CameraLayer`, and `ReadablePanel` where applicable.
- Keep text readable at 1920×1080 and away from the lower YouTube control area.
- Use circular portrait cards with the person’s name and role below the image when introducing a person.
- End a complete video with its configured closing treatment; certificates are content-driven, not framework assumptions.

Example:

```tsx
import { colors } from "../styles/theme";
import { space, text, variants } from "../styles/designSystem";

<div style={{ ...text.h1, color: variants.gold.color, padding: space.lg }}>
  Title
</div>
```

## Timing and audio

Keep the timing chain intact:

```text
script → narration → timestamps → audio marks → Sequence → animation
```

- Use the project FPS and `toFrame()` helper instead of duplicating conversion logic.
- Keep absolute narration timestamps in the relevant module or shared timeline source.
- Convert absolute seconds to episode-relative frames with a local `rel()` helper.
- Treat frame `0` inside a `Sequence` as the start of that scene.
- Configure audio through the existing audio layers and keep narration intelligible through music ducking.
- Align transitions and sound effects to frames.

## Module contract

New blockchain modules should follow this shape:

```text
src/modules/<name>/
├── assets.ts
├── content.ts
├── narration.ts
├── scenes.ts
└── script.ts
```

Reuse the contracts in `src/framework/types.ts` and the renderer in `src/template/`. A module should provide its own identity, facts, concepts, narration, assets, and visual scenes without changing other modules or shared framework behavior.

## Validation

Run the checks appropriate to the change:

```bash
pnpm exec tsc --noEmit
pnpm studio:index
pnpm preview
pnpm render
```

Use `QUALITY_CHECKLIST.md` before sharing a render. The current package does not define separate `lint`, `test`, or `build` scripts, so do not claim those checks passed unless they are explicitly added or run through another tool.

## Copy and documentation

- All user-facing video copy must be in English unless a module explicitly defines another language requirement.
- Keep module documentation under `docs/projects/<name>/`.
- Keep reusable framework documentation at the repository root.
- Update composition lists and documentation when adding or renaming a module.
- Do not document a composition, asset, command, or path that does not exist.
