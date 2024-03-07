import {
  Shape,
  Point,
  Vector,
  Ray,
  position,
  negate,
  normalAt,
  dot,
  add,
  multiply
} from '..';

export type Intersection = { t: number; object: Shape };

export const intersection = (t: number, object: Shape): Intersection => ({
  t,
  object
});

export const intersections = (
  ...intersection: Intersection[]
): Array<Intersection> => {
  return [...intersection].sort((a, b) => a.t - b.t);
};

export function hit(intersections: Array<Intersection>): Intersection | null {
  const nonNegative = (intersection: Intersection) => intersection.t > 0;
  const filtered = intersections.filter(nonNegative);
  return filtered.length > 0 ? filtered[0] : null;
}

export type Computation = {
  t: number;
  object: Shape;
  point: Point;
  eyev: Vector;
  normalv: Vector;
  inside: boolean;
  overPoint: Point;
};

export const prepareComputations = (
  intersection: Intersection,
  ray: Ray
): Computation => {
  const EPSILON = 0.00001;
  const point = position(ray, intersection.t);
  const eyev = negate(ray.direction);
  let normalv = normalAt(intersection.object, point);
  let inside = false;

  const dotProduct = dot(normalv, eyev);
  if (dotProduct < 0) {
    inside = true;
    normalv = negate(normalv);
  }

  const overPoint = add(point, multiply(normalv, EPSILON));
  return {
    t: intersection.t,
    object: intersection.object,
    point,
    eyev,
    normalv,
    inside,
    overPoint
  };
};
