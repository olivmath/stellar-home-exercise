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
import { text, space, shadows, layout, radius, panel } from "../styles/designSystem";
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
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          ...layout.centerColumn,
          gap: space.lg,
        }}
      >
        <div
          style={{
            ...text.overlineLG,
            fontSize: 140,
            color: colors.accent,
            opacity: yearOpacity,
            transform: `scale(${yearScale})`,
            letterSpacing: 8,
            textShadow: shadows.accent,
            lineHeight: 1,
          }}
        >
          2014
        </div>
        <h3
          style={{
            ...text.displayMD,
            margin: 0,
            textAlign: "center",
            opacity: textOpacity,
            transform: `translateY(${translateY}px)`,
          }}
        >
          Stellar was created to make
          <br />
          <span style={{ color: colors.accent }}>financial systems more open</span>
        </h3>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 1.2: Founders (VIDEO + OVERLAY) — 10.3s to 17.3s ──
// Cards positioned LEFT and RIGHT to avoid covering face
const Founders: React.FC = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          ...layout.centerRow,
          padding: `0 ${space.section}px`,
        }}
      >
        {/* LEFT — Jed McCaleb */}
        <div style={{ position: "absolute", left: space.section, top: "50%", transform: "translateY(-50%)" }}>
          <FounderCard
            name="Jed McCaleb"
            subtitle="Co-founder"
            photo="jed-maccaleb.jpg"

            delay={0.3}
          />
        </div>

        {/* RIGHT — Joyce Kim */}
        <div style={{ position: "absolute", right: space.section, top: "50%", transform: "translateY(-50%)" }}>
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
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* LEFT — Dynamic narration text */}
      <div
        style={{
          position: "absolute",
          left: space.section,
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
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <GlassPanel
          padding="56px 64px"
          borderColor={colors.borderAccent}
          glow={shadows.accent}
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            ...layout.centerColumn,
            gap: space.lg,
            maxWidth: 420,
          }}
        >
          <Img
            src={staticFile("images/branding/stellar-logo.svg")}
            style={{ width: 72, height: 72, opacity: 0.9 }}
          />

          <h3
            style={{
              ...text.h1,
              margin: 0,
              textAlign: "center",
            }}
          >
            Stellar Development Foundation
          </h3>

          <div
            style={{
              ...text.h2,
              color: colors.accent,
              letterSpacing: 2,
            }}
          >
            501(c)(3) Non-Profit
          </div>

          <div style={{ opacity: badgeOpacity }}>
            <Badge label="Financial Inclusion" delay={0.8} variant="positive" />
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
  const xlmOpacity = fadeIn(frame, fps, 0.8);
  const usdSlide = slideIn(frame, fps, 1.4);

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <AbsoluteFill style={{ ...layout.centerColumn, gap: space.xl }}>
        <div
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            ...text.h1,
            textAlign: "center",
          }}
        >
          User pays per transaction
        </div>

        {/* Fee display: XLM primary, USD secondary */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: space.sm,
          }}
        >
          {/* XLM — primary */}
          <div
            style={{
              opacity: xlmOpacity,
              ...text.overlineLG,
              fontSize: 64,
              color: colors.accent,
              letterSpacing: 4,
              textShadow: shadows.accent,
            }}
          >
            0.00001 XLM
          </div>

          {/* Divider + USD — secondary */}
          <div
            style={{
              opacity: usdSlide.opacity,
              transform: `translateY(${usdSlide.translateY}px)`,
              display: "flex",
              alignItems: "center",
              gap: space.md,
            }}
          >
            <div
              style={{
                width: 32,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${colors.textDim})`,
              }}
            />
            <span
              style={{
                ...text.bodyLG,
                color: colors.white,
                letterSpacing: 1,
              }}
            >
              ≈ $0.00000167 USD
            </span>
            <div
              style={{
                width: 32,
                height: 1,
                background: `linear-gradient(90deg, ${colors.textDim}, transparent)`,
              }}
            />
          </div>
        </div>

        <div
          style={{
            opacity: xlmOpacity,
            ...text.bodyMD,
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
// Both on RIGHT — Miner at BOTTOM (appears first), Validator on TOP (1s later)
const MinersVsValidators: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity: minerOpacity, translateY: minerY } = slideIn(frame, fps, 0.3);
  const { opacity: validatorOpacity, translateY: validatorY } = slideIn(frame, fps, 1.3);

  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: space.lg,
    width: 440,
  };

  const itemStyle: React.CSSProperties = {
    ...text.bodyLG,
    padding: `${space.md}px ${space.lg}px`,
    ...panel.surface,
    borderRadius: radius.sm,
  };

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* RIGHT column — stacked vertically */}
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: space.xl,
        }}
      >
        {/* TOP — Validators (appears second, 1s later) */}
        <div
          style={{
            ...panel.base,
            padding: `${space.xxl}px ${space.xxl}px`,
            opacity: validatorOpacity,
            transform: `translateY(${validatorY}px)`,
            ...cardStyle,
          }}
        >
          <div style={{ ...text.overlineLG, color: colors.positive }}>
            Validators
          </div>
          <div style={itemStyle}>Utility & Interoperability</div>
          <div style={{ ...itemStyle, opacity: fadeIn(frame, fps, 1.8) }}>Zero Inflation</div>
        </div>

        {/* BOTTOM — Miners (appears first) */}
        <div
          style={{
            ...panel.base,
            padding: `${space.xxl}px ${space.xxl}px`,
            opacity: minerOpacity,
            transform: `translateY(${minerY}px)`,
            ...cardStyle,
          }}
        >
          <div style={{ ...text.overlineLG, color: colors.negative }}>
            Miners
          </div>
          <div style={itemStyle}>High Energy Cost</div>
          <div style={{ ...itemStyle, opacity: fadeIn(frame, fps, 0.8) }}>Inflation</div>
        </div>
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
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <div style={{ position: "absolute", left: space.section, top: "50%", transform: "translateY(-50%)" }}>
        <GlassPanel
          padding="56px 64px"
          borderColor={colors.borderMedium}
          glow={shadows.accent}
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            ...layout.centerColumn,
            gap: space.xl,
            maxWidth: 500,
          }}
        >
          <div
            style={{
              ...text.overlineMD,
              color: colors.info,
            }}
          >
            Governance
          </div>

          <h3
            style={{
              ...text.displayMD,
              margin: 0,
              textAlign: "center",
            }}
          >
            CAP
          </h3>

          <div
            style={{
              ...text.h2,
              color: colors.accent,
              textAlign: "center",
            }}
          >
            Core Advancement Proposals
          </div>

          <div
            style={{
              opacity: descOpacity,
              ...text.bodyLG,
              color: colors.warmGrey,
              textAlign: "center",
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
    <AbsoluteFill style={layout.dimOverlay(0.6)}>
      <AbsoluteFill style={layout.centerColumn}>
        <div
          style={{
            ...text.displayXL,
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
                  color: visible ? (word.text === "network?" ? colors.accent : colors.textPrimary) : "transparent",
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
    <AbsoluteFill>
      {/* Shadow overlay — video → shadow → content */}
      <Sequence from={rel(10.3)} durationInFrames={rel(17.3) - rel(10.3)}>
        <AbsoluteFill style={layout.dimOverlay(0.55)} />
      </Sequence>

      {/* Scene 1.1 + 1.2: Year 2014 + Founders — on top of shadow */}
      <Sequence from={rel(10.3)} durationInFrames={rel(17.3) - rel(10.3)}>
        <Year2014 />
      </Sequence>
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
