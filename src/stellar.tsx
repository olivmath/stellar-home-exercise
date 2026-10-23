import { Composition, registerRoot } from "remotion";
import { StellarSpeedRun } from "./StellarSpeedRun";

const StellarRoot: React.FC = () => (
  <Composition id="StellarSpeedRun" component={StellarSpeedRun} durationInFrames={9113} fps={30} width={1920} height={1080} />
);

registerRoot(StellarRoot);
