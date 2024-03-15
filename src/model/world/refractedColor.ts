import {
  World,
  Computation,
  Color,
  ray,
  colorAt,
  multiplyByScalar,
  color,
  dot,
  multiply,
  subtract
} from '..';

export const refractedColor = (
  world: World,
  computation: Computation,
  remaining: number
): Color => {
  if (remaining === 0) return color(0, 0, 0);
  if (computation.object.material.transparency === 0) return color(0, 0, 0);

  const nRatio = computation.n1 / computation.n2;
  const cosi = dot(computation.eyev, computation.normalv);
  const sin2t = Math.pow(nRatio, 2) * (1 - Math.pow(cosi, 2));

  if (sin2t > 1) return color(0, 0, 0);

  const cost = Math.sqrt(1.0 - sin2t);
  const direction = subtract(
    multiply(computation.normalv, nRatio * cosi - cost),
    multiply(computation.eyev, nRatio)
  );

  const refractedRay = ray(computation.underPoint, direction);
  return multiplyByScalar(
    colorAt(world, refractedRay, remaining - 1),
    computation.object.material.transparency
  );
};
