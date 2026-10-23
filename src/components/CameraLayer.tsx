import { OffthreadVideo, staticFile } from "remotion";
import { CameraBubble } from "./CameraBubble";
import { YOUTUBE_SAFE_AREA } from "../framework/timing";
import type { CameraConfig, SafeArea } from "../framework/types";

type Props = { config: CameraConfig; safeArea?: SafeArea; src?: string; children?: React.ReactNode };

export const CameraLayer: React.FC<Props> = ({ config, safeArea = YOUTUBE_SAFE_AREA, src = "STELLAR-SPEEDRUN.mp4", children }) => {
  if (config.mode === "hidden") return <>{children}</>;
  if (config.mode === "bubble") return <><CameraBubble config={config} safeArea={safeArea} src={src} />{children}</>;
  if (config.mode === "full") return <div style={{ position: "absolute", inset: 0, zIndex: config.zIndex ?? 0 }}><OffthreadVideo src={staticFile(src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />{children}</div>;
  return <div style={{ position: "absolute", left: safeArea.left, top: safeArea.top, width: 560, height: 952 - safeArea.bottom, overflow: "hidden", borderRadius: 24, zIndex: config.zIndex ?? 0 }}><OffthreadVideo src={staticFile(src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />{children}</div>;
};
