import { IrregularItem, WordItem } from "@/types/listTypes";
import { create } from "zustand";
interface GameState {
  irregularVerbs: IrregularItem[];
  setIrregularVerbs: (words: IrregularItem[]) => void;
  score: number;
  setScore: (score: number) => void;
  phrasalVerbs: WordItem[];
  setPhrasalVerb: (words: WordItem[]) => void;
  pathBack: string;
  setPathBack: (path: string) => void;

  listTitles: string[];
  setListTitles: (listTitles: string[]) => void;
  listKeys: string[];
  setListKeys: (listKeys: string[]) => void;
}

export const useGameStore = create<GameState>((set) => ({
  irregularVerbs: [],
  setIrregularVerbs: (words) => set({ irregularVerbs: words }),
  score: 0,
  setScore: (score) => set({ score: score }),
  phrasalVerbs: [],
  setPhrasalVerb: (words) => set({ phrasalVerbs: words }),
  pathBack: "",
  setPathBack: (path) => set({ pathBack: path }),
  listTitles: [],
  setListTitles: (listTitles) => set({ listTitles: listTitles }),
  listKeys: [],
  setListKeys: (listKeys) => set({ listKeys: listKeys }),
}));
