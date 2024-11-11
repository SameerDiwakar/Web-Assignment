import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/admin/dashboard', // The path you will call in your frontend
        destination: 'https://api.socialverseapp.com/admin/dashboard', // External API you want to proxy to
      },
    ];
  },
};

export default nextConfig;
