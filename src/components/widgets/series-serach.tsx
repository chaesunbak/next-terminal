"use client";

import { useState, useRef } from "react";
import { Search, Loader2, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWidgetStore } from "@/store/widget-store";
import {
  type FredSeriesSearchResponse,
  type FredSeriesItem,
} from "@/app/api/series/route";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { H3, Muted } from "@/components/ui/typography";
import { useEventListener } from "@/hooks/use-event-listener";

interface SeriesSearchProps {
  className?: string;
}

export function SeriesSearch({ className }: SeriesSearchProps) {
  const t = useTranslations("Series");
  const [data, setData] = useState<FredSeriesSearchResponse | null>(null);
  const [recent] = useLocalStorage<FredSeriesItem[]>(
    "recently-used-series",
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const searchText = inputRef.current?.value || "";

    if (!searchText.trim()) {
      return;
    }
    setIsLoading(true);

    fetch(`/api/series?search_text=${searchText}`)
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
          <Item key={item.id} series={item} />
        ))}

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="m-auto flex h-full w-full items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}

        {/* 검색 결과 */}
        {!isLoading && data?.seriess && (
          <div className="flex flex-col gap-2">
            <Muted>{t("searchResults")}</Muted>
            {data.seriess.length > 0 ? (
              data.seriess.map((item) => <Item key={item.id} series={item} />)
            ) : (
              <div className="m-auto flex h-full w-full items-center justify-center">
                <p className="text-muted-foreground">{t("noResults")}</p>
              </div>
            )}
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

interface ItemProps {
  series: FredSeriesItem;
}

function Item({ series }: ItemProps) {
  const { addWidget } = useWidgetStore();
  const [recent, setRecent] = useLocalStorage<FredSeriesItem[]>(
    "recently-used-series",
    [],
  );
  return (
    <div
      onClick={() => {
        const id = Date.now().toString();
        addWidget({
          id,
          title: series.title,
          dataKey: series.id,
          type: "fred",
          layout: { i: id, x: 0, y: 0, w: 4, h: 4, minW: 4, minH: 4 },
        });

        const filteredRecent = recent.filter((item) => item.id !== series.id);

        setRecent([series, ...filteredRecent].slice(0, 10));
      }}
      className="flex cursor-pointer items-center justify-between rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-gray-500"
      title={series?.notes}
    >
      <div>{series.title}</div>
      <Button variant="ghost" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
