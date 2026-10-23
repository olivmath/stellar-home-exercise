import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import type { BlockchainExplainer as BlockchainExplainerConfig, ExplainerTopic } from "../framework/types";
import { validateExplainer } from "./scriptSchema";

export type BlockchainExplainerProps = {
  explainer: BlockchainExplainerConfig;
  opening: React.ComponentType;
  topics: Record<string, React.ComponentType>;
  closing: React.ComponentType;
  renderOverlay?: (topic: ExplainerTopic) => React.ReactNode;
};

export const BlockchainExplainer: React.FC<BlockchainExplainerProps> = ({ explainer, opening, topics, closing, renderOverlay }) => {
  const errors = validateExplainer(explainer);
  if (errors.length) throw new Error(`Invalid blockchain explainer: ${errors.join("; ")}`);
  const Opening = opening;
  const Closing = closing;
  return <AbsoluteFill>
    <Sequence from={explainer.opening.start * 30} durationInFrames={explainer.opening.duration * 30}><Opening /></Sequence>
    {explainer.topics.map((topic) => {
      const Component = topics[topic.id];
      if (!Component) throw new Error(`Missing scene for topic ${topic.id}`);
      return <Sequence key={topic.id} from={topic.start * 30} durationInFrames={topic.duration * 30}><Component />{renderOverlay?.(topic)}</Sequence>;
    })}
    <Sequence from={explainer.closing.start * 30} durationInFrames={explainer.closing.duration * 30}><Closing /></Sequence>
  </AbsoluteFill>;
};
