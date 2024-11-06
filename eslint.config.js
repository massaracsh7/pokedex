import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import * as tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react'; // Import the React plugin

export default [
  {
    ignores: [
      'vite.config.ts',
      'node_modules',
      'dist',
      'package.json',
      'package-lock.json',
      'tsconfig.json',
      'tsconfig.node.json',
      '.prettierrc',
      'prettify.js',
      'typings.d.ts',
      'fileMock.ts',
    ],
  },

  // Use recommended ESLint rules
  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        React: 'readonly', // Allow React to be used without import
      },
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true, // Enable JSX support
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react, // Use the React plugin as an object
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Disable the rule requiring React to be in scope
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
    },
  },

  // React Hooks rules
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  // React Refresh rules
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // Prettier configuration
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error', // Reports formatting issues
    },
  },

  // Disable conflicting rules for Prettier
  prettierConfig,
];
