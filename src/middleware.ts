import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh-Hans', 'zh-Hant'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\\..*).*)',
  ]
};
