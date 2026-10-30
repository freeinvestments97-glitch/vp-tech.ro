import type { NextConfig } from "next";
import { CLIENT_PORTAL_URL, ONBOARDING_URL } from "./src/lib/links";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder. Without it, Next infers the root
  // from the nearest lockfile and, if one exists in a parent directory, the
  // dev server watches/indexes that entire tree (runaway memory usage).
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  // Old in-site pages now handled by the app (keeps bookmarks working).
  async redirects() {
    return [
      { source: "/get-started", destination: ONBOARDING_URL, permanent: false },
      { source: "/clients/login", destination: CLIENT_PORTAL_URL, permanent: false },
    ];
  },
};

export default nextConfig;
