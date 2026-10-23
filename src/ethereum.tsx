import { Composition, registerRoot } from "remotion";
import { EthereumSpeedRun } from "./EthereumSpeedRun";

const EthereumRoot: React.FC = () => (
  <Composition id="EthereumSpeedRun" component={EthereumSpeedRun} durationInFrames={9113} fps={30} width={1920} height={1080} />
);

registerRoot(EthereumRoot);
