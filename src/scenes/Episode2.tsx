import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";
import { colors, fonts } from "../styles/theme";
import { fadeIn, slideIn } from "../animations/springs";
import { FlowDiagram } from "../components/FlowDiagram";
import { Badge } from "../components/Badge";
import { LowerThird } from "../components/LowerThird";

// ── Section: Episode Title ──
const EpisodeTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = fadeIn(frame, fps, 0.3);
  const lineWidth = interpolate(frame, [15, 60], [0, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          opacity,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontFamily: fonts.code,
            color: colors.accent2,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Episode 02
        </div>
        <h2
          style={{
            fontSize: 64,
            fontFamily: fonts.title,
            fontWeight: 800,
            color: colors.textPrimary,
            margin: 0,
          }}
        >
          Wallet: Cryptographic Identity
        </h2>
        <div
          style={{
            height: 3,
            width: lineWidth,
            background: `linear-gradient(90deg, ${colors.accent1}, ${colors.accent2})`,
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Section: Seed Generation Pipeline ──
const SeedGeneration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.2);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 48,
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 36,
          fontFamily: fonts.title,
          fontWeight: 700,
          color: colors.textPrimary,
        }}
      >
        Key Derivation Pipeline
      </div>

      <FlowDiagram
        steps={["Entropy", "Seed", "Secret (S...)", "Public (G...)"]}
        delay={0.5}
        accentColor={colors.accent1}
      />

      {/* Annotation labels below the flow */}
      <div
        style={{
          display: "flex",
          gap: 80,
          marginTop: 24,
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, fps, 2.0),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontFamily: fonts.code,
              color: colors.textSecondary,
            }}
          >
            256-bit random
          </div>
        </div>
        <div
          style={{
            opacity: fadeIn(frame, fps, 2.5),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontFamily: fonts.code,
              color: colors.textSecondary,
            }}
          >
            Ed25519 derivation
          </div>
        </div>
        <div
          style={{
            opacity: fadeIn(frame, fps, 3.0),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontFamily: fonts.code,
              color: colors.warning,
            }}
          >
            Never share
          </div>
        </div>
        <div
          style={{
            opacity: fadeIn(frame, fps, 3.5),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontFamily: fonts.code,
              color: colors.success,
            }}
          >
            Your address
          </div>
        </div>
      </div>

      {/* Example keys */}
      <div
        style={{
          opacity: fadeIn(frame, fps, 4.0),
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 16,
          padding: "20px 32px",
          borderRadius: 12,
          background: `rgba(124, 92, 255, 0.06)`,
          border: `1px solid ${colors.accent1}25`,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              fontSize: 14,
              fontFamily: fonts.code,
              color: colors.warning,
              minWidth: 60,
            }}
          >
            Secret
          </div>
          <div
            style={{
              fontSize: 16,
              fontFamily: fonts.code,
              color: colors.textSecondary,
              letterSpacing: 1,
            }}
          >
            S...XXXXXXXXXXXXXXXXXXXXXXXXXXXX
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              fontSize: 14,
              fontFamily: fonts.code,
              color: colors.success,
              minWidth: 60,
            }}
          >
            Public
          </div>
          <div
            style={{
              fontSize: 16,
              fontFamily: fonts.code,
              color: colors.textSecondary,
              letterSpacing: 1,
            }}
          >
            G...XXXXXXXXXXXXXXXXXXXXXXXXXXXX
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Section: Signature Flow ──
const SignatureFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, fps, 0.2);
  const dividerOpacity = fadeIn(frame, fps, 2.5);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 36,
          fontFamily: fonts.title,
          fontWeight: 700,
          color: colors.textPrimary,
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
            fontSize: 16,
            fontFamily: fonts.code,
            color: colors.warning,
            letterSpacing: 3,
            textTransform: "uppercase",
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

      {/* Divider */}
      <div
        style={{
          width: 600,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${colors.textSecondary}40, transparent)`,
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
            opacity: fadeIn(frame, fps, 2.8),
            fontSize: 16,
            fontFamily: fonts.code,
            color: colors.success,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Verification
        </div>
        <FlowDiagram
          steps={["Public Key", "Verify", "Network Accept"]}
          delay={3.0}
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
  const vsOpacity = fadeIn(frame, fps, 1.5);

  const leftSlide = slideIn(frame, fps, 0.5);
  const rightSlide = slideIn(frame, fps, 1.0);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 48,
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 36,
          fontFamily: fonts.title,
          fontWeight: 700,
          color: colors.textPrimary,
        }}
      >
        Elliptic Curve Comparison
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 60,
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
            gap: 20,
            padding: "40px 48px",
            borderRadius: 20,
            background: `rgba(255, 77, 109, 0.06)`,
            border: `1px solid ${colors.warning}30`,
            minWidth: 300,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontFamily: fonts.title,
              fontWeight: 800,
              color: colors.warning,
            }}
          >
            BTC
          </div>
          <div
            style={{
              fontSize: 18,
              fontFamily: fonts.body,
              color: colors.textSecondary,
            }}
          >
            Bitcoin
          </div>
          <Badge label="secp256k1" delay={1.5} variant="warning" />
          <div
            style={{
              opacity: fadeIn(frame, fps, 3.0),
              fontSize: 14,
              fontFamily: fonts.code,
              color: colors.textSecondary,
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            ECDSA signatures
            <br />
            256-bit keys
          </div>
        </div>

        {/* VS divider */}
        <div
          style={{
            opacity: vsOpacity,
            fontSize: 28,
            fontFamily: fonts.title,
            fontWeight: 800,
            color: colors.textSecondary,
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
            gap: 20,
            padding: "40px 48px",
            borderRadius: 20,
            background: `rgba(0, 212, 255, 0.06)`,
            border: `1px solid ${colors.accent2}30`,
            minWidth: 300,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontFamily: fonts.title,
              fontWeight: 800,
              color: colors.accent2,
            }}
          >
            XLM
          </div>
          <div
            style={{
              fontSize: 18,
              fontFamily: fonts.body,
              color: colors.textSecondary,
            }}
          >
            Stellar
          </div>
          <Badge label="Ed25519" delay={2.0} variant="accent2" />
          <div
            style={{
              opacity: fadeIn(frame, fps, 3.5),
              fontSize: 14,
              fontFamily: fonts.code,
              color: colors.textSecondary,
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            EdDSA signatures
            <br />
            Faster verification
          </div>
        </div>
      </div>

      {/* Advantage callout */}
      <div
        style={{
          opacity: fadeIn(frame, fps, 4.5),
          display: "flex",
          gap: 16,
          marginTop: 8,
        }}
      >
        <Badge label="Smaller keys" delay={4.8} variant="success" />
        <Badge label="Deterministic" delay={5.1} variant="success" />
        <Badge label="Side-channel resistant" delay={5.4} variant="success" />
      </div>
    </AbsoluteFill>
  );
};

// ── Main Episode 2 Composition ──
export const Episode2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgPrimary }}>
      {/* Episode title card: 0-4s (frames 0-120) */}
      <Sequence from={0} durationInFrames={120}>
        <EpisodeTitle />
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

      {/* Persistent lower-third for the episode */}
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
