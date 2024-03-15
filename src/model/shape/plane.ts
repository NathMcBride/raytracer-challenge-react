import {
  Plane,
  point,
  identity,
  material,
  Ray,
  Intersection,
  uuidv4
} from '..';

export type PlaneParams = Partial<Plane>;
export function plane(params?: PlaneParams): Plane {
  return {
    kind: 'plane',
    uuid: uuidv4(),
    origin: params?.origin ?? point(0, 0, 0),
    transform: params?.transform ?? identity(),
    material: params?.material ?? material()
  };
}

export const intersectPlane = (plane: Plane, ray: Ray): Array<Intersection> => {
  const EPSILON = 0.00001;
  if (Math.abs(ray.direction.y) < EPSILON) return [];

  const t = -ray.origin.y / ray.direction.y;
  return [{ uuid: uuidv4(), t, object: plane }];
};
