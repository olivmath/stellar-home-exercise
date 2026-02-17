import { useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { colors, fonts } from "../styles/theme";
import { slideIn } from "../animations/springs";

type Props = {
  name: string;
  subtitle: string;
  photo?: string;
  logos?: string[];
  delay?: number;
};

export const FounderCard: React.FC<Props> = ({
  name,
  subtitle,
  photo,
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
        background: colors.bgGlass,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${colors.borderGold}`,
        borderRadius: 16,
        padding: "48px 56px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        width: 380,
        boxShadow: colors.glowGold,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gold accent line — brand signature */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
          borderRadius: 1,
        }}
      />

      {/* Avatar with gold ring */}
      <div
        style={{
          width: 240,
          height: 240,
          borderRadius: "50%",
          overflow: "hidden",
          border: `2.5px solid ${colors.gold}`,
          boxShadow: `0 0 28px rgba(253, 218, 36, 0.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: photo
            ? "transparent"
            : `linear-gradient(135deg, ${colors.gold}, ${colors.teal})`,
        }}
      >
        {photo ? (
          <Img
            src={staticFile(`images/founders/${photo}`)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span
            style={{
              fontSize: 40,
              fontFamily: fonts.display,
              fontWeight: 700,
              color: colors.black,
            }}
          >
            {name[0]}
          </span>
        )}
      </div>

      {/* Name — Lora serif */}
      <div
        style={{
          color: colors.textPrimary,
          fontSize: 28,
          fontFamily: fonts.display,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        {name}
      </div>

      {/* Role */}
      <div
        style={{
          color: colors.warmGrey,
          fontSize: 14,
          fontFamily: fonts.body,
          fontWeight: 500,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {subtitle}
      </div>

      {/* Logo tags — teal variant */}
      {logos.length > 0 && (
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          {logos.map((logo) => (
            <div
              key={logo}
              style={{
                color: colors.teal,
                fontSize: 12,
                fontFamily: fonts.code,
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: 8,
                background: colors.tealDim,
                border: `1px solid ${colors.borderTeal}`,
                letterSpacing: 0.5,
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
