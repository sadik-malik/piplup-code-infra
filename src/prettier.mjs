// @ts-check

/**
 * @typedef {Exclude<import('prettier').Config['overrides'], undefined>[number]} Override
 */

/**
 * @type {Override}
 */
const jsonOverride = {
  files: ['**/*.json'],
  options: {
    trailingComma: 'none',
  },
};

/**
 * @param {Object} [options={}]
 * @param {Override[]} [options.overrides]
 * @returns {import('prettier').Config}
 */
export function createBaseConfig(options = {}) {
  return {
    overrides: [jsonOverride, ...(options.overrides ?? [])],
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
  };
}
