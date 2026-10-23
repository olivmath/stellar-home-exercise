import React from "react";
import { colors, fonts } from "../styles/theme";

type Props = { size?: number; showWordmark?: boolean; light?: boolean };

/** Floripa Web3 lockup: a compact F/W signal plus the wordmark. */
export const FloripaLogo: React.FC<Props> = ({ size = 42, showWordmark = true, light = true }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.32 }}>
    <div style={{
      width: size, height: size, display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: size * 0.1, transform: "skewY(-10deg)",
    }} aria-label="Floripa Web3">
      {[colors.accent, colors.lightBlue, colors.accent, colors.white].map((color, index) => (
        <span key={index} style={{ background: color, borderRadius: size * 0.08 }} />
      ))}
    </div>
    {showWordmark && (
      <span style={{ fontFamily: fonts.display, fontSize: size * 0.42, fontWeight: 700, letterSpacing: -0.8, color: light ? colors.white : colors.black }}>
        FLORIPA <span style={{ color: colors.accent }}>WEB3</span>
      </span>
    )}
  </div>
);
