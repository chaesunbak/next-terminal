"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  CartesianGrid,
  Brush,
} from "recharts";

import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { H4, H5 } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#D3D3D3",
  },
} satisfies ChartConfig;

interface FredWidgetProps {
  id: string;
  title: string;
  dataKey: string;
}

export function FredWidget({ title, dataKey }: FredWidgetProps) {
  const { data, isPending, error } = useQuery({
    queryKey: ["series", dataKey],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/series/${dataKey}`);
        const fetchedData = await res.json();

        if (fetchedData.error) {
          throw new Error(fetchedData.error);
        }

        console.log("Fetched data:", fetchedData);
        return fetchedData;
      } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
      }
    },
  });

  if (isPending) {
    return (
      <Skeleton className="flex h-full w-full animate-pulse cursor-grab flex-col rounded-lg border bg-slate-100 p-2" />
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full cursor-grab flex-col rounded-lg border p-2">
        <H4 className="absolute top-2 left-2 z-10">{title}</H4>
        <p className="m-auto text-red-500">{(error as Error).message}</p>
      </div>
    );
  }

  if (!data || !data.observations || data.observations.length < 2) {
    return (
      <div className="flex h-full w-full cursor-grab flex-col rounded-lg border p-2">
        <H4 className="absolute top-2 left-2 z-10">{title}</H4>
        <p className="m-auto">Could not find data</p>
      </div>
    );
  }

  const observations = data.observations;
  const lastObservation = observations[observations.length - 1];

  const isUp =
    observations.length >= 2 &&
    observations[observations.length - 1].value >
      observations[observations.length - 2].value;

  return (
    <div className="group z-100 flex h-full w-full cursor-grab flex-col rounded-lg border p-2">
      <H4 className="absolute top-2 left-2 z-10 leading-none">{title}</H4>
      <ChartContainer config={chartConfig} className="flex h-full w-full">
        <LineChart
          data={observations}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#129a74" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="value"
            stroke={isUp ? "#10b981" : "#ef4444"}
            dot={false}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Brush
            dataKey="date"
            height={15}
            stroke="#D3D3D3"
            startIndex={
              observations.length - Math.min(360 * 5, observations.length)
            }
            className="cancel-drag"
          />
        </LineChart>
      </ChartContainer>
      <H5 className="absolute right-2 bottom-2 z-10">
        {lastObservation?.value ?? "N/A"}
      </H5>
    </div>
  );
}
