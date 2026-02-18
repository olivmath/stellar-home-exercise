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
import { ScientistCard } from "../components/ScientistCard";
import { text, space, layout, panel, shadows, radius } from "../styles/designSystem";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to ep5 start (213.87s) ──
const EP = episodes.ep5.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Scene 5.1: Soroban Intro (212.1s to 226.36s) — VIDEO+OVERLAY ──
const STACK_START = 218.53 - 212.1; // 6.43s into scene
const GRAYDON_START = 222.53 - 212.1; // 10.43s into scene
const CARDS_EXIT = 226.36 - 212.1; // 14.26s into scene

const SorobanIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity: panelOpacity, translateY: panelY } = slideIn(frame, fps, 0.3);
  const yearOpacity = fadeIn(frame, fps, 0.8);

  const stackLayers = [
    { label: "Soroban", color: colors.gold, delay: STACK_START },
    { label: "WASM VM", color: colors.info, delay: STACK_START + 0.5 },
    { label: "Rust", color: colors.positive, delay: STACK_START + 1.0 },
  ];

  const timeSec = frame / fps;
  const exitProgress = interpolate(
    frame,
    [CARDS_EXIT * fps, (CARDS_EXIT + 0.5) * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const exitOpacity = 1 - exitProgress;

  const graydonOpacity = fadeIn(frame, fps, GRAYDON_START);
  const graydonExitOpacity = timeSec >= CARDS_EXIT ? exitOpacity : 1;

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* RIGHT — unified GlassPanel: title + year + stack layers */}
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: exitOpacity,
        }}
      >
        <GlassPanel
          padding="40px 48px"
          borderColor={colors.borderAccent}
          glow={shadows.accent}
          style={{
            opacity: panelOpacity,
            transform: `translateY(${panelY}px)`,
            ...layout.centerColumn,
            gap: space.lg,
            width: 380,
          }}
        >
          {/* Header */}
          <div style={{ ...text.overlineSM, color: colors.gold }}>
            SMART CONTRACT PLATFORM
          </div>

          {/* Title */}
          <div
            style={{
              ...text.displayMD,
              color: colors.gold,
              textShadow: `0 0 40px rgba(201, 168, 76, 0.3)`,
              textAlign: "center",
            }}
          >
            Soroban
          </div>

          {/* Year */}
          <div
            style={{
              opacity: yearOpacity,
              ...text.displayLG,
              color: colors.gold,
              textShadow: `0 0 40px rgba(201, 168, 76, 0.4), 0 0 80px rgba(201, 168, 76, 0.15)`,
            }}
          >
            2024
          </div>

          {/* Divider */}
          <div style={{
            width: "100%",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${colors.borderMedium}, transparent)`,
          }} />

          {/* Stack layers */}
          <div style={{ display: "flex", flexDirection: "column", gap: space.sm, width: "100%" }}>
            {stackLayers.map((layer, i) => {
              const layerSlide = slideIn(frame, fps, layer.delay);
              return (
                <div
                  key={i}
                  style={{
                    ...panel.base,
                    width: "100%",
                    boxSizing: "border-box",
                    padding: `${space.md}px ${space.lg}px`,
                    borderRadius: radius.md,
                    display: "flex",
                    alignItems: "center",
                    gap: space.md,
                    opacity: layerSlide.opacity,
                    transform: `translateY(${layerSlide.translateY}px)`,
                    border: `1px solid ${layer.color}25`,
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 24,
                      borderRadius: radius.xs,
                      backgroundColor: layer.color,
                      boxShadow: `0 0 8px ${layer.color}40`,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ ...text.codeMD, color: layer.color }}>{layer.label}</span>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>

      {/* LEFT — Graydon vertically centered */}
      <div
        style={{
          position: "absolute",
          left: space.section,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: graydonOpacity * graydonExitOpacity,
        }}
      >
        <ScientistCard
          name="Graydon Hoare"
          institution="RUST CREATOR"
          caption="Shaped Soroban's architecture"
          photo="grandon.png"
          delay={0}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 5.2: Gas Model & TTL (226.48s to 237.93s / f7138) — VIDEO+OVERLAY ──
const GasModelTTL: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity: gasOpacity, translateY: gasY } = slideIn(frame, fps, 0.3);

  const ttlDelay = 5.62;
  const { opacity: ttlOpacity, translateY: ttlY } = slideIn(frame, fps, ttlDelay);

  // Renew Rent visible from the very start of the TTL section
  const renewDelay = 0;
  // No Rent card appears when bar is nearly empty
  const archiveDelay = ttlDelay + 3.8;
  const renewOpacity = fadeIn(frame, fps, renewDelay);
  const archiveOpacity = fadeIn(frame, fps, archiveDelay);

  const preventDelay = 16.26;
  const preventOpacity = fadeIn(frame, fps, preventDelay);

  const ttlBarProgress = interpolate(
    frame,
    [ttlDelay * fps + 15, (ttlDelay + 4) * fps],
    [1, 0.1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // TASK #17: Bar turns red when nearly empty (progress <= 0.15)
  const barIsRed = ttlBarProgress <= 0.15;

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: space.xl,
          width: 500,
        }}
      >
        <GlassPanel
          padding="40px 44px"
          borderColor={colors.borderMedium}
          style={{
            opacity: gasOpacity,
            transform: `translateY(${gasY}px)`,
            ...layout.centerColumn,
            gap: space.lg,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold }}>GAS MODEL</div>
          <div style={{ display: "flex", gap: space.lg, justifyContent: "center", width: "100%" }}>
            <div
              style={{
                ...panel.surface,
                padding: `${space.md}px ${space.xl}px`,
                borderRadius: radius.md,
                ...layout.centerColumn,
                gap: space.sm,
              }}
            >
              <span style={{ ...text.codeMD, color: colors.info }}>CPU</span>
              <span style={{ ...text.bodySM, color: colors.warmGrey }}>Compute</span>
            </div>
            <div style={{ ...text.h1, color: colors.warmGrey, alignSelf: "center" }}>+</div>
            <div
              style={{
                ...panel.surface,
                padding: `${space.md}px ${space.xl}px`,
                borderRadius: radius.md,
                ...layout.centerColumn,
                gap: space.sm,
              }}
            >
              <span style={{ ...text.codeMD, color: colors.gold }}>Storage</span>
              <span style={{ ...text.bodySM, color: colors.warmGrey }}>State</span>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel
          padding="40px 44px"
          borderColor={`${colors.gold}20`}
          glow={shadows.accent}
          style={{
            opacity: ttlOpacity,
            transform: `translateY(${ttlY}px)`,
            ...layout.centerColumn,
            gap: space.lg,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold }}>INNOVATION</div>
          <div style={{ ...text.h1, color: colors.gold }}>TTL — Time To Live</div>

          <div
            style={{
              width: "100%",
              height: 8,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: radius.pill,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${ttlBarProgress * 100}%`,
                height: "100%",
                background: barIsRed
                  ? `linear-gradient(90deg, ${colors.negative}, ${colors.negative})`
                  : `linear-gradient(90deg, ${colors.gold}, ${colors.positive})`,
                borderRadius: radius.pill,
                transition: "background 0.3s ease",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: space.md, width: "100%" }}>
            <div
              style={{
                flex: 1,
                ...panel.surface,
                padding: `${space.md}px ${space.md}px`,
                borderRadius: radius.md,
                textAlign: "center",
                opacity: renewOpacity,
                borderLeft: `3px solid ${colors.positive}`,
              }}
            >
              <div style={{ ...text.codeSM, color: colors.positive }}>Renew Rent</div>
              <div style={{ ...text.bodySM, color: colors.warmGrey, marginTop: space.xs }}>Keep Alive</div>
            </div>
            <div
              style={{
                flex: 1,
                ...panel.surface,
                padding: `${space.md}px ${space.md}px`,
                borderRadius: radius.md,
                textAlign: "center",
                opacity: archiveOpacity,
                borderLeft: `3px solid ${colors.negative}`,
              }}
            >
              <div style={{ ...text.codeSM, color: colors.negative }}>No Rent</div>
              <div style={{ ...text.bodySM, color: colors.warmGrey, marginTop: space.xs }}>Archived</div>
            </div>
          </div>

          <div style={{ opacity: preventOpacity }}>
            <Badge label="Prevents indefinite growth" delay={0} variant="positive" size="md" />
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 5.3: Flipper Contract Full Screen (242.7s to 254.59s) — ANIMATION FULL ──
const CODE_LINES = [
  // Imports group (atSec: 244.46)
  {
    atSec: 246.23,
    tokens: [
      { text: "#![no_std]", color: colors.info },
    ],
  },
  {
    atSec: 246.23,
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
    atSec: 247.33,
    tokens: [{ text: "", color: "transparent" }],
  },
  {
    atSec: 247.33,
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
    atSec: 248.40,
    tokens: [{ text: "", color: "transparent" }],
  },
  {
    atSec: 248.40,
    tokens: [
      { text: "#[contract]", color: colors.gold },
    ],
  },
  {
    atSec: 248.40,
    tokens: [
      { text: "pub struct ", color: colors.info },
      { text: "FlipperContract", color: colors.gold },
      { text: ";", color: colors.textDim },
    ],
  },
  {
    atSec: 248.40,
    tokens: [{ text: "", color: "transparent" }],
  },
  {
    atSec: 248.40,
    tokens: [
      { text: "#[contractimpl]", color: colors.gold },
    ],
  },
  {
    atSec: 248.40,
    tokens: [
      { text: "impl ", color: colors.info },
      { text: "FlipperContract ", color: colors.gold },
      { text: "{", color: colors.textDim },
    ],
  },
  {
    atSec: 248.40,
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
    atSec: 248.40,
    tokens: [
      { text: "        env.storage().instance().get(&", color: colors.textDim },
      { text: "STATE", color: colors.textPrimary },
      { text: ").unwrap_or(false)", color: colors.textDim },
    ],
  },
  {
    atSec: 248.40,
    tokens: [
      { text: "    }", color: colors.textDim },
    ],
  },
  // Flip function group (atSec: 249.46)
  {
    atSec: 251.23,
    tokens: [{ text: "", color: "transparent" }],
  },
  {
    atSec: 251.23,
    tokens: [
      { text: "    pub fn ", color: colors.info },
      { text: "flip", color: colors.gold },
      { text: "(env: ", color: colors.textDim },
      { text: "Env", color: colors.gold },
      { text: ") {", color: colors.textDim },
    ],
  },
  {
    atSec: 251.23,
    tokens: [
      { text: "        env.storage()", color: colors.textDim },
    ],
  },
  {
    atSec: 251.23,
    tokens: [
      { text: "            .instance()", color: colors.textDim },
    ],
  },
  {
    atSec: 251.23,
    tokens: [
      { text: "            .update(&", color: colors.textDim },
      { text: "STATE", color: colors.textPrimary },
      { text: ", |current: ", color: colors.textDim },
      { text: "Option<bool>", color: colors.gold },
      { text: "| !current.unwrap_or(false));", color: colors.textDim },
    ],
  },
  {
    atSec: 251.23,
    tokens: [
      { text: "    }", color: colors.textDim },
    ],
  },
  {
    atSec: 251.23,
    tokens: [
      { text: "}", color: colors.textDim },
    ],
  },
];

