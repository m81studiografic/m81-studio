import { redirect } from "next/navigation";

/* Blog-ul a fost înlocuit de Jurnal. Păstrăm ruta ca redirect,
   ca eventualele linkuri vechi /blog să nu dea 404. */
export default async function BlogRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/jurnal`);
}
