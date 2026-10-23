import type { AudioTimeline } from "../framework/AudioLayer";
export const audioMix = (overrides: Partial<AudioTimeline> = {}): AudioTimeline => ({
  narration: { id: "narration", src: "audio/narration/full-narration.mp3", volume: 1 },
  music: undefined,
  effects: [],
  ...overrides,
});
