import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors } from "../styles/theme";
import { toFrame } from "../config/audioMarks";
import { text, space } from "../styles/designSystem";

const SEGMENTS = [
  { label: "Intro", startSec: 0, endSec: 9, bonus: false },
  { label: "Ep 1", startSec: 9, endSec: 57, bonus: false },
  { label: "Ep 2", startSec: 57, endSec: 110, bonus: false },
  { label: "Ep 3", startSec: 110, endSec: 151, bonus: false },
  { label: "Ep 4", startSec: 151, endSec: 213, bonus: false },
  { label: "Ep 5", startSec: 213, endSec: 277.05, bonus: false },
  { label: "Recap", startSec: 277.05, endSec: 296.81, bonus: false },
  { label: "Bonus", startSec: 296.81, endSec: 303.77, bonus: true },
];

const TOTAL_DURATION_SEC = 303.77;
const BAR_HEIGHT = 5;
const BAR_BOTTOM = 170;
const BAR_MARGIN_X = space.xxl;
const SEGMENT_GAP = 3;

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  const totalWidth = 1920 - BAR_MARGIN_X * 2;

  const barOpacity = interpolate(frame, [toFrame(1.5), toFrame(2.5)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: BAR_BOTTOM,
        left: BAR_MARGIN_X,
        right: BAR_MARGIN_X,
        display: "flex",
        gap: SEGMENT_GAP,
        opacity: barOpacity,
        zIndex: 100,
      }}
    >
      {SEGMENTS.map((seg, i) => {
        const segDuration = seg.endSec - seg.startSec;
        const segWidthRatio = segDuration / TOTAL_DURATION_SEC;
        const segWidth = segWidthRatio * totalWidth - SEGMENT_GAP;

        let fillPct = 0;
        if (currentSec >= seg.endSec) {
          fillPct = 100;
        } else if (currentSec > seg.startSec) {
          fillPct = ((currentSec - seg.startSec) / segDuration) * 100;
        }

        const isActive = currentSec >= seg.startSec && currentSec < seg.endSec;
        const isComplete = currentSec >= seg.endSec;

        const activeColor = seg.bonus ? colors.accent : colors.accent;
        const completeColor = seg.bonus ? colors.accent : colors.info;
        const activeFill = seg.bonus
          ? `linear-gradient(90deg, ${colors.accent}, #FFB800)`
          : `linear-gradient(90deg, ${colors.accent}, ${colors.info})`;

        return (
          <div
            key={i}
            style={{
              width: segWidth,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: space.xs,
            }}
          >
            {/* Segment label */}
            <div
              style={{
                ...text.label,
                fontSize: 11,
                letterSpacing: 1.5,
                color: isActive
                  ? activeColor
                  : isComplete
                    ? completeColor
                    : colors.textDim,
                opacity: isActive ? 1 : isComplete ? 0.7 : 0.3,
              }}
            >
              {seg.label}
            </div>

            {/* Bar track */}
            <div
              style={{
                width: "100%",
                height: BAR_HEIGHT,
                borderRadius: BAR_HEIGHT / 2,
                  background: seg.bonus
                  ? `rgba(24, 60, 255, 0.12)`
                  : "rgba(255, 255, 255, 0.06)",
                border: seg.bonus ? `1px solid ${colors.accent}30` : "none",
                overflow: "hidden",
              }}
            >
              {/* Bar fill */}
              <div
                style={{
                  width: `${fillPct}%`,
                  height: "100%",
                  borderRadius: BAR_HEIGHT / 2,
                  background: isActive
                    ? activeFill
                    : isComplete
                      ? completeColor
                      : "transparent",
                  boxShadow: isActive
                    ? `0 0 10px ${colors.accentMuted}`
                    : "none",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
