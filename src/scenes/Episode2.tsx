import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn, slideIn } from "../animations/springs";
import { EpisodeTitle } from "../components/EpisodeTitle";
import { FlowDiagram } from "../components/FlowDiagram";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to ep2 start (57.68s) ──
const EP = episodes.ep2.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Shot 6: Seed Generation (VIDEO + OVERLAY) — 57.68s to 83.78s ──
const SeedGeneration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const annotationOpacity1 = fadeIn(frame, fps, 2.0);
  const annotationOpacity2 = fadeIn(frame, fps, 2.5);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "rgba(15, 15, 15, 0.55)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 40,
        padding: "80px 120px",
      }}
    >
      <div style={{ position: "absolute", width: 600, height: 400, background: `radial-gradient(ellipse, rgba(253, 218, 36, 0.05) 0%, transparent 70%)`, top: "30%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />

      <EpisodeTitle number="02" title="Wallet: Cryptographic Identity" />

      <GlassPanel padding="48px" borderColor={colors.borderGold} glow={colors.glowGold}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, width: "100%", maxWidth: 900 }}
      >
        <FlowDiagram steps={["Entropy", "Seed", "Secret (S...)", "Public (G...)"]} delay={1.5} accentColor={colors.gold} />

        <div style={{ display: "flex", gap: 100, justifyContent: "center", width: "100%" }}>
          <div style={{ opacity: annotationOpacity1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: colors.gold, boxShadow: `0 0 8px rgba(253, 218, 36, 0.4)` }} />
            <div style={{ fontSize: 14, fontFamily: fonts.code, color: colors.warmGrey, letterSpacing: 0.5 }}>256-bit random</div>
          </div>
          <div style={{ opacity: annotationOpacity2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: colors.teal, boxShadow: `0 0 8px rgba(0, 167, 181, 0.4)` }} />
            <div style={{ fontSize: 14, fontFamily: fonts.code, color: colors.warmGrey, letterSpacing: 0.5 }}>Ed25519 derivation</div>
          </div>
        </div>
      </GlassPanel>
    </AbsoluteFill>
  );
};

// ── Shot 7: Signature Flow (ANIMATION FULL) — 83.78s to 90.72s ──
const SignatureFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = fadeIn(frame, fps, 0.2);
  const dividerOpacity = fadeIn(frame, fps, 2.2);

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.bgPrimary, justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 44, padding: "60px 120px" }}
    >
      <div style={{ opacity: titleOpacity, fontSize: 40, fontFamily: fonts.display, fontWeight: 700, color: colors.textPrimary, letterSpacing: -0.5 }}>
        Digital Signature Flow
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ opacity: fadeIn(frame, fps, 0.5), fontSize: 15, fontFamily: fonts.accent, color: colors.warning, letterSpacing: 6, textTransform: "uppercase", textShadow: `0 0 20px rgba(251, 113, 133, 0.2)` }}>
          SIGNING
        </div>
        <FlowDiagram steps={["Secret Key", "Sign", "Transaction"]} delay={0.8} accentColor={colors.warning} />
      </div>

      <div style={{ width: 640, height: 1, background: `linear-gradient(90deg, transparent, ${colors.gold}40, ${colors.gold}, ${colors.gold}40, transparent)`, opacity: dividerOpacity }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ opacity: fadeIn(frame, fps, 2.5), fontSize: 15, fontFamily: fonts.accent, color: colors.success, letterSpacing: 6, textTransform: "uppercase", textShadow: `0 0 20px rgba(52, 211, 153, 0.2)` }}>
          VERIFICATION
        </div>
        <FlowDiagram steps={["Public Key", "Verify", "Network"]} delay={2.8} accentColor={colors.success} />
      </div>
    </AbsoluteFill>
  );
};

// ── Shot 8: Curve Comparison (ANIMATION FULL) — 90.72s to 106.88s ──
const CurveComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = fadeIn(frame, fps, 0.2);
  const vsOpacity = fadeIn(frame, fps, 1.2);
  const leftSlide = slideIn(frame, fps, 0.5);
  const rightSlide = slideIn(frame, fps, 0.9);

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.bgPrimary, justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 48, padding: "60px 120px" }}
    >
      <div style={{ opacity: titleOpacity, fontSize: 40, fontFamily: fonts.display, fontWeight: 700, color: colors.textPrimary, letterSpacing: -0.5 }}>
        Elliptic Curve Comparison
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
        <div style={{ opacity: leftSlide.opacity, transform: `translateY(${leftSlide.translateY}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "48px 56px", borderRadius: 16, background: colors.bgGlass, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid rgba(251, 113, 133, 0.12)`, minWidth: 320 }}>
          <div style={{ fontSize: 52, fontFamily: fonts.display, fontWeight: 700, color: colors.warning, textShadow: `0 0 30px rgba(251, 113, 133, 0.2)` }}>Bitcoin</div>
          <Badge label="secp256k1" delay={1.5} variant="warning" />
        </div>

        <div style={{ opacity: vsOpacity, fontSize: 22, fontFamily: fonts.accent, color: colors.textDim, letterSpacing: 4, textTransform: "uppercase" }}>VS</div>

        <div style={{ opacity: rightSlide.opacity, transform: `translateY(${rightSlide.translateY}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "48px 56px", borderRadius: 16, background: colors.bgGlass, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid ${colors.borderGold}`, boxShadow: colors.glowGold, minWidth: 320 }}>
          <div style={{ fontSize: 52, fontFamily: fonts.display, fontWeight: 700, color: colors.gold, textShadow: `0 0 30px rgba(253, 218, 36, 0.2)` }}>Stellar</div>
          <Badge label="Ed25519" delay={1.8} variant="gold" />
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
        <Badge label="Smaller signatures" delay={3.0} variant="success" />
        <Badge label="Fast verification" delay={3.4} variant="success" />
        <Badge label="Side-channel resistant" delay={3.8} variant="success" />
      </div>
    </AbsoluteFill>
  );
};

// ── Main Episode 2 — Sequences synced to audioMarks ──
export const Episode2: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: fonts.body }}>
      {/* Shot 6: Seed generation — 57.68s to 83.78s */}
      <Sequence from={0} durationInFrames={rel(83.78)}>
        <SeedGeneration />
      </Sequence>

      {/* Shot 7: Signature flow — 83.78s to 90.72s */}
      <Sequence from={rel(83.78)} durationInFrames={rel(90.72) - rel(83.78)}>
        <SignatureFlow />
      </Sequence>

      {/* Shot 8: Curve comparison — 90.72s to 106.88s */}
      <Sequence from={rel(90.72)} durationInFrames={rel(106.88) - rel(90.72)}>
        <CurveComparison />
      </Sequence>

      <Sequence from={0} durationInFrames={rel(106.88)}>
        <LowerThird title="Wallet: Cryptographic Identity" subtitle="Episode 02" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
