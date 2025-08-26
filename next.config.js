/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [
      {
        module: /node_modules\/@supabase\/realtime-js/,
        message:
          /Critical dependency: the request of a dependency is an expression/,
      },
    ];

    // Add polyfills for crypto libraries required by @nillion/blindfold
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        util: require.resolve("util"),
        process: require.resolve("process/browser"),
      };

      // Add ProvidePlugin to ensure Buffer is available globally
      const webpack = require("webpack");
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        }),
      );
    }

    // Exclude @nillion/blindfold from server-side rendering
    if (isServer) {
      config.externals = [...(config.externals || []), "@nillion/blindfold"];
    }

    return config;
  },
};

module.exports = nextConfig;
