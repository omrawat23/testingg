/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ]
  },
  images: {
    domains: ['example.com', 'firebasestorage.googleapis.com'], // Add domains here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/path/to/images/**', // Adjust the pattern as needed
      },
      {
        protocol: 'https',
        hostname: 'anotherdomain.com',
        pathname: '/images/**', // Adjust the pattern as needed
      },
    ],
  },
};

export default nextConfig;
