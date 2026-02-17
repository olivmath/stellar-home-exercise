import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors, fonts } from "../styles/theme";

type Props = {
  episode: number;
  title: string;
  subtitle: string;
};

export const EpisodeTransition: React.FC<Props> = ({ episode, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fade in: first 10 frames
  // Fade out: last 10 frames
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

  // Title slide-up
  const titleY = interpolate(frame, [14, 28], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [14, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle slide-up (after title)
  const subtitleY = interpolate(frame, [22, 36], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleOpacity = interpolate(frame, [22, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gold underline expand
  const lineWidth = interpolate(frame, [28, 44], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        opacity,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* EP number */}
        <div
          style={{
            fontFamily: fonts.accent,
            fontSize: 28,
            color: colors.gold,
            letterSpacing: 6,
            textTransform: "uppercase",
            transform: `scale(${numberScale})`,
          }}
        >
          Episode {String(episode).padStart(2, "0")}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: 64,
            fontWeight: 700,
            color: colors.white,
            margin: 0,
            letterSpacing: -1,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 24,
            fontWeight: 400,
            color: colors.warmGrey,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {subtitle}
        </div>

        {/* Gold underline */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${colors.gold}80, ${colors.gold}, ${colors.gold}80, transparent)`,
            borderRadius: 1,
            boxShadow: `0 0 20px rgba(253, 218, 36, 0.2)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
