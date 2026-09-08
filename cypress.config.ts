import {defineConfig} from 'cypress';

export default defineConfig({
    viewportHeight: 1300,
    viewportWidth: 1800,
    requestTimeout: 10000,
    defaultCommandTimeout: 10000,
    projectId: 'gxst9y',

    retries: {
        runMode: 2
    },

    e2e: {
        baseUrl: 'http://localhost:5173/',
        specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
        testIsolation: false
    },

    component: {
        setupNodeEvents(on, config) {},
        viewportHeight: 500,
        viewportWidth: 700,
        specPattern: 'src/components/**/*.cy.*',
        devServer: {
            framework: 'react',
            bundler: 'vite'
        }
    }
});
