# Documentation

## Video projects

| Project | Content | Canonical script |
|---|---|---|
| [Stellar](projects/stellar/README.md) | `src/modules/stellar/` | [`src/modules/stellar/script.ts`](../src/modules/stellar/script.ts) |
| [Ethereum](projects/ethereum/README.md) | `src/modules/ethereum/` | [`src/modules/ethereum/script.ts`](../src/modules/ethereum/script.ts) |

## Shared documents

- [`AGENT_MANUAL.md`](../AGENT_MANUAL.md): operation guide for humans and agents.
- [`BLOCKCHAIN_EXPLAINER_TEMPLATE.md`](../BLOCKCHAIN_EXPLAINER_TEMPLATE.md): template contract.
- [`QUALITY_CHECKLIST.md`](../QUALITY_CHECKLIST.md): pre-render review.
- [`projects/stellar/SCRIPT.md`](projects/stellar/SCRIPT.md): historical Stellar script reference.
- [`superpowers/plans/`](superpowers/plans/): planos de implementação.

## Organization rule

The complete human-readable script lives in `docs/projects/<name>/SCRIPT.md`. The string in `src/modules/<name>/script.ts` is the executable copy and must stay synchronized. `full-narration-timestamps.json` is optional raw transcription data; `BRAINSTORM.md` is optional editorial direction.
