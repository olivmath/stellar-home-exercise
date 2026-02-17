import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn, slideIn, scaleIn } from "../animations/springs";
import { EpisodeTitle } from "../components/EpisodeTitle";
import { FounderCard } from "../components/FounderCard";
import { FlowDiagram } from "../components/FlowDiagram";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";
import { NetworkBackground } from "../components/NetworkBackground";

// ── Section: History Intro ──
const HistoryIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const yearOpacity = fadeIn(frame, fps, 0.2);
  const yearScale = interpolate(frame, [6, 40], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const { opacity: textOpacity, translateY: textTranslateY } = slideIn(
    frame,
    fps,
    0.8
  );
  const narrativeOpacity = fadeIn(frame, fps, 1.5);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 120,
      }}
    >
      {/* Subtle radial glow behind the year */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          textAlign: "center",
        }}
      >
        {/* Large display year */}
        <div
          style={{
            fontSize: 140,
            fontFamily: fonts.display,
            fontWeight: 800,
            color: colors.stellarLight,
            opacity: yearOpacity,
            transform: `scale(${yearScale})`,
            letterSpacing: 8,
            textShadow: colors.glowStellar,
            lineHeight: 1,
          }}
        >
          2014
        </div>

        {/* Narrative heading */}
        <h3
          style={{
            fontSize: 44,
            fontFamily: fonts.display,
            fontWeight: 700,
            color: colors.textPrimary,
            margin: 0,
            lineHeight: 1.3,
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          Stellar was created to make
          <br />
          <span style={{ color: colors.cyan }}>
            financial systems more open
          </span>
        </h3>

        {/* Supporting narrative */}
        <p
          style={{
            fontSize: 22,
            fontFamily: fonts.body,
            color: colors.textSecondary,
            maxWidth: 700,
            lineHeight: 1.7,
            margin: 0,
            opacity: narrativeOpacity,
          }}
        >
          Originally forked from Ripple, then rebuilt with a new consensus
          protocol — the Stellar Consensus Protocol (SCP).
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ── Section: Founders ──
const Founders: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.2);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 56,
        flexDirection: "column",
      }}
    >
      {/* Network particle background */}
      <NetworkBackground opacity={0.06} speed={0.3} />

      <div
        style={{
          fontSize: 16,
          fontFamily: fonts.code,
          color: colors.cyan,
          letterSpacing: 6,
          textTransform: "uppercase",
          opacity: titleOpacity,
          textShadow: colors.glowCyan,
        }}
      >
        Co-Founders
      </div>

      <div
        style={{
          display: "flex",
          gap: 72,
          alignItems: "flex-start",
          zIndex: 1,
        }}
      >
        <FounderCard
          name="Jed McCaleb"
          subtitle="Co-founder"
          photo="jed-mccaleb.jpg"
          logos={["Ripple", "Mt. Gox"]}
          delay={0.5}
        />
        <FounderCard
          name="Joyce Kim"
          subtitle="Co-founder"
          photo="joyce-kim.jpg"
          delay={1.0}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Section: Organization ──
const Organization: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity, translateY } = slideIn(frame, fps, 0.3);
  const badgeOpacity = fadeIn(frame, fps, 1.2);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Globe-like decorative radial gradient */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, rgba(34, 211, 238, 0.03) 40%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      {/* Globe ring */}
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          border: `1px solid ${colors.borderAccent}`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: fadeIn(frame, fps, 0.5) * 0.3,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: "50%",
          border: `1px solid ${colors.borderSubtle}`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: fadeIn(frame, fps, 0.8) * 0.2,
          pointerEvents: "none",
        }}
      />

      <GlassPanel
        padding="64px"
        borderColor={colors.borderAccent}
        glow={colors.glowStellar}
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          maxWidth: 680,
          zIndex: 1,
        }}
      >
        {/* SDF icon */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 20,
            background: `linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(34, 211, 238, 0.1))`,
            border: `1px solid ${colors.borderAccent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontFamily: fonts.display,
            fontWeight: 800,
            color: colors.textPrimary,
            boxShadow: colors.glowStellar,
          }}
        >
          SDF
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
          Stellar Development Foundation
        </h3>

        <div
          style={{
            fontSize: 20,
            fontFamily: fonts.body,
            color: colors.textSecondary,
            lineHeight: 1.6,
          }}
        >
          Non-profit stewarding the network
        </div>

        <div style={{ opacity: badgeOpacity }}>
          <Badge label="Financial Inclusion" delay={0.8} variant="success" />
        </div>
      </GlassPanel>
    </AbsoluteFill>
  );
};

// ── Section: Network Economics ──
const NetworkEconomics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.2);
  const feeOpacity = fadeIn(frame, fps, 1.5);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 44,
      }}
    >
      {/* Subtle top-center glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 300,
          background: `radial-gradient(ellipse, rgba(34, 211, 238, 0.05) 0%, transparent 70%)`,
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          opacity: titleOpacity,
          fontSize: 36,
          fontFamily: fonts.display,
          fontWeight: 700,
          color: colors.textPrimary,
          letterSpacing: 1,
        }}
      >
        Transaction Flow
      </div>

      <FlowDiagram
        steps={["Sender", "Network", "Receiver"]}
        delay={0.5}
        accentColor={colors.cyan}
      />

      {/* Fee label */}
      <div
        style={{
          opacity: feeOpacity,
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 4,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontFamily: fonts.code,
            color: colors.textSecondary,
          }}
        >
          Base fee:
        </div>
        <Badge label="0.00001 XLM" variant="gold" size="sm" />
      </div>

      {/* Economics badges */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 12,
        }}
      >
        <Badge label="No miners" delay={2.0} variant="warning" />
        <Badge label="Validators" delay={2.5} variant="cyan" />
        <Badge label="No block rewards" delay={3.0} variant="warning" />
      </div>
    </AbsoluteFill>
  );
};

// ── Main Episode 1 Composition ──
export const Episode1: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        fontFamily: fonts.body,
      }}
    >
      {/* Episode title card: 0-4s (frames 0-120) */}
      <Sequence from={0} durationInFrames={120}>
        <EpisodeTitle
          number="01"
          title="Foundation & Network Economics"
        />
      </Sequence>

      {/* History intro: 4-12s (frames 120-360) */}
      <Sequence from={120} durationInFrames={240}>
        <HistoryIntro />
      </Sequence>

      {/* Founders: 12-22s (frames 360-660) */}
      <Sequence from={360} durationInFrames={300}>
        <Founders />
      </Sequence>

      {/* Organization / SDF: 22-32s (frames 660-960) */}
      <Sequence from={660} durationInFrames={300}>
        <Organization />
      </Sequence>

      {/* Network economics: 32-50s (frames 960-1500) */}
      <Sequence from={960} durationInFrames={540}>
        <NetworkEconomics />
      </Sequence>

      {/* Persistent lower-third */}
      <Sequence from={120} durationInFrames={1380}>
        <LowerThird
          title="Foundation & Network Economics"
          subtitle="Episode 01"
          delay={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
