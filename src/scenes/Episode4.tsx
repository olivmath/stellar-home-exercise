import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { fadeIn, slideIn, scaleIn } from "../animations/springs";
import { EpisodeTitle } from "../components/EpisodeTitle";
import { GlassPanel } from "../components/GlassPanel";
import { Badge } from "../components/Badge";
import { ScientistCard } from "../components/ScientistCard";

// Episode 4 — Ledgers & Consensus
// Duration: ~60s at 30fps = 1800 frames

const colors = {
  bgPrimary: "#050810",
  bgElevated: "#0A0E1A",
  bgGlass: "rgba(12, 16, 32, 0.72)",
  stellar: "#6366F1",
  stellarLight: "#818CF8",
  cyan: "#22D3EE",
  cyanDim: "rgba(34, 211, 238, 0.15)",
  success: "#34D399",
  warning: "#FB7185",
  gold: "#FBBF24",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textDim: "#475569",
  glowStellar:
    "0 0 40px rgba(99, 102, 241, 0.3), 0 0 80px rgba(99, 102, 241, 0.1)",
  glowCyan:
    "0 0 40px rgba(34, 211, 238, 0.25), 0 0 80px rgba(34, 211, 238, 0.08)",
  glowSuccess: "0 0 30px rgba(52, 211, 153, 0.25)",
  glowWarning: "0 0 30px rgba(251, 113, 133, 0.25)",
  borderSubtle: "rgba(148, 163, 184, 0.08)",
  borderAccent: "rgba(99, 102, 241, 0.2)",
  borderCyan: "rgba(34, 211, 238, 0.15)",
};

const fonts = {
  display: "'Outfit', sans-serif",
  body: "'Plus Jakarta Sans', sans-serif",
  code: "'IBM Plex Mono', monospace",
};

export const Episode4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        fontFamily: fonts.body,
      }}
    >
      {/* ============================================
          SECTION 1 — Episode Title (frames 0-149)
          ============================================ */}
      <Sequence from={0} durationInFrames={150}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EpisodeTitle number="04" title="Ledgers & Consensus" />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================
          SECTION 2 — Ledgers vs Blocks (frames 150-699)
          Two-column comparison
          ============================================ */}
      <Sequence from={150} durationInFrames={550}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 44,
          }}
        >
          {/* Heading */}
          <div
            style={{
              opacity: fadeIn(frame - 150, fps, 0.2),
              color: colors.textPrimary,
              fontSize: 38,
              fontFamily: fonts.display,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            Ledgers vs Blocks
          </div>

          {/* Two columns */}
          <div style={{ display: "flex", gap: 56, alignItems: "stretch" }}>
            {/* LEFT — Blocks (crossed out / deprecated) */}
            {(() => {
              const { opacity, translateY } = slideIn(frame - 150, fps, 0.6);
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
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 20,
                      minWidth: 300,
                    }}
                  >
                    <div
                      style={{
                        color: colors.textDim,
                        fontSize: 32,
                        fontFamily: fonts.display,
                        fontWeight: 700,
                        textDecoration: "line-through",
                        textDecorationThickness: 3,
                      }}
                    >
                      Blocks
                    </div>
                    <div
                      style={{
                        color: colors.textDim,
                        fontSize: 16,
                        fontFamily: fonts.body,
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
                opacity: fadeIn(frame - 150, fps, 1.0),
              }}
            />

            {/* RIGHT — Ledgers (highlighted) */}
            {(() => {
              const { opacity, translateY } = slideIn(frame - 150, fps, 1.0);
              return (
                <div
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <GlassPanel
                    padding="40px 48px"
                    borderColor={colors.borderCyan}
                    glow={colors.glowCyan}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 20,
                      minWidth: 300,
                    }}
                  >
                    <div
                      style={{
                        color: colors.cyan,
                        fontSize: 32,
                        fontFamily: fonts.display,
                        fontWeight: 700,
                      }}
                    >
                      Ledgers
                    </div>
                    <div
                      style={{
                        color: colors.textSecondary,
                        fontSize: 16,
                        fontFamily: fonts.body,
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

                  {/* Close time badge below the panel */}
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
          SECTION 3 — David Mazieres (frames 700-1149)
          ScientistCard for the creator of SCP
          ============================================ */}
      <Sequence from={700} durationInFrames={450}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 40,
          }}
        >
          {/* Section heading */}
          <div
            style={{
              opacity: fadeIn(frame - 700, fps, 0.2),
              color: colors.textPrimary,
              fontSize: 34,
              fontFamily: fonts.display,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            Stellar Consensus Protocol
          </div>

          <ScientistCard
            name="David Mazi\u00e8res"
            institution="Stanford University"
            caption="Creator of SCP \u2014 Federated Byzantine Agreement"
            delay={0.8}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================
          SECTION 4 — Quorum Slices (frames 1150-1800)
          3 overlapping circles that converge toward center
          ============================================ */}
      <Sequence from={1150} durationInFrames={650}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 40,
          }}
        >
          {/* Section heading */}
          <div
            style={{
              opacity: fadeIn(frame - 1150, fps, 0.2),
              color: colors.textPrimary,
              fontSize: 34,
              fontFamily: fonts.display,
              fontWeight: 700,
              letterSpacing: -0.5,
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
              const localFrame = frame - 1150;
              const circleSize = 240;

              // Convergence animation: circles start spread out and move together
              const convergence = spring({
                frame: localFrame - 0.8 * fps,
                fps,
                config: { damping: 20, mass: 1.0, stiffness: 60 },
              });

              // Starting spread amount (pixels from center)
              const spread = interpolate(convergence, [0, 1], [140, 50]);

              const circles = [
                {
                  color: colors.stellar,
                  fillColor: "rgba(99, 102, 241, 0.15)",
                  borderColor: "rgba(99, 102, 241, 0.4)",
                  label: "Slice A",
                  angle: -90, // top
                  delay: 0.4,
                },
                {
                  color: colors.cyan,
                  fillColor: "rgba(34, 211, 238, 0.15)",
                  borderColor: "rgba(34, 211, 238, 0.4)",
                  label: "Slice B",
                  angle: 150, // bottom-left
                  delay: 0.7,
                },
                {
                  color: colors.success,
                  fillColor: "rgba(52, 211, 153, 0.15)",
                  borderColor: "rgba(52, 211, 153, 0.4)",
                  label: "Slice C",
                  angle: 30, // bottom-right
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
                          borderRadius: "50%",
                          background: circle.fillColor,
                          border: `2px solid ${circle.borderColor}`,
                          backdropFilter: "blur(8px)",
                          opacity: circleOpacity,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            color: circle.color,
                            fontSize: 16,
                            fontFamily: fonts.code,
                            fontWeight: 700,
                            letterSpacing: 1,
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

          {/* Consensus label — fades in ~1s after convergence starts */}
          {(() => {
            const labelProg = spring({
              frame: frame - 1150 - 3.0 * fps,
              fps,
              config: { damping: 16, mass: 0.6, stiffness: 100 },
            });

            return (
              <div
                style={{
                  opacity: labelProg,
                  transform: `translateY(${interpolate(labelProg, [0, 1], [20, 0])}px)`,
                  color: colors.textPrimary,
                  fontSize: 24,
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  textAlign: "center",
                }}
              >
                Consensus when overlap {"> "}2/3
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
