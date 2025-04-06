"use client";

import { useChat as useAiChat } from "@ai-sdk/react";
import { useRef, useEffect } from "react";
import type { UIMessage } from "ai";
import { toast } from "sonner";

interface UseChatProps {
  initialMessages: UIMessage[];
}

export function useChat({ initialMessages }: UseChatProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    error,
    stop,
    input,
    setInput,
    messages,
    setMessages,
    setData,
    handleInputChange,
    handleSubmit,
    isLoading,
    status,
    reload,
    append,
  } = useAiChat({
    initialMessages,
    onError: (error) => {
      console.error("USE CHAT ERROR", error.message);
      toast.error(error.message);
    },
  });

  const reset = () => {
    stop();
    setData([]);
    setInput("");
    setMessages([]);
  };

  const focusPrompt = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  //scroll to bottom of page when messages are updated
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  //focus on input when loading changes
  useEffect(() => {
    if (isLoading) {
      focusPrompt();
    }
  }, [isLoading]);

  return {
    messages,
    setMessages,
    input,
    handleInputChange,
    isLoading,
    error,
    stop,
    handleSubmit,
    setInput,
    inputRef,
    reset,
    status,
    reload,
    append,
  };
}
