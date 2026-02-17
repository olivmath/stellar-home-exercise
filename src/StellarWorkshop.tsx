import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export const StellarWorkshop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0D1117",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: 64,
          fontFamily: "sans-serif",
        }}
      >
        Stellar Speed Run
      </h1>
      <p style={{ color: "#8B949E", fontSize: 24 }}>
        Frame {frame} | {seconds.toFixed(1)}s
      </p>
    </AbsoluteFill>
  );
};
