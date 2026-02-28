import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("pino-pretty", "lokijs", "encoding");
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      "@solana/kit": path.join(process.cwd(), "config/shims/solana.js"),
      "@solana-program/system": path.join(
        process.cwd(),
        "config/shims/solana.js",
      ),
      "@solana-program/token": path.join(
        process.cwd(),
        "config/shims/solana.js",
      ),
      "@coinbase/cdp-sdk": false,
      axios: false,
      zod: false,
      pino: path.join(process.cwd(), "config/shims/pino.js"),
    };

    return config;
  },
  transpilePackages: [
    "@reown/appkit-controllers",
  ],
  serverExternalPackages: ["pino", "pino-pretty"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
