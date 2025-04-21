"use client";

import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import clsx from "clsx";

import { Chat } from "./chat";
import { Button } from "./ui/button";

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 bottom-0 z-50 flex h-full flex-col items-end justify-end gap-2 p-4">
      <Chat
        className={clsx(
          "h-full max-h-[90vh] transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="rounded-full p-4"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
