import { create } from "zustand";

interface ModelState {
  selectedModel?: string;
  setSelectedModel: (model: string) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  selectedModel: undefined,
  setSelectedModel: (model) => set({ selectedModel: model }),
}));
