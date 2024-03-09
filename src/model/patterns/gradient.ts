import {
  Gradient,
  Point,
  Color,
  subtractColor,
  addColor,
  multiplyByScalar
} from '..';

export const gradientAt = (gradient: Gradient, point: Point): Color => {
  const distance = subtractColor(gradient.b, gradient.a);
  const fraction = point.x - Math.floor(point.x);

  return addColor(gradient.a, multiplyByScalar(distance, fraction));
};
