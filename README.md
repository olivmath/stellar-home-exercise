# Stellar Speed Run

> **End-to-End Stellar in 5 Minutes** — an animated educational video built with Remotion, React and TypeScript.

A programmatic video production covering the full Stellar blockchain stack: cryptographic identity, transactions, consensus, smart contracts, and privacy primitives. Created as a Developer Advocate application for the Stellar Development Foundation.

---

## What It Is

A ~5-minute narrated video where every frame is code. No video editor — animations are driven by Whisper-extracted audio timestamps, rendered at 1920×1080 @ 30fps using [Remotion](https://remotion.dev).

---

## Structure

| Episode | Topic | Duration |
|---------|-------|----------|
| Opening | Hook + title card | ~10s |
| EP01 | Foundation, Purpose & Network Economics | ~55s |
| EP02 | Wallet — Cryptographic Identity | ~50s |
| EP03 | Transactions & Operations | ~40s |
| EP04 | Ledgers & Consensus (SCP / FBA) | ~60s |
| EP05 | Soroban, WASM & zk-Proofs | ~65s |
| Closing | Recap checklist + certificate | ~25s |

---

## Tech Stack

- **[Remotion](https://remotion.dev) 4.0** — frame-accurate programmatic video
- **React 19** + **TypeScript 5.7**
- **Whisper** (OpenAI) — word-level timestamps that drive all scene timing
- Fonts: Lora · Inter · Anton · IBM Plex Mono

---

## Research & References Used

Everything in this video was built from primary sources. Here's what was studied:

### Official Stellar Documentation

| Resource | Used For |
|----------|----------|
| `docs/references/stellar/brand-manual-stellar-2025.pdf` | Color palette, typography, logo usage rules — the entire design system derives from this |
| `docs/references/stellar/sdf-press-kit-2024.pdf` | Stellar Development Foundation positioning, mission, key messaging |
| `docs/references/stellar/logo-press-kit-2026/` | Official SVG/PNG logos for Stellar, SDF, Stellar Core, Stellar Network, Stellar Anchors |

### Academic & Technical Papers

| Resource | Used For |
|----------|----------|
| [SCP White Paper — David Mazières (Stanford)](https://www.stellar.org/papers/stellar-consensus-protocol) | Federated Byzantine Agreement, quorum slices, 2/3 threshold consensus model — EP04 |
| [Ed25519 — Bernstein et al.](https://ed25519.cr.yp.to) | Why Stellar uses Ed25519 over secp256k1: smaller signatures, faster verification — EP02 |

### Protocol References

| Resource | Used For |
|----------|----------|
| [Stellar Docs — Transactions](https://developers.stellar.org/docs/learn/fundamentals/transactions) | Transaction lifecycle: Build → Sign → Submit → Horizon → Core → Settlement — EP03 |
| [Stellar Docs — Operations](https://developers.stellar.org/docs/learn/fundamentals/transactions/operations-and-transactions) | 26 operation types, atomicity rules — EP03 |
| [Stellar Docs — Ledgers](https://developers.stellar.org/docs/learn/fundamentals/stellar-data-structures/ledgers) | Ledger close cycle, ~5s finality, deterministic finality — EP04 |
| [Soroban Docs](https://developers.stellar.org/docs/build/smart-contracts) | WASM VM, Rust SDK, gas model (CPU + storage), TTL/rent model — EP05 |
| [CAP-0021 — Core Advancement Proposals](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0021.md) | On-chain governance model via CAPs — EP01 |
| [Protocol 21 — New Crypto Primitives](https://stellar.org/blog/developers/protocol-21-upgrade-complete) | secp256r1, BLS12-381, BN254, Poseidon hash — enabling zk-SNARKs and passkeys at L1 — EP05 |

### Code Reference

| Resource | Used For |
|----------|----------|
| `docs/projects/stellar/flipper.rs` | The canonical Soroban Flipper contract — `get()` and `flip()` functions animated live in EP05 |

### People & Assets

| Resource | Used For |
|----------|----------|
| `public/images/founders/jed-maccaleb.jpg` | Founder card — EP01 |
| `public/images/founders/joyce-kim.jpeg` | Founder card — EP01 |
| `public/images/scientists/david-mazieres.jpg` | Creator of SCP — EP04 |
| `public/images/scientists/grandon.png` | Graydon Hoare, creator of Rust / Soroban architect — EP05 |

### Production Files

| Resource | Used For |
|----------|----------|
| `docs/projects/stellar/SCRIPT.md` | Final narration script, synced word-by-word to audio |
| `docs/projects/stellar/BRAINSTORM.md` | Video direction, shot list, storyboard, teaching pattern design |
| `docs/projects/stellar/full-narration-timestamps.json` | Whisper word-level timestamps → `src/config/audioMarks.ts` |

---

## Running Locally

```bash
pnpm install
pnpm studio        # Remotion Studio at localhost:3000 (preview + scrubbing)
pnpm studio:index  # Opens the visual FloripaWeb3Index selector
pnpm exec tsc --noEmit   # type-check
```

## Rendering

```bash
pnpm render        # renders the full 1920×1080 MP4
pnpm preview       # quick lower-quality render for review
pnpm render:index  # renders the composition index
pnpm render:composition -- <COMPOSITION_ID> <OUTPUT_PATH>  # renders any registered composition
```

### Composition selection

Open `FloripaWeb3Index` in Remotion Studio to see the complete list of renderable
videos, scene previews, and the thumbnail. The exact IDs are also visible in the
index and can be used directly from the CLI:

```bash
pnpm studio:index
pnpm render:composition -- StellarSpeedRun out/stellar-speedrun.mp4
pnpm render:composition -- Episode3-Transactions out/episode-3.mp4
pnpm render:composition -- Thumbnail out/thumbnail.mp4
```

When adding another blockchain video, register its composition in `src/Root.tsx`
and add a matching entry to `floripaWeb3Compositions` in
`src/compositions/FloripaWeb3Index.tsx` so Studio and CLI selection stay discoverable.

For the complete pre-delivery review, use [the quality checklist](docs/framework/QUALITY_CHECKLIST.md).

For humans and agents creating future blockchain videos, use the [production manual](docs/framework/AGENT_MANUAL.md).

---

## Project Structure

```
src/
├── config/
│   └── audioMarks.ts       # Source of truth: all timestamps + episode boundaries
├── scenes/
│   ├── Opening.tsx
│   ├── Episode1–5.tsx      # each episode has its own rel() timing
│   └── Closing.tsx
├── components/             # Badge, GlassPanel, LowerThird, FlowDiagram...
├── animations/
│   └── springs.ts          # fadeIn, slideIn, scaleIn
└── styles/
    ├── theme.ts             # raw brand colors & fonts
    └── designSystem.ts      # text.*, space.*, glass.*, shadows.*, layout.*
├── framework/               # reusable timing, audio, safe-area, and transition primitives
├── modules/stellar/          # Stellar-specific content, assets, narration, and scene exports
└── template/                 # reusable blockchain explainer contracts and renderer
```

---

## How Animation Timing Works

All timing has 3 layers:

```
audioMarks.ts          EpisodeN.tsx              Component
──────────────         ────────────────          ──────────────────
absolute second   →    Sequence frame       →    internal delay
(e.g. 136.43s)        (where scene lives)        (when element appears)
```

### Layer 1 — Absolute seconds (`src/config/audioMarks.ts`)

All timestamps come from Whisper (audio transcription). They are seconds in the full video.

```ts
mark("Payment: for asset transfers", 137.0, 139.0),
//                                   ↑ starts at 137.0s in the video
```

**To find the second of any frame:** `frame ÷ 30 = seconds`

### Layer 2 — `<Sequence>` frames (episode file)

Each episode has an origin point `EP` and a `rel()` function that converts absolute second → relative frame:

```ts
const EP = episodes.ep3.startSec;
const rel = (sec: number) => toFrame(sec - EP);

<Sequence from={rel(132.90)} durationInFrames={rel(144.43) - rel(132.90)}>
```

### Layer 3 — Component internal delay

Inside the component, `frame = 0` when the `<Sequence>` starts. Delays are in **seconds from scene start**:

```ts
const delaySec = 136.43 - SCENE_START; // seconds after scene begins
const opacity  = fadeIn(frame, fps, delaySec);
```

### Quick Diagnosis

| Symptom | Fix |
|---------|-----|
| Element appears **too early** | Increase `delay` or `from` of `<Sequence>` |
| Element appears **too late** | Decrease `delay` or `from` of `<Sequence>` |
| Element disappears **too early** | Increase `durationInFrames` of `<Sequence>` |
| Whole scene **out of sync** | Adjust `from={rel(X)}` — change the absolute second `X` |

---

## Author

**Lucas Bispo de Oliveira** — [@olivmath](https://github.com/olivmath)

> *"Developers don't adopt blockchains. They adopt good developer experiences."*
