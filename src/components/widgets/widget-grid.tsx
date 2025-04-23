"use client";

import GridLayout, { WidthProvider } from "react-grid-layout";

import { useWidgetStore } from "@/store/widget-store";
import { cn } from "@/lib/utils";
import { Widget } from "./widget";
import "./react-grid-layout.css";
import "./react-resizable.css";

const ResponsiveGridLayout = WidthProvider(GridLayout);

interface WidgetGridProps {
  className?: string;
}

export function WidgetGrid({ className }: WidgetGridProps) {
  const { widgets, updateLayout } = useWidgetStore((state) => state);

  return (
    <ResponsiveGridLayout
      className={cn("layout", className)}
      layout={widgets.map((widget) => widget.layout)}
      onLayoutChange={(layout) => {
        updateLayout(layout);
      }}
      cols={12}
      rowHeight={60}
      autoSize={true}
      margin={[10, 10]}
      width={1200}
      preventCollision={true}
      compactType={null}
      draggableCancel=".cancel-drag"
    >
      {widgets.map((widget) => (
        <div key={widget.id} className="bg-card flex h-full w-full">
          <Widget widget={widget} />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
