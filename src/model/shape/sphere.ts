import {
  Ray,
  Intersection,
  point,
  subtract,
  dot,
  isVector,
  Matrix,
  identity,
  material,
  sphereOrigin,
  Sphere
} from '..';

export type SphereParams = Partial<Sphere>;
export const sphere = (params?: SphereParams, b?: number): Sphere => ({
  kind: 'sphere',
  origin: params?.origin ?? point(0, 0, 0),
  transform: params?.transform ?? identity(),
  material: params?.material ?? material()
});

//function below is a bit pointless?
export const setTransform = (s: Sphere, m: Matrix) => {
  s.transform = m;
  return s;
};

export const intersectSphere = (
  sphere: Sphere,
  ray: Ray
): Array<Intersection> => {
  const sphereToRay = subtract(ray.origin, sphereOrigin());

  if (isVector(sphereToRay)) {
    const a = dot(ray.direction, ray.direction);
    const b = 2 * dot(ray.direction, sphereToRay);
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
