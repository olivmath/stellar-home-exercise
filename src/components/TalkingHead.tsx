import {
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { colors } from "../styles/theme";

const handleVideoError = (error: Error) => {
  console.warn("Unable to load the talking-head video; continuing without it.", error);
};

type VideoMode =
  | "full"           // Video fills entire screen, no overlay
  | "overlay"        // Video as background with darkened overlay for graphics on top
  | "pip"            // Picture-in-picture: small video in corner
  | "hidden";        // Video hidden, audio still plays via main Audio component

type Props = {
  mode: VideoMode;
  /** 0-1, how much to darken the video in overlay mode */
  dimAmount?: number;
  /** PiP position */
  pipPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  /** PiP size as percentage of screen width */
  pipScale?: number;
  /** Fade in duration in seconds */
  fadeIn?: number;
  /** Fade out duration in seconds */
  fadeOut?: number;
  /** Start frame for fade out (relative to this Sequence) */
  fadeOutAt?: number;
};

const pipPositions = {
  "bottom-right": { bottom: 40, right: 40 },
  "bottom-left": { bottom: 40, left: 40 },
  "top-right": { top: 40, right: 40 },
  "top-left": { top: 40, left: 40 },
};

export const TalkingHead: React.FC<Props> = ({
  mode,
  dimAmount = 0.55,
  pipPosition = "bottom-right",
  pipScale = 0.28,
  fadeIn = 0,
  fadeOut = 0,
  fadeOutAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (mode === "hidden") return null;

  // Fade calculations
  let opacity = 1;
  if (fadeIn > 0) {
    opacity = Math.min(
      opacity,
      interpolate(frame, [0, fadeIn * fps], [0, 1], {
        extrapolateRight: "clamp",
      })
    );
  }
  if (fadeOut > 0 && fadeOutAt !== undefined) {
    opacity = Math.min(
      opacity,
      interpolate(
        frame,
        [fadeOutAt, fadeOutAt + fadeOut * fps],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    );
  }

  if (mode === "full") {
    return (
      <div style={{ position: "absolute", inset: 0, opacity }}>
        <OffthreadVideo
          src={staticFile("STELLAR-SPEEDRUN.mp4")}
          onError={handleVideoError}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          transparent={false}
        />
      </div>
    );
  }

  if (mode === "overlay") {
    return (
      <div style={{ position: "absolute", inset: 0, opacity }}>
        <OffthreadVideo
          src={staticFile("STELLAR-SPEEDRUN.mp4")}
          onError={handleVideoError}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          transparent={false}
        />
        {/* Dark overlay so graphics are readable on top */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: `rgba(5, 8, 16, ${dimAmount})`,
          }}
        />
      </div>
    );
  }

  if (mode === "pip") {
    const pos = pipPositions[pipPosition];
    const w = 1920 * pipScale;
    const h = 1080 * pipScale;

    return (
      <div
        style={{
          position: "absolute",
          ...pos,
          width: w,
          height: h,
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${colors.borderAccent}`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.6), ${colors.shadowAccent}`,
          opacity,
          zIndex: 100,
        }}
      >
        <OffthreadVideo
          src={staticFile("STELLAR-SPEEDRUN.mp4")}
          onError={handleVideoError}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          transparent={false}
        />
      </div>
    );
  }

  return null;
};
