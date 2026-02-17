import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  interpolate,
} from "remotion";
import { colors } from "../styles/theme";
import { fadeIn, slideIn, scaleIn } from "../animations/springs";
import { FlowDiagram } from "../components/FlowDiagram";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";
import { text, space, layout, panel, shadows, radius } from "../styles/designSystem";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to ep2 start (57.68s) ──
const EP = episodes.ep2.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Fake data for the 32 bytes animation ──
const RANDOM_BYTES = [
  182, 43, 7, 251, 94, 160, 33, 218, 71, 129, 55, 12, 199, 88, 244, 3,
  167, 21, 109, 230, 74, 146, 5, 191, 62, 213, 97, 38, 155, 240, 81, 126,
];
const MNEMONIC_WORDS = [
  "abandon", "ability", "able", "about",
  "above", "absent", "absorb", "abstract",
  "absurd", "abuse", "access", "accident",
];

// ── Scene: 32 Bytes → Numbers → Words (63.03s to 65.83s) ──
const BytesAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing: all 3 elements appear staggered but stay visible
  const titleDelay = 0;
  const numbersDelay = Math.round(fps * 0.4);
  const seedDelay = Math.round(fps * 1.2);
  const arrowDelay = Math.round(fps * 1.0);

  const titleOpacity = interpolate(frame, [titleDelay, titleDelay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(frame, [titleDelay, titleDelay + 10], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const numbersOpacity = interpolate(frame, [numbersDelay, numbersDelay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const seedOpacity = interpolate(frame, [seedDelay, seedDelay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const arrowProgress = interpolate(frame, [arrowDelay, arrowDelay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0F0F" }}>
      {/* Vertically centered layout */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: space.xxl,
          padding: `0 ${space.edge}px`,
        }}
      >
        {/* "32 bytes" title */}
        <div
          style={{
            ...text.displayXL,
            fontSize: 120,
            color: colors.gold,
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textShadow: `0 0 80px rgba(253, 218, 36, 0.4), 0 0 160px rgba(253, 218, 36, 0.15)`,
            letterSpacing: -3,
          }}
        >
          32 bytes
        </div>

        {/* Row: Numbers (left) → Arrow → Seed (right) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: space.xl,
          }}
        >
        {/* Left: Random numbers grid */}
        <div
          style={{
            flex: 1,
            opacity: numbersOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: space.sm,
          }}
        >
          {/* Entropy label */}
          <div
            style={{
              ...text.overlineSM,
              color: colors.info,
              marginBottom: space.sm,
            }}
          >
            ENTROPY
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: space.sm,
              justifyContent: "center",
            }}
          >
          {RANDOM_BYTES.map((byte, i) => {
            const itemDelay = numbersDelay + i * 0.4;
            const itemOpacity = interpolate(frame, [itemDelay, itemDelay + 4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={i}
                style={{
                  ...text.codeLG,
                  color: i % 3 === 0 ? colors.gold : colors.info,
                  opacity: itemOpacity,
                  background: "rgba(255, 255, 255, 0.04)",
                  padding: `${space.xs}px ${space.sm}px`,
                  borderRadius: radius.xs,
                  minWidth: 52,
                  textAlign: "center",
                }}
              >
                {byte}
              </div>
            );
          })}
          </div>
        </div>

        {/* Center: Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            opacity: arrowProgress,
            minWidth: 80,
          }}
        >
          <div
            style={{
              height: 2,
              width: 60,
              background: `linear-gradient(90deg, ${colors.info}40, ${colors.gold})`,
              borderRadius: 1,
            }}
          />
          <div
            style={{
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: `10px solid ${colors.gold}`,
            }}
          />
        </div>

        {/* Right: Mnemonic seed words */}
        <div
          style={{
            flex: 1,
            opacity: seedOpacity,
            display: "flex",
            flexDirection: "column",
            gap: space.sm,
            alignItems: "stretch",
          }}
        >
          {/* Seed label */}
          <div
            style={{
              ...text.overlineSM,
              color: colors.gold,
              textAlign: "center",
              marginBottom: space.sm,
            }}
          >
            SEED PHRASE
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: space.sm,
              justifyContent: "center",
            }}
          >
            {MNEMONIC_WORDS.map((word, i) => {
              const itemStart = seedDelay + i * 1;
              const itemOpacity = interpolate(frame, [itemStart, itemStart + 6], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  style={{
                    ...panel.accent,
                    padding: `${space.sm}px ${space.md}px`,
                    borderRadius: radius.sm,
                    opacity: itemOpacity,
                  }}
                >
                  <span style={{ ...text.codeMD, color: colors.textDim, marginRight: space.xs }}>
                    {i + 1}.
                  </span>
                  <span style={{ ...text.codeMD, color: colors.gold }}>
                    {word}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2.1: Key Flow — Sequential reveal (68.23s to 78.3s) ──
// Seed → Secret Key → Public Key, each appearing at specific timestamps
const KeyFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Relative frames within this sequence (starts at 68.23s)
  // Seed appears immediately (68.23s = frame 0 of this sequence)
  // Secret at 70.59s = 70.59 - 68.23 = 2.36s into sequence
  // Public at 73.50s = 73.50 - 68.23 = 5.27s into sequence
  const seedDelay = 0.3;
  const secretDelay = 2.36;
  const publicDelay = 5.27;

  const seedOpacity = fadeIn(frame, fps, seedDelay);
  const secretSlide = slideIn(frame, fps, secretDelay);
  const publicSlide = slideIn(frame, fps, publicDelay);

  // Arrow between seed→secret
  const arrow1Progress = interpolate(
    frame,
    [secretDelay * fps - 10, secretDelay * fps + 5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  // Arrow between secret→public
  const arrow2Progress = interpolate(
    frame,
    [publicDelay * fps - 10, publicDelay * fps + 5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const nodeStyle = (color: string): React.CSSProperties => ({
    ...panel.base,
    padding: `${space.lg}px ${space.xl + 8}px`,
    borderRadius: radius.md,
    border: `1px solid ${color}25`,
    boxShadow: `0 0 20px ${color}08, ${shadows.inner}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space.sm,
    width: 220,
  });

  const verticalArrow = (progress: number, _color: string): React.CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    opacity: progress,
    height: 50,
    justifyContent: "center",
  });

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* Left-aligned vertical flow */}
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold, opacity: fadeIn(frame, fps, 0.2), marginBottom: space.lg }}>
            Key Derivation
          </div>

          {/* Seed */}
          <div style={{ ...nodeStyle(colors.gold), opacity: seedOpacity }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: colors.gold }} />
            <span style={{ ...text.codeMD, color: colors.gold }}>Seed</span>
            <span style={{ ...text.codeSM, color: colors.textDim }}>(32 bytes)</span>
          </div>

          {/* Arrow 1 ↓ */}
          <div style={verticalArrow(arrow1Progress, colors.gold)}>
            <div style={{
              width: 1.5,
              flex: 1,
              background: `linear-gradient(180deg, ${colors.gold}35, ${colors.gold})`,
              borderRadius: 1,
            }} />
            <div style={{
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: `7px solid ${colors.gold}`,
            }} />
          </div>

          {/* Secret Key */}
          <div style={{
            ...nodeStyle(colors.negative),
            opacity: secretSlide.opacity,
            transform: `translateX(${secretSlide.translateY}px)`,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: colors.negative }} />
            <span style={{ ...text.codeMD, color: colors.negative }}>Secret Key</span>
            <span style={{ ...text.codeSM, color: colors.textDim }}>S...</span>
          </div>

          {/* Arrow 2 ↓ */}
          <div style={verticalArrow(arrow2Progress, colors.info)}>
            <div style={{
              width: 1.5,
              flex: 1,
              background: `linear-gradient(180deg, ${colors.info}35, ${colors.info})`,
              borderRadius: 1,
            }} />
            <div style={{
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: `7px solid ${colors.info}`,
            }} />
          </div>

          {/* Public Key */}
          <div style={{
            ...nodeStyle(colors.info),
            opacity: publicSlide.opacity,
            transform: `translateX(${publicSlide.translateY}px)`,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: colors.info }} />
            <span style={{ ...text.codeMD, color: colors.info }}>Public Key</span>
            <span style={{ ...text.codeSM, color: colors.textDim }}>G...</span>
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2.2: Base32 Encoding (78.3s to 83.78s) ──
const Base32Encoding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, 0.3);

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* Right-aligned vertical layout */}
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <GlassPanel
          variant="info"
          padding={`${space.xxl}px ${space.xl}px`}
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: space.lg,
            width: 280,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.info }}>
            Encoding
          </div>

          {/* Secret Key */}
          <div
            style={{
              ...panel.accent,
              padding: `${space.md}px ${space.lg + 4}px`,
              borderRadius: radius.md,
              width: "100%",
              textAlign: "center",
            }}
          >
            <span style={{ ...text.codeMD, color: colors.gold }}>Secret (S...)</span>
          </div>

          {/* Arrow ↓ */}
          <div style={{ ...text.bodyMD, color: colors.warmGrey, opacity: fadeIn(frame, fps, 0.8) }}>&#8595;</div>

          {/* Base32 badge */}
          <div style={{ opacity: fadeIn(frame, fps, 1.0) }}>
            <Badge label="Base32 StrKey" delay={1.0} variant="info" size="lg" />
          </div>

          {/* Arrow ↓ */}
          <div style={{ ...text.bodyMD, color: colors.warmGrey, opacity: fadeIn(frame, fps, 1.4) }}>&#8595;</div>

          {/* Public Key */}
          <div
            style={{
              ...panel.surface,
              padding: `${space.md}px ${space.lg + 4}px`,
              borderRadius: radius.md,
              width: "100%",
              textAlign: "center",
              opacity: fadeIn(frame, fps, 1.6),
            }}
          >
            <span style={{ ...text.codeMD, color: colors.info }}>Public (G...)</span>
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2.3: Sign vs Verify — SWAPPED (83.78s to 87.40s) ──
// Verification LEFT, Signing RIGHT
const SignVerify: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* LEFT — Verification */}
      <div style={{ position: "absolute", left: 60, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          variant="positive"
          borderColor={`${colors.positive}20`}
          padding={`${space.xxl - 8}px ${space.xxl - 4}px`}
          style={{
            opacity: slideIn(frame, fps, 0.3).opacity,
            transform: `translateY(${slideIn(frame, fps, 0.3).translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: space.lg - 4,
            width: 420,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.positive }}>
            Verification
          </div>
          <FlowDiagram steps={["Public Key", "Verify", "Network"]} delay={0.5} accentColor={colors.positive} />
        </GlassPanel>
      </div>

      {/* RIGHT — Signing */}
      <div style={{ position: "absolute", right: 60, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          variant="negative"
          borderColor={`${colors.negative}20`}
          padding={`${space.xxl - 8}px ${space.xxl - 4}px`}
          style={{
            opacity: slideIn(frame, fps, 1.0).opacity,
            transform: `translateY(${slideIn(frame, fps, 1.0).translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: space.lg - 4,
            width: 420,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.negative }}>
            Signing
          </div>
          <FlowDiagram steps={["Secret Key", "Sign", "TX"]} delay={1.2} accentColor={colors.negative} />
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2.4: Curve Comparison — Dynamic Names (90.72s to 102.16s) ──
// secp256k1 appears when Bitcoin is mentioned (~91.5s = 0.78s into scene)
// Ed25519 appears when Stellar is mentioned (~93.5s = 2.78s into scene)
const CurveComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bitcoin/secp256k1 mentioned around 91.5s (0.78s into scene)
  const bitcoinDelay = 0.78;
  // Stellar/Ed25519 mentioned around 93.5s (2.78s into scene)
  const stellarDelay = 2.78;

  // Dynamic name typing effect
  const secp256k1Name = "secp256k1";
  const ed25519Name = "Ed25519";

  const secpChars = Math.floor(
    interpolate(
      frame,
      [bitcoinDelay * fps, (bitcoinDelay + 0.6) * fps],
      [0, secp256k1Name.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );
  const edChars = Math.floor(
    interpolate(
      frame,
      [stellarDelay * fps, (stellarDelay + 0.5) * fps],
      [0, ed25519Name.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* LEFT — Bitcoin */}
      <div style={{ position: "absolute", left: 80, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          variant="negative"
          borderColor={`${colors.negative}15`}
          padding={`${space.xxl - 4}px ${space.xxl}px`}
          style={{
            opacity: slideIn(frame, fps, 0.3).opacity,
            transform: `translateY(${slideIn(frame, fps, 0.3).translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: space.lg - 4,
            width: 420,
          }}
        >
          <div
            style={{
              ...text.displayMD,
              fontSize: 44,
              color: colors.negative,
              textShadow: "0 0 30px rgba(251, 113, 133, 0.2)",
            }}
          >
            Bitcoin
          </div>

          {/* Dynamic curve name */}
          <div
            style={{
              ...text.codeLG,
              color: colors.negative,
              minHeight: 32,
              textShadow: `0 0 20px rgba(251, 113, 133, 0.3)`,
            }}
          >
            {secpChars > 0 && (
              <>
                {secp256k1Name.slice(0, secpChars)}
                <span style={{ opacity: frame % 16 < 8 ? 1 : 0, color: colors.negative }}>|</span>
              </>
            )}
          </div>

          <div
            style={{
              ...text.bodySM,
              opacity: fadeIn(frame, fps, bitcoinDelay + 0.8),
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Standards for Efficient Cryptography
            <br />
            256-bit Koblitz curve
          </div>
        </GlassPanel>
      </div>

      {/* RIGHT — Stellar */}
      <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          variant="accent"
          padding={`${space.xxl - 4}px ${space.xxl}px`}
          style={{
            opacity: slideIn(frame, fps, 1.0).opacity,
            transform: `translateY(${slideIn(frame, fps, 1.0).translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: space.lg - 4,
            width: 420,
          }}
        >
          <div
            style={{
              ...text.displayMD,
              fontSize: 44,
              color: colors.gold,
              textShadow: "0 0 30px rgba(253, 218, 36, 0.2)",
            }}
          >
            Stellar
          </div>

          {/* Dynamic curve name */}
          <div
            style={{
              ...text.codeLG,
              color: colors.gold,
              minHeight: 32,
              textShadow: `0 0 20px rgba(253, 218, 36, 0.3)`,
            }}
          >
            {edChars > 0 && (
              <>
                {ed25519Name.slice(0, edChars)}
                <span style={{ opacity: frame % 16 < 8 ? 1 : 0, color: colors.gold }}>|</span>
              </>
            )}
          </div>

          <div
            style={{
              ...text.bodySM,
              opacity: fadeIn(frame, fps, stellarDelay + 0.8),
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Edwards curve
            <br />
            25519-bit prime field
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2.5: Closing question — fullscreen dynamic text — 102.4s to 106.88s ──
const closingWords = [
  { text: "Now,", atSec: 102.40 },
  { text: "you", atSec: 102.78 },
  { text: "have", atSec: 102.98 },
  { text: "an", atSec: 103.18 },
  { text: "identity.", atSec: 103.30 },
  { text: "But", atSec: 104.08 },
  { text: "what", atSec: 104.26 },
  { text: "exactly", atSec: 104.70 },
  { text: "do", atSec: 105.02 },
  { text: "you", atSec: 105.32 },
  { text: "send", atSec: 105.42 },
  { text: "to", atSec: 105.74 },
  { text: "the", atSec: 105.96 },
  { text: "network?", atSec: 106.06 },
];

const CLOSING_START = 102.40;

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
                    ? word.text === "network?"
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

// ── Main Episode 2 — Sequences synced to audioMarks ──
export const Episode2: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 32 Bytes animation — 62.53s to 66.03s (starts 0.5s earlier, ends 0.2s later) */}
      <Sequence from={rel(62.53)} durationInFrames={rel(66.03) - rel(62.53)}>
        <BytesAnimation />
      </Sequence>

      {/* Scene 2.1: Key Flow — 68.23s to 78.3s */}
      <Sequence from={rel(68.23)} durationInFrames={rel(78.3) - rel(68.23)}>
        <KeyFlow />
      </Sequence>

      {/* Scene 2.2: Base32 Encoding — 78.3s to 83.78s */}
      <Sequence from={rel(78.3)} durationInFrames={rel(83.78) - rel(78.3)}>
        <Base32Encoding />
      </Sequence>

      {/* Scene 2.3: Sign vs Verify — 83.78s to 87.40s (swapped sides) */}
      <Sequence from={rel(83.78)} durationInFrames={rel(87.40) - rel(83.78)}>
        <SignVerify />
      </Sequence>

      {/* Scene 2.4: Curve Comparison — 90.72s to 102.16s (dynamic names) */}
      <Sequence from={rel(90.72)} durationInFrames={rel(102.16) - rel(90.72)}>
        <CurveComparison />
      </Sequence>

      {/* Scene 2.5: Closing question — 102.4s to 106.88s */}
      <Sequence from={rel(102.4)} durationInFrames={rel(106.88) - rel(102.4)}>
        <ClosingQuestion />
      </Sequence>

      {/* Lower-third across full episode */}
      <Sequence from={rel(60.8)} durationInFrames={rel(106.88) - rel(60.8)}>
        <LowerThird title="Wallet: Cryptographic Identity" subtitle="Episode 02" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
