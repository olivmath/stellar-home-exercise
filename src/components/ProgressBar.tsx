import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors, fonts } from "../styles/theme";
import { toFrame } from "../config/audioMarks";

const SEGMENTS = [
  { label: "Intro", startSec: 0, endSec: 9 },
  { label: "Ep 1", startSec: 9, endSec: 57 },
  { label: "Ep 2", startSec: 57, endSec: 108 },
  { label: "Ep 3", startSec: 108, endSec: 150 },
  { label: "Ep 4", startSec: 150, endSec: 211 },
  { label: "Ep 5", startSec: 211, endSec: 277 },
  { label: "Ep 6", startSec: 277, endSec: 295 },
];

const TOTAL_DURATION_SEC = 295;
const BAR_HEIGHT = 6;
const BAR_BOTTOM = 24;
const BAR_MARGIN_X = 48;
const SEGMENT_GAP = 3;

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  const totalWidth = 1920 - BAR_MARGIN_X * 2;

  // Fade in the bar after 2s, stays visible
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

        // Fill percentage within this segment
        let fillPct = 0;
        if (currentSec >= seg.endSec) {
          fillPct = 100;
        } else if (currentSec > seg.startSec) {
          fillPct = ((currentSec - seg.startSec) / segDuration) * 100;
        }

        const isActive = currentSec >= seg.startSec && currentSec < seg.endSec;
        const isComplete = currentSec >= seg.endSec;

        return (
          <div
            key={i}
            style={{
              width: segWidth,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            {/* Label — only show for active or completed segments */}
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: isActive
                  ? colors.gold
                  : isComplete
                    ? colors.teal
                    : colors.textDim,
                opacity: isActive ? 1 : isComplete ? 0.7 : 0.3,
                transition: "color 0.3s",
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
                background: "rgba(255, 255, 255, 0.08)",
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
                    ? `linear-gradient(90deg, ${colors.gold}, ${colors.teal})`
                    : isComplete
                      ? colors.teal
                      : "transparent",
                  boxShadow: isActive
                    ? `0 0 8px rgba(253, 218, 36, 0.4)`
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
