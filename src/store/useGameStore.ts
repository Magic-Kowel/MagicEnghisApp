import { IrregularItem, WordItem } from "@/types/listTypes";
import { create } from "zustand";
interface GameState {
  irregularVerbs: IrregularItem[];
  setIrregularVerbs: (words: IrregularItem[]) => void;
  score: number;
  setScore: (score: number) => void;
  phrasalVerbs: WordItem[];
  setPhrasalVerb: (words: WordItem[]) => void;
}

export const useGameStore = create<GameState>((set) => ({
  irregularVerbs: [],
  setIrregularVerbs: (words) => set({ irregularVerbs: words }),
  score: 0,
  setScore: (score) => set({ score: score }),
  phrasalVerbs: [],
  setPhrasalVerb: (words) => set({ phrasalVerbs: words }),
}));
