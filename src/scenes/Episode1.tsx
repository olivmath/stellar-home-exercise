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
            photo="jed-mccaleb.jpg"
            logos={["Ripple", "Mt. Gox"]}
            delay={0.3}
          />
        </div>

        {/* RIGHT — Joyce Kim */}
        <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)" }}>
          <FounderCard
            name="Joyce Kim"
            subtitle="Co-founder"
            photo="joyce-kim.jpg"
            delay={0.7}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 1.3: SDF (VIDEO + OVERLAY) — 17.3s to 27.08s ──
const SDF: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, 0.3);
  const badgeOpacity = fadeIn(frame, fps, 1.0);

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
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
            maxWidth: 640,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 16,
              background: `linear-gradient(135deg, rgba(253, 218, 36, 0.08), rgba(0, 167, 181, 0.05))`,
              border: `1px solid ${colors.borderGold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: colors.glowGold,
              padding: 14,
            }}
          >
            <Img
              src={staticFile("images/branding/sdf-badge.svg")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          <h3
            style={{
              fontSize: 40,
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
      </AbsoluteFill>
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
          ~$0.0001
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

// ── Scene 1.5: Miners vs Validators (ANIMATION FULL) — 33.72s to 44.02s ──
const MinersVsValidators: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <ComparisonGrid
          left={{
            title: "Miners",
            variant: "warning",
            items: ["High Energy Cost", "Inflation"],
          }}
          right={{
            title: "Validators",
            variant: "success",
            items: ["Utility & Interoperability", "Zero Inflation"],
          }}
          delay={0.3}
        />
      </AbsoluteFill>
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
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
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
            maxWidth: 700,
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
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Main Episode 1 — Sequences synced to audioMarks ──
export const Episode1: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: fonts.body }}>
      {/* Scene 1.1: Year 2014 — 10.3s to 16.88s */}
      <Sequence from={rel(10.3)} durationInFrames={rel(16.88) - rel(10.3)}>
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

      {/* Scene 1.4: Transaction Fee — 27.08s to 33.44s */}
      <Sequence from={rel(27.08)} durationInFrames={rel(33.44) - rel(27.08)}>
        <TransactionFee />
      </Sequence>

      {/* Scene 1.5: Miners vs Validators — 33.72s to 44.02s */}
      <Sequence from={rel(33.72)} durationInFrames={rel(44.02) - rel(33.72)}>
        <MinersVsValidators />
      </Sequence>

      {/* Scene 1.6: CAPs — 44.02s to 55.52s */}
      <Sequence from={rel(44.02)} durationInFrames={rel(55.52) - rel(44.02)}>
        <CAPs />
      </Sequence>

      {/* Lower-third across full episode */}
      <Sequence from={toFrame(2)} durationInFrames={rel(55.52) - toFrame(2)}>
        <LowerThird title="Foundation & Network Economics" subtitle="Episode 01" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
