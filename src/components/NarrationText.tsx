import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../styles/theme";
import { fadeIn } from "../animations/springs";
import { text } from "../styles/designSystem";

type Word = {
  text: string;
  atSec: number;
};

type Props = {
  words: Word[];
  sceneStartSec: number;
  delay?: number;
};

export const NarrationText: React.FC<Props> = ({ words, sceneStartSec, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        ...text.h2,
        fontWeight: 500,
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
            }}
          >
            {word.text}{" "}
          </span>
        );
      })}
    </div>
  );
};
