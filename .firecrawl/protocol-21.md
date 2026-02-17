[Homepage](https://stellar.org/)

[Dev Docs](https://developers.stellar.org/)

Menu

# Protocol 21 upgrade guide

Author

Nicole Adair

Publishing date

Soroban, the smart contract platform on Stellar, launched on Mainnet following a successful validator vote on February 20, 2024. On June 18, 2024, Stellar public network validators voted to upgrade the network to Protocol 21, which activates five new [Core Advancement Proposals (CAPs)](https://github.com/stellar/stellar-protocol/tree/master/core) on Stellar Mainnet.

These five CAPs introduce some exciting new features, such as passkey signing support and an improvement to state archival (authored by community member, tdep), as well as a few overall cost improvements for smart contract transactions.

This guide is designed to help businesses and developers who have not done so already to upgrade to Protocol 21 now that it’s live on Mainnet. To ensure that your project, protocol, product or service is compatible with Protocol 21, please check that your Stellar-related software is up to date.

You can read all about what's included in Protocol 21 in the [announcement blog](https://stellar.org/blog/developers/announcing-protocol-21), and stay up to date on any and all Protocol 21-related announcements in the [#protocol-21 channel](https://discord.com/channels/897514728459468821/1153350849695846420) in the [Stellar Developer Discord](https://discord.gg/stellardev), where the ecosystem coordinates and shares information about the upgrade, or join the [dev-mailing list](https://groups.google.com/g/stellar-dev/c/-IOCsnqLLwI/m/h1TAg8A5CQAJ?pli=1).

## Key dates

- **May 14**: Testnet upgrade. **Complete!**
- **May 30**: Stable releases of Stellar Core, Horizon, RPC. **Complete!**
- **June 11**: Testnet reset. **Complete!**
- **June 18**: Mainnet upgrade vote. **Complete!**

## What do you need to do to prepare?

Now that the network has upgraded to Protocol 21, you must install up-to-date versions of any and all Stellar-related software you use to ensure continued compatibility with the network!

Also, be sure to re-upload your existing Wasms that were created in Protocol 20 to reduce the cost of invoking them and make further executions cheaper, especially as the cost of the re-upload is much lower than the cost of initial upload. To do this re-upload, use the `soroban contract install` CLI command.

Context: The semantics of CAP-0054 are important to note specifically for existing Wasms uploaded in Protocol 20. CAP-0054 introduces `ContractCodeCostInputs` that are written along with the Wasm entries uploaded starting in protocol 21 which will tighten the cost model for VM instantiation, but Wasm uploaded in Protocol 20 will be missing `ContractCodeCostInputs`. Due to the missing inputs, Protocol 20 code will not be able to take advantage of the tightened cost model until they are re-uploaded in Protocol 21, which will write the `ContractCodeCostInputs` to the existing Wasm entry.

**If you use Testnet**

The list of releases required to support Protocol 21 on Testnet has been updated on the [release page of the docs](https://developers.stellar.org/docs/reference/software-versions#protocol-21-preview-1-testnet-only-april-12-2024). At this point, stable releases of Stellar Core, Horizon, RPC, the JS SDK, several other SDKs, and the CLI are available. Make sure to install up-to-date versions of any and all Stellar-related software, using the following command:

```rust

```

**If you use a Stellar SDK**

You should be running the latest version of the SDK. We will update the releases section below to indicate when an SDK release with Protocol 21 support is available, so check back if an SDK you use isn’t listed yet.

**If you run Stellar infrastructure**

Upgrade to the latest release of Stellar Core and/or Horizon. If you use Docker images, pull the latest from the Docker registry. You should be on Stellar Core v21.0.0 or above.

**If you use the Soroban RPC**

If you run your own, make sure to upgrade your software! If you don’t, please be aware that the Stellar Development Foundation does not offer a free RPC instance for Mainnet, so you may need to choose an infrastructure provider to use. [Here’s a list](https://soroban.stellar.org/docs/reference/rpc-list).

**If you run a validator**

Be sure to upgrade Stellar Core to v21.0.0, if you have not done so already.

You should also make sure to set the `DEPRECATED_SQL_LEDGER_STATE` flag when you deploy the package.

Context: Stellar-core version 21.0 introduces a new config flag called `DEPRECATED_SQL_LEDGER_STATE`. If this flag is not set, stellar-core will not be able to start. **This flag must be set when a node upgrades to the stellar-core 21.0 package. This flag must be set when the package is deployed, not when the network actually upgrades to Protocol 21.**

This flag’s default setting, and the setting that most validator operators should use, is `DEPRECATED_SQL_LEDGER_STATE=false`. If `DEPRECATED_SQL_LEDGER_STATE=true`, the node may experience performance degradation and fall behind the rest of the network. `DEPRECATED_SQL_LEDGER_STATE` should only be set to true if you either:

1. Must run stellar-core with the “in-memory” mode flag.
2. Directly query data from stellar-core’s SQL backend, and the data being queried is not supported by BucketListDB (see the “Deprecated Features” listed in the [Upcoming Database Changes in Protocol 21](https://stellar.org/blog/developers/upcoming-database-changes-in-protocol-21) blog).

Operators running a captive-core as part of Horizon or RPC will have the flag set automatically, unless they are still using "in-memory" mode (configured via `CAPTIVE_CORE_USE_DB=false`), in which case they must set `CAPTIVE_CORE_USE_DB=true`. Note that this means "in-memory" mode is effectively disallowed by captive-cores starting in Protocol 21.

For additional information, context, and instructions related to the BucketListDB update, please read the [Upcoming Database Changes in Protocol 21](https://stellar.org/blog/developers/upcoming-database-changes-in-protocol-21) blog and join the [Stellar Dev Discord #validators channel](https://discord.com/channels/897514728459468821/948689654977294406).

To view current network settings, see a history of protocol upgrades, and see pending proposals for future upgrades, take a look at [https://stellar.expert/explorer/public/protocol-history](https://stellar.expert/explorer/public/protocol-history)

In the future, there will be more votes to adjust network settings based on network usage as well as subsequent protocol upgrades, so please make sure to stay up to date on the #validators channel on the [Stellar Dev Discord](https://discord.gg/stellardev). It’s crucial for validators to stay informed and participate in network governance!

If you are interested in learning more about Soroban network settings, see the docs: [https://github.com/stellar/stellar-core/blob/master/docs/software/soroban-settings.md](https://github.com/stellar/stellar-core/blob/master/docs/software/soroban-settings.md)

## Protocol 21 releases

Below are up-to-date links to all available releases relevant to Protocol 21. In general, please make sure to check release notes for specific instructions and requirements, and unless otherwise indicated, opt for the “Latest Release.”

#### **Stellar infrastructure**

- [Stellar Core](https://github.com/stellar/stellar-core/releases)
- [Horizon](https://github.com/stellar/go/releases)
- [Soroban RPC](https://github.com/stellar/soroban-rpc/releases)

#### **SDKs**

- [JavaScript Base](https://github.com/stellar/js-stellar-base/releases)
- [JavaScript SDK](https://github.com/stellar/js-stellar-sdk/releases) (now includes Soroban RPC client)
- [Go (horizonclient & txnbuild)](https://github.com/stellar/go/releases)
- [Java](https://github.com/stellar/java-stellar-sdk/releases)
- [Python](https://github.com/StellarCN/py-stellar-base/releases)
- [iOS](https://github.com/Soneso/stellar-ios-mac-sdk/releases)
- [PHP](https://github.com/Soneso/stellar-php-sdk/releases/)
- C# .NET
- [Flutter](https://github.com/Soneso/stellar_flutter_sdk/releases)
- [Elixir Stellar SDK](https://github.com/kommitters/stellar_sdk/releases)

Reminder: The [soroban-client](https://github.com/stellar/js-soroban-client/releases/tag/v1.0.0) was updated along with Protocol 20 JavaScript SDK releases, but will no longer be maintained. Users should use the [JavaScript SDK](https://github.com/stellar/js-stellar-sdk/releases) for their app needs, including communicating with the Soroban RPC, as future changes will only be made there. Please read the [Migration Guide](https://gist.github.com/Shaptic/5ce4f16d9cce7118f391fbde398c2f30) for how to upgrade to that package.

## Context

On February 20, 2024, validators voted to upgrade to Protocol 20, introducing Soroban smart contracts to Stellar’s public network. Since then, developers all over the world have been successfully deploying smart contracts to the Stellar Mainnet.

On June 18, validators voted to upgrade the network to Protocol 21, which brings five CAPs introducing new features, such as passkey signing support and an improvement to state archival, to Mainnet. To read more about each of the CAPs included in Protocol 21, see the [Protocol 21 announcement blog](https://stellar.org/blog/developers/announcing-protocol-21) post and the following links:

- [CAP-0051 Smart Contract Host Functionality: Secp256r1 Verification](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md)
- [CAP-0053 Separate host functions to extend the TTL for contract instance and contract code](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0053.md)
- [CAP-0054 Soroban refined VM instantiation cost model](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0054.md)
- [CAP-0055 Soroban streamlined linking](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0055.md)
- [CAP-0056 Soroban intra-transaction module caching](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0056.md)

To stay informed, ask questions, make suggestions, or share intel, make sure to join the [Stellar Dev Discord](https://discord.com/invite/stellardev) and check out the #protocol-21 channel, which is where the ecosystem is coordinating and sharing information about the upgrade.

## Changelog

06/18/2024 — Validators voted to upgrade the public network to Protocol 21, activating five new CAPs that bring exciting new features to Stellar Mainnet. Context, updates, and additional instructions were added following the Mainnet upgrade vote that occurred on June 18.

06/11/2024 — Testnet reset is complete.

05/30/2024 — Stellar Core, Horizon, RPC stable releases have been released! Instructions and context around stable releases have been added.

05/14/2024 — The Testnet successfully upgraded to Protocol 21 today. Key dates were updated to reflect this upgrade, and version numbers were added to Protocol 21 release links to reflect the minimum supported versions.

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

[English](https://stellar.org/blog/developers/protocol-21-upgrade-guide) [Español](https://stellar.org/es/blog/desarrolladores/guia-de-actualizacion-del-protocolo-21)