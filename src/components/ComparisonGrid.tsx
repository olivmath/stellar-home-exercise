import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../styles/theme";
import { slideIn, fadeIn } from "../animations/springs";
import { GlassPanel } from "./GlassPanel";

type Column = {
  title: string;
  variant: "warning" | "success" | "gold" | "teal";
  items: string[];
};

type Props = {
  left: Column;
  right: Column;
  delay?: number;
};

const variantColors = {
  warning: { accent: colors.warning, border: `${colors.warning}20`, glow: colors.glowWarning },
  success: { accent: colors.success, border: `${colors.success}20`, glow: colors.glowSuccess },
  gold: { accent: colors.gold, border: colors.borderGold, glow: colors.glowGold },
  teal: { accent: colors.teal, border: colors.borderTeal, glow: colors.glowTeal },
};

const ColumnPanel: React.FC<{ column: Column; delay: number; side: "left" | "right" }> = ({
  column,
  delay,
  side,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, delay);
  const v = variantColors[column.variant];

  return (
    <GlassPanel
      borderColor={v.border}
      glow={v.glow}
      padding="40px 44px"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        flex: 1,
        maxWidth: 420,
      }}
    >
      {/* Column title */}
      <div
        style={{
          fontFamily: fonts.accent,
          fontSize: 24,
          color: v.accent,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        {column.title}
      </div>

      {/* Items */}
      {column.items.map((item, i) => {
        const itemOpacity = fadeIn(frame, fps, delay + 0.4 + i * 0.3);
        return (
          <div
            key={i}
            style={{
              fontFamily: fonts.body,
              fontSize: 20,
              color: colors.textPrimary,
              opacity: itemOpacity,
              padding: "14px 20px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: 10,
              borderLeft: `3px solid ${v.accent}`,
            }}
          >
            {item}
          </div>
        );
      })}
    </GlassPanel>
  );
};

export const ComparisonGrid: React.FC<Props> = ({ left, right, delay = 0 }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 60,
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        padding: "0 120px",
      }}
    >
      <ColumnPanel column={left} delay={delay} side="left" />
      <ColumnPanel column={right} delay={delay + 0.3} side="right" />
    </div>
  );
};
