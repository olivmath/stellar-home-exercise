import { panel, divider, type ColorVariant } from "../styles/designSystem";

type Props = {
  children: React.ReactNode;
  padding?: string;
  variant?: ColorVariant;
  borderColor?: string;
  glow?: string;
  style?: React.CSSProperties;
};

export const GlassPanel: React.FC<Props> = ({
  children,
  padding = "32px 40px",
  variant = "accent",
  borderColor,
  glow,
  style,
}) => {
  const base = variant === "accent" ? panel.accent : panel.base;
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
      {/* Top edge divider — brand signature */}
      <div style={divider.subtle()} />
      {children}
    </div>
  );
};
