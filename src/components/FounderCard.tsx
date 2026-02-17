import { useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { colors, fonts } from "../styles/theme";
import { slideIn } from "../animations/springs";

type Props = {
  name: string;
  subtitle: string;
  /** Filename in public/images/founders/ e.g. "jed-mccaleb.png" */
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
        border: `1px solid ${colors.borderAccent}`,
        borderRadius: 20,
        padding: "36px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        minWidth: 300,
        boxShadow: colors.glowStellar,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${colors.stellar}, transparent)`,
          borderRadius: 1,
        }}
      />

      {/* Avatar */}
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          overflow: "hidden",
          border: `2px solid ${colors.stellar}`,
          boxShadow: `0 0 24px ${colors.stellar}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: photo
            ? "transparent"
            : `linear-gradient(135deg, ${colors.stellar}, ${colors.cyan})`,
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
              fontSize: 38,
              fontFamily: fonts.display,
              fontWeight: 700,
              color: colors.textPrimary,
            }}
          >
            {name[0]}
          </span>
        )}
      </div>

      {/* Name */}
      <div
        style={{
          color: colors.textPrimary,
          fontSize: 26,
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
          color: colors.textSecondary,
          fontSize: 15,
          fontFamily: fonts.body,
          fontWeight: 500,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {subtitle}
      </div>

      {/* Logo tags */}
      {logos.length > 0 && (
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          {logos.map((logo) => (
            <div
              key={logo}
              style={{
                color: colors.cyan,
                fontSize: 12,
                fontFamily: fonts.code,
                fontWeight: 500,
                padding: "5px 12px",
                borderRadius: 8,
                background: colors.cyanDim,
                border: `1px solid ${colors.borderCyan}`,
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
