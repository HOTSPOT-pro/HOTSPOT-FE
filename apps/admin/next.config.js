/** @type {import('next').NextConfig} */
/** biome-ignore-all lint/style/noDefaultExport: <explanation> */
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
