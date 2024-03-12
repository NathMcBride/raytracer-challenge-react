import {
  Color,
  Point,
  isEven,
  multiplyByScalar,
  addColor,
  subtractColor,
  RingGradient
} from '..';

export const ringGradientAt = (ring: RingGradient, point: Point): Color => {
  const m = Math;
  const distanceFromCenter = m.sqrt(m.pow(point.x, 2) + m.pow(point.y, 2));

  const distance = subtractColor(ring.b, ring.a);
  const fraction = distanceFromCenter - Math.floor(distanceFromCenter);

  return isEven(m.floor(distanceFromCenter))
    ? addColor(ring.a, multiplyByScalar(distance, fraction))
    : ring.b;
};
