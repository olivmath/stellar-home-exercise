# Blockchain Explainer Framework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Generalize the current Remotion/Stellar video into a reusable Floripa Web3 framework for clear, 5–6 minute blockchain explainers.

**Architecture:** Keep Remotion as the rendering engine, separating framework primitives, Floripa Web3 visual identity, the reusable blockchain teaching template, and per-blockchain content modules. The Stellar video becomes the first content module and reference implementation. Camera, transitions, music, sound effects, safe areas, and accessibility are first-class composition layers.

**Tech Stack:** React 19, TypeScript, Remotion 4, `@remotion/transitions`, Remotion audio components, 1920×1080 at 30fps.

**Spec:** This document captures the decisions from the repository review, `docs/projects/stellar/SCRIPT.md`, the Floripa Web3 brand manual at `/Users/olivmath/Downloads/Floripa Web3 — Manual da Marca v2.txt`, and the supplied visual references.

## Global Constraints

- The output video duration must be approximately 5–6 minutes.
- The six teaching topics are: foundation/history, wallet, transactions, blocks/ledger, consensus, and smart contracts.
- Each topic gets approximately 45–60 seconds, one core concept, 3–5 visual moments, one takeaway, and one bridge to the next topic.
- Floripa Web3 identity replaces Stellar identity in the framework.
- The visual identity uses graphite `#08090B`, blue `#183CFF`, support blue `#3C6DD3`, light blue `#A7C3FF`, strong white/black contrast, bold sans typography, and mono typography for code and metadata.
- Important content must not be placed directly over the presenter’s face by default.
- YouTube controls must not overlap the internal progress bar, episode labels, or other essential content.
- Camera modes must include `hidden`, `full`, `panel`, and Loom-style `bubble`.
- Background music and transition sound effects must be renderable inside Remotion.
- Text must remain readable when paused and must meet the framework’s 1080p minimum size and contrast rules.

## Review Focus

- Long or wrapped text must remain legible inside cards; test the maximum copy length used by narration overlays.
- Camera bubbles must not overlap diagrams, text, or the bottom YouTube safe area; test each supported corner.
- Scene transitions must preserve total duration and not create timing drift; test the full six-topic timeline.
- Music must duck under narration and fade at composition boundaries; test narration and silent ranges.
- Stellar-specific assets and terminology must remain isolated from framework components; test with a non-Stellar content fixture.

## Editorial Template

The reusable blockchain explainer follows this structure:

```text
Opening: hook and promise
1. Foundation/history: why the network exists
2. Wallet: how a user enters and proves identity
3. Transactions: how an intention becomes an operation
4. Blocks/ledger: where network state is recorded
5. Consensus: how participants agree
6. Smart contracts: how programmable logic executes
Closing: recap and next step
```

Every topic follows:

```text
Hook → context → core concept → visual demonstration → takeaway → bridge
```

Each module should provide:

```ts
type BlockchainExplainer = {
  brand: BrandConfig;
  mission: string;
  identity: IdentityModel;
  transactionModel: TransactionModel;
  stateModel: StateModel;
  consensusModel: ConsensusModel;
  programmabilityModel?: ProgrammabilityModel;
  useCases: UseCase[];
  narration: NarrationMarks;
};
```

The existing Stellar `docs/projects/stellar/SCRIPT.md` remains the first source for the template’s pacing and narrative depth. Its blockchain-specific facts, names, logos, and assets move into the Stellar module.

## Visual and Accessibility Rules

- Default composition: presenter in a dedicated region and diagram/content in a separate region.
- Use full-screen visual scenes when the diagram or code is the subject.
- Use a solid or opaque scrim behind text over photographic footage.
- Default 1080p minimums: auxiliary text 28–32px, mono labels 22–26px, card body 30–36px, card title 42–52px, main title 72–112px.
- Use no more than three simultaneous cards unless the visual is a deliberate grid.
- Use internal progress and episode indicators above the bottom safe area, approximately `y=900–930` for a 1080p composition.
- Define a composition safe area with top 64px, right 80px, bottom 150px, and left 80px.

## Camera System

```ts
type CameraMode = "hidden" | "full" | "panel" | "bubble";

type CameraBubbleConfig = {
  mode: CameraMode;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  shape?: "circle" | "rounded";
  border?: "none" | "white" | "blue" | "floripa";
  shadow?: boolean;
  enter?: "fade" | "scale" | "slide";
  exit?: "fade" | "scale" | "slide";
  zIndex?: number;
};
```

Recommended usage:

- `full`: opening, personal context, closing.
- `panel`: explanation with a diagram or cards.
- `bubble`: code, diagrams, reactions, and Loom-style commentary.
- `hidden`: concept-heavy scenes requiring full visual attention.

The bubble must be constrained by the safe area and content collision rules. Default 1080p sizes are 220px, 300px, and 380px.

## Audio System

The framework must support:

- narration track;
- low-volume background music with loop and fade in/out;
- automatic music ducking during narration;
- transition whooshes, risers, impacts, and clicks;
- per-track volume configuration;
- audio markers tied to scene transitions.

Example configuration:

```ts
const audioConfig = {
  music: "audio/music/ambient-tech.mp3",
  musicVolume: 0.1,
  transitionSound: "sounds/whoosh.mp3",
  transitionVolume: 0.3,
};
```

## Implementation Tasks

### Task 1: Extract the shared framework contracts

**Files:**
- Create: `src/framework/types.ts`
- Create: `src/framework/timing.ts`
- Create: `src/template/scriptSchema.ts`
- Test: `tests/framework/contracts.test.ts`

