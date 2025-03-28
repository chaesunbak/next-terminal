import { memo } from "react";
import equal from "fast-deep-equal";
import { UseChatHelpers } from "@ai-sdk/react";
import type { UIMessage } from "ai";

import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { Overview } from "./overview";
import { Message } from "./message";

interface MessagesProps {
  status: UseChatHelpers["status"];
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
}

function PureMessages({
  status,
  messages,
  setMessages,
  reload,
}: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div
      ref={messagesContainerRef}
      className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll p-2"
    >
      {messages.length === 0 && <Overview />}

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            isLoading={
              (status === "streaming" && messages.length - 1 === index) ||
              (status === "submitted" &&
                messages.length - 1 === index &&
                message.role === "user")
            }
            setMessages={setMessages}
            reload={reload}
          />
        ))}
      </div>

      <div
        ref={messagesEndRef}
        className="min-h-[10rem] min-w-[24px] shrink-0"
      />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.status !== nextProps.status) return false;
  if (prevProps.status && nextProps.status) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;

  return true;
});
