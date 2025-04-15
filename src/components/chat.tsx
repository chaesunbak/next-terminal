"use client";

import { createIdGenerator } from "ai";
import { Message, useChat } from "@ai-sdk/react";

import { ChatHeader } from "@/components/chat-header";
import { Messages } from "@/components/messages";
import { MultimodalInput } from "@/components/multimodal-input";

export function Chat({
  id,
  initialMessages,
}: { id?: string | undefined; initialMessages?: Message[] } = {}) {
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    setMessages,
    stop,
    status,
    reload,
    append,
    isLoading,
    setInput,
  } = useChat({
    id, // use the provided chat ID
    initialMessages, // initial messages if provided
    sendExtraMessageFields: true, // send id and createdAt for each message
    // id format for client-side messages:
    generateId: createIdGenerator({
      prefix: "msgc",
      size: 16,
    }),
  });

  // simplified rendering code, extend as needed:
  return (
    <div className="bg-background flex h-dvh w-full min-w-0 flex-col">
      <ChatHeader />

      <Messages
        status={status}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
      />

      <MultimodalInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        status={status}
        stop={stop}
        messages={messages}
        setMessages={setMessages}
        append={append}
        isLoading={isLoading}
      />
    </div>
  );
}
