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

// ── Timing: relative to closing start (277.05s) ──
const EP = episodes.closing.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Checklist items mapped to episodes ──
// Format: EP{n} — {description}
const CHECKLIST_ITEMS = [
  { ep: "EP01", description: "Cryptographic identities" },
  { ep: "EP02", description: "Atomic transactions" },
  { ep: "EP03", description: "Federated consensus" },
  { ep: "EP04", description: "Secure programmability" },
  { ep: "EP05", description: "Efficient state storage" },
  { ep: "EP06", description: "Privacy support" },
];

// Items appear starting at f8392 (279.73s) = 4.45s into closing
const CHECKLIST_START_DELAY = 279.73 - 275.28; // 4.45s
const ITEM_STAGGER = 0.5; // seconds between items
// f8598 = 286.60s, relative to closing start 275.28s = 11.32s
const CHECKS_APPEAR_AT = 11.32; // seconds into closing

// ── Phase 1: Review Checklist (275.28s to 289.0s) — VIDEO+OVERLAY ──
// Items appear WITHOUT checks, then all get checked simultaneously at CHECKS_APPEAR_AT
const ReviewChecklist: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleAnim = slideIn(frame, fps, CHECKLIST_START_DELAY - 0.5);

  // Check appear animation (all at once at CHECKS_APPEAR_AT)
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
            maxWidth: 600,
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

            // Checkbox is checked when checkOpacity > 0
            const isChecked = checkOpacity > 0;

            return (
              <div
                key={item.ep}
                style={{
                  opacity: itemAnim.opacity,
                  transform: `translateY(${itemAnim.translateY}px)`,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: space.md,
                }}
              >
                {/* Checkbox — 24x24 square; unchecked: border only; checked: gold fill + checkmark */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: radius.xs,
                    background: isChecked
                      ? colors.gold
                      : "transparent",
                    border: `2px solid ${isChecked ? colors.gold : colors.textDim}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                >
                  {/* Checkmark SVG — appears when checked */}
                  <span
                    style={{
                      color: colors.bgPrimary,
                      fontSize: 14,
                      lineHeight: 1,
                      fontWeight: 700,
                      opacity: checkOpacity,
                      transform: `scale(${checkScale})`,
                      display: "block",
                    }}
                  >
                    &#10003;
                  </span>
                </div>

                {/* EP label */}
                <span
                  style={{
                    ...text.overlineSM,
                    color: colors.gold,
                    letterSpacing: 2,
                    minWidth: 48,
                    fontSize: 13,
                  }}
                >
                  {item.ep}
                </span>

                {/* Separator dash */}
                <span
                  style={{
                    ...text.bodyMD,
                    color: colors.textDim,
                  }}
                >
                  &mdash;
                </span>

                {/* Description */}
                <span
                  style={{
                    ...text.bodyMD,
                    color: colors.textPrimary,
                  }}
                >
                  {item.description}
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

// ── Phase 2: Final Statement (292.30s to 295.04s) — VIDEO+OVERLAY (light dim) ──
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
// Appears AFTER the main checklist content
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
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      <Img
        src={staticFile("images/certificate.png")}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      />
    </AbsoluteFill>
  );
};

// ── Main Closing — Sequences synced to audioMarks ──
export const Closing: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Phase 1: Review Checklist — 277.05s to 296.81s */}
      <Sequence from={0} durationInFrames={rel(292.0)}>
        <ReviewChecklist />
      </Sequence>

      {/* Final statement overlaid on checklist — 294.07s to 296.81s */}
      <Sequence from={rel(294.07)} durationInFrames={rel(296.81) - rel(294.07)}>
        <FinalStatement />
      </Sequence>

      {/* Certificate — AFTER everything, 296.81s to 303.77s */}
      <Sequence from={rel(296.81)} durationInFrames={rel(303.77) - rel(296.81)}>
        <Certificate />
      </Sequence>

      {/* Lower-third across checklist phase */}
      <Sequence from={rel(277.77)} durationInFrames={rel(289.77) - rel(277.77)}>
        <LowerThird title="Recap & Closing" subtitle="Closing" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
