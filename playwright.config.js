// @ts-check
const { defineConfig, devices } = require('@playwright/test');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  retries : 1,
  timeout: 30000,

  expect: {
    timeout: 20000,
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    screenshot: 'on',
    permissions: [
      'geolocation',
      'notifications',
      'camera',
      'microphone'
    ],
    trace: 'on'
  },
});