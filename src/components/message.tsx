"use client";

import { memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { UIMessage } from "ai";
import { UseChatHelpers } from "@ai-sdk/react";
import clsx from "clsx";
import { Check, Clipboard } from "lucide-react";
import equal from "fast-deep-equal";
// import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Markdown } from "./markdown";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { CodeBlock } from "./code-block";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddWidgetButton } from "./widgets/add-widget-button";
interface MessageProps {
  message: UIMessage;
  isLoading: boolean;
  // setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
}

function PureMessage({
  message,
  isLoading,
  // setMessages,
  reload,
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
        className="group flex w-full max-w-md flex-col items-start justify-start space-y-2"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div
          key={message.id}
          className={clsx(
            "flex flex-col space-y-2 rounded-xl px-4 py-2 whitespace-pre-wrap",
            {
              "bg-primary text-primary-foreground": message.role === "user",
              "text-primary bg-gray-100": message.role === "assistant",
            },
            "max-w-full",
          )}
        >
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return (
                  <Markdown key={`${message.id}-${i}`}>{part.text}</Markdown>
                );
              case "source":
                return <p key={i}>{part.source.url}</p>;
              case "reasoning":
                return <div key={i}>{part.reasoning}</div>;
              case "tool-invocation":
                const toolName = part.toolInvocation.toolName;
                const state = part.toolInvocation.state;

                switch (state) {
                  case "partial-call":
                    return (
                      <pre key={part.toolInvocation.toolCallId}>
                        {JSON.stringify(part.toolInvocation, null, 2)}
                      </pre>
                    );
                  case "call":
                    return (
                      <div key={part.toolInvocation.toolCallId}>
                        {part.toolInvocation.args.message}
                      </div>
                    );
                  case "result":
                    if (part.toolInvocation.result.isError) {
                      return (
                        <div
                          key={part.toolInvocation.toolCallId}
                          className="text-red-400"
                        >
                          {toolName}호출시 에러가 발생했습니다.
                        </div>
                      );
                    }

                    const content = part.toolInvocation.result.content;

                    let children;
                    if (content.length === 1) {
                      children = content[0].text;
                    } else {
                      children = content
                        .map((item: any) => item.text)
                        .join("\n");
                    }

                    if (toolName === "fetch_series_data") {
                      const result = JSON.parse(content[0].text);

                      const series_id = result.series_id;
                      const title = result.description;
                      return (
                        <>
                          <Accordion
                            type="single"
                            collapsible
                            key={part.toolInvocation.toolCallId}
                            asChild
                          >
                            <AccordionItem value="item-1">
                              <AccordionTrigger className="text-muted-foreground flex cursor-pointer py-2 hover:underline">
                                {toolName}의 결과보기
                              </AccordionTrigger>
                              <AccordionContent asChild className="pb-0">
                                <CodeBlock className="language-json">
                                  {children}
                                </CodeBlock>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                          <AddWidgetButton title={title} dataKey={series_id} />
                        </>
                      );
                    }

                    return (
                      <Accordion
                        type="single"
                        collapsible
                        key={part.toolInvocation.toolCallId}
                        asChild
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="text-muted-foreground flex cursor-pointer py-2 hover:underline">
                            {toolName}의 결과보기
                          </AccordionTrigger>
                          <AccordionContent asChild className="pb-0">
                            <CodeBlock className="language-json">
                              {children}
                            </CodeBlock>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                }

              default:
                return null;
            }
          })}
        </div>

        <div className="group flex w-full justify-start">
          <Button
            variant="ghost"
            size="icon"
            className="p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={copyToClipboard}
          >
            {copiedText ? (
              <Check className="h-4 w-4" />
            ) : (
              <Clipboard className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export const Message = memo(PureMessage, (prevProps, nextProps) => {
  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (prevProps.message.id !== nextProps.message.id) return false;
  if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;

  return true;
});
