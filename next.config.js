/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/Enterprise-AI-Copilot',
  assetPrefix: '/Enterprise-AI-Copilot'
};

export default nextConfig;