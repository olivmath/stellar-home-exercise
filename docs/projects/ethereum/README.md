# Ethereum

O módulo executável está em [`src/modules/ethereum/`](../../src/modules/ethereum/).

- Conteúdo: [`content.ts`](../../src/modules/ethereum/content.ts)
- Narração: [`narration.ts`](../../src/modules/ethereum/narration.ts)
- Assets: [`assets.ts`](../../src/modules/ethereum/assets.ts)
- Roteiro humano integral: [`SCRIPT.md`](SCRIPT.md)
- Cópia executável: [`script.ts`](../../src/modules/ethereum/script.ts)
- Cenas: [`scenes.ts`](../../src/modules/ethereum/scenes.ts)

O roteiro cobre fundação, contas, transações EVM, blocos e estado, Proof of Stake e Solidity/smart contracts.

O exemplo prático de smart contract é o [Flipper em Solidity](flipper.sol): um contrato mínimo que armazena um booleano, permite invertê-lo e expõe seu valor atual.

O roteiro humano é a fonte editorial; a string `narration` em `src/modules/ethereum/script.ts` deve permanecer sincronizada para o runtime.
