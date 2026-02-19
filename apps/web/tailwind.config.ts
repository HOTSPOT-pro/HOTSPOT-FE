import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {},
};

// biome-ignore lint/style/noDefaultExport: <explanation>
export default config;
