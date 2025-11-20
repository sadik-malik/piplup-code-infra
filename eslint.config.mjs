import { defineConfig } from 'eslint/config';
import { createBaseConfig } from './src/eslint/baseConfig.mjs';
import { EXTENSION_TS } from './src/eslint/extensions.mjs';

export default defineConfig(createBaseConfig({ baseDirectory: import.meta.dirname }), {
  files: [`**/*${EXTENSION_TS}`],
  rules: {
    'compat/compat': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json'],
      },
    },
  },
});
