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
// Task #10: last card at 164.93s (not 165.93s), plus 2/3 quorum indicator
const SCENE_42_START = 159.23;
const lifecycleSteps = [
  { label: "Collect TXs", atSec: SCENE_42_START, color: colors.gold },
  { label: "Propose Ledger", atSec: 162.40, color: colors.info },
  { label: "Consensus", atSec: 164.93, color: colors.positive },
];

const LedgerLifecycle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, 0.3);

  // 2/3 quorum indicator appears with the Consensus card
  const quorumDelaySec = 164.93 - SCENE_42_START;
  const quorumOpacity = fadeIn(frame, fps, quorumDelaySec + 0.4);

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

          {/* 2/3 quorum requirement indicator */}
          <div
            style={{
              opacity: quorumOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: space.sm,
              width: "100%",
              marginTop: space.xs,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 1,
                background: `linear-gradient(90deg, transparent, ${colors.borderMedium}, transparent)`,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: space.sm,
              }}
            >
              {/* Progress bar showing 2/3 threshold */}
              <div
                style={{
                  position: "relative",
                  width: 120,
                  height: 6,
                  borderRadius: radius.pill,
                  background: colors.bgSurface,
                  border: `1px solid ${colors.borderSubtle}`,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "66.7%",
                    background: `linear-gradient(90deg, ${colors.info}, ${colors.positive})`,
                    borderRadius: radius.pill,
                  }}
                />
              </div>
              <div
                style={{
                  ...text.codeMD,
                  color: colors.positive,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                ≥ 2/3 quorum
              </div>
            </div>
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
// Task #11: PoW LEFT, PoS RIGHT, SCP CENTER. Shared shadow starts with scene.
const SCENE_44_START = 177.03;

const ConsensusCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // PoW appears at 177.03 (delay 0), PoS at 178.09, SCP at 179.66
  const powDelaySec = 177.03 - SCENE_44_START; // 0
  const posDelaySec = 178.09 - SCENE_44_START; // 1.06
  const scpDelaySec = 179.66 - SCENE_44_START; // 2.63

  const { opacity: powOpacity, translateY: powY } = slideIn(frame, fps, powDelaySec);
  const { opacity: scpOpacity, translateY: scpY } = slideIn(frame, fps, scpDelaySec);
  const { opacity: posOpacity, translateY: posY } = slideIn(frame, fps, posDelaySec);

  return (
    // Layered: dim overlay first, then cards on top
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* LEFT — No Proof of Work */}
      <div
        style={{
          position: "absolute",
          left: space.section,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <GlassPanel
          padding="32px 48px"
          borderColor={`${colors.negative}18`}
          style={{
            opacity: powOpacity,
            transform: `translateY(${powY}px)`,
            ...layout.centerColumn,
            gap: space.sm,
            minWidth: 320,
          }}
        >
          <div style={{ ...text.codeMD, color: colors.negative, letterSpacing: 1 }}>
            ✗
          </div>
          <div style={{ ...text.overlineSM, color: colors.negative }}>
            PROOF OF WORK
          </div>
          <div style={{ ...text.h2, color: colors.negative, textAlign: "center" }}>
            No PoW
          </div>
        </GlassPanel>
      </div>

      {/* CENTER — SCP */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <GlassPanel
          padding="40px 56px"
          borderColor={colors.borderAccent}
          glow={shadows.accent}
          style={{
            opacity: scpOpacity,
            transform: `translateY(${scpY}px)`,
            ...layout.centerColumn,
            gap: space.sm,
            minWidth: 360,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold }}>
            CONSENSUS
          </div>
          <div style={{ ...text.h1, textAlign: "center" }}>
            Stellar Consensus Protocol
          </div>
          <div style={{ ...text.codeMD, color: colors.gold, textAlign: "center" }}>
            SCP
          </div>
        </GlassPanel>
      </div>

      {/* RIGHT — No Proof of Stake */}
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <GlassPanel
          padding="32px 48px"
          borderColor={`${colors.negative}18`}
          style={{
            opacity: posOpacity,
            transform: `translateY(${posY}px)`,
            ...layout.centerColumn,
            gap: space.sm,
            minWidth: 320,
          }}
        >
          <div style={{ ...text.codeMD, color: colors.negative, letterSpacing: 1 }}>
            ✗
          </div>
          <div style={{ ...text.overlineSM, color: colors.negative }}>
            PROOF OF STAKE
          </div>
          <div style={{ ...text.h2, color: colors.negative, textAlign: "center" }}>
            No PoS
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4.5: David Mazieres (183.50s to 195.83s) — VIDEO+OVERLAY ──
// Task #12: ScientistCard with photo on RIGHT, FBA label on LEFT at 186.90s
const SCENE_45_START = 183.50;
const FBA_APPEAR_SEC = 186.90;

const DavidMazieres: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fbaDelaySec = FBA_APPEAR_SEC - SCENE_45_START; // 3.40s
  const fbaOpacity = fadeIn(frame, fps, fbaDelaySec);
  const fbaY = interpolate(
    frame,
    [fbaDelaySec * fps, fbaDelaySec * fps + 15],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      {/* RIGHT — David Mazières ScientistCard with photo */}
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <ScientistCard
          name="David Mazières"
          institution="Professor at Stanford University"
          caption="Federated Byzantine Agreement inventor"
          photo="david-mazieres.jpg"
          delay={0.3}
        />
      </div>

      {/* LEFT — Federated Byzantine Agreement label/badge at f5607 (186.90s) */}
      <div
        style={{
          position: "absolute",
          left: space.section,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: fbaOpacity,
          // translateY applied via outer wrapper
        }}
      >
        <div style={{ transform: `translateY(${fbaY}px)` }}>
          <GlassPanel
            padding="32px 48px"
            borderColor={colors.borderAccent}
            glow={shadows.accent}
            style={{
              ...layout.centerColumn,
              gap: space.lg,
              maxWidth: 420,
            }}
          >
            <div style={{ ...text.overlineSM, color: colors.gold }}>
              CONSENSUS MODEL
            </div>
            <div style={{ ...text.h2, textAlign: "center", lineHeight: 1.4 }}>
              Federated Byzantine Agreement
            </div>
            <div
              style={{
                ...text.codeMD,
                color: colors.gold,
                letterSpacing: 2,
              }}
            >
              FBA
            </div>
            <div
              style={{
                ...text.bodySM,
                textAlign: "center",
                lineHeight: 1.7,
                color: colors.textSecondary,
                maxWidth: 340,
              }}
            >
              Decentralized consensus without
              <br />
              global agreement on participants
            </div>
          </GlassPanel>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4.6: Quorum Slices (190.30s to 200.93s) — ANIMATION FULL ──
// Phase 1 (0–5s): FBA network vote propagation
// Phase 2 (5s+): Quorum circles centered on screen

type FBANodeState = "neutral" | "vote" | "accept";

const FBA_NODES = [
  { id: "v1", x: 260, y: 50 },
  { id: "v2", x: 130, y: 165 },
  { id: "v3", x: 390, y: 165 },
  { id: "v4", x: 260, y: 280 },
  { id: "v5", x: 130, y: 395 },
  { id: "v6", x: 390, y: 395 },
  { id: "v7", x: 260, y: 510 },
];

const FBA_EDGES: [string, string][] = [
  ["v1", "v2"], ["v1", "v3"],
  ["v2", "v4"], ["v3", "v4"],
  ["v4", "v5"], ["v4", "v6"],
  ["v5", "v7"], ["v6", "v7"],
];

const NODE_TIMELINE: Record<string, [number, FBANodeState][]> = {
  v1: [[10, "vote"], [60, "accept"]],
  v2: [[22, "vote"], [72, "accept"]],
  v3: [[22, "vote"], [72, "accept"]],
  v4: [[45, "accept"]],
  v5: [[65, "vote"], [100, "accept"]],
  v6: [[65, "vote"], [100, "accept"]],
  v7: [[88, "vote"], [120, "accept"]],
};

const STATE_COLOR: Record<FBANodeState, string> = {
  neutral: "#444",
  vote: "#FDDA24",
  accept: "#5cb88a",
};
const STATE_FILL: Record<FBANodeState, string> = {
  neutral: "rgba(255,255,255,0.04)",
  vote: "rgba(253,218,36,0.14)",
  accept: "rgba(92,184,138,0.18)",
};
const STATE_LABEL: Record<FBANodeState, string> = {
  neutral: "",
  vote: "Vote",
  accept: "Accept",
};

const QuorumSlices: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PHASE_SPLIT = Math.round(5 * fps); // 150 frames

  const phase1Opacity = interpolate(frame, [PHASE_SPLIT - 20, PHASE_SPLIT], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2Opacity = interpolate(frame, [PHASE_SPLIT, PHASE_SPLIT + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const getNodeState = (nodeId: string): FBANodeState => {
    const events = NODE_TIMELINE[nodeId] ?? [];
    let state: FBANodeState = "neutral";
    for (const [f, s] of events) {
      if (frame >= f) state = s;
    }
    return state;
  };

  // Phase 2: Quorum circles
  const frameRelP2 = Math.max(0, frame - PHASE_SPLIT);
  const circleSize = 200;
  const convergence = spring({
    frame: Math.max(0, frameRelP2 - Math.round(0.8 * fps)),
    fps,
    config: { damping: 20, mass: 1.0, stiffness: 60 },
  });
  const spread = interpolate(convergence, [0, 1], [120, 40]);
  const CIRCLES = [
    { color: colors.gold, fillColor: "rgba(201,168,76,0.15)", borderColor: "rgba(201,168,76,0.4)", label: "Slice A", angle: -90, delay: 0.3 },
    { color: colors.info, fillColor: "rgba(107,155,210,0.15)", borderColor: "rgba(107,155,210,0.4)", label: "Slice B", angle: 150, delay: 0.6 },
    { color: colors.positive, fillColor: "rgba(92,184,138,0.15)", borderColor: "rgba(92,184,138,0.4)", label: "Slice C", angle: 30, delay: 0.9 },
  ];
  const labelProg = spring({
    frame: Math.max(0, frameRelP2 - Math.round(2.5 * fps)),
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      {/* Phase 1: FBA Network animation */}
      <AbsoluteFill style={{ opacity: phase1Opacity }}>
        <AbsoluteFill style={{ ...layout.centerColumn }}>
          <div style={{ opacity: fadeIn(frame, fps, 0.2), ...text.overlineSM, color: colors.gold, marginBottom: space.lg }}>
            FEDERATED BYZANTINE AGREEMENT
          </div>
          <div style={{ opacity: fadeIn(frame, fps, 0.2), ...text.h2, marginBottom: space.xl, textAlign: "center" }}>
            Vote Propagation
          </div>
          <svg width={520} height={560} viewBox="0 0 520 560" style={{ overflow: "visible" }}>
            {FBA_EDGES.map(([aId, bId], i) => {
              const na = FBA_NODES.find(n => n.id === aId)!;
              const nb = FBA_NODES.find(n => n.id === bId)!;
              const sA = getNodeState(aId);
              const sB = getNodeState(bId);
              const bothAccept = sA === "accept" && sB === "accept";
              const anyActive = sA !== "neutral" || sB !== "neutral";
              return (
                <line
                  key={i}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={bothAccept ? "rgba(92,184,138,0.7)" : anyActive ? "rgba(253,218,36,0.3)" : "rgba(255,255,255,0.12)"}
                  strokeWidth={bothAccept ? 2 : 1}
                  strokeDasharray={bothAccept ? "none" : "4 4"}
                />
              );
            })}
            {FBA_NODES.map(node => {
              const state = getNodeState(node.id);
              const col = STATE_COLOR[state];
              const fill = STATE_FILL[state];
              const lbl = STATE_LABEL[state];
              return (
                <g key={node.id}>
                  {state !== "neutral" && (
                    <circle cx={node.x} cy={node.y} r={38}
                      fill={state === "accept" ? "rgba(92,184,138,0.08)" : "rgba(253,218,36,0.08)"} />
                  )}
                  <circle cx={node.x} cy={node.y} r={26} fill={fill} stroke={col} strokeWidth={state !== "neutral" ? 2.5 : 1.5} />
                  <text x={node.x} y={node.y + 5} textAnchor="middle" fill={col} fontSize={13}
                    fontFamily="'IBM Plex Mono', monospace" fontWeight="600">
                    {node.id}
                  </text>
                  {lbl && (
                    <text x={node.x} y={node.y - 36} textAnchor="middle" fill={col} fontSize={11}
                      fontFamily="'IBM Plex Mono', monospace">
                      {lbl}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Phase 2: Quorum Circles — CENTERED */}
      <AbsoluteFill style={{ opacity: phase2Opacity }}>
        <AbsoluteFill style={{ ...layout.centerColumn }}>
          <div style={{ ...text.overlineSM, color: colors.gold, marginBottom: space.lg }}>
            FEDERATED BYZANTINE AGREEMENT
          </div>
          <div style={{ ...text.h1, marginBottom: space.xxl, textAlign: "center" }}>
            Quorum Slices
          </div>
          <div style={{ position: "relative", width: 440, height: 320 }}>
            {CIRCLES.map((circle, i) => {
              const circleOpacity = fadeIn(frameRelP2, fps, circle.delay);
              const rad = (circle.angle * Math.PI) / 180;
              const cx = 440 / 2 + Math.cos(rad) * spread - circleSize / 2;
              const cy = 320 / 2 + Math.sin(rad) * spread - circleSize / 2;
              return (
                <div key={i} style={{
                  position: "absolute", left: cx, top: cy,
                  width: circleSize, height: circleSize,
                  borderRadius: radius.circle,
                  background: circle.fillColor,
                  border: `2px solid ${circle.borderColor}`,
                  backdropFilter: "blur(8px)",
                  opacity: circleOpacity,
                  ...layout.centerRow,
                }}>
                  <div style={{ ...text.overlineSM, color: circle.color }}>{circle.label}</div>
                </div>
              );
            })}
          </div>
          <div style={{
            opacity: labelProg,
            transform: `translateY(${interpolate(labelProg, [0, 1], [20, 0])}px)`,
            ...text.h3,
            textAlign: "center",
            marginTop: space.xl,
          }}>
            Consensus when overlap {"> "}2/3
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 4.7: Trilemma — SVG equilateral triangle (200.93s to 208.4s) — ANIMATION FULL ──
// Task #14: Triangle with Scalability (top), Decentralization (bottom-left), Security (bottom-right)
const Trilemma: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Words appear first: Decentralization → Security → Scalability, then triangle
  const vertex0Prog = spring({
    frame: Math.max(0, frame - Math.round(0.3 * fps)),
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 80 },
  });
  const vertex1Prog = spring({
    frame: Math.max(0, frame - Math.round(0.8 * fps)),
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 80 },
  });
  const vertex2Prog = spring({
    frame: Math.max(0, frame - Math.round(1.3 * fps)),
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 80 },
  });
  const edgesProg = spring({
    frame: Math.max(0, frame - Math.round(1.7 * fps)),
    fps,
    config: { damping: 22, mass: 1.0, stiffness: 50 },
  });

  // Triangle geometry — equilateral, centered in a 520x480 viewBox
  const cx = 260;
  const cy = 230;
  const R = 185; // circumradius
  // Top vertex (Scalability), bottom-left (Decentralization), bottom-right (Security)
  const vTop = { x: cx, y: cy - R };
  const vBL = { x: cx - R * Math.sin(Math.PI / 3), y: cy + R * 0.5 };
  const vBR = { x: cx + R * Math.sin(Math.PI / 3), y: cy + R * 0.5 };

  const triPath = `M ${vTop.x} ${vTop.y} L ${vBL.x} ${vBL.y} L ${vBR.x} ${vBR.y} Z`;
  const perimeter = R * 3 * Math.sqrt(3); // approx


  // Order: Decentralization → Security → Scalability
  const vertices = [
    {
      prog: vertex0Prog,
      x: vBL.x,
      y: vBL.y,
      label: "Decentralization",
      color: colors.info,
      labelAnchor: "end" as const,
      labelDy: 18,
      labelDx: -20,
      entryX: -30,
      entryY: 20,
    },
    {
      prog: vertex1Prog,
      x: vBR.x,
      y: vBR.y,
      label: "Security",
      color: colors.positive,
      labelAnchor: "start" as const,
      labelDy: 18,
      labelDx: 20,
      entryX: 30,
      entryY: 20,
    },
    {
      prog: vertex2Prog,
      x: vTop.x,
      y: vTop.y,
      label: "Scalability",
      color: colors.gold,
      labelAnchor: "middle" as const,
      labelDy: -24,
      labelDx: 0,
      entryX: 0,
      entryY: -30,
    },
  ];

  return (
    // VIDEO+OVERLAY — dim overlay, talking head visible
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <AbsoluteFill style={layout.centerColumn}>

        {/* SVG Triangle */}
        <svg
          width={520}
          height={480}
          viewBox="0 0 520 480"
          style={{ overflow: "visible" }}
        >
          {/* Triangle fill — subtle glow interior */}
          <path
            d={triPath}
            fill={`${colors.gold}06`}
            opacity={edgesProg}
          />

          {/* Triangle edges with animated dashoffset */}
          <path
            d={triPath}
            fill="none"
            stroke={`${colors.gold}40`}
            strokeWidth={1.5}
            strokeDasharray={perimeter}
            strokeDashoffset={perimeter * (1 - edgesProg)}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Vertex dots and labels */}
          {vertices.map((v, i) => {
            const dotRadius = interpolate(v.prog, [0, 1], [0, 6]);
            return (
              <g key={i}>
                {/* Glow ring */}
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={interpolate(v.prog, [0, 1], [0, 14])}
                  fill={`${v.color}18`}
                  opacity={v.prog}
                />
                {/* Dot */}
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={dotRadius}
                  fill={v.color}
                  opacity={v.prog}
                />
                {/* Label — rendered as foreignObject for design system fonts */}
                <foreignObject
                  x={v.x + v.labelDx - 140}
                  y={v.y + v.labelDy - 20}
                  width={280}
                  height={48}
                  style={{ overflow: "visible" }}
                >
                  <div
                    style={{
                      ...text.h3,
                      color: v.color,
                      textAlign: v.labelAnchor === "middle"
                        ? "center"
                        : v.labelAnchor === "end"
                          ? "right"
                          : "left",
                      opacity: v.prog,
                      transform: `translate(${v.entryX * (1 - v.prog)}px, ${v.entryY * (1 - v.prog)}px)`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {v.label}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
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

      {/* Scene 4.4: Consensus cards (PoW LEFT, SCP CENTER, PoS RIGHT) — 177.03s to 183.50s */}
      <Sequence from={rel(177.03)} durationInFrames={rel(183.50) - rel(177.03)}>
        <ConsensusCards />
      </Sequence>

      {/* Scene 4.5: David Mazieres (ScientistCard RIGHT, FBA label LEFT) — 183.50s to 195.83s */}
      <Sequence from={rel(183.50)} durationInFrames={rel(195.83) - rel(183.50)}>
        <DavidMazieres />
      </Sequence>

      {/* Scene 4.6: Quorum Slices — ANIMATION FULL starting at 190.30s to 200.93s */}
      <Sequence from={rel(190.30)} durationInFrames={rel(200.93) - rel(190.30)}>
        <QuorumSlices />
      </Sequence>

      {/* Scene 4.7: Trilemma — words first, then triangle — 200.93s to 204.87s (f6146) */}
      <Sequence from={rel(200.93)} durationInFrames={rel(204.87) - rel(200.93)}>
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
