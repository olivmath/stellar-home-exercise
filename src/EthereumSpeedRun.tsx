import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { ethereumExplainer } from "./modules/ethereum/content";
import { ETHEREUM_DURATION_SEC, ethereumTimeline } from "./modules/ethereum/timeline";
import { colors } from "./styles/theme";
import { space, text } from "./styles/designSystem";

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

const fade = (frame: number) => interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

const Background: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(135deg, #07111f 0%, #10152c 55%, #261d4c 100%)" }}>
    <div style={{ position: "absolute", width: 620, height: 620, borderRadius: "50%", background: "#8c7bff", opacity: 0.12, filter: "blur(80px)", right: -160, top: -180 }} />
    <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "#61d8ff", opacity: 0.08, filter: "blur(90px)", left: -140, bottom: -180 }} />
  </AbsoluteFill>
);

const Header: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ position: "absolute", top: 64, left: 80, right: 80, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div style={{ ...text.label, color: "#61d8ff", letterSpacing: 3 }}>FLORIPA WEB3 · ETHEREUM</div>
    <div style={{ ...text.label, color: "#a9b8c9", letterSpacing: 2 }}>{label.toUpperCase()}</div>
  </div>
);

const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: fade(frame), padding: 160, justifyContent: "center" }}>
    <Header label="Opening" />
    <div style={{ ...text.codeLG, color: "#61d8ff", marginBottom: space.lg }}>ETHEREUM SPEED RUN</div>
    <div style={{ ...text.displayXL, color: colors.white, maxWidth: 1200 }}>From accounts to smart contracts</div>
    <div style={{ ...text.bodyLG, color: "#a9b8c9", marginTop: space.xl, maxWidth: 900 }}>A programmable settlement network explained end-to-end.</div>
  </AbsoluteFill>;
};

const Topic: React.FC<{ title: string; concept: string; moments: { title: string; description: string }[]; takeaway: string; duration: number }> = ({ title, concept, moments, takeaway, duration }) => {
  const frame = useCurrentFrame();
  const stepDuration = Math.max(1, Math.floor((duration * FPS) / moments.length));
  const activeIndex = Math.min(moments.length - 1, Math.floor(frame / stepDuration));
  const activeMoment = moments[activeIndex];
  const localFrame = frame - activeIndex * stepDuration;
  const isIntro = activeIndex === 0 && localFrame < Math.min(stepDuration, 4 * FPS);
  const isTakeaway = activeIndex === moments.length - 1 && localFrame > stepDuration - 4 * FPS;
  const showMoment = !isIntro && !isTakeaway;
  return <AbsoluteFill style={{ opacity: fade(frame), padding: "150px 120px 120px", background: "#07111f" }}>
    <Header label={title} />
    <div style={{ ...text.displayLG, color: colors.white, marginBottom: space.md }}>{title}</div>
    {isIntro && <div style={{ ...text.bodyLG, color: "#a9b8c9", maxWidth: 1000, marginBottom: 58 }}>{concept}</div>}
    <div style={{ background: "rgba(13, 28, 45, 0.88)", border: "1px solid rgba(97, 216, 255, 0.28)", borderRadius: 18, padding: 44, minHeight: 260, opacity: showMoment ? interpolate(localFrame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0, transform: `translateY(${interpolate(localFrame, [0, 20], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)` }}>
      <div style={{ ...text.codeMD, color: "#8c7bff", marginBottom: space.md }}>{String(activeIndex + 1).padStart(2, "0")} / {String(moments.length).padStart(2, "0")}</div>
      <div style={{ ...text.displayLG, color: colors.white }}>{activeMoment.title}</div>
      <div style={{ ...text.bodyLG, color: "#a9b8c9", marginTop: space.sm }}>{activeMoment.description}</div>
      {title.includes("EVM") && activeIndex === 0 && <div style={{ marginTop: 34, padding: "18px 24px", borderRadius: 14, background: "rgba(5, 10, 20, 0.8)", border: "1px solid rgba(140, 123, 255, 0.45)", color: "#dbe7f5", fontFamily: "IBM Plex Mono, monospace", fontSize: 21 }}>bool value; · flip() → value = !value · get() → value</div>}
    </div>
    <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
      {moments.map((moment, index) => <div key={moment.title} style={{ height: 6, flex: 1, borderRadius: 99, background: index === activeIndex ? "#61d8ff" : "rgba(169, 184, 201, 0.24)" }} />)}
    </div>
    {isTakeaway && <div style={{ position: "absolute", left: 120, right: 120, bottom: 120, borderLeft: "4px solid #61d8ff", paddingLeft: 24 }}>
      <div style={{ ...text.label, color: "#61d8ff", marginBottom: space.sm }}>KEY TAKEAWAY</div>
      <div style={{ ...text.h2, color: colors.white }}>{takeaway}</div>
    </div>}
  </AbsoluteFill>;
};

const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: fade(frame), padding: 160, justifyContent: "center" }}>
    <Header label="Closing" />
    <div style={{ ...text.codeLG, color: "#61d8ff", marginBottom: space.lg }}>THE COMPLETE FLOW</div>
    <div style={{ ...text.displayLG, color: colors.white, maxWidth: 1300 }}>{ethereumExplainer.closing ? "Accounts · Execution · Consensus · Applications" : "Ethereum"}</div>
    <div style={{ ...text.bodyLG, color: "#a9b8c9", marginTop: space.xl }}>Ethereum connects cryptographic accounts, signed transactions, shared state, and smart contracts.</div>
  </AbsoluteFill>;
};

export const EthereumSpeedRun: React.FC = () => (
  <AbsoluteFill style={{ width: WIDTH, height: HEIGHT, fontFamily: "Inter, sans-serif" }}>
    <Audio src={staticFile("audio/narration/ethereum-narration.mp3")} volume={1} />
    <Background />
    <Sequence from={0} durationInFrames={Math.round(ethereumTimeline.foundation.start * FPS + 8 * FPS)}><Opening /></Sequence>
    {ethereumExplainer.topics.map((topic) => <Sequence key={topic.id} from={Math.round(topic.start * FPS)} durationInFrames={Math.round(topic.duration * FPS)}>
      <Topic title={topic.title} concept={topic.coreConcept} moments={topic.visualMoments} takeaway={topic.takeaway} duration={topic.duration} />
    </Sequence>)}
    <Sequence from={Math.round(ethereumExplainer.closing.start * FPS)} durationInFrames={Math.round(ethereumExplainer.closing.duration * FPS)}><Closing /></Sequence>
  </AbsoluteFill>
);

export const ethereumCompositionDurationInFrames = Math.round(ETHEREUM_DURATION_SEC * FPS);
