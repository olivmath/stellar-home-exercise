# Stellar Speed Run — Project Instructions

## Design System (`src/styles/designSystem.ts`)

All components MUST use the design system presets instead of raw CSS values. This ensures visual consistency across the entire video.

### How to use

Import what you need and spread the presets:

```tsx
import { text, glass, space, accentLine, shadows, gradients, variants, radius, glowDot, noiseOverlay, layout } from "../styles/designSystem";
```

### Typography (`text.*`)

Presets are named by **role**, not size. Each is a complete `CSSProperties` object — spread it.

| Preset | Font | Size | Use for |
|--------|------|------|---------|
| `text.displayXL` | Lora 700 | 72px | Episode transition titles |
| `text.displayLG` | Lora 700 | 56px | Major scene titles |
| `text.displayMD` | Lora 700 | 42px | Secondary titles |
| `text.h1` | Lora 700 | 34px | Card names, lower-third titles |
| `text.h2` | Lora 600 | 28px | Subtitles, founder names |
| `text.h3` | Lora 600 | 22px | Small headings |
| `text.accentLG` | Anton | 28px | Episode markers (EPISODE 01) |
| `text.accentMD` | Anton | 20px | Column titles |
| `text.accentSM` | Anton | 16px | Small labels, episode numbers |
| `text.bodyLG` | Inter 400 | 22px | Large body text |
| `text.bodyMD` | Inter 400 | 18px | Standard body text |
| `text.bodySM` | Inter 400 | 15px | Captions, descriptions |
| `text.label` | Inter 600 | 13px | Uppercase labels (e.g. progress bar) |
| `text.caption` | Inter 400 | 15px | Uppercase subtitles |
| `text.codeLG` | IBM Plex Mono | 22px | Large code/tech text |
| `text.codeMD` | IBM Plex Mono | 17px | Badge text, flow nodes |
| `text.codeSM` | IBM Plex Mono | 14px | Small code, tags |

Usage:
```tsx
<div style={{ ...text.h1 }}>Title</div>
<div style={{ ...text.accentSM, color: colors.gold }}>EPISODE 01</div>
```

### Spacing (`space.*`)

8px grid system. Use instead of magic numbers.

| Token | Value | Use for |
|-------|-------|---------|
| `space.xxs` | 2px | Hairline gaps |
| `space.xs` | 4px | Tight gaps |
| `space.sm` | 8px | Small gaps |
| `space.md` | 16px | Standard gaps |
| `space.lg` | 24px | Component gaps |
| `space.xl` | 32px | Section gaps |
| `space.xxl` | 48px | Large padding |
| `space.xxxl` | 64px | Extra large |
| `space.section` | 80px | Scene sections |
| `space.edge` | 100px | Screen edge padding |

### Border Radius (`radius.*`)

| Token | Value |
|-------|-------|
| `radius.xs` | 4px |
| `radius.sm` | 8px |
| `radius.md` | 12px |
| `radius.lg` | 16px |
| `radius.xl` | 20px |
| `radius.pill` | 999px |
| `radius.circle` | "50%" |

### Glass Panels (`glass.*`)

Pre-configured glassmorphism styles with blur, borders, and inner highlights.

| Preset | Border | Use for |
|--------|--------|---------|
| `glass.neutral` | white 6% | Generic panels |
| `glass.gold` | gold border | Gold-themed cards |
| `glass.teal` | teal border | Teal-themed cards |
| `glass.lilac` | lilac border | Lilac-themed cards |

Usage:
```tsx
<div style={{ ...glass.gold, padding: space.xxl }}>Content</div>
```

The `<GlassPanel>` component wraps this with a `variant` prop: `"gold" | "teal" | "lilac" | "neutral"`.

### Shadows (`shadows.*`)

**Elevation:** `sm`, `md`, `lg`, `xl`
**Brand glows:** `goldSoft/Medium/Strong`, `tealSoft/Medium`, `lilacSoft/Medium`, `successSoft`, `warningSoft`
**Inner catch-light:** `innerLight`, `innerGold`, `innerTeal`

Combine with commas:
```tsx
boxShadow: `${shadows.md}, ${shadows.goldSoft}, ${shadows.innerGold}`
```

### Gradients (`gradients.*`)

- **Lines:** `goldLine`, `goldLineSoft`, `tealLine`
- **Bars (vertical):** `goldBar`, `tealBar`, `lilacBar`
- **Utility:** `goldToTeal`, `darkFade`, `vignette`
- **Ambient orbs:** `goldOrb`, `tealOrb`

### Accent Lines (`accentLine.*`)

The gold accent line is the Stellar brand signature.

```tsx
// Horizontal separator
<div style={accentLine.gold(lineWidth)} />

// Top panel glow
<div style={accentLine.topGlow("gold")} />

// Side bar decoration
<div style={accentLine.sideBar("teal")} />
```

### Color Variants (`variants`)

Centralized map for `"gold" | "teal" | "lilac" | "success" | "warning"`:
```tsx
const v = variants[variant]; // → { color, bg, border, glow, glowSoft }
```

### Utilities

- `glowDot(color, size)` — Small glowing indicator dot
- `noiseOverlay` — Film grain texture (spread on a div over scenes)
- `layout.centerColumn` / `layout.centerRow` — Flex centering
- `layout.sceneContent` — Full scene content area with edge padding
- `layout.dimOverlay(amount)` — Dark overlay for VIDEO+OVERLAY scenes

### Rules

