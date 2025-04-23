import { redirect } from "@/i18n/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Redirect to hero page of the current locale
  const { locale } = await params;
  redirect({ href: "/hero", locale });
}
