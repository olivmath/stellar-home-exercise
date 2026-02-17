import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn } from "../animations/springs";

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

  // Yellow highlight mark — brand signature
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
        gap: 20,
      }}
    >
      {/* Episode number — Anton condensed accent */}
      <div
        style={{
          color: colors.gold,
          fontSize: 16,
          fontFamily: fonts.accent,
          letterSpacing: 6,
          textTransform: "uppercase",
          textShadow: `0 0 24px rgba(253, 218, 36, 0.3)`,
        }}
      >
        EPISODE {number}
      </div>

      {/* Title — Lora serif */}
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        {/* Yellow highlight mark behind text — brand signature */}
        <div
          style={{
            position: "absolute",
            bottom: 2,
            left: -8,
            right: -8,
            height: 16,
            background: colors.gold,
            opacity: highlightWidth * 0.15,
            borderRadius: 2,
            transform: `scaleX(${highlightWidth})`,
            transformOrigin: "left",
          }}
        />
        <div
          style={{
            color: colors.textPrimary,
            fontSize: 52,
            fontFamily: fonts.display,
            fontWeight: 700,
            letterSpacing: -0.5,
            textAlign: "center",
            position: "relative",
          }}
        >
          {title}
        </div>
      </div>

      {/* Gold underline */}
      <div
        style={{
          height: 2,
          width: lineWidth,
          background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
          borderRadius: 2,
          boxShadow: `0 0 20px rgba(253, 218, 36, 0.2)`,
        }}
      />
    </div>
  );
};
