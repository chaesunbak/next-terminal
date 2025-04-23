import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AppNavigationMenu } from "@/components/app-navigation-menu";
import { GlobalProvider } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Terminal",
  description: "Economic Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased transition-colors duration-300`}
      >
        <GlobalProvider>
          {children}
          <Toaster richColors />
        </GlobalProvider>
      </body>
    </html>
  );
}
