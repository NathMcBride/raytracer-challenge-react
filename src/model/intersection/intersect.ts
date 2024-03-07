import {
  Ray,
  transform,
  Intersection,
  inverse,
  Shape,
  switchUnionValue,
  intersectSphere
} from '..';

export const intersect = (shape: Shape, ray: Ray): Array<Intersection> => {
  const localRay = transform(ray, inverse(shape.transform));

  return switchUnionValue(shape)({
    identity: () => [],
    sphere: b => intersectSphere(b, localRay)
  });
};
