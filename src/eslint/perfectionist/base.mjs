import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';
import { defineConfig } from 'eslint/config';
import { EXTENSION_JS, EXTENSION_TS } from '../extensions.mjs';

/**
 * @returns {import('eslint').Linter.Config[]}
 */
export function createPerfectionistConfig() {
  return defineConfig([
    {
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      name: 'perfectionist',
      plugins: {
        perfectionist: eslintPluginPerfectionist,
      },
      files: [`**/*${EXTENSION_TS}`, `**/*${EXTENSION_JS}`],
      rules: {
        'perfectionist/sort-array-includes': [
          'error',
          {
            groupKind: 'literals-first',
            ignoreCase: true,
            order: 'asc',
            type: 'alphabetical',
          },
        ],
        'perfectionist/sort-enums': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-interfaces': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-jsx-props': [
          'error',
          {
            groups: ['multiline', 'unknown', 'shorthand'],
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-maps': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-named-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-object-types': [
          'error',
          {
            customGroups: {},
            groups: [],
            ignoreCase: true,
            order: 'asc',
            partitionByNewLine: false,
            type: 'alphabetical',
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            ignoreCase: true,
            order: 'asc',
            partitionByComment: false,
            partitionByNewLine: false,
            styledComponents: true,
            type: 'alphabetical',
          },
        ],
        'perfectionist/sort-union-types': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
      },
    },
  ]);
}
