/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable x-powered-by header for smaller response
  poweredByHeader: false,

  // Enable React strict mode for better performance
  reactStrictMode: true,

  // Use SWC minification (faster than Terser)
  swcMinify: true,

  images: {
    // Enable image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
    // Optimize image formats
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    serverComponentsExternalPackages: ["pdf-parse-new"],
  },

  // Optimize bundle splitting
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },

  // Generate static pages at build time where possible
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },

  // Compress responses
  compress: true,

  // Configure headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
