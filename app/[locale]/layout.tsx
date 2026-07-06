import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import './globals.css'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'ro'
    ? 'M81 Studio | Agenție de Design Digital & Web Development'
    : 'M81 Studio | Digital Design & Web Development Agency';

  const description = locale === 'ro'
    ? 'Partenerul tău creativ din București. Construim identități vizuale, UI/UX și produse digitale performante.'
    : 'Your creative partner in Bucharest. We build visual identities, UI/UX, and high-performance digital products.';

  return {
    metadataBase: new URL('https://m81studio.ro'),
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'M81 Studio',
      locale: locale,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

const locales = ['ro', 'en'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}