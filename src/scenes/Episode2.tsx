import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn, slideIn } from "../animations/springs";
import { FlowDiagram } from "../components/FlowDiagram";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to ep2 start (57.68s) ──
const EP = episodes.ep2.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Scene 2.1: Key Flow (VIDEO + OVERLAY) — 60.8s to 78.3s ──
// Seed → Secret Key → Public Key
const KeyFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 36,
        }}
      >
        <GlassPanel
          padding="48px 56px"
          borderColor={colors.borderGold}
          glow={colors.glowGold}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            maxWidth: 860,
          }}
        >
          <div
            style={{
              fontFamily: fonts.accent,
              fontSize: 18,
              color: colors.gold,
              letterSpacing: 6,
              textTransform: "uppercase",
              opacity: fadeIn(frame, fps, 0.2),
            }}
          >
            Deterministic Key Derivation
          </div>

          <FlowDiagram
            steps={["Seed (32 bytes)", "Secret Key (S...)", "Public Key (G...)"]}
            delay={0.5}
            accentColor={colors.gold}
          />

          <div style={{ display: "flex", gap: 80, justifyContent: "center" }}>
            <div
              style={{
                opacity: fadeIn(frame, fps, 2.0),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: colors.gold,
                  boxShadow: `0 0 8px rgba(253, 218, 36, 0.4)`,
                }}
              />
              <div style={{ fontSize: 14, fontFamily: fonts.code, color: colors.warmGrey }}>
                256-bit random
              </div>
            </div>
            <div
              style={{
                opacity: fadeIn(frame, fps, 2.5),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: colors.teal,
                  boxShadow: `0 0 8px rgba(0, 167, 181, 0.4)`,
                }}
              />
              <div style={{ fontSize: 14, fontFamily: fonts.code, color: colors.warmGrey }}>
                Ed25519 derivation
              </div>
            </div>
          </div>
        </GlassPanel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 2.2: Base32 Encoding (VIDEO + OVERLAY) — 78.3s to 83.78s ──
const Base32Encoding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, 0.3);

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <GlassPanel
          padding="48px 56px"
          borderColor={colors.borderTeal}
          glow={colors.glowTeal}
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            maxWidth: 600,
          }}
        >
          <div
            style={{
              fontFamily: fonts.accent,
              fontSize: 18,
              color: colors.teal,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Encoding
          </div>

          {/* Circular connection */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div
              style={{
                padding: "16px 28px",
                borderRadius: 12,
                border: `1px solid ${colors.borderGold}`,
                background: colors.bgGlass,
                fontFamily: fonts.code,
                fontSize: 18,
                color: colors.gold,
              }}
            >
              Secret (S...)
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 20, color: colors.warmGrey }}>↔</div>
            </div>

            <div
              style={{
                padding: "16px 28px",
                borderRadius: 12,
                border: `1px solid ${colors.borderTeal}`,
                background: colors.bgGlass,
                fontFamily: fonts.code,
                fontSize: 18,
                color: colors.teal,
              }}
            >
              Public (G...)
            </div>
          </div>

          {/* Arrow to Base32 */}
          <div
            style={{
              opacity: fadeIn(frame, fps, 1.0),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 20, color: colors.warmGrey }}>↓</div>
            <Badge label="Base32 StrKey Encoding" delay={1.2} variant="teal" size="lg" />
          </div>
        </GlassPanel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 2.3: Sign vs Verify (VIDEO + OVERLAY) — 83.78s to 90.72s ──
// Secret signs LEFT, Public verifies RIGHT
const SignVerify: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      {/* LEFT — Signing */}
      <div style={{ position: "absolute", left: 60, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          padding="40px 44px"
          borderColor={`${colors.warning}20`}
          glow={colors.glowWarning}
          style={{
            opacity: slideIn(frame, fps, 0.3).opacity,
            transform: `translateY(${slideIn(frame, fps, 0.3).translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            width: 420,
          }}
        >
          <div
            style={{
              fontFamily: fonts.accent,
              fontSize: 18,
              color: colors.warning,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Signing
          </div>
          <FlowDiagram steps={["Secret Key", "Sign", "TX"]} delay={0.5} accentColor={colors.warning} />
        </GlassPanel>
      </div>

      {/* RIGHT — Verification */}
      <div style={{ position: "absolute", right: 60, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          padding="40px 44px"
          borderColor={`${colors.success}20`}
          glow={colors.glowSuccess}
          style={{
            opacity: slideIn(frame, fps, 1.0).opacity,
            transform: `translateY(${slideIn(frame, fps, 1.0).translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            width: 420,
          }}
        >
          <div
            style={{
              fontFamily: fonts.accent,
              fontSize: 18,
              color: colors.success,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Verification
          </div>
          <FlowDiagram steps={["Public Key", "Verify", "Network"]} delay={1.2} accentColor={colors.success} />
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2.4: Curve Comparison (VIDEO + OVERLAY) — 90.72s to 102.16s ──
// Bitcoin LEFT, Stellar RIGHT
const CurveComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      {/* LEFT — Bitcoin */}
      <div style={{ position: "absolute", left: 80, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          padding="44px 48px"
          borderColor={`${colors.warning}15`}
          glow={colors.glowWarning}
          style={{
            opacity: slideIn(frame, fps, 0.3).opacity,
            transform: `translateY(${slideIn(frame, fps, 0.3).translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            width: 420,
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontFamily: fonts.display,
              fontWeight: 700,
              color: colors.warning,
              textShadow: `0 0 30px rgba(251, 113, 133, 0.2)`,
            }}
          >
            Bitcoin
          </div>
          <Badge label="secp256k1" delay={0.8} variant="warning" size="lg" />
          <div
            style={{
              opacity: fadeIn(frame, fps, 1.5),
              fontSize: 16,
              fontFamily: fonts.body,
              color: colors.warmGrey,
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
          padding="44px 48px"
          borderColor={colors.borderGold}
          glow={colors.glowGold}
          style={{
            opacity: slideIn(frame, fps, 1.0).opacity,
            transform: `translateY(${slideIn(frame, fps, 1.0).translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            width: 420,
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontFamily: fonts.display,
              fontWeight: 700,
              color: colors.gold,
              textShadow: `0 0 30px rgba(253, 218, 36, 0.2)`,
            }}
          >
            Stellar
          </div>
          <Badge label="Ed25519" delay={1.5} variant="gold" size="lg" />
          <div
            style={{
              opacity: fadeIn(frame, fps, 2.2),
              fontSize: 16,
              fontFamily: fonts.body,
              color: colors.warmGrey,
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
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.6)" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 64,
            fontWeight: 700,
            color: colors.textPrimary,
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
    <AbsoluteFill style={{ fontFamily: fonts.body }}>
      {/* Scene 2.1: Key Flow — 60.8s to 78.3s */}
      <Sequence from={rel(60.8)} durationInFrames={rel(78.3) - rel(60.8)}>
        <KeyFlow />
      </Sequence>

      {/* Scene 2.2: Base32 Encoding — 78.3s to 83.78s */}
      <Sequence from={rel(78.3)} durationInFrames={rel(83.78) - rel(78.3)}>
        <Base32Encoding />
      </Sequence>

      {/* Scene 2.3: Sign vs Verify — 83.78s to 90.72s */}
      <Sequence from={rel(83.78)} durationInFrames={rel(90.72) - rel(83.78)}>
        <SignVerify />
      </Sequence>

      {/* Scene 2.4: Curve Comparison — 90.72s to 102.16s */}
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
