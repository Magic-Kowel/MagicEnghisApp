import { create } from "zustand";
interface WordItem {
  infinitive: string;
  past: string;
  participle: string;
  translation: string;
  difficulty: string;
}

interface GameState {
  currentLevelWords: WordItem[];
  setCurrentLevelWords: (words: WordItem[]) => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentLevelWords: [],
  setCurrentLevelWords: (words) => set({ currentLevelWords: words }),
}));
