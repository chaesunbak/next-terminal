"use client";

import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/navigation";
export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={locale === "en"}
          onClick={() => switchLocale("en")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={locale === "ko"}
          onClick={() => switchLocale("ko")}
        >
          한국어
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
