"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { memo } from "react";
import { type UseChatHelpers } from "@ai-sdk/react";
import { type Tool } from "@/store/tool-store";
import { cn } from "@/lib/utils";
import { useToolStore } from "@/store/tool-store";
import { useTranslations } from "next-intl";

interface SuggestedActionsProps {
  append: UseChatHelpers["append"];
  className?: string;
}

interface SuggestedAction {
  titleKey: string;
  labelKey: string;
  tools: Tool[];
  actionKey: string;
}

function PureSuggestedActions({ append, className }: SuggestedActionsProps) {
  const { setSelectedTools } = useToolStore();
  const t = useTranslations("SuggestedActions");

  const suggestedActions: SuggestedAction[] = [
    {
      titleKey: "yieldCurve.title",
      labelKey: "yieldCurve.label",
      tools: ["fred"],
      actionKey: "yieldCurve.action",
    },
    {
      titleKey: "inflation.title",
      labelKey: "inflation.label",
      tools: ["fred"],
      actionKey: "inflation.action",
    },
    {
      titleKey: "stocks.title",
      labelKey: "stocks.label",
      tools: ["alphavantage"],
      actionKey: "stocks.action",
    },
    {
      titleKey: "economic.title",
      labelKey: "economic.label",
      tools: ["fred"],
      actionKey: "economic.action",
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
          key={`suggested-action-${suggestedAction.titleKey}-${index}`}
          className={index > 1 ? "hidden sm:block" : "block"}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              setSelectedTools(suggestedAction.tools);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              append({
                role: "user",
                content: t(suggestedAction.actionKey),
              });
            }}
            className="h-auto w-full flex-1 items-start justify-start gap-1 overflow-hidden rounded-xl border px-3 py-3 text-left text-sm sm:flex-col"
          >
            <span className="truncate font-medium">
              {t(suggestedAction.titleKey)}
            </span>
            <span className="text-muted-foreground truncate">
              {t(suggestedAction.labelKey)}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
