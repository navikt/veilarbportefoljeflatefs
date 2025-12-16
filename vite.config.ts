/// <reference types="vitest/config" />

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    build: {manifest: 'asset-manifest.json', sourcemap: true},
    test: {globals: true, environment: 'jsdom'}
});
