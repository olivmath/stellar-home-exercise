/**
 * Audio timestamps extracted from full-narration.mp3 using Whisper.
 * Source: public/audio/narration/full-narration.mp3 (295.3s)
 *
 * These marks sync narration with Remotion animations.
 * Timestamps are in seconds — use toFrame() to convert.
 */

export const FPS = 30;

/** Convert seconds to frames */
export const toFrame = (seconds: number): number => Math.round(seconds * FPS);

// ─── Episode boundaries (from Whisper word-level timestamps) ─────────

export const episodes = {
  opening: { startSec: 0, endSec: 0, startFrame: 0, endFrame: 0 },
  ep1: {
    startSec: 0,
    endSec: 55.52,
    startFrame: 0,
    endFrame: toFrame(55.52),
  },
  ep2: {
    startSec: 57.68,
    endSec: 106.88,
    startFrame: toFrame(57.68),
    endFrame: toFrame(106.88),
  },
  ep3: {
    startSec: 108.68,
    endSec: 148.78,
    startFrame: toFrame(108.68),
    endFrame: toFrame(148.78),
  },
  ep4: {
    startSec: 151.74,
    endSec: 210.38,
    startFrame: toFrame(151.74),
    endFrame: toFrame(210.38),
  },
  ep5: {
    startSec: 212.1,
    endSec: 243.30,
    startFrame: toFrame(212.1),
    endFrame: toFrame(243.30),
  },
  ep6: {
    startSec: 243.30,
    endSec: 275.28,
    startFrame: toFrame(243.30),
    endFrame: toFrame(275.28),
  },
  closing: {
    startSec: 275.28,
    endSec: 295.04,
    startFrame: toFrame(275.28),
    endFrame: toFrame(295.04),
  },
} as const;

// ─── Detailed narration marks per episode ────────────────────────────

export type AudioMark = {
  text: string;
  startSec: number;
  endSec: number;
  startFrame: number;
  endFrame: number;
};

const mark = (text: string, startSec: number, endSec: number): AudioMark => ({
  text,
  startSec,
  endSec,
  startFrame: toFrame(startSec),
  endFrame: toFrame(endSec),
});

// Episode 1 — Foundation, Purpose, and Network Economics
export const ep1Marks: AudioMark[] = [
  mark("Welcome to Stellar Speedrun", 0.0, 2.12),
  mark(
    "In 5 minutes, you will understand the complete Stellar flow",
    2.12,
    4.5
  ),
  mark(
    "Stellar was created in 2014 by Jed McCaleb, co-founder of Ripple and Mt. Gox, together with Joyce Kim",
    10.3,
    16.88
  ),
  mark(
    "Today, development is led by the Stellar Development Foundation",
    17.3,
    21.7
  ),
  mark(
    "The goal is clear: financial inclusion and efficient global settlement",
    22.08,
    27.08
  ),
  mark(
    "The sender pays a minimal fee in XLM — only for spam prevention",
    27.08,
    33.44
  ),
  mark("There are no miners. There are validators", 33.72, 39.16),
  mark(
    "The incentive is utility and interoperability, not inflation",
    39.16,
    44.02
  ),
  mark(
    "Changes are proposed via CAPs and activated through validator consensus",
    44.02,
    55.52
  ),
  mark("How does a user enter this network?", 50.06, 55.52),
  mark("Next episode: Wallets", 55.52, 57.46),
];

// Episode 2 — Wallet: Cryptographic Identity
export const ep2Marks: AudioMark[] = [
  mark("To participate in Stellar, you need an identity", 57.68, 60.3),
  mark(
    "It all starts with 32 random bytes, also known as a seed",
    60.8,
    67.16
  ),
  mark("The flow is deterministic", 67.4, 68.0),
  mark("The seed is generated", 68.0, 69.8),
  mark("The Secret Key is derived — starts with S", 69.8, 72.76),
  mark("The Public Key is derived — starts with G", 73.18, 78.3),
  mark("Both are encoded in Base32 with checksum (StrKey encoding)", 78.3, 83.78),
  mark("The Secret signs. The Public identifies", 83.78, 90.72),
  mark(
    "Unlike Bitcoin (secp256k1), Stellar uses Ed25519",
    90.72,
    97.3
  ),
  mark(
    "More efficient, with smaller signatures and high security",
    97.3,
    102.16
  ),
  mark(
    "The network verifies transaction authenticity using these signatures",
    102.16,
    106.38
  ),
  mark(
    "Now you have identity. But what exactly do you send to the network?",
    106.38,
    106.88
  ),
  mark("Next episode: Transactions", 106.88, 108.12),
];

// Episode 3 — Transactions and Operations
export const ep3Marks: AudioMark[] = [
  mark(
    "In Stellar, a transaction is an envelope of intentions",
    108.68,
    111.9
  ),
  mark(
    "Build the transaction with operations and parameters",
    111.9,
    116.68
  ),
  mark("Sign with your Secret Key", 117.22, 118.0),
  mark("Submit to Horizon, the network API", 118.0, 123.0),
  mark("Horizon forwards to Stellar Core", 123.0, 125.5),
  mark("Stellar Core validates and confirms it", 125.5, 128.74),
  mark("A transaction can contain up to 100 operations", 128.74, 132.0),
  mark("All operations are atomic. If one fails, all fail", 132.0, 135.34),
  mark("There are 26 operation types", 135.34, 137.0),
  mark("Payment: for asset transfers", 137.0, 139.0),
  mark("Change Trust: to receive and issue new tokens", 139.0, 140.42),
  mark(
    "Invoke Host Function: to interact with smart contracts",
    140.42,
    145.5
  ),
  mark(
    "A transaction is the container. Operations are the intentions",
    145.86,
    148.5
  ),
  mark("Next episode: Consensus", 148.78, 150.24),
];

