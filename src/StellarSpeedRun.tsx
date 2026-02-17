import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Opening } from "./scenes/Opening";
import { Episode1 } from "./scenes/Episode1";
import { Episode2 } from "./scenes/Episode2";
import { Episode3 } from "./scenes/Episode3";
import { Episode4 } from "./scenes/Episode4";
import { Episode5 } from "./scenes/Episode5";
import { Closing } from "./scenes/Closing";
import { colors } from "./styles/theme";

const FPS = 30;

// Timing in frames (calibrated to 295.3s video)
const scenes = [
  { component: Opening, from: 0, duration: 10 * FPS },
  { component: Episode1, from: 10 * FPS, duration: 50 * FPS },
  { component: Episode2, from: 60 * FPS, duration: 50 * FPS },
  { component: Episode3, from: 110 * FPS, duration: 50 * FPS },
  { component: Episode4, from: 160 * FPS, duration: 60 * FPS },
  { component: Episode5, from: 220 * FPS, duration: 55 * FPS },
  { component: Closing, from: 275 * FPS, duration: 20.3 * FPS },
];

export const StellarSpeedRun: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      <Audio src={staticFile("audio/narration/full-narration.mp3")} />

      {scenes.map(({ component: Component, from, duration }, i) => (
        <Sequence
          key={i}
          from={from}
          durationInFrames={Math.ceil(duration)}
        >
          <Component />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
