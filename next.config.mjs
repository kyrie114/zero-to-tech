/** @type {import('next').NextConfig} */
const repo = "zero-to-tech";

const nextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}`,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
