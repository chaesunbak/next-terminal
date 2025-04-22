import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tool = "fred" | "alphavantage";

interface ToolState {
  selectedTools: Tool[];
  setSelectedTools: (tools: Tool[]) => void;
  addTool: (tool: Tool) => void;
  removeTool: (tool: Tool) => void;
  toggleTool: (tool: Tool) => void;
  clearTools: () => void;
}

export const useToolStore = create<ToolState>()(
  persist(
    (set) => ({
      selectedTools: [],

      setSelectedTools: (tools: Tool[]) => set({ selectedTools: tools }),

      addTool: (tool: Tool) =>
        set((state) => ({
          selectedTools: state.selectedTools.includes(tool)
            ? state.selectedTools
            : [...state.selectedTools, tool],
        })),

      removeTool: (tool: Tool) =>
        set((state) => ({
          selectedTools: state.selectedTools.filter((t) => t !== tool),
        })),

      toggleTool: (tool: Tool) =>
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
