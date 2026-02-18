import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  spring,
} from "remotion";
import { colors } from "../styles/theme";
import { text, space, layout, panel, shadows, radius } from "../styles/designSystem";
import { fadeIn, slideIn } from "../animations/springs";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";
import { ScientistCard } from "../components/ScientistCard";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to episode start (151.74s) ──
const EP = episodes.ep4.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Scene 4.1: Ledgers vs Blocks (151.74s to 159.23s) — VIDEO+OVERLAY ──
// LEFT: Blocks at f4642 (154.73s) | RIGHT: Ledger at f4641 (154.69s)
const BLOCKS_DELAY = 154.73 - 151.74; // ~3.0s
const LEDGER_DELAY = 154.69 - 151.74; // ~2.95s

const LedgersVsBlocks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity: blocksOpacity, translateY: blocksY } = slideIn(frame, fps, BLOCKS_DELAY);
  const { opacity: ledgersOpacity, translateY: ledgersY } = slideIn(frame, fps, LEDGER_DELAY);
  const badgeOpacity = fadeIn(frame, fps, LEDGER_DELAY + 2.0);

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* LEFT — Blocks (deprecated) */}
      <div
        style={{
          position: "absolute",
          left: space.section,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <GlassPanel
          padding="40px 48px"
          borderColor={colors.borderSubtle}
          style={{
            opacity: blocksOpacity,
            transform: `translateY(${blocksY}px)`,
            ...layout.centerColumn,
            gap: space.lg,
            minWidth: 300,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.negative }}>
            OLD MODEL
          </div>
          <div
            style={{
              ...text.h1,
              color: colors.textDim,
              textDecoration: "line-through",
              textDecorationThickness: 3,
            }}
          >
            Blocks
          </div>
          <div
            style={{
              ...text.bodySM,
              color: colors.textDim,
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            Mining required
            <br />
            Variable block times
            <br />
            Energy intensive
          </div>
        </GlassPanel>
      </div>

      {/* RIGHT — Ledgers (highlighted) */}
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
          ...layout.centerColumn,
          gap: space.lg,
        }}
      >
        <GlassPanel
          padding="40px 48px"
          borderColor={colors.borderMedium}
          glow={shadows.accent}
          style={{
            opacity: ledgersOpacity,
            transform: `translateY(${ledgersY}px)`,
            ...layout.centerColumn,
            gap: space.lg,
            minWidth: 300,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.info }}>STELLAR</div>
          <div style={{ ...text.h1, color: colors.info }}>Ledgers</div>
          <div
            style={{
              ...text.bodySM,
              color: colors.warmGrey,
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            No mining
            <br />
            Deterministic timing
            <br />
            Energy efficient
          </div>
        </GlassPanel>

        <div style={{ opacity: badgeOpacity }}>
          <Badge label="~5s close time" delay={LEDGER_DELAY + 2.0} variant="positive" size="lg" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4.2: Ledger Lifecycle (159.23s to 171.03s) — VIDEO+OVERLAY ──
// Staggered: Collect TX (already visible) → Propose (162.40s) → Consensus (165.93s)
const SCENE_42_START = 159.23;
const lifecycleSteps = [
  { label: "Collect TXs", atSec: SCENE_42_START, color: colors.gold },
  { label: "Propose Ledger", atSec: 162.40, color: colors.info },
  { label: "Consensus", atSec: 165.93, color: colors.positive },
];

const LedgerLifecycle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, 0.3);

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
          borderColor={colors.borderAccent}
          glow={shadows.accent}
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            ...layout.centerColumn,
            gap: space.xl,
            maxWidth: 420,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold }}>
            LEDGER LIFECYCLE
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: space.md,
              alignItems: "stretch",
              width: "100%",
            }}
          >
            {lifecycleSteps.map((step, i) => {
              const delaySec = step.atSec - SCENE_42_START;
              const stepOpacity = i === 0 ? 1 : fadeIn(frame, fps, delaySec);
              const stepY = i === 0 ? 0 : interpolate(
                frame,
                [delaySec * fps, delaySec * fps + 12],
                [15, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <React.Fragment key={step.label}>
                  {i > 0 && (
                    <div
                      style={{
                        opacity: stepOpacity,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 2,
                          height: 16,
                          background: `linear-gradient(180deg, ${step.color}60, ${step.color})`,
                          borderRadius: 1,
                        }}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      ...panel.base,
                      padding: `${space.md}px ${space.xl}px`,
                      borderRadius: radius.sm,
                      border: `1px solid ${step.color}25`,
                      opacity: stepOpacity,
                      transform: `translateY(${stepY}px)`,
                      display: "flex",
                      alignItems: "center",
                      gap: space.md,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 28,
                        borderRadius: radius.xs,
                        backgroundColor: step.color,
                        boxShadow: `0 0 10px ${step.color}40`,
                      }}
                    />
                    <span style={{ ...text.codeMD, color: step.color }}>
                      {step.label}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4.3: No-Forks card (171.03s to 177.03s) — VIDEO+OVERLAY ──
const NoForks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, 0.3);

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <GlassPanel
          padding="40px 52px"
          borderColor={colors.borderMedium}
          glow={shadows.accent}
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            ...layout.centerColumn,
            gap: space.md,
            maxWidth: 440,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.positive }}>
            DETERMINISTIC
          </div>
          <div style={{ ...text.displayMD, margin: 0, textAlign: "center" }}>
            Instant Finality
          </div>
          <div style={{ ...text.h2, color: colors.positive, textAlign: "center" }}>
            No Forks
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4.4: Consensus cards staggered (177.03s to 183.50s) — VIDEO+OVERLAY ──
// No PoW (177.03s) → No PoS (178.09s) → SCP (179.66s)
const SCENE_44_START = 177.03;
const consensusCards = [
  { label: "No Proof of Work", atSec: 177.03, color: colors.negative },
  { label: "No Proof of Stake", atSec: 178.09, color: colors.negative },
  { label: "SCP", atSec: 179.66, color: colors.gold },
];

const ConsensusCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
          gap: space.lg,
          alignItems: "center",
        }}
      >
        {consensusCards.map((card, i) => {
          const delaySec = card.atSec - SCENE_44_START;
          const { opacity, translateY } = slideIn(frame, fps, delaySec);

          return (
            <GlassPanel
              key={card.label}
              padding="32px 48px"
              borderColor={card.color === colors.gold ? colors.borderAccent : `${card.color}18`}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                ...layout.centerColumn,
                gap: space.sm,
                minWidth: 380,
              }}
            >
              {card.label === "SCP" ? (
                <>
                  <div style={{ ...text.overlineSM, color: colors.gold }}>
                    CONSENSUS
                  </div>
                  <div style={{ ...text.h1, textAlign: "center" }}>
                    Stellar Consensus Protocol
                  </div>
                  <div style={{ ...text.codeMD, color: colors.gold, textAlign: "center" }}>
                    SCP
                  </div>
                </>
              ) : (
                <>
                  <div style={{ ...text.codeMD, color: card.color, letterSpacing: 1 }}>
                    ✗
                  </div>
                  <div style={{ ...text.h2, color: card.color, textAlign: "center" }}>
                    {card.label}
                  </div>
                </>
              )}
            </GlassPanel>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4.5: David Mazieres (183.50s to 195.83s) — VIDEO+OVERLAY ──
const DavidMazieres: React.FC = () => {
  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: space.section,
        }}
      >
        <ScientistCard
          name="David Mazieres"
          institution="Stanford University"
          caption="Creator of SCP — Federated Byzantine Agreement"
          delay={0.3}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 4.6: Quorum Slices (195.83s to 200.93s) — VIDEO+OVERLAY ──
const QuorumSlices: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const circleSize = 200;

  const convergence = spring({
    frame: Math.max(0, frame - Math.round(0.8 * fps)),
    fps,
    config: { damping: 20, mass: 1.0, stiffness: 60 },
  });

  const spread = interpolate(convergence, [0, 1], [120, 40]);

  const circles = [
    {
      color: colors.gold,
      fillColor: "rgba(201, 168, 76, 0.15)",
      borderColor: "rgba(201, 168, 76, 0.4)",
      label: "Slice A",
      angle: -90,
      delay: 0.3,
    },
    {
      color: colors.info,
      fillColor: "rgba(107, 155, 210, 0.15)",
      borderColor: "rgba(107, 155, 210, 0.4)",
      label: "Slice B",
      angle: 150,
      delay: 0.6,
    },
    {
      color: colors.positive,
      fillColor: "rgba(92, 184, 138, 0.15)",
      borderColor: "rgba(92, 184, 138, 0.4)",
      label: "Slice C",
      angle: 30,
      delay: 0.9,
    },
  ];

  const labelProg = spring({
    frame: Math.max(0, frame - Math.round(2.5 * fps)),
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <div
        style={{
          position: "absolute",
          left: space.section,
          top: "50%",
          transform: "translateY(-50%)",
          ...layout.centerColumn,
          gap: space.xl,
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, fps, 0.2),
            ...text.overlineSM,
            color: colors.gold,
          }}
        >
          FEDERATED BYZANTINE AGREEMENT
        </div>

        <div style={{ opacity: fadeIn(frame, fps, 0.2), ...text.h1 }}>
          Quorum Slices
        </div>

        <div style={{ position: "relative", width: 440, height: 320 }}>
          {circles.map((circle, i) => {
            const circleOpacity = fadeIn(frame, fps, circle.delay);
            const rad = (circle.angle * Math.PI) / 180;
            const cx = 440 / 2 + Math.cos(rad) * spread - circleSize / 2;
            const cy = 320 / 2 + Math.sin(rad) * spread - circleSize / 2;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: cx,
                  top: cy,
                  width: circleSize,
                  height: circleSize,
                  borderRadius: radius.circle,
                  background: circle.fillColor,
                  border: `2px solid ${circle.borderColor}`,
                  backdropFilter: "blur(8px)",
                  opacity: circleOpacity,
                  ...layout.centerRow,
                }}
              >
                <div style={{ ...text.overlineSM, color: circle.color }}>
                  {circle.label}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: labelProg,
            transform: `translateY(${interpolate(labelProg, [0, 1], [20, 0])}px)`,
            ...text.h3,
            textAlign: "center",
          }}
        >
          Consensus when overlap {"> "}2/3
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4.7: Trilemma (200.93s to 208.4s) — VIDEO+OVERLAY ──
const Trilemma: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity, translateY } = slideIn(frame, fps, 0.3);

  const pillars = [
    { label: "Decentralization", color: colors.gold, delay: 0.6 },
    { label: "Security", color: colors.info, delay: 1.2 },
    { label: "Scalability", color: colors.positive, delay: 1.8 },
  ];

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <GlassPanel
          padding="48px 56px"
          borderColor={colors.borderAccent}
          glow={shadows.accent}
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            ...layout.centerColumn,
            gap: space.xl,
            width: 440,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold }}>
            BLOCKCHAIN TRILEMMA
          </div>
          <div style={{ ...text.h1, textAlign: "center" }}>
            Stellar Achieves All Three
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: space.md,
              width: "100%",
            }}
          >
            {pillars.map((pillar) => {
              const pillarOpacity = fadeIn(frame, fps, pillar.delay);
              return (
                <div
                  key={pillar.label}
                  style={{
                    ...panel.base,
                    padding: `${space.md}px ${space.xl}px`,
                    borderRadius: radius.sm,
                    border: `1px solid ${pillar.color}25`,
                    opacity: pillarOpacity,
                    display: "flex",
                    alignItems: "center",
                    gap: space.md,
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 28,
                      borderRadius: radius.xs,
                      backgroundColor: pillar.color,
                      boxShadow: `0 0 10px ${pillar.color}40`,
                    }}
                  />
                  <span style={{ ...text.codeMD, color: pillar.color }}>
                    {pillar.label}
                  </span>
                  <span
                    style={{
                      ...text.h2,
                      color: pillar.color,
                      marginLeft: "auto",
                      lineHeight: 1,
                    }}
                  >
                    ✓
                  </span>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4.8: Closing question — fullscreen dynamic text ──
const closingWords = [
  { text: "What's", atSec: 208.40 },
  { text: "left", atSec: 208.60 },
  { text: "is", atSec: 208.80 },
  { text: "the", atSec: 208.94 },
  { text: "programmability", atSec: 209.10 },
  { text: "layer.", atSec: 209.60 },
];

const CLOSING_START = 208.40;

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
                    ? word.text === "programmability"
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

// ── Main Episode 4 — Sequences synced to new timing ──
export const Episode4: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 4.1: Ledgers vs Blocks — 151.74s to 159.23s */}
      <Sequence from={rel(151.74)} durationInFrames={rel(159.23) - rel(151.74)}>
        <LedgersVsBlocks />
      </Sequence>

      {/* Scene 4.2: Ledger Lifecycle — 159.23s to 171.03s */}
      <Sequence from={rel(159.23)} durationInFrames={rel(171.03) - rel(159.23)}>
        <LedgerLifecycle />
      </Sequence>

      {/* Scene 4.3: No-Forks — 171.03s to 177.03s */}
      <Sequence from={rel(171.03)} durationInFrames={rel(177.03) - rel(171.03)}>
        <NoForks />
      </Sequence>

      {/* Scene 4.4: Consensus cards (No PoW, No PoS, SCP) — 177.03s to 183.50s */}
      <Sequence from={rel(177.03)} durationInFrames={rel(183.50) - rel(177.03)}>
        <ConsensusCards />
      </Sequence>

      {/* Scene 4.5: David Mazieres — 183.50s to 195.83s */}
      <Sequence from={rel(183.50)} durationInFrames={rel(195.83) - rel(183.50)}>
        <DavidMazieres />
      </Sequence>

      {/* Scene 4.6: Quorum Slices — 195.83s to 200.93s */}
      <Sequence from={rel(195.83)} durationInFrames={rel(200.93) - rel(195.83)}>
        <QuorumSlices />
      </Sequence>

      {/* Scene 4.7: Trilemma — 200.93s to 208.4s */}
      <Sequence from={rel(200.93)} durationInFrames={rel(208.4) - rel(200.93)}>
        <Trilemma />
      </Sequence>

      {/* Scene 4.8: Closing question — 208.4s to 210.38s */}
      <Sequence from={rel(208.4)} durationInFrames={rel(210.38) - rel(208.4)}>
        <ClosingQuestion />
      </Sequence>

      {/* Lower-third across full episode */}
      <Sequence from={rel(152.5)} durationInFrames={rel(210.38) - rel(152.5)}>
        <LowerThird title="Ledgers & Consensus" subtitle="Episode 04" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
