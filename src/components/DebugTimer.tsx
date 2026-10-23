import { useCurrentFrame, useVideoConfig } from "remotion";
import { fonts } from "../styles/theme";

export const DebugTimer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  const min = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  const ms = Math.floor((sec % 1) * 100);

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        fontFamily: fonts.code,
        fontSize: 16,
        color: "rgba(167, 195, 255, 0.9)",
        background: "rgba(0, 0, 0, 0.6)",
        padding: "6px 14px",
        borderRadius: 8,
        zIndex: 200,
        letterSpacing: 1,
      }}
    >
      {String(min).padStart(2, "0")}:{String(s).padStart(2, "0")}.{String(ms).padStart(2, "0")} | f{frame}
    </div>
  );
};
