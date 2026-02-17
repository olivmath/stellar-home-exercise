import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { fadeIn, slideIn, scaleIn } from "../animations/springs";
import { EpisodeTitle } from "../components/EpisodeTitle";
import { ScientistCard } from "../components/ScientistCard";
import { GlassPanel } from "../components/GlassPanel";
import { Badge } from "../components/Badge";

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
              color: colors.textSecondary,
              fontSize: 14,
              fontFamily: fonts.code,
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
    { label: "zk-SNARK Verify", variant: "stellar" as const, angle: 0 },
    { label: "Passkeys", variant: "cyan" as const, angle: 1 },
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
          color: colors.textSecondary,
          fontSize: 14,
          fontFamily: fonts.code,
          textTransform: "uppercase" as const,
          letterSpacing: 4,
          opacity: fadeIn(frame, fps, 0.2),
        }}
      >
        Crypto Primitives
      </div>

      {/* Fan-out badges */}
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
      {/* ── Section 1: Title + Stack Architecture (0-539) ──────────── */}
      <Sequence from={0} durationInFrames={540}>
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
            <StackLayer label="Soroban" index={0} accentColor={colors.stellar} />
            <StackLayer label="WASM VM" index={1} accentColor={colors.cyan} />
            <StackLayer label="Rust" index={2} accentColor={colors.success} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ── Section 2: Scientist Card (540-899) ────────────────────── */}
      <Sequence from={540} durationInFrames={360}>
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
              fontSize: 14,
              fontFamily: fonts.code,
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

      {/* ── Section 3: TTL Concept (900-1379) ──────────────────────── */}
      <Sequence from={900} durationInFrames={480}>
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
              fontSize: 14,
              fontFamily: fonts.code,
              textTransform: "uppercase" as const,
              letterSpacing: 4,
              opacity: 0.7,
            }}
          >
            State Rent & TTL Model
          </div>

          <TTLConcept />
        </AbsoluteFill>
      </Sequence>

      {/* ── Section 4: Crypto Primitives (1380-1800) ───────────────── */}
      <Sequence from={1380} durationInFrames={420}>
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
    </AbsoluteFill>
  );
};
