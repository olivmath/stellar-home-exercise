import type { CSSProperties } from "react";

export type CameraMode = "hidden" | "full" | "panel" | "bubble";
export type SceneKind = "hook" | "context" | "concept" | "demo" | "takeaway" | "bridge" | "closing";

export type SafeArea = { top: number; right: number; bottom: number; left: number };
export type NarrationMark = { id: string; start: number; end?: number; text?: string };
export type Asset = { id: string; src: string; type: "image" | "video" | "audio" | "font"; alt?: string };
export type CameraConfig = {
  mode: CameraMode;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  shape?: "circle" | "rounded";
  border?: "none" | "white" | "blue" | "floripa";
  shadow?: boolean;
  enter?: "fade" | "scale" | "slide";
  exit?: "fade" | "scale" | "slide";
  zIndex?: number;
};
export type AudioTrack = { id: string; src: string; volume?: number; loop?: boolean; fadeIn?: number; fadeOut?: number };
export type ThemeContract = { colors: Record<string, string>; fonts: Record<string, string>; safeArea: SafeArea };
export type SceneContract = { id: string; kind: SceneKind; start: number; duration: number; camera?: CameraConfig; narration?: NarrationMark[] };
export type EpisodeContract = { id: string; title: string; start: number; duration: number; scenes: SceneContract[]; takeaway?: string; bridge?: string };

export type BrandConfig = ThemeContract & { name: string; logo?: Asset };
export type IdentityModel = { name: string; description: string; proof: string };
export type TransactionModel = { name: string; description: string; lifecycle: string[] };
export type StateModel = { name: string; description: string; unit: string };
export type ConsensusModel = { name: string; description: string; finality: string };
export type ProgrammabilityModel = { name: string; description: string; runtime?: string };
export type UseCase = { id: string; title: string; description: string };
export type VisualMoment = { id: string; title: string; description: string };
export type ScriptArtifact = { source: string; narration: string; timing?: Record<string, string> };
export type ExplainerTopic = EpisodeContract & {
  coreConcept: string;
  visualMoments: VisualMoment[];
  takeaway: string;
  bridge: string;
};
export type NarrationMarks = { opening: NarrationMark[]; topics: Record<string, NarrationMark[]>; closing: NarrationMark[] };
export type BlockchainExplainer = {
  brand: BrandConfig;
  mission: string;
  identity: IdentityModel;
  transactionModel: TransactionModel;
  stateModel: StateModel;
  consensusModel: ConsensusModel;
  programmabilityModel?: ProgrammabilityModel;
  useCases: UseCase[];
  script?: ScriptArtifact;
  narration: NarrationMarks;
  opening: SceneContract;
  topics: ExplainerTopic[];
  closing: SceneContract;
};
