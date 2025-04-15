"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { ModelSelector } from "@/components/model-selector";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ChatHeader() {
  const router = useRouter();

  return (
    <header className="bg-background sticky top-0 flex items-center gap-2 px-2 py-1.5 md:px-2">
      <ModelSelector />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="order-2 ml-auto block px-2 md:order-1 md:ml-0 md:hidden md:h-fit md:px-2"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
          >
            <Plus />
            <span className="md:sr-only">New Chat</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>New Chat</TooltipContent>
      </Tooltip>
    </header>
  );
}
