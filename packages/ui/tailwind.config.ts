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

export default config;
