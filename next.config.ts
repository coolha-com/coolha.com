import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push(
      "pino-pretty",
      "lokijs",
      "encoding",
      "pino",
      "pino-elasticsearch",
      "sonic-boom",
      "thread-stream",
      "fastbench"
    );
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      pino: false,
      'thread-stream': false,
      tap: false,
      tape: false,
      'why-is-node-running': false,
    }
    return config;
  },
  transpilePackages: ["@lens-protocol"],
  serverExternalPackages: [
    'pino',
    'thread-stream',
    '@walletconnect/universal-provider',
    '@reown/appkit',
    '@reown/appkit-adapter-wagmi'
  ]
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
