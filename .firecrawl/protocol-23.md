[Homepage](https://stellar.org/)

[Dev Docs](https://developers.stellar.org/)

Menu

Developers

# Protocol 23 upgrade guide

Author

Stellar Development Foundation

Publishing date

This guide is designed to help businesses and developers prepare for Protocol 23 with key dates, release information, a changelog, and more.

You can read all about what's included in Protocol 23 in the [announcement blog](https://stellar.org/blog/developers/announcing-protocol-23) and stay up to date on any and all Protocol 23-related announcements on the [Stellar Developer Discord](https://discord.gg/stellardev), where the ecosystem coordinates and shares information about the upgrade.

## Key dates

- **July 17:** Testnet upgrade. **Complete!**
- **August 14:** Testnet reset. **Complete!**
- **August 14:** Stable releases available. **Complete!**
- **September 3**: Mainnet upgrade vote. **Complete!**

## What do you need to do to prepare?

The August 14 Testnet reset will clear all Testnet ledger entries including account, asset, and contract data, so please be prepared to recreate any you need to persist! For tips and more info, see the [Testnet docs](https://developers.stellar.org/docs/learn/fundamentals/networks#testnet-and-futurenet-data-reset).

Also, after the August 14 Testnet reset, you will need to upgrade to new versions of Stellar-related software including Stellar Core, RPC, Horizon, and Stellar SDKs as soon as possible to ensure Testnet compatibility _even if you installed new versions prior to the July 17 Testnet upgrade_.

Apologies for the inconvenience, and for the short notice: normally, we don't reset Testnet as part of a protocol upgrade, but this time it's necessary due to some updates to Stellar Core. The August 14 Testnet reset will replace the previously scheduled Q3 Testnet reset.

**If you use a Stellar SDK**

For your Testnet integration, upgrade to the latest version of the relevant Stellar SDK on August 14.

For your Mainnet integration, upgrade to the latest version of relevant Stellar SDKs before September 3.

We will update the releases section below to indicate when an SDK release with Protocol 23 support is available, so check back if an SDK you use isn’t listed yet.

**If you run Stellar infrastructure**

If you use Docker images, pull the Protocol 23 builds from the Docker registry. If you build from source or our Debian packages, make sure to also update your stellar-core, stellar-horizon, and stellar-rpc binaries to the Protocol 23 builds.

If you don’t run your own infrastructure but still need access to a Horizon or RPC instance, you can use an infrastructure provider. [Here are lists for Horizon and RPC](https://developers.stellar.org/docs/data/apis/api-providers).

**If you run a validator**

The Protocol 23 upgrade vote is scheduled for September 3, 2025 at 1700 UTC. You should arm your validator with the following command:

`upgrades?mode=set&upgradetime=2025-09-03T17:00:00Z&protocolversion=23`

## Protocol 23 releases

Below are up-to-date links to all available releases relevant to Protocol 23. In general, please make sure to check release notes for specific instructions and requirements, and unless otherwise indicated, opt for the “Latest Release.”

#### **Stellar infrastructure**

- [Stellar Core](https://github.com/stellar/stellar-core/releases)
- [Horizon](https://github.com/stellar/go/releases)
- Stellar [RPC](https://github.com/stellar/stellar-rpc/releases)

#### **SDKs**

- [Rust SDK](https://github.com/stellar/rs-soroban-sdk/releases)
- [JavaScript Base](https://github.com/stellar/js-stellar-base/releases)
- [JavaScript SDK](https://github.com/stellar/js-stellar-sdk/releases)
- Go SDK
  - [horizonclient & txnbuild](https://github.com/stellar/go/releases)
  - [rpcclient](https://github.com/stellar/stellar-rpc/releases)
- [Java](https://github.com/stellar/java-stellar-sdk/releases)
- [Python](https://github.com/StellarCN/py-stellar-base/releases)
- [iOS](https://github.com/Soneso/stellar-ios-mac-sdk/releases)
- [PHP](https://github.com/Soneso/stellar-php-sdk/releases/)
- [C# .NET](https://github.com/Beans-BV/dotnet-stellar-sdk)
- [Flutter](https://github.com/Soneso/stellar_flutter_sdk/releases)
- [Elixir Stellar SDK](https://github.com/kommitters/stellar_sdk/releases)

## Breaking changes

Testnet is running Protocol 23, which means that old versions of Stellar Core won’t work at all, and old versions of Horizon, Stellar RPC, Galexie and the Stellar SDKs will likely stop when they encounter something they don’t recognize.

That said, when the Testnet resets August 14, you will need to install stable releases of all Stellar-related software to ensure compatibility with a new Stellar Core release. In addition to general compatibility issues, here are a few other changes to be aware of:

**Stellar RPC rebrand**

Soroban RPC was officially renamed to Stellar RPC in Protocol 22. While it has continued to be published under both names, starting in Protocol 23 soroban-rpc images and packages will no longer be available.

**XDR**

- There have been **_significant_** **_breaking changes_** to the XDR in Protocol 23, the largest of which is the introduction of a new transaction meta structure, TransactionMetaV4, which replaces TransactionMetaV3. Any application that reads raw transaction meta from Stellar Core, Horizon, Stellar RPC, Galexie, etc will be affected. **This may include dapps, indexers, exchanges, issuers, and wallets**.
- Protocol 23 unifies event streams between Classic operations and Soroban contracts. Key changes include removing admin topics from mint, clawback, and set\_authorized events, adding new fee events, and having SAC emit mint/burn events (instead of transfer) when the issuer is involved. Transfer events now support map-based data fields for memo information alongside integers. Classic operations will emit standardized events matching Soroban format for consistent asset movement tracking.
- There will also be a config option that will modify pre-v23 SAC events to follow the admin and issuer related changes mentioned above.
- See [CAP-67](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0067.md) and [Stellar XDR](https://github.com/stellar/stellar-xdr/blob/4b7a2ef7931ab2ca2499be68d849f38190b443ca/Stellar-ledger.x#L508) for more information about the TransactionMetaV4 format.

**RPC**

- The `getLedgerEntry`endpoint has been removed
- The `pagingToken` field of `getEvents` results has been removed
- The `snake_case`d fields of `getVersionInfo` have been removed (`commit_hash`, etc.)
- Diagnostic events are no longer returned by `getEvents`
- The `inSuccessfulContractCall`field of `getEvents` is now deprecated and will be removed in Protocol 24

**Horizon**

- Release requires a state rebuild and a database [migration](https://github.com/stellar/go/pull/5745). See the [Scaling](https://developers.stellar.org/docs/data/apis/horizon/admin-guide/scaling) documentation for more information on how to prepare for potential downtime.
- The following configuration flags have been removed
  - `CAPTIVE_CORE_USE_DB`
  - `DEPRECATED_SQL_LEDGER_STATE`
- The `errorResultXdr` field from the response of the async transaction submission endpoint has been removed
- The `num_archived_contracts`and `archived_contracts_amount` fields from the `/assets` response have been removed

**SDKs**

- **_horizonclient:_** Fields removed from the Horizon API (referenced above) have been removed removed
- **_js-stellar-sdk_**: Node >= 20 is now required

#### **Changelog**

September 3, 2025: Mainnet upgraded to Whisk (Protocol 23)

August 26, 2025: Changed JS SDK Node requirement and breaking changes for RPC has been updated

August 14, 2025: Stable build releases and Testnet reset completed

August 6, 2025: Added to XDR breaking changes

August 4, 2025: Announced Testnet reset August 14, stable releases August 14, and new Mainnet upgrade date of September 3.

July 31, 2025: Updated dates of stable build release and Mainnet vote

July 25, 2025: Updated validator instructions

July 22, 2025: Added the Breaking Changes section

July 17, 2025: Updated timeline to reflect the testnet upgrade, and added Rust SDK to releases.

June 20, 2025: Updated timeline to reflect extra days required for Stellar Core implementation, which pushed Testnet and Mainnet dates back.

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

[English](https://stellar.org/blog/developers/protocol-23-upgrade-guide) [Español](https://stellar.org/es/blog/desarrolladores/guia-de-actualizacion-del-protocolo-23)