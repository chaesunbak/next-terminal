import { streamText, type Message, createIdGenerator } from "ai";
import { NextResponse } from "next/server";
import { experimental_createMCPClient as createMCPClient } from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import { createVertex } from "@ai-sdk/google-vertex";

export async function POST(req: Request) {
  try {
    const {
      messages,
      tools: selectedTools = [],
    }: { messages: Message[]; tools?: string[] } = await req.json();

    const vertex = createVertex({
      project: "ir-agent",
      location: "us-central1",
      googleAuthOptions: {
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key:
            process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join("\n") ??
            "",
        },
      },
    });

    const searchTool = selectedTools.includes("web-search");

    const model = vertex("gemini-2.5-pro-exp-03-25", {
      useSearchGrounding: searchTool,
    });

    if (!model) {
      throw new Error("Model not found");
    }

    let activeTools = {};

    const transport = new StdioMCPTransport({
      command: "uv",
      args: [
        "--directory",
        "./src/tools/fred",
        "run",
        "fred_macroeco_server.py",
      ],
    });

    const mcpClient = await createMCPClient({
      transport,
    });

    const toolSet = await mcpClient.tools({
      schemas: "automatic",
    });

    if (selectedTools.includes("fred")) {
      activeTools = { ...toolSet };
    }

    const result = streamText({
      model: model,
      messages: messages,
      tools: activeTools,
      maxSteps: 5,
      toolCallStreaming: true,
      onError({ error }) {
        console.error(error);
      },
      // id format for server-side messages:
      experimental_generateMessageId: createIdGenerator({
        prefix: "msgs",
        size: 16,
      }),
      onFinish: async () => {
        await mcpClient.close();
      },
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
      sendReasoning: true,
    });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function errorHandler(error: unknown) {
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
