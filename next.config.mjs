/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
  },
  async rewrites() {
    return [
      {
        source: '/api/virtual-tryon',
        destination: '/api/virtual-tryon', // Handle locally in Next.js
      },
      {
        source: '/api/:path*',
        destination: 'http://host.docker.internal:8080/:path*', // Proxy to Backend
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
        port: '',
        pathname: '/**', // Allow any path under the domain
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default nextConfig;