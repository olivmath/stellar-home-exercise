import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn, slideIn } from "../animations/springs";

// ── Checklist Item ──────────────────────────────────────────────────
const ChecklistItem: React.FC<{
  label: string;
  index: number;
}> = ({ label, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 0.4 + index * 0.4;
  const progress = spring({
    frame: frame - delay * fps,
    fps,
    config: { damping: 16, mass: 0.5, stiffness: 100 },
  });

  const translateX = (1 - progress) * 40;

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateX(${translateX}px)`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontSize: 28,
        fontFamily: fonts.body,
        fontWeight: 500,
        color: colors.textPrimary,
      }}
    >
      <span
        style={{
          fontSize: 24,
          opacity: progress,
          transform: `scale(${progress})`,
          display: "inline-block",
        }}
      >
        {"\u2705"}
      </span>
      {label}
    </div>
  );
};

// ── Final Statement ─────────────────────────────────────────────────
const FinalStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = slideIn(frame, fps, 0.3);
  const line2 = slideIn(frame, fps, 0.9);
  const line3 = slideIn(frame, fps, 1.5);

  // Gradient accent line under the name
  const accentLineOpacity = fadeIn(frame, fps, 0.6);
  const accentLineWidth = interpolate(
    spring({
      frame: frame - fps * 0.6,
      fps,
      config: { damping: 20, mass: 0.5, stiffness: 80 },
    }),
    [0, 1],
    [0, 320]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {/* Name line */}
      <div
        style={{
          opacity: line1.opacity,
          transform: `translateY(${line1.translateY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            color: colors.textPrimary,
            fontSize: 44,
            fontFamily: fonts.title,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          I am Lucas Bispo de Oliveira.
        </span>

        {/* Gradient accent line */}
        <div
          style={{
            opacity: accentLineOpacity,
            width: accentLineWidth,
            height: 3,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${colors.accent1}, ${colors.accent2}, ${colors.success})`,
          }}
        />
      </div>

      {/* Tagline */}
      <span
        style={{
          opacity: line2.opacity,
          transform: `translateY(${line2.translateY}px)`,
          color: colors.textSecondary,
          fontSize: 30,
          fontFamily: fonts.body,
          fontWeight: 400,
        }}
      >
        I build developer experiences.
      </span>

      {/* Closing */}
      <span
        style={{
          opacity: line3.opacity,
          transform: `translateY(${line3.translateY}px)`,
          color: colors.accent2,
          fontSize: 28,
          fontFamily: fonts.code,
          fontWeight: 600,
          marginTop: 16,
        }}
      >
        See you on the network.
      </span>
    </div>
  );
};

// ── Main Scene ──────────────────────────────────────────────────────
export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checklistItems = [
    "Identity",
    "Transactions",
    "Consensus",
    "Smart Contracts",
    "Storage Model",
    "Privacy",
  ];

  // Cross-fade: checklist fades out, final statement fades in
  const transitionStart = fps * 12;
  const transitionEnd = fps * 14;
  const checklistOpacity = interpolate(
    frame,
    [transitionStart, transitionEnd],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const finalOpacity = interpolate(
    frame,
    [transitionStart, transitionEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        fontFamily: fonts.body,
      }}
    >
      {/* ── Checklist Phase (0s–14s) ─────────────────────────────── */}
      <Sequence from={0} durationInFrames={transitionEnd}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            padding: 80,
            opacity: checklistOpacity,
          }}
        >
          {/* Section label */}
          <div
            style={{
              color: colors.textSecondary,
              fontSize: 16,
              fontFamily: fonts.code,
              textTransform: "uppercase" as const,
              letterSpacing: 3,
              marginBottom: 16,
              opacity: fadeIn(frame, fps, 0.1),
            }}
          >
            What We Covered
          </div>

          {checklistItems.map((item, i) => (
            <ChecklistItem key={item} label={item} index={i} />
          ))}
        </AbsoluteFill>
      </Sequence>

      {/* ── Final Statement Phase (12s–20s) ──────────────────────── */}
      <Sequence from={transitionStart} durationInFrames={fps * 20 - transitionStart}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 80,
            opacity: finalOpacity,
          }}
        >
          <FinalStatement />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
