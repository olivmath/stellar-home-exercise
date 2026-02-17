import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn } from "../animations/springs";

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

  // Gold accent line — Stellar signature
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
        gap: 10,
      }}
    >
      {/* Gold accent line */}
      <div
        style={{
          height: 2.5,
          width: lineWidth,
          background: colors.gold,
          borderRadius: 2,
          boxShadow: `0 0 16px rgba(253, 218, 36, 0.3)`,
        }}
      />

      {/* Title — Lora serif */}
      <div
        style={{
          color: colors.textPrimary,
          fontSize: 30,
          fontFamily: fonts.display,
          fontWeight: 700,
          letterSpacing: -0.3,
        }}
      >
        {title}
      </div>

      {/* Subtitle — Inter */}
      {subtitle && (
        <div
          style={{
            color: colors.warmGrey,
            fontSize: 16,
            fontFamily: fonts.body,
            fontWeight: 400,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
