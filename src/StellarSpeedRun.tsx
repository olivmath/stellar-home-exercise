import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
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

// ─── Scene definitions synced to Whisper timestamps ─────────────────
// Opening overlaps with ep1 — it's the title card over the first 10s
const OPENING_DURATION = toFrame(10);

// ─── Episode transitions — title cards between episodes ──────────────
// Each transition: 2s centered on the boundary between episodes
const TRANSITION_DURATION = toFrame(2);

const transitions = [
  { episode: 1, title: "Foundation", subtitle: "Purpose & Network Economics", atSec: 9.4, durationSec: 2.5 },
  { episode: 2, title: "Wallet", subtitle: "Cryptographic Identity", atSec: 57 },
  { episode: 3, title: "Transaction", subtitle: "Atomic Operations", atSec: 107.88 },
  { episode: 4, title: "Consensus", subtitle: "Stellar Consensus Protocol", atSec: 150 },
  { episode: 5, title: "Soroban", subtitle: "Smart Contracts in Rust", atSec: 211, durationSec: 2.5 },
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

      {/* ── Sound Effects ── */}

      {/* Cinematic riser — each episode title transition */}
      {transitions.map(({ episode, atSec, durationSec }) => {
        const dur = toFrame(durationSec ?? 2);
        return (
          <Sequence key={`sfx-riser-${episode}`} from={toFrame(atSec) - Math.floor(dur / 2)} durationInFrames={dur}>
            <Audio src={staticFile("sounds/riser.mp3")} volume={0.4} />
          </Sequence>
        );
      })}

      {/* Soft whoosh — first card of each episode */}
      {[
        { key: "ep1", from: toFrame(10.3) },
        { key: "ep2", from: toFrame(60.83) },
        { key: "ep3", from: toFrame(114.97) },
        { key: "ep4", from: toFrame(152.0) },
        { key: "ep5", from: toFrame(213.0) },
      ].map(({ key, from }) => (
        <Sequence key={`sfx-whoosh-${key}`} from={from} durationInFrames={30}>
          <Audio src={staticFile("sounds/whoosh.mp3")} volume={0.35} />
        </Sequence>
      ))}

      {/* Applause + fanfare — certificate reveal */}
      <Sequence from={toFrame(289.0)} durationInFrames={180}>
        <Audio src={staticFile("sounds/applause.mp3")} volume={0.55} />
      </Sequence>

      {/* Progress bar — always on top */}
      <ProgressBar />

      {/* Debug timer — remove before final render */}
      <DebugTimer />
    </AbsoluteFill>
  );
};
