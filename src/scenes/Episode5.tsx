import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";
import { colors } from "../styles/theme";
import { fadeIn, slideIn } from "../animations/springs";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";
import { ScientistCard } from "../components/ScientistCard";
import { text, space, layout, panel, shadows, radius } from "../styles/designSystem";
import { episodes, toFrame } from "../config/audioMarks";

// ── Timing: relative to ep5 start (212.1s) ──
const EP = episodes.ep5.startSec;
const rel = (sec: number) => toFrame(sec - EP);

// ── Scene 5.1: Soroban Intro (212.1s to 226.36s) — VIDEO+OVERLAY ──
const STACK_START = 218.53 - 212.1; // 6.43s into scene
const GRAYDON_START = 222.53 - 212.1; // 10.43s into scene
const CARDS_EXIT = 226.36 - 212.1; // 14.26s into scene

const SorobanIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity: titleOpacity, translateY: titleY } = slideIn(frame, fps, 0.3);
  const yearOpacity = fadeIn(frame, fps, 0.8);

  const stackLayers = [
    { label: "Soroban", color: colors.gold, delay: STACK_START },
    { label: "WASM VM", color: colors.info, delay: STACK_START + 0.5 },
    { label: "Rust", color: colors.positive, delay: STACK_START + 1.0 },
  ];

  const timeSec = frame / fps;
  const exitProgress = interpolate(
    frame,
    [CARDS_EXIT * fps, (CARDS_EXIT + 0.5) * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const exitOpacity = 1 - exitProgress;

  const graydonOpacity = fadeIn(frame, fps, GRAYDON_START);
  const graydonExitOpacity = timeSec >= CARDS_EXIT ? exitOpacity : 1;

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: space.xl,
          alignItems: "flex-end",
          opacity: exitOpacity,
        }}
      >
        <GlassPanel
          padding="48px 56px"
          borderColor={colors.borderAccent}
          glow={shadows.accent}
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            ...layout.centerColumn,
            gap: space.md,
            width: 420,
          }}
        >
          <div
            style={{
              ...text.displayMD,
              color: colors.gold,
              textShadow: `0 0 40px rgba(201, 168, 76, 0.3)`,
            }}
          >
            Soroban
          </div>
          <div style={{ ...text.h2, color: colors.warmGrey, textAlign: "center" }}>
            Smart Contract Platform
          </div>
          <div
            style={{
              opacity: yearOpacity,
              ...text.displayLG,
              color: colors.gold,
              textShadow: `0 0 40px rgba(201, 168, 76, 0.4), 0 0 80px rgba(201, 168, 76, 0.15)`,
              marginTop: space.sm,
            }}
          >
            2024
          </div>
        </GlassPanel>

        {/* TASK #15: Harmonized stack layer cards — width 420 matching main panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: space.sm, width: 420 }}>
          {stackLayers.map((layer, i) => {
            const layerSlide = slideIn(frame, fps, layer.delay);
            return (
              <div
                key={i}
                style={{
                  ...panel.base,
                  width: "100%",
                  boxSizing: "border-box",
                  padding: `${space.md}px ${space.xl}px`,
                  borderRadius: radius.md,
                  display: "flex",
                  alignItems: "center",
                  gap: space.md,
                  opacity: layerSlide.opacity,
                  transform: `translateY(${layerSlide.translateY}px)`,
                  border: `1px solid ${layer.color}25`,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 28,
                    borderRadius: radius.xs,
                    backgroundColor: layer.color,
                    boxShadow: `0 0 8px ${layer.color}40`,
                  }}
                />
                <span style={{ ...text.codeMD, color: layer.color }}>{layer.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: space.section,
          bottom: space.section + 40,
          opacity: graydonOpacity * graydonExitOpacity,
        }}
      >
        <ScientistCard
          name="Graydon Hoare"
          institution="RUST CREATOR"
          caption="Shaped Soroban's architecture"
          photo="grandon.png"
          delay={0}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 5.2: Gas Model & TTL (226.48s to 243.09s) — VIDEO+OVERLAY ──
const GasModelTTL: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity: gasOpacity, translateY: gasY } = slideIn(frame, fps, 0.3);

  const ttlDelay = 5.62;
  const { opacity: ttlOpacity, translateY: ttlY } = slideIn(frame, fps, ttlDelay);

  // TASK #17: Renew Rent visible from the very start of the TTL section
  const renewDelay = 0;
  // TASK #17: No Rent card appears when bar is nearly empty (~ttlDelay + 3.8s)
  const archiveDelay = ttlDelay + 3.8;
  const renewOpacity = fadeIn(frame, fps, renewDelay);
  const archiveOpacity = fadeIn(frame, fps, archiveDelay);

  const preventDelay = 16.26;
  const preventOpacity = fadeIn(frame, fps, preventDelay);

  const ttlBarProgress = interpolate(
    frame,
    [ttlDelay * fps + 15, (ttlDelay + 4) * fps],
    [1, 0.1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // TASK #17: Bar turns red when nearly empty (progress <= 0.15)
  const barIsRed = ttlBarProgress <= 0.15;

  return (
    <AbsoluteFill style={layout.dimOverlay(0.55)}>
      <div
        style={{
          position: "absolute",
          right: space.section,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: space.xl,
          width: 500,
        }}
      >
        <GlassPanel
          padding="40px 44px"
          borderColor={colors.borderMedium}
          style={{
            opacity: gasOpacity,
            transform: `translateY(${gasY}px)`,
            ...layout.centerColumn,
            gap: space.lg,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold }}>GAS MODEL</div>
          <div style={{ display: "flex", gap: space.lg, justifyContent: "center", width: "100%" }}>
            <div
              style={{
                ...panel.surface,
                padding: `${space.md}px ${space.xl}px`,
                borderRadius: radius.md,
                ...layout.centerColumn,
                gap: space.sm,
              }}
            >
              <span style={{ ...text.codeMD, color: colors.info }}>CPU</span>
              <span style={{ ...text.bodySM, color: colors.warmGrey }}>Compute</span>
            </div>
            <div style={{ ...text.h1, color: colors.warmGrey, alignSelf: "center" }}>+</div>
            <div
              style={{
                ...panel.surface,
                padding: `${space.md}px ${space.xl}px`,
                borderRadius: radius.md,
                ...layout.centerColumn,
                gap: space.sm,
              }}
            >
              <span style={{ ...text.codeMD, color: colors.gold }}>Storage</span>
              <span style={{ ...text.bodySM, color: colors.warmGrey }}>State</span>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel
          padding="40px 44px"
          borderColor={`${colors.gold}20`}
          glow={shadows.accent}
          style={{
            opacity: ttlOpacity,
            transform: `translateY(${ttlY}px)`,
            ...layout.centerColumn,
            gap: space.lg,
          }}
        >
          <div style={{ ...text.overlineSM, color: colors.gold }}>INNOVATION</div>
          <div style={{ ...text.h1, color: colors.gold }}>TTL — Time To Live</div>

          <div
            style={{
              width: "100%",
              height: 8,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: radius.pill,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${ttlBarProgress * 100}%`,
                height: "100%",
                background: barIsRed
                  ? `linear-gradient(90deg, ${colors.negative}, ${colors.negative})`
                  : `linear-gradient(90deg, ${colors.gold}, ${colors.positive})`,
                borderRadius: radius.pill,
                transition: "background 0.3s ease",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: space.md, width: "100%" }}>
            <div
              style={{
                flex: 1,
                ...panel.surface,
                padding: `${space.md}px ${space.md}px`,
                borderRadius: radius.md,
                textAlign: "center",
                opacity: renewOpacity,
                borderLeft: `3px solid ${colors.positive}`,
              }}
            >
              <div style={{ ...text.codeSM, color: colors.positive }}>Renew Rent</div>
              <div style={{ ...text.bodySM, color: colors.warmGrey, marginTop: space.xs }}>Keep Alive</div>
            </div>
            <div
              style={{
                flex: 1,
                ...panel.surface,
                padding: `${space.md}px ${space.md}px`,
                borderRadius: radius.md,
                textAlign: "center",
                opacity: archiveOpacity,
                borderLeft: `3px solid ${colors.negative}`,
              }}
            >
              <div style={{ ...text.codeSM, color: colors.negative }}>No Rent</div>
              <div style={{ ...text.bodySM, color: colors.warmGrey, marginTop: space.xs }}>Archived</div>
            </div>
          </div>

          <div style={{ opacity: preventOpacity }}>
            <Badge label="Prevents indefinite growth" delay={0} variant="positive" size="md" />
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

// ── Main Episode 5 — Soroban + Gas/TTL only ──
export const Episode5: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 5.1: Soroban Intro + Graydon — 212.1s to 226.36s */}
      <Sequence from={rel(212.1)} durationInFrames={rel(226.36) - rel(212.1)}>
        <SorobanIntro />
      </Sequence>

      {/* Scene 5.2: Gas Model & TTL (RIGHT side) — 226.48s to 243.09s */}
      <Sequence from={rel(226.48)} durationInFrames={rel(243.09) - rel(226.48)}>
        <GasModelTTL />
      </Sequence>

      {/* Lower-third across episode — extended to 243.09s */}
      <Sequence from={rel(213.0)} durationInFrames={rel(243.09) - rel(213.0)}>
        <LowerThird title="Soroban & Smart Contracts" subtitle="Episode 05" delay={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
