"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { UIMessage } from "ai";
import { UseChatHelpers } from "@ai-sdk/react";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { LuCheck, LuClipboard } from "react-icons/lu";
import { Markdown } from "./markdown";

interface MessageProps {
  message: UIMessage;
  isLoading: boolean;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
}

export function Message({
  message,
  isLoading,
  setMessages,
  reload,
}: MessageProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    const text = message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");

    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  return (
    <AnimatePresence>
      <motion.div
        className={clsx("group flex w-full", {
          "justify-end": message.role === "user",
          "justify-start": message.role === "assistant",
        })}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex flex-col items-start gap-2">
          <div
            className={clsx(
              "flex flex-col rounded-xl px-4 py-2 whitespace-pre-wrap",
              {
                "bg-primary text-primary-foreground": message.role === "user",
                "text-primary bg-white": message.role === "assistant",
              },
            )}
          >
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <Markdown key={`${message.id}-${i}`}>{part.text}</Markdown>
                  );
              }
            })}
          </div>

          <div
            className={clsx("group flex w-full", {
              "justify-end": message.role === "user",
              "justify-start": message.role === "assistant",
            })}
          >
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 transition-opacity group-hover:opacity-100"
              onClick={copyToClipboard}
            >
              {isCopied ? (
                <LuCheck className="h-4 w-4" />
              ) : (
                <LuClipboard className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
