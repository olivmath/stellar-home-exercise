import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn } from "../animations/springs";
import { LowerThird } from "../components/LowerThird";

// Deterministic pseudo-random based on seed
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// Generate static particle positions once
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  x: seededRandom(i * 3 + 1) * 1920,
  y: seededRandom(i * 3 + 2) * 1080,
  size: seededRandom(i * 3 + 3) * 3 + 1,
  delay: seededRandom(i * 3 + 4) * 2, // 0-2 seconds stagger
  driftX: (seededRandom(i * 3 + 5) - 0.5) * 40,
  driftY: (seededRandom(i * 3 + 6) - 0.5) * 40,
}));

// Generate connections between nearby particles
const CONNECTIONS: { from: number; to: number }[] = [];
for (let i = 0; i < PARTICLES.length; i++) {
  for (let j = i + 1; j < PARTICLES.length; j++) {
    const dx = PARTICLES[i].x - PARTICLES[j].x;
    const dy = PARTICLES[i].y - PARTICLES[j].y;
    if (Math.sqrt(dx * dx + dy * dy) < 200) {
      CONNECTIONS.push({ from: i, to: j });
    }
  }
}

export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Global fade in for the whole scene (frames 0-30)
  const globalOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Title animation: appears at ~1.5s (frame 45), scales up
  const titleProgress = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(titleProgress, [0, 1], [0.85, 1]);
  const titleOpacity = titleProgress;

  // Subtitle fades in after title
  const subtitleOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        overflow: "hidden",
      }}
    >
      {/* ── Network Particles ── */}
      <AbsoluteFill style={{ opacity: globalOpacity }}>
        {/* Connection lines */}
        <svg
          style={{ position: "absolute", width: "100%", height: "100%" }}
          viewBox="0 0 1920 1080"
        >
          {CONNECTIONS.map(({ from, to }, idx) => {
            const p1 = PARTICLES[from];
            const p2 = PARTICLES[to];
            const lineDelay = Math.max(p1.delay, p2.delay) + 0.5;
            const lineOpacity = interpolate(
              frame,
              [lineDelay * fps, (lineDelay + 1) * fps],
              [0, 0.12],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const x1 =
              p1.x +
              interpolate(frame, [0, 300], [0, p1.driftX], {
                extrapolateRight: "clamp",
              });
            const y1 =
              p1.y +
              interpolate(frame, [0, 300], [0, p1.driftY], {
                extrapolateRight: "clamp",
              });
            const x2 =
              p2.x +
              interpolate(frame, [0, 300], [0, p2.driftX], {
                extrapolateRight: "clamp",
              });
            const y2 =
              p2.y +
              interpolate(frame, [0, 300], [0, p2.driftY], {
                extrapolateRight: "clamp",
              });

            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colors.accent2}
                strokeWidth={0.8}
                opacity={lineOpacity}
              />
            );
          })}
        </svg>

        {/* Particle dots */}
        {PARTICLES.map((p, i) => {
          const particleOpacity = interpolate(
            frame,
            [p.delay * fps, (p.delay + 1) * fps],
            [0, 0.6 + p.size * 0.1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const x =
            p.x +
            interpolate(frame, [0, 300], [0, p.driftX], {
              extrapolateRight: "clamp",
            });
          const y =
            p.y +
            interpolate(frame, [0, 300], [0, p.driftY], {
              extrapolateRight: "clamp",
            });

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: p.size * 2,
                height: p.size * 2,
                borderRadius: "50%",
                backgroundColor: i % 3 === 0 ? colors.accent1 : colors.accent2,
                opacity: particleOpacity,
                boxShadow: `0 0 ${p.size * 4}px ${i % 3 === 0 ? colors.accent1 : colors.accent2}`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* ── Radial glow behind title ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${colors.accent1}18 0%, transparent 70%)`,
          opacity: titleOpacity,
        }}
      />

      {/* ── Title ── */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <h1
            style={{
              fontSize: 88,
              fontFamily: fonts.title,
              fontWeight: 800,
              background: `linear-gradient(135deg, ${colors.accent1}, ${colors.accent2})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
              letterSpacing: -2,
            }}
          >
            Stellar Speed Run
          </h1>
          <div
            style={{
              opacity: subtitleOpacity,
              fontSize: 28,
              fontFamily: fonts.body,
              color: colors.textSecondary,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            The Blockchain for Payments
          </div>
        </div>
      </AbsoluteFill>

      {/* ── Lower Third ── */}
      <Sequence from={120} durationInFrames={180}>
        <LowerThird
          title="End-to-End in 5 Minutes"
          subtitle="A complete overview of the Stellar network"
          delay={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
