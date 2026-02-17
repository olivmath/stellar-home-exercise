import { Composition } from "remotion";
import { StellarWorkshop } from "./StellarWorkshop";

// 5 minutes at 30fps = 9000 frames
const FPS = 30;
const DURATION_SECONDS = 5 * 60;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="StellarWorkshop"
        component={StellarWorkshop}
        durationInFrames={FPS * DURATION_SECONDS}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
