"use client";

import { useState, useRef } from "react";
import { Search, Loader2, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWidgetStore } from "@/store/widget-store";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { H3, Muted } from "@/components/ui/typography";
import { useEventListener } from "@/hooks/use-event-listener";

interface TickerSearchProps {
  className?: string;
}

interface StockSearchResponse {
  bestMatches?: StockItem[];
  error?: string;
}

interface StockItem {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

interface SimplifiedStockItem {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
}

export function TickerSearch({ className }: TickerSearchProps) {
  const t = useTranslations("Ticker");
  const [data, setData] = useState<StockSearchResponse | null>(null);
  const [recent] = useLocalStorage<SimplifiedStockItem[]>(
    "recently-used-tickers",
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const keywords = inputRef.current?.value || "";

    if (!keywords.trim()) {
      return;
    }
    setIsLoading(true);

    fetch(`/api/tickers?keywords=${encodeURIComponent(keywords)}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && document.activeElement === inputRef.current) {
      handleSearch();
    }
  };

  useEventListener("keydown", handleKeyDown);

  const simplifyStockItem = (item: StockItem): SimplifiedStockItem => ({
    symbol: item["1. symbol"],
    name: item["2. name"],
    type: item["3. type"],
    region: item["4. region"],
    currency: item["8. currency"],
  });

  const simplifiedResults = data?.bestMatches
    ? data.bestMatches.map(simplifyStockItem)
    : [];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <H3>{t("title")}</H3>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          defaultValue=""
          ref={inputRef}
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4" />
          {t("search")}
        </Button>
      </div>
      <div className="flex max-h-[500px] min-h-[500px] flex-col gap-2 overflow-y-auto">
        <Muted>{t("recentlyUsed")}</Muted>
        {recent.map((item) => (
          <StockItem key={item.symbol} stock={item} />
        ))}

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="m-auto flex h-full w-full items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}

        {/* 검색 결과 */}
        {!isLoading && simplifiedResults.length > 0 && (
          <div className="flex flex-col gap-2">
            <Muted>{t("searchResults")}</Muted>
            {simplifiedResults.map((item) => (
              <StockItem key={item.symbol} stock={item} />
            ))}
          </div>
        )}

        {/* 검색 결과 없음 */}
        {!isLoading && data?.bestMatches && data.bestMatches.length === 0 && (
          <div className="m-auto flex h-full w-full items-center justify-center">
            <p className="text-muted-foreground">{t("noResults")}</p>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface StockItemProps {
  stock: SimplifiedStockItem;
}

function StockItem({ stock }: StockItemProps) {
  const { addWidget } = useWidgetStore();
  const [recent, setRecent] = useLocalStorage<SimplifiedStockItem[]>(
    "recently-used-tickers",
    [],
  );

  return (
    <div
      onClick={() => {
        const id = Date.now().toString();
        addWidget({
          id,
          title: `${stock.symbol} - ${stock.name}`,
          type: "stock",
          symbol: stock.symbol,
          layout: { i: id, x: 0, y: 0, w: 4, h: 4, minW: 4, minH: 4 },
        });

        const filteredRecent = recent.filter(
          (item) => item.symbol !== stock.symbol,
        );
        setRecent([stock, ...filteredRecent].slice(0, 10));
      }}
      className="flex cursor-pointer items-center justify-between rounded-md border p-2 hover:bg-gray-100"
    >
      <div className="flex flex-col">
        <div className="font-medium">{stock.symbol}</div>
        <div className="text-muted-foreground text-sm">{stock.name}</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-xs">{stock.region}</span>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
