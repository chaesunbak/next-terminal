// import { createOllama } from "ollama-ai-provider";
import { streamText, type Message, createIdGenerator } from "ai";
import { NextResponse } from "next/server";
import { experimental_createMCPClient as createMCPClient } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    const model = openai("gpt-4o-mini");

    if (!model) {
      throw new Error("Model not found");
    }

    const mcpClient = await createMCPClient({
      transport: {
        type: "sse",
        url: "http://localhost:8000",
      },
    });

    const toolSet = await mcpClient.tools();

    const tools = { ...toolSet };

    const result = streamText({
      model: model,
      messages: messages,
      tools: tools,
      onError({ error }) {
        console.error(error);
      },
      // id format for server-side messages:
      experimental_generateMessageId: createIdGenerator({
        prefix: "msgs",
        size: 16,
      }),
    });

    // consume the stream to ensure it runs to completion & triggers onFinish
    // even when the client response is aborted:
    result.consumeStream(); // no await

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export function errorHandler(error: unknown) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}
