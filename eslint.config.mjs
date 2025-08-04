import { defineConfig } from 'eslint/config';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createBaseConfig } from './src/eslint/baseConfig.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({
  extends: createBaseConfig({
    baseDirectory: dirname,
  }),
  name: 'Base config',
  rules: {
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
