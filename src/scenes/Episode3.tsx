import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  spring,
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

// ── Scene 3.2: Submission Flow (117.22s to 128.74s) — VIDEO+OVERLAY ──
// LEFT side: Lifecycle steps appearing at specific absolute frames
// Build: already visible | Sign: f3523 (117.43s) | Submit: f3582 (119.40s)
// Horizon: f3667 (122.23s) | Core: f3727 (124.23s) | Settlement: f3774 (125.79s)
const SCENE_32_START = 117.22;
const lifecycleSteps = [
  { label: "Build", atSec: SCENE_32_START, color: colors.gold },
  { label: "Sign", atSec: 117.43, color: colors.info },
  { label: "Submit", atSec: 119.40, color: colors.info },
  { label: "Horizon", atSec: 122.23, color: colors.positive },
  { label: "Stellar Core", atSec: 124.23, color: colors.positive },
  { label: "Settlement", atSec: 125.79, color: colors.gold },
];

const SubmissionFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity, translateY } = slideIn(frame, fps, 0.3);

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* LEFT — Submission flow */}
      <div
        style={{
          position: "absolute",
          left: space.section,
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

// ── Scene 3.3: Atomicity (128.74s to 144.43s) — ANIMATION FULL ──
// Full-screen: big "Transações" box with colored circles for operations
// Phase 1: circles appear → get green checks one by one → TX turns green
// Phase 2: text "100 operações" replaces content
// Phase 3: circles return → checks one by one → last FAILS → all turn red
const OPERATION_COLORS = [
  colors.info,        // blue
  colors.gold,        // gold
  "#B7ACE8",          // lilac
  colors.info,        // blue
  "#E88A4C",          // orange
  colors.gold,        // gold
  "#B7ACE8",          // lilac
];

const Atomicity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalOps = OPERATION_COLORS.length;

  // ── Phase timing (in seconds relative to scene start) ──
  const circlesAppear = 0.5;       // circles fade in
  const checkStart = 1.5;          // first check starts
  const checkInterval = 0.6;       // seconds between checks
  const allCheckedAt = checkStart + (totalOps - 1) * checkInterval + 0.3;
  const txSuccessAt = allCheckedAt + 0.5;
  const textReplaceAt = txSuccessAt + 1.2;
  const textDuration = 2.0;
  const failPhaseStart = textReplaceAt + textDuration;
  const failCheckStart = failPhaseStart + 0.8;
  const failAtIndex = totalOps - 1; // last circle fails
  const failMoment = failCheckStart + failAtIndex * checkInterval + 0.3;
  const allFailAt = failMoment + 0.5;

  // ── Phase detection ──
  const timeSec = frame / fps;
  const inTextPhase = timeSec >= textReplaceAt && timeSec < failPhaseStart;
  const inFailPhase = timeSec >= failPhaseStart;
  const txSucceeded = timeSec >= txSuccessAt && timeSec < textReplaceAt;
  const txFailed = timeSec >= allFailAt;

  // TX box border color
  const txBorderColor = txFailed
    ? colors.negative
    : txSucceeded
      ? colors.positive
      : colors.borderMedium;

  const txGlow = txFailed
    ? `0 0 30px ${colors.negative}25`
    : txSucceeded
      ? `0 0 30px ${colors.positive}25`
      : "none";

  // Panel opacity
  const panelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      <AbsoluteFill style={layout.centerColumn}>
        {/* Big "Transações" box */}
        <div
          style={{
            opacity: panelOpacity,
            ...panel.accent,
            padding: `${space.xxl}px ${space.xxxl}px`,
            borderRadius: radius.lg,
            border: `2px solid ${txBorderColor}`,
            boxShadow: txGlow,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: space.xl,
            minWidth: 600,
            minHeight: 340,
            justifyContent: "center",
            transition: "none",
          }}
        >
          {/* Title */}
          <div
            style={{
              ...text.displayMD,
              color: txFailed ? colors.negative : txSucceeded ? colors.positive : colors.textPrimary,
            }}
          >
            {txFailed ? "TX: FAIL ✗" : txSucceeded ? "Transações ✓" : "Transações"}
          </div>

          {/* Text phase: "100 operações" */}
          {inTextPhase && (
            <div
              style={{
                opacity: fadeIn(frame, fps, textReplaceAt),
                ...text.displayLG,
                color: colors.gold,
                textShadow: `0 0 30px ${colors.gold}30`,
              }}
            >
              100 operações
            </div>
          )}

          {/* Circles phase (initial success OR fail phase) */}
          {!inTextPhase && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: space.lg,
                justifyContent: "center",
                maxWidth: 500,
              }}
            >
              {OPERATION_COLORS.map((color, i) => {
                const circleOpacity = interpolate(
                  frame,
                  [(circlesAppear + i * 0.1) * fps, (circlesAppear + i * 0.1 + 0.3) * fps],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                // Determine check state
                let isChecked = false;
                let isFailed = false;

                if (inFailPhase) {
                  // Fail phase: checks appear one by one, last one fails
                  const failCheckTime = failCheckStart + i * checkInterval;
                  if (timeSec >= failCheckTime + 0.3) {
                    if (i === failAtIndex) {
                      isFailed = true;
                    } else {
                      isChecked = true;
                    }
                  }
                  // After allFailAt, everything turns red
                  if (txFailed) {
                    isFailed = true;
                    isChecked = false;
                  }
                } else {
                  // Success phase
                  const checkTime = checkStart + i * checkInterval;
                  if (timeSec >= checkTime + 0.3) {
                    isChecked = true;
                  }
                }

                const circleColor = isFailed ? colors.negative : isChecked ? colors.positive : color;
                const mark = isFailed ? "✗" : isChecked ? "✓" : "";

                return (
                  <div
                    key={`${inFailPhase ? "fail" : "success"}-${i}`}
                    style={{
                      opacity: inFailPhase ? 1 : circleOpacity,
                      width: 64,
                      height: 64,
                      borderRadius: radius.circle,
                      backgroundColor: `${circleColor}20`,
                      border: `2px solid ${circleColor}60`,
                      boxShadow: (isChecked || isFailed) ? `0 0 16px ${circleColor}30` : "none",
                      ...layout.centerRow,
                    }}
                  >
                    {mark && (
                      <span
                        style={{
                          ...text.h2,
                          color: circleColor,
                          lineHeight: 1,
                        }}
                      >
                        {mark}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 3.5: Closing question (144.43s to 148.78s) — fullscreen word-by-word ──
const closingWords = [
  { text: "A", atSec: 144.43 },
  { text: "transaction", atSec: 144.67 },
  { text: "is", atSec: 145.07 },
  { text: "the", atSec: 145.27 },
  { text: "container.", atSec: 145.47 },
  { text: "Operations", atSec: 145.97 },
  { text: "are", atSec: 146.37 },
  { text: "the", atSec: 146.57 },
  { text: "intentions.", atSec: 146.67 },
];

const CLOSING_START = 144.43;

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
            return (
              <span
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  color: visible
                    ? word.text === "container." || word.text === "intentions."
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
      {/* Scene 3.2: Submission Flow — 117.22s to 128.74s */}
      <Sequence from={rel(117.22)} durationInFrames={rel(128.74) - rel(117.22)}>
        <SubmissionFlow />
      </Sequence>

      {/* Scene 3.3: Atomicity — 128.74s to 144.43s (ANIMATION FULL) */}
      <Sequence from={rel(128.74)} durationInFrames={rel(144.43) - rel(128.74)}>
        <Atomicity />
      </Sequence>

      {/* Scene 3.5: Closing question — 144.43s to 148.78s */}
      <Sequence from={rel(144.43)} durationInFrames={rel(148.78) - rel(144.43)}>
        <ClosingQuestion />
      </Sequence>

      {/* Lower-third across full episode */}
      <Sequence from={rel(109.5)} durationInFrames={rel(148.78) - rel(109.5)}>
        <LowerThird title="Transactions & Operations" subtitle="Episode 03" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
