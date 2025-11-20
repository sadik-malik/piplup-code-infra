import base from './src/stylelint/index.mjs';

// Note: To debug stylelint config resolution for a specific file, use
//         pnpm exec stylelint --print-config <path-to-file>

/** @type {import('stylelint').Config} */
export default {
  extends: base,
  overrides: [],
};
