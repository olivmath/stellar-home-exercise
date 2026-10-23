export type EthereumScript = { source: "src/modules/ethereum/script.ts"; narration: string; timing: { before: string; after: string } };

export const ethereumScript: EthereumScript = {
  source: "src/modules/ethereum/script.ts",
  narration: `### Episode 1 — Foundation and Network Economics

Welcome to the Ethereum Speed Run. In five minutes, you will understand the flow from an account to a smart contract.

Ethereum is a public, programmable blockchain. Its native asset is ETH, used to pay execution fees and secure the network. Gas measures the computation and storage a transaction asks the EVM to perform. Fees are paid by the sender, while part of the base fee is burned and a priority fee rewards the validator.

Ethereum does not have a central operator. It has an open execution layer, a shared state, and a consensus layer that coordinates validators. The goal is not only to transfer value, but to make verifiable programs available to anyone.

Next episode: accounts.

### Episode 2 — Accounts and Addresses

Ethereum has two account types. Externally owned accounts are controlled by private keys. Contract accounts are controlled by code deployed to the chain.

An externally owned account signs with a private key. The public key is hashed to derive the 20-byte address, commonly shown as a hexadecimal string beginning with 0x. The private key never needs to be published; the signature proves authorization.

Every account has a balance and a nonce. The nonce prevents replay and gives transactions from an account a deterministic order. A wallet is software that manages keys and helps construct requests. It is not the account itself.

Next episode: EVM transactions.

### Episode 3 — EVM Transactions

A transaction is a signed request to change Ethereum state. It can send ETH, deploy contract bytecode, or call a function on an existing contract.

The request includes a destination, value, data, gas limit, fee parameters, and the sender nonce. The network checks the signature and balance, then the EVM executes the transaction deterministically. Every full node can reproduce the result.

Execution either completes and produces logs and a state change, or reverts its changes. Gas consumed by a reverted call is still paid: computation was performed even when the requested state transition did not persist.

Next episode: blocks and state.

### Episode 4 — Blocks and Global State

Ethereum maintains a world state: account balances, nonces, contract code, and contract storage. Transactions are ordered into blocks, and each block commits to the resulting state with cryptographic roots.

A block contains a header, transactions, and execution-related data. Nodes verify the parent, execute the transactions in order, and check that the proposed state root matches their own result. This is why the same contract call has a shared, auditable outcome.

Blocks are not the state itself. They are the ordered history of transitions that produced the current state.

Next episode: Proof of Stake.

### Episode 5 — Proof of Stake

Ethereum uses Proof of Stake. Validators deposit ETH, propose blocks when selected, and attest to blocks they consider valid. The consensus layer organizes slots and epochs; the execution layer runs transactions and produces the state transition.

Honest participation earns protocol rewards and fees. Dishonest or conflicting behavior can be penalized, including by slashing a validator's stake. Finality emerges when enough stake has attested across the checkpoints.

Proof of Stake replaces energy-intensive mining with economic accountability. It does not remove the need for independent nodes: anyone can verify the chain and execute the rules.

Next episode: Solidity and smart contracts.

### Episode 6 — Solidity, the EVM, and Use Cases

Smart contracts are programs stored at Ethereum addresses. Solidity is a high-level language commonly used to write them. The compiler turns Solidity into EVM bytecode, and the EVM executes that bytecode identically across nodes.

A contract can hold assets, enforce rules, emit events, and call other contracts. It cannot access arbitrary off-chain data by itself, so applications use oracles when external facts are required.

This composability powers decentralized exchanges, stablecoins, lending, NFTs, games, DAOs, and many other applications. The trade-off is that code is public and state is scarce: security review, gas efficiency, and careful upgrade design matter.

### Closing

Ethereum connects cryptographic accounts, signed EVM transactions, ordered blocks, shared state, Proof of Stake, and Solidity contracts. That stack turns a blockchain into a general-purpose coordination layer.

This is Floripa Web3. See you on-chain.`,
  timing: { before: "04:55:09", after: "04:57:02" },
};
