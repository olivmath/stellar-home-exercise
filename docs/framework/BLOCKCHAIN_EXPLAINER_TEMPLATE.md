# Blockchain Explainer Template

`BlockchainExplainer` is the framework contract for a 5–6 minute Floripa Web3 explainer.

Every module supplies an opening, six topics in this order, and a closing:

1. Foundation/history
2. Wallet
3. Transactions
4. Blocks/ledger
5. Consensus
6. Smart contracts

Each topic is 45–60 seconds and declares one `coreConcept`, 3–5 `visualMoments`, a `takeaway`, and a `bridge`. Network-specific facts, names, logos, protocol terms, assets, and narration belong in `src/modules/<network>`, never in framework components.

Use `validateExplainer` during module construction. The template renderer receives scene components separately, so a new blockchain can reuse the contract while replacing its content and visuals.
