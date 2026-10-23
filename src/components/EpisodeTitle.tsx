import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors } from "../styles/theme";
import { fadeIn } from "../animations/springs";
import { text, divider, space } from "../styles/designSystem";

type Props = {
  number: string;
  title: string;
  delay?: number;
};

export const EpisodeTitle: React.FC<Props> = ({
  number,
  title,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeIn(frame, fps, delay);

  const lineWidth = interpolate(
    frame,
    [delay * fps + 10, (delay + 1) * fps],
    [0, 160],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const highlightWidth = interpolate(
    frame,
    [(delay + 0.5) * fps, (delay + 1.2) * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: space.lg,
      }}
    >
      {/* Episode number */}
      <div
        style={{
          ...text.overlineSM,
          color: colors.accent,
          textShadow: "0 0 24px rgba(253, 218, 36, 0.25)",
        }}
      >
        EPISODE {number}
      </div>

      {/* Title */}
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Blue highlight mark — brand signature */}
        <div
          style={{
            position: "absolute",
            bottom: 2,
            left: -8,
            right: -8,
            height: 16,
            background: colors.accent,
            opacity: highlightWidth * 0.12,
            borderRadius: 2,
            transform: `scaleX(${highlightWidth})`,
            transformOrigin: "left",
          }}
        />
        <div
          style={{
            ...text.displayMD,
            textAlign: "center",
            position: "relative",
          }}
        >
          {title}
        </div>
      </div>

      {/* Blue underline */}
      <div style={divider.accent(lineWidth)} />
    </div>
  );
};
