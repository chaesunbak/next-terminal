import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ToolState {
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
  addTool: (tool: string) => void;
  removeTool: (tool: string) => void;
  toggleTool: (tool: string) => void;
  clearTools: () => void;
}

export const useToolStore = create<ToolState>()(
  persist(
    (set) => ({
      selectedTools: [],

      setSelectedTools: (tools: string[]) => set({ selectedTools: tools }),

      addTool: (tool: string) =>
        set((state) => ({
          selectedTools: state.selectedTools.includes(tool)
            ? state.selectedTools
            : [...state.selectedTools, tool],
        })),

      removeTool: (tool: string) =>
        set((state) => ({
          selectedTools: state.selectedTools.filter((t) => t !== tool),
        })),

      toggleTool: (tool: string) =>
        set((state) => ({
          selectedTools: state.selectedTools.includes(tool)
            ? state.selectedTools.filter((t) => t !== tool)
            : [...state.selectedTools, tool],
        })),

      clearTools: () => set({ selectedTools: [] }),
    }),
    {
      name: "tool-storage",
    },
  ),
);
