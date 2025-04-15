"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { type Message } from "ai";
import { Chat } from "@/components/chat";
import { useChatStore } from "@/store/chat-store";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { loadChat } = useChatStore();
  const [messages, setMessages] = useState<Message[] | null>(null);

  useEffect(() => {
    const chatMessages = loadChat(id);
    setMessages(chatMessages);
  }, [id, loadChat]);

  if (!messages) {
    return null;
  }

  return <Chat id={id} initialMessages={messages} />;
}
