import { Composition } from "remotion";
import { StellarSpeedRun } from "./StellarSpeedRun";
import { Opening } from "./scenes/Opening";
import { Episode1 } from "./scenes/Episode1";
import { Episode2 } from "./scenes/Episode2";
import { Episode3 } from "./scenes/Episode3";
import { Episode4 } from "./scenes/Episode4";
import { Episode5 } from "./scenes/Episode5";
import { Closing } from "./scenes/Closing";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video completo */}
      <Composition
        id="StellarSpeedRun"
        component={StellarSpeedRun}
        durationInFrames={Math.ceil(FPS * 295.3)}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Cenas individuais para preview */}
      <Composition
        id="Opening"
        component={Opening}
        durationInFrames={10 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Episode1-Foundation"
        component={Episode1}
        durationInFrames={50 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Episode2-Wallet"
        component={Episode2}
        durationInFrames={50 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Episode3-Transactions"
        component={Episode3}
        durationInFrames={50 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Episode4-Consensus"
        component={Episode4}
        durationInFrames={60 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Episode5-Soroban"
        component={Episode5}
        durationInFrames={55 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Closing"
        component={Closing}
        durationInFrames={Math.ceil(20.3 * FPS)}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
