### Episode 1 — Foundation, Purpose, and Network Economics

Welcome to the Stellar Speed Run.

In five minutes, you will understand the complete Stellar flow — from creating an account to smart contracts with zk-proofs.

---

**Stellar** was created in 2014 by **Jed McCaleb**, co-founder of **Ripple** and **Mt. Gox**, together with **Joyce Kim**.

Today, development is led by the **Stellar Development Foundation**, a non-profit organization.

The goal is clear: financial inclusion and efficient global settlement.

In the network economy, the sender pays a minimal fee in XLM — only for spam prevention.

There are no miners. There are validators.

And they do not receive block rewards.

The incentive is utility and interoperability, not inflation.

There is no automatic on-chain governance.

Changes are proposed via CAPs (Core Advancement Proposals) and activated through validator consensus.

With that in mind, the question arises:

How does a user enter this network?

Next episode: Wallets.

---

### Episode 2 — Wallet: Cryptographic Identity

To participate in Stellar, you need an identity.

It all starts with 32 random bytes, also known as a seed.

The flow is deterministic:

1. The seed is generated.
2. The Secret Key is derived — starts with “S”.
3. The Public Key is derived — starts with “G”.
4. Both are encoded in Base32 with checksum (StrKey encoding).

The Secret signs.
The Public identifies.

Unlike Bitcoin (which uses secp256k1), Stellar uses an elliptic curve called Ed25519.

It is more efficient, with smaller signatures and high security.

The network verifies transaction authenticity using these signatures.

Now you have identity.

But what exactly do you send to the network?

Next episode: Transactions.

---

### Episode 3 — Transactions and Operations

In Stellar, a transaction is an envelope of intentions.

And its lifecycle is:

1. You build the transaction with operations and parameters.
2. Sign with your Secret.
3. Submit to Horizon, the network API.
4. Horizon forwards to Stellar Core.
5. Stellar Core validates and confirms it.

A transaction can contain up to 100 operations.

All operations are atomic.
If one fails, all fail.

There are 26 operation types. The main ones:

* Payment: for asset transfers
* Change Trust: to receive and issue new tokens
* Invoke Host Function: to interact with smart contracts

A transaction is the container.
Operations are the intentions.

But who decides this is valid?

Next episode: Consensus.

---

### Episode 4 — Ledgers and Consensus

In Stellar, there are no blocks. There are Ledgers.

And they close on average every 5 seconds.

The process:

1. Validators collect transactions
2. Propose a new ledger
3. Execute the consensus protocol

The ledger closes when at least 2/3 of the relevant set agrees.

Finality is instant and deterministic — no forks.

Consensus is neither Proof of Work nor Proof of Stake.

Stellar uses SCP (Stellar Consensus Protocol) created by **David Mazières**, professor at **Stanford University**.

It is a model called Federated Byzantine Agreement.

Where each node chooses its list of trusted nodes (quorum slices).

Consensus happens when the overlap of these sets reaches more than 2/3 of validators.

Result: decentralization, security, and scalability.

Now that we understand execution and consensus, what’s left is the programmability layer.

Final episode: Soroban.

---

### Episode 5 — Soroban, WASM, and zk-Proofs

In 2024, Stellar activated Soroban — its smart contract platform.

Soroban runs on a WASM virtual machine, with primary development in Rust.

The architecture was designed by Graydon Hoare, the creator of the Rust language.

The gas model charges for CPU and storage.

Here there is an important innovation: TTL — Time To Live.

Stored data must be renewed by paying “rent”. Otherwise, it can be archived.

This prevents indefinite network growth like what happens with **Ethereum** and others.

A simple example is the Flipper contract:

It stores a boolean.

Which we can query through the `get()` function.

And flip the state using the `flip()` function.

Since Protocol version 21, Stellar has added native support for new cryptography:

* secp256r1 (P-256)
* BLS12-381
* BN254
* Poseidon Hash Functions

This enables:

* Verifying zk-SNARK proofs
* Better UX through passkeys

All natively at Layer 1.

Result: scalability and privacy without external layers.

---

### Closing

Now you understand Stellar end-to-end:

* Cryptographic identities
* Atomic transactions
* Federated consensus
* Secure programmability
* Efficient state storage
* Privacy support

Stellar is a global settlement protocol — accessible, programmable, and privacy-enabled.

I am Lucas Bispo de Oliveira.

See you on-chain.
