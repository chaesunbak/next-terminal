import { NextResponse } from "next/server";

const API_BASE_URL = "https://www.alphavantage.co/query";

/**
 *
 *
 * @param request
 * @returns
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keywords = searchParams.get("keywords");

    if (!keywords) {
      return NextResponse.json(
        { error: "Keywords parameter is required" },
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

    const params = new URLSearchParams({
      function: "SYMBOL_SEARCH",
      keywords,
      apikey: apiKey,
      datatype: "json",
    });

    const response = await fetch(`${API_BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `API request failed with status ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in tickers API:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock symbols" },
      { status: 500 },
    );
  }
}
