# Documentação

## Projetos de vídeo

| Projeto | Conteúdo | Roteiro canônico |
|---|---|---|
| [Stellar](projects/stellar/README.md) | `src/modules/stellar/` | [`src/modules/stellar/script.ts`](../src/modules/stellar/script.ts) |
| [Ethereum](projects/ethereum/README.md) | `src/modules/ethereum/` | [`src/modules/ethereum/script.ts`](../src/modules/ethereum/script.ts) |

## Documentos compartilhados

- [`AGENT_MANUAL.md`](framework/AGENT_MANUAL.md): operação para humanos e agentes.
- [`BLOCKCHAIN_EXPLAINER_TEMPLATE.md`](framework/BLOCKCHAIN_EXPLAINER_TEMPLATE.md): contrato do template.
- [`QUALITY_CHECKLIST.md`](framework/QUALITY_CHECKLIST.md): revisão antes do render.
- [`projects/stellar/SCRIPT.md`](projects/stellar/SCRIPT.md): roteiro histórico de referência do Stellar.
- [`superpowers/plans/`](superpowers/plans/): planos de implementação.

## Regra de organização

O roteiro humano integral vive em `docs/projects/<name>/SCRIPT.md`. A string em `src/modules/<name>/script.ts` é a cópia executável e deve permanecer sincronizada. `full-narration-timestamps.json` é opcional e representa a transcrição bruta; `BRAINSTORM.md` é opcional e representa direção editorial.
