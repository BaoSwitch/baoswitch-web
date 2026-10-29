import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server in .next/standalone so a container image only
  // carries the files the app actually needs (no full node_modules).
  output: "standalone",
  turbopack: {
    // Pin the workspace root; a stray lockfile further up the tree would
    // otherwise be picked up and warned about.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
