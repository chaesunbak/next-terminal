"use client";

import GridLayout from "react-grid-layout";

import { useWidgetStore } from "@/store/widget-store";
import { cn } from "@/lib/utils";
import { Widget } from "./widget";
import "./react-grid-layout.css";
import "./react-resizable.css";

interface WidgetGridProps {
  className?: string;
}

export function WidgetGrid({ className }: WidgetGridProps) {
  const { widgets, updateLayout } = useWidgetStore((state) => state);

  return (
    <GridLayout
      className={cn("layout", className)}
      layout={widgets.map((widget) => widget.layout)}
      onLayoutChange={(layout) => {
        updateLayout(layout);
      }}
      cols={12}
      rowHeight={60}
      width={1200}
      autoSize={false}
      margin={[20, 10]}
      preventCollision={true}
      compactType={null}
      draggableCancel=".cancel-drag"
    >
      {widgets.map((widget) => (
        <div key={widget.id} className="bg-card flex h-full w-full">
          <Widget
            id={widget.id}
            title={widget.title}
            dataKey={widget.dataKey}
          />
        </div>
      ))}
    </GridLayout>
  );
}
