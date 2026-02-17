import { useCurrentFrame, useVideoConfig } from "remotion";
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

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 80,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          background: `linear-gradient(90deg, ${colors.accent1}, ${colors.accent2})`,
          height: 3,
          width: 60,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          color: colors.textPrimary,
          fontSize: 32,
          fontFamily: fonts.title,
          fontWeight: 700,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            color: colors.textSecondary,
            fontSize: 18,
            fontFamily: fonts.body,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
