[Homepage](https://stellar.org/)

- About Stellar
- Real Use Cases
- Start Building
- Community

The Stellar network is an open-source blockchain used for a variety of payment and remittance applications. Learn about the non-profit Stellar Development Foundation and the fundamentals of how the network works.

### Learn Stellar

- [Intro to Stellar](https://stellar.org/learn/intro-to-stellar)
- [Learning Resources](https://stellar.org/learn)
- [Blogs](https://stellar.org/blog)

### The Foundation

- [The Mission](https://stellar.org/foundation)
- [Careers](https://stellar.org/foundation/careers)
- [Connect](https://stellar.org/connect)

Discover how you can use the Stellar network and explore the many projects and applications building on it today.

### Stellar for

- [Payments](https://stellar.org/use-cases/payments)
- [Asset Tokenization](https://stellar.org/use-cases/tokenization)
- [On and Off-Ramps](https://stellar.org/use-cases/ramps)
- [Aid Disbursements](https://stellar.org/use-cases/stellar-for-aid)
- [DeFi](https://stellar.org/use-cases/defi)

### Explore

- [Case Studies](https://stellar.org/case-studies)
- [Products and Tools](https://stellar.org/products-and-tools)
- [Ecosystem Projects](https://stellar.org/ecosystem)
- [Service Providers](https://stellar.org/ecosystem/service-providers)

Jump into the documentation or explore our developer resources. Explore and apply for a variety of funding programs.

### Ready to Build

- [Soroban: Smart Contracts](https://stellar.org/soroban)
- [Dev Docs](https://developers.stellar.org/)
- [Dev Hub](https://stellar.org/developers)

### Explore

- [Grants and Funding](https://stellar.org/grants-and-funding)
- [Product Roadmap](https://stellar.org/foundation/roadmap)

Stellar unites a global community to create an open network & transform the global financial system.

### Connect

- [Our Community](https://stellar.org/community)
- [Events](https://stellar.org/community/events)

[Dev Docs](https://developers.stellar.org/) Search

Developers

# Stellar X-Ray, Protocol 25 Upgrade Guide

Author

Stellar Development Foundation

Publishing date

November 24, 2025

This guide is designed to help businesses and developers prepare for X-Ray, Protocol 25, with key dates, release information, a changelog, and more.

You can read all about what's included in X-Ray in the [announcement blog](https://stellar.org/blog/developers/announcing-stellar-x-ray-protocol-25) and stay up to date on any and all X-Ray-related announcements on the [Stellar Developer Discord](https://discord.com/invite/stellardev), where the ecosystem coordinates and shares information about the upgrade.

## Key dates

- December 15, 2025: Stable releases available. **Completed!**
- January 7, 2026 at 2100 UTC: Testnet upgrade. **Completed!**
- January 22, 2026 at 1700 UTC: Mainnet upgrade vote. **Completed!**

_**Please note:** This release cycle happens over the holiday period, so there is more time than usual between the availability of the stable releases and the Testnet upgrade. You can upgrade software as soon as new releases are available because they are compatible with the current protocol. However, we recognize that many people are unavailable late in the year. If you can't upgrade before the end of the year (2025), please plan to do so the first week of January in 2026._

## What do you need to do to prepare?

**If you use a Stellar SDK**

For your Testnet integration, upgrade to the latest version of the relevant Stellar SDK before January 7, 2026. For your Mainnet integration, upgrade to the latest version of relevant Stellar SDKs before January 22, 2026.

**If you run Stellar infrastructure (Stellar Core, Horizon, RPC, Galexie)**

Install Protocol 25 releases. If you use Docker images, pull the Protocol 25 builds from the Docker registry. If you build from source or our Debian packages, make sure to also update your stellar-core, stellar-horizon, and stellar-rpc binaries to the Protocol 25 builds.

_Ubuntu_

We have published the images for [Ubuntu 24.04](https://apt.stellar.org/pool/stable/s/stellar-core/stellar-core_25.0.0-2911.e9748b05a.noble_amd64.deb) and [Ubuntu 22.04](https://apt.stellar.org/pool/stable/s/stellar-core/stellar-core_25.0.0-2911.e9748b05a.jammy_amd64.deb). To build from source you can refer to the [Installation Instructions](https://github.com/stellar/stellar-core/blob/master/INSTALL.md) for installation steps.

We have deprecated Ubuntu 20.04 (focal). Operators on Ubuntu 20.04 will need to upgrade their OS to 24.04 or 22.04. We have also switched to llvm-20. Operators using Ubuntu 22.04 will need to add the llvm-20 repositories to their systems in order to install the new packages. This step will not be required on Ubuntu 24.04. See the details in the [Ubuntu Installation Instructions](https://github.com/stellar/stellar-core/blob/master/INSTALL.md#ubuntu). Package-based installation is also described in the Stellar [documentation](https://developers.stellar.org/docs/validators/admin-guide/installation#package-based-installation).

_Docker_

We have published the Stellar Core [Docker image](https://hub.docker.com/r/stellar/stellar-core/tags) for Protocol 25, and the Docker-based installation is also described in the Stellar [documentation](https://developers.stellar.org/docs/validators/admin-guide/installation#docker-based-installation).

**If you run a validator**

The Protocol 25 upgrade vote is scheduled for January 22, 2026, at 1700 UTC. You should arm your validator with the following command:

`upgrades?mode=set&upgradetime=2026-01-22T17:00:00Z&protocolversion=25`

## X-Ray releases

Below are up-to-date links to all available releases relevant to Protocol 25. In general, please make sure to check release notes for specific instructions and requirements, and unless otherwise indicated, opt for the “Latest Release.”

Stellar infrastructure

- [Stellar Core](https://github.com/stellar/stellar-core/releases)
- [Horizon](https://github.com/stellar/go/releases)
- [RPC](https://github.com/stellar/stellar-rpc/releases)
- [Galexie](https://github.com/stellar/go/releases)

SDKs

- [Rust SDK](https://github.com/stellar/rs-soroban-sdk/releases)
- [JavaScript Base](https://github.com/stellar/js-stellar-base/releases)
- [JavaScript SDK](https://github.com/stellar/js-stellar-sdk/releases)
- [Go SDK (rpcclient & horizonclient & txnbuild)](https://github.com/stellar/go-stellar-sdk/releases)
- [Java](https://github.com/stellar/java-stellar-sdk/releases)
- [Python](https://github.com/StellarCN/py-stellar-base/releases)
- [iOS](https://github.com/Soneso/stellar-ios-mac-sdk/releases)
- [PHP](https://github.com/Soneso/stellar-php-sdk/releases/)
- [C# .NET](https://github.com/Beans-BV/dotnet-stellar-sdk)
- [Flutter](https://github.com/Soneso/stellar_flutter_sdk/releases)
- [Elixir Stellar SDK](https://github.com/kommitters/stellar_sdk/releases)

To stay up to date on any and all X-Ray-related announcements, join the [Stellar Developer Discord](https://discord.gg/sp8zfb4qH6), where the ecosystem coordinates and shares information about the upgrade in the #protocol-next channel.

## Breaking changes

X-Ray introduces new host functions for BN254, and Poseidon and Poseidon2 permutation primitives, and does not introduce any backwards incompatibility. So there are no breaking changes in Stellar Core.

**GO SDKs**

- Golang SDKs (horizonclient, rpcclient, and txnbuild) are now located in a new, centralized repo - [https://github.com/stellar/go-stellar-sdk](https://github.com/stellar/go-stellar-sdk).
- Go client applications that were using these SDKs from _github.com/stellar/go_ module will need to change their project to use the new go module name _github.com/stellar/go-stellar-sdk_
  - Rename package import statements from _github.com/stellar/go/.._ to _github.com/stellar/go-stellar-sdk/.._

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

[English](https://stellar.org/blog/developers/stellar-x-ray-protocol-25-upgrade-guide) [Español](https://stellar.org/es/blog/desarrolladores/guia-de-actualizacion-stellar-x-ray-protocolo-25)