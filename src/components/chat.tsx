"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { Undo2, Trash } from "lucide-react";

import { Message } from "@/components/message";
import { MultimodalInput } from "@/components/multimodal-input";
// import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { Overview } from "@/components/overview";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ChatProps {
  className?: string;
}

export function Chat({ className }: ChatProps) {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
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
        <Button variant="ghost" size="icon" className="p-1">
          <Undo2 className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="icon" className="p-1">
          <Trash className="h-3 w-3" />
        </Button>
      </div>

      <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto px-4 py-3">
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
      </div>
      <MultimodalInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        stop={stop}
        setMessages={setMessages}
        isLoading={isLoading}
        className="mx-2 min-w-md"
        selectedTools={selectedTools}
        setSelectedTools={setSelectedTools}
      />
    </section>
  );
}
