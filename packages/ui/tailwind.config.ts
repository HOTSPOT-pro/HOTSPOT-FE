// packages/ui/tailwind.config.ts
import type { Config } from 'tailwindcss';
import { DESIGN_TOKENS } from './src/styles/tokens';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: DESIGN_TOKENS.colors,
    },
  },
};

// biome-ignore lint/style/noDefaultExport: <explanation>
export default config;
