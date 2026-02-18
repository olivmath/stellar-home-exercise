import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  Img,
  staticFile,
} from "remotion";
import { colors } from "../styles/theme";
import { fadeIn, slideIn } from "../animations/springs";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";
import { text, space, layout, panel, shadows, radius } from "../styles/designSystem";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to ep6 start (243.30s) ──
const EP = episodes.ep6.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Scene 6.1: Flipper Contract Full Screen (243.30s to 256.66s) — ANIMATION FULL ──
// Code lines appear dynamically at specific frames, with typing animation
const CODE_LINES = [
  // Imports group (atSec: 244.46)
  {
    atSec: 244.46,
    tokens: [
      { text: "#![no_std]", color: colors.info },
    ],
  },
  {
    atSec: 244.46,
    tokens: [
      { text: "use ", color: colors.info },
      { text: "soroban_sdk", color: colors.gold },
      { text: "::{", color: colors.textDim },
      { text: "contract, contractimpl, symbol_short, Env, Symbol", color: colors.textPrimary },
      { text: "};", color: colors.textDim },
    ],
  },

  // State group (atSec: 245.56)
  {
    atSec: 245.56,
    tokens: [{ text: "", color: "transparent" }], // blank line
  },
  {
    atSec: 245.56,
    tokens: [
      { text: "const ", color: colors.info },
      { text: "STATE", color: colors.textPrimary },
      { text: ": ", color: colors.textDim },
      { text: "Symbol", color: colors.gold },
      { text: " = ", color: colors.textDim },
      { text: "symbol_short!", color: colors.info },
      { text: '("STATE")', color: colors.positive },
      { text: ";", color: colors.textDim },
    ],
  },

  // Contract + get function group (atSec: 246.63)
  {
    atSec: 246.63,
    tokens: [{ text: "", color: "transparent" }],
  },
  {
    atSec: 246.63,
    tokens: [
      { text: "#[contract]", color: colors.gold },
    ],
  },
  {
    atSec: 246.63,
    tokens: [
      { text: "pub struct ", color: colors.info },
      { text: "FlipperContract", color: colors.gold },
      { text: ";", color: colors.textDim },
    ],
  },
  {
    atSec: 246.63,
    tokens: [{ text: "", color: "transparent" }],
  },
  {
    atSec: 246.63,
    tokens: [
      { text: "#[contractimpl]", color: colors.gold },
    ],
  },
  {
    atSec: 246.63,
    tokens: [
      { text: "impl ", color: colors.info },
      { text: "FlipperContract ", color: colors.gold },
      { text: "{", color: colors.textDim },
    ],
  },
  {
    atSec: 246.63,
    tokens: [
      { text: "    pub fn ", color: colors.info },
      { text: "get", color: colors.textPrimary },
      { text: "(env: ", color: colors.textDim },
      { text: "Env", color: colors.gold },
      { text: ") -> ", color: colors.textDim },
      { text: "bool", color: colors.info },
      { text: " {", color: colors.textDim },
    ],
  },
  {
    atSec: 246.63,
    tokens: [
      { text: "        env.storage().instance().get(&", color: colors.textDim },
      { text: "STATE", color: colors.textPrimary },
      { text: ").unwrap_or(false)", color: colors.textDim },
    ],
  },
  {
    atSec: 246.63,
    tokens: [
      { text: "    }", color: colors.textDim },
    ],
  },
  // Flip function group (atSec: 249.46)
  {
    atSec: 249.46,
    tokens: [{ text: "", color: "transparent" }],
  },
  {
    atSec: 249.46,
    tokens: [
      { text: "    pub fn ", color: colors.info },
      { text: "flip", color: colors.gold },
      { text: "(env: ", color: colors.textDim },
      { text: "Env", color: colors.gold },
      { text: ") {", color: colors.textDim },
    ],
  },
  {
    atSec: 249.46,
    tokens: [
      { text: "        env.storage()", color: colors.textDim },
    ],
  },
  {
    atSec: 249.46,
    tokens: [
      { text: "            .instance()", color: colors.textDim },
    ],
  },
  {
    atSec: 249.46,
    tokens: [
      { text: "            .update(&", color: colors.textDim },
      { text: "STATE", color: colors.textPrimary },
      { text: ", |current: ", color: colors.textDim },
      { text: "Option<bool>", color: colors.gold },
      { text: "| !current.unwrap_or(false));", color: colors.textDim },
    ],
  },
  {
    atSec: 249.46,
    tokens: [
      { text: "    }", color: colors.textDim },
    ],
  },
  {
    atSec: 249.46,
    tokens: [
      { text: "}", color: colors.textDim },
    ],
  },
];

