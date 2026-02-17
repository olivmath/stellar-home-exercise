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
import { colors, fonts } from "../styles/theme";
import { fadeIn, slideIn } from "../animations/springs";
import { FounderCard } from "../components/FounderCard";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";
import { ComparisonGrid } from "../components/ComparisonGrid";
import { NarrationText } from "../components/NarrationText";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to episode start (0s) ──
const EP = episodes.ep1.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Scene 1.1: Year 2014 (VIDEO + OVERLAY) — 10.3s to 16.88s ──
const Year2014: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const yearOpacity = fadeIn(frame, fps, 0.2);
  const yearScale = interpolate(frame, [6, 40], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const { opacity: textOpacity, translateY } = slideIn(frame, fps, 0.8);

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontFamily: fonts.accent,
            color: colors.gold,
            opacity: yearOpacity,
            transform: `scale(${yearScale})`,
            letterSpacing: 8,
            textShadow: `0 0 60px rgba(253, 218, 36, 0.2)`,
            lineHeight: 1,
          }}
        >
          2014
        </div>
        <h3
          style={{
            fontSize: 38,
            fontFamily: fonts.display,
            fontWeight: 700,
            color: colors.textPrimary,
            margin: 0,
            textAlign: "center",
            opacity: textOpacity,
            transform: `translateY(${translateY}px)`,
          }}
        >
          Stellar was created to make
          <br />
          <span style={{ color: colors.gold }}>financial systems more open</span>
        </h3>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 1.2: Founders (VIDEO + OVERLAY) — 10.3s to 17.3s ──
// Cards positioned LEFT and RIGHT to avoid covering face
const Founders: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: "0 80px",
        }}
      >
        {/* LEFT — Jed McCaleb */}
        <div style={{ position: "absolute", left: 80, top: "50%", transform: "translateY(-50%)" }}>
          <FounderCard
            name="Jed McCaleb"
            subtitle="Co-founder"
            photo="jed-maccaleb.jpg"

            delay={0.3}
          />
        </div>

        {/* RIGHT — Joyce Kim */}
        <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)" }}>
          <FounderCard
            name="Joyce Kim"
            subtitle="Co-founder"
            photo="joyce-kim.jpeg"
            delay={0.7}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 1.3: SDF (VIDEO + OVERLAY) — 17.3s to 27.08s ──
// Card RIGHT, dynamic narration LEFT
const sdfWords = [
  { text: "The", atSec: 22.08 },
  { text: "goal", atSec: 22.20 },
  { text: "is", atSec: 22.36 },
  { text: "clear:", atSec: 22.52 },
  { text: "financial", atSec: 23.16 },
  { text: "inclusion", atSec: 23.38 },
  { text: "and", atSec: 24.00 },
  { text: "efficient", atSec: 24.32 },
  { text: "global", atSec: 24.68 },
  { text: "settlement.", atSec: 25.18 },
];

