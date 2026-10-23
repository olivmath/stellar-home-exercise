import type { NarrationMarks } from "../../framework/types";
import { ep1Marks, ep2Marks, ep3Marks, ep4Marks, ep5Marks, closingMarks } from "../../config/audioMarks";

const toMarks = (marks: typeof ep1Marks) => marks.map((mark, index) => ({ id: `stellar-${index}-${mark.startSec}`, start: mark.startSec, end: mark.endSec, text: mark.text }));

export const stellarNarration: NarrationMarks = {
  opening: toMarks(ep1Marks.slice(0, 2)),
  topics: {
    foundation: toMarks(ep1Marks), wallet: toMarks(ep2Marks), transactions: toMarks(ep3Marks),
    blocks: toMarks(ep4Marks.slice(0, 2)), consensus: toMarks(ep4Marks.slice(2)), "smart-contracts": toMarks(ep5Marks),
  },
  closing: toMarks(closingMarks),
};
