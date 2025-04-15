"use client";

import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { generateId } from "ai";
import { toast } from "sonner";

import { ChatHeader } from "@/components/chat-header";
import { Overview } from "@/components/overview";
import { MultimodalInput } from "@/components/multimodal-input";
import { useChatStore } from "@/store/chat-store";

export default function Page() {
  const router = useRouter();
  const { createChatWithMessage } = useChatStore();

  const { input, setInput, isLoading, stop, setMessages } = useChat({});

  const handleMainPageSubmit = (
    e?: React.FormEvent<HTMLFormElement> | { preventDefault?: () => void }, // 타입 호환성 확보
  ) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    if (!input.trim()) return;

    try {
      const messageId = generateId();

      const chatId = createChatWithMessage({
        id: messageId,
        content: input,
        role: "user",
      });
      setInput("");

      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.error("Failed to create chat with message:", error);
      toast.error("Failed to create chat with message");
    }
  };

  return (
    <div className="bg-background flex h-dvh w-full min-w-0 flex-col">
      <ChatHeader />

      {/* Main content area */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <Overview />
      </div>

      <div className="bg-background sticky bottom-0 w-full pt-2 pb-4">
        <MultimodalInput
          input={input}
          setInput={setInput}
          handleSubmit={handleMainPageSubmit}
          isLoading={isLoading}
          stop={stop}
          setMessages={setMessages}
          className="md:max-w-3xl"
        />
      </div>
    </div>
  );
}
