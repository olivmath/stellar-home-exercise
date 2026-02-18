import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
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

// ── Scene 6.1: Flipper Contract Full Screen (243.30s to ~249.47s) — ANIMATION FULL ──
// Code lines appear dynamically at specific frames
const CODE_LINES = [
  {
    atSec: 244.46,
    tokens: [
      { text: "use ", color: colors.info },
      { text: "soroban_sdk", color: colors.gold },
      { text: "::{", color: colors.textDim },
      { text: "contract, contractimpl, Env", color: colors.textPrimary },
      { text: "};", color: colors.textDim },
    ],
  },
  {
    atSec: 245.56,
    tokens: [
      { text: "", color: "transparent" }, // blank line
    ],
  },
  {
    atSec: 245.56,
    tokens: [
      { text: "#[contract]", color: colors.gold },
    ],
  },
  {
    atSec: 245.56,
    tokens: [
      { text: "pub struct ", color: colors.info },
      { text: "Flipper", color: colors.gold },
      { text: ";", color: colors.textDim },
    ],
  },
  {
    atSec: 245.56,
    tokens: [
      { text: "", color: "transparent" }, // blank line
    ],
  },
  {
    atSec: 245.56,
    tokens: [
      { text: "const ", color: colors.info },
      { text: "STATE", color: colors.textPrimary },
      { text: ": ", color: colors.textDim },
      { text: "Symbol", color: colors.gold },
      { text: " = symbol!(", color: colors.textDim },
      { text: '"state"', color: colors.positive },
      { text: ");", color: colors.textDim },
    ],
  },
  {
    atSec: 246.63,
    tokens: [
      { text: "", color: "transparent" },
    ],
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
      { text: "Flipper ", color: colors.gold },
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
      { text: ").unwrap()", color: colors.textDim },
    ],
  },
  {
    atSec: 246.63,
    tokens: [
      { text: "    }", color: colors.textDim },
    ],
  },
  {
    atSec: 249.47,
    tokens: [
      { text: "", color: "transparent" },
    ],
  },
  {
    atSec: 249.47,
    tokens: [
      { text: "    pub fn ", color: colors.info },
      { text: "flip", color: colors.gold },
      { text: "(env: ", color: colors.textDim },
      { text: "Env", color: colors.gold },
      { text: ") {", color: colors.textDim },
    ],
  },
  {
    atSec: 249.47,
    tokens: [
      { text: "        let ", color: colors.info },
      { text: "curr ", color: colors.textPrimary },
      { text: "= Self::get(env.clone());", color: colors.textDim },
    ],
  },
  {
    atSec: 249.47,
    tokens: [
      { text: "        env.storage().instance().set(&", color: colors.textDim },
      { text: "STATE", color: colors.textPrimary },
      { text: ", &!", color: colors.textDim },
      { text: "curr", color: colors.textPrimary },
      { text: ");", color: colors.textDim },
    ],
  },
  {
    atSec: 249.47,
    tokens: [
      { text: "    }", color: colors.textDim },
    ],
  },
  {
    atSec: 249.47,
    tokens: [
      { text: "}", color: colors.textDim },
    ],
  },
];

const SCENE_61_START = 243.30;

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
            width: 820,
            minHeight: 500,
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
              const lineOpacity = interpolate(
                frame,
                [delaySec * fps, delaySec * fps + 8],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              // Skip rendering blank lines that are invisible
              const isBlank = line.tokens.length === 1 && line.tokens[0].text === "";

              return (
                <div
                  key={i}
                  style={{
                    opacity: lineOpacity,
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
                    {isBlank ? "" : i + 1}
                  </span>

                  {/* Tokens */}
                  {line.tokens.map((token, j) => (
                    <span
                      key={j}
                      style={{
                        ...text.codeMD,
                        color: token.color,
                        whiteSpace: "pre",
                      }}
                    >
                      {token.text}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 6.2: Protocol Updates (249.47s to 265.57s) — VIDEO+OVERLAY ──
// Replaces "Protocol 21" with "Protocol Updates"
const SCENE_62_START = 249.47;

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
// "This enables..." + zkSNARK/Passkey cards + "Enabled in Layer 1"
const SCENE_63_START = 265.57;

const ZkAndPasskeys: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity: panelOpacity, translateY: panelY } = slideIn(frame, fps, 0.3);

  const zkDelay = 0.8;
  const passkeysDelay = 1.6;
  const l1Delay = 3.0;

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
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
            width: 480,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold }}>
            THIS ENABLES
          </div>

          <div style={{ display: "flex", gap: space.md, flexWrap: "wrap" }}>
            <div style={{ opacity: fadeIn(frame, fps, zkDelay) }}>
              <Badge label="zk-SNARK Verify" delay={zkDelay} variant="accent" size="lg" />
            </div>
            <div style={{ opacity: fadeIn(frame, fps, passkeysDelay) }}>
              <Badge label="Passkeys" delay={passkeysDelay} variant="accent" size="lg" />
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              backgroundColor: colors.borderSubtle,
              width: "100%",
              opacity: fadeIn(frame, fps, l1Delay - 0.5),
            }}
          />

          {/* Enabled in Layer 1 */}
          <div style={{ opacity: fadeIn(frame, fps, l1Delay) }}>
            <Badge label="Enabled in Layer 1" delay={l1Delay} variant="positive" size="lg" />
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
      {/* Scene 6.1: Flipper Code Full Screen — 243.30s to 249.47s */}
      <Sequence from={rel(243.30)} durationInFrames={rel(249.47) - rel(243.30)}>
        <FlipperCode />
      </Sequence>

      {/* Scene 6.2: Protocol Updates — 249.47s to 265.57s */}
      <Sequence from={rel(249.47)} durationInFrames={rel(265.57) - rel(249.47)}>
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
