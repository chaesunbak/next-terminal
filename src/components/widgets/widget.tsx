"use client";

import { useState, useEffect } from "react";
import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  CartesianGrid,
  Brush,
} from "recharts";
import { X } from "lucide-react";

import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { H4, H5 } from "@/components/ui/typography";
import { useWidgetStore } from "@/store/widget-store";
import { Button } from "@/components/ui/button";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#D3D3D3",
  },
} satisfies ChartConfig;

interface WidgetProps {
  id: string;
  title: string;
  dataKey: string;
}

export function Widget({ id, title, dataKey }: WidgetProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { removeWidget } = useWidgetStore((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch(`/api/series/${dataKey}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setData(data);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p- flex h-full w-full animate-pulse cursor-grab flex-col rounded-lg border bg-slate-100"></div>
    );
  }

  if (error) {
    return (
      <div className="p- flex h-full w-full cursor-grab flex-col rounded-lg border">
        <H4 className="absolute top-2 left-2 z-10">{title}</H4>
        <p className="m-auto text-red-500">{error}</p>
      </div>
    );
  }

  const observations = data?.observations;
  const lastObservation =
    observations && observations.length > 0
      ? observations[observations.length - 1]
      : null;

  const isUp =
    data?.observations[data?.observations.length - 1].value >
    data?.observations[data?.observations.length - 2].value;

  return (
    <div className="flex h-full w-full cursor-grab flex-col rounded-lg border p-2">
      <Button
        variant="ghost"
        size="icon"
        className="cancel-drag absolute top-0.5 right-0.5 z-50 p-0.5 hover:bg-gray-100"
        onClick={() => removeWidget(id)}
      >
        <X className="h-2 w-2" />
      </Button>
      <H4 className="absolute top-2 left-2 z-10">{title}</H4>
      <ChartContainer config={chartConfig} className="flex h-full w-full">
        <LineChart
          data={data?.observations}
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
            startIndex={data?.observations.length - 360 * 5}
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
