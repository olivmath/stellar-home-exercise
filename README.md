# Stellar Speed Run

Vídeo educacional animado sobre o ecossistema Stellar — feito com Remotion + React + TypeScript.

---

## Como ajustar timestamps de animação

### O sistema tem 3 camadas

```
audioMarks.ts          EpisodeN.tsx            Componente
──────────────         ────────────────        ──────────────────
segundo absoluto  →    frame do Sequence  →    delay interno
(ex: 136.43s)         (onde a cena vive)      (quando o elemento aparece)
```

---

### Camada 1 — Segundos absolutos (`src/config/audioMarks.ts`)

Todos os timestamps vêm do Whisper (transcrição do áudio). São segundos no vídeo inteiro.

```ts
mark("Payment: for asset transfers", 137.0, 139.0),
//                                   ↑ começa em 137.0s no vídeo
```

**Para saber o segundo de qualquer frame:** `frame ÷ 30 = segundos`

---

### Camada 2 — Frames do `<Sequence>` (arquivo do episódio)

Cada episódio tem um ponto de origem `EP` e uma função `rel()` que converte segundo absoluto → frame relativo:

```ts
const EP = episodes.ep3.startSec;          // ex: 108.68s
const rel = (sec: number) => toFrame(sec - EP);

// Uso:
<Sequence from={rel(132.90)} durationInFrames={rel(144.43) - rel(132.90)}>
//              ↑ quando começa              ↑ quando termina
```

---

### Camada 3 — Delay interno do componente

Dentro do componente, `frame = 0` quando o `<Sequence>` começa. Delays são em **segundos a partir do início da cena**:

```ts
const SCENE_START = 132.90; // segundo absoluto de início da cena

const delaySec = 136.43 - SCENE_START; // = 3.53s após a cena começar
const opacity  = fadeIn(frame, fps, delaySec);
```

---

### Diagnóstico rápido

| Sintoma | O que mudar |
|---------|-------------|
| Elemento aparece **cedo demais** | Aumente o `delay` ou o `from` do `<Sequence>` |
| Elemento aparece **tarde demais** | Diminua o `delay` ou o `from` do `<Sequence>` |
| Elemento some **cedo demais** | Aumente o `durationInFrames` do `<Sequence>` |
| Cena inteira **fora de sincronia** | Ajuste o `from={rel(X)}` — mude o segundo absoluto `X` |

---

### Exemplo completo

Quero que o card "Payment" apareça em **136.43s** (antes estava em 137.0s):

**Passo 1** — No Remotion Studio, pause no momento certo e anote o frame:
```
frame 4093 → 4093 / 30 = 136.43s
```

**Passo 2** — Localize o dado no arquivo do episódio:
```ts
// EpisodeN.tsx
const SCENE_START = 132.90;

const operationTypes = [
  { label: "Payment", atSec: 137.0 },  // ← está errado
  ...
];

// delay calculado automaticamente:
const delaySec = op.atSec - SCENE_START; // 137.0 - 132.90 = 4.1s
```

**Passo 3** — Corrija o segundo absoluto:
```ts
{ label: "Payment", atSec: 136.43 },   // ← corrigido
// novo delay: 136.43 - 132.90 = 3.53s ✓
```

---

## Estrutura do projeto

```
src/
├── config/
│   └── audioMarks.ts       # Fonte da verdade: todos os timestamps
├── scenes/
│   ├── Opening.tsx
│   ├── Episode1.tsx        # cada episódio tem seu próprio rel()
│   ├── Episode2.tsx
│   ├── Episode3.tsx
│   ├── Episode4.tsx
│   ├── Episode5.tsx
│   ├── Episode6.tsx
│   └── Closing.tsx
├── components/             # Badge, GlassPanel, LowerThird, ScientistCard...
├── animations/
│   └── springs.ts          # fadeIn, slideIn, scaleIn
└── styles/
    ├── theme.ts             # colors, fonts
    └── designSystem.ts      # text.*, space.*, panel.*, layout.*...
```

## Comandos

```bash
npm start          # Remotion Studio (preview + scrubbing)
npm run build      # render o vídeo completo
npx tsc --noEmit   # checar erros de TypeScript
```
