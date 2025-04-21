"use client";

import { useRef } from "react";
import { ArrowUp, Square } from "lucide-react";
import { UseChatHelpers } from "@ai-sdk/react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { ToolToggleGroup } from "./tool-toggle-group";

interface MultimodalInputProps
  extends Pick<
    UseChatHelpers,
    "input" | "setInput" | "handleSubmit" | "isLoading" | "stop"
  > {
  className?: string;
}

export function MultimodalInput({
  input,
  setInput,
  handleSubmit,
  isLoading,
  stop,

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
        "bg-background mb-4 flex flex-col items-center gap-2 rounded-lg border has-focus:ring-1 has-focus:ring-offset-0",
        className,
      )}
    >
      <Textarea
        data-testid="multimodal-input"
        ref={textareaRef}
        placeholder="Ask me anything"
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className="max-h-[150px] w-full resize-none overflow-y-auto border-none bg-transparent py-2 !text-base shadow-none focus-visible:ring-0"
        rows={1}
        disabled={isLoading}
        autoFocus
      />
      <div className="flex w-full items-end justify-between gap-2 p-2">
        <ToolToggleGroup />
        <SendButton
          input={input}
          isLoading={isLoading}
          stop={stop}
          className=""
        />
      </div>
    </form>
  );
}

export function SendButton({
  stop,
  input,
  isLoading,
  className,
}: {
  input: string;
  isLoading: boolean;
  stop: () => void;
  className?: string;
}) {
  return (
    <Button
      type={isLoading ? "button" : "submit"}
      data-testid={isLoading ? "stop-button" : "send-button"}
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 shrink-0 rounded-lg border", className)}
      disabled={!input.trim()}
      onClick={(e) => {
        if (isLoading) {
          e.preventDefault();
          stop();
        }
      }}
    >
      {isLoading ? (
        <Square size={16} strokeWidth={3} fill="currentColor" />
      ) : (
        <ArrowUp size={16} strokeWidth={3} />
      )}
    </Button>
  );
}
