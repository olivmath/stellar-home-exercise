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

  // Animated line width
  const lineWidth = interpolate(
    frame,
    [delay * fps, (delay + 0.8) * fps],
    [0, 80],
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
      {/* Accent line — animates width */}
      <div
        style={{
          height: 2.5,
          width: lineWidth,
          background: `linear-gradient(90deg, ${colors.stellar}, ${colors.cyan})`,
          borderRadius: 2,
          boxShadow: `0 0 12px ${colors.stellar}40`,
        }}
      />

      {/* Title */}
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

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            color: colors.textSecondary,
            fontSize: 16,
            fontFamily: fonts.body,
            fontWeight: 400,
            letterSpacing: 0.3,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
