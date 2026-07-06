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
    ? 'M81 Studio | Branding, strategie și experiență digitală'
    : 'M81 Studio | Branding, strategy & digital experience';

  const description = locale === 'ro'
    ? 'Studio de branding din București. Înțelegem organizațiile și le exprimăm identitatea prin strategie, design și experiență digitală.'
    : 'A branding studio in Bucharest. We understand organizations and express their identity through strategy, design and digital experience.';

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