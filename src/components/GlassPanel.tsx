import { glass, accentLine, type ColorVariant } from "../styles/designSystem";

type Props = {
  children: React.ReactNode;
  padding?: string;
  variant?: ColorVariant | "neutral";
  borderColor?: string;
  glow?: string;
  style?: React.CSSProperties;
};

export const GlassPanel: React.FC<Props> = ({
  children,
  padding = "32px 40px",
  variant = "gold",
  borderColor,
  glow,
  style,
}) => {
  const base = variant === "neutral" ? glass.neutral : glass[variant as keyof typeof glass] || glass.gold;
  const overrides: React.CSSProperties = {};

  if (borderColor) overrides.border = `1px solid ${borderColor}`;
  if (glow) overrides.boxShadow = glow;

  return (
    <div
      style={{
        ...base,
        padding,
        ...overrides,
        ...style,
      }}
    >
      {/* Top edge glow — brand signature */}
      <div style={accentLine.topGlow(variant === "teal" ? "teal" : "gold")} />
      {children}
    </div>
  );
};
