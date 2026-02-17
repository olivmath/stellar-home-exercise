import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn, slideIn, scaleIn } from "../animations/springs";
import { ScientistCard } from "../components/ScientistCard";
import { LowerThird } from "../components/LowerThird";

// Episode 4 — Ledgers & Consensus
// Duration: ~60s at 30fps = 1800 frames

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
          <div
            style={{
              opacity: fadeIn(frame, fps, 0.3),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                color: colors.accent2,
                fontSize: 18,
                fontFamily: fonts.code,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              Episode 04
            </div>
            <div
              style={{
                color: colors.textPrimary,
                fontSize: 56,
                fontFamily: fonts.title,
                fontWeight: 800,
                background: `linear-gradient(135deg, ${colors.accent1}, ${colors.accent2})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ledgers & Consensus
            </div>
            <div
              style={{
                width: 80,
                height: 3,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${colors.accent1}, ${colors.accent2})`,
                marginTop: 8,
              }}
            />
          </div>
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
            gap: 40,
          }}
        >
          {/* Heading */}
          <div
            style={{
              opacity: fadeIn(frame - 150, fps, 0.2),
              color: colors.textPrimary,
              fontSize: 36,
              fontFamily: fonts.title,
              fontWeight: 700,
            }}
          >
            Ledgers vs Blocks
          </div>

          {/* Two columns */}
          <div style={{ display: "flex", gap: 60, alignItems: "stretch" }}>
            {/* LEFT — Blocks (crossed out) */}
            {(() => {
              const { opacity, translateY } = slideIn(frame - 150, fps, 0.6);
              return (
                <div
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px)`,
                    background: `${colors.warning}08`,
                    border: `2px solid ${colors.warning}35`,
                    borderRadius: 18,
                    padding: "36px 48px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    minWidth: 280,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: colors.warning,
                      fontSize: 32,
                      fontFamily: fonts.title,
                      fontWeight: 700,
                      textDecoration: "line-through",
                      textDecorationThickness: 3,
                    }}
                  >
                    Blocks {"\u274C"}
                  </div>
                  <div
                    style={{
                      color: colors.textSecondary,
                      fontSize: 16,
                      fontFamily: fonts.body,
                      textAlign: "center",
                      lineHeight: 1.5,
                    }}
                  >
                    Mining required
                    <br />
                    Variable block times
                    <br />
                    Energy intensive
                  </div>
                </div>
              );
            })()}

            {/* Divider */}
            <div
              style={{
                width: 2,
                background: `linear-gradient(180deg, transparent, ${colors.textSecondary}40, transparent)`,
                alignSelf: "stretch",
                opacity: fadeIn(frame - 150, fps, 1.0),
              }}
            />

            {/* RIGHT — Ledgers (approved) */}
            {(() => {
              const { opacity, translateY } = slideIn(frame - 150, fps, 1.0);
              return (
                <div
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px)`,
                    background: `${colors.success}08`,
                    border: `2px solid ${colors.success}35`,
                    borderRadius: 18,
                    padding: "36px 48px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    minWidth: 280,
                  }}
                >
                  <div
                    style={{
                      color: colors.success,
                      fontSize: 32,
                      fontFamily: fonts.title,
                      fontWeight: 700,
                    }}
                  >
                    Ledgers {"\u2705"}
                  </div>
                  <div
                    style={{
                      color: colors.textSecondary,
                      fontSize: 16,
                      fontFamily: fonts.body,
                      textAlign: "center",
                      lineHeight: 1.5,
                    }}
                  >
                    No mining
                    <br />
                    Deterministic timing
                    <br />
                    Energy efficient
                  </div>
                  {/* Close time badge */}
                  {(() => {
                    const { opacity: badgeOp, scale } = scaleIn(
                      frame - 150,
                      fps,
                      1.8
                    );
                    return (
                      <div
                        style={{
                          opacity: badgeOp,
                          transform: `scale(${scale})`,
                          marginTop: 8,
                          padding: "8px 20px",
                          borderRadius: 10,
                          background: `${colors.success}18`,
                          border: `1px solid ${colors.success}40`,
                          color: colors.success,
                          fontSize: 16,
                          fontFamily: fonts.code,
                          fontWeight: 700,
                        }}
                      >
                        ~5s close time
                      </div>
                    );
                  })()}
                </div>
              );
            })()}
          </div>

          <LowerThird
            title="Stellar uses ledgers, not blocks"
            subtitle="Predictable finality every ~5 seconds"
            delay={2.5}
          />
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
            gap: 36,
          }}
        >
          {/* Section heading */}
          <div
            style={{
              opacity: fadeIn(frame - 700, fps, 0.2),
              color: colors.textPrimary,
              fontSize: 32,
              fontFamily: fonts.title,
              fontWeight: 700,
            }}
          >
            Stellar Consensus Protocol
          </div>

          <ScientistCard
            name="David Mazieres"
            institution="Stanford University"
            caption='Creator of SCP -- Federated Byzantine Agreement'
            delay={0.8}
          />

          <LowerThird
            title="Federated Byzantine Agreement"
            subtitle="Consensus without centralized coordination"
            delay={2.0}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================
          SECTION 4 — Quorum Slices (frames 1150-1800)
          3 overlapping circles that converge
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
              fontSize: 32,
              fontFamily: fonts.title,
              fontWeight: 700,
            }}
          >
            Quorum Slices
          </div>

          {/* Overlapping circles container */}
          <div
            style={{
              position: "relative",
              width: 500,
              height: 340,
            }}
          >
            {(() => {
              const localFrame = frame - 1150;

              // Convergence animation: circles start spread out and move together
              const convergence = spring({
                frame: localFrame - 0.8 * fps,
                fps,
                config: { damping: 20, mass: 1.0, stiffness: 60 },
              });

              // Starting spread amount (pixels from center)
              const spread = interpolate(convergence, [0, 1], [120, 45]);

              const circles = [
                {
                  color: colors.accent1,
                  label: "Slice A",
                  angle: -90, // top
                  delay: 0.4,
                },
                {
                  color: colors.accent2,
                  label: "Slice B",
                  angle: 150, // bottom-left
                  delay: 0.7,
                },
                {
                  color: colors.success,
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
                    const cx = 250 + Math.cos(rad) * spread - 100;
                    const cy = 170 + Math.sin(rad) * spread - 100;

                    return (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          left: cx,
                          top: cy,
                          width: 200,
                          height: 200,
                          borderRadius: "50%",
                          background: `${circle.color}20`,
                          border: `2px solid ${circle.color}60`,
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

          {/* Consensus label */}
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
                  transform: `translateY(${(1 - labelProg) * 20}px)`,
                  padding: "14px 32px",
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${colors.accent1}18, ${colors.accent2}18)`,
                  border: `1px solid ${colors.accent1}40`,
                }}
              >
                <div
                  style={{
                    color: colors.textPrimary,
                    fontSize: 22,
                    fontFamily: fonts.code,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  Consensus when overlap {">"} 2/3
                </div>
              </div>
            );
          })()}

          <LowerThird
            title="Quorum intersection"
            subtitle="Safety guaranteed when slices sufficiently overlap"
            delay={4.0}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
