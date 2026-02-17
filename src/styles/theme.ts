// Design System — "Observatory" aesthetic
// Dark space observatory meets keynote tech talk

export const colors = {
  // Backgrounds
  bgPrimary: "#050810",
  bgElevated: "#0A0E1A",
  bgGlass: "rgba(12, 16, 32, 0.72)",
  bgGlassHover: "rgba(18, 24, 48, 0.85)",

  // Brand accents
  stellar: "#6366F1",       // Indigo — primary brand
  stellarLight: "#818CF8",
  cyan: "#22D3EE",          // Cyan — secondary
  cyanDim: "rgba(34, 211, 238, 0.15)",

  // Semantic
  success: "#34D399",
  warning: "#FB7185",
  gold: "#FBBF24",

  // Text
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textDim: "#475569",

  // Glow effects
  glowStellar: "0 0 40px rgba(99, 102, 241, 0.3), 0 0 80px rgba(99, 102, 241, 0.1)",
  glowCyan: "0 0 40px rgba(34, 211, 238, 0.25), 0 0 80px rgba(34, 211, 238, 0.08)",
  glowSuccess: "0 0 30px rgba(52, 211, 153, 0.25)",
  glowWarning: "0 0 30px rgba(251, 113, 133, 0.25)",

  // Borders
  borderSubtle: "rgba(148, 163, 184, 0.08)",
  borderAccent: "rgba(99, 102, 241, 0.2)",
  borderCyan: "rgba(34, 211, 238, 0.15)",
} as const;

// Google Fonts loaded via Remotion — distinctive, not generic
export const fonts = {
  // Display: geometric, sharp, cinematic
  display: "'Outfit', sans-serif",
  // Body: clean humanist, not Inter
  body: "'Plus Jakarta Sans', sans-serif",
  // Code: character, not JetBrains default
  code: "'IBM Plex Mono', monospace",
} as const;

// Font loading URLs for Remotion
export const fontUrls = [
  "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap",
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap",
];

export const timing = {
  fps: 30,
  episodes: {
    opening: { start: 0, duration: 10 },
    episode1: { start: 10, duration: 50 },
    episode2: { start: 60, duration: 50 },
    episode3: { start: 110, duration: 50 },
    episode4: { start: 160, duration: 60 },
    episode5: { start: 220, duration: 55 },
    closing: { start: 275, duration: 20.3 },
  },
  totalDuration: 295.3,
} as const;

export const secondsToFrames = (s: number) => s * timing.fps;