const SDF: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, 0.3);
  const badgeOpacity = fadeIn(frame, fps, 1.0);

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      {/* LEFT — Dynamic narration text */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <GlassPanel
          padding="40px 44px"
          borderColor={colors.borderSubtle}
          style={{ maxWidth: 480, opacity: fadeIn(frame, fps, 4.5) }}
        >
          <NarrationText words={sdfWords} sceneStartSec={17.3} delay={4.5} />
        </GlassPanel>
      </div>

      {/* RIGHT — SDF card */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <GlassPanel
          padding="56px 64px"
          borderColor={colors.borderGold}
          glow={colors.glowGold}
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            maxWidth: 420,
          }}
        >
          <Img
            src={staticFile("images/branding/stellar-logo.svg")}
            style={{ width: 72, height: 72, opacity: 0.9 }}
          />

          <h3
            style={{
              fontSize: 36,
              fontFamily: fonts.display,
              fontWeight: 700,
              color: colors.textPrimary,
              margin: 0,
              textAlign: "center",
            }}
          >
            Stellar Development Foundation
          </h3>

          <div
            style={{
              fontSize: 22,
              fontFamily: fonts.body,
              color: colors.gold,
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            501(c)(3) Non-Profit
          </div>

          <div style={{ opacity: badgeOpacity }}>
            <Badge label="Financial Inclusion" delay={0.8} variant="success" />
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 1.4: Transaction Fee (VIDEO + OVERLAY) — 27.08s to 33.44s ──
const TransactionFee: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, 0.3);
  const feeOpacity = fadeIn(frame, fps, 0.8);

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            fontSize: 36,
            fontFamily: fonts.display,
            fontWeight: 700,
            color: colors.textPrimary,
            textAlign: "center",
          }}
        >
          User pays per transaction
        </div>

        <div
          style={{
            opacity: feeOpacity,
            fontSize: 64,
            fontFamily: fonts.accent,
            color: colors.gold,
            letterSpacing: 4,
            textShadow: `0 0 40px rgba(253, 218, 36, 0.25)`,
          }}
        >
          $0.00000167 USD
        </div>

        <div
          style={{
            opacity: feeOpacity,
            fontSize: 18,
            fontFamily: fonts.body,
            color: colors.warmGrey,
          }}
        >
          Only for spam prevention
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 1.5: Miners vs Validators (VIDEO + OVERLAY) ──
// Miners LEFT (appears first), Validators RIGHT (1s later)
const MinersVsValidators: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity: minerOpacity, translateY: minerY } = slideIn(frame, fps, 0.3);
  const { opacity: validatorOpacity, translateY: validatorY } = slideIn(frame, fps, 1.3);

  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: 440,
  };

  const itemStyle = (accentColor: string): React.CSSProperties => ({
    fontFamily: fonts.body,
    fontSize: 22,
    color: colors.textPrimary,
    padding: "18px 24px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    borderLeft: `3px solid ${accentColor}`,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      {/* LEFT — Miners */}
      <div style={{ position: "absolute", left: 80, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          padding="44px 48px"
          borderColor={`${colors.warning}20`}
          glow={colors.glowWarning}
          style={{ opacity: minerOpacity, transform: `translateY(${minerY}px)`, ...cardStyle }}
        >
          <div style={{ fontFamily: fonts.accent, fontSize: 28, color: colors.warning, letterSpacing: 4, textTransform: "uppercase" }}>
            Miners
          </div>
          <div style={itemStyle(colors.warning)}>High Energy Cost</div>
          <div style={{ ...itemStyle(colors.warning), opacity: fadeIn(frame, fps, 0.8) }}>Inflation</div>
        </GlassPanel>
      </div>

      {/* RIGHT — Validators */}
      <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          padding="44px 48px"
          borderColor={`${colors.success}20`}
          glow={colors.glowSuccess}
          style={{ opacity: validatorOpacity, transform: `translateY(${validatorY}px)`, ...cardStyle }}
        >
          <div style={{ fontFamily: fonts.accent, fontSize: 28, color: colors.success, letterSpacing: 4, textTransform: "uppercase" }}>
            Validators
          </div>
          <div style={itemStyle(colors.success)}>Utility & Interoperability</div>
          <div style={{ ...itemStyle(colors.success), opacity: fadeIn(frame, fps, 1.8) }}>Zero Inflation</div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 1.6: CAPs (VIDEO + OVERLAY) — 44.02s to 55.52s ──
const CAPs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, 0.3);
  const descOpacity = fadeIn(frame, fps, 1.0);

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          padding="56px 64px"
          borderColor={colors.borderTeal}
          glow={colors.glowTeal}
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            maxWidth: 500,
          }}
        >
          <div
            style={{
              fontFamily: fonts.accent,
              fontSize: 20,
              color: colors.teal,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Governance
          </div>

          <h3
            style={{
              fontSize: 44,
              fontFamily: fonts.display,
              fontWeight: 700,
              color: colors.textPrimary,
              margin: 0,
              textAlign: "center",
            }}
          >
            CAP
          </h3>

          <div
            style={{
              fontSize: 22,
              fontFamily: fonts.body,
              color: colors.gold,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Core Advancement Proposals
          </div>

          <div
            style={{
              opacity: descOpacity,
              fontSize: 20,
              fontFamily: fonts.body,
              color: colors.warmGrey,
              textAlign: "center",
              lineHeight: 1.6,
              maxWidth: 560,
            }}
          >
            Upgrades based on validator community consensus
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 1.7: Closing question — fullscreen dynamic text — 50.94s to 55.52s ──
const closingWords = [
  { text: "How", atSec: 53.10 },
  { text: "does", atSec: 53.28 },
  { text: "a", atSec: 53.58 },
  { text: "user", atSec: 54.00 },
  { text: "enter", atSec: 54.42 },
  { text: "this", atSec: 55.00 },
  { text: "network?", atSec: 55.14 },
];

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
            const wordFrame = Math.round((word.atSec - 51.89) * fps);
            const visible = frame >= wordFrame;
            return (
              <span
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  color: visible ? (word.text === "network?" ? colors.gold : colors.textPrimary) : "transparent",
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

// ── Main Episode 1 — Sequences synced to audioMarks ──
export const Episode1: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: fonts.body }}>
      {/* Scene 1.1: Year 2014 — 10.3s to 17.3s (ends with founders) */}
      <Sequence from={rel(10.3)} durationInFrames={rel(17.3) - rel(10.3)}>
        <Year2014 />
      </Sequence>

      {/* Scene 1.2: Founders — 10.3s to 17.3s */}
      <Sequence from={rel(10.3)} durationInFrames={rel(17.3) - rel(10.3)}>
        <Founders />
      </Sequence>

      {/* Scene 1.3: SDF — 17.3s to 27.08s */}
      <Sequence from={rel(17.3)} durationInFrames={rel(27.08) - rel(17.3)}>
        <SDF />
      </Sequence>

      {/* Scene 1.4: Transaction Fee — 27.08s to 33.04s (-0.4s) */}
      <Sequence from={rel(27.08)} durationInFrames={rel(33.04) - rel(27.08)}>
        <TransactionFee />
      </Sequence>

      {/* Scene 1.5: Miners vs Validators — 32.74s to 41.72s — LEFT + RIGHT */}
      <Sequence from={rel(32.74)} durationInFrames={rel(41.10) - rel(32.74)}>
        <MinersVsValidators />
      </Sequence>

      {/* Scene 1.6: CAPs — 44.02s to 55.52s */}
      <Sequence from={rel(44.02)} durationInFrames={rel(51.00) - rel(44.02)}>
        <CAPs />
      </Sequence>

      {/* Scene 1.7: Closing question — fullscreen — 51.89s to 55.52s */}
      <Sequence from={rel(51.89)} durationInFrames={rel(55.52) - rel(51.89)}>
        <ClosingQuestion />
      </Sequence>

      {/* Lower-third across full episode — starts after opening */}
      <Sequence from={toFrame(11)} durationInFrames={rel(55.52) - toFrame(12)}>
        <LowerThird title="Foundation & Network Economics" subtitle="Episode 01" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
