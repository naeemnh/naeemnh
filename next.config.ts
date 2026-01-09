import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { webpack }) => {
    // Ignore markdown files and documentation during build
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/docs\/|\.md$/,
      }),
    );

    return config;
  },
};

export default nextConfig;
