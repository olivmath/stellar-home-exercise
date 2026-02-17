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
import { EpisodeTitle } from "../components/EpisodeTitle";
import { FounderCard } from "../components/FounderCard";
import { FlowDiagram } from "../components/FlowDiagram";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";
import { NetworkBackground } from "../components/NetworkBackground";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to episode start (0s) ──
// ep1 narration: 0s → 55.52s
const EP = episodes.ep1.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Shot 2: History (VIDEO + OVERLAY) — 0s to 10.3s ──
const HistoryIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const yearOpacity = fadeIn(frame, fps, 0.2);
  const yearScale = interpolate(frame, [6, 40], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const { opacity: textOpacity, translateY: textTranslateY } = slideIn(frame, fps, 0.8);
  const narrativeOpacity = fadeIn(frame, fps, 1.5);

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      <Sequence from={0} durationInFrames={toFrame(4.5)}>
        <EpisodeTitle number="01" title="Foundation & Network Economics" />
      </Sequence>

      <Sequence from={toFrame(4.5)} durationInFrames={rel(10.3) - toFrame(4.5)}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 120 }}>
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(253, 218, 36, 0.06) 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%, -60%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, textAlign: "center" }}>
            <div style={{ fontSize: 140, fontFamily: fonts.accent, color: colors.gold, opacity: yearOpacity, transform: `scale(${yearScale})`, letterSpacing: 8, textShadow: `0 0 60px rgba(253, 218, 36, 0.2)`, lineHeight: 1 }}>
              2014
            </div>
            <h3 style={{ fontSize: 44, fontFamily: fonts.display, fontWeight: 700, color: colors.textPrimary, margin: 0, lineHeight: 1.35, opacity: textOpacity, transform: `translateY(${textTranslateY}px)` }}>
              Stellar was created to make<br />
              <span style={{ color: colors.gold }}>financial systems more open</span>
            </h3>
            <p style={{ fontSize: 22, fontFamily: fonts.body, color: colors.warmGrey, maxWidth: 700, lineHeight: 1.7, margin: 0, opacity: narrativeOpacity }}>
              Originally forked from Ripple, then rebuilt with a new consensus protocol — the Stellar Consensus Protocol (SCP).
            </p>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// ── Shot 3: Founders (ANIMATION FULL) — 10.3s to 17.3s ──
const Founders: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = fadeIn(frame, fps, 0.2);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      <NetworkBackground opacity={0.05} speed={0.3} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 56, flexDirection: "column" }}>
        <div style={{ fontSize: 16, fontFamily: fonts.accent, color: colors.gold, letterSpacing: 8, textTransform: "uppercase", opacity: titleOpacity, textShadow: `0 0 20px rgba(253, 218, 36, 0.2)` }}>
          CO-FOUNDERS
        </div>
        <div style={{ display: "flex", gap: 72, alignItems: "flex-start", zIndex: 1 }}>
          <FounderCard name="Jed McCaleb" subtitle="Co-founder" photo="jed-mccaleb.jpg" logos={["Ripple", "Mt. Gox"]} delay={0.5} />
          <FounderCard name="Joyce Kim" subtitle="Co-founder" photo="joyce-kim.jpg" delay={1.0} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Shot 4: Organization/SDF (VIDEO + OVERLAY) — 17.3s to 27.08s ──
const Organization: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, 0.3);
  const badgeOpacity = fadeIn(frame, fps, 1.2);

  return (
    <AbsoluteFill style={{ backgroundColor: "rgba(15, 15, 15, 0.55)" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", border: `1px solid ${colors.borderGold}`, top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: fadeIn(frame, fps, 0.5) * 0.3, pointerEvents: "none" }} />
        <GlassPanel padding="64px" borderColor={colors.borderGold} glow={colors.glowGold}
          style={{ opacity, transform: `translateY(${translateY}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 28, maxWidth: 680, zIndex: 1 }}
        >
          <div style={{ width: 96, height: 96, borderRadius: 18, background: `linear-gradient(135deg, rgba(253, 218, 36, 0.08), rgba(0, 167, 181, 0.05))`, border: `1px solid ${colors.borderGold}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: colors.glowGold, padding: 16 }}>
            <Img src={staticFile("images/branding/sdf-badge.svg")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <h3 style={{ fontSize: 44, fontFamily: fonts.display, fontWeight: 700, color: colors.textPrimary, margin: 0, textAlign: "center" }}>
            Stellar Development Foundation
          </h3>
          <div style={{ fontSize: 20, fontFamily: fonts.body, color: colors.warmGrey, lineHeight: 1.6 }}>
            Non-profit stewarding the network
          </div>
          <div style={{ opacity: badgeOpacity }}>
            <Badge label="Financial Inclusion" delay={0.8} variant="success" />
          </div>
        </GlassPanel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Shot 5: Network Economics (ANIMATION FULL) — 27.08s to 55.52s ──
const NetworkEconomics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = fadeIn(frame, fps, 0.2);
  const feeOpacity = fadeIn(frame, fps, 1.5);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      <div style={{ position: "absolute", width: 600, height: 300, background: `radial-gradient(ellipse, rgba(0, 167, 181, 0.04) 0%, transparent 70%)`, top: "15%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 44 }}>
        <div style={{ opacity: titleOpacity, fontSize: 40, fontFamily: fonts.display, fontWeight: 700, color: colors.textPrimary, letterSpacing: -0.5 }}>
          Transaction Flow
        </div>
        <FlowDiagram steps={["Sender", "Network", "Receiver"]} delay={0.5} accentColor={colors.teal} />
        <div style={{ opacity: feeOpacity, display: "flex", alignItems: "center", gap: 16, marginTop: 4 }}>
          <div style={{ fontSize: 18, fontFamily: fonts.code, color: colors.warmGrey }}>Base fee:</div>
          <Badge label="0.00001 XLM" variant="gold" size="sm" />
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
          <Badge label="No miners" delay={2.0} variant="warning" />
          <Badge label="Validators" delay={2.5} variant="teal" />
          <Badge label="No block rewards" delay={3.0} variant="warning" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Main Episode 1 — Sequences synced to audioMarks ──
export const Episode1: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: fonts.body }}>
      {/* Shot 2: History — 0s to 10.3s */}
      <Sequence from={0} durationInFrames={rel(10.3)}>
        <HistoryIntro />
      </Sequence>

      {/* Shot 3: Founders — 10.3s to 17.3s */}
      <Sequence from={rel(10.3)} durationInFrames={rel(17.3) - rel(10.3)}>
        <Founders />
      </Sequence>

      {/* Shot 4: Organization/SDF — 17.3s to 27.08s */}
      <Sequence from={rel(17.3)} durationInFrames={rel(27.08) - rel(17.3)}>
        <Organization />
      </Sequence>

      {/* Shot 5: Network Economics — 27.08s to 55.52s */}
      <Sequence from={rel(27.08)} durationInFrames={rel(55.52) - rel(27.08)}>
        <NetworkEconomics />
      </Sequence>

      {/* Lower-third across full episode */}
      <Sequence from={toFrame(2)} durationInFrames={rel(55.52) - toFrame(2)}>
        <LowerThird title="Foundation & Network Economics" subtitle="Episode 01" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
