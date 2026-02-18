import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  spring,
  staticFile,
} from "remotion";
import { colors } from "../styles/theme";
import { text, space, layout, panel, shadows, radius } from "../styles/designSystem";
import { fadeIn, slideIn } from "../animations/springs";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to closing start (275.28s) ──
const EP = episodes.closing.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Checklist items mapped to episodes ──
const CHECKLIST_ITEMS = [
  { label: "Cryptographic Identity", episode: "01" },
  { label: "Atomic Transactions", episode: "02" },
  { label: "Federated Consensus", episode: "03" },
  { label: "Smart Contracts", episode: "04" },
  { label: "Efficient Storage", episode: "05" },
  { label: "Privacy & zk-Proofs", episode: "06" },
];

// Items appear starting at f8392 (279.73s) = 4.45s into closing
const CHECKLIST_START_DELAY = 279.73 - 275.28; // 4.45s
const ITEM_STAGGER = 0.55; // seconds between items
const ALL_ITEMS_SHOWN_AT = CHECKLIST_START_DELAY + (CHECKLIST_ITEMS.length - 1) * ITEM_STAGGER + 0.5;
const CHECKS_APPEAR_AT = ALL_ITEMS_SHOWN_AT + 0.8; // all checks appear at once

// ── Phase 1: Review Checklist (275.28s to 289.0s) — VIDEO+OVERLAY ──
// Items appear WITHOUT checks, then all get checked simultaneously
const ReviewChecklist: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleAnim = slideIn(frame, fps, CHECKLIST_START_DELAY - 0.5);

  // Check appear animation (all at once)
  const checkOpacity = fadeIn(frame, fps, CHECKS_APPEAR_AT);
  const checkScale = interpolate(
    frame,
    [CHECKS_APPEAR_AT * fps, (CHECKS_APPEAR_AT + 0.3) * fps],
    [0.5, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Summary after checks
  const summaryDelay = CHECKS_APPEAR_AT + 1.5;
  const summaryAnim = slideIn(frame, fps, summaryDelay);
  const summaryGlow = fadeIn(frame, fps, summaryDelay + 0.3);

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <div
        style={{
          position: "absolute",
          left: space.section,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <GlassPanel
          padding={`${space.xxl}px ${space.xxl}px`}
          borderColor={colors.borderAccent}
          glow={shadows.accent}
          style={{
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.translateY}px)`,
            display: "flex",
            flexDirection: "column",
            gap: space.lg,
            maxWidth: 560,
          }}
        >
          <div
            style={{
              ...text.overlineSM,
              color: colors.gold,
              marginBottom: space.xs,
            }}
          >
            WHAT WE COVERED
          </div>

          {/* Checklist items — appear staggered WITHOUT checks */}
          {CHECKLIST_ITEMS.map((item, i) => {
            const itemDelay = CHECKLIST_START_DELAY + i * ITEM_STAGGER;
            const itemAnim = slideIn(frame, fps, itemDelay);

            return (
              <div
                key={item.label}
                style={{
                  opacity: itemAnim.opacity,
                  transform: `translateY(${itemAnim.translateY}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: space.md,
                }}
              >
                {/* Checkmark — appears later for ALL items at once */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: radius.sm,
                    background: checkOpacity > 0 ? `${colors.positive}12` : `${colors.textDim}08`,
                    border: `1px solid ${checkOpacity > 0 ? colors.positive : colors.textDim}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      ...text.codeMD,
                      color: colors.positive,
                      fontSize: 18,
                      lineHeight: 1,
                      opacity: checkOpacity,
                      transform: `scale(${checkScale})`,
                    }}
                  >
                    &#10003;
                  </span>
                </div>

                <span style={{ ...text.h2, color: colors.textPrimary }}>
                  {item.label}
                </span>

                <span
                  style={{
                    ...text.overlineSM,
                    color: colors.warmGrey,
                    marginLeft: space.xs,
                  }}
                >
                  EP {item.episode}
                </span>
              </div>
            );
          })}

          {/* Summary badge — appears after checks */}
          <div
            style={{
              marginTop: space.md,
              opacity: summaryAnim.opacity,
              transform: `translateY(${summaryAnim.translateY}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: space.md,
              width: "100%",
            }}
          >
            <div
              style={{
                width: "80%",
                height: 1,
                background: `linear-gradient(90deg, transparent, ${colors.gold}40, transparent)`,
              }}
            />

            <div
              style={{
                ...panel.accent,
                padding: `${space.md}px ${space.xl}px`,
                borderRadius: radius.md,
                border: `1px solid ${colors.gold}25`,
                boxShadow: `0 0 24px ${colors.gold}10, ${shadows.accent}`,
                textAlign: "center",
                opacity: summaryGlow,
              }}
            >
              <div style={{ ...text.overlineSM, color: colors.warmGrey, marginBottom: space.xs }}>
                STELLAR IS A
              </div>
              <div style={{ ...text.h1, color: colors.gold }}>
                Global Settlement Protocol
              </div>
              <div
                style={{
                  ...text.bodySM,
                  color: colors.textSecondary,
                  marginTop: space.xs,
                }}
              >
                Accessible &middot; Programmable &middot; Privacy-enabled
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Phase 2: Final Statement (293.0s to 295.04s) — VIDEO+OVERLAY (light dim) ──
const FinalStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameAnim = slideIn(frame, fps, 0.2);
  const lineOpacity = fadeIn(frame, fps, 0.4);
  const closingAnim = slideIn(frame, fps, 0.6);

  // Gradient accent line expanding width
  const lineWidth = interpolate(
    spring({
      frame: frame - Math.round(fps * 0.4),
      fps,
      config: { damping: 22, mass: 0.5, stiffness: 70 },
    }),
    [0, 1],
    [0, 240]
  );

  return (
    <AbsoluteFill style={layout.dimOverlay(0.25)}>
      {/* Bottom-center positioned */}
      <div
        style={{
          position: "absolute",
          bottom: space.edge + space.xxl,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: space.md,
        }}
      >
        {/* Author name */}
        <div
          style={{
            opacity: nameAnim.opacity,
            transform: `translateY(${nameAnim.translateY}px)`,
            ...text.h1,
            color: colors.textPrimary,
            textShadow: `0 2px 8px rgba(0, 0, 0, 0.6)`,
          }}
        >
          Lucas Bispo de Oliveira
        </div>

        {/* Gradient accent line */}
        <div
          style={{
            opacity: lineOpacity,
            width: lineWidth,
            height: 2,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${colors.gold}, ${colors.info})`,
            boxShadow: `0 0 16px ${colors.gold}40, 0 0 32px ${colors.info}20`,
          }}
        />

        {/* "See you on-chain." */}
        <div
          style={{
            opacity: closingAnim.opacity,
            transform: `translateY(${closingAnim.translateY}px)`,
            ...text.overlineLG,
            color: colors.info,
            letterSpacing: 3,
            textShadow: `0 2px 8px rgba(0, 0, 0, 0.6)`,
          }}
        >
          SEE YOU ON-CHAIN.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Phase 3: Certificate (289.0s to 295.04s) — ANIMATION FULL ──
const Certificate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleProgress = spring({
    frame,
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 80 },
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(scaleProgress, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        ...layout.centerColumn,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          boxShadow: `0 8px 60px rgba(0, 0, 0, 0.6), ${shadows.accent}`,
          borderRadius: radius.lg,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("images/certificate.png")}
          style={{
            width: 1200,
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Main Closing — Sequences synced to audioMarks ──
export const Closing: React.FC = () => {
  const frame = useCurrentFrame();

  // Cross-fade: Phase 1 fades out as Phase 2 (certificate) fades in
  const crossfadeStart = rel(288.0);
  const crossfadeEnd = rel(289.0);
  const phase1Opacity = interpolate(frame, [crossfadeStart, crossfadeEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const certOpacity = interpolate(frame, [crossfadeStart, crossfadeEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Phase 1: Review Checklist — 275.28s to 289.0s */}
      <Sequence from={0} durationInFrames={rel(289.0)}>
        <AbsoluteFill style={{ opacity: phase1Opacity }}>
          <ReviewChecklist />
        </AbsoluteFill>
      </Sequence>

      {/* Phase 2: Certificate + Final Statement — 289.0s to 295.04s
      <Sequence from={rel(288.0)} durationInFrames={rel(295.04) - rel(288.0)}>
        <AbsoluteFill style={{ opacity: certOpacity }}>
          <Certificate />
        </AbsoluteFill>
      </Sequence> */}

      {/* Final statement overlaid on certificate */}
      <Sequence from={rel(293.0)} durationInFrames={rel(295.04) - rel(293.0)}>
        <FinalStatement />
      </Sequence>

      {/* Lower-third across checklist phase */}
      <Sequence from={rel(276.0)} durationInFrames={rel(288.0) - rel(276.0)}>
        <LowerThird title="Recap & Closing" subtitle="Closing" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
