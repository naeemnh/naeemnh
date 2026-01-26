import type { NextConfig } from "next";

const res = process.env.RESUME_URL || process.env.NEXT_PUBLIC_RESUME_URL;
if (res && !res.includes("dropbox.com")) {
  throw new Error(`RESUME_URL must be a Dropbox link when set. Got: ${res}`);
}

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
