import disallowActiveElementAsKeyEventTarget from './rules/disallow-active-element-as-key-event-target.mjs';
import disallowReactApiInServerComponents from './rules/disallow-react-api-in-server-components.mjs';
import docgenIgnoreBeforeComment from './rules/docgen-ignore-before-comment.mjs';
import noRestrictedResolvedImports from './rules/no-restricted-resolved-imports.mjs';
import straightQuotes from './rules/straight-quotes.mjs';

export default /** @type {import('eslint').ESLint.Plugin} */ ({
  meta: {
    name: '@piplup/eslint-plugin-piplup',
    version: '1.0.2',
  },
  rules: {
    'disallow-active-element-as-key-event-target': disallowActiveElementAsKeyEventTarget,
    'docgen-ignore-before-comment': docgenIgnoreBeforeComment,
    'straight-quotes': straightQuotes,
    'disallow-react-api-in-server-components': disallowReactApiInServerComponents,
    'no-restricted-resolved-imports': noRestrictedResolvedImports,
  },
});
