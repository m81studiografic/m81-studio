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
    images: [{ url: "/studies/hale-mercer/study-cover.png", width: 1536, height: 2048, alt: "M81 Studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studies — M81",
    description: UI.heroDesc.en,
    images: ["/studies/hale-mercer/study-cover.png"],
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
