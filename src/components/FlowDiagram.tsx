import { useCurrentFrame, useVideoConfig } from "remotion";
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
  accentColor = colors.accent1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {steps.map((step, i) => {
        const stepDelay = delay + i * 0.3;
        const opacity = fadeIn(frame, fps, stepDelay);

        return (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", opacity }}
          >
            <div
              style={{
                background: `${accentColor}15`,
                border: `1px solid ${accentColor}40`,
                borderRadius: 12,
                padding: "16px 24px",
                color: colors.textPrimary,
                fontSize: 20,
                fontFamily: fonts.code,
                fontWeight: 600,
              }}
            >
              {step}
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  color: accentColor,
                  fontSize: 28,
                  margin: "0 8px",
                  fontFamily: fonts.code,
                }}
              >
                →
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
