import type { StorybookConfig } from '@storybook/nextjs';

import { dirname } from 'path';

import { fileURLToPath } from 'url';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
  addons: [],
  framework: getAbsolutePath('@storybook/nextjs'),
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  webpackFinal: async (config) => {
    if (!config.module?.rules) return config;
    config.module.rules = config.module.rules.map((rule) => {
      if (
        rule && 
        typeof rule === 'object' && 
        rule.test instanceof RegExp && 
        rule.test.test('.svg')
      ) {
        return { ...rule, exclude: /\.svg$/ };
      }
      return rule;
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
export default config;
