import { Color, Point, Ring, isEven } from '..';

export const ringAt = (ring: Ring, point: Point): Color => {
  const m = Math;
  const distanceFromCenter = m.sqrt(m.pow(point.x, 2) + m.pow(point.z, 2));
  return isEven(m.floor(distanceFromCenter)) ? ring.a : ring.b;
};
