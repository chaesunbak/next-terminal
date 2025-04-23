"use client";

import { Eraser } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  //   navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SeriesSearch } from "./widgets/series-serach";
import { useWidgetStore } from "@/store/widget-store";
import { Button } from "@/components/ui/button";
import { TickerSearch } from "./widgets/ticker-search";

interface AppNavigationMenuProps {
  className?: string;
}

export function AppNavigationMenu({ className }: AppNavigationMenuProps) {
  const { clearWidgets } = useWidgetStore((state) => state);
  return (
    <NavigationMenu className={cn("flex w-full justify-between", className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="hidden sm:inline">FRED : Economic Indicators</span>
            <span className="sm:hidden">FRED</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <SeriesSearch className="min-w-md" />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="hidden sm:inline">
              Alpha Vantage : Stock Market Data
            </span>
            <span className="sm:hidden">Alpha Vantage</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <TickerSearch className="min-w-md" />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <Button
        onClick={clearWidgets}
        variant="ghost"
        size="icon"
        title="Clear Widgets"
        className="flex-none"
      >
        <Eraser className="h-4 w-4" />
      </Button>
    </NavigationMenu>
  );
}
