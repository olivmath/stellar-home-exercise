import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { colors } from "../styles/theme";
import { text, space, radius } from "../styles/designSystem";

const EPISODES = [
  { ep: "EP01", description: "Cryptographic identities" },
  { ep: "EP02", description: "Atomic transactions" },
  { ep: "EP03", description: "Federated consensus" },
  { ep: "EP04", description: "Secure programmability" },
  { ep: "EP05", description: "Efficient state storage" },
  { ep: "EP06", description: "Privacy support" },
];

export const Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gold,
        padding: space.xxl,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top row: logo + title */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: space.xxl,
          flex: 1,
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile("images/logos/logo-large-black.png")}
          style={{ width: 220, objectFit: "contain" }}
        />

        {/* Title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: space.sm,
          }}
        >
          <div
            style={{
              ...text.displayXL,
              color: colors.black,
              lineHeight: 1,
              fontSize: 96,
            }}
          >
            STELLAR
          </div>
          <div
            style={{
              ...text.displayXL,
              color: colors.black,
              lineHeight: 1,
              fontSize: 96,
            }}
          >
            SPEED RUN
          </div>
          {/* Divider */}
          <div
            style={{
              width: 120,
              height: 4,
              backgroundColor: colors.black,
              borderRadius: radius.pill,
              marginTop: space.xs,
              marginBottom: space.xs,
            }}
          />
          <div
            style={{
              ...text.bodyLG,
              color: colors.black,
              fontSize: 28,
              fontWeight: 500,
            }}
          >
            Blockchain in 5 min
          </div>
        </div>
      </div>

      {/* Episode cards grid: 2 rows x 3 cols */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: space.md,
        }}
      >
        {EPISODES.map(({ ep, description }) => (
          <div
            key={ep}
            style={{
              backgroundColor: colors.black,
              borderRadius: radius.lg,
              border: `2px solid ${colors.gold}`,
              padding: `${space.md}px ${space.lg}px`,
              display: "flex",
              flexDirection: "column",
              gap: space.xs,
            }}
          >
            <span
              style={{
                ...text.overlineSM,
                color: colors.gold,
                letterSpacing: 2,
              }}
            >
              {ep}
            </span>
            <span
              style={{
                ...text.bodyMD,
                color: colors.white,
                fontWeight: 500,
              }}
            >
              {description}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
