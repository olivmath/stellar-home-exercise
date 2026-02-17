import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { colors } from "../styles/theme";
import { text, space, radius, layout } from "../styles/designSystem";
import { fadeIn, slideIn, scaleIn } from "../animations/springs";
import { EpisodeTitle } from "../components/EpisodeTitle";
import { GlassPanel } from "../components/GlassPanel";
import { Badge } from "../components/Badge";
import { ScientistCard } from "../components/ScientistCard";
import { LowerThird } from "../components/LowerThird";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to episode start (151.74s) ──
// ep4 narration: 151.74s → 210.38s
const EP = episodes.ep4.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// Episode 4 — Ledgers & Consensus

export const Episode4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine background per shot:
  // LedgerIntro (0 to rel(177.14)): ANIMATION FULL — solid bg
  // ConsensusProtocol (rel(177.14) to rel(197.18)): VIDEO + OVERLAY — dim bg to show talking head
  // QuorumSlices (rel(197.18) to rel(210.38)): ANIMATION FULL — solid bg
  const consensusStart = rel(177.14);
  const consensusEnd = rel(197.18);
  const backgroundColor =
    frame >= consensusStart && frame < consensusEnd
      ? "rgba(15, 15, 15, 0.55)"
      : colors.bgPrimary;

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        ...text.bodyMD,
      }}
    >
      {/* ============================================
          SHOT 12 — Ledgers vs Blocks (LedgerIntro: 151.74s to 177.14s)
          ANIMATION FULL — Solid bgPrimary
          ============================================ */}
      <Sequence from={0} durationInFrames={rel(177.14)}>
        <AbsoluteFill
          style={{
            ...layout.centerColumn,
            gap: space.xxl,
          }}
        >
          {/* Episode title */}
          <EpisodeTitle number="04" title="Ledgers & Consensus" />

          {/* Two-column comparison */}
          <div
            style={{
              display: "flex",
              gap: space.xxxl,
              alignItems: "stretch",
              marginTop: space.lg,
            }}
          >
            {/* LEFT — Blocks (crossed out / deprecated) */}
            {(() => {
              const { opacity, translateY } = slideIn(frame, fps, 0.6);
              return (
                <div
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px)`,
                  }}
                >
                  <GlassPanel
                    padding="40px 48px"
                    borderColor={colors.borderSubtle}
                    style={{
                      ...layout.centerColumn,
                      gap: space.lg,
                      minWidth: 300,
                    }}
                  >
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
              );
            })()}

            {/* Divider */}
            <div
              style={{
                width: 1,
                background: `linear-gradient(180deg, transparent, ${colors.borderSubtle}, transparent)`,
                alignSelf: "stretch",
                opacity: fadeIn(frame, fps, 1.0),
              }}
            />

            {/* RIGHT — Ledgers (highlighted with teal) */}
            {(() => {
              const { opacity, translateY } = slideIn(frame, fps, 1.0);
              return (
                <div
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px)`,
                    ...layout.centerColumn,
                    gap: space.lg,
                  }}
                >
                  <GlassPanel
                    padding="40px 48px"
                    borderColor={colors.borderTeal}
                    glow={colors.glowTeal}
                    style={{
                      ...layout.centerColumn,
                      gap: space.lg,
                      minWidth: 300,
                    }}
                  >
                    <div
                      style={{
                        ...text.h1,
                        color: colors.teal,
                      }}
                    >
                      Ledgers
                    </div>
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

                  {/* Close time badge */}
                  <Badge
                    label="~5s close time"
                    delay={1.8}
                    variant="success"
                    size="lg"
                  />
                </div>
              );
            })()}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================
          SHOT 13 — David Mazières (ConsensusProtocol: 177.14s to 197.18s)
          VIDEO + OVERLAY — Dim bg, talking head visible
          ============================================ */}
      <Sequence from={rel(177.14)} durationInFrames={rel(197.18) - rel(177.14)}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: space.section,
          }}
        >
          <ScientistCard
            name="David Mazi&egrave;res"
            institution="Stanford University"
            caption="Creator of SCP — Federated Byzantine Agreement"
            delay={0.5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================
          SHOT 14 — Quorum Slices (197.18s to 210.38s)
          ANIMATION FULL — Solid bgPrimary
          ============================================ */}
      <Sequence from={rel(197.18)} durationInFrames={rel(210.38) - rel(197.18)}>
        <AbsoluteFill
          style={{
            ...layout.centerColumn,
            gap: space.xxl,
          }}
        >
          {/* Section heading */}
          <div
            style={{
              opacity: fadeIn(frame - rel(197.18), fps, 0.2),
              ...text.h1,
            }}
          >
            Quorum Slices
          </div>

          {/* Overlapping circles container */}
          <div
            style={{
              position: "relative",
              width: 540,
              height: 380,
            }}
          >
            {(() => {
              const localFrame = frame - rel(197.18);
              const circleSize = 240;

              // Convergence: circles start spread out and spring together
              const convergence = spring({
                frame: localFrame - 0.8 * fps,
                fps,
                config: { damping: 20, mass: 1.0, stiffness: 60 },
              });

              const spread = interpolate(convergence, [0, 1], [140, 50]);

              const circles = [
                {
                  color: colors.gold,
                  fillColor: "rgba(253, 218, 36, 0.15)",
                  borderColor: "rgba(253, 218, 36, 0.4)",
                  label: "Slice A",
                  angle: -90,
                  delay: 0.4,
                },
                {
                  color: colors.teal,
                  fillColor: "rgba(0, 167, 181, 0.15)",
                  borderColor: "rgba(0, 167, 181, 0.4)",
                  label: "Slice B",
                  angle: 150,
                  delay: 0.7,
                },
                {
                  color: colors.success,
                  fillColor: "rgba(52, 211, 153, 0.15)",
                  borderColor: "rgba(52, 211, 153, 0.4)",
                  label: "Slice C",
                  angle: 30,
                  delay: 1.0,
                },
              ];

              return (
                <>
                  {circles.map((circle, i) => {
                    const circleOpacity = fadeIn(localFrame, fps, circle.delay);
                    const rad = (circle.angle * Math.PI) / 180;
                    const cx =
                      540 / 2 + Math.cos(rad) * spread - circleSize / 2;
                    const cy =
                      380 / 2 + Math.sin(rad) * spread - circleSize / 2;

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
                        <div
                          style={{
                            ...text.accentSM,
                            color: circle.color,
                          }}
                        >
                          {circle.label}
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })()}
          </div>

          {/* Consensus label — fades in after convergence */}
          {(() => {
            const labelProg = spring({
              frame: frame - rel(197.18) - 3.0 * fps,
              fps,
              config: { damping: 16, mass: 0.6, stiffness: 100 },
            });

            return (
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
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* Lower-third across full episode */}
      <Sequence from={0} durationInFrames={rel(210.38)}>
        <LowerThird title="Ledgers & Consensus" subtitle="Episode 04" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
