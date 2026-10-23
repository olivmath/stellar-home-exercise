import type { ExplainerTopic, SceneContract } from "../framework/types";
import { TOPIC_SEQUENCE, type TopicId } from "./scriptSchema";

export const OPENING_ID = "opening";
export const CLOSING_ID = "closing";

export const createTopic = (input: Omit<ExplainerTopic, "id"> & { id: TopicId }): ExplainerTopic => ({
  ...input,
  scenes: input.scenes ?? [],
});

export const topicIndex = (id: TopicId) => TOPIC_SEQUENCE.indexOf(id);
export const scene = (id: string, start: number, duration: number, kind: SceneContract["kind"] = "concept"): SceneContract => ({ id, start, duration, kind });
