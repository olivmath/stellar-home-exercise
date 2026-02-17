import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../styles/theme";
import { scaleIn } from "../animations/springs";

type Props = {
  label: string;
  delay?: number;
  variant?: "gold" | "teal" | "lilac" | "success" | "warning";
  size?: "sm" | "md" | "lg";
};

const variantMap = {
  gold: {
    color: colors.gold,
    bg: colors.goldDim,
    border: colors.borderGold,
    glow: colors.glowGold,
  },
  teal: {
    color: colors.teal,
    bg: colors.tealDim,
    border: colors.borderTeal,
    glow: colors.glowTeal,
  },
  lilac: {
    color: colors.lilac,
    bg: colors.lilacDim,
    border: colors.borderLilac,
    glow: colors.glowLilac,
  },
  success: {
    color: colors.success,
    bg: `${colors.success}12`,
    border: `${colors.success}20`,
    glow: colors.glowSuccess,
  },
  warning: {
    color: colors.warning,
    bg: `${colors.warning}10`,
    border: `${colors.warning}20`,
    glow: colors.glowWarning,
  },
};

const sizeMap = {
  sm: { fontSize: 14, padding: "8px 18px", borderRadius: 8 },
  md: { fontSize: 17, padding: "12px 24px", borderRadius: 10 },
  lg: { fontSize: 20, padding: "16px 30px", borderRadius: 12 },
};

export const Badge: React.FC<Props> = ({
  label,
  delay = 0,
  variant = "gold",
  size = "md",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, scale } = scaleIn(frame, fps, delay);
  const v = variantMap[variant];
  const s = sizeMap[size];

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: v.bg,
        border: `1px solid ${v.border}`,
        borderRadius: s.borderRadius,
        padding: s.padding,
        color: v.color,
        fontSize: s.fontSize,
        fontFamily: fonts.code,
        fontWeight: 500,
        boxShadow: v.glow,
        letterSpacing: 0.5,
        position: "relative",
      }}
    >
      {label}
    </div>
  );
};
