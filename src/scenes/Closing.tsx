import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { fadeIn, slideIn } from "../animations/springs";
import { NetworkBackground } from "../components/NetworkBackground";

// ── Design tokens ───────────────────────────────────────────────────
const colors = {
  bgPrimary: "#050810",
  bgElevated: "#0A0E1A",
  bgGlass: "rgba(12, 16, 32, 0.72)",
  stellar: "#6366F1",
  stellarLight: "#818CF8",
  cyan: "#22D3EE",
  cyanDim: "rgba(34, 211, 238, 0.15)",
  success: "#34D399",
  warning: "#FB7185",
  gold: "#FBBF24",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textDim: "#475569",
  glowStellar:
    "0 0 40px rgba(99, 102, 241, 0.3), 0 0 80px rgba(99, 102, 241, 0.1)",
  glowCyan:
    "0 0 40px rgba(34, 211, 238, 0.25), 0 0 80px rgba(34, 211, 238, 0.08)",
  glowSuccess: "0 0 30px rgba(52, 211, 153, 0.25)",
  glowWarning: "0 0 30px rgba(251, 113, 133, 0.25)",
  borderSubtle: "rgba(148, 163, 184, 0.08)",
  borderAccent: "rgba(99, 102, 241, 0.2)",
  borderCyan: "rgba(34, 211, 238, 0.15)",
};

const fonts = {
  display: "'Outfit', sans-serif",
  body: "'Plus Jakarta Sans', sans-serif",
  code: "'IBM Plex Mono', monospace",
};

// ── Checklist Item ──────────────────────────────────────────────────
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
        gap: 18,
        fontSize: 28,
        fontFamily: fonts.display,
        fontWeight: 500,
        color: colors.textPrimary,
      }}
    >
      {/* Checkmark */}
      <span
        style={{
          color: colors.success,
          fontSize: 22,
          fontFamily: fonts.code,
          fontWeight: 700,
          opacity: anim.opacity,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: 8,
          background: `${colors.success}12`,
          border: `1px solid ${colors.success}30`,
          boxShadow: colors.glowSuccess,
        }}
      >
        &#10003;
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
  const line2 = slideIn(frame, fps, 0.8);
  const line3 = slideIn(frame, fps, 1.3);

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      {/* Name */}
      <div
        style={{
          opacity: line1.opacity,
          transform: `translateY(${line1.translateY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            color: colors.textPrimary,
            fontSize: 44,
            fontFamily: fonts.display,
            fontWeight: 800,
            letterSpacing: -0.5,
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
            background: `linear-gradient(90deg, ${colors.stellar}, ${colors.cyan})`,
            boxShadow: `0 0 20px ${colors.stellar}40, 0 0 40px ${colors.cyan}20`,
          }}
        />
      </div>

      {/* Tagline */}
      <span
        style={{
          opacity: line2.opacity,
          transform: `translateY(${line2.translateY}px)`,
          color: colors.textSecondary,
          fontSize: 22,
          fontFamily: fonts.body,
          fontWeight: 500,
          marginTop: 4,
        }}
      >
        I build developer experiences.
      </span>

      {/* Closing line */}
      <span
        style={{
          opacity: line3.opacity,
          transform: `translateY(${line3.translateY}px)`,
          color: colors.cyan,
          fontSize: 18,
          fontFamily: fonts.code,
          fontWeight: 500,
          marginTop: 12,
          letterSpacing: 0.5,
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
    "Cryptographic Identity",
    "Atomic Transactions",
    "Federated Consensus",
    "Smart Contracts",
    "Efficient Storage",
    "Privacy & zk-Proofs",
  ];

  // Cross-fade: checklist fades out from frame 360-420
  const checklistOpacity = interpolate(frame, [360, 420], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const finalOpacity = interpolate(frame, [360, 420], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        fontFamily: fonts.body,
      }}
    >
      {/* ── Checklist Phase (0-420) ────────────────────────────────── */}
      <Sequence from={0} durationInFrames={420}>
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
          {/* Section title */}
          <div
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontFamily: fonts.code,
              textTransform: "uppercase" as const,
              letterSpacing: 4,
              marginBottom: 20,
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

      {/* ── Final Statement Phase (360-609) ────────────────────────── */}
      <Sequence from={360} durationInFrames={249}>
        <AbsoluteFill
          style={{
            opacity: finalOpacity,
          }}
        >
          {/* Network background for depth */}
          <NetworkBackground opacity={0.3} speed={0.4} />

          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 80,
            }}
          >
            <FinalStatement />
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
