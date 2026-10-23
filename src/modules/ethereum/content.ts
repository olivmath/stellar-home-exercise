import type { BlockchainExplainer } from "../../framework/types";
import { ethereumTimeline } from "./timeline";
import { ethereumAssets } from "./assets";
import { ethereumNarration } from "./narration";
import { ethereumScript } from "./script";

const scene = (id: string, start: number, duration: number) => ({ id, kind: "concept" as const, start, duration });

export const ethereumExplainer: BlockchainExplainer = {
  brand: { name: "Floripa Web3 · Ethereum", colors: { primary: "#61d8ff", accent: "#8c7bff", background: "#07111f" }, fonts: {}, safeArea: { top: 64, right: 80, bottom: 150, left: 80 } },
  mission: "A public, programmable settlement network for value and applications.",
  identity: { name: "Ethereum account", description: "An address identifies an account; a private key authorizes an externally owned account.", proof: "ECDSA signature over the transaction" },
  transactionModel: { name: "EVM transaction", description: "A signed request to transfer value, deploy code, or call a contract.", lifecycle: ["Construct", "Sign", "Broadcast", "Execute", "Include", "Confirm"] },
  stateModel: { name: "World state", description: "Balances, nonces, code, and contract storage committed by block state roots.", unit: "block" },
  consensusModel: { name: "Proof of Stake", description: "Validators propose and attest to blocks using staked ETH.", finality: "Economic finality after sufficient validator attestations" },
  programmabilityModel: { name: "Ethereum Virtual Machine", description: "Deterministic bytecode execution shared by every validating node.", runtime: "Solidity → EVM bytecode" },
  useCases: [
    { id: "defi", title: "Open finance", description: "Trade, lend, borrow, and settle through composable contracts." },
    { id: "assets", title: "Digital assets", description: "Issue tokens, stablecoins, collectibles, and credentials." },
    { id: "coordination", title: "On-chain coordination", description: "Build DAOs, games, marketplaces, and public infrastructure." },
  ],
  script: ethereumScript,
  narration: ethereumNarration,
  opening: scene("opening", 0, 8),
  topics: [
    { id: "foundation", title: "Foundation", ...ethereumTimeline.foundation, scenes: [scene("foundation", 0, ethereumTimeline.foundation.duration)], coreConcept: "Ethereum as a programmable settlement layer", visualMoments: [{ id: "history", title: "2013 → 2015", description: "From proposal to launch" }, { id: "eth", title: "ETH", description: "Execution, staking, economy" }, { id: "gas", title: "Gas", description: "Measured computation" }], takeaway: "Ethereum combines programmable execution with economic security.", bridge: "But how does a user enter this network?" },
    { id: "wallet", title: "Wallets and accounts", ...ethereumTimeline.wallet, scenes: [scene("wallet", 0, ethereumTimeline.wallet.duration)], coreConcept: "Keys authorize accounts", visualMoments: [{ id: "key", title: "Private key", description: "Secret authorization" }, { id: "address", title: "0x address", description: "Public identifier" }, { id: "types", title: "EOA + contract", description: "Two account types" }], takeaway: "A wallet manages keys; the address represents the account.", bridge: "To change state, the account needs a transaction." },
    { id: "transactions", title: "Transactions and gas", ...ethereumTimeline.transactions, scenes: [scene("transactions", 0, ethereumTimeline.transactions.duration)], coreConcept: "Signed requests become state transitions", visualMoments: [{ id: "lifecycle", title: "Build → Include", description: "Mempool to block" }, { id: "fields", title: "Transaction fields", description: "To, value, data, nonce" }, { id: "revert", title: "Revert", description: "Gas is still paid" }], takeaway: "Transactions are signed instructions that every node can reproduce.", bridge: "Validators decide which transactions enter the next block." },
    { id: "consensus", title: "Blocks and Proof of Stake", ...ethereumTimeline.consensus, scenes: [scene("consensus", 0, ethereumTimeline.consensus.duration)], coreConcept: "Validators coordinate canonical history", visualMoments: [{ id: "layers", title: "Two layers", description: "Execution + consensus" }, { id: "gasper", title: "Gasper", description: "Casper FFG + LMD GHOST" }, { id: "finality", title: "Finality", description: "12-second blocks, 32-slot epochs" }], takeaway: "Proof of Stake secures block order through stake and attestations.", bridge: "Execution is where Ethereum becomes programmable." },
    { id: "smart-contracts", title: "EVM, contracts and scaling", ...ethereumTimeline["smart-contracts"], scenes: [scene("contracts", 0, ethereumTimeline["smart-contracts"].duration)], coreConcept: "Solidity becomes shared computation", visualMoments: [{ id: "flipper", title: "Flipper", description: "Read and mutate boolean state" }, { id: "evm", title: "EVM", description: "Same code, same result" }, { id: "l2", title: "Layer 2", description: "Cheaper execution anchored to Ethereum" }], takeaway: "Smart contracts turn Ethereum into a composable application platform.", bridge: "Now the complete flow is visible." },
  ],
  closing: scene("closing", ethereumTimeline.closing.start, ethereumTimeline.closing.duration),
};
