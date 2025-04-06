"use client";

import type { UIMessage } from "ai";
import { useRef } from "react";
import { toast } from "sonner";
import { useWindowSize } from "usehooks-ts";
import { LuArrowUp, LuSquare } from "react-icons/lu";
import { UseChatHelpers } from "@ai-sdk/react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { SuggestedActions } from "./suggested-actions";
import { cn } from "@/lib/utils";

interface MultimodalInputProps {
  chatId: string;
  input: UseChatHelpers["input"];
  setInput: UseChatHelpers["setInput"];
  status: UseChatHelpers["status"];
  stop: () => void;
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers["setMessages"];
  append: UseChatHelpers["append"];
  handleSubmit: UseChatHelpers["handleSubmit"];
  className?: string;
  isLoading: boolean;
}

export function MultimodalInput({
  chatId,
  input,
  setInput,
  status,
  stop,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
  isLoading,
}: MultimodalInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      if (status !== "ready") {
        toast.error("Please wait for the model to finish its response!");
      } else {
        submitForm();
      }
    }
  };

  const submitForm = () => {
    handleSubmit();
    setInput("");

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  };

  return (
    <div className="bg-background fixed bottom-4 left-1/2 mx-auto flex w-full max-w-2xl -translate-x-1/2 flex-col gap-4 rounded-xl border p-4 px-4 pb-4 has-focus:ring-1 has-focus:ring-offset-0 md:max-w-3xl md:pb-6">
      {/* {messages.length === 0 && <SuggestedActions append={append} />} */}
      <form onSubmit={handleSubmit}>
        <Textarea
          data-testid="multimodal-input"
          ref={textareaRef}
          placeholder="무엇이든 물어보세요"
          value={input}
          onChange={handleInput}
          className={cn(
            "scrollbar-none max-h-[300px] min-h-[24px] resize-none overflow-y-scroll border-none !text-base shadow-none focus-visible:ring-0",
            className,
          )}
          rows={2}
          autoFocus
          onKeyDown={handleKeyDown}
        />

        <div className="flex w-full justify-end p-2">
          {status === "submitted" || isLoading ? (
            <StopButton stop={stop} setMessages={setMessages} />
          ) : (
            <SendButton input={input} submitForm={submitForm} />
          )}
        </div>
      </form>
    </div>
  );
}

function StopButton({
  stop,
  setMessages,
}: {
  stop: () => void;
  setMessages: UseChatHelpers["setMessages"];
}) {
  return (
    <Button
      data-testid="stop-button"
      className="h-fit rounded-full border p-1.5 dark:border-zinc-600"
      onClick={(event) => {
        event.preventDefault();
        stop();
        setMessages((messages) => messages);
      }}
    >
      <LuSquare size={14} />
    </Button>
  );
}

function SendButton({
  submitForm,
  input,
}: {
  submitForm: () => void;
  input: string;
}) {
  return (
    <Button
      data-testid="send-button"
      className="h-fit rounded-full border p-1.5 dark:border-zinc-600"
      onClick={(event) => {
        event.preventDefault();
        submitForm();
      }}
      disabled={input.length === 0}
    >
      <LuArrowUp size={14} />
    </Button>
  );
}
