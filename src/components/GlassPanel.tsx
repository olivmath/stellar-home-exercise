import { colors } from "../styles/theme";

type Props = {
  children: React.ReactNode;
  padding?: string;
  borderColor?: string;
  glow?: string;
  style?: React.CSSProperties;
};

export const GlassPanel: React.FC<Props> = ({
  children,
  padding = "32px 40px",
  borderColor = colors.borderAccent,
  glow,
  style,
}) => (
  <div
    style={{
      background: colors.bgGlass,
      border: `1px solid ${borderColor}`,
      borderRadius: 20,
      padding,
      boxShadow: glow,
      position: "relative",
      overflow: "hidden",
      ...style,
    }}
  >
    {children}
  </div>
);
