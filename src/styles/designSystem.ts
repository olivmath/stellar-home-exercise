// ─── Stellar Design System ──────────────────────────────────────────
// Unified abstraction layer for consistent, production-grade visuals
// All components MUST use these presets instead of raw values.

import { CSSProperties } from "react";
import { colors, fonts } from "./theme";

// ── Spacing Scale (8px grid) ──────────────────────────────────────
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
  edge: 100, // standard padding from screen edges
} as const;

// ── Border Radius ──────────────────────────────────────────────────
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 999,
  circle: "50%",
} as const;

// ── Typography Presets ─────────────────────────────────────────────
// Each preset is a complete CSSProperties object ready to spread.
// Named by role, not size — ensures semantic consistency.
export const text = {
  // ── Display: Large titles, episode names ──
  displayXL: {
    fontFamily: fonts.display,
    fontSize: 72,
    fontWeight: 700,
    letterSpacing: -1.5,
    lineHeight: 1.1,
    color: colors.textPrimary,
  } as CSSProperties,

  displayLG: {
    fontFamily: fonts.display,
    fontSize: 56,
    fontWeight: 700,
    letterSpacing: -1,
    lineHeight: 1.15,
    color: colors.textPrimary,
  } as CSSProperties,

  displayMD: {
    fontFamily: fonts.display,
    fontSize: 42,
    fontWeight: 700,
    letterSpacing: -0.5,
    lineHeight: 1.2,
    color: colors.textPrimary,
  } as CSSProperties,

  // ── Headings ──
  h1: {
    fontFamily: fonts.display,
    fontSize: 34,
    fontWeight: 700,
    letterSpacing: -0.5,
    lineHeight: 1.25,
    color: colors.textPrimary,
  } as CSSProperties,

  h2: {
    fontFamily: fonts.display,
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: -0.3,
    lineHeight: 1.3,
    color: colors.textPrimary,
  } as CSSProperties,

  h3: {
    fontFamily: fonts.display,
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 1.35,
    color: colors.textPrimary,
  } as CSSProperties,

  // ── Accent: Anton condensed — labels, callouts, episode markers ──
  accentLG: {
    fontFamily: fonts.accent,
    fontSize: 28,
    letterSpacing: 6,
    textTransform: "uppercase" as const,
  } as CSSProperties,

  accentMD: {
    fontFamily: fonts.accent,
    fontSize: 20,
    letterSpacing: 5,
    textTransform: "uppercase" as const,
  } as CSSProperties,

  accentSM: {
    fontFamily: fonts.accent,
    fontSize: 16,
    letterSpacing: 4,
    textTransform: "uppercase" as const,
  } as CSSProperties,

  // ── Body ──
  bodyLG: {
    fontFamily: fonts.body,
    fontSize: 22,
    fontWeight: 400,
    lineHeight: 1.65,
    letterSpacing: 0.1,
    color: colors.textPrimary,
  } as CSSProperties,

  bodyMD: {
    fontFamily: fonts.body,
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: 0.1,
    color: colors.textPrimary,
  } as CSSProperties,

  bodySM: {
    fontFamily: fonts.body,
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.55,
    letterSpacing: 0.2,
    color: colors.textSecondary,
  } as CSSProperties,

  // ── Labels & Captions ──
  label: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
    color: colors.textDim,
  } as CSSProperties,

  caption: {
    fontFamily: fonts.body,
    fontSize: 15,
    fontWeight: 400,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    lineHeight: 1.5,
    color: colors.warmGrey,
  } as CSSProperties,

  // ── Code / Monospace ──
  codeLG: {
    fontFamily: fonts.code,
    fontSize: 22,
    fontWeight: 500,
    letterSpacing: 0.5,
  } as CSSProperties,

  codeMD: {
    fontFamily: fonts.code,
    fontSize: 17,
    fontWeight: 500,
    letterSpacing: 0.5,
  } as CSSProperties,

  codeSM: {
    fontFamily: fonts.code,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.3,
  } as CSSProperties,
} as const;

