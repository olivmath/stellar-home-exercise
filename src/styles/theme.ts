// ─── Stellar Brand Design System ─────────────────────────────────────
// Based on Stellar Brand Manual 2025
// "Helpful design is humble, not invisible"

export const colors = {
  // ── Backgrounds ──
  bgPrimary: "#0F0F0F",         // Stellar Black
  bgDeep: "#080A12",            // Deeper navy-black for contrast
  bgElevated: "#1A1A22",        // Slightly lifted surface
  bgGlass: "rgba(15, 15, 15, 0.75)",
  bgGlassLight: "rgba(253, 218, 36, 0.04)",

  // ── Primary Brand ──
  gold: "#FDDA24",              // Generous Gold — the signature
  goldDim: "rgba(253, 218, 36, 0.12)",
  goldMuted: "rgba(253, 218, 36, 0.25)",
  black: "#0F0F0F",             // Stellar Black
  white: "#F6F7F8",             // Stellar White

  // ── Secondary Palette ──
  lilac: "#B7ACE8",             // Lilac
  lilacDim: "rgba(183, 172, 232, 0.12)",
  teal: "#00A7B5",              // Teal
  tealDim: "rgba(0, 167, 181, 0.12)",
  warmGrey: "#D6D2C4",          // Warm Grey
  navy: "#002E5D",              // Navy

  // ── Semantic ──
  success: "#34D399",
  warning: "#FB7185",

  // ── Text ──
  textPrimary: "#F6F7F8",       // Stellar White
  textSecondary: "#D6D2C4",     // Warm Grey
  textDim: "#7A7770",           // Muted warm
  textGold: "#FDDA24",          // Gold highlights

  // ── Glow Effects ──
  glowGold: "0 0 40px rgba(253, 218, 36, 0.2), 0 0 80px rgba(253, 218, 36, 0.06)",
  glowTeal: "0 0 40px rgba(0, 167, 181, 0.2), 0 0 80px rgba(0, 167, 181, 0.06)",
  glowLilac: "0 0 40px rgba(183, 172, 232, 0.2), 0 0 80px rgba(183, 172, 232, 0.06)",
  glowSuccess: "0 0 30px rgba(52, 211, 153, 0.2)",
  glowWarning: "0 0 30px rgba(251, 113, 133, 0.2)",

  // ── Borders ──
  borderSubtle: "rgba(214, 210, 196, 0.08)",
  borderGold: "rgba(253, 218, 36, 0.2)",
  borderTeal: "rgba(0, 167, 181, 0.2)",
  borderLilac: "rgba(183, 172, 232, 0.15)",
} as const;

// ── Typography ──
// Lora: serif headlines (elegant, enterprise-friendly)
// Inter: body text and captions (clean, readable)
// Anton: condensed accent/callouts (impact, ALL CAPS)
export const fonts = {
  display: "'Lora', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
  accent: "'Anton', Impact, sans-serif",
  code: "'IBM Plex Mono', 'Courier New', monospace",
} as const;

// Google Fonts URLs
export const fontUrls = [
  "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
  "https://fonts.googleapis.com/css2?family=Anton&display=swap",
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap",
];

// ── Timing (from audioMarks.ts) ──
export const timing = {
  fps: 30,
  totalDuration: 295.3,
} as const;

export const secondsToFrames = (s: number) => s * timing.fps;
