import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  Img,
  staticFile,
} from "remotion";
import { colors, fonts } from "../styles/theme";

import { LowerThird } from "../components/LowerThird";

export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title fade + scale
  const titleProgress = interpolate(frame, [25, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(titleProgress, [0, 1], [0.92, 1]);

  // Subtitle
  const subtitleOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo
  const logoOpacity = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out everything before EP1 transition (starts at frame 240)
  const fadeOut = interpolate(frame, [252, 282], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      {/* Dark overlay — fades in with title, fades out before EP1 */}
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(15, 15, 15, ${titleProgress * fadeOut * 0.5})`,
        }}
      />

      {/* Central gold glow */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(253, 218, 36, 0.06) 0%, rgba(0, 167, 181, 0.02) 40%, transparent 70%)`,
          opacity: titleProgress * fadeOut,
          pointerEvents: "none",
        }}
      />

      {/* Title block */}
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div
          style={{
            opacity: titleProgress * fadeOut,
            transform: `scale(${titleScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          {/* Stellar logo */}
          <div style={{ opacity: logoOpacity }}>
            <Img
              src={staticFile("images/branding/stellar-logo.svg")}
              style={{ width: 72, height: 72, opacity: 0.9 }}
            />
          </div>

          {/* Main title — Lora serif with gold gradient */}
          <h1
            style={{
              fontSize: 96,
              fontFamily: fonts.display,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.white})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            Stellar Speed Run
          </h1>

          {/* Subtitle — Inter */}
          <div
            style={{
              opacity: subtitleOpacity,
              fontSize: 20,
              fontFamily: fonts.body,
              color: colors.warmGrey,
              letterSpacing: 8,
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            End-to-End in 5 Minutes
          </div>

          {/* Gold gradient underline — brand signature */}
          <div
            style={{
              width: interpolate(frame, [75, 125], [0, 240], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              height: 2,
              background: `linear-gradient(90deg, transparent, ${colors.gold}80, ${colors.gold}, ${colors.gold}80, transparent)`,
              borderRadius: 1,
              boxShadow: `0 0 20px rgba(253, 218, 36, 0.2)`,
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Lower third — fades out with everything else */}
      <Sequence from={125} durationInFrames={100}>
        <LowerThird title="A complete overview of the Stellar network" />
      </Sequence>
    </AbsoluteFill>
  );
};
