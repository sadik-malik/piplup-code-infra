// @ts-check
import baseBestPractices from 'eslint-config-airbnb-base/rules/best-practices';
import baseEs6 from 'eslint-config-airbnb-base/rules/es6';
import baseImports from 'eslint-config-airbnb-base/rules/imports';
import baseStyle from 'eslint-config-airbnb-base/rules/style';
import baseVariables from 'eslint-config-airbnb-base/rules/variables';
import * as tseslint from 'typescript-eslint';

const baseImportsRules = baseImports.rules;

if (!Array.isArray(baseImportsRules?.['import/extensions'])) {
  throw new Error(
    'Expected `import/extensions` rule to be an array in `eslint-config-airbnb-base/rules/imports`',
  );
}

export default /** @type {import('typescript-eslint').ConfigArray} */ (
  tseslint.config(
    {
      rules: {
        '@typescript-eslint/default-param-last': baseBestPractices.rules?.['default-param-last'],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            selector: 'variable',
          },
          {
            format: ['camelCase', 'PascalCase'],
            selector: 'function',
          },
          {
            format: ['PascalCase'],
            selector: 'typeLike',
          },
        ],
        '@typescript-eslint/no-array-constructor': baseStyle.rules?.['no-array-constructor'],
        '@typescript-eslint/no-empty-function': baseBestPractices.rules?.['no-empty-function'],
        '@typescript-eslint/no-loop-func': baseBestPractices.rules?.['no-loop-func'],
        '@typescript-eslint/no-magic-numbers': baseBestPractices.rules?.['no-magic-numbers'],
        '@typescript-eslint/no-shadow': baseVariables.rules?.['no-shadow'],
        '@typescript-eslint/no-unused-expressions':
          baseBestPractices.rules?.['no-unused-expressions'],
        '@typescript-eslint/no-useless-constructor': baseEs6.rules?.['no-useless-constructor'],
        '@typescript-eslint/require-await': baseBestPractices.rules?.['require-await'],
        camelcase: 'off',
        'default-param-last': 'off',
        'import/extensions': [
          baseImportsRules['import/extensions'][0],
          baseImportsRules['import/extensions'][1],
          typeof baseImportsRules['import/extensions'][2] === 'object'
            ? {
                ...baseImportsRules['import/extensions'][2],
                ts: 'never',
                tsx: 'never',
              }
            : { ts: 'never', tsx: 'never' },
        ],
        'no-array-constructor': 'off',
        'no-empty-function': 'off',
        'no-loop-func': 'off',
        'no-loss-of-precision': 'error',
        'no-magic-numbers': 'off',
        'no-shadow': 'off',
        'no-unused-expressions': 'off',
        'no-useless-constructor': 'off',
        'require-await': 'off',
      },
      settings: {
        'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
        },
        'import/resolver': {
          node: {
            extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
          },
        },
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'constructor-super': 'off',
        'getter-return': 'off',
        'import/named': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-unresolved': 'off',
        'no-const-assign': 'off',
        'no-dupe-args': 'off',
        'no-dupe-class-members': 'off',
        'no-dupe-keys': 'off',
        'no-func-assign': 'off',
        'no-import-assign': 'off',
        'no-new-symbol': 'off',
        'no-obj-calls': 'off',
        'no-redeclare': 'off',
        'no-setter-return': 'off',
        'no-this-before-super': 'off',
        'no-undef': 'off',
        'no-unreachable': 'off',
        'no-unsafe-negation': 'off',
        'valid-typeof': 'off',
      },
    },
  )
);
