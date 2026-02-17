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

// ─── Scene definitions synced to Whisper timestamps ─────────────────
// Opening overlaps with ep1 — it's the title card over the first 10s
const OPENING_DURATION = toFrame(10);

const scenes = [
  {
    id: "opening",
    component: Opening,
    from: 0,
    duration: OPENING_DURATION,
  },
  // ── Step 0: Episodes commented out for incremental redesign ──
  // Uncomment each as redesign is completed
  // {
  //   id: "ep1",
  //   component: Episode1,
  //   from: episodes.ep1.startFrame,
  //   duration: episodes.ep1.endFrame - episodes.ep1.startFrame,
  // },
  // {
  //   id: "ep2",
  //   component: Episode2,
  //   from: episodes.ep2.startFrame,
  //   duration: episodes.ep2.endFrame - episodes.ep2.startFrame,
  // },
  // {
  //   id: "ep3",
  //   component: Episode3,
  //   from: episodes.ep3.startFrame,
  //   duration: episodes.ep3.endFrame - episodes.ep3.startFrame,
  // },
  // {
  //   id: "ep4",
  //   component: Episode4,
  //   from: episodes.ep4.startFrame,
  //   duration: episodes.ep4.endFrame - episodes.ep4.startFrame,
  // },
  // {
  //   id: "ep5",
  //   component: Episode5,
  //   from: episodes.ep5.startFrame,
  //   duration: episodes.ep5.endFrame - episodes.ep5.startFrame,
  // },
  // {
  //   id: "closing",
  //   component: Closing,
  //   from: episodes.closing.startFrame,
  //   duration: episodes.closing.endFrame - episodes.closing.startFrame,
  // },
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

      {/* Progress bar — always on top */}
      <ProgressBar />
    </AbsoluteFill>
  );
};
