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
import { fadeIn, slideIn, scaleIn } from "../animations/springs";
import { ScientistCard } from "../components/ScientistCard";
import { Badge } from "../components/Badge";

// ── Stack Architecture ──────────────────────────────────────────────
const StackLayer: React.FC<{
  label: string;
  index: number;
  color: string;
}> = ({ label, index, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 0.6 + index * 0.5;
  const progress = spring({
    frame: frame - delay * fps,
    fps,
    config: { damping: 18, mass: 0.6, stiffness: 100 },
  });

  const opacity = progress;
  const translateY = (1 - progress) * -60;
  const scale = interpolate(progress, [0, 1], [0.85, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        background: `${color}12`,
        border: `2px solid ${color}50`,
        borderRadius: 16,
        padding: "28px 64px",
        color: colors.textPrimary,
        fontSize: 30,
        fontFamily: fonts.code,
        fontWeight: 700,
        textAlign: "center" as const,
        width: 340,
        position: "relative" as const,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          borderRadius: "16px 0 0 16px",
          background: color,
        }}
      />
      {label}
    </div>
  );
};

// ── TTL Storage Animation ───────────────────────────────────────────
const TTLConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxAppear = fadeIn(frame, fps, 0.3);
  const timerProgress = interpolate(frame, [fps * 0.8, fps * 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const branchReveal = spring({
    frame: frame - fps * 3.5,
    fps,
    config: { damping: 20, mass: 0.5, stiffness: 80 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
      }}
    >
      {/* Storage Box */}
      <div
        style={{
          opacity: boxAppear,
          background: `${colors.accent2}10`,
          border: `2px solid ${colors.accent2}40`,
          borderRadius: 16,
          padding: "24px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            color: colors.textPrimary,
            fontSize: 26,
            fontFamily: fonts.code,
            fontWeight: 600,
          }}
        >
          Data Stored
        </span>
        {/* Timer bar */}
        <div
          style={{
            width: 240,
            height: 6,
            borderRadius: 3,
            background: `${colors.textSecondary}30`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${timerProgress * 100}%`,
              height: "100%",
              borderRadius: 3,
              background: interpolate(
                timerProgress,
                [0, 0.6, 1],
                [0, 0, 1]
              )
                ? colors.warning
                : colors.accent2,
            }}
          />
        </div>
        <span
          style={{
            color: colors.textSecondary,
            fontSize: 16,
            fontFamily: fonts.code,
          }}
        >
          TTL: {Math.max(0, Math.round((1 - timerProgress) * 100))}%
        </span>
      </div>

      {/* Branch Outcomes */}
      <div
        style={{
          display: "flex",
          gap: 60,
          opacity: branchReveal,
          transform: `translateY(${(1 - branchReveal) * 30}px)`,
        }}
      >
        {/* Renew path */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 2,
              height: 40,
              background: `${colors.success}60`,
            }}
          />
          <div
            style={{
              background: `${colors.success}12`,
              border: `1px solid ${colors.success}40`,
              borderRadius: 12,
              padding: "16px 28px",
              color: colors.success,
              fontSize: 18,
              fontFamily: fonts.code,
              fontWeight: 600,
              textAlign: "center" as const,
            }}
          >
            Renew Rent
          </div>
          <span
            style={{
              color: colors.success,
              fontSize: 14,
              fontFamily: fonts.body,
              opacity: 0.8,
            }}
          >
            Keep Alive
          </span>
        </div>

        {/* Archived path */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 2,
              height: 40,
              background: `${colors.warning}60`,
            }}
          />
          <div
            style={{
              background: `${colors.warning}12`,
              border: `1px solid ${colors.warning}40`,
              borderRadius: 12,
              padding: "16px 28px",
              color: colors.warning,
              fontSize: 18,
              fontFamily: fonts.code,
              fontWeight: 600,
              textAlign: "center" as const,
            }}
          >
            No Rent
          </div>
          <span
            style={{
              color: colors.warning,
              fontSize: 14,
              fontFamily: fonts.body,
              opacity: 0.8,
            }}
          >
            Archived
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Main Scene ──────────────────────────────────────────────────────
export const Episode5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleSlide = slideIn(frame, fps, 0.2);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        fontFamily: fonts.body,
      }}
    >
      {/* ── Section 1: Title + Stack Architecture (0s–18s) ───────── */}
      <Sequence from={0} durationInFrames={fps * 18}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 48,
            padding: 80,
          }}
        >
          {/* Episode title */}
          <div
            style={{
              opacity: titleSlide.opacity,
              transform: `translateY(${titleSlide.translateY}px)`,
              color: colors.textPrimary,
              fontSize: 48,
              fontFamily: fonts.title,
              fontWeight: 800,
              textAlign: "center" as const,
              letterSpacing: -1,
            }}
          >
            Soroban, WASM & zk-Proofs
          </div>

          {/* Section label */}
          <div
            style={{
              opacity: fadeIn(frame, fps, 0.8),
              color: colors.textSecondary,
              fontSize: 16,
              fontFamily: fonts.code,
              textTransform: "uppercase" as const,
              letterSpacing: 3,
            }}
          >
            Stack Architecture
          </div>

          {/* Vertical stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <StackLayer label="Soroban" index={0} color={colors.accent1} />
            <StackLayer label="WASM VM" index={1} color={colors.accent2} />
            <StackLayer label="Rust" index={2} color={colors.success} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ── Section 2: Scientist Card (18s–30s) ──────────────────── */}
      <Sequence from={fps * 18} durationInFrames={fps * 12}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            padding: 80,
          }}
        >
          <div
            style={{
              color: colors.textSecondary,
              fontSize: 16,
              fontFamily: fonts.code,
              textTransform: "uppercase" as const,
              letterSpacing: 3,
              opacity: fadeIn(frame - fps * 18, fps, 0.2),
            }}
          >
            Architectural Influence
          </div>

          <ScientistCard
            name="Graydon Hoare"
            institution="Rust Creator"
            caption="Shaped Soroban's architecture philosophy"
            delay={0.5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ── Section 3: TTL Concept (30s–46s) ─────────────────────── */}
      <Sequence from={fps * 30} durationInFrames={fps * 16}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            padding: 80,
          }}
        >
          <div
            style={{
              color: colors.textSecondary,
              fontSize: 16,
              fontFamily: fonts.code,
              textTransform: "uppercase" as const,
              letterSpacing: 3,
              opacity: fadeIn(frame - fps * 30, fps, 0.2),
            }}
          >
            State Rent & TTL Model
          </div>

          <TTLConcept />
        </AbsoluteFill>
      </Sequence>

      {/* ── Section 4: Crypto Primitives (46s–60s) ───────────────── */}
      <Sequence from={fps * 46} durationInFrames={fps * 14}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            padding: 80,
          }}
        >
          <div
            style={{
              color: colors.textSecondary,
              fontSize: 16,
              fontFamily: fonts.code,
              textTransform: "uppercase" as const,
              letterSpacing: 3,
              opacity: fadeIn(frame - fps * 46, fps, 0.2),
            }}
          >
            Crypto Primitives
          </div>

          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap" as const,
              justifyContent: "center",
            }}
          >
            <Badge label="zk-SNARK Verify" delay={0.5} variant="accent1" />
            <Badge label="Passkeys" delay={1.0} variant="accent2" />
            <Badge label="Native L1 Crypto" delay={1.5} variant="success" />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
