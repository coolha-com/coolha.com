import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";


const nextConfig: NextConfig = {
  // 允许通过 127.0.0.1 访问 dev 资源（预览面板用该 host，否则 HMR/JS 被拦截导致不 hydrate）
  allowedDevOrigins: ['127.0.0.1'],
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
