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
import { FlowDiagram } from "../components/FlowDiagram";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";

// Episode 3 — Transactions & Operations
// Duration: ~50s at 30fps = 1500 frames

export const Episode3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Atomicity demo helpers ---
  const operations = [
    { label: "Op1: Payment", status: "success" as const },
    { label: "Op2: ChangeTrust", status: "fail" as const },
    { label: "Op3: ManageOffer", status: "fail" as const },
  ];

  const statusColor = (s: "success" | "fail") =>
    s === "success" ? colors.success : colors.warning;

  const statusIcon = (s: "success" | "fail") =>
    s === "success" ? " \u2705" : " \u274C";

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
              Episode 03
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
              Transactions & Operations
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
          SECTION 2 — Transaction Lifecycle (frames 150-599)
          FlowDiagram: Wallet -> Horizon -> Core -> Ledger
          ============================================ */}
      <Sequence from={150} durationInFrames={450}>
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
              opacity: fadeIn(frame - 150, fps, 0.2),
              color: colors.textPrimary,
              fontSize: 36,
              fontFamily: fonts.title,
              fontWeight: 700,
            }}
          >
            Transaction Lifecycle
          </div>

          {/* Flow diagram */}
          <FlowDiagram
            steps={["Wallet", "Horizon", "Core", "Ledger"]}
            delay={0.5}
            accentColor={colors.accent2}
          />

          <LowerThird
            title="From submission to finality"
            subtitle="Each step validates and forwards the transaction"
            delay={2}
          />
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
            gap: 32,
          }}
        >
          {/* Section heading */}
          <div
            style={{
              opacity: fadeIn(frame - 600, fps, 0.2),
              color: colors.textPrimary,
              fontSize: 36,
              fontFamily: fonts.title,
              fontWeight: 700,
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

          {/* Operations row */}
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {operations.map((op, i) => {
              const delay = 1.0 + i * 0.5;
              const localFrame = frame - 600;
              const prog = spring({
                frame: localFrame - delay * fps,
                fps,
                config: { damping: 14, mass: 0.6, stiffness: 120 },
              });

              return (
                <div
                  key={i}
                  style={{
                    opacity: prog,
                    transform: `scale(${0.6 + prog * 0.4})`,
                    background: `${statusColor(op.status)}10`,
                    border: `2px solid ${statusColor(op.status)}50`,
                    borderRadius: 14,
                    padding: "20px 28px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    minWidth: 180,
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
                    {op.label}
                  </div>
                  <div
                    style={{
                      color: statusColor(op.status),
                      fontSize: 22,
                      fontFamily: fonts.code,
                      fontWeight: 700,
                    }}
                  >
                    {op.status === "success" ? "SUCCESS" : "FAIL"}
                    {statusIcon(op.status)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Transaction result */}
          {(() => {
            const resultDelay = 3.0;
            const localFrame = frame - 600;
            const resultProg = spring({
              frame: localFrame - resultDelay * fps,
              fps,
              config: { damping: 10, mass: 0.8, stiffness: 100 },
            });

            return (
              <div
                style={{
                  opacity: resultProg,
                  transform: `translateY(${(1 - resultProg) * 30}px)`,
                  marginTop: 16,
                  padding: "18px 40px",
                  borderRadius: 14,
                  background: `${colors.warning}15`,
                  border: `2px solid ${colors.warning}60`,
                }}
              >
                <div
                  style={{
                    color: colors.warning,
                    fontSize: 28,
                    fontFamily: fonts.title,
                    fontWeight: 800,
                    letterSpacing: 1,
                  }}
                >
                  Transaction: FAIL {"\u274C"}
                </div>
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* ============================================
          SECTION 4 — Operation Types Grid (frames 1050-1500)
          Staggered Badges: Payment, Change Trust, Invoke Contract
          ============================================ */}
      <Sequence from={1050} durationInFrames={450}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 36,
          }}
        >
          <div
            style={{
              opacity: fadeIn(frame - 1050, fps, 0.2),
              color: colors.textPrimary,
              fontSize: 36,
              fontFamily: fonts.title,
              fontWeight: 700,
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

          <div style={{ display: "flex", gap: 28, marginTop: 12 }}>
            <Badge label="Payment" delay={1.0} variant="accent2" />
            <Badge label="Change Trust" delay={1.6} variant="accent1" />
            <Badge label="Invoke Contract" delay={2.2} variant="success" />
          </div>

          <LowerThird
            title="20+ operation types available"
            subtitle="Compose complex logic in a single atomic unit"
            delay={3.0}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
