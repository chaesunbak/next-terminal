"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWidgetStore } from "@/store/widget-store";
import {
  type FredSeriesSearchResponse,
  type FredSeriesItem,
} from "@/app/api/series/route";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface SeriesSearchProps {
  setOpen: (open: boolean) => void;
}

export function SeriesSearch({ setOpen }: SeriesSearchProps) {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<FredSeriesSearchResponse | null>(null);
  const [recent] = useLocalStorage<FredSeriesItem[]>(
    "recently-used-series",
    [],
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="text"
          value={searchText}
          placeholder="Search for a series"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          onClick={() => {
            if (!searchText) {
              return;
            }
            fetch(`/api/series?search_text=${searchText}`)
              .then((res) => res.json())
              .then((data) => setData(data));
          }}
        >
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
      <div className="flex max-h-[500px] min-h-[500px] flex-col gap-2 overflow-y-auto">
        {recent.map((item) => (
          <Item key={item.id} series={item} setOpen={setOpen} />
        ))}
        {data?.seriess.map((item) => (
          <Item key={item.id} series={item} setOpen={setOpen} />
        ))}
      </div>
    </div>
  );
}

interface ItemProps {
  series: FredSeriesItem;
  setOpen: (open: boolean) => void;
}

function Item({ series, setOpen }: ItemProps) {
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
          layout: { i: id, x: 0, y: 0, w: 4, h: 4 },
        });

        setRecent([...recent, series]);

        setOpen(false);
      }}
      className="cursor-pointer rounded-md border p-2 hover:bg-gray-100"
      title={series?.notes}
    >
      {series.title}
    </div>
  );
}