1. **Never use raw `fontFamily`, `fontSize`, `fontWeight` combos** — always spread a `text.*` preset
2. **Never use raw pixel values for spacing** — use `space.*` tokens
3. **Never hand-write glassmorphism styles** — use `glass.*` presets or `<GlassPanel>`
4. **Never hard-code glow/shadow strings** — use `shadows.*` presets
5. **Never duplicate color variant maps** in components — use `variants` from designSystem
6. Colors still come from `src/styles/theme.ts` (`colors.*`, `fonts.*`)

## Brand Reference

- **Primary:** Gold `#FDDA24` (signature), Black `#0F0F0F`, White `#F6F7F8`
- **Secondary:** Teal `#00A7B5`, Lilac `#B7ACE8`, Warm Grey `#D6D2C4`, Navy `#002E5D`
- **Fonts:** Lora (display/serif), Inter (body), Anton (accent/caps), IBM Plex Mono (code)
- **Video:** 1920x1080 @ 30fps

## Architecture Quick Reference

- Scenes: `src/scenes/` (Opening, Episode1-5, Closing)
- Components: `src/components/` (Badge, GlassPanel, FlowDiagram, etc.)
- Animations: `src/animations/springs.ts` (fadeIn, slideIn, scaleIn)
- Audio timing: `src/config/audioMarks.ts` (Whisper timestamps → frames)
- Theme: `src/styles/theme.ts` (raw colors, fonts)
- Design System: `src/styles/designSystem.ts` (presets, abstractions)


geral:

- tudo deve sempre estar em ingles
- crie um card para pessoa com uma foto em circulo o nome dela embaixo e o papel dela embaixo
- depois do video deve mostrar o certificado

ep1

- na parte dos bytes, Organize a lista na esquerda para ser três linhas e quatro colunas e na direita mesma coisa 


ep2

- no encoding remova o (s...) e (g...)
- na tela do sign e verifie as camadas tem q ser: meu video -> sombra -> sign+verifie


ep3

- deveria comecar o ciclo de vida das tx aqui 01:54.96 | f3449; o card deve ficar na diretita; 02:05.73 | f3772 momento de mostrar o settlement já devia ter sido mostrado para remover o card
- a animacao da transacao deveria comecar aqui: 02:05.83 | f3775; mostre um card BEM maior com 100 circulos; nao vamos mostrar o check uma de cada vez mas todas de uma vez só no seguinet ttempo:
    - mostrar a tx e 100 operations 02:05.83 | f3775
    - mostrar 100 operations checked entao a tx checked tbm terminando em 02:05.83 | f3775
    - mostrar 99 operations checked e um fail entao a tx falhando tbm terminando em 02:12.40
- typos de operacoes comeca aqui: 02:12.90 | f3987
    - payments type: 02:16.43 | f4093
    - change trust: 02:18.76 | f4163
    - invoke host function 02:20.90 | f4227
- frase final: A transaction is the container. Operations are the intentions inside in the container.

ep4

- ledger lifecycle: 02:44.93 | f4948 deve mostrar o ultimo card já; deve mostrar o 2/3 tbm na animacao
- mostrar o Pow na left e depois o Pos na right; o SCP no meio; coloque sombra desde o comeco desse momento: video -> sombra -> pow+pos+scp
- depois de tirar o card anteriores mostre o david na direita e coloque a foto dele : /Users/olivmath/Documents/dev/stellar/public/images/scientists/david-mazieres.jpg e em 03:06.90 | f5607 mostrar o Federated Byzant Aggrement na esquerda;
- depois comecando em 03:10.30 | f5709, deve mostrar animacao como essa da imagem /Users/olivmath/Documents/dev/stellar/Captura de Tela 2026-02-17 às 21.43.18.png; sem o video aqui.
- depois volta pra video como esta em 03:10.30 | f5709
- 03:21.19 | f6036 aqui a animacao deve ser um triangulo com as as palavras: descentralizacao na esquera, segurança na direita e escalabilidade no topo; teminando aqui 03:20


ep5 

- aqui 03:39.03 | f6571 os cards de Soroban, WASMVM e RUST precisam ser mais harmonicos estao de tamanhos estrnahos
- coloque a imagem do grandon no card: /Users/olivmath/Documents/dev/stellar/public/images/scientists/grandon.png
- quandoo a barra de progresso do time to live chegar no fim ela fica vermelha e aparecem os cards de norent; mas o card de renew rent deve aparecer desde o comeco da barra de progresso; essa animacao esta comecando cert no tempo mas tem q durar ate 04:03.09 | f7293
- remova o transicao de "code"
- o contrato deve ser escrito igaul aqui: /Users/olivmath/Documents/dev/stellar/docs/flipper.rs;  na animacao assim q aparecer a javela de codigo já coloque o import; use uma animacao para ir escrevendo o código dinamicamente;
    - imports: 04:04.46
    - State: 04:05.56 | f7367
    - contract, get function: 04:06.63 | f7399
    - flip function: 04:09.46 | f7484
- Aqui você tem que trocar protocolo 21 por protocolo Updates começando aqui 04:16.66 | f7700
- 04:25.56 | f7967 "this enables ..." Aqui começa aparecer os quadrados das zkSNARKS e passkey; Enabled in Layer 1
- o ultimo card deve comecara aqui 04:39.73 | f8392, deve aparecer cada item da lista sem o check; depois do ultimo aparecer deve dar o check em todos em 04:46.60 | f8598; deve seguir: checkbox, ep1, descricao;


