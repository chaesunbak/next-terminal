import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";
import type { Message } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    const ollama = createOllama({});

    const model = ollama("gemma3:12b");

    if (!model) {
      throw new Error("Model not found");
    }

    const result = streamText({
      model: model,
      messages: messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
