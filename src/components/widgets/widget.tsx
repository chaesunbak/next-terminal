import { Trash2 } from "lucide-react";
import { type Widget } from "@/store/widget-store";
import { FredWidget } from "./fred-widget";
import { StockWidget } from "./stock-widget";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useWidgetStore } from "@/store/widget-store";

const WidgetComponents = {
  fred: ({ id, title, dataKey }: any) => (
    <FredWidget id={id} title={title} dataKey={dataKey} />
  ),
  stock: ({ id, symbol }: any) => <StockWidget id={id} symbol={symbol} />,
};

export function Widget({ widget }: { widget: Widget }) {
  const { removeWidget } = useWidgetStore();

  const WidgetComponent =
    WidgetComponents[widget.type as keyof typeof WidgetComponents];

  if (!WidgetComponent) return null;

  return (
    <ContextMenu>
      <ContextMenuTrigger className="h-full w-full">
        <WidgetComponent {...widget} />
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem
          variant="destructive"
          onClick={() => removeWidget(widget.id)}
        >
          Delete Widget
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
