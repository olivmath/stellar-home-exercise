import React from "react";
import { useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { colors } from "../styles/theme";
import { slideIn } from "../animations/springs";
import { text, panel, divider, space } from "../styles/designSystem";

type Props = {
  name: string;
  institution: string;
  caption: string;
  photo?: string;
  delay?: number;
};

export const ScientistCard: React.FC<Props> = ({
  name,
  institution,
  caption,
  photo,
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
        ...panel.base,
        padding: `${space.xxl}px ${space.xxxl - 8}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: space.md,
        maxWidth: 520,
      }}
    >
      {photo ? (
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            overflow: "hidden",
            border: `2.5px solid ${colors.gold}`,
            flexShrink: 0,
          }}
        >
          <Img
            src={staticFile(`images/scientists/${photo}`)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ) : (
        <div style={divider.accent()} />
      )}

      <div style={{ ...text.h1 }}>
        {name}
      </div>

      <div
        style={{
          ...text.label,
          color: colors.gold,
          letterSpacing: 2.5,
        }}
      >
        {institution}
      </div>

      <div
        style={{
          ...divider.gold(44),
          marginTop: space.xs,
          marginBottom: space.xs,
        }}
      />

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