const SCENE_53_START = 244.47; // f7334
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
            padding: `${space.xxl}px ${space.xxxl}px`,
            borderRadius: radius.lg,
            width: 1560,
            minHeight: 780,
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
            <div style={{ width: 16, height: 16, borderRadius: radius.circle, backgroundColor: colors.negative, opacity: 0.6 }} />
            <div style={{ width: 16, height: 16, borderRadius: radius.circle, backgroundColor: colors.gold, opacity: 0.6 }} />
            <div style={{ width: 16, height: 16, borderRadius: radius.circle, backgroundColor: colors.positive, opacity: 0.6 }} />
            <span style={{ ...text.codeMD, color: colors.textDim, marginLeft: space.md }}>
              flipper.rs
            </span>
          </div>

          {/* Code lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {CODE_LINES.map((line, i) => {
              const delaySec = line.atSec - SCENE_53_START;
              const lineStart = delaySec * fps;
              const lineEnd = lineStart + TYPING_DURATION_FRAMES;

              const isBlank = line.tokens.length === 1 && line.tokens[0].text === "";

              const totalChars = line.tokens.reduce((sum, t) => sum + t.text.length, 0);

              const charsToShow = isBlank
                ? 0
                : Math.floor(
                    interpolate(frame, [lineStart, lineEnd], [0, totalChars], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  );

              const lineVisible = frame >= lineStart;
              const lineNumber = i + 1;

              return (
                <div
                  key={i}
                  style={{
                    opacity: lineVisible ? 1 : 0,
                    display: "flex",
                    alignItems: "center",
                    minHeight: isBlank ? 18 : 42,
                    paddingLeft: space.sm,
                  }}
                >
                  {/* Line number */}
                  <span
                    style={{
                      ...text.codeMD,
                      fontSize: 21,
                      color: colors.textDim,
                      width: 48,
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

                      const visibleChars = Math.max(0, Math.min(charsToShow - tokenStart, token.text.length));
                      const visibleText = token.text.slice(0, visibleChars);

                      return (
                        <span
                          key={j}
                          style={{
                            ...text.codeMD,
                            fontSize: 26,
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

// ── Scene 5.4: Protocol Updates (256.66s to 265.57s) — VIDEO+OVERLAY ──
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

// ── Scene 5.5: zkSNARKs & Passkeys (265.57s to 275.28s) — VIDEO+OVERLAY ──
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

// ── Main Episode 5 — Soroban (full: intro + TTL + code + crypto + zk) ──
export const Episode5: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 5.1: Soroban Intro + Graydon — 213.87s to 228.13s */}
      <Sequence from={rel(213.87)} durationInFrames={rel(228.13) - rel(213.87)}>
        <SorobanIntro />
      </Sequence>

      {/* Scene 5.2: Gas Model & TTL — 228.25s to 239.70s */}
      <Sequence from={rel(228.25)} durationInFrames={rel(239.70) - rel(228.25)}>
        <GasModelTTL />
      </Sequence>

      {/* Scene 5.3: Flipper Code Full Screen — starts at 244.67s, visible from 244.47s */}
      <Sequence from={rel(244.67)} durationInFrames={rel(256.36) - rel(245.07)}>
        <FlipperCode />
      </Sequence>

      {/* Scene 5.4: Protocol Updates — 258.43s to 267.34s */}
      <Sequence from={rel(258.43)} durationInFrames={rel(267.34) - rel(258.43)}>
        <ProtocolUpdates />
      </Sequence>

      {/* Scene 5.5: zkSNARKs & Passkeys — 267.34s to 277.05s */}
      <Sequence from={rel(267.34)} durationInFrames={rel(277.05) - rel(267.34)}>
        <ZkAndPasskeys />
      </Sequence>

      {/* Lower-third: Soroban & Smart Contracts — full episode */}
      <Sequence from={rel(214.77)} durationInFrames={rel(277.05) - rel(214.77)}>
        <LowerThird title="Soroban & Smart Contracts" subtitle="Episode 05" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
