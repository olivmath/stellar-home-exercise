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
import { FlowDiagram } from "../components/FlowDiagram";
import { GlassPanel } from "../components/GlassPanel";
import { Badge } from "../components/Badge";

// Episode 3 — Transactions & Operations
// Duration: ~50s at 30fps = 1500 frames

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

export const Episode3: React.FC = () => {
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
          <EpisodeTitle number="03" title="Transactions & Operations" />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================
          SECTION 2 — Transaction Lifecycle (frames 150-599)
          FlowDiagram: Wallet -> Horizon -> Core -> Ledger
          ============================================ */}
      <Sequence from={150} durationInFrames={450}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 48,
          }}
        >
          {/* Section heading */}
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
            Transaction Lifecycle
          </div>

          {/* Flow diagram */}
          <FlowDiagram
            steps={["Wallet", "Horizon", "Core", "Ledger"]}
            delay={0.5}
            accentColor={colors.cyan}
          />

          {/* Subtitle */}
          <div
            style={{
              opacity: fadeIn(frame - 150, fps, 2.0),
              color: colors.textSecondary,
              fontSize: 18,
              fontFamily: fonts.body,
              letterSpacing: 0.3,
            }}
          >
            Each step validates and forwards
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================
          SECTION 3 — Atomicity Visual (frames 600-1049)
          All-or-nothing: one op fails = entire tx fails
          ============================================ */}
      <Sequence from={600} durationInFrames={450}>
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
              opacity: fadeIn(frame - 600, fps, 0.2),
              color: colors.textPrimary,
              fontSize: 38,
              fontFamily: fonts.display,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            Atomic Transactions
          </div>

          <div
            style={{
              color: colors.textSecondary,
              fontSize: 18,
              fontFamily: fonts.body,
              opacity: fadeIn(frame - 600, fps, 0.5),
              marginBottom: 8,
            }}
          >
            All operations succeed, or none do.
          </div>

          {/* Operation cards row */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {/* Op 1 — Success */}
            {(() => {
              const localFrame = frame - 600;
              const prog = spring({
                frame: localFrame - 1.0 * fps,
                fps,
                config: { damping: 14, mass: 0.6, stiffness: 120 },
              });
              return (
                <div
                  style={{
                    opacity: prog,
                    transform: `scale(${interpolate(prog, [0, 1], [0.6, 1])})`,
                  }}
                >
                  <GlassPanel
                    padding="24px 32px"
                    borderColor={colors.success}
                    style={{
                      borderLeft: `4px solid ${colors.success}`,
                      minWidth: 180,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        color: colors.textPrimary,
                        fontSize: 18,
                        fontFamily: fonts.code,
                        fontWeight: 600,
                      }}
                    >
                      Op 1
                    </div>
                    <div
                      style={{
                        color: colors.success,
                        fontSize: 32,
                        lineHeight: 1,
                      }}
                    >
                      {"\u2713"}
                    </div>
                  </GlassPanel>
                </div>
              );
            })()}

            {/* Op 2 — Fail */}
            {(() => {
              const localFrame = frame - 600;
              const prog = spring({
                frame: localFrame - 1.5 * fps,
                fps,
                config: { damping: 14, mass: 0.6, stiffness: 120 },
              });
              return (
                <div
                  style={{
                    opacity: prog,
                    transform: `scale(${interpolate(prog, [0, 1], [0.6, 1])})`,
                  }}
                >
                  <GlassPanel
                    padding="24px 32px"
                    borderColor={colors.warning}
                    style={{
                      borderLeft: `4px solid ${colors.warning}`,
                      minWidth: 180,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        color: colors.textPrimary,
                        fontSize: 18,
                        fontFamily: fonts.code,
                        fontWeight: 600,
                      }}
                    >
                      Op 2
                    </div>
                    <div
                      style={{
                        color: colors.warning,
                        fontSize: 32,
                        lineHeight: 1,
                      }}
                    >
                      {"\u2717"}
                    </div>
                  </GlassPanel>
                </div>
              );
            })()}

            {/* Op 3 — Fail */}
            {(() => {
              const localFrame = frame - 600;
              const prog = spring({
                frame: localFrame - 2.0 * fps,
                fps,
                config: { damping: 14, mass: 0.6, stiffness: 120 },
              });
              return (
                <div
                  style={{
                    opacity: prog,
                    transform: `scale(${interpolate(prog, [0, 1], [0.6, 1])})`,
                  }}
                >
                  <GlassPanel
                    padding="24px 32px"
                    borderColor={colors.warning}
                    style={{
                      borderLeft: `4px solid ${colors.warning}`,
                      minWidth: 180,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        color: colors.textPrimary,
                        fontSize: 18,
                        fontFamily: fonts.code,
                        fontWeight: 600,
                      }}
                    >
                      Op 3
                    </div>
                    <div
                      style={{
                        color: colors.warning,
                        fontSize: 32,
                        lineHeight: 1,
                      }}
                    >
                      {"\u2717"}
                    </div>
                  </GlassPanel>
                </div>
              );
            })()}
          </div>

          {/* Transaction result card — slides up */}
          {(() => {
            const localFrame = frame - 600;
            const resultProg = spring({
              frame: localFrame - 3.0 * fps,
              fps,
              config: { damping: 10, mass: 0.8, stiffness: 100 },
            });

            return (
              <div
                style={{
                  opacity: resultProg,
                  transform: `translateY(${interpolate(resultProg, [0, 1], [40, 0])}px)`,
                  marginTop: 8,
                }}
              >
                <GlassPanel
                  padding="20px 48px"
                  glow={colors.glowWarning}
                  borderColor={colors.warning}
                >
                  <div
                    style={{
                      color: colors.warning,
                      fontSize: 28,
                      fontFamily: fonts.display,
                      fontWeight: 800,
                      letterSpacing: 1,
                      textAlign: "center",
                    }}
                  >
                    Transaction: FAIL
                  </div>
                </GlassPanel>
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* ============================================
          SECTION 4 — Operation Types (frames 1050-1500)
          Staggered Badges: Payment, Change Trust, Invoke Contract
          ============================================ */}
      <Sequence from={1050} durationInFrames={450}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 40,
          }}
        >
          <div
            style={{
              opacity: fadeIn(frame - 1050, fps, 0.2),
              color: colors.textPrimary,
              fontSize: 38,
              fontFamily: fonts.display,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            Operation Types
          </div>

          <div
            style={{
              color: colors.textSecondary,
              fontSize: 17,
              fontFamily: fonts.body,
              opacity: fadeIn(frame - 1050, fps, 0.6),
            }}
          >
            A transaction bundles one or more operations
          </div>

          <div style={{ display: "flex", gap: 32, marginTop: 12 }}>
            <Badge label="Payment" delay={1.0} variant="cyan" />
            <Badge label="Change Trust" delay={1.6} variant="stellar" />
            <Badge label="Invoke Contract" delay={2.2} variant="success" />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
