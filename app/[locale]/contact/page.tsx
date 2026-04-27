import ContactPageClient from "@/app/components/ContactPageClient";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ContactPageClient locale={locale} />;
}
