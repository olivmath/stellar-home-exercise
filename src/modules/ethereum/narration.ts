import type { NarrationMarks } from "../../framework/types";

const mark = (id: string, start: number, end: number, text: string) => ({ id: `ethereum-${id}`, start, end, text });

export const ethereumNarration: NarrationMarks = {
  opening: [mark("opening", 0, 5, "Welcome to the Ethereum Speed Run")],
  topics: {
    foundation: [mark("foundation", 0, 55, "Ethereum is a global, programmable settlement network")],
    wallet: [mark("wallet", 57.68, 110, "An account is controlled by a private key and represented by an address")],
    transactions: [mark("transactions", 110.45, 153.51, "A signed EVM transaction changes state by calling an account or contract")],
    blocks: [mark("blocks", 153.51, 180, "Blocks batch transactions into an ordered history while the state is updated")],
    consensus: [mark("consensus", 180, 212.15, "Proof of Stake uses validators to propose and attest to blocks")],
    "smart-contracts": [mark("smart-contracts", 213.87, 277.05, "Solidity compiles to EVM bytecode, making contracts composable")],
  },
  closing: [mark("closing", 277.05, 303.77, "Ethereum connects accounts, execution, consensus, and applications")],
};
