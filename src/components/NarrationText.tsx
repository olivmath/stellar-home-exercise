import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn } from "../animations/springs";

type Word = {
  text: string;
  /** Absolute second when this word starts in the video */
  atSec: number;
};

type Props = {
  words: Word[];
  /** Absolute second when this scene starts (to compute relative frames) */
  sceneStartSec: number;
  delay?: number;
};

/**
 * Displays narration text word-by-word synced to audio timestamps.
 * Each word appears when its timestamp is reached.
 */
export const NarrationText: React.FC<Props> = ({ words, sceneStartSec, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: 28,
        fontWeight: 500,
        color: colors.textPrimary,
        lineHeight: 1.7,
        maxWidth: 480,
        opacity: fadeIn(frame, fps, delay),
      }}
    >
      {words.map((word, i) => {
        const wordFrame = Math.round((word.atSec - sceneStartSec) * fps);
        const visible = frame >= wordFrame;

        return (
          <span
            key={i}
            style={{
              opacity: visible ? 1 : 0,
              color: visible ? colors.textPrimary : "transparent",
              transition: "opacity 0.1s",
            }}
          >
            {word.text}{" "}
          </span>
        );
      })}
    </div>
  );
};
