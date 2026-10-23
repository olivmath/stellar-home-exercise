import React from "react";

export type CompositionEntry = {
  id: string;
  label: string;
  description: string;
  kind: "video" | "scene" | "still";
};

export const floripaWeb3Compositions: CompositionEntry[] = [
  { id: "StellarSpeedRun", label: "Stellar Speed Run", description: "Complete narrated blockchain explainer", kind: "video" },
  { id: "Opening", label: "Opening", description: "Floripa Web3 title sequence", kind: "scene" },
  { id: "Episode1-Foundation", label: "Episode 01 · Foundation", description: "Blockchain foundations preview", kind: "scene" },
  { id: "Episode2-Wallet", label: "Episode 02 · Wallet", description: "Wallet and key ownership preview", kind: "scene" },
  { id: "Episode3-Transactions", label: "Episode 03 · Transactions", description: "Transaction flow preview", kind: "scene" },
  { id: "Episode4-Consensus", label: "Episode 04 · Consensus", description: "Consensus and validators preview", kind: "scene" },
  { id: "Episode5-Soroban", label: "Episode 05 · Soroban", description: "Smart contracts preview", kind: "scene" },
  { id: "Closing", label: "Closing", description: "Floripa Web3 closing sequence", kind: "scene" },
  { id: "Thumbnail", label: "Thumbnail", description: "YouTube thumbnail still", kind: "still" },
];

export const FloripaWeb3Index: React.FC = () => (
  <div style={{ background: "#07111f", color: "#f6f7f8", fontFamily: "Arial, sans-serif", height: "100%", padding: 96 }}>
    <div style={{ color: "#61d8ff", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>Floripa Web3 · production index</div>
    <h1 style={{ fontSize: 64, margin: "24px 0 12px" }}>Choose a composition</h1>
    <p style={{ color: "#a9b8c9", fontSize: 24, margin: "0 0 48px" }}>Every preview and renderable video is listed here with its exact composition ID.</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
      {floripaWeb3Compositions.map((composition) => (
        <div key={composition.id} style={{ border: "1px solid #28445e", borderRadius: 14, padding: 24, background: "#0d1c2d" }}>
          <div style={{ color: "#61d8ff", fontSize: 16, letterSpacing: 2, textTransform: "uppercase" }}>{composition.kind}</div>
          <h2 style={{ fontSize: 25, margin: "12px 0 8px" }}>{composition.label}</h2>
          <div style={{ color: "#a9b8c9", fontSize: 18, minHeight: 48 }}>{composition.description}</div>
          <code style={{ display: "block", marginTop: 20, color: "#fdda24", fontSize: 17 }}>{composition.id}</code>
        </div>
      ))}
    </div>
  </div>
);
