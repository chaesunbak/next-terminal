"use client";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useToolStore } from "@/store/tool-store";
import clsx from "clsx";

interface ToolToggleGroupProps {
  className?: string;
}

export function ToolToggleGroup({ className }: ToolToggleGroupProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <WebSearchButton />
      <FredButton />
    </div>
  );
}

function WebSearchButton({ className }: { className?: string }) {
  const { selectedTools, toggleTool } = useToolStore();

  const isSelected = selectedTools.includes("web-search");
  return (
    <Button
      className={clsx(
        "flex shrink-0 items-center gap-1 rounded-4xl border text-xs transition-colors duration-200",
        className,
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": isSelected,
          "bg-background text-secondary-foreground hover:bg-secondary/90":
            !isSelected,
        },
      )}
      onClick={() => {
        toggleTool("web-search");
      }}
      title="Enable Web Search Tool"
    >
      <Globe size={16} strokeWidth={3} />
      Web Search
    </Button>
  );
}

function FredButton({ className }: { className?: string }) {
  const { selectedTools, toggleTool } = useToolStore();

  const isSelected = selectedTools.includes("fred");
  return (
    <Button
      className={clsx(
        "flex shrink-0 items-center gap-1 rounded-4xl border text-xs transition-colors duration-200",
        className,
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": isSelected,
          "bg-background text-secondary-foreground hover:bg-secondary/90":
            !isSelected,
        },
      )}
      onClick={() => {
        toggleTool("fred");
      }}
      title="Enable FRED Tool"
    >
      FRED
    </Button>
  );
}
