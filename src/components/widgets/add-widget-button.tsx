import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWidgetStore } from "@/store/widget-store";

interface AddWidgetButtonProps {
  title: string;
  dataKey: string;
}

export function AddWidgetButton({ title, dataKey }: AddWidgetButtonProps) {
  const { addWidget } = useWidgetStore();
  return (
    <Button
      onClick={() => {
        const id = Date.now().toString();
        addWidget({
          id: id,
          title: title,
          dataKey: dataKey,
          layout: { i: id, x: 0, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
        });
      }}
      className="w-fit flex-none whitespace-nowrap"
      title={`Add ${title} Widget to Dashboard`}
    >
      <Plus className="mr-2 h-4 w-4" />
      Add Widget To Dashboard
    </Button>
  );
}
