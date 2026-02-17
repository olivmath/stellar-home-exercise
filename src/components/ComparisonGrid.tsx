import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../styles/theme";
import { slideIn, fadeIn } from "../animations/springs";
import { GlassPanel } from "./GlassPanel";
import { text, variants, radius, space, type ColorVariant } from "../styles/designSystem";

type Column = {
  title: string;
  variant: ColorVariant;
  items: string[];
};

type Props = {
  left: Column;
  right: Column;
  delay?: number;
};

const ColumnPanel: React.FC<{ column: Column; delay: number; side: "left" | "right" }> = ({
  column,
  delay,
  side,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideIn(frame, fps, delay);
  const v = variants[column.variant];

  return (
    <GlassPanel
      variant={column.variant}
      padding={`${space.xxl - 8}px ${space.xxl - 4}px`}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: "column",
        gap: space.lg,
        flex: 1,
        maxWidth: 420,
      }}
    >
      {/* Column title */}
      <div
        style={{
          ...text.overlineMD,
          fontSize: 24,
          color: v.color,
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
              ...text.bodyMD,
              fontSize: 20,
              opacity: itemOpacity,
              padding: `${space.md - 2}px ${space.lg - 4}px`,
              background: "rgba(255, 255, 255, 0.025)",
              borderRadius: radius.md,
              borderLeft: `3px solid ${v.color}`,
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
        gap: space.xxxl - 4,
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        padding: `0 ${space.edge + 20}px`,
      }}
    >
      <ColumnPanel column={left} delay={delay} side="left" />
      <ColumnPanel column={right} delay={delay + 0.3} side="right" />
    </div>
  );
};
