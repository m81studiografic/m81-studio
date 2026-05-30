import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ro', 'en'],
  defaultLocale: 'ro',
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};