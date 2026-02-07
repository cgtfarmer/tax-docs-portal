// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import functional from 'eslint-plugin-functional';

export default tseslint.config(
  {
    ignores: [
      'dist/**/*.ts',
      'dist/**',
      '**/*.mjs',
      '**/*.js',
      'notes/**/*.ts',
      'notes/**',
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslint.configs.recommended,
  // ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  {
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  {
    plugins: {
      'functional': functional
    },
    rules: {
      'functional/type-declaration-immutability': ['error', {
        rules: [
          {
            identifiers: '^(?!I?Mutable).+',
            immutability: 'ReadonlyShallow',
            comparator: 'AtLeast',
            fixer: false,
            suggestions: false
          },
        ],
        ignoreInterfaces: false
      }],
    }
  }
);
