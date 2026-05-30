import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  /**
   * Global ignores
   */
  {
    ignores: ['dist/**', 'node_modules/**', 'scripts/**', '*.{js,ts,mjs,cjs}', 'coverage/**'],
  },

  /**
   * Base JS config
   */
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],

    plugins: {
      js,
      '@stylistic': stylistic,
    },

    rules: {
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
    },

    extends: ['js/recommended'],

    languageOptions: {
      globals: globals.node,
    },
  },

  /**
   * TypeScript config
   */
  ...tseslint.configs.recommended,

  {
    files: ['src/**/*.ts'],

    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },

      globals: globals.node,
    },

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'error',

      '@typescript-eslint/no-unused-private-class-members': 'error',

      'no-dupe-else-if': 'error',

      'no-constructor-return': 'error',

      'consistent-return': 'error',

      'no-else-return': ['error', { allowElseIf: false }],

      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],

      '@typescript-eslint/no-floating-promises': 'error',

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
        },
      ],
    },
  },
]);
