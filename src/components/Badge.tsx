import { useCurrentFrame, useVideoConfig } from "remotion";
import { scaleIn } from "../animations/springs";
import { text, variants, radius, shadows, type ColorVariant } from "../styles/designSystem";

type Props = {
  label: string;
  delay?: number;
  variant?: ColorVariant;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { ...text.codeSM, padding: "8px 20px", borderRadius: radius.sm },
  md: { ...text.codeMD, padding: "12px 26px", borderRadius: radius.md },
  lg: { ...text.codeLG, padding: "16px 32px", borderRadius: radius.md },
} as const;

export const Badge: React.FC<Props> = ({
  label,
  delay = 0,
  variant = "gold",
  size = "md",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, scale } = scaleIn(frame, fps, delay);
  const v = variants[variant];
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
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        letterSpacing: s.letterSpacing,
        boxShadow: `${v.glowSoft}, ${shadows.innerLight}`,
        position: "relative",
      }}
    >
      {label}
    </div>
  );
};
