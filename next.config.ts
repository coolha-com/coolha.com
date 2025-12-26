import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    
    config.resolve.alias = {
      ...config.resolve.alias,
      "@solana/kit": false,
      "@solana-program/system": false,
      "@solana-program/token": false,
      "axios": false,
      "pino": false,
    };
    
    return config;
  },
  serverExternalPackages: ["pino", "pino-pretty"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
