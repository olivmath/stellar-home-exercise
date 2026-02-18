import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { Opening } from "./scenes/Opening";
import { Episode1 } from "./scenes/Episode1";
import { Episode2 } from "./scenes/Episode2";
import { Episode3 } from "./scenes/Episode3";
import { Episode4 } from "./scenes/Episode4";
import { Episode5 } from "./scenes/Episode5";
import { Closing } from "./scenes/Closing";
import { colors } from "./styles/theme";
import { episodes, toFrame } from "./config/audioMarks";
import { ProgressBar } from "./components/ProgressBar";
import { EpisodeTransition } from "./components/EpisodeTransition";
import { DebugTimer } from "./components/DebugTimer";

// ─── Document censor: pixelated 16-bit, bottom-to-top reveal ─────────
const PIXEL_SIZE = 36;
const CENSOR_W = 700;
const CENSOR_H = 500;
const CENSOR_COLS = Math.ceil(CENSOR_W / PIXEL_SIZE);
const CENSOR_ROWS = Math.ceil(CENSOR_H / PIXEL_SIZE);
const CENSOR_COLORS = [
  "rgba(8,20,35,0.92)",   "rgba(0,80,90,0.85)",   "rgba(12,30,55,0.90)",
  "rgba(30,15,50,0.88)",  "rgba(0,60,70,0.82)",   "rgba(15,10,30,0.93)",
  "rgba(50,35,0,0.80)",   "rgba(8,25,45,0.90)",   "rgba(0,50,60,0.86)",
  "rgba(25,8,45,0.89)",   "rgba(10,40,20,0.84)",  "rgba(40,20,0,0.83)",
  "rgba(5,15,35,0.91)",   "rgba(0,90,100,0.78)",  "rgba(35,0,60,0.87)",
  "rgba(20,50,10,0.82)",  "rgba(60,40,0,0.80)",   "rgba(0,40,80,0.88)",
  "rgba(15,55,40,0.83)",  "rgba(45,10,70,0.85)",
];

const DocumentCensor: React.FC = () => {
  const frame = useCurrentFrame();
  const revealProgress = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const revealedRows = Math.round(revealProgress * CENSOR_ROWS);

  return (
    <div style={{
      position: "absolute",
      left: 80, top: 40,
      width: CENSOR_W, height: CENSOR_H,
      display: "grid",
      gridTemplateColumns: `repeat(${CENSOR_COLS}, ${PIXEL_SIZE}px)`,
      gridTemplateRows: `repeat(${CENSOR_ROWS}, ${PIXEL_SIZE}px)`,
      overflow: "hidden",
      borderRadius: 4,
      imageRendering: "pixelated",
    }}>
      {Array.from({ length: CENSOR_ROWS * CENSOR_COLS }, (_, i) => {
        const row = Math.floor(i / CENSOR_COLS);
        const col = i % CENSOR_COLS;
        // Reveal from bottom to top: bottom rows appear first
        const rowFromBottom = CENSOR_ROWS - 1 - row;
        const visible = rowFromBottom < revealedRows;
        const idx = (row * 11 + col * 7 + row * col * 3) % CENSOR_COLORS.length;
        return (
          <div
            key={i}
            style={{
              backgroundColor: CENSOR_COLORS[idx],
              opacity: visible ? 1 : 0,
            }}
          />
        );
      })}
    </div>
  );
};

// ─── Scene definitions synced to Whisper timestamps ─────────────────
// Opening overlaps with ep1 — it's the title card over the first 10s
const OPENING_DURATION = toFrame(10);

// ─── Episode transitions — title cards between episodes ──────────────
// Each transition: 2s centered on the boundary between episodes
const TRANSITION_DURATION = toFrame(2);

const transitions = [
  { episode: 1, title: "Foundation", subtitle: "Purpose & Network Economics", atSec: 9.4, durationSec: 2.5 },
  { episode: 2, title: "Wallet", subtitle: "Cryptographic Identity", atSec: 57 },
  { episode: 3, title: "Transaction", subtitle: "Atomic Operations", atSec: 109.65 },
  { episode: 4, title: "Consensus", subtitle: "Stellar Consensus Protocol", atSec: 151.77 },
  { episode: 5, title: "Soroban", subtitle: "Smart Contracts in Rust", atSec: 212.77, durationSec: 2.5 },
];

const scenes = [
  {
    id: "opening",
    component: Opening,
    from: 0,
    duration: OPENING_DURATION,
  },
  // ── Step 0: Episodes commented out for incremental redesign ──
  // Uncomment each as redesign is completed
  {
    id: "ep1",
    component: Episode1,
    from: episodes.ep1.startFrame,
    duration: episodes.ep1.endFrame - episodes.ep1.startFrame,
  },
  {
    id: "ep2",
    component: Episode2,
    from: episodes.ep2.startFrame,
    duration: episodes.ep2.endFrame - episodes.ep2.startFrame,
  },
  {
    id: "ep3",
    component: Episode3,
    from: episodes.ep3.startFrame,
    duration: episodes.ep3.endFrame - episodes.ep3.startFrame,
  },
  {
    id: "ep4",
    component: Episode4,
    from: episodes.ep4.startFrame,
    duration: episodes.ep4.endFrame - episodes.ep4.startFrame,
  },
  {
    id: "ep5",
    component: Episode5,
    from: episodes.ep5.startFrame,
    duration: episodes.ep5.endFrame - episodes.ep5.startFrame,
  },
  {
    id: "closing",
    component: Closing,
    from: episodes.closing.startFrame,
    duration: episodes.closing.endFrame - episodes.closing.startFrame,
  },
];

export const StellarSpeedRun: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      {/* Base layer: talking head video running the entire duration */}
      <OffthreadVideo
        src={staticFile("STELLAR-SPEEDRUN.mp4")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
        }}
      />

      {/* Audio track */}
      <Audio src={staticFile("audio/narration/full-narration.mp3")} volume={0} />

      {/* Scene layers — synced to audioMarks timestamps */}
      {scenes.map(({ id, component: Component, from, duration }) => (
        <Sequence key={id} from={from} durationInFrames={Math.ceil(duration)}>
          <Component />
        </Sequence>
      ))}

      {/* Episode transitions — title cards between episodes */}
      {transitions.map(({ episode, title, subtitle, atSec, durationSec }) => {
        const dur = toFrame(durationSec ?? 2);
        return (
          <Sequence
            key={`transition-${episode}`}
            from={toFrame(atSec) - dur / 2}
            durationInFrames={dur}
          >
            <EpisodeTransition episode={episode} title={title} subtitle={subtitle} />
          </Sequence>
        );
      })}

      {/* Document censor — f1770 to f1815 (00:59.00 → 01:00.50) */}
      <Sequence from={1770} durationInFrames={1815 - 1770}>
        <DocumentCensor />
      </Sequence>

      {/* Progress bar — always on top */}
      <ProgressBar />

      {/* Debug timer — remove before final render */}
      <DebugTimer />
    </AbsoluteFill>
  );
};
