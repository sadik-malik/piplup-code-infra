// @ts-check
import baseBestPractices from 'eslint-config-airbnb-base/rules/best-practices';
import baseErrors from 'eslint-config-airbnb-base/rules/errors';
import baseEs6 from 'eslint-config-airbnb-base/rules/es6';
import baseImports from 'eslint-config-airbnb-base/rules/imports';
import baseNode from 'eslint-config-airbnb-base/rules/node';
import baseStrict from 'eslint-config-airbnb-base/rules/strict';
import baseStyle from 'eslint-config-airbnb-base/rules/style';
import baseVariables from 'eslint-config-airbnb-base/rules/variables';
import airbnbReact from 'eslint-config-airbnb/rules/react';
import airbnbReactA11y from 'eslint-config-airbnb/rules/react-a11y';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginReact from 'eslint-plugin-react';

import globals from 'globals';
import * as tseslint from 'typescript-eslint';

/**
 * @typedef {import('eslint').Linter.Config} LinterConfig
 * @typedef {import('typescript-eslint').InfiniteDepthConfigWithExtends} InfiniteDepthConfigWithExtends
 */

const baseES6Plugin = {
  languageOptions: {
    globals: {
      ...globals.es2016,
    },
    parserOptions: baseEs6.parserOptions,
  },
  rules: baseEs6.rules,
};

const baseImportPlugin = {
  languageOptions: {
    globals: {
      ...globals.es2016,
    },
    parserOptions: baseImports.parserOptions,
  },
  plugins: {
    import: eslintPluginImport,
  },
  rules: baseImports.rules,
  settings: baseImports.settings,
};

const baseNodePlugin = {
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: baseNode.rules,
};

export const airbnbBaseConfig = /** @type {LinterConfig[]} */ (
  tseslint.config(
    {
      name: 'base-best-practices',
      ...baseBestPractices,
    },
    {
      name: 'base-errors',
      ...baseErrors,
    },
    {
      name: 'base-node',
      ...baseNodePlugin,
    },
    { name: 'base-style', ...baseStyle },
    { name: 'base-variables', ...baseVariables },
    { name: 'base-es6-plugin', ...baseES6Plugin },
    { name: 'base-import-plugin', ...baseImportPlugin },
    { name: 'base-strict', ...baseStrict },
  )
);

/**
 * @type {InfiniteDepthConfigWithExtends}
 */
const airbnbReactPlugin = {
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    react: eslintPluginReact,
  },
  rules: airbnbReact.rules,
};

const airbnbReactA11yPlugin = {
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    'jsx-a11y': eslintPluginJsxA11y,
  },
  rules: airbnbReactA11y.rules,
};

export const airbnbReactConfig = /** @type {LinterConfig[]} */ (
  tseslint.config(
    { name: 'airbnb-react', ...airbnbReactPlugin },
    { name: 'airbnb-react-a11y', ...airbnbReactA11yPlugin },
  )
);
