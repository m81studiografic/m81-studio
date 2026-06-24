import type { Metadata } from "next";
import { type Locale, UI } from "./_data/studies";
import StudiesIndex from "./_components/StudiesIndex";

export const metadata: Metadata = {
  title: "Studies — M81",
  description: UI.heroDesc.en,
  openGraph: {
    title: "Studies — M81",
    description: UI.heroDesc.en,
    type: "website",
    images: [{ url: "/studies/filip/concept-01-cover.png", width: 2048, height: 1152, alt: "M81 Studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studies — M81",
    description: UI.heroDesc.en,
    images: ["/studies/filip/concept-01-cover.png"],
  },
};

export default async function StudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <StudiesIndex locale={(locale as Locale) === "en" ? "en" : "ro"} />;
}
