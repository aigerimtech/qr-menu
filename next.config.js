/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ВРЕМЕННО: не падать на ошибках TS при билде
    ignoreBuildErrors: true,
  },
  eslint: {
    // ВРЕМЕННО: не падать на ESLint при билде
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
