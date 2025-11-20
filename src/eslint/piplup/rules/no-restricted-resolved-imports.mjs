import moduleVisitorModule from 'eslint-module-utils/moduleVisitor';
import resolveModule from 'eslint-module-utils/resolve';
import { minimatch } from 'minimatch';
import * as path from 'node:path';

/**
 * @type {import('eslint-module-utils/moduleVisitor').default}
 */
const moduleVisitor = /** @type {any} */ (moduleVisitorModule).default || moduleVisitorModule;
/**
 * @type {import('eslint-module-utils/resolve').default}
 */
const resolve = /** @type {any} */ (resolveModule).default || resolveModule;

/**
 * @typedef {Object} PatternConfig
 * @property {string} pattern - The pattern to match against resolved imports
 * @property {string} [message] - Custom message to show when the pattern matches
 */

/**
 * Creates an ESLint rule that restricts imports based on their resolved paths.
 * Works with both ESM (import) and CommonJS (require) imports.
 */
export default /** @type {import('eslint').Rule.RuleModule} */ ({
  create(context) {
    const options = context.options[0] || [];

    if (!Array.isArray(options) || options.length === 0) {
      return {};
    }

    return moduleVisitor(
      (/** @type {any} */ source, /** @type {any} */ node) => {
        // Get the resolved path of the import

        const resolvedPath = resolve(source.value, context);

        if (!resolvedPath) {
          return;
        }

        // Normalize the resolved path to use forward slashes
        const normalizedPath = resolvedPath.split(path.sep).join('/');

        // Check each pattern against the resolved path
        for (const option of options) {
          const { message = '', pattern } = option;

          if (minimatch(normalizedPath, pattern)) {
            context.report({
              data: {
                customMessage: message ? ` ${message}` : '',
                importSource: source.value,
                pattern,
                resolvedPath: normalizedPath,
              },
              messageId: 'restrictedResolvedImport',
              node,
            });

            // Stop after first match
            break;
          }
        }
      },

      { commonjs: true, esmodule: true },
    ); // This handles both require() and import statements
  },
  meta: {
    docs: {
      description: 'Disallow imports that resolve to certain patterns.',
    },
    messages: {
      restrictedResolvedImport:
        'Importing from "{{importSource}}" is restricted because it resolves to "{{resolvedPath}}", which matches the pattern "{{pattern}}".{{customMessage}}',
    },
    schema: [
      {
        items: {
          additionalProperties: false,
          properties: {
            message: { type: 'string' },
            pattern: { type: 'string' },
          },
          required: ['pattern'],
          type: 'object',
        },
        type: 'array',
      },
    ],
    type: 'suggestion',
  },
});
