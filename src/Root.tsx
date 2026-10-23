import { Composition } from "remotion";
import { StellarSpeedRun } from "./StellarSpeedRun";
import { EthereumSpeedRun } from "./EthereumSpeedRun";
import { Thumbnail } from "./compositions/Thumbnail";
import { FloripaWeb3Index } from "./compositions/FloripaWeb3Index";
import { Opening, Episode1, Episode2, Episode3, Episode4, Episode5, Closing } from "./modules/stellar/scenes";
import { FPS, episodes, toFrame } from "./config/audioMarks";
import { ethereumCompositionDurationInFrames } from "./EthereumSpeedRun";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Production index — open this first when choosing among videos/scenes. */}
      <Composition
        id="FloripaWeb3Index"
        component={FloripaWeb3Index}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Video completo — synced to audioMarks */}
      <Composition
        id="StellarSpeedRun"
        component={StellarSpeedRun}
        durationInFrames={toFrame(303.77)}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="EthereumSpeedRun"
        component={EthereumSpeedRun}
        durationInFrames={ethereumCompositionDurationInFrames}
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
      {/* YouTube Thumbnail — 1280x720 still */}
      <Composition
        id="Thumbnail"
        component={Thumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
