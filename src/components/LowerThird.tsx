import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors } from "../styles/theme";
import { fadeIn } from "../animations/springs";
import { text, space, shadows } from "../styles/designSystem";

type Props = {
  title: string;
  subtitle?: string;
  delay?: number;
};

export const LowerThird: React.FC<Props> = ({
  title,
  subtitle,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fadeIn(frame, fps, delay);

  const lineWidth = interpolate(
    frame,
    [delay * fps, (delay + 0.8) * fps],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 72,
        left: 72,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: space.sm + 2,
      }}
    >
      {/* Gold accent line */}
      <div
        style={{
          height: 2.5,
          width: lineWidth,
          background: colors.gold,
          borderRadius: 2,
          boxShadow: "0 0 16px rgba(253, 218, 36, 0.25)",
        }}
      />

      {/* Title */}
      <div style={{ ...text.h1 }}>
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div style={{ ...text.caption, color: colors.warmGrey }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};
