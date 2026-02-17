import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../styles/theme";
import { slideIn } from "../animations/springs";
import { text, glass, accentLine, gradients, space } from "../styles/designSystem";

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
        ...glass.teal,
        padding: `${space.xxl}px ${space.xxxl - 8}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: space.md,
        maxWidth: 520,
      }}
    >
      {/* Left teal accent bar */}
      <div style={accentLine.sideBar("teal")} />

      {/* Name */}
      <div style={{ ...text.h1 }}>
        {name}
      </div>

      {/* Institution */}
      <div
        style={{
          ...text.label,
          color: colors.gold,
          letterSpacing: 2.5,
        }}
      >
        {institution}
      </div>

      {/* Gold divider */}
      <div
        style={{
          width: 44,
          height: 1.5,
          background: gradients.goldLineSoft,
          marginTop: space.xs,
          marginBottom: space.xs,
        }}
      />

      {/* Caption */}
      <div
        style={{
          ...text.bodySM,
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
