# Manual de produção

Este documento é o ponto de entrada para humanos e agentes que trabalham neste repositório.

## 1. Como o repositório funciona

O projeto é um vídeo educacional programático feito com Remotion, React e TypeScript.

```text
conteúdo blockchain
      ↓
src/modules/<blockchain>/       dados, narração e assets específicos
      ↓
src/template/                   contrato e sequência dos seis tópicos
      ↓
src/framework/                  timing, safe area, áudio e transições
      ↓
src/components/ + src/scenes/   visuais reutilizáveis e cenas concretas
      ↓
src/Root.tsx                    composição registrada no Remotion
      ↓
render MP4 1920×1080 @ 30fps
```

### Camadas

| Camada | Local | Responsabilidade |
|---|---|---|
| Framework | `src/framework/` | contratos, frames, safe areas, áudio e transições |
| Design | `src/design/`, `src/styles/` | tema Floripa Web3, tokens, tipografia e layout |
| Template | `src/template/` | sequência comum e contrato `BlockchainExplainer` |
| Conteúdo | `src/modules/<name>/` | fatos, narração, assets e cenas de uma blockchain |
| Cenas legadas | `src/scenes/` | implementação visual atual do vídeo Stellar |
| Composição | `src/Root.tsx` | registro das composições renderizáveis |

Regra principal: uma informação específica de Stellar pertence ao módulo Stellar, não ao framework, ao template ou a um componente compartilhado.

## 2. Regras para agentes

### Antes de começar

1. Leia `README.md`, este manual e o plano ou issue recebida.
2. Inspecione o estado atual com `git status --short`.
3. Identifique arquivos existentes antes de criar novos.
4. Mantenha o escopo da tarefa; não reescreva cenas não relacionadas.
5. Não crie nem execute testes quando a tarefa disser que testes não são necessários.

### Trabalho via Orca

O coordenador deve:

1. Criar um Run e uma Task por unidade de trabalho.
2. Iniciar o worker com `orca orchestration worker-start`.
3. Confirmar que o prompt chegou ao terminal; se necessário, usar `orca terminal send` com o handle retornado.
4. Monitorar pelo dispatch, não por suposições visuais do terminal.
5. Encerrar ou liberar o terminal depois da conclusão.

O worker deve:

1. Implementar apenas a Task recebida.
2. Não executar `run-use` nem alterar o vínculo do Run do coordenador.
3. Não iniciar outro agente.
4. Relatar exatamente uma vez com `worker_done`, incluindo resumo de três frases e arquivos modificados.
5. Parar depois do relatório.

Se `worker_done` retornar `dispatch_capability_invalid`, o trabalho pode estar concluído, mas o coordenador deve verificar os arquivos e registrar a Task manualmente. Isso é uma falha de lifecycle do Orca, não prova de falha da implementação.

## 3. Como criar um novo vídeo

### Fluxo editorial

```text
brief → pesquisa → roteiro → marcas de narração → módulo blockchain
      → cenas → preview → revisão visual → render final
```

Todo vídeo segue, por padrão:

1. Abertura: gancho e promessa.
2. Fundação/história: por que a rede existe.
3. Wallet: entrada e identidade do usuário.
4. Transações: intenção virando operação.
5. Blocos/ledger: onde o estado é registrado.
6. Consenso: como participantes concordam.
7. Smart contracts: como lógica programável executa.
8. Fechamento: resumo e próximo passo.

Cada tópico precisa de um conceito central, 3–5 momentos visuais, uma conclusão curta e uma ponte para o tópico seguinte. Mire em 45–60 segundos por tópico e aproximadamente 5–6 minutos no total.

### Criar um módulo de blockchain

Crie:

```text
src/modules/<name>/content.ts
src/modules/<name>/narration.ts
src/modules/<name>/assets.ts
src/modules/<name>/scenes.ts
```

Use o contrato definido em `src/framework/types.ts` e o template em `src/template/`. O módulo deve fornecer missão, identidade, modelo de transação, estado, consenso, programabilidade quando aplicável, casos de uso e marcas de narração.

Não copie a identidade Stellar para o novo módulo. O tema padrão é Floripa Web3; overrides precisam ser explícitos.

### Criar ou alterar cenas

- Use `src/framework/timing.ts` para converter segundos em frames.
- Use `SafeArea` e mantenha overlays essenciais acima da área inferior reservada ao YouTube.
- Use `CameraLayer` para `hidden`, `full`, `panel` e `bubble`.
- Use `ReadablePanel` ou scrim opaco sobre imagens e vídeo.
- Prefira cenas de tela cheia quando o diagrama ou código for o assunto principal.
- Evite colocar conteúdo importante sobre o rosto do apresentador.

## 4. Áudio, narração e assets

O áudio deve ser renderizável dentro do Remotion. Centralize configuração em `src/audio/audioMix.ts` e marcas em `src/audio/audioTimeline.ts` ou no módulo de conteúdo.

- Música: volume baixo, loop e fade nas bordas.
- Narração: faixa principal e ducking automático da música.
- Transições: whoosh, riser, impact ou click alinhados aos frames.
- Assets opcionais devem ter fallback ou ser documentados; não referencie um arquivo inexistente como default obrigatório.

Para um vídeo narrado, mantenha a cadeia:

```text
roteiro → áudio → timestamps → audioMarks → Sequence → animação
```

## 5. Validação humana e do agente

Comandos básicos:

```bash
pnpm install
pnpm exec tsc --noEmit
pnpm studio
pnpm preview
pnpm render
```

O checklist completo está em [`QUALITY_CHECKLIST.md`](QUALITY_CHECKLIST.md). A revisão deve conferir legibilidade pausada, safe areas, quatro modos de câmera, duração total, ducking, transições, assets opcionais e ausência de dependências Stellar no framework.

Quando testes não forem necessários, ainda faça typecheck e inspeção visual proporcional ao risco. Não crie arquivos de teste só para preencher o plano.

## 6. Checklist rápido de entrega

- [ ] O módulo está isolado em `src/modules/<name>/`.
- [ ] A composição está registrada em `src/Root.tsx`.
- [ ] O vídeo segue os seis tópicos e abertura/fechamento.
- [ ] Texto e código respeitam os tamanhos mínimos de 1080p.
- [ ] Câmera não cobre diagramas, texto ou safe area inferior.
- [ ] Música, narração e efeitos são configuráveis e renderizáveis.
- [ ] `pnpm exec tsc --noEmit` passa.
- [ ] Nenhum teste foi criado/executado quando explicitamente fora do escopo.
- [ ] `docs/framework/QUALITY_CHECKLIST.md` foi revisado.

## 7. Referências do projeto

- [`BLOCKCHAIN_EXPLAINER_TEMPLATE.md`](BLOCKCHAIN_EXPLAINER_TEMPLATE.md): contrato editorial e técnico.
- [`QUALITY_CHECKLIST.md`](QUALITY_CHECKLIST.md): revisão antes do render final.
- [`SCRIPT.md`](../projects/stellar/SCRIPT.md): roteiro de referência do vídeo Stellar.
- [`superpowers/plans/`](../superpowers/plans/): planos de implementação.
