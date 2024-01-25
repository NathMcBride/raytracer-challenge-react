import {
  Ray,
  transform,
  Intersection,
  Shape,
  point,
  subtract,
  dot,
  isVector,
  Vector,
  Point,
  normalize,
  inverse,
  Matrix,
  multiplyByTuple,
  transpose,
  identity,
  material,
  sphereOrigin
} from '.';

export type Sphere = Shape;
export type SphereParams = Partial<Sphere>;
export const sphere = (params?: SphereParams, b?: number): Sphere => ({
  origin: params?.origin ?? point(0, 0, 0),
  transform: params?.transform ?? identity(),
  material: params?.material ?? material()
});

//function below is a bit pointless?
export const setTransform = (s: Sphere, m: Matrix) => {
  s.transform = m;
  return s;
};
export const intersect = (sphere: Sphere, ray: Ray): Array<Intersection> => {
  const ray2 = transform(ray, inverse(sphere.transform));
  const sphereToRay = subtract(ray2.origin, sphereOrigin());

  if (isVector(sphereToRay)) {
    const a = dot(ray2.direction, ray2.direction);
    const b = 2 * dot(ray2.direction, sphereToRay);
    const c = dot(sphereToRay, sphereToRay) - 1;

    const discriminant = Math.pow(b, 2) - 4 * a * c;
    if (discriminant < 0) return [];

    const dSqrt = Math.sqrt(discriminant);
    const aMultiple = 2 * a;
    const t1 = (-b - dSqrt) / aMultiple;
    const t2 = (-b + dSqrt) / aMultiple;

    return [
      { t: t1, object: sphere },
      { t: t2, object: sphere }
    ].sort((a, b) => a.t - b.t);
  }

  return [];
};

export const normalAt = (sphere: Sphere, worldPoint: Point): Vector => {
  const inverseTransform = inverse(sphere.transform);
  const objectPoint = multiplyByTuple(inverseTransform, worldPoint);
  const objectNormal = subtract(objectPoint, sphereOrigin());
  const worldNormal = multiplyByTuple(
    transpose(inverseTransform),
    objectNormal
  );
  worldNormal.w = 0;
  return normalize(worldNormal);
};
