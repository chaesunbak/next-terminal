import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Layout } from "react-grid-layout";

interface BaseWidget {
  id: string;
  title: string;
  layout: Layout;
  type: string;
}

interface FredWidget extends BaseWidget {
  type: "fred";
  dataKey: string;
}

interface StockWidget extends BaseWidget {
  type: "stock";
  symbol: string;
}

export type Widget = FredWidget | StockWidget;

interface WidgetState {
  widgets: Widget[];
  addWidget: (widget: Widget) => void;
  removeWidget: (id: string) => void;
  updateLayout: (newLayout: Layout[]) => void;
  clearWidgets: () => void;
}

export const useWidgetStore = create<WidgetState>()(
  persist(
    (set, get) => ({
      widgets: [],

      addWidget: (widget) =>
        set((state) => ({ widgets: [...state.widgets, widget] })),
      removeWidget: (id: string) =>
        set((state) => ({
          widgets: state.widgets.filter((widget) => widget.id !== id),
        })),
      updateLayout: (newLayout: Layout[]) =>
        set((state) => ({
          widgets: state.widgets.map((widget) => ({
            ...widget,
            layout:
              newLayout.find((layout) => layout.i === widget.id) ||
              widget.layout,
          })),
        })),
      clearWidgets: () => set({ widgets: [] }),
    }),
    {
      name: "widget-storage",
    },
  ),
);