- [ ] Define typed scene, episode, narration mark, asset, camera, audio, and theme contracts.
- [ ] Move generic seconds-to-frames and safe-area calculations into `src/framework/timing.ts`.
- [ ] Add tests for 30fps conversion, episode duration, and safe-area bounds.

### Task 2: Create the Floripa Web3 design system

**Files:**
- Create: `src/design/floripaTheme.ts`
- Create: `src/design/tokens.ts`
- Modify: `src/styles/designSystem.ts`
- Modify: `src/styles/theme.ts`
- Test: `tests/design/floripaTheme.test.ts`

- [ ] Replace Stellar naming and gold palette with Floripa Web3 tokens.
- [ ] Add graphite, blue, support blue, light blue, white, and black semantic colors.
- [ ] Add typography, spacing, radius, shadow, contrast, and minimum-size tokens.
- [ ] Preserve component APIs where possible while removing direct Stellar dependencies.

### Task 3: Implement safe areas and readable content containers

**Files:**
- Create: `src/framework/SafeArea.tsx`
- Create: `src/components/ReadablePanel.tsx`
- Modify: `src/components/ProgressBar.tsx`
- Modify: `src/components/DebugTimer.tsx`
- Test: `tests/layout/safe-area.test.tsx`

- [ ] Render content inside the 1080p safe-area contract.
- [ ] Add opaque/scrim-backed readable panels for content over video.
- [ ] Move progress and episode markers above the bottom YouTube control region.
- [ ] Test the lower-boundary layout against the configured bottom safe area.

### Task 4: Implement the reusable camera layer

**Files:**
- Create: `src/components/CameraLayer.tsx`
- Create: `src/components/CameraBubble.tsx`
- Modify: `src/components/TalkingHead.tsx`
- Test: `tests/components/camera-layer.test.tsx`

- [ ] Implement `hidden`, `full`, `panel`, and `bubble` modes.
- [ ] Add circular Loom-style camera bubble with Floripa borders, shadow, and enter/exit motion.
- [ ] Keep bubble positions inside the safe area.
- [ ] Add configuration for size, corner, shape, transition, and layer order.
- [ ] Test all four corners and collision-reserved regions.

### Task 5: Implement transitions and audio layers

**Files:**
- Create: `src/framework/TransitionLayer.tsx`
- Create: `src/framework/AudioLayer.tsx`
- Create: `src/audio/audioMix.ts`
- Create: `src/audio/audioTimeline.ts`
- Modify: `package.json`
- Test: `tests/framework/audio-transition.test.tsx`

- [ ] Use `TransitionSeries` for scene transitions.
- [ ] Support fade, slide, wipe, zoom, and custom overlay transitions.
- [ ] Add background music with loop, fade, and configurable volume.
- [ ] Add narration ducking and transition sound effects.
- [ ] Test that audio markers align with transition frames.

### Task 6: Formalize the blockchain explainer template

**Files:**
- Create: `src/template/BlockchainExplainer.tsx`
- Create: `src/template/episodeTemplate.ts`
- Create: `docs/framework/BLOCKCHAIN_EXPLAINER_TEMPLATE.md`
- Test: `tests/template/blockchain-explainer.test.tsx`

- [ ] Encode the six-topic sequence and opening/closing contract.
- [ ] Support per-topic duration targets between 45 and 60 seconds.
- [ ] Support one core concept, visual moments, takeaway, and bridge per topic.
- [ ] Register non-Stellar fixture content in tests to prove the framework is generic.

### Task 7: Migrate Stellar into a content module

**Files:**
- Create: `src/modules/stellar/content.ts`
- Create: `src/modules/stellar/narration.ts`
- Create: `src/modules/stellar/assets.ts`
- Move or modify: `src/scenes/*`
- Move or modify: `src/config/audioMarks.ts`
- Modify: `src/Root.tsx`
- Modify: `src/StellarSpeedRun.tsx`

- [ ] Preserve `docs/projects/stellar/SCRIPT.md` as the source reference for the Stellar module.
- [ ] Move Stellar logos, people, protocol terms, and facts out of shared components.
- [ ] Replace Stellar-specific composition constants with module configuration.
- [ ] Re-register Stellar as one implementation of `BlockchainExplainer`.
- [ ] Remove unused or orphaned scene registration, including the current Episode6 ambiguity.

### Task 8: Validate the complete visual and audio system

**Files:**
- Modify: `README.md`
- Create: `docs/framework/QUALITY_CHECKLIST.md`
- Create: `tests/integration/full-explainer.test.tsx`

- [ ] Run TypeScript checks and the complete test suite.
- [ ] Render the full Stellar module and representative individual episodes.
- [ ] Inspect frames with camera full, panel, bubble, and hidden modes.
- [ ] Verify text remains readable over the presenter and over busy backgrounds.
- [ ] Verify progress and episode markers clear the YouTube control area.
- [ ] Verify narration, music ducking, and transition sounds in the rendered output.
- [ ] Document the workflow for creating a second blockchain module.

## Completion Criteria

- A new blockchain can be added by providing module data, narration, assets, theme overrides, and topic scenes.
- The Stellar module renders with the same teaching sequence but no longer defines the framework identity.
- The Floripa Web3 visual system is the default framework theme.
- Camera bubble mode is available for Loom-style commentary without obscuring important content.
- Transitions, background music, and transition sounds render inside Remotion.
- The bottom safe area prevents internal overlays from colliding with YouTube controls.
- Full render, typecheck, tests, and visual inspection pass before calling the migration complete.
