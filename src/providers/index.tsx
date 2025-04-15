"use client";

import { type ReactNode } from "react";
import { QueryProvider } from "./query-provider";

interface GlobalProvidersProps {
  children: ReactNode;
}

export function GlobalProviders({ children }: GlobalProvidersProps) {
  return <QueryProvider>{children}</QueryProvider>;
}
