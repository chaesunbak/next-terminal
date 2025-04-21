"use client";

import { useRef } from "react";
import { ArrowUp, Square, Search } from "lucide-react";
import { UseChatHelpers } from "@ai-sdk/react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Toggle } from "./ui/toggle";

interface MultimodalInputProps
  extends Pick<
    UseChatHelpers,
    "input" | "setInput" | "handleSubmit" | "isLoading" | "stop" | "setMessages"
  > {
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
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
  selectedTools,
  setSelectedTools,
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
        <ToolButtons
          selectedTools={selectedTools}
          setSelectedTools={setSelectedTools}
        />
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
        e.preventDefault();
        if (isLoading) {
          stop();
        }
      }}
    >
      {isLoading ? (
        <Square size={16} strokeWidth={3} />
      ) : (
        <ArrowUp size={16} strokeWidth={3} />
      )}
    </Button>
  );
}

function ToolButtons({
  selectedTools,
  setSelectedTools,
  className,
}: {
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-2", className)}>
      <WebSearchButton
        selectedTools={selectedTools}
        setSelectedTools={setSelectedTools}
      />
      <FredButton
        selectedTools={selectedTools}
        setSelectedTools={setSelectedTools}
      />
    </div>
  );
}

function WebSearchButton({
  selectedTools,
  setSelectedTools,
  className,
}: {
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
  className?: string;
}) {
  return (
    <Toggle
      className={cn(
        "flex shrink-0 items-center gap-1 rounded-4xl border text-xs",
        className,
      )}
      onClick={() => {
        if (selectedTools.includes("web-search")) {
          setSelectedTools(
            selectedTools.filter((tool) => tool !== "web-search"),
          );
        } else {
          setSelectedTools([...selectedTools, "web-search"]);
        }
      }}
      title="Enable Web Search Tool"
    >
      <Search size={16} strokeWidth={3} />
      Search
    </Toggle>
  );
}

function FredButton({
  selectedTools,
  setSelectedTools,
  className,
}: {
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
  className?: string;
}) {
  return (
    <Toggle
      className={cn(
        "flex shrink-0 items-center gap-1 rounded-4xl border text-xs",
        className,
      )}
      onClick={() => {
        if (selectedTools.includes("fred")) {
          setSelectedTools(selectedTools.filter((tool) => tool !== "fred"));
        } else {
          setSelectedTools([...selectedTools, "fred"]);
        }
      }}
      title="Enable FRED Tool"
    >
      FRED
    </Toggle>
  );
}
