# Agent Manual

This is the operational entry point for anyone working in this repository. It is a programmatic, narrated blockchain explainer built with Remotion, React, and TypeScript.

## Start here

| Goal | Read or run |
|---|---|
| Understand the project | `README.md` |
| Understand workflow and boundaries | This file |
| Change visual styling | `CLAUDE.md`, `src/styles/designSystem.ts`, `src/styles/theme.ts` |
| Add a blockchain module | `BLOCKCHAIN_EXPLAINER_TEMPLATE.md` |
| Validate a delivery | `QUALITY_CHECKLIST.md` |
| Preview compositions | `pnpm studio:index` |

The repository currently contains the complete Stellar production and an Ethereum module used as a framework example. The main delivery is `StellarSpeedRun`.

## Architecture

```text
module content + narration + assets
              ↓
src/template/       reusable blockchain explainer contract
              ↓
src/framework/      timing, audio, safe areas, transitions, types
              ↓
src/components/     reusable visual building blocks
src/modules/*/scenes.ts and src/scenes/  concrete scenes
              ↓
src/Root.tsx        Remotion composition registry
              ↓
1920×1080 MP4 at 30fps
```

| Layer | Location | Responsibility |
|---|---|---|
| Framework | `src/framework/` | Shared timing, audio, safe-area, transition, and type primitives |
| Design | `src/design/`, `src/styles/` | Floripa Web3 theme, tokens, typography, and layout |
| Template | `src/template/` | Reusable explainer contract and episode structure |
| Module | `src/modules/<name>/` | Chain-specific facts, narration, assets, scripts, and scenes |
| Components | `src/components/` | Reusable visual UI |
| Registry | `src/Root.tsx` | Renderable Remotion compositions |

Keep chain-specific facts, names, logos, assets, and narration inside the module. Shared code must remain reusable.

## Before editing

1. Read `README.md`, this manual, `CLAUDE.md`, and the relevant issue or plan.
2. Run `git status --short` and preserve unrelated user changes.
3. Inspect existing files before creating new ones.
4. Keep the task scoped; do not rewrite unrelated scenes.
5. Use existing timing, design-system, safe-area, camera, and audio primitives.

## Timing rules

Narration timing has three layers:

```text
audioMarks.ts absolute seconds → Sequence relative frames → component delay
```

- Use `FPS` and `toFrame()` from `src/config/audioMarks.ts`.
- Convert absolute seconds to episode-relative frames with the local `rel()` helper.
- Inside a `Sequence`, frame `0` is the scene start; component delays are relative to that scene.
- Keep narration, `audioMarks`, `Sequence`, and animation changes synchronized.

## Visual rules

- Use presets from `src/styles/designSystem.ts`; do not introduce raw typography, spacing, glass, or glow values.
- Use `SafeArea` and keep essential overlays above the lower YouTube control area.
- Use `CameraLayer` for `hidden`, `full`, `panel`, and `bubble` camera modes.
- Put readable panels or scrims over busy images and video.
- Keep important content away from the presenter’s face.
- All user-facing copy in the video must be in English.
- Use circular portrait cards with the person’s name and role below the image when introducing a person.
- The closing must show the certificate.

## Audio and assets

- Audio assets are under `public/audio/` and `public/sounds/`.
- Image assets are under `public/images/`.
- Use `staticFile()` paths relative to `public/`; never depend on machine-specific absolute paths.
- Music is optional and must have a fallback when absent.
- Narration should remain intelligible through music ducking.
- Align sound effects and transitions to frames.

## Validation

```bash
pnpm exec tsc --noEmit
pnpm studio:index
pnpm preview
pnpm render
```

Use `QUALITY_CHECKLIST.md` before sharing a render. There are currently no `lint`, `test`, or `build` scripts in `package.json`; do not claim those checks passed unless they are added or run through another explicit tool.

## Adding a blockchain module

Create:

```text
src/modules/<name>/content.ts
src/modules/<name>/narration.ts
src/modules/<name>/assets.ts
src/modules/<name>/script.ts
src/modules/<name>/scenes.ts
```

Reuse `src/framework/types.ts` and `src/template/`. Register compositions in `src/Root.tsx` and add them to `src/compositions/FloripaWeb3Index.tsx` when they should appear in the selector. Do not copy Stellar-specific identity into the framework.

## References

- `BLOCKCHAIN_EXPLAINER_TEMPLATE.md`: reusable editorial and technical contract.
- `QUALITY_CHECKLIST.md`: pre-render and handoff checks.
- `docs/projects/stellar/SCRIPT.md`: human-readable Stellar script.
- `docs/projects/ethereum/SCRIPT.md`: human-readable Ethereum script.
- `docs/superpowers/plans/`: implementation plans and project history.
