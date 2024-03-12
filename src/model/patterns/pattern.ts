import {
  Color,
  Point,
  Matrix,
  identity,
  Shape,
  color,
  inverse,
  multiplyByTuple,
  matchPattern
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
export type Glow = { kind: 'glow' } & Omit<PatternIdentity, 'kind'>;
export type RingGradient = { kind: 'ringGradient' } & Omit<
  PatternIdentity,
  'kind'
>;

export type Pattern =
  | PatternIdentity
  | Stripe
  | Gradient
  | Ring
  | RingGradient
  | Checker
  | Glow;

const patternFragment = (
  a: Color,
  b: Color
): Omit<PatternIdentity, 'kind'> => ({
  a,
  b,
  transform: identity()
});

export const stripePattern = (a: Color, b: Color): Stripe => ({
  kind: 'stripe',
  ...patternFragment(a, b)
});

export const gradientPattern = (a: Color, b: Color): Gradient => ({
  kind: 'gradient',
  ...patternFragment(a, b)
});

export const checkerPattern = (a: Color, b: Color): Checker => ({
  kind: 'checker',
  ...patternFragment(a, b)
});

export const ringPattern = (a: Color, b: Color): Ring => ({
  kind: 'ring',
  ...patternFragment(a, b)
});

export const ringGradientPattern = (a: Color, b: Color): RingGradient => ({
  kind: 'ringGradient',
  ...patternFragment(a, b)
});

export function radialGlowPattern(a: Color): Glow {
  return {
    kind: 'glow',
    ...patternFragment(a, color(0, 0, 0))
  };
}

export const patternAtShape = (
  pattern: Pattern,
  shape: Shape,
  worldPoint: Point
): Color => {
  const objectPoint = multiplyByTuple(inverse(shape.transform), worldPoint);
  const patternPoint = multiplyByTuple(inverse(pattern.transform), objectPoint);

  return matchPattern(pattern, patternPoint);
};

export const patternAtPoint = (pattern: Pattern, uvPoint: Point): Color => {
  const patternPoint = multiplyByTuple(inverse(pattern.transform), uvPoint);

  return matchPattern(pattern, patternPoint);
};
