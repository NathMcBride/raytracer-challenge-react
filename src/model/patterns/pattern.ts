import {
  Color,
  Point,
  switchUnionValue,
  Matrix,
  identity,
  Shape,
  color,
  inverse,
  multiplyByTuple,
  stripeAt,
  gradientAt,
  ringAt,
  checkerAt
} from '..';

export type PatternIdentity = {
  kind: 'identity';
  a: Color;
  b: Color;
  transform: Matrix;
};

export type Stripe = { kind: 'stripe' } & Omit<PatternIdentity, 'kind'>;
export type Gradient = { kind: 'gradient' } & Omit<PatternIdentity, 'kind'>;
export type Ring = { kind: 'ring' } & Omit<PatternIdentity, 'kind'>;
export type Checker = { kind: 'checker' } & Omit<PatternIdentity, 'kind'>;

export type Pattern = PatternIdentity | Stripe | Gradient | Ring | Checker;

export const stripePattern = (a: Color, b: Color): Stripe => ({
  kind: 'stripe',
  a,
  b,
  transform: identity()
});

export const gradientPattern = (a: Color, b: Color): Gradient => ({
  kind: 'gradient',
  a,
  b,
  transform: identity()
});

export const checkerPattern = (a: Color, b: Color): Checker => ({
  kind: 'checker',
  a,
  b,
  transform: identity()
});

export const ringPattern = (a: Color, b: Color): Ring => ({
  kind: 'ring',
  a,
  b,
  transform: identity()
});

export const patternAtShape = (
  pattern: Pattern,
  shape: Shape,
  worldPoint: Point
): Color => {
  const objectPoint = multiplyByTuple(inverse(shape.transform), worldPoint);
  const patternPoint = multiplyByTuple(inverse(pattern.transform), objectPoint);

  return switchUnionValue(pattern)({
    identity: () => color(0, 0, 0),
    stripe: s => stripeAt(s, patternPoint),
    gradient: g => gradientAt(g, patternPoint),
    ring: r => ringAt(r, patternPoint),
    checker: c => checkerAt(c, patternPoint)
  });
};
