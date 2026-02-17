import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../styles/theme";
import { scaleIn } from "../animations/springs";

type Props = {
  label: string;
  delay?: number;
  variant?: "accent1" | "accent2" | "success" | "warning";
};

const variantColors = {
  accent1: colors.accent1,
  accent2: colors.accent2,
  success: colors.success,
  warning: colors.warning,
};

export const Badge: React.FC<Props> = ({
  label,
  delay = 0,
  variant = "accent1",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, scale } = scaleIn(frame, fps, delay);
  const color = variantColors[variant];

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: `${color}12`,
        border: `1px solid ${color}35`,
        borderRadius: 12,
        padding: "14px 24px",
        color,
        fontSize: 18,
        fontFamily: fonts.code,
        fontWeight: 600,
      }}
    >
      {label}
    </div>
  );
};
