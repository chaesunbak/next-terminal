import { AppNavigationMenu } from "@/components/app-navigation-menu";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavigationMenu className="flex w-full flex-none p-2" />
      {children}
    </>
  );
}
