export { Opening } from "../../scenes/Opening";
export { Episode1 } from "../../scenes/Episode1";
export { Episode2 } from "../../scenes/Episode2";
export { Episode3 } from "../../scenes/Episode3";
export { Episode4 } from "../../scenes/Episode4";
export { Episode5 } from "../../scenes/Episode5";
export { Closing } from "../../scenes/Closing";

export const ethereumSceneMap = {
  foundation: "Episode1", wallet: "Episode2", transactions: "Episode3", blocks: "Episode4", consensus: "Episode4", "smart-contracts": "Episode5",
} as const;
