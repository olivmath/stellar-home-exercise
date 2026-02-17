import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors } from "../styles/theme";
import { fadeIn } from "../animations/springs";
import { text, panel, shadows, radius, space } from "../styles/designSystem";

type Props = {
  steps: string[];
  delay?: number;
  accentColor?: string;
  direction?: "horizontal" | "vertical";
};

export const FlowDiagram: React.FC<Props> = ({
  steps,
  delay = 0,
  accentColor = colors.gold,
  direction = "vertical",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = direction === "vertical";

  return (
    <div style={{ display: "flex", flexDirection: isVertical ? "column" : "row", alignItems: "center", gap: 0 }}>
      {steps.map((step, i) => {
        const stepDelay = delay + i * 0.4;
        const opacity = fadeIn(frame, fps, stepDelay);

        const arrowProgress =
          i < steps.length - 1
            ? interpolate(
                frame,
                [(stepDelay + 0.2) * fps, (stepDelay + 0.6) * fps],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            : 0;

        return (
          <div
            key={i}
            style={{ display: "flex", flexDirection: isVertical ? "column" : "row", alignItems: "center", opacity }}
          >
            {/* Step node */}
            <div
              style={{
                ...panel.base,
                padding: `${space.md + 2}px ${space.xl}px`,
                borderRadius: radius.md,
                border: `1px solid ${accentColor}25`,
                boxShadow: `0 0 20px ${accentColor}06, ${shadows.inner}`,
              }}
            >
              {/* Accent dot */}
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: accentColor,
                  position: "absolute",
                  top: -3,
                  left: -3,
                }}
              />
              <span style={{ ...text.codeMD, color: colors.textPrimary }}>
                {step}
              </span>
            </div>

            {/* Arrow connector */}
            {i < steps.length - 1 && (
              isVertical ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: `${space.sm}px 0`,
                    height: 40,
                    width: 2,
                  }}
                >
                  <div
                    style={{
                      width: 1.5,
                      height: `${arrowProgress * 100}%`,
                      background: `linear-gradient(180deg, ${accentColor}35, ${accentColor})`,
                      borderRadius: 1,
                      boxShadow: `0 0 8px ${accentColor}20`,
                    }}
                  />
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "4px solid transparent",
                      borderRight: "4px solid transparent",
                      borderTop: `7px solid ${accentColor}`,
                      opacity: arrowProgress,
                      filter: `drop-shadow(0 0 4px ${accentColor})`,
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: `0 ${space.sm}px`,
                    position: "relative",
                    width: 56,
                    height: 2,
                  }}
                >
                  <div
                    style={{
                      height: 1.5,
                      width: `${arrowProgress * 100}%`,
                      background: `linear-gradient(90deg, ${accentColor}35, ${accentColor})`,
                      borderRadius: 1,
                      boxShadow: `0 0 8px ${accentColor}20`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      width: 0,
                      height: 0,
                      borderTop: "4px solid transparent",
                      borderBottom: "4px solid transparent",
                      borderLeft: `7px solid ${accentColor}`,
                      opacity: arrowProgress,
                      filter: `drop-shadow(0 0 4px ${accentColor})`,
                    }}
                  />
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};
