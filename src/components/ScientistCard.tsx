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
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${colors.borderTeal}`,
        borderRadius: 16,
        padding: "44px 56px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        boxShadow: colors.glowTeal,
        position: "relative",
        overflow: "hidden",
        maxWidth: 520,
      }}
    >
      {/* Left teal accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "15%",
          bottom: "15%",
          width: 3,
          background: `linear-gradient(180deg, transparent, ${colors.teal}, transparent)`,
          borderRadius: 2,
        }}
      />

      {/* Name — Lora serif */}
      <div
        style={{
          color: colors.textPrimary,
          fontSize: 34,
          fontFamily: fonts.display,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        {name}
      </div>

      {/* Institution — gold accent */}
      <div
        style={{
          color: colors.gold,
          fontSize: 15,
          fontFamily: fonts.body,
          fontWeight: 600,
          letterSpacing: 2.5,
          textTransform: "uppercase",
        }}
      >
        {institution}
      </div>

      {/* Gold divider */}
      <div
        style={{
          width: 40,
          height: 1.5,
          background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
          marginTop: 4,
          marginBottom: 4,
        }}
      />

      {/* Caption */}
      <div
        style={{
          color: colors.warmGrey,
          fontSize: 16,
          fontFamily: fonts.body,
          fontWeight: 400,
          textAlign: "center",
          lineHeight: 1.7,
          maxWidth: 400,
        }}
      >
        {caption}
      </div>
    </div>
  );
};
