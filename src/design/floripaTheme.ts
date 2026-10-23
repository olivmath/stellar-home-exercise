import { floripaTokens } from "./tokens";
import type { ThemeContract } from "../framework/types";

export const floripaTheme: ThemeContract = {
  colors: floripaTokens.colors,
  fonts: { display: "Inter, Helvetica, sans-serif", body: "Inter, Helvetica, sans-serif", mono: "IBM Plex Mono, monospace" },
  safeArea: { top: 64, right: 80, bottom: 150, left: 80 },
};
