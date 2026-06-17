import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work",
        destination: "/sound",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
