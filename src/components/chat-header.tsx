"use client";

import { useRouter } from "next/navigation";
import { useWindowSize } from "usehooks-ts";
import { LuPlus } from "react-icons/lu";
import { ModelSelector } from "@/components/model-selector";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ChatHeader() {
  const router = useRouter();
  const { width: windowWidth } = useWindowSize();

  return (
    <header className="bg-background sticky top-0 flex items-center gap-2 px-2 py-1.5 md:px-2">
      <ModelSelector />

      {windowWidth < 768 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 ml-auto px-2 md:order-1 md:ml-0 md:h-fit md:px-2"
              onClick={() => {
                router.push("/");
                router.refresh();
              }}
            >
              <LuPlus />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      )}
    </header>
  );
}
