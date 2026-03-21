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
  webServer: {
    command: 'pnpm dev', // 서버 실행 명령어
    reuseExistingServer: true, // 이미 서버가 켜져있으면 재사용
    timeout: 120 * 1000,
    url: 'https://hotspot.pics:3000',
  },
});
