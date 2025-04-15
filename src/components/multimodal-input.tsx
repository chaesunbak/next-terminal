"use client";

import { useRef } from "react";
import { ArrowUp, Square } from "lucide-react";
import { UseChatHelpers } from "@ai-sdk/react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

interface MultimodalInputProps
  extends Pick<
    UseChatHelpers,
    "input" | "setInput" | "handleSubmit" | "isLoading" | "stop" | "setMessages"
  > {
  className?: string;
}

export function MultimodalInput({
  input,
  setInput,
  handleSubmit,
  isLoading,
  stop,
  setMessages,
  className,
}: MultimodalInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing &&
      !isLoading
    ) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-background mx-auto mb-4 w-full max-w-xl rounded-xl border p-2 has-focus:ring-1 has-focus:ring-offset-0 md:max-w-3xl",
        className,
      )}
    >
      <div className="flex items-end gap-2">
        <Textarea
          data-testid="multimodal-input"
          ref={textareaRef}
          placeholder="Type a message..."
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none border-none bg-transparent py-2 !text-base shadow-none focus-visible:ring-0"
          rows={1}
          disabled={isLoading}
          autoFocus
        />
        {isLoading ? (
          <StopButton stop={stop} setMessages={setMessages} />
        ) : (
          <SendButton input={input} isLoading={isLoading} />
        )}
      </div>
    </form>
  );
}

function StopButton({
  stop,
}: {
  stop: () => void;
  setMessages: UseChatHelpers["setMessages"];
}) {
  return (
    <Button
      type="button"
      data-testid="stop-button"
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0 rounded-full"
      onClick={(event) => {
        event.preventDefault();
        stop();
      }}
    >
      <Square size={16} />
    </Button>
  );
}

export function SendButton({
  input,
  isLoading,
}: {
  input: string;
  isLoading: boolean;
}) {
  return (
    <Button
      type="submit"
      data-testid="send-button"
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0 rounded-full"
      disabled={!input.trim() || isLoading}
    >
      <ArrowUp size={16} />
    </Button>
  );
}
