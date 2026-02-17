[Homepage](https://stellar.org/)

[Dev Docs](https://developers.stellar.org/)

Menu

Foundation

## Protocol upgrades

Stellar protocol upgrades are network-wide changes to consensus and core functionality. Validators must update their software to stay in sync. Upgrades may add new features, improve transaction performance, or strengthen network security.

[View network status](https://dashboard.stellar.org/)

The Latest

## Stability upgrade \| protocol 24

Protocol 24 is a [stability upgrade](https://stellar.org/blog/developers/addressing-state-archival-inconsistencies-protocol-upgrade-vote-next-week) necessary to fix a bug in the state archival feature in Stellar Core. Note that the timeline for the upgrade is much more compressed than normal.

[Upgrade Guide](https://stellar.org/blog/developers/protocol-24-upgrade-guide)

Protocol 23

## Whisk

### CAP-0062

Allows the network to evict persistent entries from the live state BucketList to a separate BucketList containing archival state

[(opens in a new tab)](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0062.md)

### CAP-0063

Defines a new structure for transaction sets that allows for applying Smart Contract transactions with multiple threads while maintaining bounded application time

[(opens in a new tab)](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0063.md)

### CAP-0065

Maintain a fully-populated cache of all live WASM modules -- parsed, validated and translated -- at all times, across all ledgers, eliminating parsing and validation costs from the WASM VM instantiation process

[(opens in a new tab)](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0065.md)

### CAP-0066

New resource type for Soroban reads, distinguishing between in-memory and disk reads and automatic restoration for archived entries via InvokeHostFunction0p

[(opens in a new tab)](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0066.md)

### CAP-0067

Emit transfer, mint, burnt, clawback, fee, and set\_authorized events in Classic in the same format as Soroban so that the movement of assets and trustline updates can be tracked using a single stream of data

[(opens in a new tab)](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0067.md)

### CAP-0068

Soroban host function for getting the executable corresponding to an Address

[(opens in a new tab)](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0068.md)

### CAP-0069

Soroban host functions for conversion between String and Bytes types

[(opens in a new tab)](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0069.md)

### CAP-0070

Ledger configuration settings allowing the Stellar network to dynamically adjust ledger close times, nomination timeouts, and ballot timeouts to facilitate controlled, incremental improvements to block time performance

[(opens in a new tab)](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0070.md)

CAP-0062

## Live state prioritization

This proposal separates archived state and live state into two separate DBs. While these DBs are still both persisted on disk by validators, optimizing live state access is significantly easier. In particular, live state can be entirely cached in memory, removing disk reads from the Soroban transaction execution path, greatly increasing read limits and throughput.

Left shows Tx processing prior to CAP-0062, and right shows the efficiency of a validator processing a transaction currently.

[View Repo](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0062.md)

CAP-0063

## Parallelism-friendly transaction scheduling

Utilizing the idle cores for applying the transactions provides a straightforward way of increasing the number of transactions that may be included into a single ledger block without compromising the time for closing that ledger. This CAP aims to solve this issue and allow for parallelization that has a guaranteed upper bound for the execution time of transaction sets (given at least the minimum specified number of physical threads supported).

Each stage is run sequentially to handle read-write conflicts.

[View Repo](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0063.md)

## Previous upgrades

- **Protocol 23** _9/3/25 -_ [CAP-0062](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0062.md) (Network evicts persistent entries to archive), [CAP-0063](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0063.md) (Parallel smart contract transaction processing), [CAP-0065](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0065.md) (Cache parsed WASM modules permanently), [CAP-0066](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0066.md) (New Soroban read resource types), [CAP-0067](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0067.md) (Standardize Classic and Soroban events), [CAP-0068](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0068.md) (Get executable from Soroban address), [CAP-0069](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0069.md) (Convert String and Bytes types), [CAP-0070](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0070.md) (Dynamic ledger timing configuration settings)
- **Protocol 22** _12/5/2024_\- [CAP-0058](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0058.md) (Introduce 'constructor' feature for Soroban smart contracts), [CAP-0059](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0059.md) (BLS12-381 host functions).
- **Protocol 21** _6/18/2024_\- [CAP-0051](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md) (Support secp256r1 verification), [CAP-0053](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0053.md) (Allow extending the Time To Live (TTL)), [CAP-0054](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0054.md) (Refining the Soroban cost model used for VM instantiation), [CAP-0055](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0055.md) (Lower total costs by linking fewer host functions during VM instantiation), [CAP-0056](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0056.md) (Lower total costs by caching parsed Wasm modules)
- **Protocol 20** _03-19-2024_\- [CAP-0046-01](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-01.md) (Soroban: Wasm smart contracts for Stellar), [CAP-0046-02](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-02.md) (Smart contract structure and creation on Stellar.), [CAP-0046-03](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-03.md) (Host functions for Stellar Wasm contracts.), [CAP-0046-05](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-05.md) (Smart contract data storage and interaction.), [CAP-0046-06](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-06.md) (Allow contracts to interoperate with Stellar assets.), [CAP-0046-07](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-07.md) (Smart contract fee mechanism.), [CAP-0046-08](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-08.md) (Contract metadata writing for downstream systems.), [CAP-0046-09](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-09.md) (Network-wide configuration storage and upgrades.), [CAP-0046-10](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-10.md) (Smart contract resource metering framework.), [CAP-0046-11](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-11.md) (Smart contract authorization framework.), [CAP-0046-12](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0046-12.md) (Soroban state archival interface.)
- **Protocol 19** _6-8-2022_\- [CAP-0021](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0021.md) (Generalized transaction conditions and timelocks.), [CAP-0040](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0040.md) (Shared transaction signing for contracts.)
- **Protocol 18** _11-3-2021_\- [CAP-0038](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0038.md) (Automated market marker liquidity.)
- **Protocol 17** _6-1-2021_\- [CAP-0035](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0035.md) (Asset clawback for regulatroy compliance.)
- **Protocol 16** _4-10-2021_\- [CAP- 0029](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0029.md) (Issuer trustline authorization semantics.)
- **Protocol 15** _11-23-2020_\- [CAP-0023](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0023.md) (Separate payment sending and receiving.), [CAP-0033](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0033.md) (Cross-account reserve payments), [CAP-0034](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0034.md) (Nomination protocol close time selection)
- **Protocol 13** _6-18-2020_\- [CAP-0015](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0015.md) (Fee-bump transactions for arbitrary accounts), [CAP-0018](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0018.md) (Partial trustline authorization for issuers.), [CAP-0019](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0019.md) (Extensible transaction envelope union.), [CAP-0027](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0027.md) (Multiplexed accounts with memo IDs.), [CAP-0028](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0028.md) (Pre-auth signer removal on application.), [CAP-0030](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0030.md) (Remove unnecessary asset issuer errors.)
- **Protocol 12** _10-10-2019_\- [CAP-0024](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0024.md) (PathPayment with fixed send amount.), [CAP-0025](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0025.md) (Bucket list simplification removing shadows.), [CAP-0026](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0026.md) (Disables the inflation mechanism.)
- **Protocol 11** _6-10-2019_\- [CAP-0005](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0005.md) (Network throttling and fee rationalization), [CAP-0006](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0006.md) (ManageBuyOffer operation for buying asset.), [CAP-0020](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0020.md) (Bucket entry type extensions.)
- **Protocol 10** _2-8-2018_\- [CAP-0001](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0001.md) (Bump sequence operation.), [CAP-0002](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0002.md) (Consistent signature verification for contracts), [CAP-0003](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0003.md) (Asset-backed offers execution guarantee.), [CAP-0004](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0004.md) (Offer crossing algorithm improvements.)

[Homepage](https://stellar.org/)

### ABOUT US

- [Stellar Development Foundation](https://stellar.org/foundation)
- [Team](https://stellar.org/foundation/team)
- [Careers](https://stellar.org/foundation/careers)
- [Roadmap](https://stellar.org/foundation/roadmap)
- [Brand Resource Hub](https://stellar.org/brand-resources)
- [Press and Reports](https://stellar.org/press)
- [Blog](https://stellar.org/blog)

### PRODUCTS AND SERVICES

- [Use Cases](https://stellar.org/use-cases)
- [Case Studies](https://stellar.org/case-studies)
- [Products and Tools](https://stellar.org/products-and-tools)

### THE STELLAR NETWORK

- [Anchor Directory](https://anchors.stellar.org/)
- [Ecosystem Projects](https://stellar.org/ecosystem)
- [Learn](https://stellar.org/learn)

### DEVELOPERS

- [Stellar Network Docs](https://developers.stellar.org/docs)
- [API Reference](https://developers.stellar.org/api)
- [Dev Hub](https://stellar.org/developers)
- [Bug Bounty](https://stellar.org/grants-and-funding/bug-bounty)

### CONNECT

- [Community](https://stellar.org/community)
- [Code of Conduct](https://stellar.org/foundation/code-of-conduct)
- [FAQ](https://stellar.org/connect)

Follow us:

[footer-social-link-0 (opens in a new tab)](https://discord.com/invite/zVYdY3ktTn)[footer-social-link-1 (opens in a new tab)](https://www.linkedin.com/company/stellar-development-foundation/)[footer-social-link-2 (opens in a new tab)](https://twitter.com/StellarOrg)[footer-social-link-3 (opens in a new tab)](https://www.youtube.com/@StellarDevelopmentFoundation)

[Brand Policy](https://stellar.org/brand-policy) [Privacy Policy](https://stellar.org/privacy-policy) [Terms of Service](https://stellar.org/terms-of-service) Cookie Settings

© 2026 SDF

[English](https://stellar.org/protocol-upgrades) [Español](https://stellar.org/es/actualizaciones-del-protocolo)