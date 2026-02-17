import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../styles/theme";
import { slideIn } from "../animations/springs";

type Props = {
  name: string;
  institution: string;
  caption: string;
  delay?: number;
};

export const ScientistCard: React.FC<Props> = ({
  name,
  institution,
  caption,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, delay);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        background: "rgba(0, 212, 255, 0.06)",
        border: "1px solid rgba(0, 212, 255, 0.2)",
        borderRadius: 16,
        padding: "32px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          color: colors.textPrimary,
          fontSize: 28,
          fontFamily: fonts.title,
          fontWeight: 700,
        }}
      >
        {name}
      </div>
      <div
        style={{
          color: colors.accent2,
          fontSize: 18,
          fontFamily: fonts.body,
        }}
      >
        {institution}
      </div>
      <div
        style={{
          color: colors.textSecondary,
          fontSize: 15,
          fontFamily: fonts.code,
          marginTop: 8,
          padding: "6px 14px",
          borderRadius: 8,
          background: "rgba(255,255,255,0.04)",
        }}
      >
        {caption}
      </div>
    </div>
  );
};
