/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // 设置为 true 将使用永久重定向 308
      },
    ]
  },
};

module.exports = nextConfig;
