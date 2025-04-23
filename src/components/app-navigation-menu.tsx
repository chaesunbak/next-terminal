"use client";

import { Eraser } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SeriesSearch } from "./widgets/series-serach";
import { useWidgetStore } from "@/store/widget-store";
import { Button } from "@/components/ui/button";
import { TickerSearch } from "./widgets/ticker-search";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

interface AppNavigationMenuProps {
  className?: string;
}

export function AppNavigationMenu({ className }: AppNavigationMenuProps) {
  const { clearWidgets } = useWidgetStore((state) => state);
  const t = useTranslations("Nav");

  return (
    <NavigationMenu className={cn("flex w-full justify-between", className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="hidden sm:inline">{t("fred")}</span>
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
            <span className="hidden sm:inline">{t("alphaVantage")}</span>
            <span className="sm:hidden">Alpha Vantage</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <TickerSearch className="min-w-md" />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="flex items-center gap-2">
        <Button
          onClick={clearWidgets}
          variant="ghost"
          size="icon"
          title={t("clearWidgets")}
          className="flex-none"
        >
          <Eraser className="h-4 w-4" />
        </Button>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </NavigationMenu>
  );
}
