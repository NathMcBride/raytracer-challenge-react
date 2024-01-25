import {
  Matrix,
  Material,
  Point,
  Vector,
  Ray,
  position,
  negate,
  normalAt,
  dot
} from '.';

export type Shape = {
  origin: Point;
  transform: Matrix;
  material: Material;
};
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

export const hit = (
  intersections: Array<Intersection>,
  b?: number
): Intersection | null => {
  const nonNegative = (intersection: Intersection) => intersection.t > 0;
  const filtered = intersections.filter(nonNegative);
  return filtered.length > 0 ? filtered[0] : null;
};

export type Computation = {
  t: number;
  object: Shape;
  point: Point;
  eyev: Vector;
  normalv: Vector;
  inside: boolean;
};

export const prepareComputations = (
  intersection: Intersection,
  ray: Ray
): Computation => {
  const point = position(ray, intersection.t);
  const eyev = negate(ray.direction);
  let normalv = normalAt(intersection.object, point);
  let inside = false;
  const dotProduct = dot(normalv, eyev);

  if (dotProduct < 0) {
    inside = true;
    normalv = negate(normalv);
  }

  return {
    t: intersection.t,
    object: intersection.object,
    point,
    eyev,
    normalv,
    inside
  };
};
