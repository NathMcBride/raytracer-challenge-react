import {
  color,
  Color,
  multiplyByColor,
  multiplyByScalar,
  addColor,
  PointLight,
  Vector,
  Point,
  normalize,
  subtract,
  dot,
  reflect,
  negate
} from '..';

export type Material = {
  color: Color;
  ambient: number;
  diffuse: number;
  specular: number;
  shininess: number;
};

export type MaterialParams = Partial<Material>;
export function material(params?: MaterialParams): Material {
  return {
    color: params?.color ?? color(1, 1, 1),
    ambient: params?.ambient ?? 0.1,
    diffuse: params?.diffuse ?? 0.9,
    specular: params?.specular ?? 0.9,
    shininess: params?.shininess ?? 200.0
  };
}

export const lighting = (
  material: Material,
  light: PointLight,
  point: Point,
  eyev: Vector,
  normalv: Vector,
  inShadow: boolean
): Color => {
  const effectiveColor = multiplyByColor(material.color, light.intensity);
  const lightv = normalize(subtract(light.position, point));
  const ambient = multiplyByScalar(effectiveColor, material.ambient);
  const lightDotNormal = dot(lightv, normalv);

  const black = color(0, 0, 0);

  let diffuse: Color = black;
  let specular: Color = black;
  if (lightDotNormal < 0) {
    diffuse = black;
    specular = black;
  } else {
    diffuse = multiplyByScalar(
      effectiveColor,
      material.diffuse * lightDotNormal
    );

    const reflectv = reflect(negate(lightv), normalv);
    const reflectDotEye = dot(reflectv, eyev);

    if (reflectDotEye <= 0) {
      specular = black;
    } else {
      const factor = Math.pow(reflectDotEye, material.shininess);
      specular = multiplyByScalar(light.intensity, material.specular * factor);
    }
  }

  if (inShadow) return ambient;

  return addColor(addColor(ambient, diffuse), specular);
};
