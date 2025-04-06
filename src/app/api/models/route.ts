import { NextResponse } from "next/server";

import type { ModelsResponse } from "@/types/models";

export async function GET() {
  try {
    const data = await fetch("http://localhost:11434/api/tags");
    const models = (await data.json()) as ModelsResponse;
    return NextResponse.json(models);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 },
    );
  }
}
