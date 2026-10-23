import type { BlockchainExplainer } from "../../framework/types";
import { episodes } from "../../config/audioMarks";
import { stellarAssets } from "./assets";
import { stellarNarration } from "./narration";
import { stellarScript } from "./script";

const scene = (id: string, start: number, duration: number) => ({ id, kind: "concept" as const, start, duration });

export const stellarExplainer: BlockchainExplainer = {
  brand: { name: "Stellar", colors: {}, fonts: {}, safeArea: { top: 64, right: 80, bottom: 150, left: 80 }, logo: stellarAssets[0] },
  mission: "Accessible, programmable, and privacy-enabled global settlement.",
  identity: { name: "Stellar account", description: "A public key identifies an account.", proof: "Ed25519 signature from the secret key" },
  transactionModel: { name: "Operations in a transaction", description: "An envelope of atomic intentions submitted through Horizon.", lifecycle: ["Build", "Sign", "Submit", "Validate", "Settle"] },
  stateModel: { name: "Ledger", description: "A finalized snapshot of network state.", unit: "ledger" },
  consensusModel: { name: "Stellar Consensus Protocol", description: "Validators agree through quorum slices.", finality: "Deterministic finality after quorum agreement" },
  programmabilityModel: { name: "Soroban", description: "Smart contracts executed in a WASM virtual machine.", runtime: "Rust / WASM" },
  useCases: [{ id: "settlement", title: "Global settlement", description: "Move value across borders efficiently." }, { id: "assets", title: "Digital assets", description: "Issue and transfer tokens." }],
  script: stellarScript,
  narration: stellarNarration,
  opening: scene("opening", 0, 10),
  topics: [
    { id: "foundation", title: "Foundation", start: episodes.ep1.startSec, duration: 55.52, scenes: [scene("foundation", 0, 55.52)], coreConcept: "Why Stellar exists", visualMoments: [{ id: "history", title: "2014", description: "Origin and mission" }, { id: "economics", title: "Network economics", description: "Fees and validators" }, { id: "caps", title: "CAPs", description: "Protocol evolution" }], takeaway: "Stellar optimizes for accessible settlement.", bridge: "That starts with an account." },
    { id: "wallet", title: "Wallet", start: episodes.ep2.startSec, duration: 52.32, scenes: [scene("wallet", 0, 52.32)], coreConcept: "Cryptographic identity", visualMoments: [{ id: "seed", title: "Seed", description: "Random bytes" }, { id: "keys", title: "Key pair", description: "Secret signs, public identifies" }, { id: "ed25519", title: "Ed25519", description: "Signature scheme" }], takeaway: "The secret key proves control; the public key is shareable.", bridge: "Now the identity can express an intention." },
    { id: "transactions", title: "Transactions", start: episodes.ep3.startSec, duration: 45, scenes: [scene("transactions", 0, 45)], coreConcept: "Atomic operations", visualMoments: [{ id: "build", title: "Build", description: "Compose operations" }, { id: "submit", title: "Submit", description: "Horizon to Core" }, { id: "atomic", title: "Atomicity", description: "All succeed or fail" }], takeaway: "A transaction is the container; operations are the intentions.", bridge: "Accepted intentions become ledger state." },
    { id: "blocks", title: "Ledgers", start: episodes.ep4.startSec, duration: 45, scenes: [scene("ledgers", 0, 45)], coreConcept: "State is recorded in ledgers", visualMoments: [{ id: "ledger", title: "Ledger", description: "State snapshot" }, { id: "close", title: "Five seconds", description: "Ledger cadence" }, { id: "finality", title: "Finality", description: "No forks" }], takeaway: "Stellar records finalized ledgers rather than mined blocks.", bridge: "Finality depends on agreement." },
    { id: "consensus", title: "Consensus", start: episodes.ep4.startSec, duration: 45, scenes: [scene("consensus", 0, 45)], coreConcept: "Quorum slices", visualMoments: [{ id: "validators", title: "Validators", description: "Relevant participants" }, { id: "quorum", title: "Two-thirds", description: "Agreement threshold" }, { id: "scp", title: "SCP", description: "Federated consensus" }], takeaway: "Validators reach deterministic agreement without mining.", bridge: "With state agreed, code can run on top." },
    { id: "smart-contracts", title: "Smart contracts", start: episodes.ep5.startSec, duration: 60, scenes: [scene("contracts", 0, 60)], coreConcept: "Programmable logic", visualMoments: [{ id: "soroban", title: "Soroban", description: "Contract platform" }, { id: "wasm", title: "WASM", description: "Execution runtime" }, { id: "ttl", title: "TTL", description: "State rent and archival" }], takeaway: "Soroban makes Stellar programmable while managing state growth.", bridge: "Together these pieces form the complete network flow." },
  ],
  closing: scene("closing", episodes.closing.startSec, episodes.closing.endSec - episodes.closing.startSec),
};
