const restrictedMethods = ['setTimeout', 'setInterval', 'clearTimeout', 'clearInterval'];

const restrictedSyntaxRules = restrictedMethods.map((method) => ({
  message: `Use global ${method} instead of window.${method}.`,
  selector: `MemberExpression[object.name='window'][property.name='${method}']`,
}));

/**
 * @param {Object} [options]
 * @param {boolean} [options.reactCompilerEnabled] - Whether the config is for spec files.
 * @returns {import('typescript-eslint').InfiniteDepthConfigWithExtends[]}
 */
export function createCoreConfig(options = {}) {
  return [
    {
      name: 'piplup-core-config',
      rules: {
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
            vars: 'all',
          },
        ],
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            classes: true,
            functions: false,
            variables: true,
          },
        ],
        'arrow-body-style': 'off',
        'consistent-this': ['error', 'self'],
        curly: ['error', 'all'],
        'dot-notation': 'error',
        'func-names': 'error',
        'import/named': 'off',
        'import/no-cycle': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-relative-packages': 'error',
        'import/no-webpack-loader-syntax': 'off',
        'import/prefer-default-export': 'off',
        'jsx-a11y/label-has-associated-control': [
          'error',
          {
            assert: 'either',
          },
        ],
        'jsx-a11y/no-autofocus': 'off',
        'lines-around-directive': 'off',
        'max-classes-per-file': 'off',
        'no-alert': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-constant-condition': 'error',
        'no-continue': 'off',
        'no-implied-eval': 'error',
        'no-param-reassign': 'off',
        'no-prototype-builtins': 'off',
        'no-redeclare': 'off',
        'no-restricted-exports': 'off',
        'no-restricted-syntax': [
          'error',
          {
            message:
              "Do not import default or named exports from React. Use a namespace import (import * as React from 'react';) instead.",
            selector:
              'ImportDeclaration[source.value="react"] ImportDefaultSpecifier, ImportDeclaration[source.value="react"] ImportSpecifier',
          },
          {
            message:
              "Do not import default or named exports from ReactDOM. Use a namespace import (import * as ReactDOM from 'react-dom';) instead.",
            selector:
              'ImportDeclaration[source.value="react-dom"] ImportDefaultSpecifier, ImportDeclaration[source.value="react-dom"] ImportSpecifier',
          },
          {
            message:
              "Do not import default or named exports from ReactDOM. Use a namespace import (import * as ReactDOM from 'react-dom/client';) instead.",
            selector:
              'ImportDeclaration[source.value="react-dom/client"] ImportDefaultSpecifier, ImportDeclaration[source.value="react-dom/client"] ImportSpecifier',
          },
          {
            message:
              "Do not import default or named exports from ReactDOMServer. Use a namespace import (import * as ReactDOM from 'react-dom/server';) instead.",
            selector:
              'ImportDeclaration[source.value="react-dom/server"] ImportDefaultSpecifier, ImportDeclaration[source.value="react-dom/server"] ImportSpecifier',
          },
          {
            message:
              "The 'use client' pragma can't be used with export * in the same module. This is not supported by Next.js.",
            selector: 'ExpressionStatement[expression.value="use client"] ~ ExportAllDeclaration',
          },
          {
            message: 'Do not call `Error(...)` without `new`. Use `new Error(...)` instead.',
            selector: "CallExpression[callee.name='Error']",
          },
          ...restrictedSyntaxRules,
        ],
        'no-return-await': 'error',
        'no-throw-literal': 'error',
        'no-underscore-dangle': 'error',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'nonblock-statement-body-position': 'error',
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
        'prefer-destructuring': 'off',
        'react-hooks/exhaustive-deps': ['error', { additionalHooks: 'useEnhancedEffect' }],
        'react-hooks/rules-of-hooks': 'error',
        'react/default-props-match-prop-types': [
          'error',
          {
            allowRequiredDefaults: true,
          },
        ],
        'react/destructuring-assignment': 'off',
        'react/forbid-prop-types': 'off',
        'react/jsx-curly-brace-presence': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
        'react/jsx-fragments': ['error', 'element'],
        'react/jsx-no-bind': 'off',
        'react/jsx-no-target-blank': ['error', { allowReferrer: true }],
        'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'off',
        'react/no-danger': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-invalid-html-attribute': 'off',
        'react/no-unknown-property': ['error', { ignore: ['sx'] }],

        'react/require-default-props': 'off',
        'react/sort-prop-types': 'error',
        'react/state-in-constructor': 'off',
        'react/static-property-placement': 'off',
        ...(options.reactCompilerEnabled ? { 'react-compiler/react-compiler': 'error' } : {}),
        '@typescript-eslint/return-await': 'off',
        // Prevent the use of `e` as a shorthand for `event`, `error`, etc.
        'id-denylist': ['error', 'e'],
      },
    },
  ];
}
