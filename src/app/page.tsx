"use client";

import { useChat } from "@/hooks/use-chat";
import { ChatHeader } from "@/components/chat-header";
import { Messages } from "@/components/messages";
import { MultimodalInput } from "@/components/multimodal-input";
import { generateUUID } from "@/lib/utils";

export default function Page() {
  const id = generateUUID();

  const {
    messages,
    handleSubmit,
    input,
    setInput,
    status,
    stop,
    reload,
    setMessages,
    append,
    isLoading,
  } = useChat({ initialMessages: [] });

  return (
    <div className="bg-background flex h-dvh min-w-0 flex-col">
      <ChatHeader />

      <Messages
        status={status}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
      />

      <form className="bg-background mx-auto flex w-full gap-2 px-4 pb-4 md:max-w-3xl md:pb-6">
        <MultimodalInput
          chatId={id}
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
      </form>
    </div>
  );
}