// Episode 4 — Ledgers and Consensus
export const ep4Marks: AudioMark[] = [
  mark(
    "In Stellar, there are no blocks. There are Ledgers",
    151.74,
    158.78
  ),
  mark("They close on average every 5 seconds", 158.78, 162.0),
  mark("Validators collect transactions", 162.0, 164.08),
  mark("Propose a new ledger", 164.08, 166.0),
  mark("Execute the consensus protocol", 166.0, 170.16),
  mark(
    "The ledger closes when at least 2/3 of the relevant set agrees",
    170.16,
    177.14
  ),
  mark("Finality is instant and deterministic — no forks", 177.14, 182.32),
  mark(
    "Consensus is neither Proof of Work nor Proof of Stake",
    182.48,
    186.0
  ),
  mark(
    "Stellar uses SCP — Stellar Consensus Protocol",
    186.0,
    192.32
  ),
  mark(
    "Created by David Mazières, professor at Stanford University",
    192.62,
    197.18
  ),
  mark("It is a model called Federated Byzantine Agreement", 197.18, 202.94),
  mark(
    "Each node chooses its list of trusted nodes (quorum slices)",
    202.94,
    208.4
  ),
  mark(
    "Consensus happens when the overlap reaches more than 2/3 of validators",
    208.4,
    214.36
  ),
  mark("Result: decentralization, security, and scalability", 214.6, 219.94),
  mark(
    "What's left is the programmability layer",
    219.94,
    209.94
  ),
  mark("Final episode: Soroban", 210.38, 211.74),
];

// Episode 5 — Soroban, WASM, and zk-Proofs
export const ep5Marks: AudioMark[] = [
  mark(
    "In 2024, Stellar activated Soroban — its smart contract platform",
    212.1,
    216.28
  ),
  mark(
    "Soroban runs on a WASM virtual machine, with primary development in Rust",
    216.86,
    221.48
  ),
  mark(
    "The architecture was designed by Graydon Hoare, the creator of Rust",
    221.48,
    225.82
  ),
  mark("The gas model charges for CPU and storage", 226.48, 232.1),
  mark("Here there is an important innovation: TTL — Time To Live", 232.1, 237.0),
  mark(
    "Stored data must be renewed by paying rent. Otherwise, it can be archived",
    237.52,
    242.24
  ),
  mark(
    "This prevents indefinite network growth like Ethereum and others",
    242.74,
    247.58
  ),
  mark(
    "A simple example is the Flipper contract: it stores a boolean",
    247.88,
    251.88
  ),
  mark("Query through get(), flip state with flip()", 251.88, 256.9),
  mark(
    "Since Protocol 21: secp256r1, BLS12-381, BN254, Poseidon hash",
    256.9,
    268.16
  ),
  mark("This enables: zk-SNARK proofs, better UX through passkeys", 268.46, 275.28),
  mark(
    "All natively at Layer 1. Result: scalability and privacy",
    275.28,
    275.28
  ),
];

// Closing
export const closingMarks: AudioMark[] = [
  mark("Now you understand Stellar end-to-end", 275.28, 280.36),
  mark(
    "Cryptographic identities, atomic transactions, federated consensus",
    280.36,
    284.24
  ),
  mark(
    "Secure programmability, efficient state storage, privacy support",
    284.5,
    288.72
  ),
  mark(
    "Stellar is a global settlement protocol — accessible, programmable, and privacy-enabled",
    289.06,
    293.0
  ),
  mark("I am Lucas Bispo de Oliveira. See you on-chain.", 293.0, 295.04),
];

// ─── Scene config for StellarSpeedRun.tsx ────────────────────────────

export const sceneConfig = [
  {
    id: "ep1" as const,
    from: episodes.ep1.startFrame,
    duration: episodes.ep1.endFrame - episodes.ep1.startFrame,
  },
  {
    id: "ep2" as const,
    from: episodes.ep2.startFrame,
    duration: episodes.ep2.endFrame - episodes.ep2.startFrame,
  },
  {
    id: "ep3" as const,
    from: episodes.ep3.startFrame,
    duration: episodes.ep3.endFrame - episodes.ep3.startFrame,
  },
  {
    id: "ep4" as const,
    from: episodes.ep4.startFrame,
    duration: episodes.ep4.endFrame - episodes.ep4.startFrame,
  },
  {
    id: "ep5" as const,
    from: episodes.ep5.startFrame,
    duration: episodes.ep5.endFrame - episodes.ep5.startFrame,
  },
  {
    id: "ep6" as const,
    from: episodes.ep6.startFrame,
    duration: episodes.ep6.endFrame - episodes.ep6.startFrame,
  },
  {
    id: "closing" as const,
    from: episodes.closing.startFrame,
    duration: episodes.closing.endFrame - episodes.closing.startFrame,
  },
] as const;
