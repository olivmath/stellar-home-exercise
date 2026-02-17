import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../styles/theme";
import { scaleIn } from "../animations/springs";

type Props = {
  label: string;
  delay?: number;
  variant?: "stellar" | "cyan" | "success" | "warning" | "gold";
  size?: "sm" | "md" | "lg";
};

const variantMap = {
  stellar: {
    color: colors.stellar,
    bg: `${colors.stellar}12`,
    border: `${colors.stellar}25`,
    glow: colors.glowStellar,
  },
  cyan: {
    color: colors.cyan,
    bg: colors.cyanDim,
    border: `${colors.cyan}20`,
    glow: colors.glowCyan,
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
  gold: {
    color: colors.gold,
    bg: `${colors.gold}10`,
    border: `${colors.gold}20`,
    glow: `0 0 30px ${colors.gold}25`,
  },
};

const sizeMap = {
  sm: { fontSize: 14, padding: "8px 16px", borderRadius: 8 },
  md: { fontSize: 17, padding: "12px 22px", borderRadius: 12 },
  lg: { fontSize: 20, padding: "16px 28px", borderRadius: 14 },
};

export const Badge: React.FC<Props> = ({
  label,
  delay = 0,
  variant = "stellar",
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
        fontWeight: 600,
        boxShadow: v.glow,
        letterSpacing: 0.3,
        position: "relative",
      }}
    >
      {label}
    </div>
  );
};
