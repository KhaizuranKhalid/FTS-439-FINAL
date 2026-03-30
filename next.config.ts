import type { NextConfig } from "next";

// Configure for GitHub Pages deployments
const isGithubPages = process.env.GITHUB_PAGES === "true";
// Update this to your repository name if different
const repoName = "fsae-powertrain";

const basePathVal = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  // Static export is recommended for GitHub Pages
  output: "export",
  // Ensure public assets (like /logo_*.png) resolve under the repo path
  assetPrefix: basePathVal || undefined,
  basePath: basePathVal || undefined,
  // Disable image optimization for static export
  images: { unoptimized: true },
  // Expose the basePath to the client (for MDX <img> prefixing)
  env: {
    NEXT_PUBLIC_BASE_PATH: basePathVal,
  },
  // External packages for Twoslash support
  serverExternalPackages: ['typescript', 'twoslash'],
};

export default nextConfig;
