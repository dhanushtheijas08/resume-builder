import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://pub-8009d90c5e14471c803823e714ffc589.r2.dev/**"),
    ],
  },
};

export default nextConfig;
