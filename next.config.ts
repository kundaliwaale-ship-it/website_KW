import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/services/kundali',
        destination: '/services/kundali/detailed',
        permanent: true,
      },
      {
        source: '/services/consultation',
        destination: '/services/consultation/standard',
        permanent: true,
      },
      {
        source: '/services/vastu',
        destination: '/services/vastu/online',
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
