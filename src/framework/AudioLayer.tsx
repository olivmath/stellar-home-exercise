import { Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { AudioTrack, NarrationMark } from "./types";

export type AudioTimeline = { narration?: AudioTrack; music?: AudioTrack; effects?: Array<AudioTrack & { at: number }> };
type Props = { timeline: AudioTimeline; narrationMarks?: NarrationMark[]; duckTo?: number };

export const AudioLayer: React.FC<Props> = ({ timeline, narrationMarks = [], duckTo = 0.18 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const speaking = narrationMarks.some((mark) => frame >= Math.round(mark.start * fps) && frame <= Math.round((mark.end ?? mark.start + 1) * fps));
  const musicVolume = timeline.music ? (speaking ? duckTo : timeline.music.volume ?? 0.1) : 0;
  return <>{timeline.narration && <Audio src={staticFile(timeline.narration.src)} volume={timeline.narration.volume ?? 1} />}{timeline.music && <Audio src={staticFile(timeline.music.src)} loop={timeline.music.loop ?? true} volume={(f) => interpolate(f, [0, (timeline.music?.fadeIn ?? 0) * fps, 999999], [0, musicVolume, musicVolume], { extrapolateRight: "clamp" })} />}{timeline.effects?.map((effect) => <Sequence key={`${effect.id}-${effect.at}`} from={effect.at}><Audio src={staticFile(effect.src)} volume={effect.volume ?? 0.3} /></Sequence>)}</>;
};
