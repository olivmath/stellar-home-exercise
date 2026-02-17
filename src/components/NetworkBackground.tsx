import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors } from "../styles/theme";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

const PARTICLES = Array.from({ length: 80 }, (_, i) => ({
  x: seededRandom(i * 7 + 1) * 1920,
  y: seededRandom(i * 7 + 2) * 1080,
  size: seededRandom(i * 7 + 3) * 2.5 + 0.5,
  delay: seededRandom(i * 7 + 4) * 3,
  driftX: (seededRandom(i * 7 + 5) - 0.5) * 60,
  driftY: (seededRandom(i * 7 + 6) - 0.5) * 60,
}));

const CONNECTIONS: { from: number; to: number; dist: number }[] = [];
for (let i = 0; i < PARTICLES.length; i++) {
  for (let j = i + 1; j < PARTICLES.length; j++) {
    const dx = PARTICLES[i].x - PARTICLES[j].x;
    const dy = PARTICLES[i].y - PARTICLES[j].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 180) {
      CONNECTIONS.push({ from: i, to: j, dist });
    }
  }
}

type Props = {
  opacity?: number;
  speed?: number;
};

export const NetworkBackground: React.FC<Props> = ({
  opacity = 1,
  speed = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalFrames = fps * 300;

  const getPos = (p: (typeof PARTICLES)[0]) => ({
    x:
      p.x +
      interpolate(frame, [0, totalFrames], [0, p.driftX * speed], {
        extrapolateRight: "clamp",
      }),
    y:
      p.y +
      interpolate(frame, [0, totalFrames], [0, p.driftY * speed], {
        extrapolateRight: "clamp",
      }),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        overflow: "hidden",
      }}
    >
      {/* Ambient gold glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.gold}06 0%, transparent 70%)`,
        }}
      />
      {/* Teal glow */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.teal}06 0%, transparent 70%)`,
        }}
      />

      {/* Connection lines */}
      <svg
        style={{ position: "absolute", width: "100%", height: "100%" }}
        viewBox="0 0 1920 1080"
      >
        {CONNECTIONS.map(({ from, to, dist }, idx) => {
          const p1 = getPos(PARTICLES[from]);
          const p2 = getPos(PARTICLES[to]);
          const lineDelay =
            Math.max(PARTICLES[from].delay, PARTICLES[to].delay) + 0.3;
          const lineOpacity = interpolate(
            frame,
            [lineDelay * fps, (lineDelay + 1.5) * fps],
            [0, 0.06 * (1 - dist / 180)],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <line
              key={idx}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={colors.gold}
              strokeWidth={0.6}
              opacity={lineOpacity}
            />
          );
        })}
      </svg>

      {/* Particles — gold and teal */}
      {PARTICLES.map((p, i) => {
        const pos = getPos(p);
        const particleOpacity = interpolate(
          frame,
          [p.delay * fps, (p.delay + 1) * fps],
          [0, 0.4 + p.size * 0.15],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const isGold = i % 3 === 0;
        const color = isGold ? colors.gold : colors.teal;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.x - p.size,
              top: pos.y - p.size,
              width: p.size * 2,
              height: p.size * 2,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: particleOpacity,
              boxShadow: `0 0 ${p.size * 6}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
