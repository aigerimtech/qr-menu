import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ru', 'en', 'kk'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};