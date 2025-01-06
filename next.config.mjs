/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/path/to/images/**',
      },
      {
        protocol: 'https',
        hostname: 'anotherdomain.com',
        pathname: '/images/**', 
      },
    ],
  },
};

export default nextConfig;
