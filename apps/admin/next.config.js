/** @type {import('next').NextConfig} */
const nextConfig = {
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

// biome-ignore lint/style/noDefaultExport: <explanation>
export default nextConfig;
