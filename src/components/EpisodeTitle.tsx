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
    [0, 120],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Episode number */}
      <div
        style={{
          color: colors.stellar,
          fontSize: 14,
          fontFamily: fonts.code,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        Episode {number}
      </div>

      {/* Title */}
      <div
        style={{
          color: colors.textPrimary,
          fontSize: 48,
          fontFamily: fonts.display,
          fontWeight: 800,
          letterSpacing: -1,
          textAlign: "center",
        }}
      >
        {title}
      </div>

      {/* Gradient underline */}
      <div
        style={{
          height: 2.5,
          width: lineWidth,
          background: `linear-gradient(90deg, ${colors.stellar}, ${colors.cyan})`,
          borderRadius: 2,
          boxShadow: `0 0 16px ${colors.stellar}30`,
        }}
      />
    </div>
  );
};
