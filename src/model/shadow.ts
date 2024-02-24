import {
  World,
  Point,
  subtract,
  magnitude,
  normalize,
  ray,
  intersectWorld,
  hit
} from '.';

export const isShadowed = (world: World, point: Point): boolean => {
  const length = world.lightSources.length;
  let inShadow = false;

  for (let i = 0; i < length; i++) {
    const lightSource = world.lightSources[i];
    const v = subtract(lightSource.position, point);
    const distance = magnitude(v);
    const direction = normalize(v);

    const theRay = ray(point, direction);
    const intersections = intersectWorld(world, theRay);
    const theHit = hit(intersections);

    if (theHit && theHit.t < distance) {
      inShadow = true;
      break;
    }
  }

  return inShadow;
};
