import React from "react";
import {
  AbsoluteFill,
  Audio,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  spring,
  staticFile,
} from "remotion";
import { colors } from "../styles/theme";
import { fadeIn, slideIn } from "../animations/springs";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";
import { text, space, layout, shadows, radius, panel } from "../styles/designSystem";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to ep3 start (108.68s) ──
const EP = episodes.ep3.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Scene 3.2: Submission Flow — VIDEO+OVERLAY ──
// Task #6: start=114.97s, end=125.73s → rel(114.97) to rel(125.73)
// RIGHT side card: lifecycle steps
// Build: already visible | Sign: 117.43s | Submit: 119.40s
// Horizon: 122.23s | Core: 124.23s | Settlement: 125.79s
const SCENE_32_START = 116.74;
const lifecycleSteps = [
  { label: "Build", atSec: SCENE_32_START, color: colors.gold },
  { label: "Sign", atSec: 119.20, color: colors.info },
  { label: "Submit to Horizon", atSec: 121.17, color: colors.info },
  { label: "Stellar Core", atSec: 123.63, color: colors.info },
  { label: "Settlement", atSec: 125.50, color: colors.positive },
];

const SubmissionFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity, translateY } = slideIn(frame, fps, 0.3);

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* RIGHT — Submission flow (Task #6: right side) */}
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <GlassPanel
          variant="accent"
          padding={`${space.xxl}px ${space.xl}px`}
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: space.lg,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold }}>
            Transaction Lifecycle
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: space.md,
              alignItems: "stretch",
              width: "100%",
            }}
          >
            {lifecycleSteps.map((step, i) => {
              const delaySec = step.atSec - SCENE_32_START;
              const stepOpacity = i === 0 ? 1 : fadeIn(frame, fps, delaySec);
              const stepY = i === 0 ? 0 : interpolate(
                frame,
                [delaySec * fps, delaySec * fps + 12],
                [15, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <React.Fragment key={step.label}>
                  {i > 0 && (
                    <div
                      style={{
                        opacity: stepOpacity,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 2,
                          height: 16,
                          background: `linear-gradient(180deg, ${step.color}60, ${step.color})`,
                          borderRadius: 1,
                        }}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      ...panel.base,
                      padding: `${space.md}px ${space.xl}px`,
                      borderRadius: radius.sm,
                      border: `1px solid ${step.color}25`,
                      opacity: stepOpacity,
                      transform: `translateY(${stepY}px)`,
                      display: "flex",
                      alignItems: "center",
                      gap: space.md,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 28,
                        borderRadius: radius.xs,
                        backgroundColor: step.color,
                        boxShadow: `0 0 10px ${step.color}40`,
                      }}
                    />
                    <span style={{ ...text.codeMD, color: step.color }}>
                      {step.label}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 3.3: Atomicity (125.83s to 132.40s) — ANIMATION FULL ──
// Task #7: 100 circles in a 10×10 grid
// Phase 1: TX circle + 100 operation circles (all unchecked/grey) appear
// Phase 2: All 100 circles turn to checkmarks SIMULTANEOUSLY, then TX gets check
// Phase 3: 99 checked + 1 red X, then TX shows red X (fail state)

// Generate 100 operation circle colors cycling through brand palette
const OP_COLORS_CYCLE = [
  colors.info,
  colors.gold,
  "#B7ACE8",
  colors.positive,
  "#E88A4C",
];
const OPERATION_GRID_COLORS = Array.from({ length: 100 }, (_, i) =>
  OP_COLORS_CYCLE[i % OP_COLORS_CYCLE.length]
);

const Atomicity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Phase timing (seconds relative to scene start at 125.83s) ──
  // Scene duration: 132.40 - 125.83 = 6.57s
  const circlesAppear = 0.4;       // circles fade in
  const phase2Start = 2.0;         // all 100 ops check simultaneously
  const txSuccessAt = phase2Start + 0.5; // TX shows check
  const phase3Start = 4.0;         // fail phase: 99 checked + 1 X
  const txFailAt = phase3Start + 0.8;   // TX shows X

  const timeSec = frame / fps;

  // Phase detection
  const inPhase2 = timeSec >= phase2Start && timeSec < phase3Start;
  const inPhase3 = timeSec >= phase3Start;
  const txSucceeded = timeSec >= txSuccessAt && timeSec < phase3Start;
  const txFailed = timeSec >= txFailAt;

  // TX border color and glow
  const txBorderColor = txFailed
    ? colors.negative
    : txSucceeded
      ? colors.positive
      : colors.borderMedium;

  const txGlow = txFailed
    ? `0 0 30px ${colors.negative}35`
    : txSucceeded
      ? `0 0 30px ${colors.positive}35`
      : "none";

  // Panel opacity (fade in on entry)
  const panelOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // TX label
  const txLabel = txFailed ? "Transaction: FAIL" : txSucceeded ? "Transaction: OK" : "Transaction";
  const txLabelColor = txFailed ? colors.negative : txSucceeded ? colors.positive : colors.textPrimary;

  // Circles opacity on initial appear
  const circlesGroupOpacity = interpolate(
    frame,
    [circlesAppear * fps, (circlesAppear + 0.5) * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      {/* Chime — all operations succeed */}
      <Sequence from={Math.round(phase2Start * fps)} durationInFrames={60}>
        <Audio src={staticFile("sounds/chime.mp3")} volume={0.5} />
      </Sequence>
      {/* Error tone — TX fails */}
      <Sequence from={Math.round(phase3Start * fps)} durationInFrames={60}>
        <Audio src={staticFile("sounds/error.mp3")} volume={0.5} />
      </Sequence>

      <AbsoluteFill style={layout.centerColumn}>
        {/* Big TX container */}
        <div
          style={{
            opacity: panelOpacity,
            ...panel.accent,
            padding: `${space.xl}px ${space.xxl}px`,
            borderRadius: radius.lg,
            border: `2px solid ${txBorderColor}`,
            boxShadow: txGlow,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: space.lg,
            minWidth: 700,
            transition: "none",
          }}
        >
          {/* TX Title */}
          <div
            style={{
              ...text.displayMD,
              color: txLabelColor,
              display: "flex",
              alignItems: "center",
              gap: space.md,
            }}
          >
            {txLabel}
            {txSucceeded && (
              <span style={{ color: colors.positive, fontSize: 32 }}>✓</span>
            )}
            {txFailed && (
              <span style={{ color: colors.negative, fontSize: 32 }}>✗</span>
            )}
          </div>

          {/* 10×10 grid of 100 operation circles */}
          <div
            style={{
              opacity: circlesGroupOpacity,
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: space.xs,
              width: "100%",
              maxWidth: 560,
            }}
          >
            {OPERATION_GRID_COLORS.map((color, i) => {
              // Determine state for this circle
              let isChecked = false;
              let isFailed = false;

              if (inPhase3 || txFailed) {
                // Phase 3: 99 checked, last one (index 99) is X
                if (i === 99) {
                  isFailed = true;
                } else {
                  isChecked = true;
                }
              } else if (inPhase2 || txSucceeded) {
                // Phase 2: all 100 are checked simultaneously
                isChecked = true;
              }

              const circleColor = isFailed
                ? colors.negative
                : isChecked
                  ? colors.positive
                  : color;

              const mark = isFailed ? "✗" : isChecked ? "✓" : "";

              return (
                <div
                  key={i}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: radius.circle,
                    backgroundColor: `${circleColor}18`,
                    border: `1.5px solid ${circleColor}50`,
                    boxShadow: (isChecked || isFailed)
                      ? `0 0 8px ${circleColor}30`
                      : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {mark && (
                    <span
                      style={{
                        ...text.bodySM,
                        color: circleColor,
                        lineHeight: 1,
                        fontSize: 14,
                      }}
                    >
                      {mark}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sub-label */}
          <div style={{ ...text.overlineSM, color: colors.white, fontSize: 20 }}>
            100 Operations
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 3.4: OperationTypes (132.90s to 148.43s) — VIDEO+OVERLAY ──
// Task #8: Three operation type cards appear in sequence
// "Payment" at 136.43s → rel offset = 136.43 - 132.90 = 3.53s
// "Change Trust" at 138.76s → offset = 138.76 - 132.90 = 5.86s
// "Invoke Host Function" at 140.90s → offset = 140.90 - 132.90 = 8.0s

const SCENE_34_START = 134.67;

interface OpTypeCardProps {
  label: string;
  description: string;
  color: string;
  delaySec: number;
  frame: number;
  fps: number;
}

const OpTypeCard: React.FC<OpTypeCardProps> = ({ label, description, color, delaySec, frame, fps }) => {
  const opacity = fadeIn(frame, fps, delaySec);
  const translateY = interpolate(
    frame,
    [delaySec * fps, delaySec * fps + 18],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        ...panel.base,
        padding: `${space.md}px ${space.xl}px`,
        borderRadius: radius.md,
        border: `1px solid ${color}30`,
        display: "flex",
        alignItems: "center",
        gap: space.md,
        minWidth: 420,
        boxShadow: `${shadows.md}, 0 0 20px ${color}15`,
      }}
    >
      {/* Color accent bar */}
      <div
        style={{
          width: 4,
          height: 40,
          borderRadius: radius.xs,
          backgroundColor: color,
          boxShadow: `0 0 12px ${color}50`,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: space.xs,
        }}
      >
        <div style={{ ...text.h3, color: color }}>
          {label}
        </div>
        <div style={{ ...text.bodySM, color: colors.textSecondary }}>
          {description}
        </div>
      </div>
    </div>
  );
};

const operationTypes = [
  {
    label: "Payment",
    description: "Asset transfers between accounts",
    color: colors.gold,
    atSec: 136.83,
  },
  {
    label: "Change Trust",
    description: "Receive and issue new tokens",
    color: colors.info,
    atSec: 138.76,
  },
  {
    label: "Invoke Host Function",
    description: "Interact with smart contracts",
    color: "#B7ACE8",
    atSec: 140.90,
  },
];

const OperationTypes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity: titleOpacity, translateY: titleY } = slideIn(frame, fps, 0.2);

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <div
        style={{
          position: "absolute",
          left: space.section,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: space.xl,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: space.sm,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold, fontSize: 20 }}>
            26 Operation Types
          </div>
          <div style={{ ...text.displayMD, color: colors.textPrimary }}>
            Operations
          </div>
        </div>

        {/* Operation type cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: space.md,
            alignItems: "stretch",
          }}
        >
          {operationTypes.map((op) => {
            const delaySec = op.atSec - SCENE_34_START;
            return (
              <OpTypeCard
                key={op.label}
                label={op.label}
                description={op.description}
                color={op.color}
                delaySec={delaySec}
                frame={frame}
                fps={fps}
              />
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 3.5: Closing question (149.03s to 152.50s) — fullscreen word-by-word ──
// "But who decides this is valid?" at 02:29.03 | f4471
const closingWords = [
  { text: "But", atSec: 149.03 },
  { text: "who", atSec: 149.33 },
  { text: "decides", atSec: 149.63 },
  { text: "this", atSec: 150.13 },
  { text: "is", atSec: 150.43 },
  { text: "valid?", atSec: 150.73 },
];

const CLOSING_START = 149.03;

const ClosingQuestion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={layout.dimOverlay(0.6)}>
      <AbsoluteFill style={layout.centerColumn}>
        <div
          style={{
            ...text.displayLG,
            fontSize: 64,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          {closingWords.map((word, i) => {
            const wordFrame = Math.round((word.atSec - CLOSING_START) * fps);
            const visible = frame >= wordFrame;
            const isHighlighted = word.text === "decides" || word.text === "valid?";
            return (
              <span
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  color: visible
                    ? isHighlighted
                      ? colors.gold
                      : colors.textPrimary
                    : "transparent",
                }}
              >
                {word.text}{" "}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Main Episode 3 — Sequences synced to audioMarks ──
export const Episode3: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 3.2: Submission Flow — 116.74s to 127.50s (Task #6: right side, fixed timing) */}
      <Sequence from={rel(116.74)} durationInFrames={rel(127.50) - rel(116.74)}>
        <SubmissionFlow />
      </Sequence>

      {/* Scene 3.3: Atomicity — 127.60s to 134.17s (Task #7: 10×10 grid, 100 circles) */}
      <Sequence from={rel(127.60)} durationInFrames={rel(134.17) - rel(127.60)}>
        <Atomicity />
      </Sequence>

      {/* Scene 3.4: Operation Types — 134.67s to 144.03s (02:24.03 | f4321) */}
      <Sequence from={rel(134.67)} durationInFrames={rel(144.03) - rel(134.67)}>
        <OperationTypes />
      </Sequence>

      {/* Scene 3.5: Closing question — 149.03s to 153.51s (holds until ep4 transition) */}
      <Sequence from={rel(149.03)} durationInFrames={rel(153.51) - rel(149.03)}>
        <ClosingQuestion />
      </Sequence>

      {/* Lower-third across full episode */}
      <Sequence from={rel(111.27)} durationInFrames={rel(153.51) - rel(111.27)}>
        <LowerThird title="Transactions & Operations" subtitle="Episode 03" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
