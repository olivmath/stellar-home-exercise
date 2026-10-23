import type { CSSProperties, ReactNode } from "react";
import { colors } from "../styles/theme";
import { floripaTokens } from "../design/tokens";

type Props = { children: ReactNode; scrim?: boolean; style?: CSSProperties; className?: string };

export const ReadablePanel: React.FC<Props> = ({ children, scrim = true, style, className }) => (
  <div className={className} style={{
    position: "relative", background: scrim ? "rgba(8, 9, 11, 0.92)" : colors.bgElevated,
    border: `1px solid ${colors.borderSubtle}`, borderRadius: floripaTokens.radius.md,
    boxShadow: floripaTokens.shadows.md, padding: `${floripaTokens.spacing.lg}px ${floripaTokens.spacing.xl}px`,
    color: colors.white, ...style,
  }}>
    {children}
  </div>
);
