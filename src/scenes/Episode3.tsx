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
import { text, space, gradients } from "../styles/designSystem";
import { fadeIn, slideIn, scaleIn } from "../animations/springs";
import { EpisodeTitle } from "../components/EpisodeTitle";
import { FlowDiagram } from "../components/FlowDiagram";
import { GlassPanel } from "../components/GlassPanel";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to episode start (108.68s) ──
// ep3 narration: 108.68s → 148.78s
const EP = episodes.ep3.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Section 1: Episode Title (frames 0-149) ──
const TitleSection: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ambient radial glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 500,
          background: `radial-gradient(ellipse, rgba(253, 218, 36, 0.06) 0%, rgba(0, 167, 181, 0.02) 50%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      <EpisodeTitle number="03" title="Transactions & Operations" />
    </AbsoluteFill>
  );
};

// ── Section 2: Transaction Lifecycle ──
const TransactionLifecycle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.2);
  const subtitleOpacity = fadeIn(frame, fps, 2.0);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: space.xxl,
      }}
    >
      {/* Subtle top glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 300,
          background: gradients.tealOrb,
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />

      {/* Section heading */}
      <div
        style={{
          opacity: titleOpacity,
          ...text.h1,
        }}
      >
        Transaction Lifecycle
      </div>

      {/* Flow diagram */}
      <FlowDiagram
        steps={["Wallet", "Horizon", "Core", "Ledger"]}
        delay={0.5}
        accentColor={colors.teal}
      />

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          ...text.bodyMD,
          color: colors.warmGrey,
          letterSpacing: 0.3,
        }}
      >
        Each step validates and forwards
      </div>
    </AbsoluteFill>
  );
};

// ── Section 3: Atomicity Visual ──
const AtomicityVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.2);
  const subtitleOpacity = fadeIn(frame, fps, 0.5);

  // Operation card spring animations
  const op1Prog = spring({
    frame: frame - 1.0 * fps,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });
  const op2Prog = spring({
    frame: frame - 1.5 * fps,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });
  const op3Prog = spring({
    frame: frame - 2.0 * fps,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });
  const resultProg = spring({
    frame: frame - 3.0 * fps,
    fps,
    config: { damping: 10, mass: 0.8, stiffness: 100 },
  });

  const ops = [
    { label: "Op 1", status: "success" as const, mark: "\u2713", prog: op1Prog },
    { label: "Op 2", status: "fail" as const, mark: "\u2717", prog: op2Prog },
    { label: "Op 3", status: "fail" as const, mark: "\u2717", prog: op3Prog },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: space.xl,
      }}
    >
      {/* Ambient warning glow behind cards */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 400,
          background: `radial-gradient(ellipse, rgba(251, 113, 133, 0.04) 0%, transparent 70%)`,
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Section heading */}
      <div
        style={{
          opacity: titleOpacity,
          ...text.h1,
        }}
      >
        Atomic Transactions
      </div>

      <div
        style={{
          ...text.bodyMD,
          color: colors.warmGrey,
          opacity: subtitleOpacity,
          marginBottom: space.sm,
        }}
      >
        All operations succeed, or none do.
      </div>

      {/* Operation cards row */}
      <div style={{ display: "flex", gap: space.xl, alignItems: "center" }}>
        {ops.map((op, i) => {
          const borderColor = op.status === "success" ? colors.success : colors.warning;
          const markColor = op.status === "success" ? colors.success : colors.warning;

          return (
            <div
              key={i}
              style={{
                opacity: op.prog,
                transform: `scale(${interpolate(op.prog, [0, 1], [0.6, 1])})`,
              }}
            >
              <GlassPanel
                padding={`${space.lg}px ${space.xl}px`}
                borderColor={borderColor}
                style={{
                  minWidth: 180,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: space.md,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Colored left border accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 3,
                    height: "100%",
                    backgroundColor: borderColor,
                    borderRadius: "3px 0 0 3px",
                  }}
                />
                <div
                  style={{
                    ...text.codeMD,
                    color: colors.textPrimary,
                  }}
                >
                  {op.label}
                </div>
                <div
                  style={{
                    ...text.h1,
                    color: markColor,
                    lineHeight: 1,
                  }}
                >
                  {op.mark}
                </div>
              </GlassPanel>
            </div>
          );
        })}
      </div>

      {/* Transaction result card — slides up with spring */}
      <div
        style={{
          opacity: resultProg,
          transform: `translateY(${interpolate(resultProg, [0, 1], [40, 0])}px)`,
          marginTop: space.sm,
        }}
      >
        <GlassPanel
          padding={`${space.lg}px ${space.xxl}px`}
          glow={colors.glowWarning}
          borderColor={colors.warning}
        >
          <div
            style={{
              ...text.h2,
              color: colors.warning,
              letterSpacing: 1,
              textAlign: "center",
              textShadow: `0 0 20px rgba(251, 113, 133, 0.3)`,
            }}
          >
            Transaction: FAIL
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Section 4: Operation Types ──
const OperationTypes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.2);
  const subtitleOpacity = fadeIn(frame, fps, 0.6);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: space.xxl,
      }}
    >
      {/* Ambient multi-color glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 400,
          background: `radial-gradient(ellipse, rgba(253, 218, 36, 0.04) 0%, rgba(0, 167, 181, 0.03) 40%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Section label */}
      <div
        style={{
          ...text.accentSM,
          color: colors.warmGrey,
          opacity: fadeIn(frame, fps, 0.1),
        }}
      >
        Operation Types
      </div>

      <div
        style={{
          opacity: titleOpacity,
          ...text.h1,
        }}
      >
        Operation Types
      </div>

      <div
        style={{
          ...text.bodyMD,
          color: colors.warmGrey,
          opacity: subtitleOpacity,
        }}
      >
        A transaction bundles one or more operations
      </div>

      <div style={{ display: "flex", gap: space.xl, marginTop: space.md }}>
        <Badge label="Payment" delay={1.0} variant="teal" size="lg" />
        <Badge label="Change Trust" delay={1.6} variant="gold" size="lg" />
        <Badge label="Invoke Contract" delay={2.2} variant="success" size="lg" />
      </div>
    </AbsoluteFill>
  );
};

// ── Main Episode 3 Composition ──
// ALL SHOTS: ANIMATION FULL — Solid bgPrimary throughout, no video showing
export const Episode3: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        ...text.bodyMD,
      }}
    >
      {/* Section 1 — TransactionEnvelope/Intro (108.68s to 117.22s) */}
      <Sequence from={0} durationInFrames={rel(117.22)}>
        <TitleSection />
      </Sequence>

      {/* Section 2 — SubmissionFlow (117.22s to 128.74s) */}
      <Sequence from={rel(117.22)} durationInFrames={rel(128.74) - rel(117.22)}>
        <TransactionLifecycle />
      </Sequence>

      {/* Section 3 — OperationTypes (128.74s to 148.78s) */}
      <Sequence from={rel(128.74)} durationInFrames={rel(148.78) - rel(128.74)}>
        <AtomicityVisual />
        <OperationTypes />
      </Sequence>

      {/* Lower-third across full episode */}
      <Sequence from={0} durationInFrames={rel(148.78)}>
        <LowerThird title="Transactions & Operations" subtitle="Episode 03" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
