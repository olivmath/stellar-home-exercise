// ─── Stellar Design System · Theme ──────────────────────────────────
// Corporate institutional tone. Clean, restrained, authoritative.
// References: Bloomberg, McKinsey, Deloitte editorial standards.

export const colors = {
  // ── Backgrounds ──
  bgPrimary: "#0B0B0F",
  bgDeep: "#070709",
  bgElevated: "#131318",
  bgSurface: "#18181E",
  bgGlass: "rgba(11, 11, 15, 0.82)",

  // ── Brand ──
  gold: "#C9A84C",               // Muted institutional gold
  goldDim: "rgba(201, 168, 76, 0.08)",
  goldMuted: "rgba(201, 168, 76, 0.18)",

  black: "#0B0B0F",
  white: "#ECEDEF",
  offWhite: "#C8C9CC",

  // ── Accents ──
  slate: "#6B7280",
  slateLight: "#9CA3AF",
  steel: "#3B4252",
  warmGrey: "#A8A4A0",
  coolGrey: "#6E7179",

  // ── Semantic ──
  positive: "#5CB88A",
  negative: "#D4696E",
  info: "#6B9BD2",

  // ── Text ──
  textPrimary: "#ECEDEF",
  textSecondary: "#9DA0A7",
  textDim: "#5C5F66",
  textAccent: "#C9A84C",

  // ── Borders ──
  borderSubtle: "rgba(255, 255, 255, 0.06)",
  borderMedium: "rgba(255, 255, 255, 0.10)",
  borderAccent: "rgba(201, 168, 76, 0.15)",

  // ── Shadows ──
  shadowSm: "0 1px 4px rgba(0, 0, 0, 0.4)",
  shadowMd: "0 4px 16px rgba(0, 0, 0, 0.5)",
  shadowLg: "0 8px 32px rgba(0, 0, 0, 0.55)",
  shadowAccent: "0 0 24px rgba(201, 168, 76, 0.06)",
} as const;

// ── Typography ──────────────────────────────────────────────────────
// Source Serif 4: editorial credibility without decoration
// Inter: neutral workhorse — Bloomberg/Stripe standard
// IBM Plex Mono: institutional code/data font
export const fonts = {
  display: "'Source Serif 4', Georgia, serif",
  body: "'Inter', 'Helvetica Neue', sans-serif",
  accent: "'Inter', 'Helvetica Neue', sans-serif",
  code: "'IBM Plex Mono', 'Courier New', monospace",
} as const;

export const fontUrls = [
  "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap",
];

// ── Timing ──────────────────────────────────────────────────────────
export const timing = {
  fps: 30,
  totalDuration: 295.3,
} as const;

export const secondsToFrames = (s: number) => s * timing.fps;