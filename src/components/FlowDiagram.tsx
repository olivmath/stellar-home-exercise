import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn } from "../animations/springs";

type Props = {
  steps: string[];
  delay?: number;
  accentColor?: string;
};

export const FlowDiagram: React.FC<Props> = ({
  steps,
  delay = 0,
  accentColor = colors.stellar,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {steps.map((step, i) => {
        const stepDelay = delay + i * 0.4;
        const opacity = fadeIn(frame, fps, stepDelay);

        // Animate the arrow connection line drawing in
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
            style={{ display: "flex", alignItems: "center", opacity }}
          >
            {/* Step node */}
            <div
              style={{
                background: colors.bgGlass,
                border: `1px solid ${accentColor}30`,
                borderRadius: 14,
                padding: "18px 28px",
                color: colors.textPrimary,
                fontSize: 19,
                fontFamily: fonts.code,
                fontWeight: 600,
                position: "relative",
                boxShadow: `0 0 20px ${accentColor}10`,
                letterSpacing: 0.3,
              }}
            >
              {/* Glow dot top-left */}
              <div
                style={{
                  position: "absolute",
                  top: -3,
                  left: -3,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: accentColor,
                  boxShadow: `0 0 8px ${accentColor}`,
                  opacity: 0.6,
                }}
              />
              {step}
            </div>

            {/* Arrow connector */}
            {i < steps.length - 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 4px",
                  position: "relative",
                  width: 48,
                  height: 2,
                }}
              >
                {/* Line */}
                <div
                  style={{
                    height: 1.5,
                    width: `${arrowProgress * 100}%`,
                    background: `linear-gradient(90deg, ${accentColor}60, ${accentColor})`,
                    borderRadius: 1,
                  }}
                />
                {/* Arrow head */}
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    color: accentColor,
                    fontSize: 18,
                    fontFamily: fonts.code,
                    opacity: arrowProgress,
                  }}
                >
                  ›
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
