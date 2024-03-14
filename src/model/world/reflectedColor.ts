import {
  World,
  Computation,
  Color,
  ray,
  colorAt,
  multiplyByScalar,
  color
} from '..';

export const reflectedColor = (
  world: World,
  computation: Computation,
  remaining: number
): Color => {
  const {
    overPoint,
    reflectv,
    object: {
      material: { reflective }
    }
  } = computation;
  if (remaining <= 0) return color(0, 0, 0);
  if (reflective === 0) return color(0, 0, 0);

  const reflectedRay = ray(overPoint, reflectv);
  const theColor = colorAt(world, reflectedRay, remaining - 1);
  return multiplyByScalar(theColor, reflective);
};