// ── Shadow & Glow Presets ──────────────────────────────────────────
export const shadows = {
  // Elevation
  sm: "0 2px 8px rgba(0, 0, 0, 0.3)",
  md: "0 4px 20px rgba(0, 0, 0, 0.4)",
  lg: "0 8px 32px rgba(0, 0, 0, 0.5)",
  xl: "0 16px 48px rgba(0, 0, 0, 0.6)",

  // Brand glows — three tiers per color
  goldSoft: "0 0 30px rgba(253, 218, 36, 0.06)",
  goldMedium: "0 0 40px rgba(253, 218, 36, 0.12), 0 0 80px rgba(253, 218, 36, 0.04)",
  goldStrong: "0 0 50px rgba(253, 218, 36, 0.2), 0 0 100px rgba(253, 218, 36, 0.06)",

  tealSoft: "0 0 30px rgba(0, 167, 181, 0.06)",
  tealMedium: "0 0 40px rgba(0, 167, 181, 0.12), 0 0 80px rgba(0, 167, 181, 0.04)",

  lilacSoft: "0 0 30px rgba(183, 172, 232, 0.06)",
  lilacMedium: "0 0 40px rgba(183, 172, 232, 0.12), 0 0 80px rgba(183, 172, 232, 0.04)",

  successSoft: "0 0 24px rgba(52, 211, 153, 0.08)",
  warningSoft: "0 0 24px rgba(251, 113, 133, 0.08)",

  // Inner catch-light (top edge)
  innerLight: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
  innerGold: "inset 0 1px 0 rgba(253, 218, 36, 0.06)",
  innerTeal: "inset 0 1px 0 rgba(0, 167, 181, 0.06)",
} as const;

// ── Gradient Presets ───────────────────────────────────────────────
export const gradients = {
  // Horizontal accent lines
  goldLine: `linear-gradient(90deg, transparent, ${colors.gold}50, ${colors.gold}, ${colors.gold}50, transparent)`,
  goldLineSoft: `linear-gradient(90deg, transparent, ${colors.gold}20, transparent)`,
  tealLine: `linear-gradient(90deg, transparent, ${colors.teal}50, ${colors.teal}, ${colors.teal}50, transparent)`,

  // Vertical accent bars
  goldBar: `linear-gradient(180deg, transparent, ${colors.gold}, transparent)`,
  tealBar: `linear-gradient(180deg, transparent, ${colors.teal}, transparent)`,
  lilacBar: `linear-gradient(180deg, transparent, ${colors.lilac}, transparent)`,

  // Utility
  goldToTeal: `linear-gradient(135deg, ${colors.gold}, ${colors.teal})`,
  darkFade: "linear-gradient(180deg, rgba(15, 15, 15, 0) 0%, rgba(15, 15, 15, 0.85) 100%)",
  vignette: "radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.5) 100%)",

  // Ambient background orbs
  goldOrb: `radial-gradient(circle, rgba(253, 218, 36, 0.05) 0%, transparent 70%)`,
  tealOrb: `radial-gradient(circle, rgba(0, 167, 181, 0.04) 0%, transparent 70%)`,
} as const;

// ── Glass Panel Presets ────────────────────────────────────────────
// Refined glassmorphism with consistent blur and inner highlights.
const GLASS_BASE: CSSProperties = {
  background: "rgba(12, 12, 18, 0.72)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  borderRadius: radius.lg,
  overflow: "hidden",
  position: "relative",
};

export const glass = {
  neutral: {
    ...GLASS_BASE,
    border: "1px solid rgba(255, 255, 255, 0.06)",
    boxShadow: `${shadows.md}, ${shadows.innerLight}`,
  } as CSSProperties,

  gold: {
    ...GLASS_BASE,
    border: `1px solid ${colors.borderGold}`,
    boxShadow: `${shadows.md}, ${shadows.goldSoft}, ${shadows.innerGold}`,
  } as CSSProperties,

  teal: {
    ...GLASS_BASE,
    border: `1px solid ${colors.borderTeal}`,
    boxShadow: `${shadows.md}, ${shadows.tealSoft}, ${shadows.innerTeal}`,
  } as CSSProperties,

  lilac: {
    ...GLASS_BASE,
    border: `1px solid ${colors.borderLilac}`,
    boxShadow: `${shadows.md}, ${shadows.lilacSoft}, ${shadows.innerLight}`,
  } as CSSProperties,
} as const;

