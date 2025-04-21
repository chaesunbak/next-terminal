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

interface AppNavigationMenuProps {
  className?: string;
}

export function AppNavigationMenu({ className }: AppNavigationMenuProps) {
  return (
    <NavigationMenu className={cn(className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            FRED : Economic Indicators
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <SeriesSearch className="min-w-md" />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
