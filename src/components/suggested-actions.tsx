"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { memo } from "react";
import { type UseChatHelpers } from "@ai-sdk/react";
import { type Tool } from "@/store/tool-store";
import { cn } from "@/lib/utils";
import { useToolStore } from "@/store/tool-store";

interface SuggestedActionsProps {
  append: UseChatHelpers["append"];
  className?: string;
}

interface SuggestedAction {
  title: string;
  label: string;
  tools: Tool[];
  action: string;
}

function PureSuggestedActions({ append, className }: SuggestedActionsProps) {
  const { setSelectedTools } = useToolStore();

  const suggestedActions: SuggestedAction[] = [
    {
      title: "Current Yield Curve",
      label: "Is it inverted?",
      tools: ["fred"],
      action:
        "First, can you help me find the relevant treasury yield indicators in FRED? Then analyze the current yield curve and tell me if it's inverted or not. What does this suggest about the economy?",
    },
    {
      title: "Inflation Trend",
      label: "CPI and core inflation",
      tools: ["fred"],
      action:
        "Can you search for CPI and core inflation indicators in FRED? Then show me the recent inflation trends over the past 12 months. Are inflation rates increasing or decreasing?",
    },
    {
      title: "Stock Performance",
      label: "Top tech companies",
      tools: ["alphavantage"],
      action:
        "Could you look up the stock performance of major tech companies like Apple, Microsoft, and Google using AlphaVantage? Which one has performed the best over the past 3 months?",
    },
    {
      title: "Economic Health Check",
      label: "GDP and unemployment",
      tools: ["fred"],
      action:
        "Please help me find GDP growth rate and unemployment rate indicators in FRED. What do these indicators tell us about the current state of the economy?",
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className={cn(
        "grid w-full max-w-full gap-2 overflow-hidden p-2 sm:grid-cols-2",
        className,
      )}
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? "hidden sm:block" : "block"}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              setSelectedTools(suggestedAction.tools);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              append({
                role: "user",
                content: suggestedAction.action,
              });
            }}
            className="h-auto w-full flex-1 items-start justify-start gap-1 overflow-hidden rounded-xl border px-3 py-3 text-left text-sm sm:flex-col"
          >
            <span className="truncate font-medium">
              {suggestedAction.title}
            </span>
            <span className="text-muted-foreground truncate">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
