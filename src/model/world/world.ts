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
  inverse,
  Computation,
  Color,
  lighting,
  addColor,
  isShadowed,
  switchUnionValue,
  intersectSphere,
  intersectPlane,
  reflectedColor,
  refractedColor,
  schlick,
  multiplyByScalar
} from '..';

export type World = { objects: Shape[]; lightSources: PointLight[] };

export const world = (): World => {
  return { objects: [], lightSources: [] };
};

export const defaultWorld = (uuid1 = '1234', uuid2 = '4321'): World => ({
  objects: [
    sphere({
      uuid: uuid1,
      material: material({
        color: color(0.8, 1.0, 0.6),
        diffuse: 0.7,
        specular: 0.2
      })
    }),
    sphere({ uuid: uuid2, transform: scaling(0.5, 0.5, 0.5) })
  ],
  lightSources: [pointLight(point(-10, 10, -10), color(1, 1, 1))]
});

export const intersectWorld = (world: World, ray: Ray): Array<Intersection> => {
  let result: Array<Intersection> = [];
  const length = world.objects.length;

  for (let i = 0; i < length; i++) {
    const currentObject = world.objects[i];
    const localRay = transform(ray, inverse(currentObject.transform));

    const intersections = switchUnionValue(currentObject)({
      identity: () => [],
      sphere: b => intersectSphere(b, localRay),
      plane: p => intersectPlane(p, localRay)
    });

    result = result.concat(intersections);
  }

  return result.sort((a, b) => a.t - b.t);
};

export const shadeHit = (
  world: World,
  computation: Computation,
  remaining: number
): Color => {
  const { object, overPoint, eyev, normalv } = computation;
  const { material } = object;
  let accumulatedColor = color(0, 0, 0);

  const shadowed = isShadowed(world, overPoint);
  const length = world.lightSources.length;
  for (let i = 0; i < length; i++) {
    const lightSource = world.lightSources[i];
    accumulatedColor = addColor(
      accumulatedColor,
      lighting(
        material,
        object,
        lightSource,
        overPoint,
        eyev,
        normalv,
        shadowed
      )
    );
  }

  const reflected = reflectedColor(world, computation, remaining);
  const refracted = refractedColor(world, computation, remaining);

  if (material.reflective > 0 && material.transparency > 0) {
    const reflectance = schlick(computation);
    return addColor(
      addColor(accumulatedColor, multiplyByScalar(reflected, reflectance)),
      multiplyByScalar(refracted, 1 - reflectance)
    );
  }

  return addColor(addColor(accumulatedColor, reflected), refracted);
};
