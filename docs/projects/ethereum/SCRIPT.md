### Episode 1 — Foundation, Purpose, and Network Economics

Welcome to the Ethereum Speed Run.

In five minutes, you will understand Ethereum end-to-end — from creating a wallet to executing smart contracts on the EVM.

---

**Ethereum** was proposed in 2013 by **Vitalik Buterin** and launched in 2015.

Its purpose is broader than digital money:

A global, programmable settlement layer.

On Ethereum, developers can create applications, financial protocols, tokens, NFTs, DAOs, and digital ownership systems without asking permission from a central platform.

The native asset is **ETH**.

ETH has three main functions:

- Pay for network execution
- Secure the network through staking
- Serve as the economic asset of the ecosystem

Every transaction consumes **gas**.

Gas measures computational work.

The user pays:

**Gas Used × Gas Price**

Part of the fee is burned through EIP-1559.

The remaining priority fee can go to the validator who includes the transaction.

There are no miners anymore.

Since The Merge in 2022, Ethereum uses Proof of Stake.

But how does a user enter this network?

Next episode: Wallets.

---

### Episode 2 — Wallets and Accounts

To use Ethereum, you need a cryptographic identity.

It starts with a randomly generated private key.

The flow is:

1. A wallet generates a private key.
2. The private key derives a public key.
3. The public key is hashed.
4. The last 20 bytes become an Ethereum address.

That is why addresses start with:

`0x`

The private key signs.

The address identifies.

Ethereum traditionally uses the elliptic curve **secp256k1** — the same curve used by Bitcoin.

But Ethereum has two main account types:

- EOA — Externally Owned Account
- Contract Account

An EOA is controlled by a private key.

A Contract Account is controlled by code deployed on-chain.

Your wallet, such as MetaMask, usually manages an EOA.

This account can hold ETH, tokens, NFTs, and send transactions.

But an address alone does nothing.

To change Ethereum’s state, you need a transaction.

Next episode: Transactions.

---

### Episode 3 — Transactions, Gas, and State

An Ethereum transaction is a signed instruction that changes the network state.

Its lifecycle is:

1. You build a transaction.
2. Sign it with your private key.
3. Broadcast it to the peer-to-peer network.
4. It enters the mempool.
5. A validator includes it in a block.
6. Every node re-executes and verifies the result.

A transaction can:

- Send ETH
- Transfer an ERC-20 token
- Mint an NFT
- Deploy a contract
- Call a function in an existing contract

A typical transaction includes:

- `to`: destination address
- `value`: ETH being sent
- `data`: function call and parameters
- `nonce`: transaction sequence number
- `gasLimit`: maximum gas allowed
- `maxFeePerGas`: maximum fee accepted

The `nonce` prevents replay and establishes transaction order for each account.

Gas prevents infinite loops and spam.

If execution runs out of gas, the state changes revert.

But the gas spent is still paid.

Now, who chooses which transactions enter the next block?

Next episode: Consensus.

---

### Episode 4 — Blocks, Validators, and Proof of Stake

Ethereum creates a new block approximately every 12 seconds.

The network is organized into two connected layers:

- The Execution Layer: validates transactions and runs the EVM
- The Consensus Layer: coordinates validators and finality

Validators stake ETH to help secure the network.

A validator is selected to propose a block.

Other validators verify it and submit attestations.

Ethereum uses a Proof of Stake system called **Gasper**:

- Casper FFG provides finality
- LMD GHOST helps choose the canonical chain

Time is divided into slots.

32 slots form an epoch.

After enough validator attestations, blocks become finalized.

Finalized means reversing them would require an economically catastrophic attack against the network.

Validators who behave honestly receive rewards.

Validators who act maliciously, or remain offline for too long, can lose part of their stake through slashing or penalties.

Consensus decides the valid order of blocks.

But execution is where Ethereum becomes programmable.

Final episode: EVM and Smart Contracts.

---

### Episode 5 — EVM, Smart Contracts, and Scaling

The **Ethereum Virtual Machine**, or **EVM**, is the global computation environment of Ethereum.

Every Ethereum node executes the same contract code and reaches the same result.

This is what makes Ethereum a decentralized world computer.

Smart contracts are programs stored at an Ethereum address.

They contain:

- Code
- Persistent state
- Functions
- Rules that execute automatically

Most contracts are written in **Solidity**.

A simple example is the **Flipper** contract. It stores a boolean value, exposes a function that inverts it, and exposes a read-only function that returns the current state:

```solidity
contract Flipper {
    bool private value;

    constructor(bool initialValue) {
        value = initialValue;
    }

    function flip() external {
        value = !value;
    }

    function get() external view returns (bool) {
        return value;
    }
}
```

When deployed with `true`, `get()` returns `true`. Calling `flip()` changes the stored value to `false`; calling it again changes it back to `true`.

`get()` only reads state, so it can be called without sending a transaction. Calling `flip()` changes Ethereum’s global state — and requires gas.

This programming model enabled:

- ERC-20 tokens
- NFTs through ERC-721
- DeFi protocols
- Stablecoins
- Decentralized exchanges
- DAOs
- On-chain games and identity systems

Ethereum Layer 1 prioritizes security and decentralization.

For lower fees and higher throughput, activity increasingly happens on Layer 2 networks such as Optimism, Arbitrum, Base, and zk-rollups.

These layers execute transactions more cheaply, then anchor security and data back to Ethereum.

With Pectra, Ethereum also expanded account-abstraction capabilities, allowing regular accounts to temporarily use smart-contract logic. [ethereum.org](https://ethereum.org/roadmap/pectra/?utm_source=chatgpt.com)

---

### Closing

Now you understand Ethereum end-to-end:

- Cryptographic wallets and accounts
- Signed transactions and gas
- Blocks and Proof of Stake
- Validators and finality
- EVM execution
- Smart contracts and Layer 2 scaling

Ethereum is not only a cryptocurrency network.

It is a programmable settlement layer for digital ownership, money, coordination, and applications.

I am Lucas Bispo de Oliveira.

See you on-chain.
