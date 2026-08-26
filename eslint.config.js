import eslint from '@eslint/js';
import {defineConfig} from 'eslint/config';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig(
    {
        ignores: ['dist/**', 'coverage/**', 'public/**']
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2026
            },
            parserOptions: {ecmaVersion: 'latest', sourceType: 'module'}
        },
        plugins: {
            'jsx-a11y': jsxA11y,
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            ...jsxA11y.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs['jsx-runtime'].rules, // React >= 17
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', {allowConstantExport: true}], // Vite sin HMR (Hot Module Replacement) tåler eksport av konstanter
            'no-debugger': 'error',
            'no-console': ['error', {allow: ['error']}]
        },
        settings: {
            react: {
                version: 'detect' // eslint-plugin-react trenger å vite dette
            }
        }
    }
);
