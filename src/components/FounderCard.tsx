import { useCurrentFrame, useVideoConfig, Img } from "remotion";
import { colors, fonts } from "../styles/theme";
import { slideIn } from "../animations/springs";

type Props = {
  name: string;
  subtitle: string;
  logos?: string[];
  delay?: number;
};

export const FounderCard: React.FC<Props> = ({
  name,
  subtitle,
  logos = [],
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
        background: "rgba(124, 92, 255, 0.08)",
        border: "1px solid rgba(124, 92, 255, 0.25)",
        borderRadius: 16,
        padding: "28px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        minWidth: 260,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${colors.accent1}, ${colors.accent2})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          color: colors.textPrimary,
          fontFamily: fonts.title,
          fontWeight: 700,
        }}
      >
        {name[0]}
      </div>
      <div
        style={{
          color: colors.textPrimary,
          fontSize: 24,
          fontFamily: fonts.title,
          fontWeight: 700,
        }}
      >
        {name}
      </div>
      <div
        style={{
          color: colors.textSecondary,
          fontSize: 16,
          fontFamily: fonts.body,
        }}
      >
        {subtitle}
      </div>
      {logos.length > 0 && (
        <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
          {logos.map((logo) => (
            <div
              key={logo}
              style={{
                color: colors.accent2,
                fontSize: 13,
                fontFamily: fonts.code,
                padding: "4px 10px",
                borderRadius: 6,
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
              }}
            >
              {logo}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
