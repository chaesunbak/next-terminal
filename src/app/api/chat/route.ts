import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";
import type { Message } from "ai";
export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const ollama = createOllama({});

  const result = streamText({
    model: ollama("gemma3:12b"),
    messages: messages,
  });

  return result.toDataStreamResponse();
}
