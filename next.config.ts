import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Next 16: stabilized out of `experimental`.
  typedRoutes: true,
};

export default nextConfig;
