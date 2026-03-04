import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/playwright",
  timeout: 30000,
  use: {
    headless: true,
  },
  webServer: {
    command: "npx vite dev --config vite.config.test-serialize.js",
    port: 5199,
    reuseExistingServer: true,
  },
});
