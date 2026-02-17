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
import { EpisodeTitle } from "../components/EpisodeTitle";
import { ScientistCard } from "../components/ScientistCard";
import { GlassPanel } from "../components/GlassPanel";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to episode start (212.1s) ──
// ep5 narration: 212.1s → 275.28s
const EP = episodes.ep5.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// Episode 5 — Soroban, WASM & zk-Proofs
// ALL SHOTS ARE ANIMATION FULL — Solid bgPrimary throughout

// ── Stack Layer ─────────────────────────────────────────────────────
const StackLayer: React.FC<{
  label: string;
  index: number;
  accentColor: string;
}> = ({ label, index, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 0.6 + index * 0.6;
  const drop = spring({
    frame: frame - delay * fps,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 90 },
  });

  const opacity = drop;
  const translateY = (1 - drop) * -80;
  const scale = interpolate(drop, [0, 1], [0.88, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        position: "relative" as const,
        width: 420,
      }}
    >
      <GlassPanel
        padding="24px 40px 24px 52px"
        borderColor={colors.borderSubtle}
        style={{ width: "100%" }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            borderRadius: "20px 0 0 20px",
            background: accentColor,
            boxShadow: `0 0 12px ${accentColor}60`,
          }}
        />
        <span
          style={{
            color: colors.textPrimary,
            fontSize: 28,
            fontFamily: fonts.display,
            fontWeight: 700,
          }}
        >
          {label}
        </span>
      </GlassPanel>
    </div>
  );
};

