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
        background: colors.bgGlass,
        border: `1px solid ${colors.borderCyan}`,
        borderRadius: 20,
        padding: "40px 52px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        boxShadow: colors.glowCyan,
        position: "relative",
        overflow: "hidden",
        maxWidth: 520,
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "15%",
          bottom: "15%",
          width: 3,
          background: `linear-gradient(180deg, transparent, ${colors.cyan}, transparent)`,
          borderRadius: 2,
        }}
      />

      {/* Quotation mark decorative */}
      <div
        style={{
          color: colors.cyan,
          fontSize: 48,
          fontFamily: fonts.display,
          fontWeight: 300,
          lineHeight: 1,
          opacity: 0.25,
          marginBottom: -8,
        }}
      >
        "
      </div>

      {/* Name */}
      <div
        style={{
          color: colors.textPrimary,
          fontSize: 32,
          fontFamily: fonts.display,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        {name}
      </div>

      {/* Institution */}
      <div
        style={{
          color: colors.cyan,
          fontSize: 16,
          fontFamily: fonts.body,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {institution}
      </div>

      {/* Divider */}
      <div
        style={{
          width: 40,
          height: 1,
          background: colors.borderCyan,
          marginTop: 4,
          marginBottom: 4,
        }}
      />

      {/* Caption */}
      <div
        style={{
          color: colors.textSecondary,
          fontSize: 16,
          fontFamily: fonts.code,
          fontWeight: 400,
          textAlign: "center",
          lineHeight: 1.6,
          maxWidth: 400,
        }}
      >
        {caption}
      </div>
    </div>
  );
};
