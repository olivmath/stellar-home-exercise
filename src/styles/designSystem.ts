// ─── Stellar Design Tokens ──────────────────────────────────────────
// Unified abstraction layer for Remotion compositions.
// Institutional. Restrained. Every token earns its place.

import { CSSProperties } from "react";
import { colors, fonts } from "./theme";

// ── Spacing (8px base grid) ────────────────────────────────────────
export const space = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  section: 80,
  edge: 80,
} as const;

// ── Border Radius ──────────────────────────────────────────────────
export const radius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 999,
  circle: "50%",
} as const;

// ── Typography Presets ─────────────────────────────────────────────
// Named by role. Each preset is a complete CSSProperties object.
export const text = {
  // ── Display ──
  displayXL: {
    fontFamily: fonts.display,
    fontSize: 64,
    fontWeight: 600,
    letterSpacing: -1,
    lineHeight: 1.1,
    color: colors.textPrimary,
  } as CSSProperties,

  displayLG: {
    fontFamily: fonts.display,
    fontSize: 48,
    fontWeight: 600,
    letterSpacing: -0.5,
    lineHeight: 1.15,
    color: colors.textPrimary,
  } as CSSProperties,

  displayMD: {
    fontFamily: fonts.display,
    fontSize: 36,
    fontWeight: 600,
    letterSpacing: -0.3,
    lineHeight: 1.2,
    color: colors.textPrimary,
  } as CSSProperties,

  // ── Headings ──
  h1: {
    fontFamily: fonts.display,
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: -0.3,
    lineHeight: 1.25,
    color: colors.textPrimary,
  } as CSSProperties,

  h2: {
    fontFamily: fonts.display,
    fontSize: 26,
    fontWeight: 500,
    letterSpacing: -0.2,
    lineHeight: 1.3,
    color: colors.textPrimary,
  } as CSSProperties,

  h3: {
    fontFamily: fonts.display,
    fontSize: 21,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 1.35,
    color: colors.textPrimary,
  } as CSSProperties,

  // ── Overline: spaced caps for labels and markers ──
  overlineLG: {
    fontFamily: fonts.accent,
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
    color: colors.textDim,
  } as CSSProperties,

  overlineMD: {
    fontFamily: fonts.accent,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 2.5,
    textTransform: "uppercase" as const,
    color: colors.textDim,
  } as CSSProperties,

  overlineSM: {
    fontFamily: fonts.accent,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    color: colors.textDim,
  } as CSSProperties,

  // ── Body ──
  bodyLG: {
    fontFamily: fonts.body,
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: 0,
    color: colors.textPrimary,
  } as CSSProperties,

  bodyMD: {
    fontFamily: fonts.body,
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.65,
    letterSpacing: 0,
    color: colors.textSecondary,
  } as CSSProperties,

  bodySM: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.55,
    letterSpacing: 0.1,
    color: colors.textSecondary,
  } as CSSProperties,

  // ── Label / Caption ──
  label: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0.5,
    color: colors.textDim,
  } as CSSProperties,

  caption: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: 0.2,
    lineHeight: 1.5,
    color: colors.textDim,
  } as CSSProperties,

  // ── Code ──
  codeLG: {
    fontFamily: fonts.code,
    fontSize: 20,
    fontWeight: 400,
    letterSpacing: 0.3,
    color: colors.textSecondary,
  } as CSSProperties,

  codeMD: {
    fontFamily: fonts.code,
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 0.3,
    color: colors.textSecondary,
  } as CSSProperties,

  codeSM: {
    fontFamily: fonts.code,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: 0.2,
    color: colors.textDim,
  } as CSSProperties,
} as const;

// ── Shadow Presets ─────────────────────────────────────────────────
// Subtle elevation only. No colored glows by default.
export const shadows = {
  sm: colors.shadowSm,
  md: colors.shadowMd,
  lg: colors.shadowLg,
  accent: colors.shadowAccent,
  inner: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
} as const;

