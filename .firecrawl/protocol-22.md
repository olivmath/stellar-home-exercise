Jump to...

Blog Article

# Protocol 22 upgrade guide

Author

Stellar Development Foundation

Publishing date

November 5, 2024

Protocol upgrade

Soroban

This guide is designed to help businesses and developers prepare for Protocol 22 with key dates, release information, a changelog, and more.

You can read all about what's included in Protocol 22 in the [announcement blog](https://stellar.org/blog/developers/announcing-protocol-22) and stay up to date on any and all Protocol 22-related announcements on the [Stellar Developer Discord](https://discord.gg/stellardev), where the ecosystem coordinates and shares information about the upgrade.

## Key dates

- **November 12:** Testnet upgrade. **Complete!**
- **November 19:** Stable builds of all software available. **Complete!**
- **December 5**: Mainnet upgrade vote. **Complete!**

## What do you need to do to prepare?

At this point, Protocol 22 is live on Testnet and Mainnet! If you are having issues with your Stellar integration, make sure to install up-to-date versions of any and all Stellar-related software you use!

### **If you use a Stellar SDK**

Upgrade to the latest version of relevant Stellar SDKs.

### **If you run Stellar infrastructure**

If you use Docker images, pull the latest from the Docker registry. If you build from source or our Debian packages, make sure to also update your stellar-core binary used by your Horizon or RPC instance to the latest.

If you don’t run your own infrastructure but still need access to a Horizon or RPC instance, you can use an infrastructure provider. Here are lists for [Horizon](https://developers.stellar.org/docs/data/horizon/horizon-providers) and [RPC](https://developers.stellar.org/docs/data/rpc/rpc-providers).

**A note on Horizon Transaction Meta Default Settings Change:** On December 18, Transaction Meta (tx meta) will no longer be returned by SDF’s hosted [Horizon](https://developers.stellar.org/docs/data/horizon/api-reference) API by default. Instead of using Horizon to access Transaction Meta (tx meta), developers should access it with the [RPC](https://developers.stellar.org/docs/data/rpc/api-reference/methods/getTransactions) or Stellar Core. Originally, this change was planned to coincide with the Protocol 22 upgrade, but we postponed it due to requests from the ecosystem for more time to prepare.

Operators hosting their own Horizon can emulate this behavior by configuring the SKIP\_TXMETA flag, should they also choose to stop serving Transaction Meta (tx meta). Please bear in mind that we expect the operational burden to be high should you choose to continue serving it.

**Context:** Transaction metas describe the changes made by a transaction to the state of the ledger. Historically, Horizon has exposed these as part of the transaction resource since its inception in 2015. Now it will be served by the RPC. These metas can grow quite significantly in size. For operators who maintain Horizon with a non-trivial retention window, this could be a significant operation burden.

**Notes**: RPC will continue to serve transaction metas for transactions within its 7 day retention window.

### **If you run a validator**

The Protocol 22 upgrade vote is complete! For posterity, here’s the command to arm your nodes for the upgrade:

`upgrades?mode=set&upgradetime=2024-12-05T17:00:00Z&protocolversion=22`

To view current network settings, see a history of protocol upgrades, and see pending proposals for future upgrades, take a look at [https://stellar.expert/explorer/public/protocol-history](https://stellar.expert/explorer/public/protocol-history)

### **Soroban RPC rebrand**

Soroban RPC has been officially renamed to Stellar RPC, as it is a fundamental building block for all of Stellar, not just Soroban. Operators should start installing stellar-rpc packages and images, as soroban-rpc packages and images are officially deprecated. Deprecated packages will cease to be published as of Protocol 23.

The Latest

## Protocol 22 releases

Below are up-to-date links to all available releases relevant to Protocol 22. In general, please make sure to check release notes for specific instructions and requirements, and unless otherwise indicated, opt for the “Latest Release.”

#### **Stellar infrastructure**

- [Stellar Core](https://github.com/stellar/stellar-core/releases)
- [Horizon](https://github.com/stellar/go/releases)
- [Soroban RPC](https://github.com/stellar/soroban-rpc/releases)

#### **SDKs**

- [JavaScript Base](https://github.com/stellar/js-stellar-base/releases)
- [JavaScript SDK](https://github.com/stellar/js-stellar-sdk/releases)
- [Go (horizonclient & txnbuild)](https://github.com/stellar/go/releases)
- [Java](https://github.com/stellar/java-stellar-sdk/releases)
- [Python](https://github.com/StellarCN/py-stellar-base/releases)
- [iOS](https://github.com/Soneso/stellar-ios-mac-sdk/releases)
- [PHP](https://github.com/Soneso/stellar-php-sdk/releases/)
- [C# .NET](https://github.com/Beans-BV/dotnet-stellar-sdk)
- [Flutter](https://github.com/Soneso/stellar_flutter_sdk/releases)
- [Elixir Stellar SDK](https://github.com/kommitters/stellar_sdk/releases)

Updates

## Changelog

- 12/05/2024 – Updated to reflect that the Mainnet upgrade is complete. Noted that the date for horizon.stellar.org change to tx meta was delayed until December 18.
- 11/12/2024 – Updated key dates to reflect that the Testnet upgrade is complete.
- 11/12/2024 – Added context and instructions related to the Soroban RPC rebrand.
- 11/07/2024 – Added instructions and context related to Horizon Transaction Meta Default Settings Default Behavior Change.

Next steps

## More for you to explore

October 9, 2024 • Simon Chow

### Hubble: Now Faster than Light

July 18, 2024 • Garand Tyson

### Introducing State Archival: The Solution to State Bloat on Stellar

August 16, 2024 at 8.00 AM PST • Molly Karcher

### Composable Data Platform: A New Way to Access Data on Stellar

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

[English](https://stellar.org/blog/developers/protocol-22-upgrade-guide) [Español](https://stellar.org/es/blog/desarrolladores/guia-de-actualizacion-del-protocolo-22)