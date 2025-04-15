"use client";

import { AnimatePresence, motion } from "motion/react";
import type { UIMessage } from "ai";
import { UseChatHelpers } from "@ai-sdk/react";
import clsx from "clsx";
import { Check, Clipboard } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Markdown } from "./markdown";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface MessageProps {
  message: UIMessage;
  isLoading: boolean;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
}

export function Message({
  message,
  isLoading,
  // setMessages,
  // reload,
}: MessageProps) {
  const [copiedText, copy, clearCopiedText] = useCopyToClipboard();

  const copyToClipboard = async () => {
    const textToCopy = message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");

    copy(textToCopy);

    setTimeout(() => {
      clearCopiedText();
    }, 2000);
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
            {isLoading && message.role === "assistant" ? (
              <div className="flex h-6 items-center gap-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
              </div>
            ) : (
              message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <Markdown key={`${message.id}-${i}`}>
                        {part.text}
                      </Markdown>
                    );
                  case "source":
                    return <p key={i}>{part.source.url}</p>;
                  case "reasoning":
                    return <div key={i}>{part.reasoning}</div>;
                  case "tool-invocation":
                    return <div key={i}>{part.toolInvocation.toolName}</div>;
                  case "file":
                    return (
                      <Image
                        key={i}
                        src={`data:${part.mimeType};base64,${part.data}`}
                        alt={"image"}
                      />
                    );
                }
              })
            )}
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
              {copiedText ? (
                <Check className="h-4 w-4" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
