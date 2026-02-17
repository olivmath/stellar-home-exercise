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
  borderColor = colors.borderGold,
  glow,
  style,
}) => (
  <div
    style={{
      background: colors.bgGlass,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: `1px solid ${borderColor}`,
      borderRadius: 16,
      padding,
      boxShadow: glow || `inset 0 1px 0 rgba(253, 218, 36, 0.04)`,
      position: "relative",
      overflow: "hidden",
      ...style,
    }}
  >
    {/* Subtle top gold line — brand element */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "15%",
        right: "15%",
        height: 1,
        background: `linear-gradient(90deg, transparent, ${colors.gold}30, transparent)`,
      }}
    />
    {children}
  </div>
);
