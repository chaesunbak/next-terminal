import React from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryClientProvider } from "./query-client-provider";

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
