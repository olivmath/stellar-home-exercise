import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Fragment, type ReactNode } from "react";

export type TransitionType = "fade" | "slide" | "wipe" | "zoom" | "custom";
type Props = { scenes: ReactNode[]; type?: TransitionType; durationInFrames?: number; sceneDurationInFrames?: number; direction?: "from-left" | "from-right" | "from-top" | "from-bottom"; overlay?: ReactNode };

export const TransitionLayer: React.FC<Props> = ({ scenes, type = "fade", durationInFrames = 15, sceneDurationInFrames = 300, direction = "from-right", overlay }) => {
  const presentation = (type === "slide" ? slide({ direction }) : type === "wipe" ? wipe({ direction }) : fade()) as any;
  return <AbsoluteFill>{type === "custom" ? <>{scenes.map((scene, i) => <AbsoluteFill key={i}>{scene}</AbsoluteFill>)}{overlay}</> : <TransitionSeries>{scenes.map((scene, i) => <Fragment key={i}><TransitionSeries.Sequence durationInFrames={sceneDurationInFrames}>{scene}</TransitionSeries.Sequence>{i < scenes.length - 1 && <TransitionSeries.Transition presentation={presentation} timing={i % 2 ? springTiming({ config: { damping: 200 }, durationInFrames }) : linearTiming({ durationInFrames })} />}</Fragment>)}</TransitionSeries>}{overlay}</AbsoluteFill>;
};
