# Quality Checklist

Use this checklist before sharing a render or adding a second blockchain module.

## Integration

- [ ] `pnpm install` completes from a clean checkout.
- [ ] `pnpm exec tsc --noEmit` completes without type or import errors.
- [ ] Every composition registered in `src/Root.tsx` has a component, finite duration, and expected dimensions.
- [ ] Every `staticFile()` path resolves to a file under `public/`.
- [ ] Module-specific content stays under `src/modules/<module>/`; shared components do not contain chain-specific facts or assets.

## Rendering

- [ ] `pnpm preview` produces a reviewable MP4.
- [ ] `pnpm render` produces the full 1920×1080 delivery render.
- [ ] The full composition and representative episode compositions open in Remotion Studio without runtime errors.
- [ ] Opening, topic transitions, and closing begin and end at the intended narration marks.

## Visual review

- [ ] Camera modes (`full`, `panel`, `bubble`, and hidden) keep the presenter inside the configured safe area.
- [ ] Text remains readable over the presenter, panels, gradients, and busy backgrounds.
- [ ] Progress and episode markers stay above the YouTube control area.
- [ ] Logos, portraits, and other image assets preserve their intended aspect ratio.
- [ ] The thumbnail composition renders as a single 1280×720 frame.

## Audio review

- [ ] Narration is present, synchronized, and intelligible from start to finish.
- [ ] Music is optional and only enabled when its asset exists under `public/`.
- [ ] Music ducks while narration is active.
- [ ] Transition and impact sounds begin at the intended frame and do not clip.
- [ ] The final render has no missing-asset warnings.

## New blockchain module

1. Add module data, narration marks, and asset metadata under `src/modules/<module>/`.
2. Reuse the contracts in `src/framework/types.ts` and renderer helpers in `src/template/`.
3. Provide a module theme or theme override without changing shared Stellar content.
4. Export the module’s scenes from its module entrypoint and register compositions in `src/Root.tsx`.
5. Run the integration and rendering checks above before publishing.
