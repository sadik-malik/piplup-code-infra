const nonStraightQuotes = /[‘’“”]/gm;

/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  create(context) {
    return {
      Program(node) {
        const value = context.sourceCode.text;
        let match;

        while ((match = nonStraightQuotes.exec(value)) !== null) {
          context.report({
            loc: {
              end: context.sourceCode.getLocFromIndex(match.index + 1),
              start: context.sourceCode.getLocFromIndex(match.index),
            },
            messageId: 'wrongQuotes',
            node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description:
        'Only allow straight quotes. Curly quotes can still be used but in specific context where relevant.',
    },
    messages: {
      wrongQuotes:
        'Only allow straight quotes. Curly quotes can still be used but in specific context where relevant.',
    },
    schema: [],
    type: 'suggestion',
  },
};

export default rule;
