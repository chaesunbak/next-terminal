import { streamText, type Message, createIdGenerator } from "ai";
import { NextResponse } from "next/server";
import { experimental_createMCPClient as createMCPClient } from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import { createVertex } from "@ai-sdk/google-vertex";
import { type Tool } from "@/store/tool-store";

export async function POST(req: Request) {
  try {
    const {
      messages,
      tools: selectedTools = [],
    }: { messages: Message[]; tools?: Tool[] } = await req.json();

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

    // const searchTool = selectedTools.includes("websearch");

    const model = vertex("gemini-2.5-pro-exp-03-25", {
      // useSearchGrounding: searchTool,
    });

    if (!model) {
      throw new Error("Model not found");
    }

    let activeTools = {};

    const fredTransport = new StdioMCPTransport({
      command: "uv",
      args: [
        "--directory",
        "./src/tools/fred",
        "run",
        "fred_macroeco_server.py",
      ],
    });

    const fredMcpClient = await createMCPClient({
      transport: fredTransport,
    });

    const fredToolSet = await fredMcpClient.tools({
      schemas: "automatic",
    });

    const alphaVantageTransport = new StdioMCPTransport({
      command: "uv",
      args: ["--directory", "./src/tools/alphavantage", "run", "alphavantage"],
    });

    const alphaVantageMcpClient = await createMCPClient({
      transport: alphaVantageTransport,
    });

    const alphaVantageToolSet = await alphaVantageMcpClient.tools({
      schemas: "automatic",
    });

    if (selectedTools.includes("fred")) {
      activeTools = { ...fredToolSet };
    }

    if (selectedTools.includes("alphavantage")) {
      activeTools = { ...alphaVantageToolSet };
    }

    const result = streamText({
      model: model,
      system:
        "You are a helpful assistant that can answer questions and help with tasks about investing. Use the tools provided to answer questions and help with tasks.",
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
        await fredMcpClient.close();
        await alphaVantageMcpClient.close();
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
