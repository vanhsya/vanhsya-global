/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],
    
    // Configure image remote patterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.vanhsya.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.vanhsya.com',
      }
    ],
    
    // Enable image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
    
    // Minimize layout shift
    minimumCacheTTL: 60 * 60 * 24 * 30 // 30 days
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'react-icons', 'lucide-react', 'framer-motion']
  },
  
  // Silence Turbopack warning when custom Webpack is present
  turbopack: {},
  
  // Optimize bundle
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.cache = false;
    }

    // Optimize for production
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Speed up development builds
    if (dev && !isServer) {
      config.watchOptions = {
        ignored: /node_modules/,
        poll: 1000,
      };
    }
    
    return config;
  },
  
  // Enable compression
  compress: true,
  
  // PoweredBy header removal for security
  poweredByHeader: false,

  async rewrites() {
    return [
      { source: '/@vite/client', destination: '/api/vite-client' }
    ];
  }
};

module.exports = nextConfig;