// ── Accent Line Helpers ────────────────────────────────────────────
// The gold accent line is the Stellar brand signature.
export const accentLine = {
  /** Horizontal gold line — use as separator or underline */
  gold: (width: number | string = "100%"): CSSProperties => ({
    height: 2,
    width,
    background: gradients.goldLine,
    borderRadius: 1,
    boxShadow: "0 0 16px rgba(253, 218, 36, 0.15)",
  }),

  /** Subtle glow line at top of panels */
  topGlow: (color: "gold" | "teal" = "gold"): CSSProperties => ({
    position: "absolute" as const,
    top: 0,
    left: "10%",
    right: "10%",
    height: 1,
    background:
      color === "gold" ? gradients.goldLineSoft : `linear-gradient(90deg, transparent, ${colors.teal}20, transparent)`,
  }),

  /** Vertical accent bar for side decoration */
  sideBar: (color: "gold" | "teal" | "lilac" = "gold"): CSSProperties => ({
    position: "absolute" as const,
    left: 0,
    top: "15%",
    bottom: "15%",
    width: 3,
    background: gradients[`${color}Bar`],
    borderRadius: 2,
  }),
} as const;

// ── Glow Dot ───────────────────────────────────────────────────────
// Small glowing dot used as accent indicator.
export const glowDot = (
  color: string = colors.gold,
  size: number = 6,
): CSSProperties => ({
  width: size,
  height: size,
  borderRadius: "50%",
  backgroundColor: color,
  boxShadow: `0 0 ${size * 2}px ${color}`,
  opacity: 0.8,
});

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

  /** Standard scene content area with edge padding */
  sceneContent: {
    position: "absolute" as const,
    inset: 0,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: `${space.xxxl}px ${space.edge}px`,
  } as CSSProperties,

  /** Dim overlay for VIDEO+OVERLAY scenes */
  dimOverlay: (amount: number = 0.55): CSSProperties => ({
    position: "absolute" as const,
    inset: 0,
    backgroundColor: `rgba(8, 10, 18, ${amount})`,
  }),
} as const;

// ── Variant Color Map ──────────────────────────────────────────────
// Centralized color variants for badges, panels, and accents.
export type ColorVariant = "gold" | "teal" | "lilac" | "success" | "warning";

export const variants: Record<
  ColorVariant,
  {
    color: string;
    bg: string;
    border: string;
    glow: string;
    glowSoft: string;
  }
> = {
  gold: {
    color: colors.gold,
    bg: colors.goldDim,
    border: colors.borderGold,
    glow: shadows.goldMedium,
    glowSoft: shadows.goldSoft,
  },
  teal: {
    color: colors.teal,
    bg: colors.tealDim,
    border: colors.borderTeal,
    glow: shadows.tealMedium,
    glowSoft: shadows.tealSoft,
  },
  lilac: {
    color: colors.lilac,
    bg: colors.lilacDim,
    border: colors.borderLilac,
    glow: shadows.lilacMedium,
    glowSoft: shadows.lilacSoft,
  },
  success: {
    color: colors.success,
    bg: `${colors.success}10`,
    border: `${colors.success}18`,
    glow: shadows.successSoft,
    glowSoft: shadows.successSoft,
  },
  warning: {
    color: colors.warning,
    bg: `${colors.warning}0D`,
    border: `${colors.warning}18`,
    glow: shadows.warningSoft,
    glowSoft: shadows.warningSoft,
  },
};

// ── Noise Texture Overlay ──────────────────────────────────────────
// Adds film grain for cinematic depth. Use as an absolutely-positioned
// div on top of scenes with mix-blend-mode and low opacity.
export const noiseOverlay: CSSProperties = {
  position: "absolute",
  inset: 0,
  opacity: 0.03,
  mixBlendMode: "overlay",
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  backgroundSize: "128px 128px",
  pointerEvents: "none",
  zIndex: 50,
};
