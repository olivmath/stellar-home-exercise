import type { NarrationMarks } from "../../framework/types";
import { ethereumTimeline } from "./timeline";

const mark = (id: string, start: number, end: number, text: string) => ({ id: `ethereum-${id}`, start, end, text });

export const ethereumNarration: NarrationMarks = {
  opening: [mark("opening", 0, 8, "Welcome to the Ethereum Speed Run")],
  topics: {
    foundation: [mark("foundation", ethereumTimeline.foundation.start, ethereumTimeline.foundation.start + ethereumTimeline.foundation.duration, "Ethereum is a global programmable settlement layer")],
    wallet: [mark("wallet", ethereumTimeline.wallet.start, ethereumTimeline.wallet.start + ethereumTimeline.wallet.duration, "Private keys authorize accounts and addresses identify them")],
    transactions: [mark("transactions", ethereumTimeline.transactions.start, ethereumTimeline.transactions.start + ethereumTimeline.transactions.duration, "Signed transactions change Ethereum state")],
    consensus: [mark("consensus", ethereumTimeline.consensus.start, ethereumTimeline.consensus.start + ethereumTimeline.consensus.duration, "Proof of Stake validators propose and attest to blocks")],
    "smart-contracts": [mark("smart-contracts", ethereumTimeline["smart-contracts"].start, ethereumTimeline["smart-contracts"].start + ethereumTimeline["smart-contracts"].duration, "Solidity compiles to EVM execution and Layer 2 scaling")],
  },
  closing: [mark("closing", ethereumTimeline.closing.start, ethereumTimeline.closing.start + ethereumTimeline.closing.duration, "Ethereum connects accounts, execution, consensus, applications, and scaling")],
};