// ── TTL Concept ─────────────────────────────────────────────────────
const TTLConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelAppear = fadeIn(frame, fps, 0.3);

  // Progress bar depletes over ~10 seconds
  const barProgress = interpolate(frame, [fps * 0.8, fps * 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Color transition: success -> warning as TTL depletes
  const warningMix = interpolate(barProgress, [0, 0.55, 1], [0, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const barColor = warningMix > 0.5 ? colors.warning : colors.success;
  const barGlow =
    warningMix > 0.5 ? colors.glowWarning : colors.glowSuccess;

  // Branch outcomes appear via spring
  const branchReveal = spring({
    frame: frame - fps * 11,
    fps,
    config: { damping: 18, mass: 0.6, stiffness: 80 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 48,
        opacity: panelAppear,
      }}
    >
      <GlassPanel
        padding="32px 56px"
        borderColor={colors.borderSubtle}
        glow={barGlow}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              color: colors.warmGrey,
              fontSize: 14,
              fontFamily: fonts.accent,
              textTransform: "uppercase" as const,
              letterSpacing: 3,
            }}
          >
            Data Stored
          </span>

          {/* Progress bar track */}
          <div
            style={{
              width: 300,
              height: 6,
              borderRadius: 3,
              background: `${colors.textDim}30`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(1 - barProgress) * 100}%`,
                height: "100%",
                borderRadius: 3,
                background: barColor,
                boxShadow: `0 0 8px ${barColor}80`,
                transition: "background 0.3s ease",
              }}
            />
          </div>

          <span
            style={{
              color: colors.textDim,
              fontSize: 13,
              fontFamily: fonts.code,
            }}
          >
            TTL: {Math.max(0, Math.round((1 - barProgress) * 100))}%
          </span>
        </div>
      </GlassPanel>

      {/* Branch outcomes */}
      <div
        style={{
          display: "flex",
          gap: 80,
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
              width: 1,
              height: 36,
              background: `${colors.success}40`,
            }}
          />
          <GlassPanel
            padding="16px 28px"
            borderColor={`${colors.success}30`}
            glow={colors.glowSuccess}
          >
            <span
              style={{
                color: colors.success,
                fontSize: 18,
                fontFamily: fonts.display,
                fontWeight: 600,
              }}
            >
              Renew Rent &rarr; Keep Alive
            </span>
          </GlassPanel>
        </div>

        {/* Archive path */}
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
              width: 1,
              height: 36,
              background: `${colors.warning}40`,
            }}
          />
          <GlassPanel
            padding="16px 28px"
            borderColor={`${colors.warning}30`}
            glow={colors.glowWarning}
          >
            <span
              style={{
                color: colors.warning,
                fontSize: 18,
                fontFamily: fonts.display,
                fontWeight: 600,
              }}
            >
              No Rent &rarr; Archived
            </span>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

// ── Crypto Primitives Burst ─────────────────────────────────────────
const CryptoBurst: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badges = [
    { label: "zk-SNARK Verify", variant: "gold" as const, angle: 0 },
    { label: "Passkeys", variant: "teal" as const, angle: 1 },
    { label: "Native L1 Crypto", variant: "success" as const, angle: 2 },
  ];

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
      }}
    >
      {/* Section label */}
      <div
        style={{
          color: colors.warmGrey,
          fontSize: 14,
          fontFamily: fonts.accent,
          textTransform: "uppercase" as const,
          letterSpacing: 4,
          opacity: fadeIn(frame, fps, 0.2),
        }}
      >
        Crypto Primitives
      </div>

      {/* Fan-out badges with staggered 0.5s */}
      <div
        style={{
          position: "relative",
          width: 600,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {badges.map((b, i) => {
          const delay = 0.5 + i * 0.5;
          const fanProgress = spring({
            frame: frame - delay * fps,
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 80 },
          });

          // Fan from center outward
          const offsetX = (i - 1) * 200 * fanProgress;
          const offsetY = Math.abs(i - 1) * 20 * fanProgress;

          return (
            <div
              key={b.label}
              style={{
                position: "absolute",
                transform: `translate(${offsetX}px, ${offsetY}px)`,
              }}
            >
              <Badge
                label={b.label}
                delay={delay}
                variant={b.variant}
                size="lg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Main Scene ──────────────────────────────────────────────────────
export const Episode5: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        fontFamily: fonts.body,
      }}
    >
      {/* ── Section 1: SorobanIntro — Title + Stack Architecture (212.1s to 225.82s) ── */}
      <Sequence from={0} durationInFrames={rel(225.82)}>
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
          <EpisodeTitle number="05" title="Soroban, WASM & zk-Proofs" />

          {/* Vertical stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              marginTop: 24,
            }}
          >
            <StackLayer label="Soroban" index={0} accentColor={colors.gold} />
            <StackLayer label="WASM VM" index={1} accentColor={colors.teal} />
            <StackLayer label="Rust" index={2} accentColor={colors.success} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ── Section 2: StateModel — Scientist Card + TTL (225.82s to 247.58s) ── */}
      <Sequence from={rel(225.82)} durationInFrames={rel(247.58) - rel(225.82)}>
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
              color: colors.warmGrey,
              fontSize: 14,
              fontFamily: fonts.accent,
              textTransform: "uppercase" as const,
              letterSpacing: 4,
              opacity: 0.7,
            }}
          >
            State Rent & TTL Model
          </div>

          <ScientistCard
            name="Graydon Hoare"
            institution="Rust Creator"
            caption="Shaped Soroban's architecture philosophy"
            delay={0.5}
          />

          <TTLConcept />
        </AbsoluteFill>
      </Sequence>

      {/* ── Section 3: FlipperExample (247.58s to 256.9s) ── */}
      <Sequence from={rel(247.58)} durationInFrames={rel(256.9) - rel(247.58)}>
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
              color: colors.warmGrey,
              fontSize: 14,
              fontFamily: fonts.accent,
              textTransform: "uppercase" as const,
              letterSpacing: 4,
              opacity: 0.7,
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

      {/* ── Section 4: CryptoPrimitives (256.9s to 275.28s) ── */}
      <Sequence from={rel(256.9)} durationInFrames={rel(275.28) - rel(256.9)}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 80,
          }}
        >
          <CryptoBurst />
        </AbsoluteFill>
      </Sequence>

      {/* Lower-third across full episode */}
      <Sequence from={0} durationInFrames={rel(275.28)}>
        <LowerThird title="Soroban, WASM & zk-Proofs" subtitle="Episode 05" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
