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
  Sphere,
  uuidv4
} from '..';

export type SphereParams = Partial<Sphere>;
export function sphere(params?: SphereParams): Sphere {
  return {
    kind: 'sphere',
    uuid: params?.uuid ?? uuidv4(),
    origin: params?.origin ?? point(0, 0, 0),
    transform: params?.transform ?? identity(),
    material: params?.material ?? material()
  };
}

export function glassSphere(params?: SphereParams): Sphere {
  return {
    kind: 'sphere',
    uuid: params?.uuid ?? uuidv4(),
    origin: params?.origin ?? point(0, 0, 0),
    transform: params?.transform ?? identity(),
    material: params?.material ?? {
      ...material(),
      transparency: 1,
      refractiveIndex: 1.5
    }
  };
}

//function below is a bit pointless?
export const setTransform = (s: Sphere, m: Matrix) => {
  s.transform = m;
  return s;
};

export const intersectSphere = (
  sphere: Sphere,
  ray: Ray
): Array<Intersection> => {
  const sphereToRay = subtract(ray.origin, sphere.origin);

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
      { uuid: uuidv4(), t: t1, object: sphere },
      { uuid: uuidv4(), t: t2, object: sphere }
    ].sort((a, b) => a.t - b.t);
  }

  return [];
};
