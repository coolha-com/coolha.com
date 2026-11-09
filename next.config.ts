import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";


const nextConfig: NextConfig = {
  // Locale files are chosen at request/build time. Keep every legal Markdown
  // file in the server trace if a page is not fully static.
  outputFileTracingIncludes: {
    "/[locale]/privacy": ["./content/legal/**/*.md"],
    "/[locale]/terms": ["./content/legal/**/*.md"],
  },
  async redirects() {
    return [
      {
        source: "/:locale(en|zh-Hans|zh-Hant)/ai",
        destination: "/:locale/agent",
        permanent: true,
      },
    ]
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  }
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl(nextConfig);
