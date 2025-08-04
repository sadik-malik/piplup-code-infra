import { BaseExpression, Expression } from 'estree';

export * from 'estree';

declare module 'estree' {
  interface ExpressionMap {
    TSAsExpression: TSAsExpression;
    TSNonNullExpression: TSNonNullExpression;
  }
}

export interface TSNonNullExpression extends BaseExpression {
  expression: Expression;
  type: 'TSNonNullExpression';
}

export interface TSAsExpression extends BaseExpression {
  expression: Expression;
  type: 'TSAsExpression';
  typeAnnotation: Expression;
}
