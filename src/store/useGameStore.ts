import { create } from "zustand";
interface WordItem {
  infinitive: string;
  past: string;
  participle: string;
  translation: string;
  difficulty: string;
}

interface GameState {
  irregularVerbs: WordItem[];
  setIrregularVerbs: (words: WordItem[]) => void;
  score: number;
  setScore: (score: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  irregularVerbs: [],
  setIrregularVerbs: (words) => set({ irregularVerbs: words }),
  score: 0,
  setScore: (score) => set({ score: score }),
}));
