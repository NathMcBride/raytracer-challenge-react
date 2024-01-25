import {
  Shape,
  PointLight,
  pointLight,
  point,
  color,
  sphere,
  material,
  scaling,
  Ray,
  Intersection,
  transform,
  dot,
  inverse,
  isVector,
  subtract,
  Computation,
  Color,
  lighting,
  addColor,
  hit,
  prepareComputations
} from '.';

export type World = { objects: Shape[]; lightSources: PointLight[] };

export const world = (): World => {
  return { objects: [], lightSources: [] };
};

export const defaultWorld = (): World => ({
  objects: [
    sphere({
      material: material({
        color: color(0.8, 1.0, 0.6),
        diffuse: 0.7,
        specular: 0.2
      })
    }),
    sphere({ transform: scaling(0.5, 0.5, 0.5) })
  ],
  lightSources: [pointLight(point(-10, 10, -10), color(1, 1, 1))]
});

export const intersectWorld = (world: World, ray: Ray): Array<Intersection> => {
  const result: Array<Intersection> = [];
  const length = world.objects.length;

  for (let i = 0; i < length; i++) {
    const currentObject = world.objects[i];
    const ray2 = transform(ray, inverse(currentObject.transform));
    const objectToRay = subtract(ray2.origin, currentObject.origin);

    if (isVector(objectToRay)) {
      const a = dot(ray2.direction, ray2.direction);
      const b = 2 * dot(ray2.direction, objectToRay);
      const c = dot(objectToRay, objectToRay) - 1;

      const discriminant = Math.pow(b, 2) - 4 * a * c;
      if (discriminant < 0) return [];

      const dSqrt = Math.sqrt(discriminant);
      const aMultiple = 2 * a;
      const t1 = (-b - dSqrt) / aMultiple;
      const t2 = (-b + dSqrt) / aMultiple;

      result.push(
        {
          t: t1,
          object: currentObject
        },
        {
          t: t2,
          object: currentObject
        }
      );
    }
  }

  return result.sort((a, b) => a.t - b.t);
};

export const shadeHit = (world: World, computation: Computation): Color => {
  const {
    object: { material },
    point,
    eyev,
    normalv
  } = computation;
  let accumulatedColor = color(0, 0, 0);
  const length = world.lightSources.length;

  for (let i = 0; i < length; i++) {
    const lightSource = world.lightSources[i];
    accumulatedColor = addColor(
      accumulatedColor,
      lighting(material, lightSource, point, eyev, normalv)
    );
  }

  return accumulatedColor;
};

export const colorAt = (world: World, ray: Ray): Color => {
  const intersections = intersectWorld(world, ray);
  const theHit = hit(intersections);

  if (!theHit) return color(0, 0, 0);
  const computation = prepareComputations(theHit, ray);
  return shadeHit(world, computation);
};
