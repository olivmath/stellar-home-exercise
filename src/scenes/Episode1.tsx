import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn, slideIn } from "../animations/springs";
import { FounderCard } from "../components/FounderCard";
import { FlowDiagram } from "../components/FlowDiagram";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";

// ── Section: Episode Title ──
const EpisodeTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = fadeIn(frame, fps, 0.3);
  const lineWidth = interpolate(frame, [15, 60], [0, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          opacity,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontFamily: fonts.code,
            color: colors.accent2,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Episode 01
        </div>
        <h2
          style={{
            fontSize: 64,
            fontFamily: fonts.title,
            fontWeight: 800,
            color: colors.textPrimary,
            margin: 0,
          }}
        >
          Foundation &amp; Network Economics
        </h2>
        <div
          style={{
            height: 3,
            width: lineWidth,
            background: `linear-gradient(90deg, ${colors.accent1}, ${colors.accent2})`,
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Section: History Intro ──
const HistoryIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity, translateY } = slideIn(frame, fps, 0.3);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 120,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontFamily: fonts.code,
            color: colors.accent1,
          }}
        >
          2014
        </div>
        <h3
          style={{
            fontSize: 44,
            fontFamily: fonts.title,
            fontWeight: 700,
            color: colors.textPrimary,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Stellar was created to make
          <br />
          <span style={{ color: colors.accent2 }}>
            financial systems more open
          </span>
        </h3>
        <p
          style={{
            fontSize: 22,
            fontFamily: fonts.body,
            color: colors.textSecondary,
            maxWidth: 700,
            lineHeight: 1.6,
            margin: 0,
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
        gap: 48,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontFamily: fonts.code,
          color: colors.accent2,
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: titleOpacity,
        }}
      >
        Co-Founders
      </div>

      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "flex-start",
        }}
      >
        <FounderCard
          name="Jed McCaleb"
          subtitle="Co-founder"
          logos={["Ripple", "Mt. Gox"]}
          delay={0.5}
        />
        <FounderCard
          name="Joyce Kim"
          subtitle="Co-founder"
          logos={[]}
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

  return (
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${colors.accent1}30, ${colors.accent2}30)`,
            border: `1px solid ${colors.accent1}50`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            fontFamily: fonts.title,
            fontWeight: 800,
            color: colors.textPrimary,
          }}
        >
          SDF
        </div>

        <h3
          style={{
            fontSize: 44,
            fontFamily: fonts.title,
            fontWeight: 700,
            color: colors.textPrimary,
            margin: 0,
          }}
        >
          Stellar Development Foundation
        </h3>

        <div
          style={{
            fontSize: 22,
            fontFamily: fonts.body,
            color: colors.textSecondary,
          }}
        >
          Non-profit stewarding the network
        </div>

        <Badge label="Financial Inclusion" delay={0.8} variant="success" />
      </div>
    </AbsoluteFill>
  );
};

// ── Section: Network Economics ──
const NetworkEconomics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.2);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 48,
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 36,
          fontFamily: fonts.title,
          fontWeight: 700,
          color: colors.textPrimary,
        }}
      >
        Transaction Flow
      </div>

      <FlowDiagram
        steps={["Sender", "Network", "Receiver"]}
        delay={0.5}
        accentColor={colors.accent2}
      />

      {/* Fee label */}
      <div
        style={{
          opacity: fadeIn(frame, fps, 1.5),
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 8,
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
        <div
          style={{
            fontSize: 22,
            fontFamily: fonts.code,
            fontWeight: 700,
            color: colors.success,
            padding: "6px 16px",
            borderRadius: 8,
            background: `${colors.success}12`,
            border: `1px solid ${colors.success}30`,
          }}
        >
          0.00001 XLM
        </div>
      </div>

      {/* Side notes */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginTop: 16,
        }}
      >
        <Badge label="No miners" delay={2.0} variant="warning" />
        <Badge label="Validators" delay={2.5} variant="accent2" />
        <Badge label="No block rewards" delay={3.0} variant="warning" />
      </div>
    </AbsoluteFill>
  );
};

// ── Main Episode 1 Composition ──
export const Episode1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      {/* Episode title card: 0-4s (frames 0-120) */}
      <Sequence from={0} durationInFrames={120}>
        <EpisodeTitle />
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

      {/* Persistent lower-third for the episode */}
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
