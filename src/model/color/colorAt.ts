import {
  World,
  Ray,
  intersectWorld,
  hit,
  prepareComputations,
  shadeHit,
  Color,
  color
} from '..';

export const colorAt = (world: World, ray: Ray, remaining: number): Color => {
  const intersections = intersectWorld(world, ray);
  const theHit = hit(intersections);

  if (!theHit) return color(0, 0, 0);
  const computation = prepareComputations(theHit, ray);
  return shadeHit(world, computation, remaining);
};
