import { useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { colors } from "../styles/theme";
import { slideIn } from "../animations/springs";
import { text, glass, accentLine, gradients, shadows, radius, space, variants } from "../styles/designSystem";

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
        ...glass.gold,
        padding: `${space.xxl}px ${space.xxxl - 8}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: space.lg - 2,
        width: 380,
      }}
    >
      {/* Top gold accent line */}
      <div style={accentLine.topGlow("gold")} />

      {/* Avatar with gold ring */}
      <div
        style={{
          width: 240,
          height: 240,
          borderRadius: radius.circle,
          overflow: "hidden",
          border: `2.5px solid ${colors.gold}`,
          boxShadow: `${shadows.goldMedium}, ${shadows.lg}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: photo
            ? "transparent"
            : gradients.goldToTeal,
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
              ...text.displayMD,
              color: colors.black,
            }}
          >
            {name[0]}
          </span>
        )}
      </div>

      {/* Name */}
      <div style={{ ...text.h2 }}>
        {name}
      </div>

      {/* Role */}
      <div
        style={{
          ...text.label,
          color: colors.warmGrey,
          letterSpacing: 2,
        }}
      >
        {subtitle}
      </div>

      {/* Logo tags */}
      {logos.length > 0 && (
        <div style={{ display: "flex", gap: space.sm + 2, marginTop: space.sm }}>
          {logos.map((logo) => (
            <div
              key={logo}
              style={{
                ...text.codeSM,
                color: colors.teal,
                padding: `${space.sm - 2}px ${space.md - 2}px`,
                borderRadius: radius.sm,
                background: variants.teal.bg,
                border: `1px solid ${variants.teal.border}`,
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
