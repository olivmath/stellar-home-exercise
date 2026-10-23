import type { EpisodeContract, NarrationMark, SceneContract, BlockchainExplainer, ExplainerTopic } from "../framework/types";

export type BlockchainExplainerScript = {
  opening: SceneContract;
  episodes: EpisodeContract[];
  closing: SceneContract;
};

export const TOPIC_SEQUENCE = ["foundation", "wallet", "transactions", "blocks", "consensus", "smart-contracts"] as const;
export type TopicId = (typeof TOPIC_SEQUENCE)[number];

export const validateExplainer = (explainer: BlockchainExplainer): string[] => {
  const errors: string[] = [];
  if (explainer.topics.length !== TOPIC_SEQUENCE.length) errors.push("A blockchain explainer must contain six topics");
  explainer.topics.forEach((topic, index) => {
    if (topic.id !== TOPIC_SEQUENCE[index]) errors.push(`Topic ${index + 1} must be ${TOPIC_SEQUENCE[index]}`);
    if (topic.duration < 45 || topic.duration > 60) errors.push(`${topic.id} must be between 45 and 60 seconds`);
    if (!topic.coreConcept) errors.push(`${topic.id} must define one core concept`);
    if (topic.visualMoments.length < 3 || topic.visualMoments.length > 5) errors.push(`${topic.id} must have 3 to 5 visual moments`);
    if (!topic.takeaway || !topic.bridge) errors.push(`${topic.id} must define a takeaway and bridge`);
  });
  return errors;
};

export const explainerToScript = (explainer: BlockchainExplainer): BlockchainExplainerScript => ({
  opening: explainer.opening,
  episodes: explainer.topics,
  closing: explainer.closing,
});

export const isNarrationMark = (mark: NarrationMark) => mark.end === undefined || mark.end >= mark.start;
export const episodeDuration = (episode: EpisodeContract) => episode.scenes.reduce((max, scene) => Math.max(max, scene.start + scene.duration), 0);

export const validateScript = (script: BlockchainExplainerScript): string[] => {
  const errors: string[] = [];
  if (script.episodes.length !== 6) errors.push("A blockchain explainer must contain six episodes");
  for (const episode of script.episodes) {
    if (episode.duration < 45 || episode.duration > 60) errors.push(`${episode.id} must be between 45 and 60 seconds`);
    if (episode.scenes.some((scene) => scene.narration?.some((mark) => !isNarrationMark(mark)))) errors.push(`${episode.id} contains an invalid narration mark`);
  }
  return errors;
};
