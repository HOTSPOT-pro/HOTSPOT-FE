import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://hotspot.pics:3000',
    ignoreHTTPSErrors: true,
    launchOptions: {
      args: ['--disable-web-security', '--ignore-certificate-errors'],
    },
    storageState: 'auth.json',
    trace: 'on',
  },
});
