import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { YOUTUBE_SAFE_AREA } from "./timing";
import type { SafeArea as SafeAreaConfig } from "./types";

type Props = { children: ReactNode; safeArea?: SafeAreaConfig; style?: CSSProperties };

export const SafeArea: React.FC<Props> = ({ children, safeArea = YOUTUBE_SAFE_AREA, style }) => (
  <AbsoluteFill style={{ padding: `${safeArea.top}px ${safeArea.right}px ${safeArea.bottom}px ${safeArea.left}px`, boxSizing: "border-box", ...style }}>
    {children}
  </AbsoluteFill>
);
