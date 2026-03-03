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

// biome-ignore lint/style/noDefaultExport: <기본 세팅>
export default nextConfig;
