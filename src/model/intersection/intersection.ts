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
  multiply,
  reflect,
  subtract,
  uuidv4
} from '..';

export type Intersection = { uuid: string; t: number; object: Shape };

export const intersection = (t: number, object: Shape): Intersection => ({
  uuid: uuidv4(),
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
  underPoint: Point;
  reflectv: Vector;
  n1: number;
  n2: number;
};

export const prepareComputations = (
  intersection: Intersection,
  ray: Ray,
  intersections: Array<Intersection> = [intersection]
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

  const containers: Array<Shape> = [];
  let n1 = 0;
  let n2 = 0;
  const length = intersections.length;
  for (let i = 0; i < length; i++) {
    const theIntersection = intersections[i];
    if (theIntersection.uuid === intersection.uuid) {
      containers.length === 0
        ? (n1 = 1)
        : (n1 = containers[containers.length - 1].material.refractiveIndex);
    }

    const idx = containers.findIndex(
      e => e.uuid === theIntersection.object.uuid
    );
    idx >= 0
      ? containers.splice(idx, 1)
      : containers.push(theIntersection.object);

    if (theIntersection.uuid === intersection.uuid) {
      containers.length === 0
        ? (n2 = 1)
        : (n2 = containers[containers.length - 1].material.refractiveIndex);
      break;
    }
  }

  const overPoint = add(point, multiply(normalv, EPSILON));
  const underPoint = subtract(point, multiply(normalv, EPSILON));
  const reflectv = reflect(ray.direction, normalv);
  return {
    t: intersection.t,
    object: intersection.object,
    point,
    eyev,
    normalv,
    inside,
    overPoint,
    underPoint,
    reflectv,
    n1,
    n2
  };
};