const SCENE_61_START = 242.7; // f7281
const TYPING_DURATION_FRAMES = 12; // ~0.4s to type each line

const FlipperCode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      <AbsoluteFill style={layout.centerColumn}>
        <div
          style={{
            opacity: panelOpacity,
            ...panel.accent,
            padding: `${space.xl}px ${space.xxl}px`,
            borderRadius: radius.lg,
            width: 1040,
            minHeight: 520,
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: space.sm,
              marginBottom: space.lg,
              paddingBottom: space.md,
              borderBottom: `1px solid ${colors.borderSubtle}`,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: radius.circle, backgroundColor: colors.negative, opacity: 0.6 }} />
            <div style={{ width: 12, height: 12, borderRadius: radius.circle, backgroundColor: colors.gold, opacity: 0.6 }} />
            <div style={{ width: 12, height: 12, borderRadius: radius.circle, backgroundColor: colors.positive, opacity: 0.6 }} />
            <span style={{ ...text.codeSM, color: colors.textDim, marginLeft: space.md }}>
              flipper.rs
            </span>
          </div>

          {/* Code lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {CODE_LINES.map((line, i) => {
              const delaySec = line.atSec - SCENE_61_START;
              const lineStart = delaySec * fps;
              const lineEnd = lineStart + TYPING_DURATION_FRAMES;

              const isBlank = line.tokens.length === 1 && line.tokens[0].text === "";

              // Total characters in this line
              const totalChars = line.tokens.reduce((sum, t) => sum + t.text.length, 0);

              // How many characters to show (typing animation)
              const charsToShow = isBlank
                ? 0
                : Math.floor(
                    interpolate(frame, [lineStart, lineEnd], [0, totalChars], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  );

              // Line visibility: show as soon as typing starts
              const lineVisible = frame >= lineStart;

              // Line number
              const lineNumber = i + 1;

              return (
                <div
                  key={i}
                  style={{
                    opacity: lineVisible ? 1 : 0,
                    display: "flex",
                    alignItems: "center",
                    minHeight: isBlank ? 12 : 28,
                    paddingLeft: space.sm,
                  }}
                >
                  {/* Line number */}
                  <span
                    style={{
                      ...text.codeSM,
                      color: colors.textDim,
                      width: 32,
                      textAlign: "right",
                      marginRight: space.md,
                      opacity: 0.4,
                      userSelect: "none",
                    }}
                  >
                    {isBlank ? "" : lineNumber}
                  </span>

                  {/* Tokens with typing animation */}
                  {(() => {
                    if (isBlank) return null;
                    let cumulative = 0;
                    return line.tokens.map((token, j) => {
                      const tokenStart = cumulative;
                      cumulative += token.text.length;

                      // How many chars of this token to show
                      const visibleChars = Math.max(0, Math.min(charsToShow - tokenStart, token.text.length));
                      const visibleText = token.text.slice(0, visibleChars);

                      return (
                        <span
                          key={j}
                          style={{
                            ...text.codeMD,
                            color: token.color,
                            whiteSpace: "pre",
                          }}
                        >
                          {visibleText}
                        </span>
                      );
                    });
                  })()}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 6.2: Protocol Updates (256.66s to 265.57s) — VIDEO+OVERLAY ──
// TASK #20: start moved from 249.47 to 256.66
const SCENE_62_START = 256.66;

