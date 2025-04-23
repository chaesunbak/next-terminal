"use client";

import { useQuery } from "@tanstack/react-query";

import { H4, H5, P } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StockWidgetProps {
  id: string;
  symbol: string;
}

export function StockWidget({ symbol }: StockWidgetProps) {
  const {
    data: overviewData,
    isPending: isOverviewPending,
    isError: isOverviewError,
  } = useQuery({
    queryKey: ["stock", "overview", symbol],
    queryFn: async () => {
      const res = await fetch(`/api/stocks/${symbol}/overview`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data;
    },
  });

  const {
    data: quoteData,
    isPending: isQuotePending,
    isError: isQuoteError,
  } = useQuery({
    queryKey: ["stock", "quote", symbol],
    queryFn: async () => {
      const res = await fetch(`/api/stocks/${symbol}/quote`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data["Global Quote"];
    },
    refetchInterval: 60000, // 1분마다 갱신
  });

  if (isOverviewPending || isQuotePending) {
    return (
      <Skeleton className="flex h-full w-full animate-pulse cursor-grab flex-col rounded-lg border bg-slate-100 p-2" />
    );
  }

  if (isOverviewError || isQuoteError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <P className="text-muted-foreground text-sm">
          Error loading stock data
        </P>
      </div>
    );
  }

  const changePercent = quoteData
    ? parseFloat(quoteData["10. change percent"].replace("%", "").trim())
    : 0;
  const isUp = changePercent >= 0;

  return (
    <div className="group z-100 flex h-full w-full cursor-grab flex-col rounded-lg border p-2">
      <div className="mb-1 flex items-center justify-between">
        <div>
          <H4 className="leading-none">{symbol}</H4>
          <P className="text-muted-foreground text-xs">{overviewData?.Name}</P>
        </div>
        <div className="flex flex-col items-end">
          <H5 className="flex items-center">${quoteData?.["05. price"]}</H5>
          <P className={`text-xs ${isUp ? "text-green-500" : "text-red-500"}`}>
            {quoteData?.["09. change"]} ({quoteData?.["10. change percent"]})
          </P>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" asChild>
          <div className="grid h-full w-full grid-cols-2 gap-x-2 gap-y-1 p-2">
            <div className="rounded-md border p-2">
              <P className="text-muted-foreground text-xs">Market Cap</P>
              <P className="text-sm font-medium">
                $
                {(parseFloat(overviewData?.MarketCapitalization) / 1e9).toFixed(
                  2,
                )}
                B
              </P>
            </div>
            <div className="rounded-md border p-2">
              <P className="text-muted-foreground text-xs">P/E Ratio</P>
              <P className="text-sm font-medium">{overviewData?.PERatio}</P>
            </div>
            <div className="rounded-md border p-2">
              <P className="text-muted-foreground text-xs">EPS</P>
              <P className="text-sm font-medium">{overviewData?.EPS}</P>
            </div>
            <div className="rounded-md border p-2">
              <P className="text-muted-foreground text-xs">Dividend Yield</P>
              <P className="text-sm font-medium">
                {(parseFloat(overviewData?.DividendYield) * 100).toFixed(2)}%
              </P>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" asChild>
          <div className="grid h-full w-full grid-cols-2 gap-x-2 gap-y-1 rounded-md border p-2">
            <P className="text-muted-foreground text-xs">52W High</P>
            <P className="text-right text-sm font-medium">
              ${overviewData?.["52WeekHigh"]}
            </P>

            <P className="text-muted-foreground text-xs">52W Low</P>
            <P className="text-right text-sm font-medium">
              ${overviewData?.["52WeekLow"]}
            </P>

            <P className="text-muted-foreground text-xs">Volume</P>
            <P className="text-right text-sm font-medium">
              {(parseInt(quoteData?.["06. volume"]) / 1e6).toFixed(2)}M
            </P>

            <P className="text-muted-foreground text-xs">Sector</P>
            <P className="text-right text-sm font-medium">
              {overviewData?.Sector}
            </P>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
