/** @type {import('next').NextConfig} */
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

const pwa = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [
    /middleware-manifest\.json$/,
    /build-manifest\.json$/,
    /react-loadable-manifest\.json$/,
    /\.map$/,
  ],
  publicExcludes: [
    '!noprecache/**/*',
    '!sitemap*',
    '!robots.txt'],
  fallbacks: {
    document: '/assets/offline.html',
  },
  cacheStartUrl: false,
  dynamicStartUrl: false,
  reloadOnOnline: false,
  scope: '/',
  sw: 'sw.js',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 86400,
        },
      },
    },
  ],
};

const cfg = {
  reactStrictMode: true,
  // reactCompiler: true,

  experimental: {
    // turbopackFileSystemCacheForDev: true,
    // turbopackFileSystemCacheForBuild: true,

    // optimizeCss: true, // Error: Cannot find module 'critters'
    cssChunking: 'strict',
  },

  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },

  async rewrites() {
    return {
      afterFiles: [
        // {
        //   source: '/:path*',
        //   destination: '/api/:path*',
        // },
        {
          source: '/admin',
          destination: '/api/admin',
        },
        {
          source: '/hitcounter',
          destination: '/api/proxy/hitcounter',
        },
        {
          source: '/location',
          destination: '/api/location',
        },
        {
          source: '/app-version',
          destination: '/api/app-version',
        },
      ],
    };
  },
  /*
  async headers() {
    return [
      {
        // source: '/api/:path*',
        source: '/api/graphql',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  */

  turbopack: {
    // resolveAlias: {
    //   underscore: 'lodash',
    // },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  webpack: (config, { isServer }) => {
    // webpack: (config) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    // const cacheDir = path.join(process.cwd(), '.next_cache');
    // if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    config.cache = {
      type: 'filesystem',
      // cacheDirectory: cacheDir, // evită foldere protejate
      cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
      compression: 'gzip',
      allowCollectingMemory: true,
    };

    // PDF worker
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      // use: [
      //   {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[contenthash].[ext]',
      //       publicPath: '_next/static/worker',
      //       outputPath: 'static/worker',
      //     },
      //   },
      // ],
      type: 'asset/resource',
      generator: {
        filename: 'static/worker/[hash][ext]',
      },
    });

    config.watchOptions = {
      ignored: [
        '**/Application Data/**',
        '**/Cookies/**',
        '**/AppData/**',
        '**/Local Settings/**',
        '**/Recovery',
        '**/System Volume Information'
      ],
    };

    // PrismaPlugin
    // if (isServer) {
    //   if (process.env === 'production') {
    //     config.plugins.push(new PrismaPlugin());
    //   }
    // } else {
    //   config.resolve.fallback = {
    //     ...config.resolve.fallback,
    //     fs: false,
    //     path: false,
    //   };
    // }

    const Blue = '\x1b[34m';
    const Reset = '\x1b[0m';
    console.log(
      `${Blue}next.config.mjs:\n🔍 Plugins active in webpack build:${Reset}`,
    );
    config.plugins.forEach((p) => {
      console.log(' -', p?.constructor?.name);
    });

    return config;
  },
};

const isAnalyze = process.env.ANALYZE === 'true';
const withPWA = (await import('next-pwa')).default;
const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default;

// const nextConfig = withPWA(pwa)(cfg);
const nextConfig = isAnalyze
  ? withBundleAnalyzer({ enabled: true })(withPWA(pwa)(cfg))
  : withPWA(pwa)(cfg);

export default nextConfig;

// https://stackblitz.com/edit/github-hcetcs
// https://codesandbox.io/s/y4ev2?file=/next.config.js
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-monorepo
