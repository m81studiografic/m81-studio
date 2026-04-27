import StartProjectPageClient from "@/app/components/StartProjectPageClient";

export default async function IncepeProiectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <StartProjectPageClient locale={locale} />;
}