const ProtocolUpdates: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity: panelOpacity, translateY: panelY } = slideIn(frame, fps, 0.3);

  const cryptoBadges = [
    { label: "secp256r1", delay: 1.0, variant: "info" as const },
    { label: "BLS12-381", delay: 2.0, variant: "info" as const },
    { label: "BN254", delay: 3.0, variant: "info" as const },
    { label: "Poseidon", delay: 4.0, variant: "accent" as const },
  ];

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
          padding="48px 56px"
          borderColor={colors.borderMedium}
          style={{
            opacity: panelOpacity,
            transform: `translateY(${panelY}px)`,
            display: "flex",
            flexDirection: "column",
            gap: space.xl,
            width: 480,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.info }}>
            PROTOCOL UPDATES
          </div>
          <div style={{ ...text.h1 }}>Crypto Primitives</div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: space.md }}>
            {cryptoBadges.map((badge, i) => (
              <div key={i} style={{ opacity: fadeIn(frame, fps, badge.delay) }}>
                <Badge label={badge.label} delay={badge.delay} variant={badge.variant} size="md" />
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 6.3: zkSNARKs & Passkeys (265.57s to 275.28s) — VIDEO+OVERLAY ──
// TASK #21: Square GlassPanel cards for zk-SNARK and Passkeys
const SCENE_63_START = 265.57;

const ZkAndPasskeys: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity: panelOpacity, translateY: panelY } = slideIn(frame, fps, 0.3);
  const zkDelay = 0.8;
  const passkeysDelay = 1.6;
  const l1Delay = 3.0;

  const squareCardStyle = (color: string): React.CSSProperties => ({
    ...panel.base,
    width: 220,
    height: 220,
    borderRadius: radius.lg,
    border: `1px solid ${color}30`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: space.md,
    padding: space.xl,
    boxShadow: `0 0 20px ${color}10`,
  });

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <div style={{ position: "absolute", right: space.section, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          padding="48px 56px"
          borderColor={colors.borderAccent}
          glow={shadows.accent}
          style={{
            opacity: panelOpacity,
            transform: `translateY(${panelY}px)`,
            display: "flex",
            flexDirection: "column",
            gap: space.xl,
            width: 560,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold }}>THIS ENABLES</div>

          {/* Two square cards side by side */}
          <div style={{ display: "flex", gap: space.lg }}>
            <div style={{ opacity: fadeIn(frame, fps, zkDelay), ...squareCardStyle("#00A7B5") }}>
              <div style={{
                fontFamily: "'Georgia', serif",
                fontSize: 32,
                color: "#00A7B5",
                letterSpacing: 1,
                lineHeight: 1,
              }}>∮<sub style={{ fontSize: 14 }}>L</sub> f(z)dz</div>
              <div style={{ ...text.codeSM, color: "#00A7B5", textAlign: "center" }}>zk-SNARK Verify</div>
              <div style={{ ...text.bodySM, color: colors.warmGrey, textAlign: "center" }}>Zero-knowledge proofs</div>
            </div>

            <div style={{ opacity: fadeIn(frame, fps, passkeysDelay), ...squareCardStyle(colors.gold) }}>
              <Img
                src={staticFile("images/fingerprint.png")}
                style={{
                  width: 64,
                  height: 64,
                  filter: `invert(1) sepia(1) saturate(5) hue-rotate(5deg) brightness(1.1)`,
                  opacity: 0.9,
                }}
              />
              <div style={{ ...text.codeSM, color: colors.gold, textAlign: "center" }}>Passkeys</div>
              <div style={{ ...text.bodySM, color: colors.warmGrey, textAlign: "center" }}>Better UX auth</div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: colors.borderSubtle, opacity: fadeIn(frame, fps, l1Delay - 0.5) }} />

          {/* Enabled in Layer 1 */}
          <div style={{ opacity: fadeIn(frame, fps, l1Delay), ...text.h2, color: colors.positive, textAlign: "center" }}>
            ✓ Enabled in Layer 1
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Main Episode 6 — Flipper + Protocol Updates + zk ──
export const Episode6: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 6.1: Flipper Code Full Screen — 243.30s to 251.59s (f7548) */}
      <Sequence from={rel(240.30)} durationInFrames={rel(251.59) - rel(243.30)}>
        <FlipperCode />
      </Sequence>

      {/* Scene 6.2: Protocol Updates — 256.66s to 265.57s (TASK #20: start moved to 256.66) */}
      <Sequence from={rel(256.66)} durationInFrames={rel(265.57) - rel(256.66)}>
        <ProtocolUpdates />
      </Sequence>

      {/* Scene 6.3: zkSNARKs & Passkeys — 265.57s to 275.28s */}
      <Sequence from={rel(265.57)} durationInFrames={rel(275.28) - rel(265.57)}>
        <ZkAndPasskeys />
      </Sequence>

      {/* Lower-third across full episode */}
      <Sequence from={rel(244.0)} durationInFrames={rel(275.28) - rel(244.0)}>
        <LowerThird title="Code, Crypto & zk-Proofs" subtitle="Episode 06" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
