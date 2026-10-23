import type { SafeArea } from "./types";

export const FPS = 30;
export const COMPOSITION = { width: 1920, height: 1080 } as const;
export const YOUTUBE_SAFE_AREA: SafeArea = { top: 64, right: 80, bottom: 150, left: 80 };

export const secondsToFrames = (seconds: number, fps = FPS) => Math.round(seconds * fps);
export const framesToSeconds = (frames: number, fps = FPS) => frames / fps;
export const episodeEnd = (start: number, duration: number) => start + duration;
export const safeAreaBounds = (safeArea: SafeArea = YOUTUBE_SAFE_AREA) => ({
  left: safeArea.left,
  top: safeArea.top,
  right: COMPOSITION.width - safeArea.right,
  bottom: COMPOSITION.height - safeArea.bottom,
  width: COMPOSITION.width - safeArea.left - safeArea.right,
  height: COMPOSITION.height - safeArea.top - safeArea.bottom,
});
export const clampToSafeArea = (value: number, size: number, axis: "x" | "y", safeArea = YOUTUBE_SAFE_AREA) => {
  const bounds = safeAreaBounds(safeArea);
  const min = axis === "x" ? bounds.left : bounds.top;
  const max = (axis === "x" ? bounds.right : bounds.bottom) - size;
  return Math.min(Math.max(value, min), max);
};
