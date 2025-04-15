import { NextResponse } from "next/server";

export interface FredSeriesItem {
  id: string;
  realtime_start: string;
  realtime_end: string;
  title: string;
  observation_start: string;
  observation_end: string;
  frequency: string;
  frequency_short: string;
  units: string;
  units_short: string;
  seasonal_adjustment: string;
  seasonal_adjustment_short: string;
  last_updated: string;
  popularity: number;
  group_popularity: number;
  notes?: string;
}

export interface FredSeriesSearchResponse {
  realtime_start: string;
  realtime_end: string;
  order_by: string;
  sort_order: string;
  count: number;
  offset: number;
  limit: number;
  seriess: FredSeriesItem[];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search_text = searchParams.get("search_text");

  if (!search_text) {
    return NextResponse.json(
      { error: "No search text provided" },
      { status: 400 },
    );
  }

  const api_key = process.env.FRED_API_KEY;
  if (!api_key) {
    return NextResponse.json({ error: "No API key provided" }, { status: 500 });
  }
  try {
    const params = new URLSearchParams({
      search_text: search_text,
      api_key: api_key,
      file_type: "json",
      limit: "10",
      sort_order: "desc",
    });

    const response = await fetch(
      `https://api.stlouisfed.org/fred/series/search?${params.toString()}`,
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching FRED series:", error);
    return NextResponse.json(
      { error: "Internal server error while fetching FRED data" },
      { status: 500 },
    );
  }
}
