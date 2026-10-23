import { secondsToFrames } from "../framework/timing";
import type { AudioTimeline } from "../framework/AudioLayer";
export const audioTimeline = (timeline: AudioTimeline, fps = 30): AudioTimeline => ({ ...timeline, effects: timeline.effects?.map((effect) => ({ ...effect, at: secondsToFrames(effect.at, fps) })) });
