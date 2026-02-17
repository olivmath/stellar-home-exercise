import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { colors } from "../styles/theme";
import { text, space, shadows, gradients, radius, layout } from "../styles/designSystem";
import { fadeIn, slideIn } from "../animations/springs";
import { NetworkBackground } from "../components/NetworkBackground";
import { LowerThird } from "../components/LowerThird";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to episode start (275.28s) ──
// closing narration: 275.28s → 295.04s
const EP = episodes.closing.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// -- Checklist Item -----------------------------------------------------------
const ChecklistItem: React.FC<{
  label: string;
  index: number;
}> = ({ label, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 0.4 + index * 0.4;
  const anim = slideIn(frame, fps, delay);

  return (
    <div
      style={{
        opacity: anim.opacity,
        transform: `translateY(${anim.translateY}px)`,
        display: "flex",
        alignItems: "center",
        gap: space.md,
        ...text.h2,
      }}
    >
      {/* Checkmark */}
      <span
        style={{
          color: colors.success,
          ...text.codeMD,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: radius.sm,
          background: `${colors.success}12`,
          border: `1px solid ${colors.success}30`,
          boxShadow: shadows.successSoft,
        }}
      >
        &#10003;
      </span>
      {label}
    </div>
  );
};

// -- Final Statement ----------------------------------------------------------
const FinalStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameAnim = slideIn(frame, fps, 0.3);
  const lineAnim = slideIn(frame, fps, 0.8);
  const closingAnim = slideIn(frame, fps, 1.3);

  // Gradient accent line expanding under the name
  const accentLineOpacity = fadeIn(frame, fps, 0.5);
  const accentLineWidth = interpolate(
    spring({
      frame: frame - fps * 0.5,
      fps,
      config: { damping: 22, mass: 0.5, stiffness: 70 },
    }),
    [0, 1],
    [0, 180]
  );

  const textShadow = `${shadows.sm}, 0 0 4px rgba(15, 15, 15, 0.6)`;

  return (
    <div
      style={{
        ...layout.centerColumn,
        gap: space.md,
      }}
    >
      {/* Name */}
      <div
        style={{
          opacity: nameAnim.opacity,
          transform: `translateY(${nameAnim.translateY}px)`,
          ...layout.centerColumn,
          gap: space.sm,
        }}
      >
        <span
          style={{
            ...text.h1,
            textShadow,
          }}
        >
          I am Lucas Bispo de Oliveira.
        </span>

        {/* Gradient accent line */}
        <div
          style={{
            opacity: accentLineOpacity,
            width: accentLineWidth,
            height: 2,
            borderRadius: 2,
            background: gradients.goldToTeal,
            boxShadow: `0 0 16px ${colors.gold}40, 0 0 32px ${colors.teal}20`,
          }}
        />
      </div>

      {/* Closing line */}
      <span
        style={{
          opacity: closingAnim.opacity,
          transform: `translateY(${closingAnim.translateY}px)`,
          ...text.accentSM,
          color: colors.teal,
          marginTop: space.xs,
          letterSpacing: 0.5,
          textShadow,
        }}
      >
        See you on the network.
      </span>
    </div>
  );
};

// -- Main Scene ---------------------------------------------------------------
export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checklistItems = [
    "Cryptographic Identity",
    "Atomic Transactions",
    "Federated Consensus",
    "Smart Contracts",
    "Efficient Storage",
    "Privacy & zk-Proofs",
  ];

  // Cross-fade between Phase 1 and Phase 2
  const crossfadeStart = rel(293.0) - 20; // start fading ~20 frames before cut
  const crossfadeEnd = rel(293.0);
  const checklistFadeOut = interpolate(frame, [crossfadeStart, crossfadeEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const finalFadeIn = interpolate(frame, [crossfadeStart, crossfadeEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* -- Phase 1: Checklist/ReviewShot (275.28s to 293.0s) -- ANIMATION FULL, solid bg hides video */}
      <Sequence from={0} durationInFrames={rel(293.0)}>
        <AbsoluteFill
          style={{
            backgroundColor: colors.bgPrimary,
            ...layout.centerColumn,
            gap: space.lg,
            padding: space.section,
            opacity: checklistFadeOut,
          }}
        >
          {/* Section title */}
          <div
            style={{
              ...text.accentSM,
              color: colors.warmGrey,
              marginBottom: space.md,
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

      {/* -- Phase 2: FinalStatement (293.0s to 295.04s) -- VIDEO FULL, face is the hero */}
      <Sequence from={rel(293.0)} durationInFrames={rel(295.04) - rel(293.0)}>
        <AbsoluteFill
          style={{
            backgroundColor: "rgba(15, 15, 15, 0.25)",
            opacity: finalFadeIn,
          }}
        >
          {/* Very subtle network atmosphere */}
          <NetworkBackground opacity={0.15} speed={0.4} />

          {/* Bottom-center positioned text overlay */}
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: space.edge,
            }}
          >
            <FinalStatement />
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
