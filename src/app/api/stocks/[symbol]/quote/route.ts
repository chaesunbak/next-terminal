import { NextResponse } from "next/server";

const API_BASE_URL = "https://www.alphavantage.co/query";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ symbol: string }> },
) {
  try {
    const { symbol } = await params;

    if (!symbol) {
      return NextResponse.json(
        { error: "Stock symbol is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.ALPHAVANTAGE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 500 },
      );
    }

    const queryParams = new URLSearchParams({
      function: "GLOBAL_QUOTE",
      symbol,
      apikey: apiKey,
    });

    const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `API request failed with status ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Check if the response is empty or contains an error message
    if (
      !data ||
      !data["Global Quote"] ||
      Object.keys(data["Global Quote"]).length === 0 ||
      data.Note ||
      data.Information
    ) {
      return NextResponse.json(
        {
          error:
            data.Note ||
            data.Information ||
            "No quote data found for this symbol",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in stock quote API:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock quote data" },
      { status: 500 },
    );
  }
}
