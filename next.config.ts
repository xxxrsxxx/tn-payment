import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/account/charge',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
