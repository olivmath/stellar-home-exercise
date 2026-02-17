import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn, slideIn, scaleIn } from "../animations/springs";
import { EpisodeTitle } from "../components/EpisodeTitle";
import { FlowDiagram } from "../components/FlowDiagram";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";
import { GlassPanel } from "../components/GlassPanel";

// ── Section: Seed Generation Pipeline ──
const SeedGeneration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.2);
  const annotationOpacity1 = fadeIn(frame, fps, 2.0);
  const annotationOpacity2 = fadeIn(frame, fps, 2.5);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 40,
        padding: "80px 120px",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 400,
          background: `radial-gradient(ellipse, rgba(99, 102, 241, 0.06) 0%, transparent 70%)`,
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          opacity: titleOpacity,
          fontSize: 36,
          fontFamily: fonts.display,
          fontWeight: 700,
          color: colors.textPrimary,
          letterSpacing: 1,
        }}
      >
        Key Derivation Pipeline
      </div>

      <GlassPanel
        padding="48px"
        borderColor={colors.borderAccent}
        glow={colors.glowStellar}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          width: "100%",
          maxWidth: 900,
        }}
      >
        <FlowDiagram
          steps={["Entropy", "Seed", "Secret (S...)", "Public (G...)"]}
          delay={0.5}
          accentColor={colors.stellar}
        />

        {/* Annotation labels in code font */}
        <div
          style={{
            display: "flex",
            gap: 100,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              opacity: annotationOpacity1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: colors.stellarLight,
                boxShadow: `0 0 8px rgba(99, 102, 241, 0.4)`,
              }}
            />
            <div
              style={{
                fontSize: 14,
                fontFamily: fonts.code,
                color: colors.textSecondary,
                letterSpacing: 0.5,
              }}
            >
              256-bit random
            </div>
          </div>

          <div
            style={{
              opacity: annotationOpacity2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: colors.cyan,
                boxShadow: `0 0 8px rgba(34, 211, 238, 0.4)`,
              }}
            />
            <div
              style={{
                fontSize: 14,
                fontFamily: fonts.code,
                color: colors.textSecondary,
                letterSpacing: 0.5,
              }}
            >
              Ed25519 derivation
            </div>
          </div>
        </div>
      </GlassPanel>
    </AbsoluteFill>
  );
};

// ── Section: Signature Flow ──
const SignatureFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.2);
  const dividerOpacity = fadeIn(frame, fps, 2.2);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 44,
        padding: "60px 120px",
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 36,
          fontFamily: fonts.display,
          fontWeight: 700,
          color: colors.textPrimary,
          letterSpacing: 1,
        }}
      >
        Digital Signature Flow
      </div>

      {/* Signing flow */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, fps, 0.5),
            fontSize: 14,
            fontFamily: fonts.code,
            color: colors.warning,
            letterSpacing: 5,
            textTransform: "uppercase",
            textShadow: `0 0 20px rgba(251, 113, 133, 0.3)`,
          }}
        >
          Signing
        </div>
        <FlowDiagram
          steps={["Secret Key", "Sign", "Transaction"]}
          delay={0.8}
          accentColor={colors.warning}
        />
      </div>

      {/* Gradient divider line */}
      <div
        style={{
          width: 640,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${colors.borderCyan}, ${colors.borderAccent}, transparent)`,
          opacity: dividerOpacity,
        }}
      />

      {/* Verification flow */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, fps, 2.5),
            fontSize: 14,
            fontFamily: fonts.code,
            color: colors.success,
            letterSpacing: 5,
            textTransform: "uppercase",
            textShadow: `0 0 20px rgba(52, 211, 153, 0.3)`,
          }}
        >
          Verification
        </div>
        <FlowDiagram
          steps={["Public Key", "Verify", "Network"]}
          delay={2.8}
          accentColor={colors.success}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Section: Curve Comparison ──
const CurveComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.2);
  const vsOpacity = fadeIn(frame, fps, 1.2);
  const leftSlide = slideIn(frame, fps, 0.5);
  const rightSlide = slideIn(frame, fps, 0.9);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 48,
        padding: "60px 120px",
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 36,
          fontFamily: fonts.display,
          fontWeight: 700,
          color: colors.textPrimary,
          letterSpacing: 1,
        }}
      >
        Elliptic Curve Comparison
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 56,
        }}
      >
        {/* Bitcoin side */}
        <div
          style={{
            opacity: leftSlide.opacity,
            transform: `translateY(${leftSlide.translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            padding: "48px 56px",
            borderRadius: 24,
            background: colors.bgGlass,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: `1px solid rgba(251, 113, 133, 0.12)`,
            minWidth: 320,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontFamily: fonts.display,
              fontWeight: 800,
              color: colors.warning,
              textShadow: `0 0 30px rgba(251, 113, 133, 0.25)`,
            }}
          >
            Bitcoin
          </div>
          <Badge label="secp256k1" delay={1.5} variant="warning" />
        </div>

        {/* VS divider */}
        <div
          style={{
            opacity: vsOpacity,
            fontSize: 24,
            fontFamily: fonts.display,
            fontWeight: 800,
            color: colors.textDim,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          vs
        </div>

        {/* Stellar side */}
        <div
          style={{
            opacity: rightSlide.opacity,
            transform: `translateY(${rightSlide.translateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            padding: "48px 56px",
            borderRadius: 24,
            background: colors.bgGlass,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: `1px solid ${colors.borderCyan}`,
            boxShadow: colors.glowCyan,
            minWidth: 320,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontFamily: fonts.display,
              fontWeight: 800,
              color: colors.cyan,
              textShadow: `0 0 30px rgba(34, 211, 238, 0.3)`,
            }}
          >
            Stellar
          </div>
          <Badge label="Ed25519" delay={1.8} variant="cyan" />
        </div>
      </div>

      {/* Advantage badges staggered */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 16,
        }}
      >
        <Badge label="Smaller signatures" delay={3.0} variant="success" />
        <Badge label="Fast verification" delay={3.4} variant="success" />
        <Badge label="Side-channel resistant" delay={3.8} variant="success" />
      </div>
    </AbsoluteFill>
  );
};

// ── Main Episode 2 Composition ──
export const Episode2: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPrimary,
        fontFamily: fonts.body,
      }}
    >
      {/* Episode title card: 0-4s (frames 0-120) */}
      <Sequence from={0} durationInFrames={120}>
        <EpisodeTitle
          number="02"
          title="Wallet: Cryptographic Identity"
        />
      </Sequence>

      {/* Seed generation pipeline: 4-20s (frames 120-600) */}
      <Sequence from={120} durationInFrames={480}>
        <SeedGeneration />
      </Sequence>

      {/* Signature flow: 20-34s (frames 600-1020) */}
      <Sequence from={600} durationInFrames={420}>
        <SignatureFlow />
      </Sequence>

      {/* Curve comparison: 34-50s (frames 1020-1500) */}
      <Sequence from={1020} durationInFrames={480}>
        <CurveComparison />
      </Sequence>

      {/* Persistent lower-third */}
      <Sequence from={120} durationInFrames={1380}>
        <LowerThird
          title="Wallet: Cryptographic Identity"
          subtitle="Episode 02"
          delay={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
