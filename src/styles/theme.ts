// Design System from BRAINSTORM.md

export const colors = {
  bgPrimary: "#0B0F1A",
  accent1: "#7C5CFF",
  accent2: "#00D4FF",
  success: "#00FFA3",
  warning: "#FF4D6D",
  textPrimary: "#E6EDF3",
  textSecondary: "#8B949E",
} as const;

export const fonts = {
  title: "Inter, Space Grotesk, sans-serif",
  body: "Inter, sans-serif",
  code: "JetBrains Mono, monospace",
} as const;

export const timing = {
  fps: 30,
  episodes: {
    opening: { start: 0, duration: 10 },
    episode1: { start: 10, duration: 50 },
    episode2: { start: 60, duration: 50 },
    episode3: { start: 110, duration: 50 },
    episode4: { start: 160, duration: 60 },
    episode5: { start: 220, duration: 60 },
    closing: { start: 280, duration: 20 },
  },
  totalDuration: 295.3,
} as const;

// Convert seconds to frames
export const secondsToFrames = (s: number) => s * timing.fps;
