import {
  Point,
  Vector,
  Shape,
  inverse,
  multiplyByTuple,
  transpose,
  normalize,
  subtract,
  vector,
  switchUnionValue
} from '.';

export const normalAt = (shape: Shape, worldPoint: Point): Vector => {
  const inverseTransform = inverse(shape.transform);
  const objectPoint = multiplyByTuple(inverseTransform, worldPoint);

  const objectNormal = switchUnionValue(shape)({
    identity: () => vector(0, 0, 0),
    sphere: b => subtract(objectPoint, b.origin)
  });

  const worldNormal = multiplyByTuple(
    transpose(inverseTransform),
    objectNormal
  );
  worldNormal.w = 0;
  return normalize(worldNormal);
};
