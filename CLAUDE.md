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

