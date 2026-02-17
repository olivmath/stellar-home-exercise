import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";
import { colors, fonts } from "../styles/theme";
import { NetworkBackground } from "../components/NetworkBackground";
import { LowerThird } from "../components/LowerThird";

export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title fade + scale
  const titleProgress = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);

  // Subtitle
  const subtitleOpacity = interpolate(frame, [85, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      {/* Living network background */}
      <NetworkBackground
        opacity={interpolate(frame, [0, 60], [0, 1], {
          extrapolateRight: "clamp",
        })}
      />

      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${colors.stellar}12 0%, ${colors.cyan}04 40%, transparent 70%)`,
          opacity: titleProgress,
        }}
      />

      {/* Title block */}
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div
          style={{
            opacity: titleProgress,
            transform: `scale(${titleScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Main title */}
          <h1
            style={{
              fontSize: 96,
              fontFamily: fonts.display,
              fontWeight: 900,
              background: `linear-gradient(135deg, ${colors.stellarLight}, ${colors.cyan})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Stellar Speed Run
          </h1>

          {/* Subtitle */}
          <div
            style={{
              opacity: subtitleOpacity,
              fontSize: 22,
              fontFamily: fonts.body,
              color: colors.textSecondary,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            End-to-End in 5 Minutes
          </div>

          {/* Thin accent line */}
          <div
            style={{
              width: interpolate(frame, [90, 140], [0, 200], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              height: 1.5,
              background: `linear-gradient(90deg, transparent, ${colors.stellar}80, ${colors.cyan}80, transparent)`,
              borderRadius: 1,
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Lower third */}
      <Sequence from={140} durationInFrames={160}>
        <LowerThird title="A complete overview of the Stellar network" />
      </Sequence>
    </AbsoluteFill>
  );
};
