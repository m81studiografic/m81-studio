import type { Metadata } from "next";
import { type Locale, UI } from "./_data/studies";
import StudiesIndex from "./_components/StudiesIndex";

export const metadata: Metadata = {
  title: "Studies — M81",
  description: UI.heroDesc.en,
};

export default async function StudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <StudiesIndex locale={(locale as Locale) === "en" ? "en" : "ro"} />;
}
