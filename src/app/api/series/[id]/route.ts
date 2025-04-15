import { NextResponse } from "next/server";

export interface FredObservation {
  realtime_start: string;
  realtime_end: string;
  date: string;
  value: string;
}

export interface FredObservationsResponse {
  realtime_start: string;
  realtime_end: string;
  observation_start: string;
  observation_end: string;
  units: string;
  output_type: number;
  file_type: string;
  order_by: string;
  sort_order: string;
  count: number;
  offset: number;
  limit: number;
  observations: FredObservation[];
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Series ID is required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.FRED_API_KEY;

  if (!apiKey) {
    console.error("API key for FRED is not configured.");
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  try {
    const params = new URLSearchParams({
      series_id: id,
      api_key: apiKey,
      file_type: "json",
    });

    const apiUrl = `https://api.stlouisfed.org/fred/series/observations?${params.toString()}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching FRED series ${id}:`, error);
    return NextResponse.json(
      { error: "Internal server error while fetching FRED data" },
      { status: 500 },
    );
  }
}
