import { OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { clampToSafeArea, YOUTUBE_SAFE_AREA } from "../framework/timing";
import type { CameraConfig, SafeArea } from "../framework/types";
import { floripaTokens } from "../design/tokens";

type Props = {
  config?: CameraConfig;
  safeArea?: SafeArea;
  src?: string;
  style?: React.CSSProperties;
};

const borderColors = {
  none: "transparent",
  white: floripaTokens.colors.white,
  blue: floripaTokens.colors.blue,
  floripa: `linear-gradient(135deg, ${floripaTokens.colors.lightBlue}, ${floripaTokens.colors.blue})`,
} as const;

export const CameraBubble: React.FC<Props> = ({ config = { mode: "bubble" }, safeArea = YOUTUBE_SAFE_AREA, src = "STELLAR-SPEEDRUN.mp4", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const size = config.size ?? 300;
  const position = config.position ?? "bottom-right";
  const offset = 24;
  const rawX = position.endsWith("right") ? 1920 - safeArea.right - size - offset : safeArea.left + offset;
  const rawY = position.startsWith("bottom") ? 1080 - safeArea.bottom - size - offset : safeArea.top + offset;
  const left = clampToSafeArea(rawX, size, "x", safeArea);
  const top = clampToSafeArea(rawY, size, "y", safeArea);
  const enterFrames = config.enter === "scale" ? 12 : config.enter === "slide" ? 14 : 10;
  const enter = interpolate(frame, [0, enterFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const transform = config.enter === "scale" ? `scale(${0.86 + enter * 0.14})` : config.enter === "slide" ? `translateY(${(1 - enter) * 28}px)` : undefined;
  const border = config.border ?? "floripa";

  return (
    <div style={{ position: "absolute", left, top, width: size, height: size, borderRadius: config.shape === "rounded" ? 24 : "50%", overflow: "hidden", border: border === "floripa" ? "3px solid transparent" : `3px solid ${borderColors[border]}`, background: borderColors[border], boxShadow: config.shadow === false ? undefined : floripaTokens.shadows.md, opacity: enter, transform, zIndex: config.zIndex ?? 100, ...style }}>
      <OffthreadVideo src={staticFile(src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
};
