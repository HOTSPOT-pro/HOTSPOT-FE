/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  transpilePackages: ['@hotspot/ui'],

  turbopack: {
    rules: {
      '*.svg': {
        as: '*.js',
        loaders: ['@svgr/webpack'],
      },
    },
  },
};

export default nextConfig;