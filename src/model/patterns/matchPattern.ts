import {
  Point,
  switchUnionValue,
  color,
  stripeAt,
  gradientAt,
  ringGradientAt,
  ringAt,
  checkerAt,
  radialGlowAtPoint,
  Pattern
} from '..';

export const matchPattern = (pattern: Pattern, point: Point) => {
  return switchUnionValue(pattern)({
    identity: () => color(0, 0, 0),
    stripe: s => stripeAt(s, point),
    gradient: g => gradientAt(g, point),
    ring: r => ringAt(r, point),
    ringGradient: rg => ringGradientAt(rg, point),
    checker: c => checkerAt(c, point),
    glow: gl => radialGlowAtPoint(gl, point)
  });
};
