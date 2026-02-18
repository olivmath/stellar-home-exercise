import { Composition } from "remotion";
import { StellarSpeedRun } from "./StellarSpeedRun";
import { Opening } from "./scenes/Opening";
import { Episode1 } from "./scenes/Episode1";
import { Episode2 } from "./scenes/Episode2";
import { Episode3 } from "./scenes/Episode3";
import { Episode4 } from "./scenes/Episode4";
import { Episode5 } from "./scenes/Episode5";
import { Closing } from "./scenes/Closing";
import { FPS, episodes, toFrame } from "./config/audioMarks";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video completo — synced to audioMarks */}
      <Composition
        id="StellarSpeedRun"
        component={StellarSpeedRun}
        durationInFrames={toFrame(302.0)}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Cenas individuais para preview — durations from audioMarks */}
      <Composition
        id="Opening"
        component={Opening}
        durationInFrames={episodes.ep1.startFrame || toFrame(10)}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Episode1-Foundation"
        component={Episode1}
        durationInFrames={episodes.ep1.endFrame - episodes.ep1.startFrame}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Episode2-Wallet"
        component={Episode2}
        durationInFrames={episodes.ep2.endFrame - episodes.ep2.startFrame}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Episode3-Transactions"
        component={Episode3}
        durationInFrames={episodes.ep3.endFrame - episodes.ep3.startFrame}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Episode4-Consensus"
        component={Episode4}
        durationInFrames={episodes.ep4.endFrame - episodes.ep4.startFrame}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Episode5-Soroban"
        component={Episode5}
        durationInFrames={episodes.ep5.endFrame - episodes.ep5.startFrame}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Closing"
        component={Closing}
        durationInFrames={episodes.closing.endFrame - episodes.closing.startFrame}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
