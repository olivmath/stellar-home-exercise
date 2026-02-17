import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors } from "../styles/theme";
import { text, accentLine, gradients, noiseOverlay, space, layout } from "../styles/designSystem";

type Props = {
  episode: number;
  title: string;
  subtitle: string;
};

export const EpisodeTransition: React.FC<Props> = ({ episode, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fade in/out envelope
  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Episode number scale-in
  const numberScale = interpolate(frame, [8, 22], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const numberOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title slide-up
  const titleY = interpolate(frame, [14, 28], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [14, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle slide-up
  const subtitleY = interpolate(frame, [22, 36], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleOpacity = interpolate(frame, [22, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gold underline expand
  const lineWidth = interpolate(frame, [28, 44], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgDeep,
        opacity,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ambient gold orb */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "30%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: gradients.goldOrb,
          opacity: 0.6,
        }}
      />
      {/* Ambient teal orb */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "25%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: gradients.tealOrb,
          opacity: 0.5,
        }}
      />

      {/* Film grain */}
      <div style={noiseOverlay} />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: space.md,
          zIndex: 1,
        }}
      >
        {/* EP number */}
        <div
          style={{
            ...text.accentLG,
            color: colors.gold,
            transform: `scale(${numberScale})`,
            opacity: numberOpacity,
            textShadow: "0 0 30px rgba(253, 218, 36, 0.2)",
          }}
        >
          Episode {String(episode).padStart(2, "0")}
        </div>

        {/* Title */}
        <h1
          style={{
            ...text.displayXL,
            margin: 0,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <div
          style={{
            ...text.caption,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {subtitle}
        </div>

        {/* Gold underline */}
        <div style={accentLine.gold(lineWidth)} />
      </div>
    </AbsoluteFill>
  );
};
