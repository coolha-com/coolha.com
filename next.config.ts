import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";


const nextConfig: NextConfig = {
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