// ── Dividers ───────────────────────────────────────────────────────
// Clean lines. The gold rule is the only brand signature element.
export const divider = {
  subtle: (width: number | string = "100%"): CSSProperties => ({
    height: 1,
    width,
    background: colors.borderSubtle,
  }),

  accent: (width: number | string = "100%"): CSSProperties => ({
    height: 1,
    width,
    background: colors.borderAccent,
  }),

  /** Thin gold rule — the Stellar signature. Use sparingly. */
  gold: (width: number | string = 48): CSSProperties => ({
    height: 1,
    width,
    background: colors.gold,
    opacity: 0.5,
  }),
} as const;

// ── Panel Presets ──────────────────────────────────────────────────
// Clean surfaces. No heavy blur or glassmorphism.
export const panel = {
  base: {
    background: colors.bgElevated,
    borderRadius: radius.md,
    border: `1px solid ${colors.borderSubtle}`,
    boxShadow: shadows.md,
    overflow: "hidden",
    position: "relative",
  } as CSSProperties,

  surface: {
    background: colors.bgSurface,
    borderRadius: radius.md,
    border: `1px solid ${colors.borderSubtle}`,
    overflow: "hidden",
    position: "relative",
  } as CSSProperties,

  accent: {
    background: colors.bgElevated,
    borderRadius: radius.md,
    border: `1px solid ${colors.borderAccent}`,
    boxShadow: `${shadows.md}, ${shadows.accent}`,
    overflow: "hidden",
    position: "relative",
  } as CSSProperties,
} as const;

// ── Layout Helpers ─────────────────────────────────────────────────
export const layout = {
  centerColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  centerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  sceneContent: {
    position: "absolute" as const,
    inset: 0,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: `${space.xxxl}px ${space.edge}px`,
  } as CSSProperties,

  dimOverlay: (amount: number = 0.6): CSSProperties => ({
    position: "absolute" as const,
    inset: 0,
    backgroundColor: `rgba(7, 7, 9, ${amount})`,
  }),
} as const;

// ── Semantic Variant Map ───────────────────────────────────────────
export type ColorVariant = "accent" | "positive" | "negative" | "info" | "neutral";

export const variants: Record<
  ColorVariant,
  { color: string; bg: string; border: string }
> = {
  accent: {
    color: colors.gold,
    bg: colors.goldDim,
    border: colors.borderAccent,
  },
  positive: {
    color: colors.positive,
    bg: `${colors.positive}0A`,
    border: `${colors.positive}18`,
  },
  negative: {
    color: colors.negative,
    bg: `${colors.negative}0A`,
    border: `${colors.negative}18`,
  },
  info: {
    color: colors.info,
    bg: `${colors.info}0A`,
    border: `${colors.info}18`,
  },
  neutral: {
    color: colors.textSecondary,
    bg: colors.bgSurface,
    border: colors.borderSubtle,
  },
};

// ── Animation Timing (Remotion spring/interpolate references) ──────
export const motion = {
  duration: {
    fast: 8,       // frames
    normal: 15,    // frames
    slow: 25,      // frames
    scene: 40,     // frames — standard scene transition
  },
  easing: {
    out: [0.16, 1, 0.3, 1] as const,
    inOut: [0.42, 0, 0.58, 1] as const,
    gentle: [0.25, 0.1, 0.25, 1] as const,
  },
  /** Standard stagger offset between items in frames */
  stagger: 4,
} as const;

// ── Z-Index Scale ──────────────────────────────────────────────────
export const zIndex = {
  base: 0,
  content: 10,
  overlay: 20,
  decoration: 30,
  grain: 40,
  ui: 50,
} as const;

// ── Noise Overlay ──────────────────────────────────────────────────
// Very subtle film grain. Positioned absolutely over scenes.
export const noiseOverlay: CSSProperties = {
  position: "absolute",
  inset: 0,
  opacity: 0.025,
  mixBlendMode: "overlay",
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  backgroundSize: "128px 128px",
  pointerEvents: "none",
  zIndex: zIndex.grain,
};