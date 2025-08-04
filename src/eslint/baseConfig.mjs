// @ts-check
import { includeIgnoreFile } from '@eslint/compat';
import prettier from 'eslint-config-prettier/flat';
import reactCompilerPlugin from 'eslint-plugin-react-compiler';
import { configs as reactHookConfigs } from 'eslint-plugin-react-hooks';
import globals from 'globals';
import * as tseslint from 'typescript-eslint';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { airbnbBaseConfig, airbnbReactConfig } from './airbnb/base.mjs';
import airbnbTypescript from './airbnb/typescript.mjs';
import { createCoreConfig } from './piplup/config.mjs';
import { perfectionistConfig } from './perfectionist/base.mjs';

/**
 * @typedef {import('eslint').Linter.Config} LinterConfig
 * @typedef {import('@eslint/compat').FlatConfig} FlatConfig
 */

/**
 * @param {Object} [params]
 * @param {boolean} [params.enableReactCompiler] - Whether the config is for spec files.
 * @param {string} params.baseDirectory - The base directory for the configuration.
 * @returns {LinterConfig[]}
 */
export function createBaseConfig(
  { baseDirectory, enableReactCompiler = false } = { baseDirectory: process.cwd() },
) {
  const ignoreRules = /** @type {FlatConfig[]} */ (
    ['.gitignore', '.lintignore', '.eslintignore']
      .map((file) => {
        if (fs.existsSync(`${baseDirectory}/${file}`)) {
          return includeIgnoreFile(path.join(baseDirectory, file), `Ignore rules from ${file}`);
        }
        return null;
      })
      .filter(Boolean)
  );

  return /** @type {LinterConfig[]} */ (
    tseslint.config(
      ...ignoreRules,
      airbnbBaseConfig,
      airbnbReactConfig,
      airbnbTypescript,
      reactHookConfigs['recommended-latest'],
      enableReactCompiler ? reactCompilerPlugin.configs.recommended : {},
      perfectionistConfig,
      prettier,
      {
        extends: createCoreConfig({ reactCompilerEnabled: enableReactCompiler }),
        languageOptions: {
          ecmaVersion: 7,
          globals: {
            ...globals.es2020,
            ...globals.browser,
            ...globals.node,
          },
          parser: tseslint.parser,
        },
        name: 'typescript-eslint-parser',
        plugins: {
          '@typescript-eslint': tseslint.plugin,
        },
        settings: {
          'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
          },
          'import/resolver': {
            typescript: {
              project: ['tsconfig.node.json', 'apps/*/tsconfig.json', 'packages/*/tsconfig.json'],
            },
          },
        },
      },
      {
        files: ['**/*.mjs'],
        rules: {
          'import/extensions': [
            'error',
            'ignorePackages',
            {
              js: 'always',
              mjs: 'always',
            },
          ],
        },
      },
    )
  );
}
