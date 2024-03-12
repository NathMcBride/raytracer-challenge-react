import { Color, Point, multiplyByScalar, Glow } from '..';

export const radialGlowAtPoint = (glow: Glow, point: Point): Color => {
  const m = Math;
  let d = m.sqrt(m.pow(point.x, 2) + m.pow(point.z, 2));
  d = m.sin(d * 8) / 8;
  d = m.abs(d);
  d = 0.02 / d;

  return multiplyByScalar(glow.a, d);
};
