import type { BlockchainExplainer } from "../../framework/types";
import { episodes } from "../../config/audioMarks";
import { ethereumAssets } from "./assets";
import { ethereumNarration } from "./narration";
import { ethereumScript } from "./script";

const scene = (id: string, start: number, duration: number) => ({ id, kind: "concept" as const, start, duration });

export const ethereumExplainer: BlockchainExplainer = {
  brand: { name: "Floripa Web3 · Ethereum", colors: { primary: "#61d8ff", accent: "#8c7bff", background: "#07111f" }, fonts: {}, safeArea: { top: 64, right: 80, bottom: 150, left: 80 }, logo: ethereumAssets[0] },
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
  opening: scene("opening", 0, 10),
  topics: [
    { id: "foundation", title: "Foundation", start: episodes.ep1.startSec, duration: 55.52, scenes: [scene("foundation", 0, 55.52)], coreConcept: "Ethereum as a programmable network", visualMoments: [{ id: "eth", title: "ETH", description: "Value and fees" }, { id: "gas", title: "Gas", description: "Metered computation" }, { id: "layers", title: "Two layers", description: "Execution and consensus" }], takeaway: "Ethereum combines shared execution with economic security.", bridge: "That shared machine starts with an account." },
    { id: "wallet", title: "Accounts", start: episodes.ep2.startSec, duration: 52.32, scenes: [scene("wallet", 0, 52.32)], coreConcept: "Keys authorize accounts", visualMoments: [{ id: "key", title: "Private key", description: "Secret authorization" }, { id: "address", title: "0x address", description: "Public identifier" }, { id: "nonce", title: "Nonce", description: "Replay protection" }], takeaway: "A wallet manages keys; the address represents the account.", bridge: "An account expresses intent through a signed transaction." },
    { id: "transactions", title: "Transactions", start: episodes.ep3.startSec, duration: 45, scenes: [scene("transactions", 0, 45)], coreConcept: "Deterministic EVM execution", visualMoments: [{ id: "request", title: "Request", description: "Value, data, gas" }, { id: "execute", title: "Execute", description: "Run the EVM" }, { id: "revert", title: "Revert", description: "Atomic state changes" }], takeaway: "The EVM turns signed requests into reproducible state transitions.", bridge: "Those transitions are ordered into blocks." },
    { id: "blocks", title: "Blocks and state", start: episodes.ep4.startSec, duration: 45, scenes: [scene("blocks", 0, 45)], coreConcept: "Blocks commit global state", visualMoments: [{ id: "state", title: "World state", description: "Accounts and storage" }, { id: "root", title: "State root", description: "Cryptographic commitment" }, { id: "history", title: "Block history", description: "Ordered transitions" }], takeaway: "Blocks record the history that produces Ethereum's shared state.", bridge: "Validators decide which history becomes canonical." },
    { id: "consensus", title: "Proof of Stake", start: episodes.ep4.startSec, duration: 45, scenes: [scene("consensus", 0, 45)], coreConcept: "Stake-weighted validator agreement", visualMoments: [{ id: "stake", title: "Stake", description: "Economic security" }, { id: "propose", title: "Propose", description: "Selected block proposer" }, { id: "attest", title: "Attest", description: "Validator votes" }], takeaway: "Proof of Stake coordinates the chain through bonded validators.", bridge: "With consensus in place, code can compose on top." },
    { id: "smart-contracts", title: "Smart contracts", start: episodes.ep5.startSec, duration: 60, scenes: [scene("contracts", 0, 60)], coreConcept: "Solidity compiled for the EVM", visualMoments: [{ id: "solidity", title: "Solidity", description: "Contract language" }, { id: "bytecode", title: "Bytecode", description: "EVM execution" }, { id: "usecases", title: "Use cases", description: "DeFi and digital assets" }], takeaway: "Solidity contracts make Ethereum a composable application platform.", bridge: "Accounts, execution, state, and consensus form one complete flow." },
  ],
  closing: scene("closing", episodes.closing.startSec, episodes.closing.endSec - episodes.closing.startSec),
};
