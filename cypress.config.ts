import { defineConfig } from 'cypress'

export default defineConfig({
  viewportHeight: 1300,
  viewportWidth: 1800,
  requestTimeout: 10000,
  defaultCommandTimeout: 10000,
  projectId: 'gxst9y',
  retries: {
    runMode: 2,
  },
  videoUploadOnPasses: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
  component: {
    setupNodeEvents(on, config) {},
    viewportHeight: 500,
    viewportWidth: 700,
    specPattern: 'src/.*/__tests__/.*spec.tsx',
  },
})
