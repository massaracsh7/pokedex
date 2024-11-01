import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { configs as tsConfigs, ESLintUtils } from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default ESLintUtils.mergeConfigs(
  {
    ignores: ['dist'],
  },
  {
    extends: [
      js.configs.recommended,
      ...tsConfigs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsConfigs, 
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
);
