import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Webpack config for when using --webpack flag
  webpack: (config, { webpack }) => {
    // Ignore markdown files and documentation during build
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/docs\/|\.md$/,
      }),
    );

    return config;
  },
  // Turbopack config (Next.js 16 default)
  turbopack: {
    // Files are already excluded via tsconfig.json
    // Turbopack respects TypeScript exclusions
  },
};

export default nextConfig;
