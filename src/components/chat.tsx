"use client";

import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { Undo2, Trash } from "lucide-react";

import { Message } from "@/components/message";
import { MultimodalInput } from "@/components/multimodal-input";
// import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { Overview } from "@/components/overview";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SuggestedActions } from "@/components/suggested-actions";
import { useToolStore } from "@/store/tool-store";

interface ChatProps {
  className?: string;
}

export function Chat({ className }: ChatProps) {
  const { selectedTools } = useToolStore();
  const {
    input,
    handleSubmit,
    messages,
    setMessages,
    stop,
    // status,
    reload,
    isLoading,
    setInput,
    append,
  } = useChat({
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
    onFinish: (message) => {
      console.log(message);
    },
    onToolCall: (toolCall) => {
      console.log(toolCall);
    },
    body: {
      tools: selectedTools,
    },
  });
  // const [messagesContainerRef, messagesEndRef] =
  //   useScrollToBottom<HTMLDivElement>();
  return (
    <section
      className={cn(
        "bg-background flex flex-1 flex-col rounded-lg border",
        className,
      )}
    >
      <div className="flex justify-end border-b p-1">
        <Button
          variant="ghost"
          size="icon"
          className="p-1"
          onClick={() => {
            if (messages.length < 2 || isLoading) {
              return;
            }

            setMessages(messages.slice(0, -2));
          }}
          disabled={messages.length < 2 || isLoading}
          title="Undo"
        >
          <Undo2 className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="p-1"
          onClick={() => {
            if (messages.length === 0) {
              return;
            }

            setMessages([]);
          }}
          disabled={messages.length === 0 || isLoading}
          title="Clear Messages"
        >
          <Trash className="h-3 w-3" />
        </Button>
      </div>

      <div className="scrollbar-thin w-full flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <Overview className="z-40 flex items-center justify-center" />
        )}
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isLoading={isLoading}
            reload={reload}
          />
        ))}
        {/* <div ref={messagesEndRef} /> */}
        {messages.length === 0 && <SuggestedActions append={append} />}
      </div>

      <MultimodalInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        stop={stop}
        isLoading={isLoading}
        className="mx-2 min-w-sm"
      />
    </section>
  );
}
