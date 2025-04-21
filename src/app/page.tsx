import { WidgetGrid } from "@/components/widgets/widget-grid";
import { ChatBubble } from "@/components/chat-bubble";

export default function Page() {
  return (
    <main className="bg-background flex h-full w-full flex-1 flex-col justify-center p-2">
      <WidgetGrid className="h-full w-full flex-1" />
      <ChatBubble />
    </main>
  );
}
